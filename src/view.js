/**
 * External dependencies
 */
import { jsonify } from '@mypreview/unicorn-js-utils';
import Splide from '@splidejs/splide';
import { forEach, isNumber } from 'lodash';

/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import { baseClassName } from './utils';

/**
 * Initialize slider instances on the front-end.
 */
const galleryThumbnails = {
	cache() {
		this.vars = {};
		this.els = {};
		this.vars.block = baseClassName;
		this.els.$blocks = document.querySelectorAll( `.${ this.vars.block }` );
	},
	ready() {
		this.cache();
		this.init();
	},
	init() {
		forEach( this.els.$blocks, ( $block ) => {
			const $main = $block.querySelector( '.splide:first-of-type' );
			const $thumbs = $block.querySelector( '.splide:last-of-type' );
			const main = new Splide( $main, jsonify( $main.dataset?.options ) );
			const thumbs = new Splide( $thumbs, jsonify( $thumbs.dataset?.options ) );

			main.sync( thumbs );
			main.mount().on( 'active resized', ( index ) => galleryThumbnails.adaptiveHeight( index, main ) );
			thumbs.mount();
			galleryThumbnails.adaptiveHeight( undefined, main );
		} );
	},
	adaptiveHeight( index, $instance ) {
		const $elm = $instance.Components.Slides.getAt( isNumber( index ) ? index : $instance.index ).slide;
		$elm.parentElement.parentElement.style.height = $elm.offsetHeight + 'px';
	},
};

// Initialize after DOM loads.
domReady( () => {
	galleryThumbnails.ready();
} );
