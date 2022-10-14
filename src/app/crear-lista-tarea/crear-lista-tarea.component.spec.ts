import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearListaTareaComponent } from './crear-lista-tarea.component';

describe('CrearListaTareaComponent', () => {
  let component: CrearListaTareaComponent;
  let fixture: ComponentFixture<CrearListaTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearListaTareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearListaTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
