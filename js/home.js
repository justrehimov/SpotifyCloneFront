$(document).ready(function () {
    if(!isAuthenticated()){
        location.href='login.html';
    }
    loadMusicItems(null);
});


function isAuthenticated(){
    if(localStorage.getItem('user_id')=='null' || localStorage.getItem('access_token')=='null'){
        return false;
    }
    return true;
}



function openMusicBar(music_id) {
    setAllMusicData(music_id);
    $('#music-bar').css('transform', 'translateX(0%)');
}

function setAllMusicData(music_id){
    let music_data = getMusic(music_id);
    let music_storage = getStorage(music_data.storage_music_id);
    let audio = document.getElementById('audio');
    $('#music-range-input').attr('max',parseInt(audio.duration,10))

    $('#audio').attr('src',music_storage.url);
    let image_storage = getStorage(music_data.storage_image_id);
    fetch(music_storage.url)
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
            let objectURL = URL.createObjectURL(blob);
            $('.btn-download').attr('href',objectURL);
            $('.btn-download').attr('download',music_data.name);
        });
    $('#music-bar-musician-img').attr('src',image_storage.url);
    $('.playing-music-name').html(music_data.name);
    $('.playing-music-artist').html(music_data.artist_name);
    setTimeout(function (){
        let music_duration = document.getElementById('audio').duration;
        $('#music-range-input').attr('min',0);
        setInterval(function () {
            let music_current_time = audio.currentTime;
            $('.music-duration').html(calculateDurationToTime(music_duration));
            $('#music-range-input').attr('value', parseInt(music_current_time,10));
            $('.current-second').html(calculateDurationToTime(music_current_time));
        },200);
    },1000);
}


document.getElementById('music-range-input').addEventListener('change',function() {
    this.setAttribute('value',this.value);
});

function closeMusicBar() {
    $('#music-bar').css('transform', 'translateX(-100%)');
}


function playMusic(event) {
    let play_buton = $(event);
    let audio = document.getElementById('audio');
    if (audio.paused) {
        if (play_buton.val() == 'playing') {
            let icon = "<i class='fa-solid fa-play'></i>"
            play_buton.html(icon);
            play_buton.val('paused')
            audio.pause();
        }else if (play_buton.val() == 'paused') {
            let icon = "<i class='fa-solid fa-pause'></i>"
            play_buton.html(icon);
            play_buton.val('playing');
            audio.play();
        }
    } else {
        if (play_buton.val() == 'paused') {
            let icon = "<i class='fa-solid fa-pause'></i>"
            play_buton.html(icon);
            play_buton.val('playing');
            audio.play();
        }
        else if (play_buton.val() == 'playing') {
            let icon = "<i class='fa-solid fa-play'></i>"
            play_buton.html(icon);
            play_buton.val('paused')
            audio.pause();
        }
    }
}

$('#search-input').keyup(function (){
    let filter = $('#search-input').val();
    loadMusicItems(filter);
})

function loadMusicItems(filter) {
    $.ajax({
        url: "https://spoti-clone.herokuapp.com/api/music/list",
        type: "GET",
        data:{filter:filter},
        headers:{
            'Authorization':'Bearer ' + localStorage.getItem('access_token')
        },
        dataType: "json",
        success: function (response) {
            if(!response.error){
                let html = '';
                response.result.forEach(function (music) {
                    let image_storage = getStorage(music.storage_image_id);
                    let music_item =
                        "<div class='music-container' onclick='openMusicBar(" + music.id + ")'>\n" +
                        "            <img class='music-background-img' src='" + image_storage.url + "'/>\n" +
                        "            <div class='music-data'>\n" +
                        "                <div class='music-info'>\n" +
                        "                    <span class='music-name'>" + music.name + "</span>\n" +
                        "                    <span class='musician-name'>" + music.artist_name + "</span>\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "        </div>";
                    html+=music_item
                });
                $('#music-body').html(html);

            }else{
                if(response.message.includes('token')){
                    alert('Your session has expired, you will redirecting login page');
                    location.href='login.html'
                }else{
                    alert(response.message);
                }
            }
        }
    });
}



function getMusic(id){
    let music_data = null;
    $.ajax({
        url:"https://spoti-clone.herokuapp.com/api/music/" + id,
        type:"GET",
        headers:{
            'Authorization':'Bearer ' + localStorage.getItem('access_token')
        },
        async:false,
        global:false,
        dataType:"json",
        success: function (response){
            if(!response.error){
                music_data = response.result;
            }else{
                if(response.message.includes('token')){
                    alert('Your session has expired, you will redirecting login page');
                    location.href='login.html'
                }else{
                    alert(response.message);
                }
            }
        }
    });
    return music_data;
}

function getStorage(id){
    let storage = null;
    $.ajax({
        url:'https://spoti-clone.herokuapp.com/api/storage/'+id,
        type:'GET',
        async:false,
        global:false,
        headers:{
            'Authorization':'Bearer ' + localStorage.getItem('access_token')
        },
        dataType:'json',
        success: function (response) {
            if(!response.error){
               storage = response.result;
            }else{
                if(response.message.includes('token')){
                    alert('Your session has expired, you will redirecting login page');
                    location.href='login.html'
                }else{
                    alert(response.message);
                }
            }
        }
    });
    return storage;
}


function calculateDurationToTime(duration){
    let time = parseInt(duration);
    let minutes = parseInt(time/60,10);
    let seconds = parseInt(time - (minutes*60),10);
    return minutes + ':' + (seconds<10?'0'+seconds:seconds);
}