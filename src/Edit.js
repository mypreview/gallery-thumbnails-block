/**
 * External dependencies
 */
import { blockClassName, ifArray } from '@mypreview/unicorn-js-utils';
import { GalleryUpload } from '@mypreview/unicorn-react-components';
import { useDidMount } from '@mypreview/unicorn-react-hooks';
import map from 'lodash/map';

/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { Gallery } from './components';
import Constants from './constants';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see 	  https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param 	  {Object}         props    		 	  Component properties.
 * @param 	  {Object} 	       props.attributes    	  Available block attributes and their corresponding values.
 * @param     {boolean}        props.isSelected		  Whether or not the block is currently selected.
 * @param     {Function}       props.setAttributes    Function to update individual attributes based on user interactions.
 * @return    {JSX.Element} 			  			  Component to render.
 */
function Edit( { attributes, isSelected, setAttributes } ) {
	const { ids, images, options, sizeSlug } = attributes;
	const blockProps = useBlockProps();
	const className = blockClassName( blockProps?.className );
	const handleOnChange = ( value ) => {
		setAttributes( { images: value } );

		if ( ifArray( value ) ) {
			setAttributes( { ids: map( value, ( { id } ) => parseInt( id, 10 ) ) } );
		}
	};

	useDidMount( () => {
		if ( ! sizeSlug ) {
			// To improve the performance, we use large size images by default except for blocks inserted before the
			// image size attribute was added, since they were loading full size images. The presence or lack of images
			// in a block determines when it has been inserted (before or after we added the image size attribute),
			// given that now it is not possible to have a block with images and no size.
			setAttributes( { sizeSlug: ids.length ? 'full' : 'large' } );
		}
	} );

	return (
		<div { ...blockProps }>
			<Gallery className={ className } images={ images } options={ options } />
			<GalleryUpload
				ids={ ids }
				isSelected={ isSelected }
				messages={ Constants.MESSAGES }
				onChange={ handleOnChange }
				sizeSlug={ sizeSlug }
				value={ images }
				withFileUpload={ false }
			/>
		</div>
	);
}

export default Edit;
