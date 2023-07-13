import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'src/app/services/flashmessages.service';

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
    private router:Router,
    private flashMessagesService:FlashMessagesService
    ) { }

  onLoginSubmit(){
    console.log(this.username);
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.body['success']) {
        this.authService.storeUserData(data.body['token'], data.body['user']);
        this.flashMessagesService.newMessage(data.body['message'], 'success');
        this.router.navigate(['/profile']);

      } else {
        console.log(data);
        console.log(data.body['message']);
        this.flashMessagesService.newMessage(data.body['message'], 'error');
        this.router.navigate(['/login']);
      }
    })
  }
}
