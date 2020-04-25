import autoBind from 'auto-bind';

class EditorsEvents {
    constructor() {
        autoBind(this);
    }
    actions = {
        closeEditor: (e, note, toggleMode) => {
            console.log('Note at close', note);
            toggleMode(note);
        },
        addNewBlock: (e, addBlock) => {
            addBlock();
        }
    }
    title = {
        keyUp: (e, updateTitle) => {
            const target = e.currentTarget;
            console.log(target.value);
            updateTitle(target.value);
        }
    }
}

export default EditorsEvents;