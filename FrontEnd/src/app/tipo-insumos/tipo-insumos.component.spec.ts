import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoInsumosComponent } from './tipo-insumos.component';

describe('TipoInsumosComponent', () => {
  let component: TipoInsumosComponent;
  let fixture: ComponentFixture<TipoInsumosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoInsumosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});