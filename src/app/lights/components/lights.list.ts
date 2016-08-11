/**
 * Created by sxd15 on 8/11/2016.
 */

import { Component, Input, Output, EventEmitter, ILight } from '../lights';

//-------------------------------------------------------------------
// LIGHTS-LIST
//-------------------------------------------------------------------
@Component({
    selector: 'lights-list',
    templateUrl: '../src/app/lights/components/lights.list.html'
})
export class LightsList {
    @Input() items: ILight[];
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();
}