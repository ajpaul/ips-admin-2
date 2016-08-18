import { Component, Output, Input } from "@angular/core";
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';

@Component({
    selector: 'ui-sidebar',
    template:
    `
    <md-nav-list class="sidebar">
        <a md-list-item *ngFor="let value of values; let i = index"
             id='{{value.id}}' [routerLink]="value.path"
             [ngClass]="setClasses(value.id)"
             (click)="setSelectedAnchor($event)">{{ value.name }}
        </a>
    </md-nav-list>
    <router-outlet></router-outlet>
    `,
    styles: [require('./sidebar.component.less')],
    directives: [ROUTER_DIRECTIVES, MD_LIST_DIRECTIVES]
})

//that's a crappy template. sorry

export class SidebarComponent {

    private selectedAnchorId: string;
    @Input() values = [];

    ngOnInit() {
        console.log("A UI sidebar component was initialized");
    }

    setSelectedAnchor(e): void {
      this.selectedAnchorId = e.currentTarget.id;
    }

    setClasses(elementId: string) {

        return {
            sidebarClicked: false,
            sublistAnchorClicked: this.selectedAnchorId === elementId
        }
    }
}

