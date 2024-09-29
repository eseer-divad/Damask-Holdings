from django.http import JsonResponse
from ..models import Userinfo

def get_user_info(request):

    userInfo = Userinfo.objects.all()
    listOfUsers = []

    for user in userInfo:
        listOfUsers.append({
            'firstName': user.firstname
        })
        return JsonResponse(listOfUsers)