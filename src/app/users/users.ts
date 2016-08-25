//barrel file for users



export { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Injectable } from '@angular/core';
export { Http, Headers, RequestOptions, Response } from '@angular/http';
export { Store } from '@ngrx/store';
export { IUser } from './users.interface';
export { AppStore } from '../app.store';
export { UsersService } from './users.service';
export { UsersReducer, SelectedUserReducer, UserErrorsReducer, LoadingUserReducer, ADD_USERS, UPDATE_USERS, DELETE_USER, CREATE_USERS, SELECT_USER, ADD_ERROR, REMOVE_ERROR, REQUEST_USER, RECEIVE_USER } from './users.reducer';
export { UsersList } from './components/users.list';
export { UsersDetail } from './components/users.details';
export { Observable } from 'rxjs/Observable';
