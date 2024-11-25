import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {TableComponent} from '../../component/shared/table/table.component';
import {TableData} from '../../model/table-data.model';
import ACCOUNTS from '../../../accounts.json';
import {ActivatedRoute, Router} from '@angular/router';
import {HeadingComponent} from '../../component/shared/heading/heading.component';

@Component({
  selector: 'app-accounts-management',
  standalone: true,
  imports: [
    MatButton,
    TableComponent,
    HeadingComponent
  ],
  templateUrl: './accounts-management.component.html',
  styleUrl: './accounts-management.component.css'
})
export class AccountsManagementComponent {
  //Will be passed to the TableComponent as an input. Represents the column definitions for mat-table.
  columnsToDisplay: string[] = ['id', 'name', 'email', 'status', 'actions'];
  /**
   * Will be passed to the TableComponent as an input.
   * The keys should match the column definitions.
   * Values represent the text that will be inserted in the header cell for specified column.
   */
  columnHeadersToDisplay: Map<string, string> = new Map();
  /**
   * Will be passed to the TableComponent as an input.
   * Represents the data that will be passed to mat table datasource in TableComponent.
   */
  data: TableData[] = [];
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    for (let account of ACCOUNTS) {
      const templates = new Map<string, string>();

      templates.set('id', account.id);
      templates.set('name', account.clientName);
      templates.set('email', account.email);
      templates.set('status', account.status[0].toUpperCase() + account.status.slice(1));
      templates.set('actions', `<img class="actions-icon" src="assets/actions.svg"/>`);

      const tableDataObj = {id: account.id, templates: templates, model: account};

      this.data.push(tableDataObj);
    }

    this.columnHeadersToDisplay.set('id', 'Account ID');
    this.columnHeadersToDisplay.set('name', 'Client Name');
    this.columnHeadersToDisplay.set('email', 'Email');
    this.columnHeadersToDisplay.set('status', 'Status');
    this.columnHeadersToDisplay.set('actions', 'Actions');
  }

  onCreateAccount() {
    this.router.navigate(['create'], {relativeTo: this.route}).then(() => window.location.reload());
  }

  onAccountSelected(row: any) {
    this.router.navigate([row.id], {relativeTo: this.route}).then(() => window.location.reload());
  }
}
