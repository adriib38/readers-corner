import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { PostService } from '../services/post.service';
import { SupabaseService } from '../services/supabase.service';
import {
  createClient,
  PostgrestSingleResponse,
  SupabaseClient,
} from '@supabase/supabase-js';

import { environment } from 'src/.env';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  noPosts = false;

  constructor(
    private postService: PostService,
    private readonly supabase: SupabaseService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      let posts = await this.supabase.getAllPosts();

      if(posts != null){
        this.posts = posts;
      } else {
        this.noPosts = true;
      }
     
    } catch (error) {

    }
  }

  getPostsPreview(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }
}
