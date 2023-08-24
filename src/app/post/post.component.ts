import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { PostService } from '../services/post.service'
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  idPost = Number(this.route.snapshot.paramMap.get('id'));
  post: Post | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPostById();
  }

  getPostById(): void {
    this.postService.getPostById(this.idPost)
    .subscribe(post => this.post = post);

  }
}
