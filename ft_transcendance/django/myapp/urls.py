# myapp/urls.py
from django.urls import path
from .views.auth import Register_View, Login_View, Logout_View, Check_AuthView,\
                        intra_login, intra_callback
from .views.crud import getuser_infos, updating_user, User_Preferences_View, \
                        list_all_users, search_id_by_username, \
						getuser_info_by_id
from .views import views
from .views.friend import send_Friendship_request, list_pending_requests,\
                          list_friends, verify_Friendship, approve_Friendship_request,\
						  reject_sender_Friendship, list_requests_Sents, list_friends_online
from .views.game_history import Game_History_CreateView, list_Game_History

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('sign_up/', Register_View.as_view(), name='signup'),
    path('log_in/', Login_View.as_view(), name='login'),
    path('log_out/', Logout_View.as_view(), name='logout'),
    path('check-auth/', Check_AuthView.as_view(), name='check_auth'),
    path('login-intra/', intra_login, name='intra_login'),
    path('callback/', intra_callback, name='intra_callback'),
    path('get-user-information/', getuser_infos, name='getuser_infos'),
    path('update-user/', updating_user, name='updating_user'),
    path('user-preferencess/', User_Preferences_View, name='user-preferences'),
	path('Friendshipss/', send_Friendship_request, name='send_Friendship_request'),
	path('Friendshipss/pendentes/', list_pending_requests, name='list_pending_requests'),
    path('Friendshipss/Sents/', list_requests_Sents, name='list_requests_Sents'),
	path('Friendshipss/list_friends/', list_friends, name='list_friends'),
	path('friends/user_online/', list_friends_online, name='list_friends_online'),
	path('Friendshipss/check/<int:friend_id>/', verify_Friendship, name='verify_Friendship'),
	path('Friendshipss/approve/', approve_Friendship_request, name='approve_Friendship_request'),
	path('Friendshipss/reject/', reject_sender_Friendship, name='reject_sender_Friendship'),
	path('users/search_user-id/', search_id_by_username, name='search_id_by_username'),
 	path('users/', list_all_users, name='list_all_users'),
	path('user-infos/<int:user_id>/', getuser_info_by_id, name='getuser_info_by_id'),
	path('games-history/', Game_History_CreateView, name='game-history-create'),
	path('games-history-list/<int:user_id>/', list_Game_History, name='list-Game-History'),
]
