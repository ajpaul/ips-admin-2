import { Component, ROUTER_DIRECTIVES, Input, ISite, MdInput, MdCheckbox } from '../site-detail';

@Component({
    selector: 'app-site-detail',
    templateUrl: './site-detail.component.html',
    styleUrls: ['./site-detail.component.less'],
    directives: [ROUTER_DIRECTIVES, MdInput, MdCheckbox],
})

export class SiteDetailComponent {
    @Input() site: ISite;
}