<?php
/**
 * Plugin Name: Elementor Sticky UI
 * Description: Generic sticky table of contents, sidebars, and share actions for Elementor and standard WordPress content.
 * Version: 0.2.0
 * License: Apache-2.0
 */

if (!defined('ABSPATH')) {
    exit;
}

function esui_enqueue_assets() {
    $base = plugin_dir_url(__FILE__);
    $version = '0.2.0';

    wp_enqueue_style(
        'elementor-sticky-ui',
        $base . 'src/sticky-toc.css',
        array(),
        $version
    );

    if (function_exists('wp_enqueue_script_module')) {
        wp_enqueue_script_module(
            'elementor-sticky-ui',
            $base . 'src/elementor-init.js',
            array(),
            $version
        );
    }
}
add_action('wp_enqueue_scripts', 'esui_enqueue_assets');

function esui_admin_notice() {
    if (!current_user_can('manage_options') || function_exists('wp_enqueue_script_module')) {
        return;
    }
    echo '<div class="notice notice-warning"><p><strong>Elementor Sticky UI:</strong> WordPress 6.5 or newer is required for native script-module loading.</p></div>';
}
add_action('admin_notices', 'esui_admin_notice');
