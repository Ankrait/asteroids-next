export const numberWithSpaces = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const getEndingForm = (value: number): string => {
	if (value > 100) return getEndingForm(value % 100);

	if (
		value === 0 ||
		(value >= 5 && value <= 20) ||
		(value % 10 >= 5 && value % 10 <= 9) ||
		value % 10 === 0
	) {
		return 'ов';
	} else if (value === 1 || value % 10 === 1) {
		return '';
	} else {
		return 'а';
	}
};