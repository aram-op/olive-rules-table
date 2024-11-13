import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableComponent} from '../app/component/table/table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableData} from '../app/model/table-data.model';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, BrowserAnimationsModule],

    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);

    const mockTemplates = new Map();
    mockTemplates.set('first-column', 'first col');
    mockTemplates.set('second-column', '<span>second col with span</span>');

    const mockTableData: TableData[] = [{id: '1', templates: mockTemplates, model: {name: 'mockObj'}}];
    const mockDisplayedColumns = ['first-column', 'second-column'];
    const mockTableHeaders = new Map<string, string>([['first-column', 'First Column'], ['second-column', 'Second Column']]);

    fixture.componentRef.setInput('data', mockTableData);
    fixture.componentRef.setInput('displayedColumns', mockDisplayedColumns);
    fixture.componentRef.setInput('headers', mockTableHeaders);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the mat table data source with input data', () => {
    const mockTemplates = new Map();
    mockTemplates.set('first-column', 'first col');
    mockTemplates.set('second-column', '<span>second col with span</span>');

    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource.data).toContainEqual({id: '1', templates: mockTemplates, model: {name: 'mockObj'}});
  });

  it('should set the datasource paginator after view init', () => {
    component.ngAfterViewInit();

    expect(component.dataSource.paginator).toBeTruthy();
  });

  describe('table', () => {
    let tableElem: DebugElement;
    beforeEach(() => {
      tableElem = fixture.debugElement.query(By.css('table'));
    });

    describe('table head', () => {
      let headers: DebugElement[];

      beforeEach(() => {
        headers = tableElem.queryAll(By.css('th'));
      });

      it('should have same amount of header cells as column count', () => {
        expect(headers.length).toEqual(2);
      });

      describe('header cell', () => {
        it('should have same text as specified in headers map', () => {
          expect(headers[0].nativeElement.textContent).toEqual('First Column');
          expect(headers[1].nativeElement.textContent).toEqual('Second Column');
        });
      });
    });

    describe('table body', () => {
      let rows: DebugElement[];

      beforeEach(() => {
        rows = tableElem.queryAll(By.css('tr'));
      });

      it('should contain same amount of rows as element count in given data', () => {
        //2 rows - 1 header row and 1 row in body
        expect(rows.length).toEqual(2);
      });

      describe('table row', () => {
        let row: DebugElement;

        beforeEach(() => {
          row = rows[1];
        });

        it('should contain same amount of cells as columns', () => {
          expect(row.queryAll(By.css('td')).length).toEqual(2);
        });

        it('should contain specified templates in cells', () => {
          const cells = row.queryAll(By.css('td'));

          expect(cells[0].nativeElement.textContent).toEqual('first col');
          expect(cells[1].nativeElement.innerHTML).toEqual('<span>second col with span</span>');
        });
      });
    });
  });
});
