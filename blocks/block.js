( function( wp ) {

    // Store external dependencies in variables for easier usage.
    var element = wp.element.createElement;
    var __ = wp.i18n.__;

    wp.blocks.registerBlockType( 'learn-gutenberg/ex2-plainjs', {
        title: __( 'Learn Gutenberg Example: Plain JS', 'learn-gutenberg' ),
        category: 'widgets',
        icon: 'admin-users',
        keywords: [
            __( 'lesson', 'ex2-plainjs' ),
            __( 'tutorial', 'ex2-plainjs' ),
            __( 'javascript', 'ex2-plainjs' )
        ],
        attributes: {
            who: {
                type: 'string',
                selector: 'p',
                attribute: 'who',
            },
        },
        edit: function( props ) {
            var attributes = props.attributes,
                setAttributes = props.setAttributes,
                className = props.className,
                id = props.id,
                who = attributes.who || '';

            // Set default “who” attribute value.
            if ( ! attributes.hasOwnProperty( 'who' ) ) {
                setAttributes( { who: __( 'Roy', 'ex2-plainjs' ) } );
            }

            // Change event for form input.
            var whoChange = function( event ) {
                setAttributes( { who: event.target.value } );
            };

            // Create block UI using WordPress createElement.
            return element(
                'div',
                { className: className },
                [
                    element(
                        'p',
                        {
                            who: who,
                            className: 'display-ex2-plainjs-who'
                        },
                        [
                            element(
                                'strong',
                                {},
                                __( 'Who?', 'ex2-plainjs' )
                            ),
                            element(
                                'span',
                                {
                                    className: "ex2-plainjs-who"
                                },
                                who ? who : __( 'No one at all', 'ex2-plainjs' ),
                            )
                        ]
                    ),
                    element(
                        'div',
                        {
                            className: 'edit-ex2-plainjs-who'
                        },
                        [
                            element(
                                'label',
                                {
                                    for: id + '-control'
                                },
                                who ? __( 'Choose someone else:', 'ex2-plainjs' ) : __( 'Choose someone:', 'ex2-plainjs' )
                            ),
                            element(
                                'input',
                                {
                                    id: id + '-control',
                                    value: who,
                                    placeholder: __( 'Who is worthy?', 'ex2-plainjs' ),
                                    onChange: whoChange,
                                }
                            ),
                        ]
                    ),
                ]
            );
        },
        save: function( props ) {
            var attributes = props.attributes;
            var who = attributes.who || __( 'no one at all', 'ex2-plainjs' );
            return element(
                'p',
                {
                    className: attributes.className,
                    who: attributes.who
                },
                __( 'Who', 'ex2-plainjs' ) + ': ' + who,
            );
        }
    });
})(window.wp);
