import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IUser } from '../users.interface';
import { UsersService } from '../users.service';
import { Loading } from '../../shared/loading-list';

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
    loadingUser$: Observable<Loading>;
    deletingUser$: Observable<Loading>;
    hasUsers: boolean = false;

    constructor(private usersService: UsersService) { }

    ngOnInit() {
        this.users$ = this.usersService.users;
        this.selectedUser$ = this.usersService.selectedUser;
        this.userErrors$ = this.usersService.userErrors;
        this.loadingUser$ = this.usersService.loadingUser;
        this.deletingUser$ = this.usersService.deletingUser;

        this.users$.subscribe((ul)=>{
            this.hasUsers = ul && ul.length>0
        });
        this.getUsers();
    }

    ngOnDestroy() {
    }

    onClearError() {
        this.usersService.clearErrors();
    }

    getUsers() {
        this.usersService.getUsers();
    }

    selectItem(item: IUser) {
        this.usersService.selectUser(item);
    }

    deleteItem({ item }: { item: IUser }) {
        this.usersService.deleteUser(item);
    }

    resetItem() {
        this.usersService.resetUser()
    }

    cancelNewItem() {
        this.usersService.clearSelectedUser();
    }

    saveItem(user: IUser) {
        if(user.userID) {
            this.usersService.updateUser(user);
        } else {
            this.usersService.createUser(user);
        }
    }
}