import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoggedIn = false;
  userData: any;

  loading = false;

  signInFormMagiclink = this.formBuilder.group({
    email: '',
  });

  constructor(
    private router: Router,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    //Check usser logged
    this.isLoggedIn = await this.authService.isUserLoggedIn();

    if (this.isLoggedIn) {
      //User logged actions
      console.log('Logueado');
      this.router.navigate(['/account']);
    } else {
      //User NO logged actions
      console.log('NO Logueado');
    }
  }

  async onSubmitMagicLink(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInFormMagiclink.value.email as string;
      const { error } = await this.authService.signInMagicLink(email);
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInFormMagiclink.reset();
      this.loading = false;
    }
  }

  async signInWithGitHub() {
    console.log('signInWithGitHub');
    try {
      const data = await this.authService.signInWithGitHub();
      this.userData = data;

      console.log('Data recibida: ' + JSON.stringify(this.userData));
    } catch (error) {
      console.error('Error al iniciar sesión con GitHub:', error);
    }
  }
}
