/** @format */

import * as React from 'react';
import { Button, Input } from 'antd';
import * as styles from '@renderers/views/a/index.less';

export class Test extends React.Component {
    public render(): React.ReactNode {
        return (
            <div>
                <Button onClick={this.handleClick} type="primary">
                    Primary
                </Button>
                <div className={styles.test}>test</div>
                <Input placeholder="Basic usage" />
            </div>
        );
    }

    private handleClick = (): void => {
        //   d
    };
}
