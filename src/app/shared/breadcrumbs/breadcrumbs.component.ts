import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-breadcrumb',
    template: 
    `
    <div>{{navHeader}}</div>
    `,
    styles: [require('./breadcrumbs.component.less')]
    
})

export class BreadcrumbComponent {

    @Input() navHeader; //not declaring a type because I think I can append HTML...idk
}