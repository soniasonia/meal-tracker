from datetime import datetime
import json

from rest_framework import generics, authentication, permissions
from rest_framework import viewsets, mixins, views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from . import serializers
from . import models


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = serializers.UserSerializer


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = serializers.UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authenticated user"""
        return self.request.user


class LogoutView(views.APIView):
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        try:
            request.user.auth_token.delete()
            return Response({}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MealViewSet(viewsets.ModelViewSet):
    queryset = models.Meal.objects.all()
    serializer_class = serializers.MealSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @detail_route(methods=['post'], url_path='meal/create')
    def wishlist(self, library_id=None, book_id=None):
        return Response('OK')


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = models.Ingredient.objects.all()
    serializer_class = serializers.IngredientSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class CreateMealWithIngredients(views.APIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

    def get(self, request):
        return Response({"Hej"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        # Create meal
        try:
            meal = models.Meal.objects.create(user=request.user, date=datetime.now())
            for i in request.data["meal_ingredients"]:
                ingredient = models.Ingredient.objects.get(id=i['ingredient'])
                meal.ingredients.add(ingredient, through_defaults={'weight': i['weight']})
                print("Added", str(ingredient))
            serializer = serializers.MealSerializer(meal)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            print(e)
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

