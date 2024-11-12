import { Routes } from '@angular/router';
import {RulesComponent} from './component/rules/rules.component';
import {LeaveTypesComponent} from './component/leave-types/leave-types.component';

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
  }
];
