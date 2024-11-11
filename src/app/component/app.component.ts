import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: '../page/app.component.html',
  styleUrl: '../styles/app/app.component.css'
})
export class AppComponent {
  title = 'olive-rules-table';
}
