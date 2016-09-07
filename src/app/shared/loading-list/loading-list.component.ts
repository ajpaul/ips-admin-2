import { Component, Input, Output, EventEmitter, OnChanges, trigger, state, style, transition, animate } from '@angular/core';
import { warningColor, activeColor, successColor, white } from '../colors/colors';

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
            state('loading', style({ backgroundColor: activeColor, transform: 'translateX(0)' })),
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
    // TODO implement this delay as a minimum time before show loading
    //@Input() delay: number;
    @Output() onClearError = new EventEmitter();
    showLoading: boolean = false;
    timeoutId: any = undefined;

    NOT_LOADING_STATE: string = 'notloading';
    LOADING_STATE: string = 'loading';
    ERROR_STATE: string = 'error';

    /**
     * Loading status represents the current status based on
     * the loadingStatus store item
     * It can be one of the following values:
     * notloading
     * loading
     * error
     * 
     * @type {string}
     */
    loadingState: string = 'notloading';

    constructor() {
    };

    clearError() {
        this.onClearError.emit({});
    }

    // This will be an abstract method overriden in subclasses
    getLoadingStatusLoading() {
        throw Error("Must implement getLoadingStatusLoading in subclass of LoadingListComponent");
    }

    // This will be an abstract method overriden in subclasses
    getLoadingStatusNotLoading() {
        throw Error("Must Implement getLoadingStatusNotLoading in subclass of LoadingListComponent");
    }

    // This will be an abstract method overriden in subclasses
    getLoadingStatusError() {
        throw Error("Must Implement getLoadingStatusError in subclass of LoadingListComponent")
    }

    isLoadingState() {
        return this.loadingState === this.LOADING_STATE;
    }

    isNotLoadingState() {
        return this.loadingState === this.NOT_LOADING_STATE;
    }

    isErrorState() {
        return this.loadingState === this.ERROR_STATE;
    }

    ngOnChanges(changes) {
        if (changes.loadingStatus) {
            // populate the loadingState used to determine animations
            switch (this.loadingStatus) {
                case this.getLoadingStatusNotLoading():
                    this.loadingState = this.NOT_LOADING_STATE;
                    break;
                case this.getLoadingStatusLoading():
                    this.loadingState = this.LOADING_STATE;
                    break;
                case this.getLoadingStatusError():
                    this.loadingState = this.ERROR_STATE;
                    break;
                default:
                    break;
            }
        }
    }
}