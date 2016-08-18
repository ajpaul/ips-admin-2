/**
 * Created by sxd15 on 8/10/2016.
 */
import { ILight } from './lights/lights';
import { ISite } from './sites-all/sites-all';
import { IUser } from './users/users';

export interface AppStore {
    lights: ILight[];
    sites : ISite[];
    users : IUser[];
    selectedUser : IUser;
}