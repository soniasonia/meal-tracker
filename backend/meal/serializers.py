from django.contrib.auth import get_user_model
from rest_framework import serializers

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
        fields = ('id', 'meal', 'ingredient', 'weight', 'kcal')
        read_only_fields = ('id', 'kcal')


class MealSerializer(serializers.ModelSerializer):
    meal_ingredients = MealIngredientSerializer(many=True, read_only=True)
    total_kcal = serializers.ReadOnlyField()
    class Meta:
        model = models.Meal
        fields = ("id", "date", "total_kcal", "meal_ingredients")
        # read_only_fields = ("id", "total_kcal", "meal_ingredients")