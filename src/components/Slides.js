/**
 * External dependencies
 */
import { SplideSlide } from '@splidejs/react-splide';
import classnames from 'classnames';
import map from 'lodash/map';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { isBlobURL } from '@wordpress/blob';
import { RichText } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';

/**
 * Gallery slides.
 *
 * @param 	  {Object}         props    		  		 Component properties.
 * @param 	  {string} 	       props.className    		 Block specific CSS class name to add to the form wrapper tag.
 * @param 	  {Array} 	       props.images    	    	 Gallery images.
 * @param 	  {boolean} 	   props.isSave				 Whether the Component/function is meant to be rendered on the front-end.
 * @param 	  {Array} 	       props.withCaption    	 Whether the image caption should be rendered.
 * @param 	  {string} 	       props.wrapperClassName    CSS class name to be added to the wrapper tag/element.
 * @return    {JSX.Element} 			  		  		 Component to render.
 */
function Slides( { className, images, isSave, withCaption, wrapperClassName } ) {
	const Tag = isSave ? 'li' : SplideSlide;

	return map( images, ( { alt, caption, id, url } ) => (
		<Tag className={ wrapperClassName } key={ url }>
			<div className={ classnames( `${ className }__slide`, 'carousel-cell', isBlobURL( url ) && 'is-transient' ) }>
				<figure>
					<img alt={ alt } className={ classnames( `${ className }__image`, { [ `wp-image-${ id }` ]: id } ) } data-id={ id } src={ url } />
					{ isBlobURL( url ) && <Spinner /> }
					{ caption && withCaption && (
						<RichText.Content className={ classnames( `${ className }__caption`, 'gallery-caption' ) } tagName="figcaption" value={ caption } />
					) }
				</figure>
			</div>
		</Tag>
	) );
}

Slides.propTypes = {
	className: PropTypes.string,
	images: PropTypes.arrayOf(
		PropTypes.shape( { alt: PropTypes.string, caption: PropTypes.string, id: PropTypes.number, link: PropTypes.string, url: PropTypes.string } )
	),
	isSave: PropTypes.bool,
	withCaption: PropTypes.bool,
	wrapperClassName: PropTypes.string,
};

Slides.defaultProps = {
	className: undefined,
	images: [],
	isSave: false,
	withCaption: false,
	wrapperClassName: undefined,
};

export default Slides;
