"use strict";

class Helper {
    ajax = {
        get: function (method, url, async) {
            
        }
    }
    parseData(data) {
        data = JSON.parse(data)
        if (typeof(data) !== 'object') return false;
        return data;
    }
    getKPBlock(element) {
        return element.closest('.kp-block');
    }
    getKPBlockID(element) {
        return this.helper.getKPBlock(element).id;
    }
    getKPDataIndex (element) {
        const block_id = this.helper.getKPBlockID.bind(this)(element);
        return this.edited_note.data.findIndex((kp) => kp.id === block_id);
    }
    nextKeypointID(kp_id_seq) {
        return this.edited_note.id + '_kp_' + ++kp_id_seq; 
    }
    getNoteData(note_element) {
        console.log(note_element)
        const note_id = note_element.id;
        return this.database.notes.find((note) => note.id === note_id);
    }
    getCurrentKPBlockIDSeq() {
        return this.edited_note.data.length;
    }
}
/**
 * Stores the database
 * Containts the html of components
 * Add event listeners to components
 * SOC can kiss my kassh[1:-1]
 */

 
class Engine {
    constructor() {
        this.helper = new Helper();
        // this.events.note = this.events.note.bind(this);
    }
    loadData() {
        const response = this.helper.ajax('GET', 'http://localhost:5000/api/load');
        response
            .then((data) => {
                data = this.helper.parseData(data);
                if (data) return this.init(data);
                $('body').html(`<h1>${new Error('500 - Server error occured')}</h1>`);
            })
            .catch(() => {
                $('body').html(`<h1>${new Error('500 - Server error occured')}</h1>`);
            })
    }
    init(data) {
        this.database = data;
        this.loadUIElems();
        this.events.note.apply(this);
    }
    loadUIElems() {
        this.database.notes.forEach((note) => {
            $('#notes-content').append(this.html.note(note))
        });
    }
    loadEditor (note_element) {
        this.edited_note = this.helper.getNoteData.bind(this)(note_element);
        console.log(this.edited_note);
        let kp_blocks = this.edited_note.data.map((kp) => {
            console.log(kp);
            return this.html.kp_block(kp);
        });
        $('#container').append(this.html.editor({
            ...this.edited_note,
            kp_blocks: kp_blocks.join('\n')
        }));
        this.events.editor.apply(this);
        this.events.kp_block.bind(this)();
    }
    html = {
        note: function (note) {
            let keypoints = [];
            note.data.forEach((kp) => {
                keypoints.push( `<div class="keypoint">${kp.keypoint}</div>`)
            });
            return (`
                <div class="note" data-mode="view" id=${note.id}>
                    <div class="note-menu">
                        <div class="note-menu-img">
                            <img src="menu.svg" alt="menu">
                        </div>
                        <div class="note-menu-list-container">
                            <ul class="note-menu-list">
                                <li class="note-menu-item">Edit</li>
                                <li class="note-menu-item">Delete</li>
                                <li class="note-menu-item">Archive</li>
                            </ul>
                        </div>
                    </div>
                    <div class="note-content">
                        <div class="note-title">
                        <b>${note.title}</b>
                        </div>
                        <div class="note-main">
                            ${keypoints.join('\n')}
                        </div>
                    </div>

                </div>`
            );
        },
        editor: function (note) {
            return (
                `<div id="editor-container">
                    <div id="editor-panel">
                        <div id="editor-content">
                            <div id="editor-close">
                                <button>x</button>
                            </div>
                            <div id="note-title">
                                <input type="text" placeholder="Title" value="${note.title}">
                            </div>
                            <div id="note-main-container">
                                <div id="note-main">
                                    <div id="kp-container">
                                        <div id="kp-main">
                                            ${note.kp_blocks}
                                        </div>
                                    </div>
                                    <div id="kp-adder">
                                        <button>Add keypoint</button>
                                    </div>
                                </div>
                            </div>
                            <div id="editor-controls-container">
                                <div id="editor-controls-content">
                                    <div id="editor-controls">
                                        <div class="editor-control-node">
                                            <button id="save">Save</button>
                                        </div>
                                        <div class="editor-control-node">
                                            <button id="discard">Discard</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            )
        },
        kp_block: function (kp_data) {
            console.log(kp_data.keypoint);
            return (
                `<div class="kp-block" id=${kp_data.id}>
                    <div class="kp-block-content">
                        <div class="kp-block-layer">
                            <div class="kp-keypoint">
                                <input class="inp-flat" type="text" placeholder="Keypoint" value="${kp_data.keypoint ? kp_data.keypoint : ''}">
                            </div>
                        </div>
                        <div class="kp-block-layer">
                            <div class="kp-desc">
                                <input class="inp-flat" type="text" placeholder="Description" value="${kp_data.desc ? kp_data.desc : ''}">
                            </div>
                        </div>
                    </div>
                    <div class="kp-block-action-container">
                        <div class="kp-block-action">
                            <div class="action-node remove">
                                <button>-</button>
                            </div>
                            <div class="action-node copy">
                                <button>C</button>
                            </div>
                        </div>
                    </div>
                </div>`
            );
        }
    }
    
    events = {
        note: function () {
            const notes = document.querySelectorAll('.note');
            notes.forEach((note) => {
                note.addEventListener('click', (e) => {
                    // console.log('clicked', this);
                    this.loadEditor.bind(this)(e.currentTarget);
                });

                const menu = note.querySelector('.note-menu');
                const menu_options = menu.querySelector('.note-menu-list-container');
                const menu_items = menu.querySelectorAll('.note-menu-item');

                const menu_item_action = {
                    'edit': function(e) {
                        editNote(e)
                    },
                    'delete': function() {
                        alert('delete');
                    },
                    'archive': function() {
                        alert('archive');
                    }
                }
                menu_items.forEach((item) => {
                    item.addEventListener('click', function (e) {
                        e.stopPropagation();
                        menu_item_action[item.innerHTML.toLowerCase()](e);
                        note.mouseleave();
                    })
                })
                note.addEventListener('mouseover', function (e) {
                    menu.classList.add('visible');
                });
                note.addEventListener('mouseleave', function (e) {
                    menu.classList.remove('visible');
                    menu_options.classList.remove('visible');
                });
                menu.addEventListener('click', function (e) {
                    e.stopPropagation();
                    menu_options.classList.add('visible');
                })
            });
        },
        editor: function () {
            const editor_closer = document.querySelector('#editor-close');
            editor_closer.onclick = function () {
                document.querySelector('#editor-container').remove();
            }

            const save = document.querySelector('#save');
            save.addEventListener('click', function (e) {
                console.log(this.edited_note);
            });
        },
        kp_block: function () {
            let kp_id_seq = this.helper.getCurrentKPBlockIDSeq.bind(this)();
            
            const kpBlockInit = () => {
                const kp_block_list = document.querySelectorAll('.kp-block');
                kp_block_list.forEach((block) => {

                    const kp_block_action_list = document.querySelectorAll('.kp-block-action');
                    kp_block_action_list.forEach((ac_block) => {

                        const remove = ac_block.querySelector('.remove button');
                        remove.onclick =  (e) => {
                            const index = this.helper.getKPDataIndex.bind(this)(e.currentTarget);
                            this.edited_note.data.splice(index, 1);
                            this.helper.getKPBlock(e.target).remove();
                        };
            
                        const copy = ac_block.querySelector('.copy button');
                        copy.onclick = (e) => {

                            const clone = this.helper.getKPBlock(e.target).cloneNode(true);
                            clone.id = this.helper.nextKeypointID.bind(this)(kp_id_seq);

                            document.querySelector('#kp-main').appendChild(clone);

                            const block_data = JSON.parse(
                                JSON.stringify(
                                    this.edited_note.data[
                                        this.helper.getKPDataIndex.bind(this)(e.target)
                                    ]
                                )
                            );

                            block_data.id = clone.id;
                            this.edited_note.data.push(block_data);
                            console.log(this.edited_note);
                            this.events.kp_block.bind(this)();
                        };
                    });
            
                    const inp_keypoint = block.querySelector('.kp-keypoint input');
                    inp_keypoint.onkeyup = (e) => {
                        const index = this.helper.getKPDataIndex.bind(this)(e.target);
                        this.edited_note.data[index].keypoint = e.target.value;
                        console.log(this.edited_note.data[index].keypoint);
                    };
            
                    const inp_desc = block.querySelector('.kp-desc input');
                    inp_desc.onkeyup = (e) => {
                        const index = this.helper.getKPDataIndex.bind(this)(e.target);
                        this.edited_note.data[index].desc = e.target.value;
                        console.log(this.edited_note.data[index].desc);
                    };
                });
            
                console.log('All elements initialized');
            };

            const kp_adder = document.querySelector('#kp-adder button');
            kp_adder.onclick = (e) => {
                const id = this.helper.nextKeypointID.bind(this)(kp_id_seq);
                this.edited_note.data.push({
                    id: id,
                    keypoint: '',
                    desc: ''
                });

                $('#kp-main').append(this.html.kp_block({id: id}));
                console.log(this.edited_note, 'enote');
                kpBlockInit.bind(this)();
            };

            kpBlockInit.bind(this)();
        }
    }
}

const app = new Engine();

document.addEventListener('DOMContentLoaded', function () {
    app.loadData();
});

const engine = {
    database: {},
    init: function (data) {
        this.database = JSON.parse(data);
        // console.log(typeof(this.database))
        
        this.events.note.bind(this)();
    },
    construct: function () {
        this.helper = this.helper.bind(this)
    },
    loadUIElems: function () {
        this.database.notes.forEach((note) => {
            $('#notes-content').append(this.html.note(note))
        });
    },
    html: {
        note: function (note) {
            let keypoints = [];
            note.data.forEach((kp) => {
                keypoints.push( `<div class="keypoint">${kp.keypoint}</div>`)
            });
            return (`<div class="note" data-mode="view" id=${note.id}>
                <div class="note-menu">
                    <div class="note-menu-img">
                        <img src="menu.svg" alt="menu">
                    </div>
                    <div class="note-menu-list-container">
                        <ul class="note-menu-list">
                            <li class="note-menu-item">Edit</li>
                            <li class="note-menu-item">Delete</li>
                            <li class="note-menu-item">Archive</li>
                        </ul>
                    </div>
                </div>
                <div class="note-content">
                    <div class="note-title">
                    <b>${note.title}</b>
                    </div>
                    <div class="note-main">
                        ${keypoints.join('\n')}
                    </div>
                </div>

            </div>`);
        },
        editor: function (note) {
            return (
                `<div id="editor-container">
                    <div id="editor-panel">
                        <div id="editor-content">
                            <div id="editor-close">
                                <button>x</button>
                            </div>
                            <div id="note-title">
                                <input type="text" placeholder="Title" value="${note.title}">
                            </div>
                            <div id="note-main-container">
                                <div id="note-main">
                                    <div id="kp-container">
                                        <div id="kp-main">
                                            ${note.kp_blocks}
                                        </div>
                                    </div>
                                    <div id="kp-adder">
                                        <button>Add keypoint</button>
                                    </div>
                                </div>
                            </div>
                            <div id="editor-controls-container">
                                <div id="editor-controls-content">
                                    <div id="editor-controls">
                                        <div class="editor-control-node">
                                            <button id="save">Save</button>
                                        </div>
                                        <div class="editor-control-node">
                                            <button id="discard">Discard</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            )
        },
        kp_block: function (kp_data) {
            console.log(kp_data.keypoint);
            return (
                `<div class="kp-block" id=${kp_data.id}>
                    <div class="kp-block-content">
                        <div class="kp-block-layer">
                            <div class="kp-keypoint">
                                <input class="inp-flat" type="text" placeholder="Keypoint" value="${kp_data.keypoint ? kp_data.keypoint : ''}">
                            </div>
                        </div>
                        <div class="kp-block-layer">
                            <div class="kp-desc">
                                <input class="inp-flat" type="text" placeholder="Description" value="${kp_data.desc ? kp_data.desc : ''}">
                            </div>
                        </div>
                    </div>
                    <div class="kp-block-action-container">
                        <div class="kp-block-action">
                            <div class="action-node remove">
                                <button>-</button>
                            </div>
                            <div class="action-node copy">
                                <button>C</button>
                            </div>
                        </div>
                    </div>
                </div>`
            );
        }
    },
    loadEditor: function (note_element) {
        this.edited_note = this.helper.getNoteData.bind(this)(note_element);
        console.log(this.edited_note);
        let kp_blocks = this.edited_note.data.map((kp) => {
            console.log(kp);
            return this.html.kp_block(kp);
        });
        $('#container').append(this.html.editor({
            ...this.edited_note,
            kp_blocks: kp_blocks.join('\n')
        }));
        this.events.editor.bind(this)();
        this.events.kp_block.bind(this)();
    },
    events: {
        note: function () {
            const notes = document.querySelectorAll('.note');
            notes.forEach((note) => {
                note.addEventListener('click', (e) => {
                    // console.log('clicked', this);
                    this.loadEditor.bind(this)(e.currentTarget);
                });

                const menu = note.querySelector('.note-menu');
                const menu_options = menu.querySelector('.note-menu-list-container');
                const menu_items = menu.querySelectorAll('.note-menu-item');

                const menu_item_action = {
                    'edit': function(e) {
                        editNote(e)
                    },
                    'delete': function() {
                        alert('delete');
                    },
                    'archive': function() {
                        alert('archive');
                    }
                }
                menu_items.forEach((item) => {
                    item.addEventListener('click', function (e) {
                        e.stopPropagation();
                        menu_item_action[item.innerHTML.toLowerCase()](e);
                        note.mouseleave();
                    })
                })
                note.addEventListener('mouseover', function (e) {
                    menu.classList.add('visible');
                });
                note.addEventListener('mouseleave', function (e) {
                    menu.classList.remove('visible');
                    menu_options.classList.remove('visible');
                });
                menu.addEventListener('click', function (e) {
                    e.stopPropagation();
                    menu_options.classList.add('visible');
                })
            });
        },
        editor: function () {
            const editor_closer = document.querySelector('#editor-close');
            editor_closer.onclick = function () {
                document.querySelector('#editor-container').remove();
            }

            const save = document.querySelector('#save');
            save.addEventListener('click', function (e) {
                console.log(this.edited_note);
            });
        },
        kp_block: function () {
            let kp_id_seq = this.helper.getCurrentKPBlockIDSeq.bind(this)();
            
            const kpBlockInit = () => {
                const kp_block_list = document.querySelectorAll('.kp-block');
                kp_block_list.forEach((block) => {

                    const kp_block_action_list = document.querySelectorAll('.kp-block-action');
                    kp_block_action_list.forEach((ac_block) => {

                        const remove = ac_block.querySelector('.remove button');
                        remove.onclick =  (e) => {
                            const index = this.helper.getKPDataIndex.bind(this)(e.currentTarget);
                            this.edited_note.data.splice(index, 1);
                            this.helper.getKPBlock(e.target).remove();
                        };
            
                        const copy = ac_block.querySelector('.copy button');
                        copy.onclick = (e) => {

                            const clone = this.helper.getKPBlock(e.target).cloneNode(true);
                            clone.id = this.helper.nextKeypointID.bind(this)(kp_id_seq);

                            document.querySelector('#kp-main').appendChild(clone);

                            const block_data = JSON.parse(
                                JSON.stringify(
                                    this.edited_note.data[
                                        this.helper.getKPDataIndex.bind(this)(e.target)
                                    ]
                                )
                            );

                            block_data.id = clone.id;
                            this.edited_note.data.push(block_data);
                            console.log(this.edited_note);
                            this.events.kp_block.bind(this)();
                        };
                    });
            
                    const inp_keypoint = block.querySelector('.kp-keypoint input');
                    inp_keypoint.onkeyup = (e) => {
                        const index = this.helper.getKPDataIndex.bind(this)(e.target);
                        this.edited_note.data[index].keypoint = e.target.value;
                        console.log(this.edited_note.data[index].keypoint);
                    };
            
                    const inp_desc = block.querySelector('.kp-desc input');
                    inp_desc.onkeyup = (e) => {
                        const index = this.helper.getKPDataIndex.bind(this)(e.target);
                        this.edited_note.data[index].desc = e.target.value;
                        console.log(this.edited_note.data[index].desc);
                    };
                });
            
                console.log('All elements initialized');
            };

            const kp_adder = document.querySelector('#kp-adder button');
            kp_adder.onclick = (e) => {
                const id = this.helper.nextKeypointID.bind(this)(kp_id_seq);
                this.edited_note.data.push({
                    id: id,
                    keypoint: '',
                    desc: ''
                });

                $('#kp-main').append(this.html.kp_block({id: id}));
                console.log(this.edited_note, 'enote');
                kpBlockInit.bind(this)();
            };

            kpBlockInit.bind(this)();
        }
    },
    helper: {
        getKPBlock: function (element) {
            return element.closest('.kp-block');
        },
        getKPBlockID: function (element) {
            return this.helper.getKPBlock(element).id;
        },
        getKPDataIndex: function (element) {
            const block_id = this.helper.getKPBlockID.bind(this)(element);
            return this.edited_note.data.findIndex((kp) => kp.id === block_id);
        },
        nextKeypointID: function (kp_id_seq) {
            return this.edited_note.id + '_kp_' + ++kp_id_seq; 
        },
        getNoteData: function (note_element) {
            console.log(note_element)
            const note_id = note_element.id;
            return this.database.notes.find((note) => note.id === note_id);
        },
        getCurrentKPBlockIDSeq: function () {
            return this.edited_note.data.length;
        }
    }
}

    // const notes = document.querySelectorAll('.note');
    // notes.forEach((note) => {
    //     note.addEventListener('click', function (e) {
    //         this.dataset.mode = this.dataset.mode == 'view' ? 'edit' : 'view';
    //         if (this.dataset.mode === 'edit') {
    //             this.classList.add('active');
    //         }
    //         else {
    //             this.classList.remove('active');
    //         }
    
    //     });
    //     const menu = note.querySelector('.note-menu');
    //     const menu_options = menu.querySelector('.note-menu-list-container');
    //     const menu_items = menu.querySelectorAll('.note-menu-item');
    //     console.log('mi', menu_items)
    //     const menu_item_action = {
    //         'edit': function(e) {
    //             editNote(e)
    //         },
    //         'delete': function() {
    //             alert('delete');
    //         },
    //         'archive': function() {
    //             alert('archive');
    //         }
    //     }
    //     menu_items.forEach((item) => {
    //         item.addEventListener('click', function (e) {
    //             e.stopPropagation();
    //             menu_item_action[item.innerHTML.toLowerCase()](e);
    //             note.mouseleave();
    //         })
    //     })
    //     note.addEventListener('mouseover', function (e) {
    //         menu.classList.add('visible');
    //     });
    //     note.addEventListener('mouseleave', function (e) {
    //         menu.classList.remove('visible');
    //         menu_options.classList.remove('visible');
    //     });
    //     menu.addEventListener('click', function (e) {
    //         e.stopPropagation();
    //         menu_options.classList.add('visible');
    //     })
    // });
    // const this.edited_note = {
    //     id: 1,
    //     title: '',
    //     data: []
    // };
    
    // const editor_closer = document.querySelector('#editor-close');
    // editor_closer.onclick = function (e) {
    //     document.querySelector('#editor-container')
    //     .style.display = 'none';
    // }
    
    // const kp_block = {
    //     html: function (id) {
    
        // return (`<div class="kp-block" id=${id}>
        //     <div class="kp-block-content">
        //     <div class="kp-block-layer">
        //         <div class="kp-keypoint">
        //         <input class="inp-flat" type="text" placeholder="Keypoint">
        //         </div>
        //     </div>
        //     <div class="kp-block-layer">
        //         <div class="kp-desc">
        //         <input class="inp-flat" type="text" placeholder="Description">
        //         </div>
        //     </div>
        //     </div>
        //     <div class="kp-block-action-container">
        //     <div class="kp-block-action">
        //         <div class="action-node remove">
        //         <button>-</button>
        //         </div>
        //         <div class="action-node copy">
        //         <button>C</button>
        //         </div>
        //     </div>
        //     </div>
        // </div>`)
        // },
    //   init: kpBlockInit
    // }
    
    // let kp_id_seq = 0;
    
    // const kp_adder = document.querySelector('#kp-adder button');
    // kp_adder.onclick = function(e) {
    //     const id = nextKeypointID();
    //     this.edited_note.data.push({
    //         id: id,
    //         keypoint: '',
    //         desc: ''
    //     });
    //     $('#kp-main').append(kp_block.html(id));
    //     console.log(this.edited_note);
    //     kpBlockInit();
    // };
    
    // function kpBlockInit() {
    //     const kp_block_list = document.querySelectorAll('.kp-block');
    //     kp_block_list.forEach((block) => {
    //         const kp_block_action_list = document.querySelectorAll('.kp-block-action');
    //         kp_block_action_list.forEach((ac_block) => {
    //             const remove = ac_block.querySelector('.remove button');
    //             remove.onclick =  function (e) {
    //                 const index = getKPDataIndex(this);
    //                 this.edited_note.data.splice(index, 1);
    //                 getKPBlock(this).remove();
    //             };
    
    //             const copy = ac_block.querySelector('.copy button');
    //             copy.onclick = function (e) {
    //                 const clone = getKPBlock(this).cloneNode(true);
    //                 clone.id = nextKeypointID();
    //                 document.querySelector('#kp-main').appendChild(clone);
    //                 const block_data = JSON.parse(JSON.stringify(this.edited_note.data[getKPDataIndex(this)]));
    //                 block_data.id = clone.id;
    //                 this.edited_note.data.push(block_data);
    //                 console.log(this.edited_note);
    //                 kp_block.init();
    //             };
    //         });
    
    //         const inp_keypoint = block.querySelector('.kp-keypoint input');
    //         inp_keypoint.onkeyup =  function (e) {
    //             const index = getKPDataIndex(this);
    //             this.edited_note.data[index].keypoint = this.value;
    //             console.log(this.edited_note.data[index].keypoint);
    //         };
    
    //         const inp_desc = block.querySelector('.kp-desc input');
    //         inp_desc.onkeyup =  function (e) {
    //             const index = getKPDataIndex(this);
    //             this.edited_note.data[index].desc = this.value;
    //             console.log(this.edited_note.data[index].desc);
    //         };
    //     });
    
    //     console.log('All elements initialized');
    
    // }
    
    // function getKPBlockID(element) {
    //     return getKPBlock(element).id;
    // }
    
    // function getKPBlock(element) {
    //     return element.closest('.kp-block');
    // }
    
    // function getKPDataIndex(element) {
    //     const block_id = getKPBlockID(element);
    //     return this.edited_note.data.findIndex((kp) => kp.id === block_id);
    // }
    
    // function nextKeypointID() {
    //     return this.edited_note.id + '_kp_' + ++kp_id_seq; 
    // }
    
    // const save = document.querySelector('#save');
    // save.addEventListener('click', function (e) {
    //     console.log(this.edited_note);
    // });