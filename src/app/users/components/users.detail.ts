import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../users';

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