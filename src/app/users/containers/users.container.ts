import { Component, ChangeDetectionStrategy,
    Observable,
    IUser, UsersService, UsersDetail, UsersList
    } from '../users';

import { ButtonAddComponent } from '../../shared/buttonAdd/buttonAdd.component';
import { LoadingListComponent } from '../../shared/loading-list/loading-list.component';

@Component({
    selector: 'app-users',
    template: require('./users.container.html'),
    styles: [require('./users.container.less')],
    providers: [UsersService],
    directives: [UsersList, UsersDetail, ButtonAddComponent, LoadingListComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersContainer {

    users: Observable<Array<IUser>>;
    selectedUser: Observable<IUser>;
    userErrors: Observable<string[]>;
    loadingUser: Observable<boolean>;
    isLoading: boolean;

    constructor(private usersService: UsersService) {

    }

    ngOnInit() {
        this.users = this.usersService.users;
        this.selectedUser = this.usersService.selectedUser;
        this.userErrors = this.usersService.userErrors;
        this.loadingUser = this.usersService.loadingUser;
        this.isLoading = false;        
        this.loadingUser.subscribe( isLoading => this.isLoading = isLoading );
        this.usersService.getUsers();
    }

    onClickError(index: number) {
        this.usersService.deleteError(index);
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