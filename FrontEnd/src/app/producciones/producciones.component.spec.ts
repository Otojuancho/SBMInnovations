import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProduccionesComponent } from './producciones.component';

describe('ProduccionesComponent', () => {
  let component: ProduccionesComponent;
  let fixture: ComponentFixture<ProduccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});