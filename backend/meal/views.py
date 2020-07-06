from rest_framework import generics, authentication, permissions
from rest_framework import views, status
from rest_framework.response import Response

from . import serializers


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
