import React from 'react';
import autoBind from 'auto-bind';

class KeyPointEvents extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    element = {
        placeholder: (e) => {
            const placeholder = document.createElement('span');
            placeholder.className = "placeholder";
            return placeholder;
        }
    }
    input = {
        focus: (e) => {
            const target = e.currentTarget;
            
            if (target.dataset.hasdata === 'false') {
                target.innerHTML = '';
                target.dataset.hasdata = 'true'
            }
            else if (!target.dataset.hasdata) target.dataset.hasdata = 'true'
            console.log(target.dataset.hasdata)
        },
        focusOut: (e, placeholder_text) => {
            const target = e.currentTarget;
            if (target.innerText === '') {
                const placeholder = this.element.placeholder();
                placeholder.innerText = placeholder_text;
                target.appendChild(placeholder);
                target.dataset.hasdata = 'false';
            }
        },
        change: (e, type, kp, events) => {
            e.preventDefault();
            // if (e.keyCode === 32) this.spaceParser(e) ;
            const target = e.currentTarget;
            kp[type] = target.innerText;
            this.input.checkLink(e, events)

        },
        checkLink: (e, events) => {
            if (e.keyCode === 32) return this.toggleLinkPanel(e, false, events.updateLinkPanel);
        
            if (e.keyCode === 51 && e.shiftKey) {
                return this.toggleLinkPanel(e, true, events.updateLinkPanel);
            }
            if(events.isLinkPanelActive())
                this.toggleLinkPanel(e, true, events.updateLinkPanel)
            

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

    spaceParser = (e) => {
        if(e.keyCode !== 32) return

        const target = e.currentTarget;
        const range = window.getSelection().getRangeAt(0);
        console.log(range.endOffset);
        // if first character is empty, do nothing.
        if (range.endOffset === 1) {
            return;
        }
        
        if(target.innerText[range.endOffset - 1].match(/\s/)) {
            const pre_html = target.innerHTML.slice(0, range.endOffset + 4)
            const post_html = target.innerHTML.slice(range.endOffset, );
            console.log(pre_html, post_html);
            // target.innerHTML = target.innerHTML.slice(0, range.endOffset + 4) + '&nbps;';
        }
        // console.log('Range endOffset', range.endOffset);
        // const content_just_before = target.innerText[range.endOffset - 2];
        // console.log(content_just_before);
        // let range_endOffset = range.endOffset;
        // console.log(target.innerHTML[range_endOffset]);
        // let content_before;
        // if (content_just_before.match(/\s/)){
        //     range_endOffset += 4;
        // }
        // console.log(content_just_before);
        // content_before = target.innerHTML.slice(0, range.endOffset - 1);
        // target.innerHTML = content_before + '&nbsp';
        // // div.innerHTML = content_before;
        // // const space_node = document.createTextNode('&nbsp;')
        // // div.innerHTML += '&nbsp;';
        // console.log(target);
    }

    toggleLinkPanel = (e, bool, updateLinkPanel) => {
        const link_panel = document.querySelector('#link-panel');
        const coords = this.getPanelCoords(e.currentTarget);
        updateLinkPanel({
            panel: {
                active: bool,
                styles: {
                    top: bool ? coords.y : 'unset',
                    left: bool ? coords.x : 'unset',
                    display: bool ? 'block' : 'none'
                }
            }
        });

        const selection = getSelection();
        const range = selection.getRangeAt(0);
        const dup_range = range.cloneRange();
        dup_range.selectNodeContents(e.currentTarget);
        dup_range.setStart(range.endContainer, range.endOffset);
        dup_range.setEnd(range.endContainer, range.endOffset);
        selection.removeAllRanges();
        selection.addRange(dup_range);
        
    }
    getPanelCoords = (element) => {
        // gets the range (position) of the keydown
        const range = window.getSelection().getRangeAt(0);
        // creates a dupicate range to get the elements
        // before the keydown
        const dup_range = range.cloneRange();
        dup_range.selectNodeContents(element)
        dup_range.setEnd(range.startContainer, range.startOffset);
        console.log(range.endOffset);
        // temporary div element
        const div = document.createElement('div');
        // adds text upto the keydown position
        
        div.innerText = dup_range.toString();
        // a temporary span to get the x,y co-ordinates
        // (important!)
        const span = document.createElement('span');
        span.id = "hash";
        div.appendChild(span);
        
        // appends the remaning content to the temp div
        const rest = element.innerText.slice(dup_range.endOffset, );
        // console.log(rest.length, '\n', rest);
        div.append(rest)
        
        // replaces targets html with temporary
        element.innerHTML = div.innerHTML;

        // gets the span's co-ordinates
        const hash = element.querySelector('#hash');
        const coord = {}
        coord['x'] = hash.getBoundingClientRect().left - 5;
        coord['y'] = hash.getBoundingClientRect().top + 5;
        
        // when the content of the target element is replaced
        // by the temporary div, the position is set to the start
        // of the target. 
        // creates a new range to return the cursor to
        // the original position during keydown.
        const new_range = new Range();
        new_range.selectNodeContents(element);
        new_range.setEnd(hash, 0);
        new_range.collapse(false);
        const selection = window.getSelection()
        selection.removeAllRanges();
        selection.addRange(new_range);
        
        // Finally, remove the temporary elements
        div.remove();
        hash.remove();

        return coord;
    }
}

export default KeyPointEvents;