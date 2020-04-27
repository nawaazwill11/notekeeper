import autoBind from 'auto-bind';

class AppEvents {
    constructor() {
        autoBind(this);
    }
    toggled(mode) {
        document.body.style.overflowY = mode === 'edit' ? 'hidden' : 'auto';
    }
}
export default AppEvents;