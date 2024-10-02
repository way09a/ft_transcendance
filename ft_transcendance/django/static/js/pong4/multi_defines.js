export default function set_defines(data) {
    var defines = create_Defines();
    defines.v_init = set_preference1(data.preference1);
    defines.v_paddle = set_preference2(data.preference2);
    defines.url_ball = set_preference3(data.preference3);
    defines.url_ground = set_preference4(data.preference4);
    defines.max_points = set_preference5(data.preference5);
    return defines;
}

function create_Defines(){
    return {
        game_width: 800,
        game_height: 500,
        max_points: 1,
        left_color: 'white',
        right_color: 'white',
        color_ball: 'white',
        color_ground: 'black',
        v_init: 1,
        v_paddle: 2,
        url_ball: '/static/img/ball.png',
        url_ground: '/static/img/basketball_court.jpg',
        player_name_left: "Player1",
        player_name_right: "Player2",
        player_name_left1: "Player11",
        player_name_right1: "Player22",
    };
}

//initial velocity of the ball
function set_preference1(data_preference) {
    var preference = 'default';
    
    switch (data_preference) {
        case 'Standard':
            preference = 1;
            break;
        case 'Slow':
            preference = 0.5;
          break;
        case 'Quick':
            preference = 2;
          break;
        case 'Super_Quick':
            preference = 4;
          break;
        default:
            preference = 1;
    }

    return preference;
}

//racket speed
function set_preference2(data_preference) {
    var preference = 'default';
    
    switch (data_preference) {
        case 'Standard':
            preference = 2;
            break;
        case 'Slow':
            preference = 1;
          break;
        case 'Quick':
            preference = 2;
          break;
        case 'Super_Quick':
            preference = 4;
          break;
        default:
            preference = 2;
    }

    return preference;
}

//Skin pong
function set_preference3(data_preference) {
    var preference = 'none';

    switch (data_preference) {
        case 'White_(Standard)':
            preference = 'none';
            break;
        case 'Tenis':
            preference = '/static/img/pong/tennis_ball.png';
          break;
        case 'Baseball':
            preference = '/static/img/pong/baseball_ball.png';
          break;
        case 'Basketball':
            preference = '/static/img/pong/basketball_ball.png';
          break;
        default:
            preference = 'none';
    }

    return preference;
}

//Skin field
function set_preference4(data_preference) {
    var preference = 'none';
    
    switch (data_preference) {
        case 'Black_(Standard)':
            preference = 'none';
            break;
        case 'Tenis':
            preference = '/static/img/pong/tennis_court.png';
          break;
        case 'Baseball':
            preference = '/static/img/pong/baseball_court.png';
          break;
        case 'Basketball':
            preference = '/static/img/pong/basketball_court.jpg';
          break;
        default:
            preference = 'none';
    }

    return preference;
}

//maximum points
function set_preference5(data_preference) {
    var preference = 11;

    switch (data_preference) {
        case '11_Points_(Standard)':
            preference = 11;
            break;
        case '1_points':
            preference = 1;
          break;
        case '3_points':
            preference = 3;
          break;
        case '20_points':
            preference = 20;
          break;
        default:
            preference = 11;
      }
    return preference;
}