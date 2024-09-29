from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
from ..models import Userinfo, Login
from django.db import reset_queries

@method_decorator(csrf_exempt, name='dispatch')
class delete_account(View):
    def delete(self, request, *args, **kwargs):
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body)
            print('Received DELETE request with data:', data)

            ssn = data.get('ssn')
            userid = data.get('userid')

            # Reset database queries
            reset_queries()

            # Delete from UserInfo table
            userinfo_deleted = Userinfo.objects.filter(ssn=ssn).delete()

            # Delete from Login table
            login_deleted = Login.objects.filter(userid=userid).delete()

            print('Rows deleted from UserInfo:', userinfo_deleted)
            print('Rows deleted from Login:', login_deleted)

            # Check if any rows were deleted
            if userinfo_deleted[0] > 0 or login_deleted[0] > 0:
                return JsonResponse({'success': True, 'message': 'User deleted successfully'})
            else:
                return JsonResponse({'success': False, 'message': 'User not found'})

        except Exception as e:
            print('Error:', str(e))
            return JsonResponse({'success': False, 'message': str(e)})

    def get(self, request, *args, **kwargs):
        # Raise MethodNotAllowed for GET requests
        return HttpResponseNotAllowed(['DELETE'])
