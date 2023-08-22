import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/Hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent  {

  public searchInput = new FormControl('');
  public heroes : Hero[] = [];
  public selectedHero ?:Hero;

  constructor(private heroServ : HeroesService){}

  searchHero(){
    const value: string = this.searchInput.value || "";

    if( value === "" ) this.heroes = []

    this.heroServ.getSuggestion(value)
      .subscribe(response=> this.heroes = response)
  }

  onSelectedOption( event : MatAutocompleteSelectedEvent ):void{
    if (!event.option.value) {
      this.selectedHero = undefined
      return
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero= hero

  }
}
