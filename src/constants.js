/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * The object exported from this file has been determined to be frozen mainly
 * to prevent new properties from being added to it, existing properties from
 * being removed, and avoid the values of existing properties from being changed.
 */
export default Object.freeze( {
	MESSAGES: {
		edit: __( 'Edit', 'gallery-thumbnails' ),
		instructions: __( 'Drag images, upload new ones or select files from your library.', 'gallery-thumbnails' ),
		permission: __( 'To edit the media file, you need permission to upload media.', 'gallery-thumbnails' ),
		title: __( 'Gallery', 'gallery-thumbnails' ),
		upload: __( 'Upload an image', 'gallery-thumbnails' ),
	},
	OPTIONS: {
		main: {
			arrows: false,
			cover: true,
			pagination: false,
			perMove: 1,
			perPage: 1,
			type: 'fade',
		},
		thumbs: {
			gap: 6,
			cover: true,
			dragMinThreshold: {
				mouse: 4,
				touch: 10,
			},
			fixedWidth: 144,
			fixedHeight: 80,
			isNavigation: true,
			pagination: false,
			rewind: true,
			type: 'slide',
		},
	},
} );
