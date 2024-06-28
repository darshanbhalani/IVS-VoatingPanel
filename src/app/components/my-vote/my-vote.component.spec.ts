import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVoteComponent } from './my-vote.component';

describe('MyVoteComponent', () => {
  let component: MyVoteComponent;
  let fixture: ComponentFixture<MyVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyVoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
