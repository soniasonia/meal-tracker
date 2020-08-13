from django.contrib.auth import get_user_model
from rest_framework import serializers
from datetime import datetime
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return it"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Ingredient
        fields = ('id', 'name', 'kcal_per_100g')
        read_only_fields = ('id',)


class MealIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MealIngredient
        kcal = serializers.ReadOnlyField()
        fields = ('id', 'ingredient', 'weight', 'kcal', 'meal')
        read_only_fields = ('id', 'kcal', 'meal')


class MealIngredientSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = models.MealIngredient
        fields = ('ingredient', 'weight')


class MealSerializerCreate(serializers.ModelSerializer):
    meal_ingredients = MealIngredientSerializerCreate(many=True)

    class Meta:
        model = models.Meal
        fields = ("meal_ingredients",)

    def create(self, validated_data):
        ingredient_data = validated_data.pop('meal_ingredients')
        validated_data['date'] = datetime.now()
        meal = models.Meal.objects.create(**validated_data)
        for _ing in ingredient_data:
            ingredient = _ing["ingredient"]
            weight = _ing["weight"]
            models.MealIngredient.objects.create(meal=meal, ingredient=ingredient, weight=weight)
        return meal


class MealSerializer(serializers.ModelSerializer):
    meal_ingredients = MealIngredientSerializer(many=True)
    total_kcal = serializers.ReadOnlyField()

    class Meta:
        model = models.Meal
        fields = ("id", "date", "total_kcal", "meal_ingredients")
        read_only_fields = ("id", "total_kcal")
