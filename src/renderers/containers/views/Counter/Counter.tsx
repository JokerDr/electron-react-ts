import * as React from 'react';
import {observer} from 'mobx-react';
import {
    Button
} from 'antd';
import {ComponentExt} from '@constants/temp/ComponentExt'
import {CounterModel} from './CounterModel';

// interface IProps {
//     globalStore: IGlobalStore.GlobalStore
// }


// @inject('globalStore')
@observer
export default class Counter extends ComponentExt<CounterModel> {
    // static defaultProps = {globalStore:{}}
    constructor(p:any, m: CounterModel){
        super(p, m);
        // console.log(m);
    }

    handleIncrease = async (): Promise<void>=> {
        this.model.change();
        // this.props.globalStore.increase();
    }


    render(){
        console.log(this.model)
        return (
            <div>
                <div>{

                }</div>
                <Button onClick={this.handleIncrease}>
                    add
                </Button>
                <Button>
                    del
                </Button>
            </div>
        );
    }
}