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
import { MdToolbarModule } from '@angular2-material/toolbar/toolbar';

import { ButtonComponent } from './button/button.component';
import { ButtonAddComponent } from './buttonAdd/buttonAdd.component';
import { MapComponent } from './map/map.component';
import { ToggleComponent } from './toggle/toggle.component';
import { LoadingListComponent } from './loading-list/loading-list.component';
import { Config, ConfigService } from './config/config';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MdButtonModule,
        MdIconModule,
        MdListModule,
        MdToolbarModule
    ],
    declarations: [
        ButtonComponent,
        ButtonAddComponent,
        MapComponent,
        ToggleComponent,
        LoadingListComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        MdButtonModule,
        MdCardModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdToolbarModule,
        ButtonComponent,
        ButtonAddComponent,
        MapComponent,
        ToggleComponent,
        LoadingListComponent,
        ConfigService,
        Config
    ]
})
export class SharedModule {}