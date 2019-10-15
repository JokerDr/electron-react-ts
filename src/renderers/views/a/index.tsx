import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Test} from '@renderers/components/Test' 
import * as styles from './index.less';



const render = () => {
    ReactDOM.render(
        <Test />,
        document.querySelector('#app')
    )
}
render();