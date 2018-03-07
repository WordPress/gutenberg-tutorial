/**
 * BLOCK: Event Block
 *
 * Saves event name, tagline and description statically to content. Illustrates using different types of Gutenberg attributes.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const {__} = wp.i18n; // WordPress translation functions
const {registerBlockType} = wp.blocks; //The blocks API
const el = wp.element.createElement; //WordPress Render function
const RichText = wp.blocks.RichText; //Native WordPress (TinyMCE powered) rich-text editor.
const UrlInput = wp.blocks.UrlInputButton; //Native WordPress URL input with post lookup
const TextAreaControl = wp.components.TextareaControl;//Native WordPress textarea control
const TextControl = wp.components.TextControl; //Native WordPress text control
const CheckboxControl = wp.components.CheckboxControl; //Native WordPress checkbox
/**
 * Register: aa Gutenberg Block.
 *
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('learn-gutenberg/ex2-event-block', {
    //Name of block
    title: __('Learn Gutenberg: Event Block', 'learn-gutenberg'),
    //Icon for block
    icon: 'groups',
    //Block category
    category: 'common',
    //Help the search box find this block
    keywords: [
        __('Event', 'learn-gutenberg'),
        __('Learn Gutenberg', 'learn-gutenberg'),
        __('create-guten-block'),
    ],
    //declare our attributes
    attributes: {
        //attributes.name
        //Value will be the HTML of saved 'h2' element or the default.
        heading: {
            //this attribute is a string
            'type': 'string',
            //The data is saved HTML of matching element
            source: 'html',
            //That element has the type h2
            selector: 'h2',
            //This is the default value.
            default: __('Event Title', 'learn-gutenberg' ),
        },
        //attributes.tagline
        //Value will be the HTML of saved 'h3' element or the default.
        tagline: {
            //this attribute is a string
            'type': 'string',
            //The data source is saved HTML of matching element
            source: 'html',
            //That element has the type h3
            selector: 'h3',
            //This is the default value.
            default: __('Event Tagline', 'learn-gutenberg'),
        },
        //attributes.description
        //Value will be an array with any number of saved 'p' elements or the default.
        description: {
            //this attribute is an array
            type: 'array',
            //There are one or more elements with this data.
            source: 'children',
            //These elements all are of the type "p"
            selector: 'p',
            //This is the default value.
            default: __('Event Description', 'learn-gutenberg'),
        },
        //attributes.size
        size: {
            //This attribute is a string
            type: 'integer',
            //Find text
            source: 'text',
            //From an element with class
            selector: '.event-size',
        },
        //attributes.free
        free: {
            //This attribute is a boolean
            type: 'boolean',
            //Save as post meta
            source: 'meta',
            //Store in meta key
            meta:   'learn_gutenberg_ex2_event_block_is_free'
        }
    },
    /**
     * Edit callback to create event editor
     *
     * @param attributes
     * @param setAttributes
     * @param className
     * @param isSelected
     * @param id
     * @returns {XML}
     */
    edit({attributes, setAttributes, className, isSelected, id}) {

        /**
         * Change handler for when the event tagline changes
         *
         * @param {String} updatedText
         */
        const onChangeHeading = function (updatedText) {
            //Update "heading" attribute
            setAttributes({heading: updatedText});
        };

        /**
         * Change handler for when the event heading changes
         *
         * @param {String} updatedText New headline
         */
        const onChangeTagline = function (updatedText) {
            //Update "tagline" attribute
            setAttributes({tagline: updatedText});
        };

        /**
         * Change handler for when the event description changes
         *
         * @param {Array} updatedText (The Type of updatedText is array since this input uses RichText)
         */
        const onChangeDescription = function (updatedText) {
            //Update "description" with one or more lines of text.
            setAttributes({description: updatedText});
        };

        /**
         * Edit or preview the Headline
         *
         * @param  {Boolean} isSelected Is block selected?
         * @param {Function} onChangeHeading Callback function to update headline attribute when input changes.
         * @param {String} id Unique ID
         * @constructor
         */
        const Headline = function (isSelected,onChangeHeading,id) {
            if( isSelected ){
                /** Block is selected **/
                //Edit the heading
                //Using WordPress' text control component
                //See https://github.com/WordPress/gutenberg/tree/master/blocks/inspector-controls/text-control
                return el(
                    TextControl,
                    {
                        onChange: onChangeHeading,
                        //The specific attribute to edit
                        value: attributes.heading,
                        //The id attribute to use
                        instanceId: 'heading-' + id,

                    }
                );
            }else{
                /** Block is not selected **/
                //Show preview of heading
                return el(
                    //Creates <h2 className={'heading'}>{attributes.heading}</h3>
                    //The same as in save callback
                    'h2',
                    {
                        className: 'heading'
                    },
                    //Display tagline
                    attributes.heading
                )
            }
        };

        /**
         * Edit or preview the tagline for the event
         *
         * @param  {Boolean} isSelected Is block selected?
         * @param {Function} onChangeTagline Callback function to update tagline attribute when input changes.
         * @param {String} id Unique ID
         * @constructor
         */
        const Tagline = function (isSelected,onChangeTagline,id) {
           if( isSelected ){
               /** Block is selected **/
               return el(
                   //Show editor
                   //Using WordPress' text area control component
                   //See https://github.com/WordPress/gutenberg/tree/master/blocks/inspector-controls/textarea-control
                   TextAreaControl,
                   {
                       //The function to call when the tagline changes
                       onChange: onChangeTagline,
                       //The specific attribute to edit
                       value: attributes.tagline,
                       //limit input to two rows
                       rows: 2,
                   }
               )
           }else{
               /** Block is not selected **/
               //Display preview
               return el(
                   //Creates <h3 className={'tagline'}>{attributes.tagline}</h3>
                   //The same as in save callback
                   'h3',
                   {

                       className: 'tagline'
                   },
                   //Display tagline
                   attributes.tagline
               )
           }
        };

        /**
         * Component for the "Is Free Event" checkbox
         * @param {boolean} isSelected
         * @constructor
         */
        const IsFree = function(isSelected,id) {
            if( isSelected ){
                /** Block is selected **/
                return el(
                    //Show editor
                    //Using WordPress' checkbox component
                    //See https://github.com/WordPress/gutenberg/blob/master/blocks/inspector-controls/checkbox-control/index.js
                    CheckboxControl,
                    {
                        //Checkbox title
                        title: __('Free Event', 'learn-gutenberg'),
                        //Checkbox label
                        label: __('Yes', 'learn-gutenberg'),
                        //Is checkbox checked?
                        checked: attributes.free,
                        //Used for creating a unique ID for input that is also used for attribute of label
                        instanceId: id + '-free',
                        //onChange event handler used
                        onChange: function () {
                            let value = !attributes.free;
                            setAttributes({free: value});
                        }
                    }

                );
            }else{
                /** Block is not selected **/
                //Don't show anything
            }
        };

        /**
         * Component for the "Event Size" preview or edit
         * @param {boolean} isSelected
         * @constructor
         */
        const Size = function(isSelected,id) {
            if( isSelected ){
                /** Block is isSelecteded **/
                return el(
                        //Show editor
                        //Using WordPress' text control component (HTML5 type will be "number")
                        //See https://github.com/WordPress/gutenberg/tree/master/blocks/inspector-controls/text-control
                        TextControl,
                        {
                            type:'number',
                            //The specific attribute to edit
                            value: attributes.size,
                            //The id attribute to use
                            instanceId: 'size-' + id,
                            //inline change function
                            onChange: function(value) {
                                //set size to value of control
                                setAttributes({size:value})
                            },
                            //label for contorl
                            label: __( 'Event Size', 'learn-gutenberg' )
                        }
                    );
            }else{
                /** Block is not selected **/
                //Show event size
                el(
                    'span',
                    {
                        className: 'event-size'
                    },
                    attributes.size
                )
            }
        };


        /**
         * Display interface
         */
        return el(
            //outer "div" element gets block's class name
            'div',
            {
                className: className,
            },
            //Array of inner elements
            [
                //Edit or display the heading for the event
                Headline(isSelected,onChangeHeading,id),
                //Edit or preview the tagline for the event
                Tagline(isSelected,onChangeTagline,id),
                //Edit the description for the event
                //Using WordPress' RichText component
                el(
                    RichText,
                    {
                        //Tag type to preview content inside of.
                        tagName: 'p',
                        //Class to add to preview element
                        className: 'description',
                        //Function called when description changes
                        onChange: onChangeDescription,
                        //The specific attribute to display
                        value: attributes.description,
                        //Boolean, if true, controls show
                        isSelected: isSelected,
                    }
                ),
                //Edit or preview the size of the event
                Size(isSelected,id),
                //Edit if event is "free"
                IsFree(isSelected,id)

            ],
        );

    },
    /**
     * Saves static HTML to post content
     *
     * Our intent is to create valid HTML, that has consistent markup with the same classes applied to the markup in the editor and front-end.
     *
     * @param attributes
     * @param className
     */
    save: function ({attributes, className}) {
        //Create HTML that is the same as the editor, minus the editable interface
        return el(
            //Output everything wrapped in one "div"
            'div',
            {
                //This class is for the outer most element
                className: className,
            },
            [
                //Show the event heading
                el(
                    //Element type - This is the same type used when previewing heading
                    'h2',
                    {
                        //Class - Corresponds to the "className" parameter for the RichText responsible for heading
                        className: 'heading',
                    },
                    //Inner HTML - The heading to show
                    attributes.heading
                ),
                //Show the event tagline
                el(
                    //Element type - This is the same type previwing the tagline
                    'h3',
                    {
                        //Class - is is the same class used when previewing tagline
                        className: 'tagline',
                    },
                    //Inner HTML - The tagline to show
                    attributes.tagline
                ),
                //Show the event description
                el(
                    //Element type - This is the same type used when previewing description
                    'p',
                    {
                        //Class - This is the same class used when previewing description
                        className: 'description',
                    },
                    //Inner HTML - Corresponds to the "value" parameter for the RichText responsible for description
                    attributes.description
                ),
                //Show event size
                el(
                    'span',
                    {
                        className: 'event-size'
                    },
                    attributes.size
                )
            ]
        );
    },
});


