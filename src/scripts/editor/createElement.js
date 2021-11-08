const createElement = (
    props = {
        type,
        id,
        parent,
        innerHTML,
        inputProps,
        eventObject,
        attrs,
    }
) => {
    let {type, id, parent, innerHTML, inputProps, eventObject, attrs} = props;

    //TODO bug somewhere causing returns with valid prop types
    if (!type || !parent) {
        return;
    }
    
    if (typeof parent === 'string') {
        parent = document.getElementById(parent);
    }

    let ele = document.createElement(type);

    if (type === 'input') {
        if (inputProps.checked) {
            ele.checked = inputProps.checked;
        }

        ele.type = inputProps.type;

        const inputContainer = document.createElement('div');
        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.innerHTML = inputProps.value;
        inputContainer.appendChild(label);
        parent.appendChild(inputContainer);
        parent = inputContainer;
    }

    if (id) {
        ele.setAttribute('id', `${id}`);
    }

    if (attrs) {
        for (let a = 0; a < attrs.length; a++) {
            ele.setAttribute(attrs[a].attr, attrs[a].value);

            // Hacky fix for disabled=false not being valid on HTML elements. What a pain in the ass!
            if (attrs[a].attr === 'disabled' && attrs[a].value === 'false') {
                ele.removeAttribute('disabled');
            }
        }
    }

    if (innerHTML) {
        ele.innerHTML = innerHTML;
    }

    if (eventObject) {
        ele.addEventListener(eventObject.listener, e => {
            eventObject.func(e);
        });
    }

    parent.appendChild(ele);
};

export default createElement;
