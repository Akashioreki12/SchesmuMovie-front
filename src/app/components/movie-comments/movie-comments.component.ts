import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-movie-comments',
  templateUrl: './movie-comments.component.html',
  styleUrls: ['./movie-comments.component.css']
})
export class MovieCommentsComponent implements OnInit{
  @Input() movieId!: number; 
  comments: any[] = [];

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {

    this.loadComments();
  }

  loadComments() {
    // Assuming you have a method in your CommentService to get comments by movieId
    this.commentService.getCommentsByMovieId(this.movieId).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Error loading comments:', error);
      }
    );
  }
}
