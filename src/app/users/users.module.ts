import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { UsersDetail, UsersList, UsersService } from './users';
import { UsersContainer } from './containers/users.container';
import { SharedModule } from '../shared/shared.module';

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