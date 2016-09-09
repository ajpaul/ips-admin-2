import { Component, Input, Output, EventEmitter, OnChanges, trigger, state, style, transition, animate } from '@angular/core';
import { IUser } from '../users.interface';
import { Loading } from '../../shared/loading-list';

//-------------------------------------------------------------------
// LIGHTS-LIST
//-------------------------------------------------------------------

const NOT_LOADING = 'notloading';
const LOADING = 'loading';
const ERROR = 'error';

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
            state('loading', style({ top: '205px', transform: 'translateY(100%)'})),
            state('error', style({ top: '205px', transform: 'translateY(100%)'})),
            transition('loading => error', animate('250ms ease')),
            transition('* => loading', animate('0ms ease')),
            transition('loading => notloading', [
                animate('250ms ease', style({ transform: 'translateY(0)' })),
                animate('250ms 1750ms ease')
            ])
        ])
    ]
})
export class UsersList implements OnChanges {
    @Input() items: IUser[];
    @Input() loadingStatus: Loading;
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();

    loadingState: string = LOADING;

    hasSomeResults() {
        return this.loadingState === NOT_LOADING && this.items && this.items.length > 0;
    }

    isLoading() {
        return (this.loadingState === LOADING);
    }

    ngOnChanges(changes) {
        if (changes.loadingStatus) {
            // populate the loadingState used to determine animations
            switch (this.loadingStatus) {
                case Loading.NotLoading:
                    this.loadingState = NOT_LOADING;
                    break;
                case Loading.Loading:
                    this.loadingState = LOADING;
                    break;
                case Loading.Error:
                    this.loadingState = ERROR;
                    break;
                default:
                    break;
            }
        }
    }
}