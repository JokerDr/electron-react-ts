import { observable } from "mobx";

export abstract class ComponentModel {
    @observable public Cmodel:any = {};
    constructor(){}
}