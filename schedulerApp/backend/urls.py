from django.urls import path
from .views import TasksApiView

urlpatterns = [
    path('', TasksApiView.as_view(), name="anything")
]