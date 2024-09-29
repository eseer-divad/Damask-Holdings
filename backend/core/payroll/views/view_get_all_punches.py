from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..models import Employeeinfo, Timeclock
import json
import hashlib
from datetime import datetime

class ret_info:
    def __init__(self, p_id, date, day, time):
        self.id = p_id
        self.p_date = date
        self.day = day
        self.p_time = time


@api_view(['post'])
def get_user_punches(request):
    try:
        uID = json.loads(request.body.decode())
    except json.JSONDecodeError:
        return Response({"ERROR": "invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        auxInfo = Employeeinfo.objects.filter(userid = uID["userId"]).first()
        if not auxInfo:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        punches = Timeclock.objects.filter(employeeid = auxInfo.employeeid)
        punch_list = []
        for element in punches:
            temp = element.punchid[-12:]
            id = "..." + temp
            date_data = parse_date(element.timepunch)
            p_date = date_data[0]
            day = date_data[1]
            p_time = date_data[2]
            punch_list.append(ret_info(id, p_date, day, p_time))
        if not punch_list:
            return Response({"Status": "no-Punches"})
        else:
            responseData = [
                {"id": str(req.id), "p_date": str(req.p_date), "day": str(req.day), "p_time": str(req.p_time)} for req in punch_list
            ]
            return Response(responseData)
    except KeyError as e:
        return Response({"error": f"Missing key in request data: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError as e:
        return Response({"error": f"Invalid datetime format: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"An unexpected error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def parse_date(date):
    date_str = str(date)
    date_obj = datetime.fromisoformat(date_str.rstrip("Z"))
    raw_date = date_obj.strftime("%Y-%m-%d")
    day_of_week = date_obj.strftime("%A")
    time = date_obj.strftime("%H:%M:%S")

    return [raw_date, day_of_week, time]