import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../users';

@Component({
    selector: 'users-detail',
    template: require('./users.details.html')
})
export class UsersDetail {

    showUserDetails: boolean = true;
    showUserSites: boolean = false;
    confirmDelete: boolean = false;
    originalName: string;
    selectedItem: IUser;
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


}