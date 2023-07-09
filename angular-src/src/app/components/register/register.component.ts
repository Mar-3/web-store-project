import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'src/app/services/flashmessages.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {



  name: String = '';
  username: String = '';
  email: String = '';
  password: String = '';

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessagesService
  ) {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    // Check require fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessageService.newMessage('Please give all fields','warning');
      return false;
    }

    if(!this.validateService.validateEmail(user.email.valueOf())) {
      this.flashMessageService.newMessage('Please give proper email', 'warning');
      return false;
    }

    // Register user to backend
    this.authService.registerUser(user).subscribe(data => {
      console.log(data.body);
      if(data.body['success']) {
        this.flashMessageService.newMessage(data.body['message'], 'success');
        this.router.navigate(['/login']);
      } else {
        this.flashMessageService.newMessage(data.body['message'], 'error');
        this.router.navigate(['/register']);
      }
    });
    return true;
  }


}
