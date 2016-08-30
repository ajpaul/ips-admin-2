import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IUser, UsersService } from '../users';

@Component({
    selector: 'app-users',
    templateUrl: './users.container.html',
    styleUrls: ['./users.container.less']
})

export class UsersContainer implements OnInit, OnDestroy {

    users: Observable<Array<IUser>>;
    selectedUser: Observable<IUser>;
    userErrors: Observable<string[]>;
    userErrorsSubscription: Subscription;
    loadingUser: Observable<boolean>;
    isError: boolean;

    constructor(private usersService: UsersService) {
        this.isError = false;
    }

    ngOnInit() {
        this.users = this.usersService.users;
        this.selectedUser = this.usersService.selectedUser;
        this.userErrors = this.usersService.userErrors;
        this.userErrorsSubscription = this.userErrors.subscribe(errors => {
            if (errors.length > 0) {
                this.isError = true;
            } else {
                this.isError = false;
            }
        });
        this.loadingUser = this.usersService.loadingUser;
        this.usersService.getUsers();
    }

    ngOnDestroy() {
        this.userErrorsSubscription.unsubscribe();
    }

    onClearError() {
        this.usersService.clearErrors();
    }

    selectItem(item: IUser) {
        this.usersService.selectUser(item);
    }

    deleteItem(item: IUser) {
        this.usersService.deleteUser(item);
    }

    resetItem() {
        this.usersService.resetUser()
    }

    saveItem(user: IUser) {
        this.usersService.createUser(user);

        // Generally, we would want to wait for the result of `itemsService.saveItem`
        // before resetting the current item.
        this.resetItem();
    }
}