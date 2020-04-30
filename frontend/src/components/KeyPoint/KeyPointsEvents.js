import autoBind from 'auto-bind';

class KeyPointEvents {
    constructor() {
        autoBind(this);
    }
    input = {
        focus: (e) => {
            
            const target = e.currentTarget;
            if (target.dataset.typed === 'false') {
                target.innerHTML = '';
                target.dataset.typed = 'true'
            }
            console.log(target.dataset.typed)
        },
        focusOut: (e, placeholder_text) => {
            const target = e.currentTarget;
            if (target.innerText === '') {
                const placeholder = document.createElement('span');
                placeholder.className = "placeholder";
                placeholder.innerText = placeholder_text;
                target.appendChild(placeholder);
                target.dataset.typed = 'false';
            }
        },
        change: (e, type, events) => {
            const target = e.currentTarget;
            const data = {}
            data['id'] = target.dataset.block_id;
            data[type] = target.innerText;
            this.input.checkLink(e, events.toggleHash);
            events.updateKeyPoint(data);
        },
        checkLink: (e, toggleHash) => {
            if (e.keyCode === 16) return;

            if (e.keyCode === 51) {
                toggleHash(true);
            }
            else {
                toggleHash(false);
            }
            // if (e.keyCode !== 16) { // ignore shift
            //     const target = e.target;
                // const character = e.key;
                // const prev_character = target.value[target.selectionStart - 1];

                // const isSpace = () => {
                //     const start_from  = target.selectionStart;
                //     if ((start_from - 1) === 0 || target.value[(start_from - 2)] === ' ') return true;
                //     return false;
                // }
                
                // if ((character === '#' || prev_character === '#') && isSpace()) {
                //     return true;
                // }
               
            //     console.log(e.keyCode);

            //     const position = e.selectionStart;
            //     // const rev_value = target.value.split('').reverse().join('');
            //     // const space = rev.find()
            //     const segment = target.value.substring(0, position);

            //     const slice = target.value.slice(position, );
            //     const regx = new RegExp('#\S*$')
            //     if (slice.match(regx)) console.log('Linkesh');
            // }
        }
    }
    actions = {
        delete: (e, removeBlock) => {
            const target = e.currentTarget;
            removeBlock(target.dataset.block_id);
        },
        duplicate: (e, duplicateBlock) => {
            const target = e.currentTarget;
            const block = document.querySelector(`#${target.dataset.block_id}`);
            const keypoint = block.querySelector('.kp-keypoint input')
            const desc = block.querySelector('.kp-desc input')
            duplicateBlock({
                keypoint: keypoint.value,
                desc: desc.value
            })
        }
    }
}

export default KeyPointEvents;