<?php


/**
* Enqueue main styles and parent theme styles
*
*/
function my_theme_enqueue_styles() {

   wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );

}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );

/**
* Add theme support for full width blocks
*
*/
add_theme_support( 'align-wide' );
