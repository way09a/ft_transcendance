from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from ..models import Friendship, OurUserProfile
from ..serializers import Friendship_Serializer, Friendship_Sent_Serializer, friend_List_Serializer
from django.db import models
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_Friendship_request(request):
    friend_id = request.data.get('friend_id')
    try:
        friend = OurUserProfile.objects.get(id=friend_id)
        user = request.user

        if user == friend:
            return Response({'message': 'You cannot send a Friend request to yourself.'}, status=status.HTTP_400_BAD_REQUEST)

        if Friendship.objects.filter(user=user, friend=friend).exists():
            return Response({'message': 'Friend request already sent, awaiting acceptance'}, status=status.HTTP_200_OK)

        if Friendship.objects.filter(user=friend, friend=user).exists():
            return Response({'message': 'There is already a Friendship request received from this user'}, status=status.HTTP_200_OK)

        Friendship.objects.create(user=user, friend=friend, accepted=False)
        return Response({'message': 'Friend request sent successfully!'}, status=status.HTTP_201_CREATED)

    except OurUserProfile.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error sending Friendship request: {e}")
        return Response({'error': f'Error sending Friendship request: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_pending_requests(request):
    requests = Friendship.objects.filter(friend=request.user, accepted=False)
    serializer = Friendship_Serializer(requests, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_requests_Sents(request):
    requests = Friendship.objects.filter(user=request.user, accepted=False)
    serializer = Friendship_Sent_Serializer(requests, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)






@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_friends(request):
    try:
        # Get all Friendships where the current user is the requester or friend and the Friendship was accepted
        friendships = Friendship.objects.filter(
            models.Q(user=request.user) | models.Q(friend=request.user), accepted=True
        )

        if not friendships.exists():
            return Response([], status=status.HTTP_200_OK)

        friends_ids = set()
        for friendship in friendships:
            if friendship.user == request.user:
                friends_ids.add(friendship.friend.id)
            else:
                friends_ids.add(friendship.user.id)

        # Get all users friends
        friends = OurUserProfile.objects.filter(id__in=friends_ids)

        # Serialize friends data with the 'locked' field
        serializer_context = {'request': request}
        friends_data = friend_List_Serializer(friends, many=True, context=serializer_context).data

        return Response(friends_data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error listing friends: {e}")
        return Response({'error': f'Error listing friends: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)








@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_friends_online(request):
    try:
        # Add debug log
        logger.debug("Starting the list of online friends for the user: %s", request.user)

        # Get all Friendships where the current user is the requester or friend and the Friendship was accepted
        friendships = Friendship.objects.filter(
            models.Q(user=request.user) | models.Q(friend=request.user), accepted=True
        )

        logger.debug("Friendships found: %s", friendships)

        if not friendships.exists():
            logger.debug("No Friendships found.")
            return Response([], status=status.HTTP_200_OK)

        friends_ids = set()
        for friendship in friendships:
            if friendship.user == request.user:
                friends_ids.add(friendship.friend.id)
            else:
                friends_ids.add(friendship.user.id)

        logger.debug("IDs of friends: %s", friends_ids)

        # Get all user friends who are online
        friends_online = OurUserProfile.objects.filter(id__in=friends_ids, is_online=True)
        logger.debug("online friends found: %s", friends_online)

        # Serialize online friends data
        friends_online_data = friend_List_Serializer(friends_online, many=True).data
        logger.debug("Serialized online friends data: %s", friends_online_data)

        return Response(friends_online_data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error("Error listing friends online: %s", e)
        return Response({'error': f'Error listing friends online: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)











@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verify_Friendship(request, friend_id):
    try:
        friend = OurUserProfile.objects.get(id=friend_id)
        Friendship_existe = Friendship.objects.filter(
            (models.Q(user=request.user) & models.Q(friend=friend) & models.Q(accepted=True)) |
            (models.Q(user=friend) & models.Q(friend=request.user) & models.Q(accepted=True))
        ).exists()

        return Response({'Friendship': Friendship_existe}, status=status.HTTP_200_OK)
    except OurUserProfile.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': f'Error on check Friendship: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_Friendship_request(request):
    sender_id = request.data.get('sender_id')
    try:
        sender = Friendship.objects.get(id=sender_id, friend=request.user)
        sender.accepted = True
        sender.save()
        return Response({'message': 'Friendship request approved successfully!'}, status=status.HTTP_200_OK)
    except Friendship.DoesNotExist:
        return Response({'error': 'Friendship request not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error approving Friendship request: {e}")
        return Response({'error': f'Error approving Friendship request: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_sender_Friendship(request):
    sender_id = request.data.get('sender_id')
    try:
        sender = Friendship.objects.get(id=sender_id, friend=request.user)
        sender.delete()
        return Response({'message': 'Friendship request successfully rejected!'}, status=status.HTTP_200_OK)
    except Friendship.DoesNotExist:
        return Response({'error': 'Friendship request not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error rejecting Friendship request: {e}")
        return Response({'error': f'Error rejecting Friendship request: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
