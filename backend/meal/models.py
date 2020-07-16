from django.db import models
from django.conf import settings


class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    kcal_per_100g = models.IntegerField()

    def __str__(self):
        return self.name


class MealIngredient(models.Model):
    ingredient = models.ForeignKey('Ingredient', on_delete=models.CASCADE)
    meal = models.ForeignKey('Meal', on_delete=models.CASCADE)
    weight = models.IntegerField()

    @property
    def kcal(self):
        return self.ingredient.kcal_per_100g * self.weight / 100

    def __str__(self):
        return f"{self.ingredient.name} {self.weight}g"


class Meal(models.Model):
    date = models.DateTimeField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    ingredients = models.ManyToManyField('Ingredient', through='MealIngredient')

    @property
    def total_kcal(self):
        meal_ingredients = MealIngredient.objects.filter(meal=self)
        if len(meal_ingredients) > 0:
            return sum(i.kcal for i in meal_ingredients)
        else:
            return 0


