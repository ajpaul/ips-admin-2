import { Component, ChangeDetectionStrategy,
    Observable, Store, LightsList, LightsDetail,
    ILight, LightsService, ButtonComponent,
     AppStore} from '../lights';

//-------------------------------------------------------------------
// MAIN COMPONENT
//-------------------------------------------------------------------
@Component({
    selector: 'app-lights',
    template: require('./lights.container.html'),
    styles: [require('./lights.container.less')],
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
        this.lights = this.lightsService.lights;
        this.lightsService.getLights();
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
