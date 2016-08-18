// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import '@angular/forms';

//Material
import '@angular2-material/button';
import '@angular2-material/card';
import '@angular2-material/icon';
import '@angular2-material/input';
import '@angular2-material/list';
import '@angular2-material/toolbar';

// RxJS
// Statics
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/share';
import 'rxjs/operator/delay';
import 'rxjs/operator/do';
import 'rxjs/operator/filter';
import 'rxjs/operator/finally';
import 'rxjs/operator/multicast';
import 'rxjs/operator/share';

// NGRX
import '@ngrx/store';

// Leaflet
import 'leaflet';

if ('production' === ENV) {
  // Production
} else {
  // Development
  require('angular2-hmr');
}
