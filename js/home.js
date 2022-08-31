function openMusicBar(event){
    let music_item = $(event);
    $('#music-bar').css('transform','translateX(0%)');
}

function closeMusicBar(event){
    let music_bar_close_btn = $(event);
    $('#music-bar').css('transform','translateX(-100%)');
}

function playMusic(event){
    let play_buton = $(event);
    if(play_buton.val()=='paused'){
        let icon = "<i class='fa-solid fa-play'></i>"
        play_buton.html(icon);
        play_buton.val('playing')
    }else if(play_buton.val()=='playing'){
        let icon = "<i class='fa-solid fa-pause'></i>"
        play_buton.html(icon);
        play_buton.val('paused');
    }
}