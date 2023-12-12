import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveRidesComponent } from './archive-rides.component';

describe('ArchiveRidesComponent', () => {
  let component: ArchiveRidesComponent;
  let fixture: ComponentFixture<ArchiveRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveRidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
