<?php
/**
 * Visual Studios Plus theme.
 *
 * @package VisualStudiosPlus
 */

defined( 'ABSPATH' ) || exit;

$vsp_inc = get_template_directory() . '/inc/';
require $vsp_inc . 'defaults.php';
require $vsp_inc . 'post-types.php';
require $vsp_inc . 'meta.php';
require $vsp_inc . 'content.php';
require $vsp_inc . 'customizer.php';
require $vsp_inc . 'template-tags.php';
require $vsp_inc . 'setup.php';
require $vsp_inc . 'contact.php';
require $vsp_inc . 'setup-content.php';
unset( $vsp_inc );
