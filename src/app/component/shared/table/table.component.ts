import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {NgOptimizedImage, NgTemplateOutlet} from '@angular/common';
import {MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {TableData} from '../../../model/table-data.model';

const customPaginatorIntl = new MatPaginatorIntl();
customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
  const start = page * pageSize + 1;
  const end = (page + 1) * pageSize > length ? length : (page + 1) * pageSize;

  return `${start} - ${end} out of ${length}`
}


/**
 * Universal component for displaying any data with table.
 * The user can specify the templates to be displayed inside table cells.
 */
@Component({
  selector: 'app-table',
  standalone: true,
  providers: [
    {provide: MatPaginatorIntl, useValue: customPaginatorIntl}
  ],
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
    MatSuffix,
    NgTemplateOutlet
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit, OnInit {
  @Input({required: true}) displayedColumns!: string[];
  @Input({required: true}) data!: TableData[];
  @Input({required: true}) headers!: Map<string, string>
  @Output() rowSelected = new EventEmitter();

  dataSource!: MatTableDataSource<any>;
  searchInput = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onRowSelected(row: any) {
    this.rowSelected.emit(row);
  }
}
