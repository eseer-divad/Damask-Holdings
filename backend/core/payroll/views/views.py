from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..serializers import userCreationSerializer

@api_view(['GET'])
def home(request):
    return Response(data={"message": "Page not found (wink wink)"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def createUser(request, format=None):
    serializer = userCreationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        response_data = {
            'user_id': user.userid,
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        errors = serializer.errors
        return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)