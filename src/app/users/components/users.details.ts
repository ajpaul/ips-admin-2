import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../users.interface';
import { MdInput } from '@angular2-material/input';

@Component({
    selector: 'users-detail',
    templateUrl: './users.details.html',
    styleUrls: ['./users.details.less'],
    directives: [ MdInput ]
})
export class UsersDetail {

    showUserDetails: boolean = true;
    showUserSites: boolean = false;
    confirmDelete: boolean = false;
    originalUser: IUser = null;
    selectedItem: IUser = null;
    @Output() create = new EventEmitter();
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