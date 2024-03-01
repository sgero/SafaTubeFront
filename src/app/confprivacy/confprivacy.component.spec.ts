import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfprivacyComponent } from './confprivacy.component';

describe('ConfprivacyComponent', () => {
  let component: ConfprivacyComponent;
  let fixture: ComponentFixture<ConfprivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfprivacyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfprivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
