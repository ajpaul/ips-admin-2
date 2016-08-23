import { Component, Output, Input, EventEmitter  } from '@angular/core';

@Component({
    selector: 'ui-filter',
    template: require('./filter.component.html'),
    styles: [require('./filter.component.less')]
})

export class FilterComponent {

    @Output() select = new EventEmitter();
    @Input() values = [];

    ngOnInit() {
        this.onSelect(this.values[0]);
    }

    onSelect(val) {
        this.select.emit(val);
    }
}