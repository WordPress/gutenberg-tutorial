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
function learn_gutenberg_ex4_non_enclosing_shortcode_init() {

	// Register editor JS
	wp_register_script(
		'ex4-non-enclosing-shortcode-editor',
		plugins_url( 'assets/block.js', __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		)
	);

	// Register editor CSS
	wp_register_style(
		'ex4-non-enclosing-shortcode-editor',
		plugins_url( 'assets/editor.css', __FILE__ ),
		array(
			'wp-blocks',
		)
	);

	// Register front-end CSS
	wp_register_style(
		'ex4-non-enclosing-shortcode-front',
		plugins_url( 'assets/style.css', __FILE__ ),
		array(
			'wp-blocks',
		)
	);

	// Register block assets and render callback
	if ( function_exists( 'register_block_type' ) ) {
		register_block_type(
			'learn-gutenberg/ex4-non-enclosing-shortcode',
			array(
				'editor_script'   => 'ex4-non-enclosing-shortcode-editor',
				'editor_style'    => 'ex4-non-enclosing-shortcode-editor',
				'style'           => 'ex4-non-enclosing-shortcode-front',
				'render_callback' => 'learn_gutenberg_ex4_non_enclosing_shortcode_output',
			)
		);
	}
}
add_action( 'init', 'learn_gutenberg_ex4_non_enclosing_shortcode_init' );

/**
 * Render output for the REST Posts dynamic block.
 *
 * @since  1.0.0
 *
 * @param  array  $atts Shortcode/Block Settings
 * @return string       HTML markup of resulting posts (or error).
 */
function learn_gutenberg_ex4_non_enclosing_shortcode_output( $atts = array() ) {

	// Parse provided attributes against default attributes
	$atts = shortcode_atts(
		array(
			'url' => home_url(),
			'limit' => 5,
			'order' => 'desc',
		),
		$atts,
		'rest_posts'
	);

	// Normalize request URL
	$url = untrailingslashit( esc_url( $atts[ 'url' ] ) );
	$request_url = add_query_arg(
		array(
			'per_page' => absint( $atts['limit'] ),
			'order'    => strtolower( esc_attr( $atts['order'] ) ),
		),
		$url . '/wp-json/wp/v2/posts/'
	);

	// Fetch remote posts using WP HTTP API
	$response = wp_remote_get( $request_url );

	// Return an invalid response message for anything except a HTTP 200 response.
	if ( 200 != wp_remote_retrieve_response_code( $response ) ) {
		return __( 'Invalid API response.', 'learn-gutenberg' );
	}

	$recent_posts = json_decode( wp_remote_retrieve_body( $response ) );

	if ( ! is_array( $recent_posts ) || count( $recent_posts ) === 0 ) {
		return __( 'No posts found.', 'learn-gutenberg' );
	}

	$output = '<ul class="rest-posts-list">';
	foreach ( $recent_posts as $post ) {
		$output .= sprintf(
			'<li><a class="rest-posts-link" href="%1$s">%2$s</a></li>',
			esc_url( $post->link ),
			esc_html( $post->title->rendered )
		);
	}
	$output .= '</ul>';

	return $output;
}
