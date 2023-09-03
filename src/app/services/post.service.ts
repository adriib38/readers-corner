import { Injectable } from '@angular/core';

import { Post } from '../interfaces/post';
import { POSTS } from '../mock/posts';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {

  constructor() { }

  getPosts(): Observable<Post[]> {
    return of(POSTS);
  }


  getPostsPreview(): Observable<Post[]> {
    let posts = POSTS.slice(0, 3);
    //Slice content to 10 characters
    posts.forEach(post => {
      post.content = post.content.slice(0, 85) + '...'; 
    });

    return of(posts);
  }

  getPostById(id: number): Observable<Post> {
    const post = POSTS.find(p => p.id === id)!;
    return of(post);
  }
}
