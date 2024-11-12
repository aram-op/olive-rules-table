import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TableComponent} from './table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent],
  templateUrl: '../page/app.component.html',
  styleUrl: '../styles/app.component.css'
})
export class AppComponent {
}
