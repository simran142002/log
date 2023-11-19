import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogIngestionComponent } from './log-ingestion.component';

describe('LogIngestionComponent', () => {
  let component: LogIngestionComponent;
  let fixture: ComponentFixture<LogIngestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogIngestionComponent]
    });
    fixture = TestBed.createComponent(LogIngestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
