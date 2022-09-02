$(document).ready(function () {
    if(!isAuthenticated()){
        location.href='login.html';
    }
});


function isAuthenticated(){
    if(localStorage.getItem('user_id')=='null' || localStorage.getItem('access_token')=='null'){
        return false;
    }
    return true;
}


function onSelectCoverImage(event){
    let image_label = $('#music-cover-img-label');
    if(event.files[0]==null){
        image_label.html("Select cover image");
        if(event.getAttribute('value')!=""){
            deleteFile(event.getAttribute('value'));
        }
    }else {
        uploadImageFile(event);
    }
}

function onSelectMusicFile(event){
    let music_label = $('#music-file-label');
    if(event.files[0]==null){
        music_label.html("Select music file");
        if(event.getAttribute('value')!=""){
            deleteFile(event.getAttribute('value'));
        }
    }else {
        uploadMusicFile(event);
    }
}

function deleteFile(id){
    $.ajax({
        url:'http://localhost:8080/api/storage/' + id,
        type: 'DELETE',
        dataType:'json',
        headers:{'Authorization':'Bearer ' + localStorage.getItem('access_token')},
        success:function (response){
            if(response.error){
                alert(response.message);
            }
        }

    })
}

function uploadMusicFile(event){

    startMusicUploadLoader();
    let selected_music_name = event.files[0].name;
    let formData = new FormData();
    formData.append('file', event.files[0]);
    $.ajax({
        url:'http://localhost:8080/api/storage/upload',
        type:'POST',
        dataType: 'json',
        headers:{'Authorization':'Bearer ' + localStorage.getItem('access_token')},
        data:formData,
        contentType:false,
        processData:false,
        success: function (response) {
            if(!response.error){
                stopMusicUploadLoader(selected_music_name);
                event.setAttribute('value', response.result.id);
            }else{
                stopMusicUploadLoader(selected_music_name);
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


function uploadImageFile(event){

    startImageUploadLoader();
    let selected_image_name = event.files[0].name;
    let formData = new FormData();
    formData.append('file', event.files[0]);
    $.ajax({
        url:'http://localhost:8080/api/storage/upload',
        type:'POST',
        dataType: 'json',
        headers:{'Authorization':'Bearer ' + localStorage.getItem('access_token')},
        data:formData,
        contentType:false,
        processData:false,
        success: function (response) {
            if(!response.error){
                stopImageUploadLoader(selected_image_name);
                event.setAttribute('value', response.result.id);
            }else{
                stopMusicUploadLoader(selected_music_name);
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

$('#music-upload-btn').click(function (){
    startLoader();
    let data = {
        name:$('#music-name').val(),
        artist_name:$('#artist-name').val(),
        storage_music_id:parseInt($('#music-file').attr('value')),
        storage_image_id:parseInt($('#music-cover-img').attr('value')),
        user_id:localStorage.getItem('user_id')
    };

    $.ajax({
        url:'http://localhost:8080/api/music',
        type:'POST',
        dataType: 'json',
        headers:{
            'Authorization':'Bearer ' + localStorage.getItem('access_token'),
            'Content-type':'application/json'
        },
        data:JSON.stringify(data),
        success:function (response) {
            if(!response.error){
                stopLoader();
                alert('Music uploaded');
                location.reload();
            }else{
                stopLoader();
                if(response.message.includes('token')){
                    alert('Your session has expired, you will redirecting login page');
                    location.href='login.html'
                }else{
                    alert(response.message);
                    location.reload();
                }
            }
        }
    })

});


async function startLoader(){
    let loader = '<div class="loader" id="loader"></div>';
    $('#music-upload-btn').html(loader);
    $('#music-upload-btn').css('background-color','transparent');
}

async function stopLoader(){
    $('#music-upload-btn').css('background-color','rgb(34, 175, 53)');
    $('#music-upload-btn').html('Upload music');
}

function startMusicUploadLoader(){
    let loader = '<div class="loader" id="loader"></div>';
    $('#music-file-label').html(loader);
}

function stopMusicUploadLoader(name){
    $('#music-file-label').html(name);
}


function startImageUploadLoader(){
    let loader = '<div class="loader" id="loader"></div>';
    $('#music-cover-img-label').html(loader);
}

function stopImageUploadLoader(name){
    $('#music-cover-img-label').html(name);
}