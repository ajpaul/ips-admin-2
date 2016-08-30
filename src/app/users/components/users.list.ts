import { Component, Input, Output, EventEmitter, trigger, state, style, transition, animate } from '@angular/core';
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
        ])
    ]
})
export class UsersList {
    @Input() items: IUser[];
    @Input() isLoading: boolean;
    @Input() isError: boolean;
    @Output() onClearError = new EventEmitter();
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();
    animationState: string;

    constructor(){
        this.animationState = 'in';
    }
    clearError() {
        this.onClearError.emit({});
    }

}