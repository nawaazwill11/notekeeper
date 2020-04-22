const events =  {
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
    