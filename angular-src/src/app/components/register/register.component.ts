import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';
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
    private router: Router
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
      console.log('Please give all fields');
      return false;
    }

    if(!this.validateService.validateEmail(user.email.valueOf())) {
      console.log('Please give proper email');
      return false;
    }

    // Register user to backend
    this.authService.registerUser(user).subscribe(data => {
      console.log(data.body);
      if(data.body['success']) {
        console.log('You are now registered and can log in.')
        this.router.navigate(['/login']);
      } else {
        console.log('error in registering user.');
        this.router.navigate(['/register']);
      }
    });
    return true;
  }


}
