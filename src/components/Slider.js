/**
 * External dependencies
 */
import { Splide } from '@splidejs/react-splide';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';

/**
 * Gallery slider wrapper.
 *
 * @param 	  {Object}          props    		  Component properties.
 * @param  	  {JSX.Element}     props.children    Any React element or elements can be passed as children. They will be rendered within the wrapper.
 * @param 	  {boolean} 	    props.isSave	  Whether the Component/function is meant to be rendered on the front-end.
 * @param 	  {Object} 	        ref    			  Enhancer used to enable passing a ref to its wrapped component.
 * @return    {JSX.Element} 			  		  Component to render.
 */
function Slider( { children, isSave, ...otherProps }, ref ) {
	return isSave ? (
		<div className="splide" role="group" { ...otherProps }>
			<div className="splide__track">
				<ul className="splide__list">{ children }</ul>
			</div>
		</div>
	) : (
		<Splide ref={ ref } { ...otherProps }>
			{ children }
		</Splide>
	);
}

Slider.propTypes = {
	children: PropTypes.element,
	isSave: PropTypes.bool,
};

Slider.defaultProps = {
	children: undefined,
	isSave: false,
};

export default forwardRef( Slider );
