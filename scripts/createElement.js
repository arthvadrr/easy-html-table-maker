import StateMachine from '../state-machine/StateMachine';
import createEditorTable from './createEditorTable';

const createElement = (amount, type, parent, id, className, isEditable, innerHTML, eventObject) => {
    if (typeof parent === 'string') {
        parent = document.getElementById(parent);
    }

    if (!amount) {
        console.log('createElement requires an amount parameter!');
        return;
    }

    if (!type) {
        console.log('createElement requires a type parameter!');
        return;
    }

    if (!parent) {
        console.log('createElement requires a parent parameter!');
        return;
    }

    for (let i = 0; i < amount; i++) {
        let ele = document.createElement(type);
        if (id) {
            ele.setAttribute('id', `${id}`);
        }
        if (className) {
            ele.setAttribute('class', `${className}`);
        }
        if (isEditable) {
            ele.setAttribute('contenteditable', 'true');
        }
        if (innerHTML) {
            ele.innerHTML = innerHTML;
        }
        if (eventObject) {
            ele.addEventListener(eventObject.type, e => {
                eventObject.func(e);
            });
        }
        parent.appendChild(ele);
    }
};

export default createElement;
