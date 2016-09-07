import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card/card';
import { MdCheckboxModule } from '@angular2-material/checkbox/checkbox';
import { MdIconModule } from '@angular2-material/icon/icon';
import { MdInputModule } from '@angular2-material/input/input';
import { MdListModule  } from '@angular2-material/list/list';

import { ButtonComponent } from './button/button.component';
import { ButtonAddComponent } from './buttonAdd/buttonAdd.component';
import { MapComponent } from './map/map.component';
import { ToggleComponent } from './toggle/toggle.component';
import { LoadingListComponent } from './loading-list/loading-list.component';
import { LoadingPanelComponent } from './loading-panel/loading-panel.component';
import { ConfigService } from './config/config';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MdButtonModule,
        MdIconModule,
        MdListModule
    ],
    declarations: [
        ButtonComponent,
        ButtonAddComponent,
        MapComponent,
        ToggleComponent,
        LoadingListComponent,
        LoadingPanelComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        MdButtonModule,
        MdCardModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        ButtonComponent,
        ButtonAddComponent,
        MapComponent,
        ToggleComponent,
        LoadingListComponent,
        LoadingPanelComponent
    ],
    providers: [
        ConfigService
    ]
})
export class SharedModule {}