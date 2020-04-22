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
            updateKeyPoint(data);
        }
    }
    actions = {
        delete: (e, removeBlock) => {
            const target = e.currentTarget;
            removeBlock(target.dataset.block_id);
        }
    }
}

export default KeyPointEvents;