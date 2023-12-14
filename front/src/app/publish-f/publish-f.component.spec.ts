import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishFComponent } from './publish-f.component';

describe('PublishFComponent', () => {
  let component: PublishFComponent;
  let fixture: ComponentFixture<PublishFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
