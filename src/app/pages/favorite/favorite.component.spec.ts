import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FavoriteComponent } from './favorite.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe( 'FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;

  beforeEach( waitForAsync( () => {
    TestBed.configureTestingModule( {
      declarations: [FavoriteComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    } )
      .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( FavoriteComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
