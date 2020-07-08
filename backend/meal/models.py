from django.db import models


class Food(models.Model):
    name = models.CharField(max_length=255)
    kcal = models.IntegerField()

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    food = models.ForeignKey('Food', on_delete=models.CASCADE)
    weight = models.IntegerField()

    @property
    def kcal(self):
        return self.food.kcal * self.weight / 100

    def __str__(self):
        return f"{self.food.name} {self.weight}g"

class Meal(models.Model):
    ingredients = models.ManyToManyField('Ingredient')
    date = models.DateTimeField()

    @property
    def total_kcal(self):
        ingredients = self.ingredients.all()
        if len(ingredients) > 0:
            return sum(i.kcal for i in ingredients)
        else:
            return 0


