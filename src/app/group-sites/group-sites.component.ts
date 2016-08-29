import { Component, ROUTER_DIRECTIVES, Input, ISite, MdInput, MdCheckbox, MdIcon } from './group-sites';

@Component({
    selector: 'app-group-sites',
    templateUrl: './group-sites.component.html',
    styleUrls: ['./group-sites.component.less']
})

export class GroupSitesComponent {
  @Input() sites: ISite[];

  ngOnChanges() {
  }
}