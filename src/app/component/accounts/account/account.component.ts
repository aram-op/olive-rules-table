import {Component, DestroyRef, OnInit} from '@angular/core';
import ACCOUNTS from '../../../../accounts.json';
import LEAVE_TYPES from '../../../../leave-types.json';
import {Account} from '../../../model/account.model';
import {ActivatedRoute} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {LeaveType} from '../../../model/leave-type.model';
import {HeadingComponent} from '../../shared/heading/heading.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MatButton,
    HeadingComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  account!: Account;
  modules: LeaveType[];
  /**
   * Will be passed as an input to HeadingComponent.
   * The keys should be the path that will be passed to routerLink.
   * The values should be the heading texts
   */
  headings: Map<string, string>;

  constructor(private route: ActivatedRoute, private destroyRef: DestroyRef) {
    this.modules = [];

    const subscription = this.route.params.subscribe((params) => {
      const account: Account | undefined = ACCOUNTS.find((account: Account) => params['accountId'] === account.id);

      if (!account) {
        throw new Error(`Account with id: ${params['id']} was not found!`);
      }
      this.account = account;
    });

    this.headings = new Map();
    this.headings.set('../', 'Accounts Management');
    this.headings.set('./',this.account.clientName);

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  ngOnInit() {
    if (this.account.moduleIds) {
      for (let id of this.account.moduleIds) {
        const module: LeaveType | undefined = LEAVE_TYPES.find((leaveType: LeaveType) => leaveType.id === id);

        if(module) this.modules.push(module);
      }
    }
  }
}
