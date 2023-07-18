import { Component, HostListener } from '@angular/core';
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
    navbarToggle:any;
    ngOnInit() {
      this.navbarToggle = document.getElementById('navbarResponsive');
    }

    @HostListener('document:click', ['$event'])
    documentClick(event: MouseEvent) {
      console.log(this.navbarToggle);
      if (this.navbarToggle?.classList.contains('show')) {
        this.navbarToggle.classList.remove('show');
      }
    }
    

    onLogoutClick() {
      this.authService.logout();
      this.flashMessageService.newMessage('You are now logged out', 'warning');
      this.router.navigate(['']);
    }

}
