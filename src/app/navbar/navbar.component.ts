import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  avatarUrl: string | null = 'assets/images/profile_blank.png';

  constructor(
    private readonly authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    //Check usser logged
    this.isLoggedIn = await this.authService.isUserLoggedIn();

    //Get avatar
    this.avatarUrl = await this.authService.profilePicture();
  }
}
