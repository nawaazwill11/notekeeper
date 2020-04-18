const notes = document.querySelectorAll('.note');
notes.forEach((note) => {
    note.addEventListener('click', function (e) {
        this.dataset.mode = this.dataset.mode == 'view' ? 'edit' : 'view';
        if (this.dataset.mode === 'edit') {
            this.classList.add('active');
        }
        else {
            this.classList.remove('active');
        }

    });
    const menu = note.querySelector('.note-menu');
    const menu_options = menu.querySelector('.note-menu-list-container');
    const menu_items = menu.querySelectorAll('.note-menu-item');
    console.log('mi', menu_items)
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

const editor_closer = document.querySelector('#editor-close');
editor_closer.onclick = function (e) {
    document.querySelector('#editor-container')
    .style.display = 'none';
}

const kp_block = {
    html: `<div class="kp-block">
    <div class="kp-block-content">
      <div class="kp-block-layer">
        <div class="kp-keypoint">
          <input class="inp-flat" type="text" placeholder="Keypoint">
        </div>
      </div>
      <div class="kp-block-layer">
        <div class="description">
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
  </div>`,
  init: kpBlockInit
}
const kp_adder = document.querySelector('#kp-adder button');
kp_adder.onclick = function(e) {
    $('#kp-main').append(kp_block.html);
    kpBlockInit();
};

function kpBlockInit() {
    const kp_block_list = document.querySelectorAll('.kp-block-action');
    kp_block_list.forEach((block) => {
        const remove = block.querySelector('.remove button');
        remove.onclick =  function (e) {
            this.closest('.kp-block').remove();
        };

        const copy = block.querySelector('.copy button');
        copy.onclick = function (e) {
            const clone = this.closest('.kp-block').cloneNode(true);
            document.querySelector('#kp-main').appendChild(clone);
            kp_block.init();
        }
    });
}