import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css']
})
export class CommentsSectionComponent {
  commentForm: FormGroup;
  @Input() movieDetails: any;

  constructor(private fb: FormBuilder, private commentService: CommentService) {
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comment: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.commentForm.valid) {
      const formData = this.commentForm.value;

      // Get the movieId from movieDetails
      const movieId = this.movieDetails.id; // Adjust property name accordingly

      // Assuming you have a Comment model in your backend, adjust accordingly
      const commentData = {
        id: 0, // or whatever default value or leave it undefined
        movieId: movieId,
        name: formData.name,
        email: formData.email,
        comment: formData.comment,
      };

      // Call the CommentService to save the comment
      this.commentService.addComment(commentData).subscribe(
        (response) => {
          console.log('Comment successfully saved:', response);
          // Reset the form after successful submission
          this.commentForm.reset();
        },
        (error) => {
          console.error('Error saving comment:', error);
        }
      );
    } else {
      // Mark all form controls as touched to display validation errors
      this.commentForm.markAllAsTouched();
    }
  }
}
