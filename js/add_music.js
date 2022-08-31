function onSelectCoverImage(event){
    let image_label = $('#music-cover-img-label');
    let image_input = event;
    if(event.files[0]==null){
        image_label.html("Select cover image");
    }else {
        let selected_image_name = image_input.files[0].name;
        image_label.html(selected_image_name);
    }
}

function onSelectMusicFile(event){
    let music_label = $('#music-file-label');
    let music_input = event;
    if(event.files[0]==null){
        music_label.html("Select music file");
    }else {
        let selected_music_name = music_input.files[0].name;
        music_label.html(selected_music_name);
    }
}

