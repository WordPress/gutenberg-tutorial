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
	 * Returns a custom component for text-based inputs inside block inspector settings.
	 * @see https://github.com/WordPress/gutenberg/tree/master/blocks/inspector-controls/text-control
	 */
	var TextControl = InspectorControls.TextControl;

	/**
	 * Returns a custom component for range-based inputs inside block inspector settings.
	 * @see https://github.com/WordPress/gutenberg/tree/master/blocks/inspector-controls/range-control
	 */
	var RangeControl = InspectorControls.RangeControl;

	/**
	 * Returns a custom component for select-based inputs inside block inspector settings.
	 * @see https://github.com/WordPress/gutenberg/tree/master/blocks/inspector-controls/select-control
	 */
	var SelectControl = InspectorControls.SelectControl;

	/**
	 * Register Block: REST Posts
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
		'learn-gutenberg/ex4-non-enclosing-shortcode',

		// Block settings
		{
			/**
			 * This is the display title for the block, which can be translated with `i18n` functions.
			 * The block inserter will show this name.
			 */
			title: __( 'REST Posts', 'learn-gutenberg' ),

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
				__( 'posts' ),
			],

			/**
			 * Optional block extended support features.
			 */
			supports: {
				html: false, // Disable support for the raw HTML edit mode.
			},

			// Attributes for accessing configurable block data
			attributes: {
				// The remote WordPress site URL
				url: {
					type: 'string', // This attribute is a string.
					default: '', // It defaults to an empty string, which will fall-back to the current site URL on render.
				},
				// The maximum number of posts to retrieve
				limit: {
					type: 'integer', // This value is cast to an integer.
					default: 5, // By default the limit will be 5 posts.
				},
				// The sort order for posts
				order: {
					type: 'string', // The sort order is a string.
					default: 'desc', // By default posts will be in descending order, newest to oldest.
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
					posts: '/wp/v2/posts?per_page=' + props.attributes.limit + '&order=' + props.attributes.order,
				};

			// Pass normal edit function with withAPIData().
			} )( function( props ) {
				// Helper function for setting url value during edit.
				function onChangeUrl( value ) {
					props.setAttributes( { url: value } );
				}

				// Helper function for setting limit value during edit.
				function onChangeLimit( value ) {
					props.setAttributes( { limit: value } );
				}

				// Helper function for setting order value during edit.
				function onChangeSort( value ) {
					props.setAttributes( { order: value } );
				}

				// Determine post list preview output.
				// Output varying helper messages until posts exist for output.
				var postList = '';
				if ( ! props.posts.data ) {
					// API request has returned no response yet.
					postList = __( 'Loading...', 'learn-gutenberg' );
				} else if ( ! props.posts.data.length ) {
					// API response has returned zero results.
					postList = __( 'No posts found.', 'learn-gutenberg' );
				} else {
					// API response includes posts.
					// Iterate over each post to build a list of sample links.
					postList = props.posts.data.map( function( post ) {
						return el(
							'li',
							{},
							el(
								'a',
								{ href: '#nogo' },
								post.title.rendered
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
							TextControl,
							{
								type: 'text',
								label: __( 'WordPress site URL:', 'learn-gutenberg' ),
								value: props.attributes.url,
								onChange: onChangeUrl,
								help: __( 'This URL will be used for fetching posts on the front-end. The admin preview is for demonstration purposes and will only display posts from the current site.', 'learn-gutenberg' ),
							}
						),
						el(
							RangeControl,
							{
								label: __( 'Number of posts to display:', 'learn-gutenberg' ),
								value: props.attributes.limit,
								onChange: onChangeLimit,
								min: '1',
								max: '10',
							}
						),
						el(
							SelectControl,
							{
								label: __( 'Sort Order:', 'learn-gutenberg' ),
								value: props.attributes.order,
								onChange: onChangeSort,
								options: [
									{ label: __( 'Newest to Oldest (DESC)', 'learn-gutenberg' ), value: 'desc' },
									{ label: __( 'Oldest to Newest (ASC)', 'learn-gutenberg' ), value: 'asc' },
								]
							}
						)
					),

					// Render output preview.
					// Creates <div class="wp-block-learn-gutenberg-ex4-non-enclosing-shortcode">.
					el(
						'div',
						{ className: props.className },
						// Creates <ul class="rest-posts-list"> to wrap the sample postList response.
						el(
							'ul',
							{ className: 'rest-posts-list' },
							postList
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
				// Output is rendered dynamically in PHP.
				// Attributes will be saved to post_content as HTML comments.
				return null;
			},
		}
	);

} )( window.wp );
