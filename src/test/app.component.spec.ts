import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from '../app/component/app/app.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatToolbarHarness} from '@angular/material/toolbar/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {
  MatSidenavContainerHarness,
  MatSidenavContentHarness,
  MatSidenavHarness
} from '@angular/material/sidenav/testing';
import {DebugElement} from '@angular/core';
import {provideRouter} from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the toolbar', async () => {
    const toolbar = await loader.getHarness(MatToolbarHarness);
    expect(toolbar).toBeTruthy();
  });

  describe('toolbar', () => {
    let toolbar;
    beforeEach(async () => {
      toolbar = await loader.getHarness(MatToolbarHarness);
    });

    it('should contain div with admin info', () => {
      const adminInfoElem = fixture.debugElement.query(By.css('.admin-info'));

      expect(adminInfoElem).toBeTruthy();
    });
  });

  it('should contain the sidebar', async () => {
    const sidenav = await loader.getHarness(MatSidenavHarness);

    expect(sidenav).toBeTruthy();
  });

  describe('sidenav', () => {
    let sidenav: MatSidenavHarness;
    let sidenavElem: DebugElement;

    beforeEach(async () => {
      sidenav = await loader.getHarness(MatSidenavHarness);
    });

    beforeEach(() => {
      sidenavElem = fixture.debugElement.query(By.css('mat-sidenav'));
    });

    it('should have mode "side"', async () => {
      expect(await sidenav.getMode()).toEqual('side');
    });

    it('should contain heading', () => {
      const headingElem = sidenavElem.query(By.css('h1'));

      expect(headingElem).toBeTruthy();
      expect(headingElem.nativeElement.textContent).toEqual('Olive');
    });

    it('should contain mat-nav-list', () => {
      expect(sidenavElem.query(By.css('mat-nav-list'))).toBeTruthy();
    });
  });

  describe('sidenav container', () => {
    let container: MatSidenavContainerHarness;

    beforeEach(async () => {
      container = await loader.getHarness(MatSidenavContainerHarness);
    });

    describe('sidenav container content', () => {
      let content: MatSidenavContentHarness;

      beforeEach(async () => {
        content = await container.getContent();
      });

      test('if content is found', async () => {
        expect(content).toBeTruthy();
      });

      it('should contain router outlet', async () => {
        const contentElem = fixture.debugElement.query(By.css('mat-sidenav-content'));

        expect(contentElem.nativeElement.innerHTML).toContain('<router-outlet>')
      });
    });

    it('should contain sidenav', async () => {
      expect((await container.getSidenavs()).length).toEqual(1);
    });
  });
});
