import autoBind from 'auto-bind';

class LinkPanelEvents {
    constructor() {
        autoBind(this);
    }
    input = {
        keyDown: (e, matchedNotes, updateListNotes) => {
            const matched = matchedNotes(e.target.value);
            const notes = matched.filter((match) => { if (match) return match.title })
            console.log(notes);
            updateListNotes(notes);
        }
    }
}

export default LinkPanelEvents;