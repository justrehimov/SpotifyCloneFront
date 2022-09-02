$('#btn-reset').click(function () {

    startLoader();

    let params = (new URL(document.location)).searchParams;
    let token = params.get("token");
    let data ={
        new_password:$('#new_password').val(),
        confirm_password:$('#confirm_password').val()
    };
    $.ajax({
        url:'https://spoti-clone.herokuapp.com/api/auth/reset-password/'+token,
        type:'POST',
        headers:{'content-type':'application/json'},
        data: JSON.stringify(data),
        dataType:'json',
        success:function (response) {
            if(!response.error){
                stopLoader();
                alert('Password updated')
                setTimeout(function (){
                    location.href='login.html';
                },2000);
            }else{
                stopLoader();
                alert(response.message)
            }
        }
    })
});


async function startLoader(){
    let loader = '<div class="loader" id="loader"></div>';
    $('#btn-reset').html(loader);
    $('#btn-reset').css('background-color','transparent');
}

async function stopLoader(){
    $('#btn-reset').css('background-color','rgb(34, 175, 53)');
    $('#btn-reset').html('Reset password');
}