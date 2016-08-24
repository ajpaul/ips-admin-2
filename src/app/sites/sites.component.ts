import { Component, ButtonAddComponent, ToggleComponent,
  SitesAllContainer, SitesGroupsComponent, ROUTER_DIRECTIVES, MapComponent } from './sites';
  
@Component({
    selector: 'app-sites',
    template: require('./sites.component.html'),
    styles: [require('./sites.component.less')],
    directives: [ButtonAddComponent, SitesAllContainer, ToggleComponent,
                  SitesGroupsComponent, ROUTER_DIRECTIVES, MapComponent],
})

export class SitesComponent {

}