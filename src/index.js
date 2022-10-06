/**
 * External dependencies
 */
import { Icon } from '@mypreview/unicorn-react-components';

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see    https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './Edit';
import save from './save';
import icons from './assets/icons.json';

/**
 * Block registration API.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( 'mypreview/gallery-thumbnails', {
	/**
	 * @see    ./assets/icons.json
	 */
	icon: <Icon d={ icons?.block } />,
	/**
	 * @see    ./Edit.js
	 */
	edit: Edit,

	/**
	 * @see    ./save.js
	 */
	save,
} );
