/**
	 * Devuelve un string con el resultado de las clases agregadas y eliminadas
	 * @param {string | array} baseClasses Nombre de las clases css a colocar por defecto
	 * @param {string | array} className Clases CSS a agregar baseClasess
	 * @param {string | array} removeCss Clasess CSS a eliminar, afecta a baseClasess
	 */
	function formatClassName(baseClasses, className, removeCss){
		// Convertimos el string de clases en un array
		if (typeof baseClasses == 'string') {
			baseClasses = baseClasses.replace('  ', ' ').trim().split(' ');
		}
		// Crear un array con los nombres de las clases CSS
		let cssClass = className ? className.replace('  ', ' ').trim().split(' ') : [];
		removeCss = removeCss ? removeCss.replace('  ', ' ').trim().split(' ') : [];
		//  Agregar las clases CSS del componente
		cssClass = [...cssClass, ...baseClasses];
		// Eliminar clases indicadas en el atributo [removeCss] y espacios en blanco
		cssClass = cssClass.filter(c => c.length > 0 && removeCss.indexOf(c) == -1 ? c : null);
		// Volver a crear un string con las clasess CSS
		cssClass = cssClass.join(' ');
		return cssClass;
	}

	export default formatClassName;