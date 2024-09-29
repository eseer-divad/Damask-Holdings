import datetime
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..models import Employeeinfo, Timeclock
import json
import hashlib 

@api_view(['POST'])
def add_time_punch(request):
    try:
        punchInfo = json.loads(request.body.decode('utf-8'))
        print(punchInfo)
    except json.JSONDecodeError:
        return Response({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Get the employee information
        aux_info = Employeeinfo.objects.filter(userid=punchInfo['userID']).first()
        if not aux_info:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

        # Convert dateTime string to datetime object for the time punch
        punch_datetime = datetime.datetime.strptime(punchInfo['dateTime'], '%Y-%m-%d %H:%M:%S')

        # Generate the punch ID
        punch_id_str = aux_info.employeeid[:8] + punch_datetime.strftime('%Y-%m-%d %H:%M:%S')
        punchID = hashlib.sha256(punch_id_str.encode()).hexdigest()

        # Create the Timeclock instance and save it
        punch = Timeclock(punchid=punchID, employeeid=aux_info.employeeid, timepunch=punch_datetime)
        punch.save()

        # Prepare the response data
        response_data = {
            "employeeid": aux_info.employeeid,
            "punchid": punchID,
            "timepunch": punch_datetime.strftime('%Y-%m-%d %H:%M:%S')
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    except KeyError as e:
        return Response({"error": f"Missing key in request data: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError as e:
        return Response({"error": f"Invalid datetime format: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"An unexpected error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
