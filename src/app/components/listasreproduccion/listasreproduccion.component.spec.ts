import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasreproduccionComponent } from './listasreproduccion.component';

describe('ListasreproduccionComponent', () => {
  let component: ListasreproduccionComponent;
  let fixture: ComponentFixture<ListasreproduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListasreproduccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListasreproduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
