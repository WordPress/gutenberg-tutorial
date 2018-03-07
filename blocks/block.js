( function( wp ) {
    //Render function
    var el = wp.element.createElement;
    //Translation function
    var __ = wp.i18n.__;
    wp.blocks.registerBlockType( 'learn-gutenberg/ex2-vue', {
        title: __( 'Learn Gutenberg Example: VueJS', 'learn-gutenberg' ),
        category: 'widgets',
        supportHTML: false,
        attributes: {
            who: {
                selector: 'p',
                attribute: 'who'
            }
        },
        edit: function( props ) {
            var attributes = props.attributes,
                setAttributes= props.setAttributes,
                className = props.className,
                id = props.id;

            //Define id to mount VueJs app into
            var vueAppIdAttr = 'vuetest-' + id;

            //Set default for who we're saying who to.
            if( ! attributes.hasOwnProperty( 'who' ) ){
                attributes.who = 'Roy'
            }

            //Create copy of attributes to create intial state of Vue app with
            var vueInitialState = {};
            Object.keys( attributes ).forEach( function (key) {
                vueInitialState[key] =  attributes[key];
            });

            //create Vue app
            var APP = new Vue({
                //mount on element we're about to create with el()
                el: '#' + vueAppIdAttr,
                data: function () {
                    return vueInitialState
                },
                //Use watchers to update React
                watch: {
                    who: function (newValue) {
                        setAttributes({ who:newValue});
                    }
                },
                //template for Vue app
                template: '<div><p>Who: {{who}}</p><input v-model="who" /></div>',
            });

            //return using WordPress createElement
            return el(
                'div',
                { className: className },
                [
                    el(
                        'p',
                        {
                            className:className,
                            who: attributes.who
                        },
                        el(
                            'div',
                            {
                                id: vueAppIdAttr
                            },
                        ),
                    ),


                ]
            );
        },
        save: function(attributes,className) {
            el(
                'p',
                {
                    className:className,
                    who: attributes.who
                }
            );
        }
    } );
} )(
    window.wp
);