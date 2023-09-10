import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from 'src/.env';
import { CookieService } from 'ngx-cookie-service';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabaseUrl = environment.supabaseUrl;
  private supabaseKey = environment.supabaseKey;
  private supabase: SupabaseClient;

  _session: AuthSession | null = null;

  constructor(private cookieService: CookieService) {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  get auth() {
    return this.supabase.auth;
  }

  get getCurrentUser() {
    return this.supabase.auth.getUser();
  }

  /**
   * Return profile avatar or default avatar
   */
  async profilePicture(): Promise<string | null> {
    //Verify cache
    const cachedImage = localStorage.getItem('profilePicture');

    if (cachedImage) {
      return cachedImage;
    }

    try {
      const { data, error } = await this.supabase.auth.getUser();

      if (error) {
        console.error('Error getting current user: ', error);
        return 'assets/images/profile_blank.png';
      } else {
        let currentUser = data?.user;

        let avatar = String(currentUser.user_metadata['avatar_url']);
        localStorage.setItem('profilePicture', avatar);

        return avatar;
      }
    } catch (error) {
      console.error('Error getting current user: ', error);
      return 'assets/images/profile_blank.png';
    }
  }

  async isUserLoggedIn(): Promise<boolean> {
    try {
      const {
        data: { session },
      } = await this.supabase.auth.getSession();

      // Convierte data.session en un valor booleano y retórnalo.
      return Boolean(session);
    } catch (error) {
      console.error('Error al verificar la sesión del usuario: ', error);
      return false;
    }
  }

  private isSessionExpired(expiresAt: string): boolean {
    if (!expiresAt) {
      return true;
    }

    const expirationTime = new Date(expiresAt).getTime();
    const currentTime = new Date().getTime();

    // Compara el tiempo de expiración con el tiempo actual.
    return currentTime >= expirationTime;
  }

  /**
   * This method is used for passwordless logins where an OTP is  sent to the user's email or phone number.If the user does not exist,signInWithOtp() will register the user.
   */
  signInMagicLink(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  async signInWithGitHub() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'https://klbzlmtmqbepawrmrnzo.supabase.co/auth/v1/callback',
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  /**
   * Close user session
   */
  async logOut() {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  
}
