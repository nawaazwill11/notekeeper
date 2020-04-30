import autoBind from 'auto-bind';

class LinkPanelEvents {
    constructor() {
        autoBind(this);
    }
    input = {
        keyDown: (e, matchedNotes) => {
            console.log(matchedNotes(e.target.value))
        }
    }
}

export default LinkPanelEvents;