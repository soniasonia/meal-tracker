from datetime import datetime
from django.core.management.base import BaseCommand
from meal import models


class Command(BaseCommand):
    """Django command to pause execution until database is available"""

    def handle(self, *args, **options):
        food1 = models.Ingredient.objects.create(name="Egg", kcal=140)
        ingredient1 = models.MealIngredient.objects.create(food=food1, weight=80)
        food2 = models.Ingredient.objects.create(name="Bacon", kcal=540)
        ingredient2 = models.MealIngredient.objects.create(food=food2, weight=50)
        meal = models.Meal.objects.create(date=datetime.now())
        meal.ingredients.add(ingredient1)
        meal.ingredients.add(ingredient2)
        self.stdout.write(self.style.SUCCESS('Database fed with some initial data!'))
