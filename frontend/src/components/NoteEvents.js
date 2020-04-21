import autoBind from 'auto-bind';
import Editor from './Editor';

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
        },
        menuItem: function(el) {
            
        }
    }
    note = {
        onMouseEnter: (e) => {
            this.element.menu(e.currentTarget).classList.add('visible');
        },
        onMouseLeave: (e) => {
            this.element.menu(e.currentTarget).classList.remove('visible');
            this.element.menuOptions(e.currentTarget).classList.remove('visible');
        },
        onClick: (e, note) => {
            console.log(e.currentTarget, note);
        }
    }
    menu = {
        menu: {
            onClick: (e) => {
                e.stopPropagation();
                this.element.menuOptions(e.currentTarget).classList.add('visible');
            }
        },
        menuItem: {
            onClick: (e) => {
                // this.element.
                console.log();
            }
        }
    }

}

export default NoteEvents;