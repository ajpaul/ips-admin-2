import { Component, ROUTER_DIRECTIVES, Input, ISite, MdInput } from './site-detail';

@Component({
    selector: 'app-site-detail',
    template: require('./site-detail.component.html'),
    styles: [require('./site-detail.component.less')],
    directives: [ROUTER_DIRECTIVES, MdInput],
})

export class SiteDetailComponent {
  @Input() site: ISite;

  ngOnChanges() {
    console.log(this.site);
  }
}