const createElement = (type, parent, id, className, isEditable, innerHTML, eventObject) => {
    if (typeof parent === 'string') {
        parent = document.getElementById(parent);
    }

    if (!type || !parent) {
        console.log('createElement requires type and parent params!');
        return;
    }

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
};

export default createElement;
