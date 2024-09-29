from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..models import Employeeinfo, PtoRequests
import json

@api_view(['POST'])
def set_PTO_Req(request):

    try:
        setData = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return Response({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)


    try:
        #employeeID =        PtoRequests.objects.filter(employeeid=setData["eid"])
        requestID =         PtoRequests.objects.filter(requestid=setData["id"])

        if(setData["status"] == "false"):
            requestApproval = bool(False)
        if(setData["status"] == "true"):
            requestApproval = bool(True)

        #if not employeeID:
            #return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        #print("Past employeeID if statement.\n")
        #print("employeeID: ", employeeID)
        #print("requestID: ", requestID)
        #print("requestApproval", requestApproval)


        argToSet = PtoRequests.objects.filter(requestid=setData["id"]).first()
        print("\nargToSet is: ", argToSet)
        print("argToSet requestid: ", argToSet.requestid, " employeeid: ", argToSet.employeeid, " rdate: ", argToSet.rdate, " approval: ", argToSet.approval)
        argToSet.approval = requestApproval
        print("\nAfter setting approval argToSet requestid: ", argToSet.requestid, " employeeid: ", argToSet.employeeid, " rdate: ", argToSet.rdate, " approval: ", argToSet.approval)
        #print("\nafter approval set argToSet is: ", argToSet.approval)
        #argToSet.requestid = setData["id"]
        #print("In view AD function past employeeID if statement")
        #print("\nargToSet is: ", argToSet)

        # = PtoRequests.objects.filter(requestid = requestID.requestid, approval = requestApproval)
        #argToSet = PtoRequests(requestid=setData["id"], employeeid=setData["eid"])
        #request = PtoRequests(requestid=reqID, employeeid=aux_info.employeeid, rdate=reqDetails['reqDate'])

        argToSet.save()
        return Response({"status": "Success"})

    except KeyError as e:
        return Response({"error": f"Missing key in request data: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError as e:
        return Response({"error": f"Invalid datetime format: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"An unexpected error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
