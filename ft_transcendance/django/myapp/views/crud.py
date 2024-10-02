from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from myapp.serializers import User_Serializer
from rest_framework.decorators import parser_classes, api_view, permission_classes
from rest_framework.parsers import FormParser, MultiPartParser
from myapp.models import UserPreferences
from myapp.serializers import User_Preferences_Serializer
import logging
from myapp.models import OurUserProfile
from django.contrib.auth import get_user_model
from myapp.serializers import User_Serializer


user_info_logger = logging.getLogger(__name__)

User = get_user_model()  # Use the custom user template

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getuser_info_by_id(request, user_id):
    user_info_logger.debug(f"Receiving request to fetch information from User with ID: {user_id}")
    try:
        user = User.objects.get(id=user_id)
        user_info_logger.debug(f"User found: {user}")
        user_info = {
            'id': user.id,
            'user_name': user.username,
            'profile_image': user.profile_image.url if user.profile_image else None,
            'online': user.is_online  # Assuming there is an is_online field in the user profile
        }
        user_info_logger.debug(f"User Information: {user_info}")
        return JsonResponse(user_info)
    except User.DoesNotExist:
        user_info_logger.error(f"User with this id {user_id} does't exist.")
        return JsonResponse({'message': 'the User was not found'}, status=404)
    except Exception as e:
        user_info_logger.error(f"An unexpecred error has occurred: {str(e)}")
        return JsonResponse({'message': 'An unexpecred error has occurred', 'error': str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getuser_infos(request):
    try:
        user_info = request.user
        info_user = {
            'id': user_info.id,
            'username': user_info.username,
            'email': user_info.email,
            'image': user_info.profile_image.url if user_info.profile_image else None
        }
        return JsonResponse(info_user)
    except User.DoesNotExist:
        return JsonResponse({'message': 'User was not found'}, status=404)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@parser_classes([FormParser, MultiPartParser])
def updating_user(request):
    try:
        user_update = request.user
        serializer = User_Serializer(user_update, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            info_user = {
                'id_user': user_update.id,
                'username': user_update.username,
                'user_email': user_update.email,
                'user_image': user_update.profile_image.url if user_update.profile_image else None
            }
            return JsonResponse(info_user)
        return JsonResponse(serializer.errors, status=400)
    except User.DoesNotExist:
        return JsonResponse({'message': 'the User was not found'}, status=404)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def User_Preferences_View(request):
    try:
        user_preferences = UserPreferences.objects.get(user=request.user)
    except UserPreferences.DoesNotExist:
        user_preferences = UserPreferences.objects.create(
            user=request.user,
            preference1='Standard',
            preference2='Standard',
            preference3='White_(Standard)',
            preference4='Black_(Standard)',
            preference5='11_Points_(Standard)'
        )

    if request.method == 'GET':
        serializer = User_Preferences_Serializer(user_preferences)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = User_Preferences_Serializer(user_preferences, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_all_users(request):
    try:
        users = OurUserProfile.objects.all()
        users_data = [
            {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
				'is_online': user.is_online,
            }
            for user in users
        ]
        return Response(users_data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': f'Error listing users: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




search_logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def search_id_by_username(request):
    username = request.data.get('username')
    try:
        search_logger.info(f"Searching for user: {username}")
        user = OurUserProfile.objects.get(username=username)
        search_logger.info(f"User found: {user.id}")
        return Response({'id': user.id}, status=status.HTTP_200_OK)
    except OurUserProfile.DoesNotExist:
        search_logger.warning(f"User not found: {username}")
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        search_logger.error(f"Error searching for user: {e}")
        return Response({'error': f'Error searching for user: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
