<?php
/**
 * Plugin Name:     Learn Gutenberg Example: Example Static Block For Events
 * Plugin URI:      https://learn.wordpress.org
 * Description:     A static block demonstrating the relationship of attributes to saved HTML markup, in both directions.
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     learn-gutenberg
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 */
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
