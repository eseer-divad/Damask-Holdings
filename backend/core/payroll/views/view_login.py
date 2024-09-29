import json, uuid
from django.http import JsonResponse
from django.db import connection
from django.utils import timezone
from rest_framework.decorators import api_view
from datetime import timedelta
from ..models import Userinfo, LoginToken


@api_view(['POST'])
def validate_login(request):
    try:
        creds = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format"}, status=400)

    # Perform custom authentication query against MSSQL with parameterized query
    with connection.cursor() as cursor:
        query = """
            SELECT userID, username
            FROM Login
            WHERE username = %s AND password = %s;
        """
        params = [str(creds['username']), str(creds['password'])]

        cursor.execute(query, params)
        user_data = cursor.fetchone()

        if user_data:
            # Authentication successful
            user_id, _ = user_data
            user_info = Userinfo.objects.filter(userid=str(user_id)).first()  # Assuming Userinfo is a related model

            # set token values
            unique_key = str(uuid.uuid4())
            current_time = timezone.now()
            expiration_time = str(current_time + timedelta(days=3)) # token expires after 3 days

            # create a token from the user_info instance, or get the already existing one
            token, created = LoginToken.objects.get_or_create(
                key=unique_key, 
                user=user_info, 
                additional_info=str(current_time), 
                expiration_date=expiration_time
            )

            # If the token was just created, you can customize additional attributes
            if created:
                token.save()

            r_val = {
                'userID': user_info.userid if user_info else None,
                'isAdmin': user_info.isadmin if user_info else None,
                'firstname': user_info.firstname if user_info else None,
                'middlename': user_info.middlename if user_info else None,
                'lastname': user_info.lastname if user_info else None,
                'dob': user_info.dob if user_info else None,
                'routingnum': user_info.routingnum if user_info else None,
                'accountnum': user_info.accountnum if user_info else None,
                'streetaddress': user_info.streetaddress if user_info else None,
                'state': user_info.state if user_info else None,
                'zipcode': user_info.zipcode if user_info else None,
                'token': token.key
            }
            # for debugging
            print(r_val)
            return JsonResponse(r_val)
        else:
            # Authentication failed
            r_val = {'userID': '-1', 'isAdmin': '-1', 'token': None}
            # for debugging
            print('FAIL' + JsonResponse(r_val))
            return JsonResponse(r_val)
