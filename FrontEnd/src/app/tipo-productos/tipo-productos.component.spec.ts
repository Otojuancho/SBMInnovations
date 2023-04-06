import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoProductosComponent } from './tipo-productos.component';

describe('TipoProductosComponent', () => {
  let component: TipoProductosComponent;
  let fixture: ComponentFixture<TipoProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});