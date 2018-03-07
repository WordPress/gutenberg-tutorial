// Self-initiating anonymous function wrapper.
( function( wp ) {

	/**
	 * Registers a new block provided a unique name and an object defining its behavior.
	 * @see https://github.com/WordPress/gutenberg/tree/master/blocks#api
	 */
	var registerBlockType = wp.blocks.registerBlockType;

	/**
	 * Retrieves the translation of text.
	 * @see https://github.com/WordPress/gutenberg/tree/master/i18n#api
	 */
	var __ = wp.i18n.__;

	/**
	 * Returns a new element of given type. Element is an abstraction layer atop React.
	 * @see https://github.com/WordPress/gutenberg/tree/master/element#element
	 */
	var el = wp.element.createElement;

	/**
	 * Returns a custom component for editable text.
	 * @see https://github.com/WordPress/gutenberg/tree/master/blocks/editable#editable
	 */
	var Editable = wp.blocks.Editable;

	/**
	 * Register Block: Notice Message block.
	 * @see https://wordpress.org/gutenberg/handbook/block-api/
	 *
	 * This simple, configurable block is designed to replace a typical enclosing shortcode
	 * (e.g. [notice]This is an important messsage.[/notice]).
	 *
	 * @param  {string}   name     Block name.
	 * @param  {Object}   settings Block settings.
	 * @return {?WPBlock}          The block, if it has been successfully
	 *                             registered; otherwise `undefined`.
	 */
	registerBlockType(
		// Block name. Must include a namespace prefix (e.g. my-plugin/my-custom-block).
		'learn-gutenberg/ex4-enclosing-shortcode',

		// Block settings
		{
			/**
			 * This is the display title for the block, which can be translated with `i18n` functions.
			 * The block inserter will show this name.
			 */
			title: __( 'Notice Message', 'learn-gutenberg' ),

			// Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
			icon: 'warning',

			/**
			 * Blocks are grouped into categories to help with browsing and discovery.
			 * The categories provided by core are common, embed, formatting, layout, and widgets.
			 */
			category: 'formatting',

			// Additional keywords to surface this block via search input.
			keywords: [
				__( 'learn-gutenberg' ),
				__( 'shortcode' ),
				__( 'notice' ),
			],

			// Attributes for accessing configurable block data
			attributes: {
				// The editable "message" value, props.attributes.message
				message: {
					type: 'array', // This attribute's value is an array
					source: 'children', // The array contains children elements of the selected element
					selector: '.ex4-notice', // The selected element has a class of "ex4-notice"
				},
			},

			/**
			 * The edit function describes the structure of the block in the context of the editor.
			 * This represents what the editor will render when the block is used.
			 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#edit
			 *
			 * @param {Object} [props] Properties passed from the editor.
			 * @return {Element}       Element to render.
			 */
			edit: function( props ) {
				// Helper function for setting message value during edit
				function onChangeMessage( value ) {
					props.setAttributes( { message: value } );
				}

				// Return HTML to editor
				return el(
					// Creates <div class="wp-block-learn-gutenberg-ex4-enclosing-shortcode">.
					'div',
					{ className: props.className },
					el(
						// Creates custom <Editable /> component (from wp.blocks), passing along all relevant properties.
						Editable,
						{
							tagName: 'div',
							className: 'ex4-notice',
							placeholder: __( 'Important notice message...', 'learn-gutenberg' ),
							value: props.attributes.message,
							onChange: onChangeMessage,
							focus: props.isSelected,
							onFocus: props.setFocus,
						}
					)
				);
			},

			/**
			 * The save function defines the way in which the different attributes should be combined
			 * into the final markup, which is then serialized by Gutenberg into post_content.
			 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
			 *
			 * @return {Element} Element to render.
			 */
			save: function( props ) {
				return el(
					// Creates <div class="wp-block-learn-gutenberg-ex4-enclosing-shortcode">.
					'div',
					{ className: props.className },
					el(
						// Creates <div class="ex4-notice"> to wrap message content.
						'div',
						{ className: 'ex4-notice' },
						props.attributes.message
					)
				);
			},
		}
	);

} )( window.wp );
