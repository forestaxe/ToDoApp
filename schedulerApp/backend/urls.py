from django.urls import path
from .views import TasksApiView

urlpatterns = [
    path('tasks/', TasksApiView.as_view(), name="anything")
]