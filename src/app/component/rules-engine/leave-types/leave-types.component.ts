import {Component, inject, OnInit} from '@angular/core';
import RULES from '../../../../rules.json';
import LEAVE_TYPES from '../../../../leave-types.json'
import {ActivatedRoute, Router} from '@angular/router';
import {LeaveType} from '../../../model/leave-type.model';
import {TableComponent} from '../../shared/table/table.component';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatPrefix} from '@angular/material/form-field';
import {TableData} from '../../../model/table-data.model';
import {Rule} from '../../../model/rule.model';
import {HeadingComponent} from '../../shared/heading/heading.component';

@Component({
  selector: 'app-leave-types',
  standalone: true,
  imports: [
    TableComponent,
    MatButton,
    MatPrefix,
    MatFabButton,
    MatIcon,
    HeadingComponent
  ],
  templateUrl: './leave-types.component.html',
  styleUrl: './leave-types.component.css'
})
export class LeaveTypesComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  ruleId: string = '';
  country: string = '';
  data: LeaveType[] = [];


  /**
   * Will be passed to the TableComponent as an input.
   * Represents the data that will be passed to mat table datasource in TableComponent.
   */
  tableData: TableData[] = [];

  //Will be passed to the TableComponent as an input. Represents the column definitions for mat-table.
  columnsToDisplay = ['name', 'validity', 'status', 'actions'];


  /**
   * Will be passed to the TableComponent as an input.
   * The keys should match the column definitions.
   * Values represent the text that will be inserted in the header cell for specified column.
   */
  columnHeadersToDisplay = new Map<string, string>;


  /**
   * Will be passed as an input to HeadingComponent.
   * The keys should be the path that will be passed to routerLink.
   * The values should be the heading texts
   */
  headings: Map<string, string> = new Map();

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ruleId = params['ruleId'];
      this.setData();
    });
  }

  setData() {
    const rule: Rule | undefined = RULES.find(rule => rule.id === this.ruleId);

    if (!rule) return;

    this.headings.set('../../', 'Rules Engine');
    this.headings.set('./', `${rule.name} - ${rule.country}`);

    this.country = rule.country;
    this.data = LEAVE_TYPES.filter(leaveType => rule.leaveIds.includes(leaveType.id));

    for (let leaveType of this.data) {
      const templates = new Map<string, string>;

      templates.set('name', leaveType.name);
      templates.set('validity', leaveType.validity);
      templates.set('status', leaveType.status);
      templates.set('actions', `<img class="actions-icon" src="assets/actions.svg"/>`);

      const tableDataObj: TableData = {id: leaveType.id, templates: templates, model: leaveType};

      this.tableData.push(tableDataObj);
    }

    this.columnHeadersToDisplay.set('name', 'Type Name');
    this.columnHeadersToDisplay.set('validity', 'Validity');
    this.columnHeadersToDisplay.set('status', 'Status');
    this.columnHeadersToDisplay.set('actions', 'Actions');
  }

  onCreateNew() {
    this.router.navigate([`create`], {relativeTo: this.route}).then(() => window.location.reload());
  }
}
