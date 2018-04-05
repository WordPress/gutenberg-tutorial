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
 * Returns a  component for building block inspector settings.
 * @see https://github.com/WordPress/gutenberg/tree/master/blocks/inspector-controls
 */
var InspectorControls = wp.blocks.InspectorControls;

/**
 * Returns a component for input fields, we can use for number or text inputs
 * @see https://github.com/WordPress/gutenberg/tree/master/blocks/inspector-controls/range-control
 */
var TextControl = InspectorControls.TextControl;

/**
 * Register Block: Meta Block
 * @see https://wordpress.org/gutenberg/handbook/block-api/
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
    // Block name. Must include a namespace prefix (e.g. my-plugin/my-custom-block).
    'learn-gutenberg/ex3-metablock',

    // Block settings
    {
        /**
         * This is the display title for the block, which can be translated with `i18n` functions.
         * The block inserter will show this name.
         */
        title: __( 'Price for Post', 'learn-gutenberg' ),

        // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
        icon: 'welcome-view-site',

        /**
         * Blocks are grouped into categories to help with browsing and discovery.
         * The categories provided by core are common, embed, formatting, layout, and widgets.
         */
        category: 'widgets',

        // Additional keywords to surface this block via search input.
        keywords: [
            __( 'learn-gutenberg' ),
            __( 'meta-field' ),
            __( 'posts' )
        ],

        /**
         * Optional block extended support features.
         */
        supports: {
            html: false // Disable support for the raw HTML edit mode.
        },

        // Attributes for accessing configurable block data
        attributes: {
            // The remote WordPress site URL
            price: {
                type: 'integer', // This attribute is an integer (we're using that because money-math is best done accruately)
                default: '100', // Default price of $1.00
                source: 'meta', // Tell Gutenberg that this a meta value, not an embedded attribute
                meta: 'learn_gutenburg_price' // Specify the name of the meta value in the above line
            }
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
            // Helper function for setting limit value during edit.
            function onChangePrice( value ) {
                props.setAttributes( { price: value } );
            }

            // Determine post list preview output.
            // Output varying helper messages until posts exist for output.
            var formattedPrice = parseFloat(Math.round(props.attributes.price) / 100).toFixed(2);

            // Return HTML to editor.
            return [
                //Show block inspector controls when block is selected
                props.isSelected && el(
                    // Output block controls in the block inspector area.
                    InspectorControls,
                    { key: 'inspector' },
                    el(
                        //Use WordPress text control for input and label.
                        TextControl,
                        {
                            //label for input
                            label: __( 'Price in cents:', 'learn-gutenberg' ),
                            //Value for input, automatically updated
                            value: props.attributes.price,
                            //Function that runs when the value changes
                            onChange: onChangePrice,
                            //HTML type attribute
                            type: 'number',
                            //HTML min attribute
                            min: '0',
                            //HTML max attribute
                            max: '99999999999'
                        }
                    )
                ),

                // Render output preview.
                el(
                    'div',
                    { className: props.className },
                    el(
                        'span',
                        { className: 'price-label' },
                        __( 'Price: ', 'learn-gutenberg' )
                    ),
                    el(
                        'span',
                        { className: 'price-block' },
                        formattedPrice
                    )
                )
            ];
        },

        /**
         * The save function defines the way in which the different attributes should be combined
         * into the final markup, which is then serialized by Gutenberg into post_content.
         * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
         *
         * @return {Element} Element to render.
         */
        save: function( props ) {
            // Output is rendered dynamically in PHP, so we don't do anything on save().
            return null;
        }
    }
);