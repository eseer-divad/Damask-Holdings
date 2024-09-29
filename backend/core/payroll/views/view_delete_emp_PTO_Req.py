from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..models import Employeeinfo, PtoRequests
import json

@api_view(['POST'])
def del_PTO_Reqs(request):
    try:
        delData = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return Response({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        employeeID = Employeeinfo.objects.filter(userid=delData['userId']).first()
        if not employeeID:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

        argToDelete = PtoRequests.objects.filter(employeeid=employeeID.employeeid, requestid__icontains=delData['id'])
        argToDelete.delete()
        return Response({"status": "Success"})

    except KeyError as e:
        return Response({"error": f"Missing key in request data: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError as e:
        return Response({"error": f"Invalid datetime format: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"An unexpected error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
