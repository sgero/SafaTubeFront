import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosCanalesSuscritosComponent } from './videos-canales-suscritos.component';

describe('VideosCanalesSuscritosComponent', () => {
  let component: VideosCanalesSuscritosComponent;
  let fixture: ComponentFixture<VideosCanalesSuscritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosCanalesSuscritosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideosCanalesSuscritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
