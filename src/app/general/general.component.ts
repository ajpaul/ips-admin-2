import { Component, BreadcrumbComponent, NgForm, GeneralSettingsService,
     IPointOfContact, IBusinessAddress, BusinessAddress, MD_INPUT_DIRECTIVES,
    MD_CARD_DIRECTIVES, ButtonSaveComponent } from './general';

@Component({
    selector: 'app-general',
    template: require('./general.component.html'),
    styles: [require('./general.component.less')],
    directives: [BreadcrumbComponent, MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES, ButtonSaveComponent],
    providers: [GeneralSettingsService]
})

export class GeneralComponent {

    navHeader: string = 'Settings > General';
    submitted: boolean = false;
    businessAddress: IBusinessAddress;
    contact: IPointOfContact;

    //make a global states list
    states: [string] = ['Alabama', 'Georgia', 'Missouri', 'North Carolina', 'Virginia'];

    //make a global countries list - cascade them - ugh
    countries: [string] = ['Canada', 'Mexico', 'United States'];

    constructor(private _generalService: GeneralSettingsService) {
        this.businessAddress = _generalService.getBusinessAddress(1);
        this.contact = _generalService.getPointOfContact(1);
    }

    baModel = new BusinessAddress(2, "1 Lester Rd NW", "Cool cube", "Conyers", this.states[1], "30012", this.countries[2])

    onSubmit() {
        this.submitted = true;
    }
    
    get diagnostic() {
        return JSON.stringify(this.baModel);
    }

    generalSave(e): void {
        alert("Saving the general settings");
    }

}