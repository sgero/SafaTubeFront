// image.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private images: string[] = [
    'assets/images/fotofamilia.jpeg',
    'assets/images/fotocarrusle.jpg',
    'assets/images/fotofamilia.jpeg'
  ];

  getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.images.length);
    console.log(this.images[randomIndex])
    return this.images[randomIndex];
  }
}
