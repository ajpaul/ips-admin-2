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

    users$: Observable<IUser[]>;
    selectedUser$: Observable<IUser>;
    userErrors$: Observable<string[]>;
    userErrorsSubscription: Subscription;
    loadingUser$: Observable<boolean>;

    constructor(private usersService: UsersService) { }

    ngOnInit() {
        this.users$ = this.usersService.users;
        this.selectedUser$ = this.usersService.selectedUser;
        this.userErrors$ = this.usersService.userErrors;
        this.loadingUser$ = this.usersService.loadingUser;

        this.usersService.getUsers();

        this.selectedUser$.subscribe((u) => {
            console.log('selectedUser:: ', u);
        })
    }

    ngOnDestroy() {
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
        if(user.userID) {
            this.usersService.updateUser(user);
        } else {
            this.usersService.createUser(user);
        }
    }
}