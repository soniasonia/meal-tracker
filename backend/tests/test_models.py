from datetime import datetime

from django.contrib.auth import get_user_model
from django.test import TestCase

from meal import models


def create_new_user(username):
    return get_user_model().objects.create_user(
        username,
        'testpass'
    )


class ModelTests(TestCase):

    def setUp(self):
        self.user = create_new_user("user1")

        self.ingredient1 = models.Ingredient.objects.create(name="Egg", kcal=140)
        self.ingredient2 = models.Ingredient.objects.create(name="Bacon", kcal=540)

        self.meal = models.Meal.objects.create(date=datetime.now())
        self.meal.ingredients.add(self.ingredient1, throgh_defaults={'weight': 80})
        self.meal.ingredients.add(self.ingredient2, throgh_defaults={'weight': 50})

        self.testTables = [
            {
                "name": "Test ingredient string representation",
                "check": (lambda: self.assertEqual(str(self.ingredient1), "Egg"))
            },
            {
                "name": "Test that ingredient belongs to meal",
                "check": (lambda: self.assertEqual(str(self.meal.ingredients), "Egg"))
            },
            {
                "name": "Test meal calories calculation",
                "check": (lambda: self.assertEqual(self.meal.total_kcal, (80 * 140 + 50 * 540) / 100))
            }
        ]

    def test_test_tables(self):
        for i, test in enumerate(self.testTables):
            try:
                test["check"]()
            except Exception as e:
                print(f"Test suite {i} failed: {test['name']}")
                raise e

