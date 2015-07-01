import App from 'components/App';
import React from 'react';
import { expect } from 'chai';
var TestUtils = React.addons.TestUtils;

describe('App', function() {
    it('should create a new instance of WebpackApp', function() {
        App.should.be.ok;
    });

    it('should emit the HTML output', function() {
        var shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(<App />);
        var component = shallowRenderer.getRenderOutput();
        expect(component.type).to.equal('div');
    })
});
