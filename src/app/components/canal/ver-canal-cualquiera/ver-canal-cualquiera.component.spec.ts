import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCanalCualquieraComponent } from './ver-canal-cualquiera.component';

describe('VerCanalCualquieraComponent', () => {
  let component: VerCanalCualquieraComponent;
  let fixture: ComponentFixture<VerCanalCualquieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerCanalCualquieraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerCanalCualquieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
