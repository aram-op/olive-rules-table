import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import rules from '../../rules.json';
import {Rule} from '../model/rule.model';
import {MatPaginator} from '@angular/material/paginator';
import {NgOptimizedImage} from '@angular/common';
import {MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    NgOptimizedImage,
    MatInput,
    MatFormField,
    ReactiveFormsModule,
    MatIcon,
    MatSuffix
  ],
  templateUrl: '../page/table.component.html',
  styleUrl: '../styles/table.component.css'
})
export class TableComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<Rule>(rules);
  displayedColumns = ['rule-name', 'module', 'country', 'status', 'actions'];
  searchInput = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
