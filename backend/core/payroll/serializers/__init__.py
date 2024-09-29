from rest_framework import serializers
from ..models import Login, Userinfo

class loginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = '__all__'

class userCreationSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Userinfo
        fields = '__all__'

    def create(self, data):
        import uuid
        userID = uuid.uuid4().hex
        data['userid'] = userID
        user = Userinfo.objects.create(**data)
        return user