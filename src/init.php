<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 */



// Hook: Enqueue editor assets.
add_action( 'enqueue_block_assets', 'learn_gutenberg_ex6_counter_enqueue_block_editor_assets' );



/**
 * Enqueue Gutenberg block assets
 */
function learn_gutenberg_ex6_counter_enqueue_block_editor_assets() {
	// Styles.
	wp_enqueue_style(
		'ex6_subscriber-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-blocks',  ) // Dependency to include the CSS after it.
	);

    // Scripts.
    wp_enqueue_script(
        'ex6_subscriber-cgb-block-js', // Handle.
        plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: Webpack build
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data'),// Dependencies
        hash_directory( plugin_dir_path( __FILE__ ) ) //Cache busts when anything in this directory changes
    );

    // Styles.
    wp_enqueue_style(
        'ex6_subscriber-cgb-block-editor-css', // Handle.
        plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
        array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
    );
}





/**
 * Generate an MD5 hash string from the contents of a directory.
 *
 * @param string $directory
 * @return boolean|string
 */
function hash_directory($directory) {
    if (! is_dir($directory)) {
        return false;
    }

    $files = array();
    $dir = dir($directory);

    while (false !== ($file = $dir->read())) {
        if ($file != '.' and $file != '..')
        {
            if (is_dir($directory . '/' . $file))
            {
                $files[] = hash_directory($directory . '/' . $file);
            }
            else
            {
                $files[] = md5_file($directory . '/' . $file);
            }
        }
    }

    $dir->close();

    return md5(implode('', $files));
}