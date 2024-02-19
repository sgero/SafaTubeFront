import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarpwComponent } from './recuperarpw.component';

describe('RecuperarpwComponent', () => {
  let component: RecuperarpwComponent;
  let fixture: ComponentFixture<RecuperarpwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarpwComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecuperarpwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
