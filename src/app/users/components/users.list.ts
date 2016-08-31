import { Component, Input, Output, EventEmitter, OnChanges, trigger, state, style, transition, animate } from '@angular/core';
import { IUser } from '../users';

//-------------------------------------------------------------------
// LIGHTS-LIST
//-------------------------------------------------------------------
@Component({
    selector: 'users-list',
    templateUrl: './users.list.html',
    animations: [
        trigger('myAnimationTrigger', [
            state('in', style({})),
            transition('void => *', [
                style({transform: 'translateX(-100%)'}),
                animate(250)
            ]),
            transition('* => void', [
                animate(250, style({transform: 'translateX(100%)'}))
            ])
        ]),
        trigger('loadingState', [
            state('notloading', style({ top: '140px'})),
            state('loading', style({ top: '205px'})),
            transition('loading => *', animate('250ms ease-in')),
            transition('* => loading', animate('250ms ease-in'))
        ])
    ]
})
export class UsersList implements OnChanges {
    @Input() items: IUser[];
    @Input() isLoading: boolean;
    @Input() isError: boolean;
    @Output() onClearError = new EventEmitter();
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();
    animationState: string;
    isSuccess: boolean = true; // $$$ fix this
    loadingState: string = 'notloading';

    constructor(){
        this.animationState = 'in';
    }
    clearError() {
        this.onClearError.emit({});
    }

  ngOnChanges(changes) {
    console.log('in users list before load:', this.loadingState);
    if (changes.isLoading || changes.isSuccess || changes.isError) {
      // populate the loadingStatus used to determine animations
      if (this.isLoading) {
        this.loadingState = "loading";
      } else if (this.isSuccess) {
        this.loadingState = "success";
      } else if (this.isError) {
        this.loadingState = "error";
      } else {
        this.loadingState = "notloading";
      }
    }
    console.log('loadingState in users list:', this.loadingState);
  }

}