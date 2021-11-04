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
    if (typeof props.parent === 'string') {
        props.parent = document.getElementById(props.parent);
    }

    if (!props.type || !props.parent) {
        console.log('createElement requires type and parent params!');
        return;
    }

    let ele = document.createElement(props.type);

    if (props.type === 'input') {
        if (props.inputProps.checked) {
            ele.checked = props.inputProps.checked;
        }
        const inputContainer = document.createElement('div');
        const label = document.createElement('label');
        label.setAttribute('for', props.id);
        label.innerHTML = props.inputProps.value;
        inputContainer.appendChild(label);
        props.parent.appendChild(inputContainer);
        props.parent = inputContainer;
    }

    if (id) {
        ele.setAttribute('id', `${props.id}`);
    }

    if (props.attrs) {
        for (let a = 0; a < props.attrs.length; a++) {
            ele.setAttribute(props.attrs[a].attr, props.attrs[a].value);
        }
    }

    if (props.innerHTML) {
        ele.innerHTML = props.innerHTML;
    }

    if (props.eventObject) {
        ele.addEventListener(props.eventObject.listener, e => {
            props.eventObject.func(e);
        });
    }

    parent.appendChild(ele);
};

export default createElement;
