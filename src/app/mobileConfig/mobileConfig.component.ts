import { Component, MobileConfigService, IMobileConfig, ButtonComponent, FilterComponent,
    BreadcrumbComponent, ButtonSaveComponent } from './mobileConfig';

@Component({
    selector: 'app-mobileConfig',
    directives: [ButtonComponent, FilterComponent, BreadcrumbComponent, ButtonSaveComponent],
    template: require('./mobileConfig.component.html'),
    styles: [require('./mobileConfig.component.less')],
    providers: [MobileConfigService]
})

export class MobileConfigComponent {

    navHeader: string = 'Settings > Mobile Config';
    mobileConfigs: IMobileConfig[];
    filterValues = ['Filter', 'By', 'A', 'Value'];
    errorMessage: string;

    constructor(private _mobileConfigService: MobileConfigService) {}

    ngOnInit () {
        this._mobileConfigService.getMobileConfigs().subscribe(
                mobileConfigs => this.mobileConfigs = mobileConfigs,
                error =>  this.errorMessage = <any>error);
    }

    mobileConfigClick(mobileConfigID: number): void {
        alert('Opening mobile config with mobileConfigID: ' + mobileConfigID);
    }

    mobileConfigSave(e): void {
        alert('Saving mobile config!');
    }
}