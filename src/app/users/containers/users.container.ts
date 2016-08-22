import { Component, ChangeDetectionStrategy,
    Observable, UsersList, UsersDetail,
    IUser, UsersService, ButtonComponent, ButtonAddComponent
    } from '../users';

@Component({
    selector: 'app-users',
    template: require('./users.container.html'),
    styles: [require('./users.container.less')],
    providers: [UsersService],
    directives: [UsersList, UsersDetail, ButtonAddComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersContainer {

    users: Observable<Array<IUser>>;
    selectedUser: Observable<IUser>;

    constructor(private usersService: UsersService) {

    }

    ngOnInit() {
        this.users = this.usersService.users;
        this.selectedUser = this.usersService.selectedUser;
        this.usersService.getUsers();
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