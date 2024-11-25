import {Routes} from '@angular/router';
import {RulesComponent} from './pages/rules/rules.component';
import {LeaveTypesComponent} from './pages/leave-types/leave-types.component';
import {CreateLeaveTypeComponent} from './pages/create-leave-type/create-leave-type.component';
import {AccountsManagementComponent} from './pages/accounts-management/accounts-management.component';
import {CreateAccountComponent} from './pages/create-account/create-account.component';
import {AccountComponent} from './pages/account/account.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'rules',
    pathMatch: 'full',
  },
  {
    path: 'rules',
    children: [
      {path: '', component: RulesComponent},
      {
        path: ':ruleId/leave-types',
        children: [
          {path: '', component: LeaveTypesComponent},
          {path: 'create', component: CreateLeaveTypeComponent}
        ]
      },
    ],
  },
  {
    path: 'accounts',
    children: [
      {path: '', component: AccountsManagementComponent},
      {path: 'create', component: CreateAccountComponent},
      {path: ':accountId', component: AccountComponent}
    ]
  },
  {path: '**', component: RulesComponent}
];
