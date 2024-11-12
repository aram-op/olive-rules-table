import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from '../app/component/table/table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, BrowserAnimationsModule],

    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the mat table data source', () => {
    expect(component.dataSource).toBeTruthy();
  });

  it('should initialize the displayed columns property', () => {
    expect(component.displayedColumns).toEqual(['rule-name', 'module', 'country', 'status', 'actions']);
  });

  test('if it sets the paginator data source after view init', () => {
    component.ngAfterViewInit();

    expect(component.dataSource.paginator).toBeTruthy();
  });
});
