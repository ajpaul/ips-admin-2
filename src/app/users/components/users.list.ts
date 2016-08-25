/**
 * Created by sxd15 on 8/11/2016.
 */

import { Component, Input, Output, EventEmitter, IUser } from '../users';
import { LoadingListComponent } from '../../shared/loading-list/loading-list.component';
//-------------------------------------------------------------------
// LIGHTS-LIST
//-------------------------------------------------------------------
@Component({
    selector: 'users-list',
    styles: [require('./users.list.less')],
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