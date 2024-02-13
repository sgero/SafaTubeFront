import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarchatComponent } from './iniciarchat.component';

describe('IniciarchatComponent', () => {
  let component: IniciarchatComponent;
  let fixture: ComponentFixture<IniciarchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarchatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IniciarchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
