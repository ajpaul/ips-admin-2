import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card/card';
import { MdIconModule } from '@angular2-material/icon/icon';
import { MdInputModule } from '@angular2-material/input/input';
import { MdListModule  } from '@angular2-material/list/list';
import { MdToolbarModule } from '@angular2-material/toolbar/toolbar';

import { BreadcrumbComponent } from './breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from './button/button.component';
import { ButtonAddComponent } from './buttonAdd/buttonAdd.component';
import { ButtonSaveComponent } from './buttonSave/buttonSave.component';
import { Dropdown } from './dropdown/dropdown.component';
import { FilterComponent } from './filter/filter.component';
import { MapComponent } from './map/map.component';
import { SidebarComponent } from './sidebar/sidebar.component';


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
        BreadcrumbComponent,
        ButtonComponent,
        ButtonAddComponent,
        ButtonSaveComponent,
        Dropdown,
        FilterComponent,
        MapComponent,
        SidebarComponent
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
        BreadcrumbComponent,
        ButtonComponent,
        ButtonAddComponent,
        ButtonSaveComponent,
        Dropdown,
        FilterComponent,
        MapComponent,
        SidebarComponent
    ]
})
export class SharedModule {}