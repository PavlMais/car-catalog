import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsTreeComponent } from './models-tree.component';

describe('ModelsTreeComponent', () => {
  let component: ModelsTreeComponent;
  let fixture: ComponentFixture<ModelsTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelsTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
