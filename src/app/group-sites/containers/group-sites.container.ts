import { Component, ROUTER_DIRECTIVES, ISite, AllSitesService, OnInit, OnDestroy, Subscription } from '../group-sites';

@Component({
    selector: 'app-group-sites-container',
    template: '<app-group-sites *ngIf="sites" [sites]="sites"></app-group-sites>'
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