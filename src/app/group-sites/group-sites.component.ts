import { Component, ROUTER_DIRECTIVES, Input, ISite, MdInput, MdCheckbox, MdIcon } from './group-sites';

@Component({
    selector: 'app-group-sites',
    template: require('./group-sites.component.html'),
    styles: [require('./group-sites.component.less')],
    directives: [ROUTER_DIRECTIVES, MdInput, MdCheckbox, MdIcon],
})

export class GroupSitesComponent {
  @Input() sites: ISite[];

  ngOnChanges() {
    console.log(this.sites);
  }
}