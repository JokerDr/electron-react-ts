import * as React from 'react';
import {
    Button
} from 'antd';


@log
export class Test extends React.PureComponent {
    render(){
        return (
            <div>
                <Button type="primary">Primary</Button>
            </div>
        )
    }
}

function log (target: any){
    console.log('装饰器')
}