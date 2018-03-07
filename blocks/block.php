<?php
/**
 * Enqueue assets needed for the admin editor.
 *
 * Use the "enqueue_block_assets" action to enqueue
 * assets on the front-end of your website.
 */
function learn_gutenberg_ex2_plainjs_enqueue_block_editor_assets() {
    $dir = dirname( __FILE__ );
    $block_js = '/block.js';
    $editor_css = '/editor.css';

    wp_enqueue_script( 'learn-gutenberg/ex2-plainjs', plugins_url( $block_js, __FILE__ ), array(
        'wp-blocks',
    ), filemtime( "$dir/$block_js" ) );

    wp_enqueue_style( 'learn-gutenberg/ex2-plainjs', plugins_url( $editor_css, __FILE__ ), array(
        'wp-blocks',
    ), filemtime( "$dir/$editor_css" ) );
}
add_action( 'enqueue_block_editor_assets', 'learn_gutenberg_ex2_plainjs_enqueue_block_editor_assets' );
