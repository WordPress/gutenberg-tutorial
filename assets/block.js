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
	 * Fetchs local site data from WP REST API via requested route(s) and makes it accessible via block props.
	 * @see https://github.com/WordPress/gutenberg/tree/master/components/higher-order/with-api-data#withapidata
	 */
	var withAPIData = wp.components.withAPIData;

	/**
	 * Returns a custom component for building block inspector settings.
	 * @see https://github.com/WordPress/gutenberg/tree/master/blocks/inspector-controls
	 */
	var InspectorControls = wp.blocks.InspectorControls;

	/**
	 * Return a custom component to build a hierarchical select input.
	 * @see https://github.com/WordPress/gutenberg/tree/master/blocks/term-tree-select
	 */
	var TermTreeSelect = wp.blocks.TermTreeSelect;

	/**
	 * Utility for building a hierarchical array based on specific keys within that array.
	 * @see https://github.com/WordPress/gutenberg/tree/master/utils/terms.js
	 */
	var buildTermsTree = wp.utils.buildTermsTree;

	/**
	 * Register Block: List Child Pages
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
		'learn-gutenberg/ex4-pre-existing-shortcode',

		// Block settings
		{
			/**
			 * This is the display title for the block, which can be translated with `i18n` functions.
			 * The block inserter will show this name.
			 */
			title: __( 'List Child Pages', 'learn-gutenberg' ),

			// Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
			icon: 'list-view',

			/**
			 * Blocks are grouped into categories to help with browsing and discovery.
			 * The categories provided by core are common, embed, formatting, layout, and widgets.
			 */
			category: 'widgets',

			// Additional keywords to surface this block via search input.
			keywords: [
				__( 'learn-gutenberg' ),
				__( 'shortcode' ),
				__( 'pages' ),
			],

			/**
			 * Optional block extended support features.
			 */
			supports: {
				html: false, // Disable support for the raw HTML edit mode.
			},

			// Attributes for accessing configurable block data
			attributes: {
				// The page ID to query for child pages
				id: {
					type: 'integer', // This value is cast to an integer.
					default: '', // By default no parent page is defined.
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
			edit: withAPIData( function( props ) {
				return {
					// Make one request for all pages on the site (limit 100); for the settings input.
					allPages: '/wp/v2/pages/?per_page=100&oderby=menu_order&order=asc&context=edit',
					// Make a second request for only the children of the selected page; for output preview.
					childPages: '/wp/v2/pages/?parent=' + props.attributes.id,
				};

			// Pass normal edit function with withAPIData().
			} )( function( props ) {
				// Helper function for setting parent page ID during edit.
				function onChangeParent( value ) {
					props.setAttributes( { id: value } );
				}

				// Use buildTermsTree to produce a hierarchical array of all pages
				// for use inside <TermTreeSelect /> output.
				var pagesTree = !! props.allPages.data
					? buildTermsTree(
						props.allPages.data.map(
							function( item ) {
								return {
									id: item.id,
									parent: item.parent,
									name: ( item.title.rendered || item.id )
								};
							}
						)
					) : [];

				// Determine page list preview output
				// Output varying helper messages until pages exist for output.
				var pageListPreview = '';
				if ( ! props.attributes.id ) {
					// No parent page has been selected
					pageListPreview = __( 'Please select a Parent page ID in the Block settings.', 'learn-gutenberg' );
				} else if ( ! props.childPages.data ) {
					// API request has returned no response yet.
					pageListPreview = __( 'Loading...', 'learn-gutenberg' );
				} else if ( ! props.childPages.data.length ) {
					// API response has returned zero results.
					pageListPreview = __( 'No children for selected parent page.', 'learn-gutenberg' );
				} else {
					// API response includes child pages.
					// Iterate over each to generate a sample list.
					pageListPreview = props.childPages.data.map( function( page ) {
						return el(
							'li',
							{},
							el(
								'a',
								{ href: '#nogo' },
								page.title.rendered
							)
						);
					} );
				}

				// Return HTML to editor.
				return [
					props.isSelected && el(
						// Output block controls in the block inspector area.
						InspectorControls,
						{ key: 'inspector' },
						el(
							TermTreeSelect,
							{
								label: __( 'Parent page ID:', 'learn-gutenberg' ),
								noOptionLabel: __( 'Select a page', 'learn-gutenberg' ),
								termsTree: pagesTree,
								selectedTerm: props.attributes.id,
								onChange: onChangeParent,
							}
						)
					),

					// Render output preview.
					// Creates <div class="wp-block-learn-gutenberg-ex4-non-enclosing-shortcode">.
					el(
						'div',
						{ className: props.className },
						// Creates <ul class="child-pages"> to wrap the sample pageListPreview response.
						el(
							'ul',
							{ className: 'child-pages' },
							pageListPreview
						)
					)
				];
			} ),

			/**
			 * The save function defines the way in which the different attributes should be combined
			 * into the final markup, which is then serialized by Gutenberg into post_content.
			 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
			 *
			 * @return {Element} Element to render.
			 */
			save: function( props ) {
				// Output is rendered dynmaically in PHP.
				// Attributes will be saved to post_content as HTML comments.
				return null;
			},
		}
	);

} )( window.wp );
