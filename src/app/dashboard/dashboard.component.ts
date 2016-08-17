import { Component, BreadcrumbComponent, AuthenticationComponent } from './dashboard';

@Component({
    selector: 'app-dashboard',
    template: require('./dashboard.component.html'),
    styles: [require('./dashboard.component.less')],
    directives: [BreadcrumbComponent, AuthenticationComponent],
})

export class DashboardComponent {

    navHeader: string = 'Dashboard';


}