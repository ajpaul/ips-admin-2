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
            transition('loading => notloading', [
                style({transform: 'translateY(100%)'}),
                animate(250)
            ]),
            transition('* => void', [
                animate(250, style({transform: 'translateY(-100%)'}))
            ])
        ]),
        trigger('loadingState', [
            state('notloading', style({ top: '140px'})),
            state('loading', style({ transform: 'translateY(100%)', top: '205px'})),
            transition('loading => error', animate('250ms ease-in')),
            transition('* => loading', animate('250ms ease-in')),
            transition('loading => notloading', [
                animate('250ms 1600ms ease-in')
            ])
        ])
    ]
})
export class UsersList implements OnChanges {
    @Input() items: IUser[];
    @Input() loadingStatus: number;
    @Output() onClearError = new EventEmitter();
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();

    animationState: string;

    loadingState: string = 'notloading';

    constructor(){
        this.animationState = 'in';
    }
    clearError() {
        this.onClearError.emit({});
    }

  ngOnChanges(changes) {
    console.log('in users list before load:', this.loadingState);
    if (changes.loadingStatus) {
        // populate the loadingState used to determine animations
        switch (this.loadingStatus) {
            case 0:
                this.loadingState = 'notloading';
                break;
            case 1:
                this.loadingState = 'loading';
                break;
            case 2:
                this.loadingState = 'error';
                break;
            default:
                break;
      }
    }
    console.log('loadingState in users list:', this.loadingState);
  }

}