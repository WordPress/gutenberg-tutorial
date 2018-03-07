<?php

function learn_gutenberg_ex2_vue_enqueue_block_editor_assets() {
    $dir = dirname( __FILE__ );
    $block_js = '/block.js';
    $editor_css = '/editor.css';
    wp_register_script( 'vue', 'https://cdn.jsdelivr.net/npm/vue' );
    wp_enqueue_script( 'learn-gutenberg/ex2-vue', plugins_url( $block_js, __FILE__ ), array(
        'wp-blocks',
        'wp-i18n',
        'wp-element',
        'vue'
    ), filemtime( "$dir/$block_js" ) );
    wp_enqueue_style( 'learn-gutenberg/ex2-vue', plugins_url( $editor_css, __FILE__ ), array(
        'wp-blocks',
    ), filemtime( "$dir/$editor_css" ) );
}
add_action( 'enqueue_block_editor_assets', 'learn_gutenberg_ex2_vue_enqueue_block_editor_assets' );