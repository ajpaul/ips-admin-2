/**
 * Created by sxd15 on 8/11/2016.
 */

import { Component, Input, Output, EventEmitter, IUser } from '../users';

//-------------------------------------------------------------------
// LIGHTS-LIST
//-------------------------------------------------------------------
@Component({
    selector: 'users-list',
    template: require('./users.list.html'),
})
export class UsersList {
    @Input() items: IUser[];
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();
}