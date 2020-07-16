from django.urls import path
# from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from . import views

app_name = 'meal'

urlpatterns = [
    path('user/create/', views.CreateUserView.as_view(), name='create_user'),
    path('user/login/', obtain_auth_token, name='login'),
    path('user/logout/', views.LogoutView.as_view(), name='logout'),
    path('user/me/', views.ManageUserView.as_view(), name='me')
]
