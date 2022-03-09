/* HTML ELEMENTS */
const filterSelect = document.getElementById('filter');

const iconsTypeArr = [];

icons.forEach(icon => {
	if (!iconsTypeArr.includes(icon.type)) {
		iconsTypeArr.push(icon.type);
	}
});

console.log(iconsTypeArr);

iconsTypeArr.forEach(type => {
	const option = document.createElement('option');
	option.value = type;
	option.innerHTML = type;
	filterSelect.append(option);
})