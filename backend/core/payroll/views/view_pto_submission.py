import datetime
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..models import Employeeinfo, PtoRequests
import json
import hashlib

@api_view(['post'])
def submit_pto_request(request):
    try:
        reqDetails = json.loads(request.body.decode())
        print(reqDetails)
    except json.JSONDecodeError:
        return Response({"ERROR": "invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        aux_info = Employeeinfo.objects.filter(userid=reqDetails['userId']).first()
        if not aux_info:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        
        pto_id_str = aux_info.employeeid[:8] + reqDetails['reqDate']
        reqID = hashlib.sha256(pto_id_str.encode()).hexdigest()

        request = PtoRequests(requestid=reqID, employeeid=aux_info.employeeid, rdate=reqDetails['reqDate'])
        request.save()

        response_data = {
            "status": 1,
            "id": reqID
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    except KeyError as e:
        return Response({"error": f"Missing key in request data: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError as e:
        return Response({"error": f"Invalid datetime format: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"An unexpected error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)