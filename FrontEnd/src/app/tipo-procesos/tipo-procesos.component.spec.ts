import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoProcesosComponent } from './tipo-procesos.component';

describe('TipoProcesosComponent', () => {
  let component: TipoProcesosComponent;
  let fixture: ComponentFixture<TipoProcesosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoProcesosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});