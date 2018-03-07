<?php
/**
 * Plugin Name: Learn Gutenberg Example: Non-enclosing Shortcode
 * Plugin URI:  https://learn.wordpress.org/gutenberg/
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     learn-gutenberg
 * Domain Path:     /languages
 * Version:         0.1.0
 */

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * @see https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type/#enqueuing-block-scripts
 */
function learn_gutenberg_ex4_pre_existing_shortcode_init() {

	// Register editor JS
	wp_register_script(
		'ex4-pre-existing-shortcode-editor',
		plugins_url( 'assets/block.js', __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		)
	);

	// Register editor CSS
	wp_register_style(
		'ex4-pre-existing-shortcode-editor',
		plugins_url( 'assets/editor.css', __FILE__ ),
		array(
			'wp-blocks',
		)
	);

	// Register front-end CSS
	wp_register_style(
		'ex4-pre-existing-shortcode-front',
		plugins_url( 'assets/style.css', __FILE__ ),
		array(
			'wp-blocks',
		)
	);

	// Register block assets and render callback
	if ( function_exists( 'register_block_type' ) ) {
		register_block_type(
			'learn-gutenberg/ex4-pre-existing-shortcode',
			array(
				'editor_script'   => 'ex4-pre-existing-shortcode-editor',
				'editor_style'    => 'ex4-pre-existing-shortcode-editor',
				'style'           => 'ex4-pre-existing-shortcode-front',
				'render_callback' => 'learn_gutenberg_ex4_pre_existing_shortcode_output',
			)
		);
	}
}
add_action( 'init', 'learn_gutenberg_ex4_pre_existing_shortcode_init' );

/**
 * Render a shortcode named [child_pages] to list all children of a given page.
 *
 * @since  1.0.0
 *
 * @param  array  $atts Shortcode attributes.
 * @return string       HTML markup for page list.
 */
function learn_gutenberg_ex4_pre_existing_shortcode_output( $atts = array() ) {

	// Parse provided attributes against default attributes
	$atts = shortcode_atts(
		array(
			'id' => get_the_ID(),
		),
		$atts,
		'child_pages'
	);

	// Return a standard page list if we have a page ID
	if ( absint( $atts['id'] ) ) {
		return wp_list_pages( array(
			'child_of' => $atts['id'],
			'echo' => false,
			'title_li' => false,
		) );
	}

	// Return a null response if we have no valid page ID
	return null;
}
add_shortcode( 'child_pages', 'learn_gutenberg_ex4_pre_existing_shortcode_output' );
