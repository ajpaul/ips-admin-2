import { Component, Input, Output, EventEmitter, OnChanges, trigger, state, style, transition, animate } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { USERS_DELETING, USERS_DELETING_ERROR, USERS_NOT_DELETING } from '../users.reducer';
import { activeColor, warningColor, successColor, white } from '../../shared/colors/colors';
import { IUser } from '../users.interface';

@Component({
    selector: 'users-detail',
    templateUrl: './users.details.html',
    animations: [
        trigger('deletingState', [
            state('deleting', style({ backgroundColor: activeColor })),
            state('error', style({ backgroundColor: warningColor })),
            state('notdeleting', style({ opacity: 0 })),
            transition('deleting => error', [
                animate('500ms ease')
            ]),
            transition('notdeleting => deleting', [
                animate('500ms ease')
            ]),
            transition('deleting => notdeleting', [
                animate('500ms ease')
            ]),
        ]),
        trigger('deletingIconIn', [
            state('in', style({ display: 'inline-block' })),
            state('out', style({ display: 'none' })),
        ])
    ],
    styleUrls: ['./users.details.less']
})
export class UsersDetail implements OnChanges {

    showUserDetails: boolean = true;
    showUserSites: boolean = false;
    confirmDelete: boolean = false;

    originalUser: IUser = null;
    selectedItem: IUser;
    USERS_DELETING: number;
    USERS_DELETING_ERROR: number;
    USERS_NOT_DELETING: number;
    @Input() deletingStatus: number;
    @Output() delete = new EventEmitter();
    @Output() create = new EventEmitter();
    @Output() save = new EventEmitter();

    @Input('item') set item(value: IUser) {
        this.originalUser = value;
        this.setSelectedItem();
    }

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
        if (changes.hasOwnProperty('deletingStatus') === true) {
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
    }

    confirmDeletion(): void {
        this.confirmDelete = !this.confirmDelete;
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
        this.delete.emit({ item: this.selectedItem });
    }

    hasSelectedItem(): boolean {
        return this.selectedItem !== null && this.selectedItem.hasOwnProperty('userID');
    }

    isExistingUser(): boolean {
        return this.selectedItem && this.selectedItem.hasOwnProperty('userID') && this.selectedItem.userID !== null;
    }

    setSelectedItem(): void {
        this.selectedItem = (this.originalUser)? Object.assign({}, this.originalUser): null;
    }

    cancel(): void {
        this.setSelectedItem();
    }

    createUserClick(): void {
        this.create.emit();
    }

    saveUser(e): void {
        this.save.emit(this.selectedItem);
    }
}