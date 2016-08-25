import { UsersReducer, SelectedUserReducer, LoadingUserReducer, UserErrorsReducer, IUser, ADD_USERS, DELETE_USER, CREATE_USERS, UPDATE_USERS } from './users';

describe('UsersReducer::', ()=> {
    var makeDummyUser = ({ userID=0, userName='' }: { userID?: number, userName?: string }): IUser => {
        return {
            userName: userName,
            email: '',
            userID,
            organization_ID: 0,
            tenant_ID: 0,
            givenName: 'Test GivenName',
            surname: 'Smith',
            active: true, 
        };
    }
    it('returns and empty array by default', ()=>{
        let defaultState = UsersReducer(undefined, {type: 'random', payload: {}});
        expect(defaultState).toEqual([]);
    });

    it('ADD_USERS adds the provided payload', ()=>{
        let dummyUsers: IUser[] = [
            makeDummyUser({ userID: 0 }),
            makeDummyUser({ userID: 1 }),
            makeDummyUser({ userID: 2 }),
        ];
        let addItem = UsersReducer(undefined, {type: ADD_USERS, payload: dummyUsers});
        expect(addItem).toEqual(dummyUsers);
    });

    it('DELETE_USER removes the provided payload', () => {
        let initialUsers: IUser[] = [
            makeDummyUser({ userID: 0 }),
            makeDummyUser({ userID: 1 }),
            makeDummyUser({ userID: 2 }),
        ];
        let removeItem = UsersReducer(initialUsers, { type: DELETE_USER, payload: makeDummyUser({ userID: 1 }) });
        expect(removeItem).not.toEqual(initialUsers);
        expect(removeItem).toEqual(initialUsers.filter((user: IUser) => user.userID !== 1));
    });

    it('CREATE_USERS appends users to the users list', () => { 
        let initialUsers: IUser[] = [
            makeDummyUser({ userID: 0 }),
            makeDummyUser({ userID: 1 }),
            makeDummyUser({ userID: 2 }),
        ];

        let usersToAdd: IUser[] = [
            makeDummyUser({ userID: 3 }),
            makeDummyUser({ userID: 4 }),
        ];

        let createUsersState = UsersReducer(initialUsers, { type: CREATE_USERS, payload: usersToAdd});
        expect(createUsersState).not.toEqual(initialUsers);
        expect(createUsersState).toEqual([...initialUsers, ...usersToAdd]);
    });


    it('UPDATE_USERS should update the user with the same id', () => {
        let initialUsers: IUser[] = [
            makeDummyUser({ userID: 0 }),
            makeDummyUser({ userID: 1, userName: 'InitialName1' }),
            makeDummyUser({ userID: 2, userName: 'InitialName2' }),
            makeDummyUser({ userID: 3 }),
        ];

        let usersToUpdate: IUser[] = [
            makeDummyUser({ userID: 1, userName: 'NewName1' }),
            makeDummyUser({ userID: 2, userName: 'NewName2' }),
        ];
        
        let updateUsersState = UsersReducer(initialUsers, { type: UPDATE_USERS, payload: usersToUpdate });
        let updatedUsersExpectation = [initialUsers[0], ...usersToUpdate, initialUsers[3]];
        updateUsersState.forEach((user, i) => {
            expect(user).toEqual(updatedUsersExpectation[i]);
        }); 
    });
});

describe('SelectedUserReducer::', ()=> {
    it('returns the payload', ()=>{
        let defaultState = SelectedUserReducer(undefined, {type: 'SELECT_USER', payload: {}});
        expect(defaultState).toEqual({});
    });
});

describe('LoadingUserReducer::', ()=> {
    it('returns false by default', ()=>{
        let defaultState = LoadingUserReducer(undefined, {type: 'random', payload: null });
        expect(defaultState).toEqual(false);
    });

    it('REQUEST_USER changes store to true', ()=>{
        let loadingItem = LoadingUserReducer(undefined, {type: 'REQUEST_USER', payload: null });
        expect(loadingItem).toEqual(true);
    });

    it('RECEIVE_USER changes store to false', ()=>{
        let loadingItem = LoadingUserReducer(undefined, {type: 'RECEIVE_USER', payload: null });
        expect(loadingItem).toEqual(false);
    });        
});

describe('UserErrorsReducer::', ()=> {
    it('returns empty array by default', ()=>{
        let defaultState = UserErrorsReducer(undefined, {type: 'random', payload: null });
        expect(defaultState).toEqual([]);
    });

    it('ADD_ERROR adds error to array', ()=>{
        let errorStore = UserErrorsReducer(undefined, {type: 'ADD_ERROR', payload: 'some error' });
        expect(errorStore).toEqual(['some error']);
    });

    it('REMOVE_ERROR removes error', ()=>{
        let errorStore = UserErrorsReducer(['some error'], {type: 'REMOVE_ERROR', payload: 0 });
        expect(errorStore).toEqual([]);
    });        
});

