import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onDetect }) => {
	return(
		<div className = "ma4 mt0">
			<p className = "f3">
				{'This magic brain will detect faces in your image. Give it a try.'}
			</p>
			<div className = "center">
				<div className = 'form center pa4 br4 o-90 shadow-5'>
					<input 
						className = "search f4 pa2 br2 w-70 center o-50" 
						type = 'text' 
						placeholder = "Enter your image url" 
						onChange = { onInputChange }
					/>
					<button 
					className = "w-30 grow ma1 f4 link ph3 pv2 dib white o-90 bg-light-purple br3" 
					onClick = {onDetect}>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
}	

export default ImageLinkForm;