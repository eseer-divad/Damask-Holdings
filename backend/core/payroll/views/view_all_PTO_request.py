from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..models import Employeeinfo, PtoRequests
import json

# similar to get_pto_reqs, but returns pto requests for every user instead of just 1 user
@api_view(['POST'])
def get_all_PTO_reqs(request):
    '''try:
        uid = json.loads(request.body.decode('utf-8'))
        print(uid)
    except json.JSONDecodeError:
        return Response({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)'''

    try:
        #aux_info = Employeeinfo.objects.filter(userid=uid['userId']).first()
        #if not aux_info:
        #    return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        reqs = PtoRequests.objects.all()
        if not reqs:
            return Response({"id": "N/A", "status": "N/A", "date": "N/A", "eid": "N/A"})
        else:
            response_data = [
                {"id": str(req.requestid), "date": str(req.rdate), "status": str(req.approval), "eid": str(req.employeeid)} for req in reqs
            ]
            return Response(response_data)
    except KeyError as e:
        return Response({"error": f"Missing key in request data: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError as e:
        return Response({"error": f"Invalid datetime format: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"An unexpected error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)