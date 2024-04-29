export const isoDateToLocalDate = (iso: string): string => {
	let date = '';
	try {
		var { 0: d } = new Date(iso).toLocaleString().split(', ');
		date = d;
	}
	catch(e){}

	return date;
}
export const isoDateToLocalTime = (iso: string): string => {
	let time = '';
	try {
		time = new Date(iso).toLocaleTimeString('ru', { timeStyle: 'short' });
	}
	catch(e){}
	return time;
}