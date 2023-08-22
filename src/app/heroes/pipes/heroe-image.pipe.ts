import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/Hero.interface';

@Pipe({
  name: 'heroeImage'
})
export class HeroeImagePipe implements PipeTransform {

  transform(hero: Hero): string {

    if(!hero.id && !hero.alt_img) {
      return 'assets/no-image.png'
    }

    if(hero.alt_img) return hero.alt_img;

    return `assets/heroes/${hero.id}.jpg`;
  }

}
