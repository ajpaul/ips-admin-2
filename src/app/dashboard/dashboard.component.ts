import { Component, AuthenticationComponent } from './dashboard';

@Component({
    selector: 'app-dashboard',
    template: require('./dashboard.component.html'),
    styles: [require('./dashboard.component.less')],
    directives: [AuthenticationComponent],
})

export class DashboardComponent {




}