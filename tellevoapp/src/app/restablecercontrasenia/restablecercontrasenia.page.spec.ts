import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RestablecercontraseniaPage } from './restablecercontrasenia.page';

describe('RestablecercontraseniaPage', () => {
  let component: RestablecercontraseniaPage;
  let fixture: ComponentFixture<RestablecercontraseniaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RestablecercontraseniaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RestablecercontraseniaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
