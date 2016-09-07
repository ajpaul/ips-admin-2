import { Component, Input, Output, EventEmitter, OnChanges, trigger, state, style, transition, animate, Inject, ElementRef, Injector } from '@angular/core';
import { warningColor, activeColor, successColor, white } from '../../shared/colors/colors';
import { USERS_LOADING, USERS_NOT_LOADING, USERS_LOADING_ERROR } from '../../users/users';
import { LoadingListComponent } from '../../shared/loading-list/loading-list.component';

@Component({
    selector: 'users-loading-list',
    template: require('../../shared/loading-list/loading-list.component.html'),
    styles: [require('../..//shared/loading-list/loading-list.component.less')],
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
export class UsersLoadingListComponent extends LoadingListComponent {

    // constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector) {
    //     super(elRef, injector);
    // }

    @Input() loadingStatus: number;
    // TODO implement this delay as a minimum time before show loading
    //@Input() delay: number;
    @Output() onClearError = new EventEmitter();    

    // This will be an abstract method overriden in subclasses
    getLoadingStatusLoading() {
        return USERS_LOADING;
    }

    // This will be an abstract method overriden in subclasses
    getLoadingStatusNotLoading() {
        return USERS_NOT_LOADING;
    }

    // This will be an abstract method overriden in subclasses
    getLoadingStatusError() {
        return USERS_LOADING_ERROR;
    }

}