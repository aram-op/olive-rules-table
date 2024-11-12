import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import RULES from '../../../rules.json';
import LEAVE_TYPES from '../../../leave-types.json'
import {ActivatedRoute} from '@angular/router';
import {LeaveTypes} from '../../model/leave-types.model';
import {Rule} from '../../model/rule.model';
import {TableComponent} from '../table/table.component';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatPrefix} from '@angular/material/form-field';

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
  data: LeaveTypes[] = [];
  rule = signal<Rule>({country: '', name: '', id: '', status: '', leaveIds: [], countryImgUrl: '', module: ''});

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
  }
}
