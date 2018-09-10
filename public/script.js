console.log('Script Strarted');


$('#submit').on('click',()=>{
  let login = $('#login').val();
  let password = $('#password').val();

  if(login.length < 6 || password.lenth < 6){
    console.log(`Didn't pass the validation`);
  }else{
    $.post('/register',{
      login,
      password,
    },(data,status)=>{
      console.log(data);
    })
  }
})
