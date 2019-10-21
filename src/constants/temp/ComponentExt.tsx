/** @format */

import * as React from 'react';
import { ComponentModel } from './ComponentModel';

interface IComponentExt {
    model: ComponentModel;
    render(): React.ReactNode;
}

/**
 * M : model
 * Q : queries
 * S : state
 */
export class ComponentExt<M extends ComponentModel, Q = {}, S = {}>
    extends React.Component<Q, S>
    implements IComponentExt {
    public model!: M;

    constructor(q: Q, m: M, s?: S) {
        super(q, s);
        this.model = m;
    }
}
