import { Component, SidebarComponent }  from './settings';

@Component({
    selector: 'app-settings',
    templateUrl: '../src/app/settings/settings.component.html',
    directives: [SidebarComponent]
})

export class SettingsComponent {

    sidebarButtons = [
        { name: "General Settings", path: "general", id: "sbGeneral"},
        { name: "Codebooks", path: "codebooks", id: "sbCodebooks"},
        { name: "Mobile Config", path: "mobile-config", id: "sbMobileconfig"},
        { name: "API Keys", path: "api-keys", id: "sbAPIKeys"},
        { name: "Deployment", path: "deployment", id: "sbDeployment"}
    ];
}