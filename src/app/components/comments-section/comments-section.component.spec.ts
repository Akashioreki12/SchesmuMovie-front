import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsSectionComponent } from './comments-section.component';

describe('CommentsSectionComponent', () => {
  let component: CommentsSectionComponent;
  let fixture: ComponentFixture<CommentsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsSectionComponent]
    });
    fixture = TestBed.createComponent(CommentsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
