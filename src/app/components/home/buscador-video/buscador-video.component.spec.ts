import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorVideoComponent } from './buscador-video.component';

describe('BuscadorVideoComponent', () => {
  let component: BuscadorVideoComponent;
  let fixture: ComponentFixture<BuscadorVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscadorVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
