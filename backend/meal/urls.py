from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from . import views

app_name = 'meal'

router = DefaultRouter()
router.register("meal", views.MealViewSet)
router.register("ingredient", views.IngredientViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('user/create/', views.CreateUserView.as_view(), name='create_user'),
    path('user/login/', obtain_auth_token, name='login'),
    path('user/me/', views.ManageUserView.as_view(), name='me'),
    path('user/logout/', views.LogoutView.as_view(), name='logout'),
    path('create_meal/', views.CreateMealWithIngredients.as_view(), name='create_meal')

]
