import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/Hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, filter } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance:new FormControl(''),
    alt_img: new FormControl(''),
    characters: new FormControl(''),
  })

  public publishers= [
    {id:'DC comics', value:"DC - Comics"},
    {id:'Marvel comics', value:"Marvel - Comics"}
  ]

  constructor(
    private heroService :HeroesService,
    private activatedRoute :ActivatedRoute,
    private router :Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {

    if( !this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({id})=> this.heroService.getHeroById(id)),
      ).subscribe( hero =>{

        if(!hero) return this.router.navigateByUrl('/');

        this.heroForm.reset(hero)
        return

      })
  }

  get currentHero () : Hero {

    const hero = this.heroForm.value as Hero

    return hero
  }

  onSubmit() {
    if(!this.heroForm.valid) return

    if(this.currentHero.id){
      this.heroService.updateHero( this.currentHero )
        .subscribe( hero=>{
          this.showSnackbar(`${hero.superhero} updated!`)
        })
      return
    }

    this.heroService.addHero( this.currentHero )
      .subscribe( hero => {
        this.router.navigate(['/heroes/edit', hero.id])
        this.showSnackbar(`${hero.superhero} created!`)
      })

  }

  onConfirmedDeletion () :void {
    if ( !this.currentHero.id ) throw Error ('Hero id is required')

    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result:boolean)=> result === true),
        switchMap( ()=> this.heroService.deleteHeroById(this.currentHero.id) ),
        filter( (wasDeleted: boolean) => wasDeleted )
      )
      .subscribe(() => {
        this.router.navigate(['/heroes'])
    });

  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Ok',{
      duration:2500,
    })
  }
}
