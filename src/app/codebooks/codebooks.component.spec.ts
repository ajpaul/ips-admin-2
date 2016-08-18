import {
    addProviders,
    inject
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { CodebooksComponent } from './codebooks.component';
import { ICodebooks, CodebooksService } from './codebooks';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/of';

class MockCodebooksService {
    codeBooksUrl: string = 'localhost:8080/codeBooks';

    getCodebooks(): Observable<ICodebooks[]> {
        return Observable.of(<ICodebooks[]>[
            {
                'codeBookId': 1,
                'codeBookName': 'Codebook 1',
                'codeWords': 'codez, codez, codez',
                'codeWordCount': 2,
                'symbolPattern': 'symbol patern',
                'lastUpdateBy': 'Adam'
            }
        ]);
    }

    addCodebook (codebook: ICodebooks): Observable<ICodebooks> {
        return Observable.of(codebook);
    }

    updateCodebook (codebook: ICodebooks): Observable<ICodebooks> {
        return Observable.of(codebook);
    }

    deleteCodebook (codebook: ICodebooks): Observable<ICodebooks> {
        return Observable.of(codebook);
    }
}

describe('APIKeysComponent::', () => {

    beforeEach(() => {
        addProviders([
            CodebooksComponent,
            provide(CodebooksService, {useClass: MockCodebooksService})
        ]);
    });

    describe('withProviders::', () => {
        var testComponent;
        beforeEach(inject([CodebooksComponent], (component:CodebooksComponent) => {
            testComponent = component;
        }));

        describe('instantiated', () => {
            var component;
            beforeEach(() => {
                component = testComponent;
                component.ngOnInit()
            });


            it('should instantiate by injection', () => {
                expect(component).toEqual(jasmine.any(CodebooksComponent));
            });

        });
    });
});