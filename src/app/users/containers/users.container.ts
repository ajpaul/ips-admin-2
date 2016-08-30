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

    users: Array<IUser>;
    loadedUsers: Array<IUser> = [];
    selectedUser: Observable<IUser>;
    userErrors: Observable<string[]>;
    userErrorsSubscription: Subscription;
    usersSubscription: Subscription;
    loadingUserSubscription: Subscription;
    loadingUser: Observable<boolean>;
    isLoading: boolean = true;
    isError: boolean = false;

    constructor(private usersService: UsersService) { }

    ngOnInit() {
        this.selectedUser = this.usersService.selectedUser;
        this.userErrors = this.usersService.userErrors;
        this.loadingUser = this.usersService.loadingUser;

        this.usersSubscription = this.usersService.users.subscribe( users => {
            this.users = users;
        });

        this.userErrorsSubscription = this.userErrors.subscribe(errors => {
            this.isError = errors.length > 0;
        });

        this.loadingUserSubscription = this.loadingUser.subscribe( isLoading => {
            //this timeout is here to force a little bit of a loading state even if not necessary
            //to prevent a FOUC and as a best practice from UX
            setTimeout(function() {
                this.isLoading = isLoading;
                this.loadedUsers = this.users;
            }.bind(this), 750);
        });
        this.usersService.getUsers();
    }

    ngOnDestroy() {
        this.userErrorsSubscription.unsubscribe();
        this.usersSubscription.unsubscribe();
        this.loadingUserSubscription.unsubscribe();
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