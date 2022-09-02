$(document).ready(function () {
    if(!isAuthenticated()){
        location.href='login.html';
    }
    setUserData();
});


function isAuthenticated(){
    if(localStorage.getItem('user_id')=='null' || localStorage.getItem('access_token')=='null'){
        return false;
    }
    return true;
}

function setUserData(){
    $.ajax({
        url: "https://spoti-clone.herokuapp.com/api/user/" + localStorage.getItem('user_id'),
        type: 'GET',
        headers:{
            'Authorization':'Bearer ' + localStorage.getItem('access_token')
        },
        dataType:'json',
        success: function (response) {
            if(!response.error){
                $('#email').val(response.result.email);
                $('#username').val(response.result.username);
            }else{
                alert('Your session has expired, you will redirecting to login page')
                location.href='login.html';
            }
        }
    })
}

$('#btn-save').click(function (){

    startLoader();

    let data = {
        email:$('#email').val(),
        username:$('#username').val()
    };

    $.ajax({
        url:'https://spoti-clone.herokuapp.com/api/user/' + localStorage.getItem('user_id'),
        type: 'PUT',
        headers: {
            'Authorization':'Bearer ' + localStorage.getItem('access_token'),
            'Content-type':'application/json'
        },
        dataType: 'json',
        data: JSON.stringify(data),
        success: function (response) {
            if(!response.error){
                stopLoader();
                setUserData();
                alert('Data successfully updated. If you change your email address you must confirm it');

            }else{
                stopLoader();
                if(response.message.includes('token')){
                    alert('Your session has expired, you will redirecting login page');
                    location.href='login.html';
                }else{
                    alert(response.message)
                }
            }
        }
    })
})


$('#btn-logout').click(function (){
    localStorage.setItem('user_id', null);
    localStorage.setItem('access_token', null);
    location.href='login.html';

})

async function startLoader(){
    let loader = '<div class="loader" id="loader"></div>';
    $('#btn-save').html(loader);
    $('#btn-save').css('background-color','transparent');
}

async function stopLoader(){
    $('#btn-save').css('background-color','rgb(34, 175, 53)');
    $('#btn-save').html('Save');
}