/**
 * External dependencies
 */
import { ifArray } from '@mypreview/unicorn-js-utils';
import { useDidMount } from '@mypreview/unicorn-react-hooks';

/**
 * WordPress dependencies
 */
import { ifCondition } from '@wordpress/compose';
import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Slider, Slides } from './';
import Constants from '../constants';

/**
 * Component for rendering gallery slider element.
 *
 * @param 	  {Object}         props    Component properties.
 * @return    {JSX.Element} 			Component to render.
 */
function Gallery( props ) {
	const mainRef = useRef();
	const thumbsRef = useRef();

	useDidMount( () => {
		if ( mainRef.current && thumbsRef.current && thumbsRef.current.splide ) {
			mainRef.current.sync( thumbsRef.current.splide );
		}
	} );

	return (
		<>
			<Slider options={ Constants.OPTIONS.main } ref={ mainRef }>
				<Slides { ...props } withCaption />
			</Slider>
			<Slider
				options={ Constants.OPTIONS.thumbs }
				ref={ thumbsRef }
				aria-label={ __( 'The carousel with thumbnails. Selecting a thumbnail will change the main carousel', 'gallery-thumbnails' ) }
			>
				<Slides { ...props } />
			</Slider>
		</>
	);
}

export default ifCondition( ( { images } ) => ifArray( images ) )( Gallery );
