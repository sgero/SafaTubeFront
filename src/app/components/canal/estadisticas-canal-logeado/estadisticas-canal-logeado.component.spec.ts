import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasCanalLogeadoComponent } from './estadisticas-canal-logeado.component';

describe('EstadisticasCanalLogeadoComponent', () => {
  let component: EstadisticasCanalLogeadoComponent;
  let fixture: ComponentFixture<EstadisticasCanalLogeadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticasCanalLogeadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadisticasCanalLogeadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
