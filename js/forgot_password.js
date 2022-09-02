$('#btn-send').click(function () {
    startLoader();
    $.ajax({
        url:'https://spoti-clone.herokuapp.com/api/auth/forgot-password',
        type:'POST',
        dataType:'json',
        data:{email:$('#email').val()},
        success:function (response) {
            if(!response.error){
                stopLoader();
                alert("Check your email, we send password reset link");
            }else{
                stopLoader();
                alert(response.message);
            }
        }
    })
});


async function startLoader(){
    let loader = '<div class="loader" id="loader"></div>';
    $('#btn-send').html(loader);
    $('#btn-send').css('background-color','transparent');
}

async function stopLoader(){
    $('#btn-send').css('background-color','rgb(34, 175, 53)');
    $('#btn-send').html('Send reset link');
}