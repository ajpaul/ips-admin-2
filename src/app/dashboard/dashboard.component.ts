import { Component, AuthenticationComponent } from './dashboard';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less'],
    directives: [AuthenticationComponent],
})

export class DashboardComponent {

}