import { Component } from '@angular/core';

@Component({
    selector: 'ui-button',
    template: 
    `
    <button md-raised-button color="primary" (click)="onClick($event)">
        <ng-content></ng-content>
    </button>
    `,
    styleUrls: ['./button.component.less']
})

export class ButtonComponent {

    onClick(e) {
        alert("Button clicked for: " + e.currentTarget.innerText);
    }
}