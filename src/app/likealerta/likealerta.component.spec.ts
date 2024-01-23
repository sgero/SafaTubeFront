import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikealertaComponent } from './likealerta.component';

describe('LikealertaComponent', () => {
  let component: LikealertaComponent;
  let fixture: ComponentFixture<LikealertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikealertaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikealertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
