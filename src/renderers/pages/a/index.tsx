/** @format */
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Counter from '../../containers/views/Counter/Counter';
import { BrowserRouter } from "react-router-dom";


const renderer = (): void => {
    ReactDOM.render(
      <Provider>
        <BrowserRouter>
                <Counter />
        </BrowserRouter>
      </Provider>,
        document.querySelector('#app'),
    );
};

configure({
    enforceActions: 'observed',
});

renderer();
