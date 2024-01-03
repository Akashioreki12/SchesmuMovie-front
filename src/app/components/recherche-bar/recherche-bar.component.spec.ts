import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheBarComponent } from './recherche-bar.component';

describe('RechercheBarComponent', () => {
  let component: RechercheBarComponent;
  let fixture: ComponentFixture<RechercheBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechercheBarComponent]
    });
    fixture = TestBed.createComponent(RechercheBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
