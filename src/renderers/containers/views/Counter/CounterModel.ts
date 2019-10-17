import {ComponentModel} from '@constants/temp/ComponentModel';
import { observable, action} from 'mobx';

export class CounterModel extends ComponentModel {
    @observable private test: number = 0;
    constructor(){
        super();
    }
    
    @action
    public change(): void {
        this.test += 1;
    }

    public getTest(): number {
        return this.test;
    }

}