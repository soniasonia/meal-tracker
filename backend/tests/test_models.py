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

        self.ingredient1 = models.Ingredient.objects.create(name="Egg", kcal_per_100g=140)
        self.ingredient2 = models.Ingredient.objects.create(name="Bacon", kcal_per_100g=540)
        self.ingredient3 = models.Ingredient.objects.create(name="Tomato", kcal_per_100g=40)

        self.meal = models.Meal.objects.create(date=datetime.now(), user=self.user)
        self.meal.ingredients.add(self.ingredient1, through_defaults={'weight': 80})
        self.meal.ingredients.add(self.ingredient2, through_defaults={'weight': 50})

        self.testTables = [
            {
                "name": "Test ingredient string representation",
                "check": (lambda: self.assertEqual(str(self.ingredient1), "Egg"))
            },
            {
                "name": "Test that only ingredients which belong to meal are listed",
                "check": lambda: self.assertEqual(
                    [str(x) for x in self.meal.ingredients.all().order_by('name')],
                    ["Bacon", "Egg"])
            },
            {
                "name": "Test that ingredients for a meal can be listed with calories",
                "check": lambda: self.assertEqual(
                    [str(x) for x in models.MealIngredient.objects.filter(meal=self.meal).order_by('ingredient__name')],
                    ["Bacon 50g", "Egg 80g"])
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


