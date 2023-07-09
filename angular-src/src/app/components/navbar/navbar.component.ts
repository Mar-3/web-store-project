import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'src/app/services/flashmessages.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    private router:Router,
    private flashMessageService:FlashMessagesService
    ) { }

    onLogoutClick() {
      this.authService.logout();
      this.flashMessageService.newMessage('Youa re now logged out', 'warning');
      this.router.navigate(['']);
    }

}
