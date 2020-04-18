
document.addEventListener('DOMContentLoaded', function () {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            engine.init(xmlhttp.response);
        }
    }
    xmlhttp.open('GET', 'http://localhost:5000/api/load', true);
    xmlhttp.send();

});

const engine = {
    database: {},
    init: function (data) {
        this.database = JSON.parse(data);
        // console.log(typeof(this.database))
        this.loadUIElems();
    },
    loadUIElems: function () {
        [this.database.notes[0]].forEach((note) => {
            console.log(this.html.note(note));
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
                        <img src="%PUBLIC_URL%/menu.svg" alt="menu">
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
        kp_block: function (id) {
            return (
                `<div class="kp-block" id=${id}>
                    <div class="kp-block-content">
                    <div class="kp-block-layer">
                        <div class="kp-keypoint">
                        <input class="inp-flat" type="text" placeholder="Keypoint">
                        </div>
                    </div>
                    <div class="kp-block-layer">
                        <div class="kp-desc">
                        <input class="inp-flat" type="text" placeholder="Description">
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
    event: {

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
    // const edited_note = {
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
    //     edited_note.data.push({
    //         id: id,
    //         keypoint: '',
    //         desc: ''
    //     });
    //     $('#kp-main').append(kp_block.html(id));
    //     console.log(edited_note);
    //     kpBlockInit();
    // };
    
    // function kpBlockInit() {
    //     const kp_block_list = document.querySelectorAll('.kp-block');
    //     kp_block_list.forEach((block) => {
    //         const kp_block_action_list = document.querySelectorAll('.kp-block-action');
    //         kp_block_action_list.forEach((ac_block) => {
    //             const remove = ac_block.querySelector('.remove button');
    //             remove.onclick =  function (e) {
    //                 const index = getNoteDataIndex(this);
    //                 edited_note.data.splice(index, 1);
    //                 getKPBlock(this).remove();
    //             };
    
    //             const copy = ac_block.querySelector('.copy button');
    //             copy.onclick = function (e) {
    //                 const clone = getKPBlock(this).cloneNode(true);
    //                 clone.id = nextKeypointID();
    //                 document.querySelector('#kp-main').appendChild(clone);
    //                 const block_data = JSON.parse(JSON.stringify(edited_note.data[getNoteDataIndex(this)]));
    //                 block_data.id = clone.id;
    //                 edited_note.data.push(block_data);
    //                 console.log(edited_note);
    //                 kp_block.init();
    //             };
    //         });
    
    //         const inp_keypoint = block.querySelector('.kp-keypoint input');
    //         inp_keypoint.onkeyup =  function (e) {
    //             const index = getNoteDataIndex(this);
    //             edited_note.data[index].keypoint = this.value;
    //             console.log(edited_note.data[index].keypoint);
    //         };
    
    //         const inp_desc = block.querySelector('.kp-desc input');
    //         inp_desc.onkeyup =  function (e) {
    //             const index = getNoteDataIndex(this);
    //             edited_note.data[index].desc = this.value;
    //             console.log(edited_note.data[index].desc);
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
    
    // function getNoteDataIndex(element) {
    //     const block_id = getKPBlockID(element);
    //     return edited_note.data.findIndex((kp) => kp.id === block_id);
    // }
    
    // function nextKeypointID() {
    //     return edited_note.id + '_kp_' + ++kp_id_seq; 
    // }
    
    // const save = document.querySelector('#save');
    // save.addEventListener('click', function (e) {
    //     console.log(edited_note);
    // });