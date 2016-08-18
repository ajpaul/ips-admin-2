import { Component, ROUTER_DIRECTIVES, Input, ISite, MdInput, MdCheckbox, MdIcon } from '../site-detail';

@Component({
    selector: 'app-site-detail',
    template: require('./site-detail.component.html'),
    styles: [require('./site-detail.component.less')],
    directives: [ROUTER_DIRECTIVES, MdInput, MdCheckbox, MdIcon],
})

export class SiteDetailComponent {
}