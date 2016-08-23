import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../users';

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