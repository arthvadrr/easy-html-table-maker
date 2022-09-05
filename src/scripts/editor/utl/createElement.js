const createElement = (props = { ...props }) => {
  let { type, id, parent, innerHTML, inputProps, eventObject, attrs } = props;

  let inputContainer;

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

    if (inputProps.value) {
      ele.setAttribute('value', inputProps.value);
    }

    if (inputProps.container) {
      inputContainer = document.createElement(inputProps.container);
      if (inputProps.containerClass) {
        inputContainer.classList.add(inputProps.containerClass);
      }
    } else {
      inputContainer = document.createElement('div');
      inputContainer.classList.add(`${props.id}-container`);
    }

    if (inputProps.name) {
      ele.setAttribute('name', inputProps.name);
    }

    if ((inputProps.label && inputProps.for) || (inputProps.labelIcon && inputProps.for)) {
      const label = document.createElement('label');
      label.setAttribute('for', inputProps.for);

      if (inputProps.label) {
        label.innerText = inputProps.label;
      }
      inputContainer.appendChild(label);
      parent.appendChild(inputContainer);
      parent = inputContainer;

      if (inputProps.labelIcon) {
        const labelIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        labelIcon.classList.add('label-icon');
        labelIcon.setAttribute('focusable', 'false');
        labelIcon.innerHTML = `<use href="#${inputProps.labelIcon}"></use>`;

        label.appendChild(labelIcon);
      }

      if (inputProps.labelClass) {
        console.log(inputProps.labelClass);
        label.classList.add(inputProps.labelClass);
      }
    }

    if (inputProps.min) {
      ele.setAttribute('min', inputProps.min);
    }

    if (inputProps.max) {
      ele.setAttribute('max', inputProps.max);
    }

    if (inputProps.step) {
      ele.setAttribute('step', inputProps.step);
    }
  }

  if (id) {
    ele.setAttribute('id', `${id}`);
  }

  if (attrs) {
    for (let a = 0; a < attrs.length; a++) {
      ele.setAttribute(attrs[a].attr, attrs[a].value);

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
