import { Component } from '@angular/core';
import {CardsComponent} from "../cards/cards.component";




@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CardsComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
