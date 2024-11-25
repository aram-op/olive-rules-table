import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeadingComponent} from '../../app/component/shared/heading/heading.component';
import {provideRouter} from '@angular/router';
import {DebugElement, ElementRef} from '@angular/core';
import {By} from '@angular/platform-browser';

class MockElementRef extends ElementRef {
}

describe('HeadingComponent', () => {
  let component: HeadingComponent;
  let fixture: ComponentFixture<HeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadingComponent],
      providers: [
        provideRouter([]),
        {provide: ElementRef, useClass: MockElementRef}
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(HeadingComponent);

    const mockHeadings: Map<string, string> = new Map();
    mockHeadings.set('path1', 'heading1');
    mockHeadings.set('path2', 'heading2');

    fixture.componentRef.setInput('headings', mockHeadings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('heading', () => {
    let heading: DebugElement;
    let parts: DebugElement[];

    beforeEach(() => {
      heading = fixture.debugElement.query(By.css('h1'));
      parts = heading.queryAll(By.css('a'));
    });

    test('if the heading element is displayed', () => {
      expect(heading).toBeTruthy();
    });

    it('should contain anchor elements with parts of heading given as input', () => {
      expect(parts.length).toEqual(2);
      expect(parts[0]).toBeTruthy();
      expect(parts[1]).toBeTruthy();
    });

    describe('heading part', () => {
      it('should contain the given heading with "> " appended if it is not the last part', () => {
        expect(parts[0].nativeElement.textContent).toEqual('heading1 > ');
        expect(parts[1].nativeElement.textContent).toEqual('heading2');
      });

      it('should have routerLink attribute with given path', () => {
        fixture.whenStable().then(() => {
          expect(parts[0].nativeElement.getAttribute('routerLink')).toEqual('path1');
          expect(parts[1].nativeElement.getAttribute('routerLink')).toEqual('path2');
        });
      });
    });
  });
});
