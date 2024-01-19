import { Component, OnInit } from '@angular/core';
import { ImageService } from '../service/image.service';
import gsap from 'gsap';
@Component({
  selector: 'app-landingprueba',
  standalone: true,
  imports: [],
  templateUrl: './landingprueba.component.html',
  styleUrl: './landingprueba.component.css'
})
export class LandingpruebaComponent implements OnInit{
  currentImage!: string;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.showRandomImage();
    setInterval(() => this.showRandomImage(), 1000);
  }

  showRandomImage(): void {
    const newImage = this.imageService.getRandomImage();

    gsap.to('.background-image', {
      duration: 10,
      opacity: 0,
      onComplete: () => {
        this.currentImage = newImage;
        console.log(newImage, this.currentImage)
        gsap.to('.background-image', { duration: 10, opacity: 1 });
      }
    });
  }
}
