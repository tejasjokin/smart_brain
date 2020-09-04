import React from 'react';
import './Face.css';

const Face = ({imageUrl, box}) => {
	return(
		<div className = 'center ma mb'>
			<div className = 'absolute ma'>
				<img id = 'inputImage' alt = '' src = {imageUrl} width = "500px" height = "auto"/>
	        	<div className = 'bounding_box' style = {{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow,}}></div>        
        	</div>
		</div>
	);
}

export default Face;