//  Import CSS.
import './style.scss';
import './editor.scss';

//Import WordPress APIs/Components
const { __ } = wp.i18n; //  WordPress i18n
const { registerBlockType } = wp.blocks; // WordPress blocks API
const Dashicon = wp.components.Dashicon; //Dashicon component


//Import our mini-store for counter
import counter from '../counter';

//Register block to show count
registerBlockType( 'learn-gutenberg/ex6-counter-example-show', {
    title: __( 'Learn Gutenberg Example 6: Counter Show' ), //Block Title
    category: 'common',
    edit({attributes, setAttributes, className, focus, id}) {
        return (
            <div className={className }>
                <button
                    //When button is increased, increase count
                    onClick={() => counter.dispatch({ type: 'INCREMENT' })}
                >
                    <span className={'screen-reader-text'}>
                        {
                            //Instructions for screen reader
                            __('Increase Count', 'learn-gutenberg' )
                        }
                    </span>
                    <Dashicon
                        icon={'plus'}
                    />
                </button>

                <button
                    onClick={
                        //When button is clicked, reduce count
                        () => counter.dispatch({ type: 'DECREMENT' })
                    }
                    >
                    <span className={'screen-reader-text'}>
                        {
                            //Instructions for screen reader
                            __('Decrease Count', 'learn-gutenberg' )
                        }
                    </span>
                    <Dashicon
                        icon={'minus'}
                    />
                </button>
            </div>
        );
    },
    save: function() {
        return null;
    },
} );
