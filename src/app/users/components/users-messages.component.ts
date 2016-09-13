import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'users-messages',
    templateUrl: './users-messages.component.html',
    styleUrls: ['./users-messages.component.less']
})
export class UsersMessages {
    @Input() welcome: boolean;
    @Output() create = new EventEmitter();

    createUserClick(): void {
        this.create.emit();
    }
}