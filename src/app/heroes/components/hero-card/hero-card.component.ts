import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/Hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './hero-card.component.html',
  styles: [
  ]
})
export class HeroCardComponent implements OnInit {
  @Input()
  public hero!:Hero

  ngOnInit():void {
    if(!this.hero) throw Error ('Hero property is required')
  }
}
