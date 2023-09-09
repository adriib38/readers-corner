import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { PostService } from '../services/post.service';

import { createClient, PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

import { environment } from 'src/.env';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];


  private supabaseUrl = environment.supabaseUrl;
  private supabaseKey = environment.supabaseKey;
  private supabase: SupabaseClient;
  
  constructor(private postService: PostService) {
  
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);

  }

  ngOnInit(): void {
    //this.getPostsPreview();
    this.fetchPosts();
  }

  getPostsPreview(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  fetchPosts() {
    this.supabase
      .from('Posts')
      .select('*')
      .then((response) => {
        if (response.error) {
          console.error('Error fetching data:', response.error);
        } else {

          this.posts = response.data;
          console.log(this.posts);
        }
      });
     
  }
}
