import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { PostsService } from '../services/posts.service';
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
    private readonly postsService: PostsService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.currentPost = await this.postsService.getPostById(this.idPost);

      if (this.currentPost === null) {
        this.noPost = true;
      }
    } catch (error) {
      console.error('Error getting post: ', error);
    }
  }
}
