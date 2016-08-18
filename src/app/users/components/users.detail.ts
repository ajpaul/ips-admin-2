/**
 * Created by sxd15 on 8/11/2016.
 */

import { Component, Input, Output, EventEmitter, IUser } from '../users';

@Component({
    selector: 'users-detail',
    template: require('./users.detail.html')
})
export class UsersDetail {

    originalName: string;
    selectedItem: IUser;
    @Output() saved = new EventEmitter();
    @Output() cancelled = new EventEmitter();

    @Input('item') set item(value: IUser){
        if (value) this.originalName = value.displayName;
        this.selectedItem = Object.assign({}, value);
    }
}