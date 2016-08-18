import { Component, ROUTER_DIRECTIVES, provideRouter,
    RouterConfig, Store, Observable, AuthenticationComponent, MdButton, MdToolbar,
    MD_LIST_DIRECTIVES, MdIcon, MdIconRegistry, DashboardComponent, 
    SitesAllContainer, SitesGroupsComponent, BlankComponent, UsersContainer,
    SettingsComponent, LightsContainer, APIKeysComponent, CodebooksComponent,
    DeploymentComponent, MobileConfigComponent, GeneralComponent, NotFoundComponent} from './app'

//import global less file
import '../css/styles.less';

@Component({
   selector: 'app',
   template: require('./app.component.html'),
   styles: [require('./app.component.less')],
   directives: [ROUTER_DIRECTIVES, AuthenticationComponent, MdButton, MD_LIST_DIRECTIVES, 
   DashboardComponent, MdToolbar, MdIcon],
   viewProviders: [MdIconRegistry]
})



export class AppComponent {

    //text decoration values for sublist anchors
    clicked: string = null;
    private selectedAnchorId: string;
    user: string = "Adam"; //this will later be replaced with dynamic user profile info

    setSelectedAnchor(e): void {

      this.selectedAnchorId = e.currentTarget.id;
    }

    setClasses(elementId: string) {

        return {
            anchor: true,
            anchorClicked: this.selectedAnchorId === elementId
        }
    }
}
