import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
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