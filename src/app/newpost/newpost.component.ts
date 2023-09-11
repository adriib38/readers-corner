import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
})
export class NewpostComponent {
  title: string = '';
  content: string = '';

  constructor(private readonly postService: PostsService) {}

  async btnEnviar() {
    console.log('Title: ', this.title);
    console.log('Content: ', this.content);

    if (this.isValidInput()) {
      try {
        let success = await this.postService.publicPost(
          this.title,
          this.content
        );

        if (success) { 
          alert('Post published successfully 👌');
        } else {
          alert('Error publishing post');
        }

      } catch (error) {
        console.error('Error unexpected :', error);
        alert('Error unexpected');
      }
    } else {
      alert('Fill in the fields');
    }
  }

  //TODO: update validator
  isValidInput(): boolean {
    return (
      this.title !== null &&
      this.content !== null &&
      this.title.trim() !== '' &&
      this.content.trim() !== ''
    );
  }
}
