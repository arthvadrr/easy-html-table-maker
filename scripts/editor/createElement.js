const createElement = (
    type,
    parent,
    id,
    className,
    isEditable,
    innerHTML,
    eventObject,
    inputProps,
    rowspan,
    colspan,
    disabled
) => {
    if (typeof parent === 'string') {
        parent = document.getElementById(parent);
    }

    if (!type || !parent) {
        console.log('createElement requires type and parent params!');
        return;
    }

    let ele = document.createElement(type);

    if (type === 'input') {
        if (inputProps.type === 'checkbox') {
            ele.setAttribute('type', inputProps.type);
            ele.setAttribute('name', inputProps.name);
            ele.setAttribute('value', inputProps.value);
            ele.checked = inputProps.checked;
        }
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

    if (className) {
        ele.setAttribute('class', `${className}`);
    }

    if (isEditable) {
        ele.setAttribute('contenteditable', 'true');
    }

    if (rowspan) {
        ele.setAttribute('rowspan', rowspan);
    }
    if (colspan) {
        ele.setAttribute('colspan', colspan);
    }

    if (innerHTML) {
        ele.innerHTML = innerHTML;
    }

    if (eventObject) {
        ele.addEventListener(eventObject.type, e => {
            eventObject.func(e);
        });
    }

    if (disabled) {
        ele.setAttribute('disabled', 'true');
    }

    parent.appendChild(ele);
};

export default createElement;
