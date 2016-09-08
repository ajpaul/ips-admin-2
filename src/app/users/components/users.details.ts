import { Component, Input, Output, EventEmitter, OnChanges, trigger, state, style, transition, animate } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUser, USERS_DELETING, USERS_DELETING_ERROR, USERS_NOT_DELETING } from '../users';
import { activeColor, warningColor, successColor, white } from '../../shared/colors/colors';

@Component({
    selector: 'users-detail',
    templateUrl: './users.details.html',
    animations: [
        trigger('deletingState', [
            state('deleting', style({ backgroundColor: activeColor })),
            state('error', style({ backgroundColor: warningColor })),
            state('notdeleting', style({ opacity: 0 })),
            transition('deleting => error', [
                animate('250ms ease')
            ]),
            transition('notdeleting => deleting', [
                animate('500ms ease')
            ]),
            transition('deleting => notdeleting', [
                animate('500ms ease', style({ backgroundColor: successColor })),
                animate('500ms 500ms ease')
            ]),
        ]),
        trigger('deletingIconIn', [
            state('in', style({ display: 'inline-block' })),
            state('out', style({ display: 'none' })),
            transition('in => out', [
                animate('500ms ease')
            ]),
        ])
    ]
})
export class UsersDetail implements OnChanges {

    showUserDetails: boolean = true;
    showUserSites: boolean = false;
    confirmDelete: boolean = false;
    originalName: string;
    selectedItem: IUser;
    USERS_DELETING: number;
    USERS_DELETING_ERROR: number;
    USERS_NOT_DELETING: number;
    @Input() deletingStatus: number;
    @Output() saved = new EventEmitter();
    @Output() cancelled = new EventEmitter();
    @Output() deleted = new EventEmitter();
    
    NOT_DELETING_STATE: string = 'notdeleting';
    DELETING_STATE: string = 'deleting';
    ERROR_STATE: string = 'error';
    deletingState: string;

    constructor() {
        this.USERS_DELETING = USERS_DELETING;
        this.USERS_DELETING_ERROR = USERS_DELETING_ERROR;
        this.USERS_NOT_DELETING = USERS_NOT_DELETING;
        this.deletingState = this.NOT_DELETING_STATE;
    }

    getLoadingStatusLoading() {
        return USERS_DELETING;
    }

    // This will be an abstract method overriden in subclasses
    getLoadingStatusNotLoading() {
        return USERS_NOT_DELETING;
    }

    // This will be an abstract method overriden in subclasses
    getLoadingStatusError() {
        return USERS_DELETING_ERROR;
    }

    isDeletingState() {
        return this.deletingState === this.DELETING_STATE;
    }

    isNotDeletingState() {
        return this.deletingState === this.NOT_DELETING_STATE;
    }

    isErrorState() {
        return this.deletingState === this.ERROR_STATE;
    }

    ngOnChanges(changes) {
        if (changes.deletingStatus) {
            // populate the loadingState used to determine animations
            switch (this.deletingStatus) {
                case this.getLoadingStatusNotLoading():
                    this.deletingState = this.NOT_DELETING_STATE;
                    break;
                case this.getLoadingStatusLoading():
                    this.deletingState = this.DELETING_STATE;
                    break;
                case this.getLoadingStatusError():
                    this.deletingState = this.ERROR_STATE;
                    break;
                default:
                    break;
            }
        } 
        console.log(this.deletingState);    
    }

    @Input('item') set item(value: IUser){
        if (value) this.originalName = value.givenName + ' ' + value.surname;
        this.selectedItem = Object.assign({}, value);
    }

    confirmDeletion(): void {
        this.deletingState = this.NOT_DELETING_STATE;
        if(!this.confirmDelete) {
            this.confirmDelete = true;
        } else {
            this.confirmDelete = false;
        }
    }

    showUserDetailsClick(): void {
        this.showUserDetails = true;
        this.showUserSites = false;
    }

    showUserSitesClick(): void {
        this.showUserDetails = false;
        this.showUserSites = true;
    }

    deleteUser(): void {
        this.deleted.emit({ item: this.selectedItem });
    }

}