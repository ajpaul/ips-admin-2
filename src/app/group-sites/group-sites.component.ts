import { Component, ROUTER_DIRECTIVES, Input, ISite, MdInput, MdCheckbox, MdIcon } from './group-sites';

@Component({
    selector: 'app-group-sites',
    template: require('./group-sites.component.html'),
    styles: [require('./group-sites.component.less')]
})

export class GroupSitesComponent {
  @Input() sites: ISite[];

  ngOnChanges() {
  }
}