//barrel file for users



export { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Injectable } from '@angular/core';
export { Http, Headers, RequestOptions, Response } from '@angular/http';
export { Store } from '@ngrx/store';
export { IUser } from './users.interface';
export { AppStore } from '../app.store';
export { UsersService } from './users.service';
export { UsersReducer, SelectedUserReducer, ADD_USERS, DELETE_USER, CREATE_USER, SELECT_USER } from './users.reducer';
export { UsersList } from './components/users.list';
export { UsersDetail } from './components/users.details';
export { ButtonComponent } from '../shared/button/button.component';
export { ButtonAddComponent } from '../shared/buttonAdd/buttonAdd.component'; 
export { Observable } from 'rxjs/Observable';
