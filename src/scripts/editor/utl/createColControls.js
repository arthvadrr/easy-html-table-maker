import createElement  from './createElement';
import { reload }     from '../createEditorTable';

const createColControls = (props) => {
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
		],
		eventObject : {
			listener : 'click',
			func     : (e) => {
				console.log(e.target);
				const styleID = (Date.now() + props.c).toString();
				console.log(styleID);
				let style = {
					id: styleID,
					selector: `tbody>tr>:nth-child(${props.c})`,
					style: 'text-align: left',
				}
				props.state.styles.push(style);
				reload(props.state, true);
			},
		},
	} );
}

export default createColControls;
