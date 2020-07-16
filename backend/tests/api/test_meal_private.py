from datetime import datetime

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from meal import models
from meal import serializers

URL = reverse('meal:meal-list')


def detail_url(_id):
    return reverse('meal:meal-detail', args=[_id])

def create_new_user(username):
    return get_user_model().objects.create_user(
        username,
        'testpass'
    )


class PublicMealApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = create_new_user("user1")
        self.client.force_authenticate(self.user)
        self.food1 = models.Ingredient.objects.create(name="Egg", kcal=140)
        self.ingredient1 = models.MealIngredient.objects.create(food=self.food1, weight=80)
        self.food2 = models.Ingredient.objects.create(name="Bacon", kcal=540)
        self.ingredient2 = models.MealIngredient.objects.create(food=self.food2, weight=50)
        self.meal1 = models.Meal.objects.create(date=datetime.now())
        self.meal1.ingredients.add(self.ingredient1)
        self.meal1.ingredients.add(self.ingredient2)
        self.meal2 = models.Meal.objects.create(date=datetime.now())
        self.meal2.ingredients.add(self.ingredient1)
        self.meal_serializer = serializers.MealSerializer(
            models.Meal.objects.all().order_by('-id'), many=True)
        self.testTables = [
            {
                'name': 'Test that authorized user can retrieve a list of meals',
                'request': (lambda: self.client.get(URL)),
                'expected_status_code': status.HTTP_200_OK,
                'expected_data': self.meal_serializer.data
            },
            {
                'name': 'Test that authorized user can retrieve a specific meal',
                'request': (lambda: self.client.get(detail_url(self.meal.id))),
                'expected_status_code': status.HTTP_401_UNAUTHORIZED,
                'expected_data': None
            },
            {
                'name': 'Test that authorized user can add a new meal',
                'request': (lambda: self.client.post(URL, {})),
                'expected_status_code': status.HTTP_401_UNAUTHORIZED,
                'expected_data': None
            },
            {
                'name': 'Test that uthorized user can update a meal',
                'request': (lambda: self.client.patch(URL, {})),
                'expected_status_code': status.HTTP_401_UNAUTHORIZED,
                'expected_data': None
            },

        ]

    def test_test_tables(self):
        for i, test in enumerate(self.testTables):
            res = test["request"]()
            try:
                print(res.data)
                print("-"*20)
                print(test["expected_data"])
                self.assertEqual(res.status_code, test["expected_status_code"])
                self.assertEqual(res.data, test["expected_data"])

            except Exception as e:
                print(f"Test suite {i} failed: {test['name']}")
                raise e