import { Component } from '@angular/core';

@Component({
    selector: 'ui-toggle',
    template: require('./toggle.component.html'),
    styles: [require('./toggle.component.less')]
})

export class ToggleComponent{


    //this is just a placeholder component until I can get to flushing this out later.

    //todo:
    //add boolean value that can be set/passed in
    //add "on/off" label to the switch (css magic: use content: "on" and content: "off" styles)
    //maybe allow the color to be a property that is supplied? if needed...now they are always green
}

