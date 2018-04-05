<?php
/**
 * Plugin Name:     Learn Gutenberg Example: Metaboxes
 * Plugin URI:      https://learn.wordpress.org
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     learn-gutenberg
 * Domain Path:     /languages
 * Version:         0.1.0
 */
/**
 * Create a metabox that is Gutenberg compatible
 */
add_action( 'add_meta_boxes', 'learn_gutenberg_ex3_metabox_compatible' );
function learn_gutenberg_ex3_metabox_compatible() {
    add_meta_box(
        'learn-gutenberg-legacy-meta-box-compat', // The box ID -- must be unique
        'Learn Gutenberg Gutenberg-compatible Meta Box', // The title that'll show in the interface
        'learn_gutenberg_ex3_metabox_compatible_render', // Function (name) that'll output the metabox
        null, // Screen to display on. Could be things like post type or "comment", null is default
        'normal', // The part of the screen you want you box in, other options are "side", "advanced"
        'default', // Priority (order) of your box, also "high" or "low"
        /* For us the below is this most important:
            This line lets us specify to Gutenberg/WordPress that this meta box DOES work with Gutenberg
            AND that it SHOULD show it in the Gutenberg editing panel
        */
        array(
            '__block_editor_compatible_meta_box' => true,
        )
    );
}

/**
 * Render callback for meta box
 */
function learn_gutenberg_ex3_metabox_compatible_render() {
    echo '<strong>Hi, I am a meta box to show in Gutenberg.</strong> ';
    echo 'I would be more realistic if I validated and saved data, but I am just here for demonstration.';
}


/**
 * Legacy metabox
 */
add_action( 'add_meta_boxes', 'learn_gutenberg_ex3_metabox_legacy' );
function learn_gutenberg_ex3_metabox_legacy() {
    add_meta_box(
        'learn-gutenberg-legacy-meta-box-no-gutenberg', // The box ID -- must be unique
        'Learn Gutenberg Backwards Compatibility Meta Box', // The title that'll show in the interface
        'learn_gutenberg_ex3_metabox_legacy_render', // Function (name) that'll output the metabox
        null,  // Screen to display on. Could be things like post type or "comment", null is default
        'normal', // The part of the screen you want you box in, other options are "side", "advanced"
        'default', // Priority (order) of your box, also "high" or "low"
        /* For us the below is this most important:
            This line lets us specify to Gutenberg/WordPress that this meta box SHOULD NOT SHOW with Gutenberg
             and that it should only be shown where the classic editor is seen
        */
        array(
            '__back_compat_meta_box' => true,
        )
    );
}

/**
 * Render callback for legacy metabox
 */
function learn_gutenberg_ex3_metabox_legacy_render() {
    echo '<strong>I am a meta box EXCLUSIVE TO the classic editor.</strong> ';
    echo 'I would be more realistic if I validated and saved data, but I am just here for demonstration.';
}

/**
 * Enqueue assets needed for the admin editor.
 *
 * Use the "enqueue_block_assets" action to enqueue
 * assets on the front-end of your website.
 */
add_action( 'enqueue_block_editor_assets', 'learn_gutenberg_ex3_enqueue_block_editor_assets' );
function learn_gutenberg_ex3_enqueue_block_editor_assets() {
    $dir = dirname( __FILE__ );
    $metablock_js = '/metablock.js';
    wp_enqueue_script(
        'learn-gutenberg/ex3-metablock',
        plugins_url( $metablock_js, __FILE__ ),
        array( 'wp-blocks' ),
        filemtime( "$dir/$metablock_js" )
    );

    $sidebar_js = '/sidebar.js';
    wp_enqueue_script(
        'learn-gutenberg/ex3-sidebar',
        plugins_url( $sidebar_js, __FILE__ ),
        array( 'wp-blocks', 'wp-edit-post' ),
        filemtime( "$dir/$sidebar_js" ),
        true // The sidebar enqueue MUST be in the footer, so everything it relies on loads
    );
}


/**
 * Registering meta fields for block attributes that use meta storage
 */
add_action('init', 'learn_gutenberg_ex3_register_meta');
function learn_gutenberg_ex3_register_meta() {
    $args_price = array(
        'type' => 'integer', // Validate and sanitize the meta value as a string.
        'single' => true, // Return a single value of the type. Default: false.
        'show_in_rest' => true, // Show in the WP REST API response, needed for Gutenberg magic. Default: false.
    );
    // First argument is the object/post type, second is the name of our meta field, third is above arguments
    register_meta( 'post', 'learn_gutenburg_price', $args_price );


    // Make sure that we're on 5.0/Gutenberg before we create the block
    if ( function_exists( 'register_block_type' ) ) {
        // We need to register our block for the sake of presenting a way to render it on the front-end
        register_block_type(
            'learn-gutenberg/ex3-metablock',
            array( 'render_callback' => 'learn_gutenberg_ex3_make_price_block' )
        );
    }
}

/**
 * Render callback for the 'learn-gutenberg/ex3-metablock' block
 *
 * @return string
 */
function learn_gutenberg_ex3_make_price_block() {
    $post = get_post();
    // Use the classic `get_post_meta` to fetch the meta field value
    $price_in_cents = get_post_meta($post->id, 'learn_gutenburg_price', true)/100;
    // Below is a conversation because we're doing money in cents for more accurate math, but want to show it in units
    //   that customers will expect
    $number = number_format($price_in_cents, 2);
    // Like with a shortcode, for proper render order you must *return* the desired output of your standard block
    return __( 'Price: ', 'learn_gutenberg' ).$number;
}
