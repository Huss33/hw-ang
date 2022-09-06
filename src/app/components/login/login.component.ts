import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

const LOGIN: string = 'Login'
const REGISTER: string = 'Register'
const NEED_ACCT: string = 'Need an account'
const HAVE_ACCT: string = 'Have an account'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  pending: boolean = false
  isLoggingIn: boolean = true
  submitText: string = LOGIN
  linkText: string = NEED_ACCT

  constructor(private uiService: UiService) {
    uiService.whenIsLoggingInChanges().subscribe(isLoggingIn => {
      this.isLoggingIn = isLoggingIn 

      if (isLoggingIn) {
        this.submitText = LOGIN
        this.linkText = NEED_ACCT
      } else {
        this.submitText = REGISTER
        this.linkText = HAVE_ACCT
      }
    })
  }

  ngOnInit(): void {
  }

  onSubmit(event: {preventDefault: () => void}): void {
    event.preventDefault()
    if (this.isLoggingIn)
    this.uiService.attemptLogin({
      username: this.username,
      password: this.password
    })
    else
      this.uiService.attemptRegister({
        username: this.username,
        password: this.password
      })
    
  }

  onLink(event: {preventDefault: () => void}): void {
    event.preventDefault()
    
    if (this.isLoggingIn)
      this.uiService.showRegisterPage()
    else
      this.uiService.showLoginPage()
  }

}
