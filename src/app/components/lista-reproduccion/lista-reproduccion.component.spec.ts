import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReproduccionComponent } from './lista-reproduccion.component';

describe('ListaReproduccionComponent', () => {
  let component: ListaReproduccionComponent;
  let fixture: ComponentFixture<ListaReproduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaReproduccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaReproduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
