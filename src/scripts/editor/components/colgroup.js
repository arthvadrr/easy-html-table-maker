import { reload }    from '../createEditorTable';
import createElement from '../utl/createElement';

const colgroup = state => {
	if ( state.colgroup ) {
		createElement( {
			type   : 'colgroup',
			id     : 'editor-table-colgroup',
			parent : 'editor-table',
			attrs  : [
				{
					attr  : 'style',
					value : 'display: table-header-group; text-align:left;',
				},
			],
		} );

		createElement( {
			type   : 'tr',
			id     : 'editor-colgroup-tr',
			parent : 'editor-table',
			attrs  : [
				{
					attr  : 'style',
					value : 'display: table-header-group; text-align:left;',
				},
			],
		} );

		createElement( {
			type   : 'th',
			id     : 'editor-colgroup-header-th',
			parent : 'editor-colgroup-tr',
			attrs  : [
				{
					attr  : 'colspan',
					value : state.content[ 0 ].length.toString(),
				},
			],
		} );

		createElement( {
			type      : 'h3',
			innerHTML : 'colgroup settings',
			parent    : 'editor-colgroup-header-th',
		} );

		for ( let colgroupIndex = 0; colgroupIndex < state.colgroupProps.length; colgroupIndex++ ) {
			createElement( {
				type   : 'col',
				id     : `colgroup-item-${colgroupIndex}`,
				parent : 'editor-table-colgroup',
				attrs  : [
					{
						attr  : 'span',
						value : state.colgroupProps[ colgroupIndex ].span ? state.colgroupProps[ colgroupIndex ].span + '' : 1,
					},
					{
						attr  : 'style',
						value : `display: table-cell; ${state.columnSettings[ colgroupIndex ].width > 1 && state.columnSettings[ colgroupIndex ].useWidth ? 'width:' + state.columnSettings[ colgroupIndex ].width + 'px;' : ''}`,
					},
				],
			} );

			createElement( {
				type      : 'h4',
				parent    : `colgroup-item-${colgroupIndex}`,
				innerHTML : `col ${colgroupIndex}`,
			} );

			createElement( {
				type        : 'input',
				id          : `colgroup-use-span-${colgroupIndex}`,
				parent      : `colgroup-item-${colgroupIndex}`,
				attrs       : [
					{
						attr  : 'type',
						value : 'checkbox',
					},
				],
				inputProps  : {
					type    : 'checkbox',
					label   : 'span',
					name    : 'span-toggle',
					for     : `colgroup-use-span-${colgroupIndex}`,
					value   : 'span',
					checked : state.colgroupProps[ colgroupIndex ].useSpan,
				},
				eventObject : {
					listener : 'click',
					func     : () => {
						state.colgroupProps[ colgroupIndex ].useSpan = !state.colgroupProps[ colgroupIndex ].useSpan;
						reload( state, true );
					},
				},
			} );

			if ( state.colgroupProps[ colgroupIndex ].useSpan ) {
				createElement( {
					type        : 'input',
					id          : `colgroup-use-span-amount-${colgroupIndex}`,
					parent      : `colgroup-item-${colgroupIndex}`,
					inputProps  : {
						type    : 'number',
						label   : `Amount (current max is ${state.content.length + state.headerContent.length + state.footerContent.length})`,
						name    : 'span-toggle',
						for     : `colgroup-use-span-${colgroupIndex}`,
						checked : state.colgroupProps[ colgroupIndex ].useSpan,
					},
					eventObject : {
						listener : 'input',
						func     : e => {
							if ( e.target.value <= state.content.length + state.headerContent.length + state.footerContent.length ) {
								state.colgroupProps[ colgroupIndex ].span = e.target.value;
								reload( state );
							} else {
								alert( 'Please enter a valid number (span cannot exceed total table rows length)' );
								e.target.value = '';
							}
							reload( state );
						},
					},
				} );
			}

			createElement( {
				type        : 'input',
				id          : `colgroup-use-classname-name-${colgroupIndex}`,
				parent      : `colgroup-item-${colgroupIndex}`,
				attrs       : [
					{
						attr  : 'type',
						value : 'checkbox',
					},
				],
				inputProps  : {
					type    : 'checkbox',
					label   : 'class',
					name    : 'classname-toggle',
					for     : `colgroup-use-classname-name-${colgroupIndex}`,
					checked : state.colgroupProps[ colgroupIndex ].useClassName,
				},
				eventObject : {
					listener : 'click',
					func     : () => {
						state.colgroupProps[ colgroupIndex ].useClassName = !state.colgroupProps[ colgroupIndex ].useClassName;
						reload( state, true );
					},
				},
			} );

			if ( state.colgroupProps[ colgroupIndex ].useClassName ) {
				createElement( {
					type        : 'input',
					id          : `colgroup-use-classname-name-${colgroupIndex}`,
					parent      : `colgroup-item-${colgroupIndex}`,
					attrs       : {
						attr  : 'placeholder',
						value : 'Enter a class name',
					},
					inputProps  : {
						type    : 'text',
						label   : 'Name',
						name    : `colgroup-use-classname-name-${colgroupIndex}`,
						for     : `colgroup-use-classname-name-${colgroupIndex}`,
						checked : state.colgroupProps[ colgroupIndex ].useClassName,
					},
					eventObject : {
						listener : 'input',
						func     : e => {
							if ( e.target.value != undefined && e.target.value != '' ) {
								state.colgroupProps[ colgroupIndex ].span = e.target.value;
								reload( state );
							}
							reload( state );
						},
					},
				} );
			}

			createElement( {
				type        : 'input',
				id          : `use-col-fixed-width-${colgroupIndex}`,
				parent      : `colgroup-item-${colgroupIndex}`,
				inputProps  : {
					type    : 'checkbox',
					label   : 'fixed width',
					for     : `use-col-fixed-width-${colgroupIndex}`,
					checked : state.columnSettings[ colgroupIndex ].useWidth,
				},
				eventObject : {
					listener : 'click',
					func     : () => {
						( state.columnSettings[ colgroupIndex ].useWidth = !state.columnSettings[ colgroupIndex ].useWidth ), reload( state, true );
					},
				},
			} );

			if ( state.columnSettings[ colgroupIndex ].useWidth ) {
				createElement( {
					type       : 'input',
					id         : `col-width-input-${colgroupIndex}`,
					parent     : `colgroup-item-${colgroupIndex}`,
					inputProps : {
						type      : 'number',
						container : 'div',
						for       : `columnWidth-${colgroupIndex}`,
						label     : 'col width',
						value     : state.columnSettings[ colgroupIndex ].width,
						min       : 0, // <colgroup> 'span' according to spec is clamped to 1000 and defaults to 1
						max       : 1000,
					},
				} );

				createElement( {
					type        : 'button',
					id          : `col-width-${colgroupIndex}-set`,
					parent      : `colgroup-item-${colgroupIndex}`,
					innerHTML   : 'set',
					eventObject : {
						listener : 'click',
						func     : () => {
							const width = document.getElementById( `col-width-input-${colgroupIndex}` ).value;
							state.columnSettings[ colgroupIndex ].width = width;
							reload( state, true );
						},
					},
				} );
			}
		}
	}
};

export default colgroup;
