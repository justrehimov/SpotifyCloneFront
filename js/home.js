function openMusicBar(event, music_id) {
    let music_item = $(event);
    loadMusic();
    $('#music-bar').css('transform', 'translateX(0%)');
    setTimeout(function (){
        setAudioData();
    },1000);
    setInterval(function (){
        setAudioTime();
    },1000);
}

function closeMusicBar(event) {
    let music_bar_close_btn = $(event);
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

$(document).ready(function () {
    loadMusicItems();
});

function loadMusicItems() {
    $.ajax({
        url: "data/music_data.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            let html = "";
            for (let i = 0; i < data.musics.length; i++) {
                let element = data.musics[i];
                let item =
                    "<div class='music-container' onclick='openMusicBar(this," + element.id + ")'>\n" +
                    "            <img class='music-background-img' src='" + element.pictureUrl + "'/>\n" +
                    "            <div class='music-data'>\n" +
                    "                <div class='music-info'>\n" +
                    "                    <span class='music-name'>" + element.name + "</span>\n" +
                    "                    <span class='musician-name'>" + element.artist + "</span>\n" +
                    "                </div>\n" +
                    "                <button class='btn-download'><i class='fa-solid fa-arrow-down'></i></button>\n" +
                    "            </div>\n" +
                    "        </div>";
                html += item;
            }
            $('#music-body').html(html);
        }
    });
}

function setAudioData(){
    let duration = parseInt(document.getElementById('audio').duration, 10);
    let range_input = document.getElementById('music-range-input');
    range_input.setAttribute('max', duration);
    range_input.setAttribute("min", 0);
}


function setAudioTime(){
    let currentTime = parseInt(document.getElementById('audio').currentTime, 10);
    let range_input = document.getElementById('music-range-input');
    range_input.setAttribute('value', currentTime);
}

function changeAudioTime(event){
    console.log(event.trigger().value);
    let range = $(event);
    let duration = range.val();
    document.getElementById('audio').currenTime=duration;
}


function loadMusic(){
    $.ajax({
        url:"data/music.json",
        type:"GET",
        dataType:"json",
        success: function (data){
            $('#audio').attr('src', data.url);
        }
    });
}