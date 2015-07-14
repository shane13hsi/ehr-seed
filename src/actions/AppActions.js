import alt from '../alt';

class AppActions {
    constructor() {
        this.generateActions();
    }

    reset() {
        this.dispatch();
    }
}

export default alt.createActions(AppActions);
