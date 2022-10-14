import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaSeleccionadaComponent } from './tarea-seleccionada.component';

describe('TareaSeleccionadaComponent', () => {
  let component: TareaSeleccionadaComponent;
  let fixture: ComponentFixture<TareaSeleccionadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaSeleccionadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaSeleccionadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
