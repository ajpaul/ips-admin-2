/**
 * Created by sxd15 on 8/10/2016.
 */
import { ILight } from './lights';
import { ISite } from './sites-all';
import { IUser } from './users';
import { Loading } from './shared/loading-list';

export interface AppStore {
    lights: ILight[];
    sites : ISite[];
    users : IUser[];
    selectedUser : IUser;
    selectedOrg : number;
    userErrors : string[];
    loadingUser: Loading;
    deletingUser : Loading;
}