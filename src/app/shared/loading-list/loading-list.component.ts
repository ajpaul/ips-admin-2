import { Component, Input, OnChanges, trigger, state, style, transition, animate } from '@angular/core';

@Component({
    selector: 'app-loading-list',
    template: require('./loading-list.component.html'),
    styles: [require('./loading-list.component.less')],
    animations: [
      trigger('loadingState', [
        state('loading', style({ backgroundColor: '#0000ff' })),
        state('success', style({ backgroundColor: '#00ff00' })),
        state('error', style({ backgroundColor: '#ff0000' }))
      ]),
      trigger('loadingHeight', [
        state('notloading', style({ transform: 'translateX(100%)', backgroundColor: '#0000ff' })),
        state('loading', style({  backgroundColor: '#0000ff', transform: 'translateX(0)' })),
        state('success', style({ backgroundColor: '#00ff00', transform: 'translateX(0)' })),
        state('error', style({ backgroundColor: '#ff0000', transform: 'translateX(0)' })),
        transition('notloading => loading', [
          style({ transform: 'translateX(-100%)', backgroundColor: "#0000ff" }),
          animate('250ms ease-in')
        ]),
        transition('loading => success', [
          animate('250ms ease-out')
        ]),
        transition('loading => error', [
          animate('250ms ease-out')
        ]),
        transition('success => notloading', [
          animate('250ms ease-out')
        ]),
        transition('error => notloading', [
          animate('250ms ease-out')
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