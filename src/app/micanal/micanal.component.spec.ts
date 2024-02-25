import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicanalComponent } from './micanal.component';

describe('MicanalComponent', () => {
  let component: MicanalComponent;
  let fixture: ComponentFixture<MicanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicanalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MicanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
