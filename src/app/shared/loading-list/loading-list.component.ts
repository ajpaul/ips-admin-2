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
        state('notloading', style({ transform: 'translateX(100%)' })),
        state('loading', style({  backgroundColor: '#0000ff', transform: 'translateX(0)' })),
        state('success', style({ backgroundColor: '#00ff00', transform: 'translateX(100%)' })),
        state('error', style({ backgroundColor: '#ff0000', transform: 'translateX(0)' })),
        transition('* => loading', [
          style({ transform: 'translateX(-100%)' }),
          animate('250ms ease-in')
        ]),
        transition('loading => success', animate('250ms ease-out'))
      ])      
    ]
})
export class LoadingListComponent implements OnChanges {
  @Input() isLoading: boolean;
  @Input() delay: number;
  @Input() isSuccess: boolean;
  @Input() isError: boolean;
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
    if (changes.isLoading || changes.isSuccess || changes.isError) {
      // populate the loadingStatus used to determine animations
      if (this.isLoading) {
        this.loadingState = "loading";
      } else if (this.isSuccess) {
        this.loadingState = "success";
      } else if (this.isError) {
        this.loadingState = "error";
      } else {
        this.loadingState = "notloading";
      }
    }


    console.log('loading state in loading list:', this.loadingState);



    if (changes.isLoading.previousValue !== true && changes.isLoading.currentValue === true) {
      this.timeoutId = setTimeout(() => {
        this.showLoading = true;
        this.timeoutId = undefined;
      }, this.delay);
    } else if (changes.isLoading.currentValue === false) {
      if (this.timeoutId !== undefined) {
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
      }
      this.showLoading = false;
    }
  }
}