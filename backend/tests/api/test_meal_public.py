from datetime import datetime

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from meal import models

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
        self.food1 = models.Ingredient.objects.create(name="Egg", kcal=140)
        self.ingredient1 = models.MealIngredient.objects.create(food=self.food1, weight=80)
        self.food2 = models.Ingredient.objects.create(name="Bacon", kcal=540)
        self.ingredient2 = models.MealIngredient.objects.create(food=self.food2, weight=50)
        self.meal = models.Meal.objects.create(date=datetime.now())
        self.meal.ingredients.add(self.ingredient1)
        self.meal.ingredients.add(self.ingredient2)
        self.testTables = [
            {
                'name': 'Test that unauthorized user cannot retrieve a list of meals',
                'request': (lambda: self.client.get(URL)),
                'expected_status_code': status.HTTP_401_UNAUTHORIZED,
            },
            {
                'name': 'Test that unauthorized user cannot retrieve a specific meal',
                'request': (lambda: self.client.get(detail_url(self.meal.id))),
                'expected_status_code': status.HTTP_401_UNAUTHORIZED,
            },
            {
                'name': 'Test that unauthorized user cannot add a new meal',
                'request': (lambda: self.client.post(URL, {})),
                'expected_status_code': status.HTTP_401_UNAUTHORIZED,
            },
            {
                'name': 'Test that unauthorized user cannot update a meal',
                'request': (lambda: self.client.patch(URL, {})),
                'expected_status_code': status.HTTP_401_UNAUTHORIZED,
            },

        ]

    def test_test_tables(self):
        for i, test in enumerate(self.testTables):
            res = test["request"]()
            try:
                self.assertEqual(res.status_code, test["expected_status_code"])

            except Exception as e:
                print(f"Test suite {i} failed: {test['name']}")
                raise e
