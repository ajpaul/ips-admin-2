import { AppStore } from '../../app.store';
import { Component, ChangeDetectionStrategy} from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '../../shared/button/button.component';
import { Observable } from 'rxjs/Observable';    
import { ILight } from '../lights.interface';
import { LightsService } from '../lights.service';
import { LightsList } from '../components/lights.list';
import { LightsDetail } from '../components/lights.detail'; 

//-------------------------------------------------------------------
// MAIN COMPONENT
//-------------------------------------------------------------------
@Component({
    selector: 'app-lights',
    templateUrl: './lights.container.html',
    styleUrls: ['./lights.container.less'],
    providers: [LightsService],
    directives: [ButtonComponent, LightsList, LightsDetail],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LightsContainer {

    lights: Observable<Array<ILight>>;
    selectedLight: Observable<ILight>;

    columns = ['Name'];
    filterValues = ['Filter', 'By', 'A', 'Different', 'Value'];
    errorMessage: string;

    constructor(private lightsService: LightsService, private store: Store<AppStore>) {

    }

    ngOnInit() {
        //this.lights = this.lightsService.lights;
        //this.lightsService.getLights();
    }

    lightsClick(luminaireTypeId: number): void {
        alert('Opening luminaire type with luminaireTypeId: ' + luminaireTypeId);
    }

    selectItem(item: ILight) {
        this.store.dispatch({type: 'SELECT_ITEM', payload: item});
    }

    deleteItem(item: ILight) {
        this.lightsService.deleteLight(item);
    }
}
