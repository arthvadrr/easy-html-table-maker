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
				value : '',
			},
		],
		eventObject : {
			listener : 'click',
			func     : () => {
				console.log(props.state);
				//reload( props.state, true );
			},
		},
	} );
}

export default createColControls;
