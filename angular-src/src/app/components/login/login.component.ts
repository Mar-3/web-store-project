import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: String = '';
  password: String = '';

  constructor(
    private authService:AuthService,
    private router:Router
    ) { }

  onLoginSubmit(){
    console.log(this.username);
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log('authenticateUser data:', data)
      if(data.body['success']) {
        this.authService.storeUserData(data.body['token'], data.body['user']);
        this.router.navigate(['/dashboard']);

      } else {
        console.log(data.body['msg']);
        this.router.navigate(['/login']);
      }
    })
  }
}
