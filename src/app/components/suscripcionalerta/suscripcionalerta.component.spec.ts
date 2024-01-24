import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionalertaComponent } from './suscripcionalerta.component';

describe('SuscripcionalertaComponent', () => {
  let component: SuscripcionalertaComponent;
  let fixture: ComponentFixture<SuscripcionalertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscripcionalertaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuscripcionalertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
