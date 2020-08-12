from datetime import datetime

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from meal import models, serializers

URL = reverse('meal:meal-list')


def detail_url(_id):
    return reverse('meal:meal-detail', args=[_id])


def create_new_user(username):
    return get_user_model().objects.create_user(
        username,
        'testpass'
    )


class PublicMealApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = create_new_user("user1")

        self.egg = models.Ingredient.objects.create(name="Egg", kcal_per_100g=140)
        self.bacon = models.Ingredient.objects.create(name="Bacon", kcal_per_100g=540)
        self.tomato = models.Ingredient.objects.create(name="Tomato", kcal_per_100g=40)

        self.eggs_on_bacon = models.Meal.objects.create(date=datetime.now(), user=self.user)
        self.eggs_on_bacon.ingredients.add(self.egg, through_defaults={'weight': 80})
        self.eggs_on_bacon.ingredients.add(self.bacon, through_defaults={'weight': 50})

        self.tomato_salad = models.Meal.objects.create(date=datetime.now(), user=self.user)
        self.tomato_salad.ingredients.add(self.tomato, through_defaults={'weight': 200})

    def test_that_unauthorized_user_cannot_retrieve_list_of_meals(self):
        res = self.client.get(URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_that_authorized_user_can_retrieve_list_of_meals(self):
        self.client.force_authenticate(self.user)
        res = self.client.get(URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializers.MealSerializer(
            models.Meal.objects.all().order_by('id'), many=True).data)

    def test_that_unauthorized_user_cannnot_retrieve_specific_meal(self):
        res = self.client.get(detail_url(self.eggs_on_bacon.id))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_that_authorized_user_can_retrieve_specific_meal(self):
        self.client.force_authenticate(self.user)
        res = self.client.get(detail_url(self.eggs_on_bacon.id))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializers.MealSerializer(self.eggs_on_bacon).data)

    def test_that_unauthorized_user_cannot_create_meal(self):
        res = self.client.post(URL, {'meal_ingredients': [
                        {'ingredient': self.egg.id,
                         'weight': 100},
                        {'ingredient': self.tomato.id,
                         'weight': 200}
                    ]}, format='json')
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_that_authorized_user_can_create_meal(self):
        self.client.force_authenticate(self.user)
        res = self.client.post(URL, {'meal_ingredients': [
                        {'ingredient': self.egg.id,
                         'weight': 100},
                        {'ingredient': self.tomato.id,
                         'weight': 200}
                    ]}, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
