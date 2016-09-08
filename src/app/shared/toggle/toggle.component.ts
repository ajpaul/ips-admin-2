import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.less']
})

export class ToggleComponent{
    @Input('is-on') isOn: boolean;
}

