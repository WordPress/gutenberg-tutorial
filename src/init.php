<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since 	1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function learn_gutenberg_ex2_event_block_block_assets() {
	// Styles.
	wp_enqueue_style(
		'ex2-event-block-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' ) // Version: filemtime — Gets file modification time.
	);
}
// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'learn_gutenberg_ex2_event_block_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function learn_gutenberg_ex2_event_block_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'ex2-event-block-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ) // Dependencies, defined above.
		// filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ) // Version: filemtime — Gets file modification time.
	);

	// Styles.
	wp_enqueue_style(
		'ex2-event-block-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' ) // Version: filemtime — Gets file modification time.
	);
}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'learn_gutenberg_ex2_event_block_editor_assets' );

//Hook: Register meta field
add_action( 'plugins_loaded', 'learn_gutenberg_ex2_event_block_register_meta' );

/**
 * Register a meta field for the "free" attribute
 */
function learn_gutenberg_ex2_event_block_register_meta(){
    register_meta(
        //This is for post meta
        'post',
        //Meta key name this is for
        'learn_gutenberg_ex2_event_block_is_free',
        //Arguments
        array(
            //Show in REST API
            'show_in_rest' => true,
            //One value at a time
            'single' => true,
            //Value must be boolean
            'type' => 'boolean',
        )
    );
}