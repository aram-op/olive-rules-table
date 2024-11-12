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
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit, OnInit {
  @Input({required: true}) data!: any[];
  @Output() rowSelected = new EventEmitter();

  columns: any[] = [];
  displayedColumns: any[] = [];
  dataSource!: MatTableDataSource<any>;
  searchInput = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.setColumns();
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onRowSelected(row: any) {
    this.rowSelected.emit(row);
  }

  setColumns() {
    if (this.data.length == 0) return;

    for (let propName of Object.keys(this.data[0])) {
      if (propName === 'id' || propName === 'country' || propName.includes('Id')) continue;

      if (propName.includes('ImgUrl')) {
        const colName = propName.replace('ImgUrl', '');

        this.displayedColumns.push(this.camelToKebabCase(colName));

        this.columns.push({
          columnDef: this.camelToKebabCase(colName),
          header: this.camelCaseToHeading(colName),
          cell: (element: any) => `${element[propName] ? element[propName] : ''}`,
          withImage: true
        });
      } else {
        this.displayedColumns.push(this.camelToKebabCase(propName));

        this.columns.push({
          columnDef: this.camelToKebabCase(propName),
          header: this.camelCaseToHeading(propName),
          cell: (element: any) => `${element[propName] ? element[propName] : ''}`,
          withImage: false
        });
      }
    }
    this.displayedColumns.push('actions');
  }

  camelToKebabCase(str: string) {
    return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (match, found) => (found ? '-' : '') + match.toLowerCase())
  }

  camelCaseToHeading(str: string) {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  }

}
