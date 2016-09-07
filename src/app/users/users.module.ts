import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersDetail, UsersList, UsersService } from './users';
import { UsersContainer } from './containers/users.container';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        UsersContainer,
        UsersList,
        UsersDetail
    ],
    exports: [
        UsersContainer,
        UsersDetail,
        UsersList
    ],
    providers: [
        UsersService
    ]
})
export class UsersModule {}