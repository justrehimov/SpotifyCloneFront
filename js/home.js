function openMusicBar(event){
    let music_item = $(event);
    $('#music-bar').css('transform','translateX(0%)');
}

function closeMusicBar(event){
    let music_bar_close_btn = $(event);
    $('#music-bar').css('transform','translateX(-100%)');
    console.log('calsiri');
}