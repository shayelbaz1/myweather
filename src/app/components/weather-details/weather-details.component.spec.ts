import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherDetailsComponent } from './weather-details.component';

describe( 'WeatherDetailsComponent', () => {
  let component: WeatherDetailsComponent;
  let fixture: ComponentFixture<WeatherDetailsComponent>;

  beforeEach( waitForAsync( () => {
    TestBed.configureTestingModule( {
      declarations: [WeatherDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    } )
      .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( WeatherDetailsComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
