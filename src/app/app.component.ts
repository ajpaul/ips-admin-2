import { Component, ROUTER_DIRECTIVES, provideRouter,
    RouterConfig, Store, Observable, AuthenticationComponent, MdButton,
    MD_LIST_DIRECTIVES, DashboardComponent, 
    SitesAllContainer, SitesGroupsComponent, BlankComponent, UsersContainer,
    LightsContainer, NotFoundComponent} from './app'

//import global less file
import '../css/styles.less';

@Component({
   selector: 'app',
   template: require('./app.component.html'),
   styles: [require('./app.component.less')],
   directives: [ROUTER_DIRECTIVES, AuthenticationComponent, MdButton, MD_LIST_DIRECTIVES, DashboardComponent]
})

export class AppComponent {
    //text decoration values for sublist anchors
    user: string = "adam.paul@acuitybrands.com"; //this will later be replaced with dynamic user profile info
}
