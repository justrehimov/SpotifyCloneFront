$('#btn-login').click(function (){
    startLoader();
    let data = {
        username:$('#email_or_username').val(),
        password:$('#password').val()
    };
    $.ajax({
        url: 'https://spoti-clone.herokuapp.com/api/auth/login',
        type: 'POST',
        headers:{'content-type':'application/json'},
        dataType:'json',
        data:JSON.stringify(data),
        success:function (response) {
            if(!response.error){
                stopLoader();
                localStorage.setItem('user_id',response.result.user_id);
                localStorage.setItem('access_token', response.result.access_token);
                location.href='home.html';
            }else{
                stopLoader();
                alert(response.message);
            }
        }
    })
});

async function startLoader(){
    let loader = '<div class="loader" id="loader"></div>';
    $('#btn-login').html(loader);
    $('#btn-login').css('background-color','transparent');
}

async function stopLoader(){
    $('#btn-login').css('background-color','rgb(34, 175, 53)');
    $('#btn-login').html('Login');
}