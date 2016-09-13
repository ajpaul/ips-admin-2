import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ISite, AllSitesService } from '../sites-all';
import { MdInput } from '@angular2-material/input';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MdIcon } from '@angular2-material/icon';

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