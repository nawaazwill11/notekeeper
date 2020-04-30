import autoBind from 'auto-bind';

class EditorsEvents {
    constructor() {
        autoBind(this);
    }
    actions = {
        addNewBlock: (e, addBlock) => {
            addBlock();
            // kp_block.querySelector('.kp-keypoint .inp-flat').focus();
        },
        save: (e, note, toggleMode) => {
            // console.log('Note at save', note);
            toggleMode('save', note);
        },
        close: (e, note, toggleMode) => {
            // console.log('Note changes discarded', note);
            toggleMode(null, note);
        },
        escape: (e) => {
            if (e.keyCode === 27) {
                e.target.closest('#editor-container').querySelector('.discard').click();
            }
        }
    }
    title = {
        keyUp: (e, updateTitle) => {
            const target = e.currentTarget;
            // console.log(target.value);
            updateTitle(target.value);
        }
    }
    kp_focus = (id) => {
        
        const kp_block = document.querySelector(`#${id}`);
        const keypoint = kp_block.querySelector('.inp-flat');
        keypoint.focus();
    }
}

export default EditorsEvents;