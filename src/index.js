import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Favicon from 'react-favicon';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<div>
    <Favicon url="https://previews.123rf.com/images/sudowoodo/sudowoodo1708/sudowoodo170800043/84663563-boxing-gloves-fight-icon-red-vs-blue-battle-emblem-cartoon-vector-illustration-.jpg" />
<App />
</div>, document.getElementById('root'));
registerServiceWorker();
