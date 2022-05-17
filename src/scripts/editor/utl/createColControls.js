import createElement  from './createElement';
import { reload }     from '../createEditorTable';

const createColControls = (props) => {
	let stylePosition;
	const styleExists = (() => {
		for (let s = 0; s < props.state.styles.length; s++) {
			if (props.state.styles[s].id === props.id) {
				stylePosition = s;
				return true;
			}
		}
		return false;
	})();

	createElement( {
		type        : 'button',
		id          : props.id,
		parent      : props.parent,
		innerHTML   : 'align text: Left',
		attrs       : [
			{
				attr  : 'classname',
				value : 'colcon_text-align',
			},
			{
				attr : 'data-style-exists',
				value : styleExists === true ? "true" : "false"
			}
		],
		eventObject : {
			listener : 'click',
			func     : (e) => {
				if (!styleExists) {
					let style = {
						id       : props.id,
						selector : `tbody>tr>:nth-child(${props.c})`,
						style    : 'text-align: left',
					}

					props.state.styles.push( style );
					console.log( props.state.styles );
				} else {
					props.state.styles.splice(stylePosition, 1);
				}
				reload( props.state, true );
			},
		},
	} );
}

export default createColControls;
