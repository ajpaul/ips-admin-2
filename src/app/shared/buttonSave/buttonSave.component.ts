import { Component, MdButton, MdIcon, MdIconRegistry } from './buttonSave';

@Component({
    selector: 'ui-buttonSave',
    template:
    `
    <button md-fab color="accent">
       <md-icon class="md-24">save</md-icon>
    </button>
    `,
    styles: [require('./buttonSave.component.less')],
    directives: [MdButton, MdIcon],
    viewProviders: [MdIconRegistry]
})

export class ButtonSaveComponent {

}