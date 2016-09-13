/**
 * Created by sxd15 on 8/11/2016.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ILight } from '../lights.interface';

//-------------------------------------------------------------------
// LIGHTS-LIST
//-------------------------------------------------------------------
@Component({
    selector: 'lights-list',
    templateUrl: './lights.list.html'
})
export class LightsList {
    @Input() items: ILight[];
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();
}