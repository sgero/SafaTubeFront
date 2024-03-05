import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarcuentaemailComponent } from './verificarcuentaemail.component';

describe('VerificarcuentaemailComponent', () => {
  let component: VerificarcuentaemailComponent;
  let fixture: ComponentFixture<VerificarcuentaemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificarcuentaemailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificarcuentaemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
