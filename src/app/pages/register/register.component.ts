import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(public router: Router) {


  }

  username: string = '';
  password: string = '';
  passwordConfirm: string = '';
  email: string = '';
  errorCount = [0,0,0,0]

  onSubmit(): void {
    this.validateInputs();
    const errorCountCheck = this.errorCount.reduce(((sum,num) => sum + num ),0)

    if(errorCountCheck === 0){
      Swal.fire({
          title:"Success!",
          text:"Kindly check your e-mail address for the confirmation to complete registeration!",
          icon: "success",
      }).then(() => {
          this.router.navigate(['/'])
      });
  }
  }


setError = (element: any, message: string) => {
  const inputControl = element.parentElement // access the parent element (<div class="input-control">)to add the class .error to it  so for example if the error in the username section the div of the username only will get affected and so on
  const errorValue = inputControl.querySelector('.error')

  inputControl.classList.add('error')
  inputControl.classList.remove('success')
  errorValue.innerText = message
}
setSuccess = (element: any) => {
  const inputControl = element.parentElement
  const errorValue = inputControl.querySelector('.error')

  inputControl.classList.add('success')
  inputControl.classList.remove('error')
  errorValue.innerText = ''

}


  isTheEmailValid = (email: string) => {
    const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    return re.test(email)
  }

  passwordStrengthCheck = (password: string) => {
    const re = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/) // this needs an updated password with slashes (/ ? ) dosen't work
    return re.test(password) // returns true if the values of the regex exists and false if not
  }





  validateInputs = () => {
    const usernameValue = this.username.trim()
    const passwordValue = this.password.trim()
    const passwordConfirmValue = this.passwordConfirm.trim()
    const emailValue = this.email.trim()


    const form = document.getElementById('form')
    const username = document.getElementById('username')
    const password = document.getElementById('password')
    const passwordConfirm = document.getElementById('password-confirm')
    const email = document.getElementById('email')

    if(usernameValue === '') {
        this.setError(username, 'Username is required!')
        this.errorCount[0] = 1
    } else {
        this.setSuccess(username)
        this.errorCount[0] = 0
    }

    if(passwordValue === ''){
        this.setError(password, 'Password is required!')
        this.errorCount[1] = 1
    }else if(passwordValue.length < 8) {
        this.setError(password, 'Password have to be 8 chars at least')
        this.errorCount[1] = 1
    }else if(this.passwordStrengthCheck(passwordValue)===false){
        this.setError(password, 'at least 1 lowercase char,uppercase char,number,special char')
        this.errorCount[1] = 1
        alert('Password must contain at least 1 lowercase ,1 uppercase,a number and a special char')
        Swal.fire({
            icon:'warning',
            title:'Registeration Error!',
            text:"Password must contain at least 1 lowercase ,1 uppercase,a number and a special char",
            timer: 10000
        });

    }else {
        this.setSuccess(password)
        this.errorCount[1] = 0
    }

    if(passwordConfirmValue === ''){
        this.setError(passwordConfirm, 'Password is required!')
        this.errorCount[2] = 1

    }else if(passwordConfirmValue !== passwordValue) {
        this.setError(passwordConfirm, "Password dosen't match")
        this.errorCount[2] = 1

    }else {
        this.setSuccess(passwordConfirm)
        this.errorCount[2] = 0
    }

    if(emailValue === ''){
        this.setError(email, 'Email is required!')
        this.errorCount[3] =  1

    }else if(this.isTheEmailValid(emailValue)===false) {
        this.setError(email, "Email address is not valid!")
        this.errorCount[3] =  1

    }else {
        this.setSuccess(email)
        this.errorCount[3] = 0
    }

  }


}



