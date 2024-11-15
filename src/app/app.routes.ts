import { Routes } from '@angular/router';
import {RulesComponent} from './component/rules/rules.component';
import {LeaveTypesComponent} from './component/leave-types/leave-types.component';
import {CreateLeaveTypeComponent} from './component/create-leave-type/create-leave-type.component';
import {BalanceComponent} from './component/balance/balance.component';
import {ConsumptionComponent} from './component/consumption/consumption.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'rules',
    pathMatch: 'full'
  },
  {
    path: 'rules',
    component: RulesComponent,
  },
  {
    path: 'rules/:ruleId/leave-types',
    component: LeaveTypesComponent
  },
  {
    path: 'rules/:ruleId/leave-types/create',
    component: CreateLeaveTypeComponent
  }
];
