import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Loading } from '../loading-list'

@Component({
    selector: 'app-loading-panel',
    templateUrl: './loading-panel.component.html',
    styleUrls: ['./loading-panel.component.less']
})
export class LoadingPanelComponent {
    @Input() loadingStatus: Loading;
    @Output() refresh = new EventEmitter();

    constructor() {}

    isError():boolean {
        return this.loadingStatus == Loading.Error;
    }

    refreshClick(): void {
        this.refresh.emit();
    }
}