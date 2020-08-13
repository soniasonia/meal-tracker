from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from meal import models
from meal import serializers


INGREDIENT_URL = reverse('meal:ingredient-list')


def create_new_user(username):
    return get_user_model().objects.create_user(
        username,
        'testpass'
    )


class IngredientApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = create_new_user("user1")
        self.egg = models.Ingredient.objects.create(name="Egg", kcal_per_100g=140)
        self.bacon = models.Ingredient.objects.create(name="Bacon", kcal_per_100g=540)
        self.tomato = models.Ingredient.objects.create(name="Tomato", kcal_per_100g=40)

    def test_authorized_user_can_add_an_ingredient(self):
        self.client.force_authenticate(self.user)
        res = self.client.post(INGREDIENT_URL, {
            'name': 'Mozzarella',
            'kcal_per_100g': 100,
        })
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['name'], 'Mozzarella')
        self.assertEqual(res.data['kcal_per_100g'], 100)

    def test_unauthorized_user_cannot_add_an_ingredient(self):
        res = self.client.post(INGREDIENT_URL, {
            'name': 'Mozzarella',
            'kcal_per_100g': 100,
        })
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authorized_user_can_retrieve_ingredients_list(self):
        self.client.force_authenticate(self.user)
        res = self.client.get(INGREDIENT_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializers.IngredientSerializer(
            models.Ingredient.objects.all().order_by('id'), many=True).data)

    def test_unauthorized_user_cannot_retrieve_ingredients_list(self):
        res = self.client.get(INGREDIENT_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
