import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  noPosts = false;

  constructor(private readonly postsService: PostsService) {}

  async ngOnInit(): Promise<void> {
    try {
      let posts = await this.postsService.getAllPosts();

      if (posts != null) {
        this.posts = posts;
      } else {
        this.noPosts = true;
      }
    } catch (error) {}
  }
}
