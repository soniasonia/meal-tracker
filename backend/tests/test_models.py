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

        egg_kcal, egg_weight = 140, 80
        bacon_kcal, bacon_weight = 540, 50
        tomato_kcal = 40

        self.egg = models.Ingredient.objects.create(name="Egg", kcal_per_100g=egg_kcal)
        self.bacon = models.Ingredient.objects.create(name="Bacon", kcal_per_100g=bacon_kcal)
        self.tomato = models.Ingredient.objects.create(name="Tomato", kcal_per_100g=tomato_kcal)

        self.eggs_on_bacon = models.Meal.objects.create(date=datetime.now(), user=self.user)
        self.eggs_on_bacon.ingredients.add(self.egg, through_defaults={'weight': egg_weight})
        self.eggs_on_bacon.ingredients.add(self.bacon, through_defaults={'weight': bacon_weight})

        self.testTables = [
            {
                "name": "Test ingredient string representation",
                "check": (lambda: self.assertEqual(str(self.egg), "Egg"))
            },
            {
                "name": "Test that only ingredients which belong to meal are listed",
                "check": lambda: self.assertEqual(
                    [str(x) for x in self.eggs_on_bacon.ingredients.all().order_by('name')],
                    ["Bacon", "Egg"])
            },
            {
                "name": "Test that ingredients for a meal can be listed with calories",
                "check": lambda: self.assertEqual(
                    [str(x) for x in
                     models.MealIngredient.objects.filter(meal=self.eggs_on_bacon).order_by('ingredient__name')],
                    ["Bacon 50g", "Egg 80g"])
            },
            {
                "name": "Test meal calories calculation",
                "check": (lambda: self.assertEqual(self.eggs_on_bacon.total_kcal,
                                                   (egg_kcal * egg_weight + bacon_kcal * bacon_weight) / 100))
            }
        ]

    def test_test_tables(self):
        for i, test in enumerate(self.testTables):
            try:
                test["check"]()
            except Exception as e:
                print(f"Test suite {i} failed: {test['name']}")
                raise e
