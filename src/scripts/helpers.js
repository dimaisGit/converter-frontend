import moment from "moment";

export const  excelDateToJSDate = serial => {
    return moment('30.12.1899', 'DD-MM-YYYY').add(serial, 'days').format('DD-MM-YYYY');
}