import * as React from 'react';
import { ComponentModel } from './ComponentModel';

interface IComponentExt {
    model: ComponentModel
    render(): React.ReactNode
}


   
/**
 * M : model
 * Q : queries
 * S : state
 */
export abstract class ComponentExt<
    M extends ComponentModel, 
    Q = {}, 
    S = {}
> extends React.Component<Q, S> implements IComponentExt {
    public model!: M;

    constructor(p: Q, m: M, s?: S,){
        super(p, s);
        this.model = m;
    }

    abstract render(): React.ReactNode;
}

