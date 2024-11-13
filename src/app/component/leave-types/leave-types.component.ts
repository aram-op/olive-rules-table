import {Component, inject, OnInit, signal} from '@angular/core';
import RULES from '../../../rules.json';
import LEAVE_TYPES from '../../../leave-types.json'
import {ActivatedRoute} from '@angular/router';
import {LeaveType} from '../../model/leave-type.model';
import {Rule} from '../../model/rule.model';
import {TableComponent} from '../table/table.component';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatPrefix} from '@angular/material/form-field';
import {TableData} from '../../model/table-data.model';

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
  ruleId = '';
  data: LeaveType[] = [];
  rule = signal<Rule>({country: '', name: '', id: '', status: '', leaveIds: [], countryImgUrl: '', module: ''});
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
    const rule = RULES.find(rule => rule.id === this.ruleId);

    if (rule) {
      this.rule.set(rule);
    }

    const leaveIds = rule ? rule.leaveIds : [];

    this.data = LEAVE_TYPES.filter(leaveType => leaveIds.includes(leaveType.id));

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
}
