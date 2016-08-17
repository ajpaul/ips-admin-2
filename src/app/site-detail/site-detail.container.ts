import { Component, ROUTER_DIRECTIVES, ISite, AllSitesService, OnInit, OnDestroy, Subscription } from './site-detail';
import { SiteDetailComponent } from './site-detail.component';

@Component({
    selector: 'app-site-detail',
    template: '<app-site-detail *ngIf="site" [site]="site"></app-site-detail>',
    styles: [require('./site-detail.component.less')],
    directives: [SiteDetailComponent],
    providers: [AllSitesService]
})

export class SiteDetailContainer implements OnInit, OnDestroy{

  public site: ISite;
  private $site: Subscription; 
  constructor(private allSitesService: AllSitesService) {

  }

  ngOnInit() {
    this.$site = this.allSitesService.getSites()
      .subscribe(sites => {
        if (sites.length > 0) {
          this.site = sites[0];
        }
      }, error => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.$site.unsubscribe();
  }
}