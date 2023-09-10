import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthSession, User } from '@supabase/supabase-js';
import { Profile, AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  loading = false;
  currentUser!: User;
  profile!: Profile;

  @Input()
  session!: AuthSession;

  constructor(
    private router: Router,
    private readonly authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    //Check user logged
    let isLoggedIn = await this.authService.isUserLoggedIn();

    if (isLoggedIn) {
      //User logged actions
      console.log('Logged');

      this.getCurrentUser();
    } else {
      //User NO logged actions
      console.log('NO Logged');
      this.router.navigate(['/auth']);
    }
  }

  /**
   * Get current user information
   */
  async getCurrentUser() {
    try {
      const { data, error } = await this.authService.auth.getUser();

      if (error) {
        console.error('Error getting current user: ', error);
      } else {
        this.currentUser = data?.user;
        console.log('Current user: ', this.currentUser);
      }
    } catch (error) {
      console.error('Error getting current user: ', error);
    }
  }

  /**
   * Close user session
   */
  async logOut() {

    try {
      await this.authService.logOut();
      console.log('Session closed');
      location.reload();
      
    } catch (error) {
      console.log('Logout error: ', error);
    }
  }
}
