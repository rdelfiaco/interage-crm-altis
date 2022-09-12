import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesUploadsComponent } from './files-uploads.component';

describe('FilesUploadsComponent', () => {
  let component: FilesUploadsComponent;
  let fixture: ComponentFixture<FilesUploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesUploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
