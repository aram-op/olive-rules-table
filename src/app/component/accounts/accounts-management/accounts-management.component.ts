import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {TableComponent} from '../../shared/table/table.component';
import {TableData} from '../../../model/table-data.model';
import ACCOUNTS from '../../../../accounts.json';
import {ActivatedRoute, Router} from '@angular/router';
import {HeadingComponent} from '../../shared/heading/heading.component';

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
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  columnsToDisplay: string[] = ['id', 'name', 'email', 'status', 'actions'];
  columnHeadersToDisplay: Map<string, string> = new Map();
  headings: Map<string, string>;
  data: TableData[] = [];

  constructor() {
    this.headings = new Map();
    this.headings.set('./', 'Accounts Management');

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
