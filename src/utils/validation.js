export function validatePassword(password){

    if(password.length < 8){
      return 'The password must have at least 8 characters!';
    }
    if(password.length > 30){
      return 'The password must have maximum of 30 characters!';
    }
    if(!password.match(/[a-z]/)){
      return 'The password must have at least 1 lowcase character!';
    }
    if(!password.match(/[A-Z]/)){
      return 'Must have at least 1 uppercase character!';
    }
    if(!password.match(/[0-9]/)){
      return 'Must have at least 1 numberic character!';
    }
    if(!password.match(/[!@#$%^&?*]/)){
      return 'Must have at least 1 special character!';
    }

    return '';
  }

export function validateEmail(email){
    if(!email){
      return 'Empty email, enter a valid email address!';
    }
    if(email.search("@") < 0){
      return 'Missing @, enter a valid email address!';
    }
    var recipient = email.substr(0, email.search("@"));
    var domain = email.substr(email.search("@") + 1);
    
    if(recipient.length < 1 || recipient.length > 64){
      return 'Invalid recipient name, enter a valid email address!';
    }
    if(domain.length < 1 || domain.length > 253){
      return 'Invalid domain name, enter a valid email address!';
    }
    if(recipient.charAt(0) === "." || recipient.charAt(recipient.length - 1) === "."
    || recipient.charAt(0) === "-" || recipient.charAt(recipient.length - 1) === "-"
    || recipient.charAt(0) === "_" || recipient.charAt(recipient.length - 1) === "_"
    || recipient.charAt(0) === "+" || recipient.charAt(recipient.length - 1) === "+"
    ){
      return 'Invalid recipient email name!';
    }
    if(domain.charAt(0) === "." || domain.charAt(domain.length - 1) === "."
    || domain.charAt(0) === "-" || domain.charAt(domain.length - 1) === "-"
    || domain.charAt(0) === "_" || domain.charAt(domain.length - 1) === "_"
    || domain.charAt(0) === "+" || domain.charAt(domain.length - 1) === "+"
    ){
      return 'Invalid domain email name!';
    }
    if(recipient.match(/\.\./)){//two consecutive dots on recipient part
      return 'Invalid recipient email name, consecutive dots!';
    }
    if(domain.match(/\.\./)){//two consecutive dots on domain part
      return 'Invalid domain email name, consecutive dots!';
    }
    if(!recipient.match(/^[A-Za-z0-9!#%&`_=\\/$'*+?^{}|~.\-" ]+$/)){//invalid character on recipient part
      return 'Invalid recipient name, enter a valid email address!';  
    }
    if(!domain.match(/^[A-Za-z0-9.-]+$/)){//invalid character on domain part
      return 'Invalid domain name, enter a valid email address!';
    }
    if(!domain.match(/\./)){
      return 'Invalid top level email domain!';
    }
    return '';
}