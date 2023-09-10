import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { SupabaseService } from '../services/supabase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  idPost = String(this.route.snapshot.paramMap.get('id'));
  currentPost: Post | null = null;
  noPost: boolean | null = false;

  constructor(
    private route: ActivatedRoute,
    private readonly supabase: SupabaseService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.currentPost = await this.supabase.getPostById(this.idPost);

      if (this.currentPost === null) {
        this.noPost = true;
      }
    } catch (error) {
      console.error('Error getting post: ', error);
      
    }
  }
}
