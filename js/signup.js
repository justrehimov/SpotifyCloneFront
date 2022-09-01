$('#btn-sign-up').click(function (){

    startLoader();
    let data = {
        email:$('#email').val(),
        username:$('#username').val(),
        password:$('#password').val()
    };
    $.ajax({
        url: 'http://localhost:8080/api/auth/sign-up',
        type: 'POST',
        headers:{'content-type':'application/json'},
        dataType:'json',
        data:JSON.stringify(data),
        success:function (response) {
            if(!response.error){
                stopLoader();
                alert('Please check your email');
                location.href='login.html';
            }else{
                stopLoader();
                alert(response.message);
            }
        }
    })
});

async function startLoader(){
    let loader = '<div class="loader" id="loader"></div>';
    $('#btn-sign-up').html(loader);
    $('#btn-sign-up').css('background-color','transparent');
}

async function stopLoader(){
    $('#btn-sign-up').css('background-color','rgb(34, 175, 53)');
    $('#btn-sign-up').html('Sign up');
}