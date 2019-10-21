/** @format */

import * as React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { ComponentExt } from '@constants/temp/ComponentExt';
import { CounterModel } from './CounterModel';

@observer
export default class Counter extends ComponentExt<CounterModel> {
    constructor(p: {}) {
        super(p, new CounterModel());
    }

    public handleIncrease = async (): Promise<void> => {
        await this.model.change();
    };

    public render(): React.ReactNode {
        const num: number = this.model.getTest();
        return (
            <div>
                <div>{num}</div>
                <Button onClick={this.handleIncrease}>add</Button>
                <Button>del</Button>
            </div>
        );
    }
}
