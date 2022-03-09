/* HTML ELEMENTS */
const filterSelect = document.getElementById('filter');
const cardContainer = document.querySelector('.card-container');

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
});

icons.forEach(icon => renderCard(icon));

function renderCard(icon) {
	const card = document.createElement('div');
	card.classList.add('card');
	const iconEle = document.createElement('i');
	iconEle.classList = `${icon.family} ${icon.prefix}${icon.name}`;
	iconEle.style.color = icon.color;
	card.innerHTML = `
		${iconEle.outerHTML}
		<div>${icon.name}</div>
	`;
	cardContainer.append(card);
}