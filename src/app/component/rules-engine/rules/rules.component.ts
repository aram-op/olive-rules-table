import {Component, inject} from '@angular/core';
import RULES from '../../../../rules.json';
import {TableComponent} from '../../shared/table/table.component';
import {ActivatedRoute, Router} from '@angular/router';
import {TableData} from '../../../model/table-data.model';
import {routes} from '../../../app.routes';

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
  private route = inject(ActivatedRoute);


  /**
   * Will be passed to the TableComponent as an input.
   * Represents the data that will be passed to mat table datasource in TableComponent.
   */
  data: TableData[] = [];

  //Will be passed to the TableComponent as an input. Represents the column definitions for mat-table.
  columnsToDisplay = ['name', 'module', 'country', 'status', 'actions'];


  /**
   * Will be passed to the TableComponent as an input.
   * The keys should match the column definitions.
   * Values represent the text that will be inserted in the header cell for specified column.
   */
  columnHeadersToDisplay = new Map<string, string>();

  constructor() {
    for (let rule of RULES) {
      const templates = new Map<string, string>;

      templates.set('name', rule.name);
      templates.set('module', `<span class="module">${rule.module}</span>`);
      templates.set('country', `<img class="country-flag" src="${rule.countryImgUrl}" />`);
      templates.set('status', rule.status);
      templates.set('actions', `<img class="actions-icon" src="assets/actions.svg"/>`);

      const tableDataObj: TableData = {id: rule.id, templates: templates, model: rule};

      this.data.push(tableDataObj);
    }

    this.columnHeadersToDisplay.set('name', 'Rule Name');
    this.columnHeadersToDisplay.set('module', 'Module');
    this.columnHeadersToDisplay.set('country', 'Country');
    this.columnHeadersToDisplay.set('status', 'Status');
    this.columnHeadersToDisplay.set('actions', 'Actions');
  }

  navigateToLeavesPage(row: any) {
    if (row.model.module === 'Leaves') {
      this.router.navigate([`${row.id}/leave-types`], {relativeTo: this.route}).then(() => window.location.reload());
    }
  }
}
