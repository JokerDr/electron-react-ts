import {observable, action} from 'mobx';

export class GlobalStore {
    @observable public num: number = 0;

    @action
    public increase = ():void => {
        this.num += 1;
    }

    @action
    public decrease = (): void => {
        this.num -= 1;
    }
    
}

export default new GlobalStore();