<?php
/**
 * The `Gallery Thumbnails Block` bootstrap file.
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * You can redistribute this plugin/software and/or modify it under
 * the terms of the GNU General Public License as published by the
 * Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * @link                 https://www.mypreview.one
 * @since                1.0.0
 * @package              gallery-thumbnails-block
 * @author               MyPreview (Github: @mahdiyazdani, @gooklani, @mypreview)
 * @copyright            © 2015 - 2022 MyPreview. All Rights Reserved.
 *
 * @wordpress-plugin
 * Plugin Name:          Gallery Thumbnails Block
 * Plugin URI:           https://www.mypreview.one
 * Description:          A simple gallery block with thumbnails navigation.
 * Version:              1.0.0
 * Requires at least:    5.5
 * Requires PHP:         7.4
 * Author:               MyPreview
 * Author URI:           https://www.mahdiyazdani.com
 * License:              GPL-3.0+
 * License URI:          http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain:          gallery-thumbnails-block
 * Domain Path:          /languages
 */

namespace Gallery_Thumbnails_Block;

define(
	__NAMESPACE__ . '\PLUGIN',
	array(
		'basename' => plugin_basename( __FILE__ ),
		'dir_path' => untrailingslashit( plugin_dir_path( __FILE__ ) ),
		'dir_url'  => untrailingslashit( plugin_dir_url( __FILE__ ) ),
		'slug'     => 'gallery-thumbnails-block',
	)
);

/**
 * Load the plugin text domain for translation.
 *
 * @since     1.0.0
 * @return    void
 */
function textdomain(): void {
	load_plugin_textdomain( 'gallery-thumbnails-block', false, dirname( PLUGIN['basename'] ) . '/languages' );
}
add_action( 'init', __NAMESPACE__ . '\textdomain' );

/**
 * Registers the block type from the metadata stored in the "block.json" file.
 *
 * @since     1.0.0
 * @return    void
 */
function register_block(): void {
	register_block_type_from_metadata( PLUGIN['dir_path'] );
}
add_action( 'init', __NAMESPACE__ . '\register_block' );

/**
 * Add additional helpful links to the plugin’s metadata.
 *
 * @since     1.0.0
 * @param     array  $links    An array of the plugin’s metadata.
 * @param     string $file     Path to the plugin file relative to the plugins directory.
 * @return    array
 */
function add_meta_links( array $links, string $file ): array {
	if ( PLUGIN['basename'] !== $file ) {
		return $links;
	}

	$plugin_links = array();
	/* translators: 1: Open anchor tag, 2: Close anchor tag. */
	$plugin_links[] = sprintf( esc_html_x( '%1$sCommunity support%2$s', 'plugin link', 'gallery-thumbnails-block' ), sprintf( '<a href="https://wordpress.org/support/plugin/%s" target="_blank" rel="noopener noreferrer nofollow">', PLUGIN['slug'] ), '</a>' );
	/* translators: 1: Open anchor tag, 2: Close anchor tag. */
	$plugin_links[] = sprintf( esc_html_x( '%1$sDonate%2$s', 'plugin link', 'gallery-thumbnails-block' ), sprintf( '<a href="https://www.buymeacoffee.com/mahdiyazdani" class="button-link-delete" target="_blank" rel="noopener noreferrer nofollow" title="%s">☕ ', \esc_attr__( 'Donate to support this plugin', 'gallery-thumbnails-block' ) ), '</a>' );

	return array_merge( $links, $plugin_links );
}
add_filter( 'plugin_row_meta', __NAMESPACE__ . '\add_meta_links', 10, 2 );
