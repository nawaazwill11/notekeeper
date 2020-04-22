import autoBind from 'auto-bind';

class EditorsEvents {
    constructor() {
        autoBind(this);
    }
    close = {
        onClick: (e, toggleMode) => {
            const target = e.currentTarget;
            toggleMode();
        }
    }
}

export default EditorsEvents;