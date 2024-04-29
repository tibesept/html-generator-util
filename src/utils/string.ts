
export const getInitialsByFullName = (name: string, surname: string, patronymic: string): string => {
	return `${surname} ${name.charAt(0)}. ${patronymic.charAt(0)}.`
};


export const declineNew = (count: number): string => {
	if (count === 1) {
		return `${count} новый`;
	} else if (count > 1 && count < 5) {
		return `${count} новых`;
	} else {
		return `${count} новых`;
	}
}