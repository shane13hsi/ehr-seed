import React from 'react/addons';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';

export default React.createClass({
    displayName: 'App',
    componentDidMount() {
        AppActions.reset();
    },
    render() {
        return (
            <div>
                <h1>Webpack + React = Awesome</h1>
            </div>
        );
    }
});
