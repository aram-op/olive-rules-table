import {Routes} from '@angular/router';
import {RulesComponent} from './component/rules-engine/rules/rules.component';
import {LeaveTypesComponent} from './component/rules-engine/leave-types/leave-types.component';
import {CreateLeaveTypeComponent} from './component/rules-engine/create-leave-type/create-leave-type.component';
import {AccountsManagementComponent} from './component/accounts/accounts-management/accounts-management.component';
import {CreateAccountComponent} from './component/accounts/create-account/create-account.component';
import {AccountComponent} from './component/accounts/account/account.component';

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
