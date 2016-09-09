import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersDetail, UsersList, UsersService, UsersMessages } from './users';
import { UsersContainer } from './containers/users.container';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        UsersContainer,
        UsersList,
        UsersDetail,
        UsersMessages
    ],
    exports: [
        UsersContainer,
        UsersDetail,
        UsersList,
        UsersMessages
    ],
    providers: [
        UsersService
    ]
})
export class UsersModule {}