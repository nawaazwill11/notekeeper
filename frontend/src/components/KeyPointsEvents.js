import autoBind from 'auto-bind';

class KeyPointEvents {
    constructor() {
        autoBind(this);
    }
    input = {
        onKeyUp: (e) => {
            const target = e.currentTarget;
            console.log(target.value);
        }
    }
}

export default KeyPointEvents;