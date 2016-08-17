import { Component, BreadcrumbComponent } from './deployment';

@Component({
    selector: 'app-deployment',
    template: require('./deployment.component.html'),
    styles: [require('./deployment.component.less')],
    directives: [BreadcrumbComponent]
})

export class DeploymentComponent {

    navHeader: string = 'Settings > Deployment';
}