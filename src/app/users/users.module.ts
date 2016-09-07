import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersDetail, UsersList, UsersService, UsersLoadingListComponent } from './users';
import { UsersContainer } from './containers/users.container';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        UsersContainer,
        UsersList,
        UsersDetail,
        UsersLoadingListComponent
    ],
    exports: [
        UsersContainer,
        UsersDetail,
        UsersList,
        UsersLoadingListComponent
    ],
    providers: [
        UsersService
    ]
})
export class UsersModule {}