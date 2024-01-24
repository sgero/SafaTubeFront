import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajealertaComponent } from './mensajealerta.component';

describe('MensajealertaComponent', () => {
  let component: MensajealertaComponent;
  let fixture: ComponentFixture<MensajealertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajealertaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajealertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
