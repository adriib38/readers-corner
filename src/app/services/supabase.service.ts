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

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
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
  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
      console.log(data);
    });
    return this._session;
  }
  */

  async isUserLoggedIn(): Promise<boolean> {
    try {
      const { data: { session } } = await this.supabase.auth.getSession();
  
      // Convierte data.session en un valor booleano y retórnalo.
      return Boolean(session);
    } catch (error) {
      console.error("Error al verificar la sesión del usuario: ", error);
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
  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }
*/

  /**
   * This method is used for passwordless logins where an OTP is  sent to the user's email or phone number.If the user does not exist,signInWithOtp() will register the user.
   * 
   */
  signIn(email: string) {
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

  async logOut() {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  
  
}
