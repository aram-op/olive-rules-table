import {AfterViewInit, Component, ElementRef, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-heading',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.css'
})
export class HeadingComponent implements AfterViewInit {
  //The keys should be the paths to navigate. The values should be the header text parts displayed.
  @Input({required: true}) headings!: Map<string, string>;
  private elementRef = inject(ElementRef);

  ngAfterViewInit() {
    const links: HTMLAnchorElement[] = this.elementRef.nativeElement.querySelectorAll('a');

    for (let i = 0; i < links.length - 1; i++) {
      links[i].textContent += ' > ';
    }
  }
}
