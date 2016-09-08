import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ISite } from '../../sites-all';
import { MdInput } from '@angular2-material/input';
import { MdCheckbox } from '@angular2-material/checkbox';

@Component({
    selector: 'app-site-detail',
    templateUrl: './site-detail.component.html',
    styleUrls: ['./site-detail.component.less'],
    directives: [ROUTER_DIRECTIVES, MdInput, MdCheckbox],
})

export class SiteDetailComponent {
    @Input() site: ISite;
}