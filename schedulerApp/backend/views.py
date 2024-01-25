from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Task
from .serializer import *


class TasksApiView(APIView):
    def get(self, request):
        output = [{"task": output.task,
                   "title": output.title}
                  for output in Task.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
