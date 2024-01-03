import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCommentsComponent } from './movie-comments.component';

describe('MovieCommentsComponent', () => {
  let component: MovieCommentsComponent;
  let fixture: ComponentFixture<MovieCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCommentsComponent]
    });
    fixture = TestBed.createComponent(MovieCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
