import autoBind from 'auto-bind';

class KeyPointEvents {
    constructor() {
        autoBind(this);
    }
    input = {
        change: (e, type, updateKeyPoint) => {
            const target = e.currentTarget;
            const data = {}
            data['id'] = target.dataset.block_id;
            data[type] = target.value;
            console.log(data);
            updateKeyPoint(data);
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