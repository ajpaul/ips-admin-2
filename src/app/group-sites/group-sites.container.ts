import { Component, ROUTER_DIRECTIVES, ISite, AllSitesService, OnInit, OnDestroy, Subscription } from './group-sites';
import { GroupSitesComponent } from './group-sites.component';

@Component({
    selector: 'app-group-sites',
    template: '<app-group-sites *ngIf="sites" [sites]="sites"></app-group-sites>',
    styles: [require('./group-sites.component.less')],
    directives: [GroupSitesComponent],
    providers: [AllSitesService]
})

export class GroupSitesContainer implements OnInit, OnDestroy{

  public sites: ISite[];
  private $site: Subscription; 
  constructor(private allSitesService: AllSitesService) {

  }

  ngOnInit() {
    this.$site = this.allSitesService.getSites()
      .subscribe(sites => {
        this.sites = sites;
      }, error => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.$site.unsubscribe();
  }
}