import { Component } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less'],
    directives: [AuthenticationComponent],
})

export class DashboardComponent {

}