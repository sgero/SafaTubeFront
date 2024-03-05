import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarCuentaComponent } from './verificar-cuenta.component';

describe('VerificarCuentaComponent', () => {
  let component: VerificarCuentaComponent;
  let fixture: ComponentFixture<VerificarCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificarCuentaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
