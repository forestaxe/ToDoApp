class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if 'tasks' not in request.path:
            return self.get_response(request)

        if 'tasks' in request.path or request.user.is_staff:
            origin = request.META.get('HTTP_ORIGIN')

            if origin and (origin == 'http://127.0.0.1:3000' or 'http://localhost:3000'):
                response = self.get_response(request)
                response['Access-Control-Allow-Origin'] = origin
                return response
            elif request.user.is_staff:
                response = self.get_response(request)
                return response
            else:
                from django.http import JsonResponse
                return JsonResponse({'error': 'Unauthorized'}, status=401)