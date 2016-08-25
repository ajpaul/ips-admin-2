import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../users';
import { LoadingListComponent } from '../../shared/loading-list/loading-list.component';

//-------------------------------------------------------------------
// LIGHTS-LIST
//-------------------------------------------------------------------
@Component({
    selector: 'users-list',
    template: require('./users.list.html'),
    directives: [LoadingListComponent]
})
export class UsersList {
    @Input() items: IUser[];
    @Input() isLoading: boolean;
    @Input() isError: boolean;
    @Output() onClearError = new EventEmitter();
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();

    clearError() {
        this.onClearError.emit({});
    }

}