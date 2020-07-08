from datetime import datetime

from django.test import TestCase
from django.contrib.auth import get_user_model

from meal import models


def create_new_user(username):
    return get_user_model().objects.create_user(
        username,
        'testpass'
    )


class ModelTests(TestCase):

    def setUp(self):
        self.user = create_new_user("user1")
        self.food1 = models.Food.objects.create(name="Egg", kcal=140)
        self.ingredient1 = models.Ingredient.objects.create(food=self.food1, weight=80)
        self.food2 = models.Food.objects.create(name="Bacon", kcal=540)
        self.ingredient2 = models.Ingredient.objects.create(food=self.food2, weight=50)
        self.meal = models.Meal.objects.create(date=datetime.now())
        self.meal.ingredients.add(self.ingredient1)
        self.meal.ingredients.add(self.ingredient2)

        self.testTables = [
            {
                "name": "Test food string representation",
                "check": (lambda: self.assertEqual(str(self.food1), "Egg"))
            },
            {
                "name": "Test ingredient string representation",
                "check": (lambda: self.assertEqual(str(self.ingredient1), "Egg 80g"))
            },
            {
                "name": "Test ingredient calories calculation",
                "check": (lambda: self.assertEqual(self.ingredient2.kcal, 50 * 540 / 100))
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

