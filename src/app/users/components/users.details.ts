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
    originalUser: IUser = null;
    selectedItem: IUser = null;
    @Output() cancelled = new EventEmitter();
    @Output() save = new EventEmitter();

    @Input('item') set item(value: IUser){
        this.originalUser = value;
        this.setSelectedItem();
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

    isExistingUser(): boolean {
        return this.selectedItem && this.selectedItem.hasOwnProperty('userID') && this.selectedItem.userID !== null;
    }

    setSelectedItem(): void {
        this.selectedItem = (this.originalUser)? Object.assign({}, this.originalUser): null;
    }

    cancel(): void {
        this.cancelled.emit();
    }

    saveUser(e): void {
        this.save.emit(this.selectedItem);
    }
}