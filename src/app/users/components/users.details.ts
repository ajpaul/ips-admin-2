import { Component, Input, Output, EventEmitter, OnChanges, trigger, state, style, transition, animate } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { activeColor, warningColor, successColor, white } from '../../shared/colors/colors';
import { IUser } from '../users.interface';
import { Loading } from '../../shared/loading-list';

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
        ]),
        trigger('deletingConfirmationIn', [
            state('in', style({ opacity: 1 })),
            state('out', style({ opacity: 0 })),
        ]),
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
    @Output() cancelled = new EventEmitter();
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
        this.USERS_DELETING = Loading.Loading;
        this.USERS_DELETING_ERROR = Loading.Error;
        this.USERS_NOT_DELETING = Loading.NotLoading;
        this.deletingState = this.NOT_DELETING_STATE;
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
                case Loading.NotLoading:
                    this.deletingState = this.NOT_DELETING_STATE;
                    break;
                case Loading.Loading:
                    this.deletingState = this.DELETING_STATE;
                    break;
                case Loading.Error:
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
    
    isExistingUser(): boolean {
        return this.selectedItem && this.selectedItem.hasOwnProperty('userID') && this.selectedItem.userID !== null;
    }

    setSelectedItem(): void {
        this.selectedItem = (this.originalUser)? Object.assign({}, this.originalUser): null;
        this.confirmDelete = false;
    }

    cancel(): void {
        this.cancelled.emit();
    }

    saveUser(e): void {
        this.save.emit(this.selectedItem);
    }
}