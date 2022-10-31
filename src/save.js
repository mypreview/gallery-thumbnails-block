/**
 * External dependencies
 */
import { blockClassName, stringify } from '@mypreview/unicorn-js-utils';

/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Slider, Slides } from './components';
import Constants from './constants';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see 	  https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 * @param 	  {Object} 		   props               Component properties.
 * @param 	  {Object} 		   props.attributes    Block attributes.
 * @return    {JSX.Element} 					   Component to render.
 */
function save( { attributes } ) {
	const { images } = attributes;
	const blockProps = useBlockProps.save();
	const className = blockClassName( blockProps?.className );
	const wrapperClassName = 'splide__slide';

	return (
		<div { ...blockProps }>
			<Slider isSave data-options={ stringify( Constants.OPTIONS.main ) }>
				<Slides className={ className } images={ images } isSave withCaption wrapperClassName={ wrapperClassName } />
			</Slider>
			<Slider
				isSave
				aria-label={ __( 'The carousel with thumbnails. Selecting a thumbnail will change the main carousel', 'gallery-thumbnails-block' ) }
				data-options={ stringify( Constants.OPTIONS.thumbs ) }
			>
				<Slides className={ className } images={ images } isSave wrapperClassName={ wrapperClassName } />
			</Slider>
		</div>
	);
}

export default save;
