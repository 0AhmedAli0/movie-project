import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvDetailesComponent } from './tv-detailes.component';

describe('TvDetailesComponent', () => {
  let component: TvDetailesComponent;
  let fixture: ComponentFixture<TvDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvDetailesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
