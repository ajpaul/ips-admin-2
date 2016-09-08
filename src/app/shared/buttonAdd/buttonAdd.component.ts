import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'ui-buttonAdd',
    template:
    `
    <button class="btn add-button" (click)="onClick($event)"><i class="fa fa-plus" aria-hidden="true"></i></button>
    `,
    styleUrls: ['./buttonAdd.component.less']
})

export class ButtonAddComponent {
    @Output() click = new EventEmitter();

    onClick(e) {
        this.click.emit();
    }
}