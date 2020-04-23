import autoBind from 'auto-bind';

class EditorsEvents {
    constructor() {
        autoBind(this);
    }
    actions = {
        closeEditor: (e, note, toggleMode) => {
            // const target = e.currentTarget;
            toggleMode();
        },
        addNewBlock: (e, addBlock) => {
            addBlock();
        }
    }
}

export default EditorsEvents;