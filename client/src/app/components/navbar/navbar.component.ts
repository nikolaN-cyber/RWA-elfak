import { Component } from '@angular/core';
import { NavbarDropdownComponent } from '../navbar-dropdown/navbar-dropdown.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NavbarDropdownComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    constructor(private router: Router){}

    navigateToLogin(){
      this.router.navigate(['/login']);
    }
}
