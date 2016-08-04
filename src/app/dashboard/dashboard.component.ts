import { Component, BreadcrumbComponent, AuthenticationComponent } from './dashboard';

import './dashboard.component.less';

@Component({
    selector: 'app-dashboard',
    templateUrl: '../src/app/dashboard/dashboard.component.html',
    directives: [BreadcrumbComponent, AuthenticationComponent],
})

export class DashboardComponent {

    navHeader: string = 'Dashboard';


}