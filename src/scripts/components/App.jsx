import React from 'react/addons';

export default React.createClass({
    displayName: 'App',
    render: function () {
        return (
            <div className="app">
                <h1>Webpack + React = Awesome</h1>
                <a className="webpack-logo" href="http://webpack.github.io/"></a>
            </div>
        );
    }
});
