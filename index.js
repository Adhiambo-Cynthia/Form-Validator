const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2')
const tabs=document.querySelectorAll('.tab')
const tabContents=document.querySelectorAll('.tab-content')
//get corect tab content
function showTab(tabIndex){
    tabs.forEach(function(tab,i){
        console.log(i)
        console.log(tabIndex)
        if(i=== tabIndex){
            tab.classList.add('active')
        }
        else{
            tab.classList.remove('active')
        }
    })
    
    
    tabContents.forEach(function(content){
        content.style.display="none"
    })
    tabContents[tabIndex].style.display="block"
}
showTab(0)
//show input error message
function showError(input, message){
    const formControl = input.parentElement;
      formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
      small.innerText = message;

}
//show success
function showSuccess(input){
    const formControl=input.parentElement;
        formControl.classList.add('success')
}
// check fields
function checkField(inputarr){
    inputarr.forEach(function(input){
        if(input.value.trim()===''){
            showError(input,`${upperCase(input)} is required`)
        }
        else{
            showSuccess(input)
        }

    })
}
//to uper case the first letter of erro message
function upperCase(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}
//check length of fields
function checkLength(input,min,max){
    if(input.value.length<min){
        showError(input,`${upperCase(input)} should be at least ${min} characters`)
    }
    else if(input.value.length>max){
        showError(input,`${upperCase(input)} should be less than ${min} characters`)
    }
    else{
        showSuccess(input)
    }

}
// check email validity
function checkEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email.value.trim()))){
        email.value.toLowerCase()
        showSuccess(email)
    }
    else{
        showError(email,"Invalid Email!")
    }
}
//check password strength
function checkPasswordStrength(password){
    const psw = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if(psw.test(password.value)){
        showSuccess(password)
    }
    else{
        showError(password,"Your password should contain at least one lowercase,uppercase,numeric and symbol character")
    }
}
//check password match
function checkPasswordsMatch(input1,input2){
    if(input1.value !== input2.value){
        showError(input2, "Passwords do not match")
    }
    else{
        showSuccess(input2)
    }
}
// events
form.addEventListener('submit', function(e){
    e.preventDefault()
    checkField([username,email,password,password2])
    checkLength(password,8,20)
    checkLength(username,3,20)
    checkEmail(email)
    checkPasswordsMatch(password,password2)
    checkPasswordStrength(password)
    
})