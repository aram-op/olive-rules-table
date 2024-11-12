import {Component, inject} from '@angular/core';
import rules from '../../../rules.json';
import {TableComponent} from '../table/table.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [
    TableComponent
  ],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.css'
})
export class RulesComponent {
  private router = inject(Router);
  data = rules;

  navigateToLeavesPage(row: any) {
    if (row.module === 'Leaves') {
      this.router.navigate([`rules/${row.id}/leave-types`]).then(() => window.location.reload());
    }
  }
}
