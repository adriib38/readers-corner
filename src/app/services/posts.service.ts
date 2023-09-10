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

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private supabaseUrl = environment.supabaseUrl;
  private supabaseKey = environment.supabaseKey;
  private supabase: SupabaseClient;

  constructor(private cookieService: CookieService) {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  /**
   * Get All posts for Post table
   */
  async getAllPosts() {
    try {
      let { data: Posts, error } = await this.supabase
        .from('Posts')
        .select('*');

      if (error) {
        console.error('Error getting posts: ', error);
        return null;
      } else {
        return Posts;
      }
    } catch (error) {
      console.error('Error getting posts: ', error);
      return null;
    }
  }

  async getPostById(postId: string): Promise<Post | null> {
    try {
      let { data: post, error } = await this.supabase
        .from('Posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) {
        console.error('Error getting post: ', error);
        return null;
      }

      if (post) {
        return post;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting post: ', error);
      return null;
    }
  }
}
