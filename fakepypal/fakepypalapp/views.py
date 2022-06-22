

from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from .serializers import *


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profileApi(request, format=None):
    if request.user!="AnonymousUser":
        try:
            content = {
                'user': str(request.user),
                'role': str(request.user.groups.all()[0]),  
                'id': str(request.user.id),
                'email':str(request.user.email),
            }
            return Response(content)
        except:
            content = {
                'user': str(request.user),
                'role': "admin",
                'id': str(request.user.id),
                'email':str(request.user.email),
            }
            return Response(content)


#@csrf_exempt
@api_view (['GET', 'POST', 'DELETE', 'PUT'])
def userApi(request, pk=-1):
    
    if request.method == "GET":
        if pk==-1:
            users = User.objects.all()
            users_serializer = UserSerializer(users, many=True)
            return JsonResponse(users_serializer.data, status = 200,  safe=False)
        else:
            try:
                user = User.objects.get(id=pk)
                if user is not None:
                    user_serializer = UserSerializer(user)
                    return JsonResponse(user_serializer.data, status = 200, safe=False)
            except:
                message = {"message":"No such user!"}
                return JsonResponse(message, status = 404, safe=False) 
        
    elif request.method == "POST":
        
        customer_data = JSONParser().parse(request)
        try :
            other_customer = User.objects.get(username = customer_data["username"])
            if other_customer:
                message = {"message": "The User Name Already Exist!", "statusCode":400}
                return JsonResponse(message, safe=False)
        except:
            customer_data["password"] = make_password(customer_data["password"])
            customer_serializer = UserSerializer(data=customer_data)
            if customer_serializer.is_valid():
                customer_serializer.save()
                message = {"message":"User Registered Succesfully!", "statusCode":201}
                return JsonResponse(message, status=201, safe=False)
            message = {"message":"Email should be like sami@gmail.com!", "statusCode":400}
            return JsonResponse(message, status=400, safe=False)
    
    elif request.method == "PUT":
        customer_data = JSONParser().parse(request)
        try:
            customer = User.objects.get(id = pk)
            customer_data["password"] = make_password(customer_data["password"])
            customer_serializer = UserSerializer(customer, data=customer_data)
            if customer_serializer.is_valid():
                customer_serializer.save()
                message = {"message":"Data Updated Sucessfully!", "statusCode":204}
                return JsonResponse(message, safe=False)
        except:
            customer = User.objects.get(username = pk)
            customer_data["password"] = make_password(customer_data["password"])
            customer_serializer = UserSerializer(customer, data=customer_data)
            if customer_serializer.is_valid():
                customer_serializer.save()
                message = {"message":"Data Updated Sucessfully!", "statusCode":204}
                return JsonResponse(message, safe=False)
        return JsonResponse("The Same ID Is Already In Use!", safe=False)

    elif request.method == "DELETE":
        try:
            customer = User.objects.get(id=pk)
            if customer:
                customer.delete()
                return JsonResponse("Data Deleted Sucessfully!", status=204, safe=False)
        except:
            customer = User.objects.get(username=pk)
            if customer:
                customer.delete()
                return JsonResponse("Data Deleted Sucessfully!", status=204, safe=False)
        return JsonResponse("No Such User!", status = 404,  safe=False)

