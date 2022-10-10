/**
 * @version 1.0.0
 * @author alanjimenez
 * @summary Utilidades para manejo de fechas
 */

/**
 * Array con los nombres de todos los meses del año
 */
const AllMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/**
 * Array con todos los días de la semana
 */
const AllWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const DateUtils = {

    // #region VALORES GLOBALES DE FECHAS
    AllMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    AllMonthsES: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

    , AllWeekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    , AllWeekdaysES: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    
    , getStartOfMonth: (thedate) => new Date(thedate.getFullYear(), thedate.getMonth(), 1)

    , getEndOfMonth: (thedate) => new Date(thedate.getFullYear(), thedate.getMonth() + 1, 0)
    // #endregion / VALORES GLOBALES DE FECHAS


    // #region INFORMACIÓN DE CALENDARIO GREGORIANO
    /**
     * Devuelve los meses del año con la cantidad de caracteres a recibir. Sin parámetro ó con 0 devuelve el nombre del mes completo.
     * @param {int} nameLength Cantidad de caracteres del nombre del mes.
     */
    , getMonthName: (nameLength,lang) => {
        if (lang == "es"){
            //isNaN(nameLength) || nameLength == 0 ? DateUtils.AllMonthsES : DateUtils.AllMonthsES.map(month => month.substr(0, nameLength))
            return DateUtils.AllMonthsES.map(month => month.substr(0, nameLength))
        }else {
            //isNaN(nameLength) || nameLength == 0 ? DateUtils.AllMonths : DateUtils.AllMonths.map(month => month.substr(0, nameLength))
            return DateUtils.AllMonths.map(month => month.substr(0, nameLength))
        }        
    }

    /**
     * Devuelve los días de la semana con la longitud indicada. Sin parámetro o un 0 devuelve el nombre completo
     * @param {int} nameLength Longitud del nombre de la semana. El valor 0 lo devuelve completo
     */
    , getWeekdayName: (nameLength,lang) => {
        if (lang == "es"){
            isNaN(nameLength) || nameLength == 0 ? DateUtils.AllWeekdaysES : DateUtils.AllWeekdaysES.map(weekday => weekday.substr(0, nameLength))
            return DateUtils.AllWeekdaysES
        }else {
            isNaN(nameLength) || nameLength == 0 ? DateUtils.AllWeekdays : DateUtils.AllWeekdays.map(weekday => weekday.substr(0, nameLength))
            return DateUtils.AllWeekdays
        }
    }

    /**
     * Devuelve el nombre del mes a buscar
     * @param {string} monthname El nombre del mes a buscar
     */
    , getMonthNumber: (monthname) => {
        let searchResult = -1;
        if (monthname.length > 0) {
            // Convertir monthname al formato de AllMonths
            monthname = monthname[0].toUpperCase() + monthname.substr(1).toLowerCase();
            searchResult = DateUtils.getMonthName(monthname.length).indexOf(monthname);
        }
        return searchResult;
    }

    /**
     * Devuelve el número del día de la semana entre el 1 y el 7
     * @param {string} weekdayname Nombre del día de la semana a buscar
     */
    /*, getWeekdayNumber: (weekdayname) => {
        let searchResult = searchResult || -1;
        if (weekdayname.length > 0) {
          
            weekdayname = weekdayname[0].toUpperCase() + weekdayname.substr(1).toLowerCase();
            searchResult = DateUtils.getWeekdayName(weekdayname.length).indexOf(weekdayname);
        }
        return searchResult;
    }*/
    // #endregion / INFORMACIÓN DE CALENDARIO GREGORIANO


    // #region FUNCIONES DE FECHAS
    /**
    * Indica si el objeto o texto recibido es válido para generar un objeto fecha
    */
    , isValidDate: (thedate) => isNaN(Date.parse(thedate)) ? false : true

    /**
     * Formatea una cadena de texto, realizando reemplazos. YMD (para fechas: year, month, day). msht (Para tiempo: minute, second, hour, time(AM/PM))
     * @param {'date'} inputDate La fecha sobre la cual se realizaŕa el formato
     * @param {string} formatString El texto al que se le dará formato
     */
    , formatDate: (inputDate, formatString, startFromZero = false) => {
        if (DateUtils.isValidDate(inputDate)) {
            // Eliminar espacios en blanco adicionales
            if (typeof inputDate === 'string') {
                inputDate = inputDate.trim();
                // Separar la fecha y hora si los divide un espacio
                let dateparts = inputDate.split(' ')[0];
                dateparts = dateparts.split('-');
                dateparts.map((part, i) => dateparts[i] = parseInt(part));
                // Unir la fecha de nuevo
                let newDate = dateparts.map(part => part);
                newDate = newDate.join('-');
                // Asignarle un valor a InputDate
                inputDate = new Date(newDate);
            }

            let outputString = formatString;
            let month = inputDate.getMonth();
            month = startFromZero ? month : month + 1;
            let day = inputDate.getDate();
            let year = inputDate.getFullYear();
            let hour = inputDate.getHours();
            let minute = inputDate.getMinutes();
            let second = inputDate.getSeconds();

            // Variables para saber si ya se reemplazó un valor
            let yearReplaced = false;
            let monthReplaced = false;
            let dayReplaced = false;

            // Devuelve el año como 4 dígitos
            if (!yearReplaced && outputString.includes('YYYY')) {
                outputString = outputString.replace(/YYYY/g, year);
                yearReplaced = true;
            }
            // Devuelve el mes como un dígito
            if (!yearReplaced && outputString.includes('YY')) {
                outputString = outputString.replace(/YY/g, String(year).substr(2, 3));
                yearReplaced = true;
            }

            // Devuelve el día del mes como dos dígitos
            if (!dayReplaced && outputString.includes('DD')) {
                outputString = outputString.replace(/DD/g, day < 10 ? '0'.concat(day) : day);
                dayReplaced = true;
            }
            // Devuelve el día del mes como un dígito
            if (!dayReplaced && outputString.includes('D')) {
                outputString = outputString.replace(/D/g, day);
                dayReplaced = true;
            }

            // Devuelve el nombre del mes completo
            if (!monthReplaced && outputString.includes('MMMM')) {
                outputString = outputString.replace(/MMMM/g, DateUtils.getMonthName(0)[month]);
                monthReplaced = true;
            }
            // Devuelve el nombre del mes con 3 letras
            if (!monthReplaced && outputString.includes('MMM')) {
                outputString = outputString.replace(/MMM/g, DateUtils.getMonthName(3)[month]);
                monthReplaced = true;
            }
            // Devuelve el mes como dos dígitos
            if (!monthReplaced && outputString.includes('MM')) {
                outputString = outputString.replace(/MM/g, month < 10 ? '0'.concat(month) : month);
                monthReplaced = true;
            }
            // Devuelve el mes como un dígito
            if (!monthReplaced && outputString.includes('M')) {
                outputString = outputString.replace(/M/g, month);
                monthReplaced = true;
            }
            // Hora con dos decimales
            outputString = outputString.replace(/hh/g, hour < 10 ? '0'.concat(hour) : hour);
            // Hora con un decimal
            // outputString = outputString.replace(/h/g, hour);
            // Minutos con dos decimales
            outputString = outputString.replace(/mm/g, minute < 10 ? '0'.concat(minute) : minute);
            // Minutos con un decimal
            // outputString = outputString.replace(/m/g, minute);
            // Segundos con dos decimales
            outputString = outputString.replace(/ss/g, second < 10 ? '0'.concat(second) : second);
            // Segundos con un decimal
            // outputString = outputString.replace(/s/g, second);

            // Eliminar las letras no necesarias que se hayan incluido en el formato
            if (outputString.includes('h:m:s')) { outputString = outputString.replace(/h:m:s/g, ''); }
            if (outputString.includes('h:m')) { outputString = outputString.replace(/h:m/g, ''); }

            return outputString;
        } else {
            throw new Error('Input date does not meet the correct format, neither is a date object.')
        }
    }
    // #endregion / FUNCIONES DE FECHAS


    // #region CÁLCULOS DE FECHAS

    /**
     * Devuelve una fecha nueva con los cálculos hechos por la API de fechas de javascript
     * @param {'date'} inputDate La fecha sobre la que se harán los cálculos
     * @param {int} days Cantidad de días a sumar o restar
     * @param {int} months Número de meses a sumar o restar
     * @param {int} years Años a agregar o quitar a la fecha base
     */
    , alterDate: (inputDate, days, months, years) => {
        let day = isNaN(days) ? 0 : parseInt(days);
        let month = isNaN(months) ? 0 : parseInt(months);
        let year = isNaN(years) ? 0 : parseInt(years);
        let errorMessage = '';

        errorMessage = !DateUtils.isValidDate(inputDate) ? 'Invalid input date, enter a new Value. ' : '';
        errorMessage += isNaN(day) ? 'Day is NaN. ' : '';
        errorMessage += isNaN(month) ? 'Month is NaN' : '';
        errorMessage += isNaN(year) ? 'Year is NaN' : '';

        if (errorMessage.length > 0) {
            // Mostrar los errores cuando hay
            throw new Error(errorMessage);
        }

        // Calcular los días por sumar o restar
        day = inputDate.getDate() + day;
        month = inputDate.getMonth() + month;
        year = inputDate.getFullYear() + year;

        return new Date(year, month, day);
    }

    /**
     * Agrega o resta años a una fecha. Por defecto suma 1 año
     * @param {'date'} date La fecha base para el cálculo
     * @param {int} numberOfYears Cantidad de años a sumar a la fecha base
     */
    , addYears: (date, numberOfYears = 1) => DateUtils.alterDate(date, 0, 0, numberOfYears)

    /**
     * Agrega o resta los meses indicados a la fecha mencionada. Por defecto suma 1 mes
     * @param {'date'} date La fecha base para el cálculo
     * @param {int} numberOfMonths Cantidad de meses a agregar
     */
    , addMonth: (date, numberOfMonths = 1) => DateUtils.alterDate(date, 0, numberOfMonths)

    /**
     * Agrega o resta días a una determinada fecha. Por defecto suma 1 día
     * @param {'date'} date Fecha sobre la que calcular la suma
     * @param {int} numberOfDays Cantidad de días a agregar
     */
    , addDays: (date, numberOfDays = 1) => DateUtils.alterDate(date, numberOfDays)

    /**
     * Devuelve una nueva fecha con el año solicitado
     */
    , setYear: (date, newValue) => {
        let difference = date.getFullYear() - newValue;
        return DateUtils.alterDate(date, undefined, undefined, -difference);
    }

    , setMonth: (date, newValue) => {
        let difference = date.getMonth() - newValue;
        return DateUtils.alterDate(date, undefined, -difference);
    }

    , setDay: (date, newValue) => {
        let difference = date.getDate() - newValue;
        return DateUtils.alterDate(date, -difference);
    }
};
// #endregion / CÁLCULOS DE FECHAS

export default DateUtils;