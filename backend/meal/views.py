from rest_framework import generics, authentication, permissions
from rest_framework import viewsets, mixins, views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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


class MealViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin):
    queryset = models.Meal.objects.all()
    serializer_class = serializers.MealSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'create':
            return serializers.MealSerializerCreate
        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new object"""
        serializer.save(user=self.request.user)


class IngredientViewSet(viewsets.GenericViewSet,
                        mixins.CreateModelMixin,
                        mixins.ListModelMixin):
    queryset = models.Ingredient.objects.all()
    serializer_class = serializers.IngredientSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
