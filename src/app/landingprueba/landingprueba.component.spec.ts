import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpruebaComponent } from './landingprueba.component';

describe('LandingpruebaComponent', () => {
  let component: LandingpruebaComponent;
  let fixture: ComponentFixture<LandingpruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingpruebaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingpruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
