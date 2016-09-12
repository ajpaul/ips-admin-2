import { Component } from '@angular/core';

//import global less file
import '../css/styles.less';

@Component({
   selector: 'app',
   // templateUrl: 'app.component.html',
    template: require('./app.component.html'),
   // styleUrls: ['./app.component.less']
    styles: [require('./app.component.less')]
})

export class AppComponent {
    //text decoration values for sublist anchors
    user: string = "adam.paul@acauitybrands.com"; //this will later be replaced with dynamic user profile info
}
