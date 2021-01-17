import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddToFavoriteComponent } from './add-to-favorite.component';

describe('AddToFavoriteComponent', () => {
  let component: AddToFavoriteComponent;
  let fixture: ComponentFixture<AddToFavoriteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
