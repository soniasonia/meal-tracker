import json
from datetime import datetime

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from meal import models
from meal import serializers

MEAL_URL = reverse('meal:meal-list')
MEAL_CREATE_URL = reverse('meal:create_meal')
INGREDIENT_URL = reverse('meal:ingredient-list')


def meal_detail_url(_id):
    return reverse('meal:meal-detail', args=[_id])


def create_new_user(username):
    return get_user_model().objects.create_user(
        username,
        'testpass'
    )


class PrivateMealApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = create_new_user("user1")
        self.client.force_authenticate(self.user)

        self.egg = models.Ingredient.objects.create(name="Egg", kcal_per_100g=140)
        self.bacon = models.Ingredient.objects.create(name="Bacon", kcal_per_100g=540)
        self.tomato = models.Ingredient.objects.create(name="Tomato", kcal_per_100g=40)

        self.eggs_on_bacon = models.Meal.objects.create(date=datetime.now(), user=self.user)
        self.eggs_on_bacon.ingredients.add(self.egg, through_defaults={'weight': 80})
        self.eggs_on_bacon.ingredients.add(self.bacon, through_defaults={'weight': 50})

        self.tomato_salad = models.Meal.objects.create(date=datetime.now(), user=self.user)
        self.tomato_salad.ingredients.add(self.tomato, through_defaults={'weight': 150})

        self.testTables = [
            {
                'name': 'Test that authorized user can retrieve a list of meals',
                'request': (lambda: self.client.get(MEAL_URL)),
                'expected_status_code': status.HTTP_200_OK,
                'expected_data': (lambda res: self.assertEqual(res.data, serializers.MealSerializer(
                    models.Meal.objects.all().order_by('id'), many=True).data))
            },
            {
                'name': 'Test that authorized user can retrieve a specific meal',
                'request': (lambda: self.client.get(meal_detail_url(self.eggs_on_bacon.id))),
                'expected_status_code': status.HTTP_200_OK,
                'expected_data': (
                    lambda res: self.assertEqual(res.data, serializers.MealSerializer(self.eggs_on_bacon).data))
            },
            {
                'name': 'Test that authorized user can add a new ingredient',
                'request': (lambda: self.client.post(INGREDIENT_URL, {
                    'name': 'Mozzarella',
                    'kcal_per_100g': 100,
                })),
                'expected_status_code': status.HTTP_201_CREATED,
                'expected_data': (lambda res: self.assertEqual(res.data['name'], 'Mozzarella') and
                                              self.assertEqual(res.data['kcal_per_100g'], 100))
            },

            {
                'name': 'Test that authorized user can add a new meal',
                'request': (lambda: self.client.post(MEAL_CREATE_URL, {
                    'meal_ingredients': [
                        {'ingredient': 1,
                         'weight': 100},
                        {'ingredient': 2,
                         'weight': 200}
                    ]
                }, format='json')),
                'expected_status_code': status.HTTP_201_CREATED,
                'expected_data': lambda res: self.assertListEqual(["id", "date", "total_kcal", "meal_ingredients"],
                                                                  list(res.data.keys())) and
                                             self.assertEqual(len(res.data["meal_ingredients"]), 3)

                #
                # {"id": 3, "date": "2020-07-20T13:06:07.576615",
                #  "total_kcal": 1220.0, "meal_ingredients":
                #      [
                #          {"id": 4, "meal": 3, "ingredient": 1,
                #           "weight": 100,
                #           "kcal": 140.0},
                #          {"id": 5, "meal": 3, "ingredient": 2,
                #           "weight": 200,
                #           "kcal": 1080.0}
                #      ]
                #  }
                # )
            },
            # Sprawdzic czy zawiera dwa skladniki i swoje , jakaś funckja all ?
            # {
            #     'name': 'Test that authorized user can update a meal',
            #     'request': (lambda: self.client.patch(MEAL_URL, {})),
            #     'expected_status_code': status.HTTP_200_OK,
            #     'expected_data': lambda res: self.assertEqual(res.data, self.tomato_salad)
            # },

        ]

    def test_test_tables(self):

        for i, test in enumerate(self.testTables):
            try:
                print(test['name'], end="...")
                res = test["request"]()
                self.assertEqual(res.status_code, test["expected_status_code"])
                test["expected_data"](res)
                print("OK")

            except Exception as e:
                print(json.dumps(res.data))
                print(f"Test suite {i} failed: {test['name']}")
                raise e
