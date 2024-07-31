import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicedoneComponent } from './servicedone.component';

describe('ServicedoneComponent', () => {
  let component: ServicedoneComponent;
  let fixture: ComponentFixture<ServicedoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicedoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicedoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
