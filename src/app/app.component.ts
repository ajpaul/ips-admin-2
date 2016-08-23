import { Component } from '@angular/core';

//import global less file
import '../css/styles.less';

@Component({
   selector: 'app',
   template: require('./app.component.html'),
   styles: [require('./app.component.less')]
})

export class AppComponent {

    //text decoration values for sublist anchors
    clicked: string = null;
    private selectedAnchorId: string;
    user: string = "Adam"; //this will later be replaced with dynamic user profile info

    setSelectedAnchor(e): void {

      this.selectedAnchorId = e.currentTarget.id;
    }

    setClasses(elementId: string) {

        return {
            anchor: true,
            anchorClicked: this.selectedAnchorId === elementId
        }
    }
}
