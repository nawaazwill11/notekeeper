import autoBind from 'auto-bind';

class NoteEvents {
    constructor() {
        autoBind(this);
    }
    element = {
        menu: function(el) {
            if (el.className === 'note') return el.querySelector('.note-menu');
            return el.closest('.note').querySelector('.note-menu');
        },
        menuOptions: function(el) {
            if (el.className === 'note') return el.querySelector('.note-menu-list-container');
            return el.closest('.note').querySelector('.note-menu-list-container');
        }
    }
    note = {
        onMouseEnter: (e) => {
            if (window.innerWidth > 766) {
                this.element.menu(e.currentTarget).classList.add('visible');
            }
        },
        onMouseLeave: (e) => {
            if (window.innerWidth > 766) {
                this.element.menu(e.currentTarget).classList.remove('visible');
            }
            this.element.menuOptions(e.currentTarget).classList.remove('visible');
        },
        onClick: (e, note, toggleMode) => {
            toggleMode(null, note);
        }
    }
    menu = {
        open: (e) => {
            e.stopPropagation();
            this.element.menuOptions(e.currentTarget).classList.add('visible');
        },
        edit: (e, note, toggleMode) => {
            toggleMode(null, note);
        },
        delete: (e, note, toggleMode) => {
            toggleMode('delete', note);
        }
    }

}

export default NoteEvents;