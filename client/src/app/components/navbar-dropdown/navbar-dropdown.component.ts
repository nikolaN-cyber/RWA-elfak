import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-navbar-dropdown',
  standalone: true,
  imports: [MatSelectModule],
  templateUrl: './navbar-dropdown.component.html',
  styleUrl: './navbar-dropdown.component.css'
})
export class NavbarDropdownComponent {

}
