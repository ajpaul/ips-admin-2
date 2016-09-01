import { Component, Input, OnChanges, trigger, state, style, transition, animate } from '@angular/core';
import { warningColor, activeColor, successColor, white } from '../colors/colors.service';
@Component({
    selector: 'app-loading-list',
    template: require('./loading-list.component.html'),
    styles: [require('./loading-list.component.less')],
    animations: [
      trigger('loadingState', [
        state('loading', style({ backgroundColor: activeColor })),
        state('success', style({ backgroundColor: successColor })),
        state('error', style({ backgroundColor: warningColor }))
      ]),
      trigger('loadingHeight', [
        state('notloading', style({ backgroundColor: white })),
        state('loading', style({  backgroundColor: activeColor, transform: 'translateX(0)' })),
        state('error', style({ backgroundColor: warningColor, transform: 'translateX(0)' })),
        transition('* => loading', [
          style({ transform: 'translateX(-100%)', backgroundColor: activeColor }),
          animate('250ms ease')
        ]),
        transition('loading => notloading', [
          animate('250ms ease', style({ backgroundColor: successColor })),
          animate('250ms 1750ms ease', style({ backgroundColor: white, transform: 'translateX(100%)', height: '0px' }))
        ]),
        transition('loading => error', [
          animate('250ms ease')
        ]),
        // transition('success => notloading', [
        //   animate('250ms ease-out')
        // ]),
        transition('error => notloading', [
          animate('250ms ease-out')
        ]),

      ]),
      trigger('loadingIconIn', [
        state('in', style({ opacity: 1 })),
        state('out', style({ opacity: 0 })),
        transition('out <=> in', [
          animate('250ms ease')
        ]),
      ])
    ]
})
export class LoadingListComponent implements OnChanges {
  @Input() loadingStatus: number;
  @Input() delay: number;
  showLoading: boolean = false;
  timeoutId: any = undefined;
  /**
   * Loading status represents the current status based on
   * the isLoading, isSuccess, and isError inputs
   * It can be one of the following values:
   * notloading
   * loading
   * success
   * error
   * 
   * @type {string}
   */
  loadingState: string = 'notloading';
  constructor() {
  };

  ngOnChanges(changes) {
    console.log('in loading comp before load:', this.loadingState);
    if (changes.loadingStatus) {
        // populate the loadingState used to determine animations
        switch (this.loadingStatus) {
            case 0:
                this.loadingState = 'notloading';
                break;
            case 1:
                this.loadingState = 'loading';
                break;
            case 2:
                this.loadingState = 'error';
                break;
            default:
                break;
      }
    }
    console.log('loading state in loading list:', this.loadingState);

    if (changes.isLoading && changes.isLoading.previousValue !== true && changes.isLoading.currentValue === true) {
      this.timeoutId = setTimeout(() => {
        this.showLoading = true;
        this.timeoutId = undefined;
      }, this.delay);
    } else if (changes.isLoading && changes.isLoading.currentValue === false) {
      if (this.timeoutId !== undefined) {
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
      }
      this.showLoading = false;
    }
  }
}