/**
 * @class Step
 * @version 1.0.0
 * @author alanjimenez -> Refactorized: Sergio
 * @summary Wizard Step
 */
import React from 'react';
import WithContext from '../../../../app/Context';

class Step extends React.Component {	

	render() {
		
		return (
			<form>
				{ this.props.children }
			</form>
		);

	}

	componentDidMount() {

		// Cuando el primer step se monté asignamos un delay para cambiar hacia otro Step
		const { getData, setData } = this.props.app.currentPage;
		if (getData('mounted') === true) {
			console.log("montado****")
			setTimeout(() => {				
				const currentStep = getData('currentStep') + 1;
				setData('currentStep', currentStep);
				setData('mounted', false);
			}, 5000);
		}

	}

}

export default WithContext(Step);