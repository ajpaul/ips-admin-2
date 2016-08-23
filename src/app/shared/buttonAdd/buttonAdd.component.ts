import { Component } from '@angular/core';

@Component({
    selector: 'ui-buttonAdd',
    template:
    `
    <button class="btn add-button"><i class="fa fa-plus" aria-hidden="true"></i></button>
    `,
    styles: [require('./buttonAdd.component.less')]
})

export class ButtonAddComponent {

}