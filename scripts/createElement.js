const createElement = (amount, type, parent, id, className, isEditable, innerHTML, eventObject) => {
    if (typeof parent === 'string') {
        parent = document.getElementById(parent);
    }

    if (!amount || !type || !parent) {
        console.log('createElement requires amount, type, and parent params!');
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
