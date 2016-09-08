import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SiteDetailComponent } from '../components/site-detail.component';
import { ISite, AllSitesService } from '../../sites-all';

// This is just a placeholder container used to pull a single site
// from the allSitesService and pass it into the SiteDetailComponent
@Component({
    selector: 'app-site-detail-container',
    template: '<app-site-detail *ngIf="site" [site]="site"></app-site-detail>',
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