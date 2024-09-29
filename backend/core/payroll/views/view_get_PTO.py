from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..models import Employeeinfo
import json
from django.http import JsonResponse

@api_view(['POST'])
def get_available_PTO(request):
    try:
        uId = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    
    uInfo = Employeeinfo.objects.filter(userid=uId['userId']).first()
    
    if uInfo is None:
        return JsonResponse({"error": "User not found"}, status=404)
    
    r_val = {'PTO': uInfo.pto}
    return Response(r_val)
