import { Component } from '@angular/core';

@Component({
    selector: 'ui-buttonSave',
    template:
    `
    <button md-fab color="accent">
       <md-icon class="md-24">save</md-icon>
    </button>
    `,
    styles: [require('./buttonSave.component.less')]
})

export class ButtonSaveComponent {

}