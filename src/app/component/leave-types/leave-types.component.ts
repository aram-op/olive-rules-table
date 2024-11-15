import {Component, inject, OnInit} from '@angular/core';
import RULES from '../../../rules.json';
import LEAVE_TYPES from '../../../leave-types.json'
import {ActivatedRoute, Router} from '@angular/router';
import {LeaveType} from '../../model/leave-type.model';
import {TableComponent} from '../table/table.component';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatPrefix} from '@angular/material/form-field';
import {TableData} from '../../model/table-data.model';
import {Rule} from '../../model/rule.model';

@Component({
  selector: 'app-leave-types',
  standalone: true,
  imports: [
    TableComponent,
    MatButton,
    MatPrefix,
    MatFabButton,
    MatIcon
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
  tableData: TableData[] = [];
  columnsToDisplay = ['name', 'validity', 'status', 'actions'];
  columnHeadersToDisplay = new Map<string, string>;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ruleId = params['ruleId'];
      this.setData();
    });
  }

  setData() {
    const rule: Rule | undefined = RULES.find(rule => rule.id === this.ruleId);

    if (!rule) return;

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
    this.router.navigate([`rules/${this.ruleId}/leave-types/create`]).then(() => window.location.reload());
  }
}
