/**
 * Created by sxd15 on 8/11/2016.
 */

import { Component, Input, Output, EventEmitter, IUser } from '../users';

//this import will fail if not explicit
import { ToggleComponent } from '../../shared/toggle/toggle.component';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';

@Component({
    selector: 'users-detail',
    template: require('./users.details.html'),
    styles: [require('./users.details.less')],
    directives: [ToggleComponent, MD_INPUT_DIRECTIVES]
})
export class UsersDetail {

    showUserDetails: boolean = true;
    showUserSites: boolean = false;
    originalName: string;
    selectedItem: IUser;
    @Output() saved = new EventEmitter();
    @Output() cancelled = new EventEmitter();

    @Input('item') set item(value: IUser){
        if (value) this.originalName = value.displayName;
        this.selectedItem = Object.assign({}, value);
    }

    showUserDetailsClick(): void {
        this.showUserDetails = true;
        this.showUserSites = false;
    }

    showUserSitesClick(): void {
        this.showUserDetails = false;
        this.showUserSites = true;
    }


}