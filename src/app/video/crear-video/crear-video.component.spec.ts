import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVideoComponent } from './crear-video.component';

describe('CrearVideoComponent', () => {
  let component: CrearVideoComponent;
  let fixture: ComponentFixture<CrearVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
