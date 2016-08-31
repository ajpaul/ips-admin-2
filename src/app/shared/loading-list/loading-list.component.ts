import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-loading-list',
    template: require('./loading-list.component.html'),
    styles: [require('./loading-list.component.less')],
    
})
export class LoadingListComponent implements OnChanges {
  @Input() isLoading: boolean;
  @Input() delay: number;
  showLoading: boolean = false;
  timeoutId: any = undefined;
  constructor() {
  };

  ngOnChanges(changes) {
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