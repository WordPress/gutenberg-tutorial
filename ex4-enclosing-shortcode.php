<?php
/**
 * Plugin Name: Learn Gutenberg Example: Enclosing Shortcode
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
function learn_gutenberg_ex4_enclosing_shortcode_init() {

	// Register editor JS
	wp_register_script(
		'ex4-enclosing-shortcode-editor',
		plugins_url( 'assets/block.js', __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		)
	);

	// Register editor CSS
	wp_register_style(
		'ex4-enclosing-shortcode-editor',
		plugins_url( 'assets/editor.css', __FILE__ ),
		array(
			'wp-blocks',
		)
	);

	// Register front-end CSS
	wp_register_style(
		'ex4-enclosing-shortcode-front',
		plugins_url( 'assets/style.css', __FILE__ ),
		array(
			'wp-blocks',
		)
	);

	// Register block assets
	if ( function_exists( 'register_block_type' ) ) {
		register_block_type(
			'learn-gutenberg/ex4-enclosing-shortcode',
			array(
				'editor_script' => 'ex4-enclosing-shortcode-editor',
				'editor_style'  => 'ex4-enclosing-shortcode-editor',
				'style'         => 'ex4-enclosing-shortcode-front',
			)
		);
	}
}
add_action( 'init', 'learn_gutenberg_ex4_enclosing_shortcode_init' );

/**
 * Sample legacy enclosing shortcode for wrapping content in HTML markup.
 *
 * @usage [notice]This is an important message.[/notice]
 *
 * @param  array  $atts    Shortcode attributes (unused).
 * @param  string $content Content to wrap.
 * @return string          Content wrapped in custom HTML.
 */
function learn_gutenberg_ex4_legacy_shortcode( $atts = array(), $content = '' ) {
	return '<div class="wp-block-learn-gutenberg-ex4-enclosing-shortcode">' . $content . '</div>';
}
add_shortcode( 'notice', 'learn_gutenberg_ex4_legacy_shortcode' );
