import { Component } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {

  public publishers= [
    {id:'DC comics', value:"DC - Comics"},
    {id:'Marvel comics', value:"Marvel - Comics"}
  ]
}
