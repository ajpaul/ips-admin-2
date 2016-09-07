import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../users.interface';

@Component({
    selector: 'users-detail',
    templateUrl: './users.details.html',
    styleUrls: ['./users.details.less']
})
export class UsersDetail {

    showUserDetails: boolean = true;
    showUserSites: boolean = false;
    confirmDelete: boolean = false;
    originalName: string;
    selectedItem: IUser = null;
    @Output() create = new EventEmitter();
    @Output() saved = new EventEmitter();
    @Output() cancelled = new EventEmitter();

    @Input('item') set item(value: IUser){
        if (value) this.originalName = value.givenName + ' ' + value.surname;
        this.selectedItem = Object.assign({}, value);
    }

    confirmDeletion(): void {
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

    hasSelectedItem(): boolean {
        if (this.selectedItem === null) {
            return false;
        } else if (!this.selectedItem.hasOwnProperty('userID')) {
            return false;
        } else {
            return true;
        }
    }

    createUserClick(): void {
        this.create.emit();
    }
}