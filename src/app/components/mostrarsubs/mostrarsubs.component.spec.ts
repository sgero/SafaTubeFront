import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarsubsComponent } from './mostrarsubs.component';

describe('MostrarsubsComponent', () => {
  let component: MostrarsubsComponent;
  let fixture: ComponentFixture<MostrarsubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarsubsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarsubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
