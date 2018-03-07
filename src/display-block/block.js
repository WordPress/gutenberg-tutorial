//  Import CSS.
import './style.scss';
import './editor.scss';

//Import WordPress APIs/Components
const { __ } = wp.i18n; //  WordPress i18n
const { registerBlockType } = wp.blocks; // WordPress blocks API

//Import our mini-store for counter
import counter from '../counter';

//Create a basic component to show the count
const Counter = ( { count } ) => <div>{ count }</div>;

//Wrap the component in query so it updates count automatically
const CounterWrapped = wp.data.query( select => {
    return {
        //In the counter, we registered the reducer "countingPlugin" and the selector "getCount"
        //Those provide the count to the component
        count: select( 'countingPlugin', 'getCount' ),
    };
} )( Counter );


//Create display block
registerBlockType( 'learn-gutenberg/ex6-subscriber-display', {
    title: __( 'Learn Gutenberg: Show Count' ), //Block Title
    category: 'common',
    edit({attributes, setAttributes, className, focus, id}) {
        return (
			<div className={className }>
                <CounterWrapped/>
			</div>
        );
    },
    save: function() {
        return null;
    },
} );
