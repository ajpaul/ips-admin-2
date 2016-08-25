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
    user: string = "adam.paul@acauitybrands.com"; //this will later be replaced with dynamic user profile info
}
