/** @format */

import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Counter from '../../containers/views/Counter/Counter';

const render = (): void => {
    ReactDOM.render(
        <Provider>
            <Counter />
        </Provider>,
        document.querySelector('#app'),
    );
};

configure({
    enforceActions: 'observed',
});
render();
