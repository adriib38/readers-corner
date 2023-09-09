import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthSession, User } from '@supabase/supabase-js';
import { Profile, SupabaseService } from '../services/supabase.service';
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
    private readonly supabase: SupabaseService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    //Check usser logged
    let isLoggedIn = await this.supabase.isUserLoggedIn();

    if (isLoggedIn) {
      //User logged actions
      console.log('Logueado');

      this.getCurrentUser();
    } else {
      //User NO logged actions
      console.log('NO Logueado');
      this.router.navigate(['/auth']);
    }
  }

  /**
   * Get current user information
   */
  async getCurrentUser() {
    try {
      const { data, error } = await this.supabase.auth.getUser();

      if (error) {
        console.error('Error al obtener el usuario actual: ', error);
      } else {
        this.currentUser = data?.user;
        console.log('Current user: ', this.currentUser);
      }
    } catch (error) {
      console.error('Error al obtener el usuario actual: ', error);
    }
  }

  /**
   * Close user session
   */
  async logOut() {
    console.log('logOut()');

    try {
      await this.supabase.logOut();
      console.log('Sesion cerrada con exito');

      this.router.navigate(['/']);
    } catch (error) {
      console.log('Error al cerrar sesión: ', error);
    }
  }
}
