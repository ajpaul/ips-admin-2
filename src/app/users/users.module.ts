import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersMessages } from './components/users-messages.component';
import { UsersDetail } from './components/users.details';
import { UsersList } from './components/users.list';
import { UsersService } from './users.service';
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