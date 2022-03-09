/* HTML ELEMENTS */
const filterSelect = document.getElementById('filter');
const cardContainer = document.querySelector('.card-container');
const colorSelect = document.getElementById('colors');

const iconsRandomColor = iconsBase.map(ele => ele = {...ele});
iconsRandomColor.forEach(ele => {
	ele.color = randomHexColor();
});

const iconsArr = [{array: iconsBase, type: 'base'}, {array: iconsRandomColor, type: 'random'}];

iconsArr.forEach((ele, index) => colorSelect.append(optionCreator(ele.type, index)));

const iconsTypeArr = ['all'];

iconsBase.forEach(icon => {
	if (!iconsTypeArr.includes(icon.type)) {
		iconsTypeArr.push(icon.type);
	}
});

colorSelect.addEventListener('change', renderCards);

iconsTypeArr.forEach((type, index) => filterSelect.append(optionCreator(type, index)));

function optionCreator(innerHTML, index) {
	const option = document.createElement('option');
	option.value = index;
	option.innerHTML = innerHTML;
	return option;
}

function renderCards() {
	const icons = iconsArr[colorSelect.value].array;
	cardContainer.innerHTML = '';
	if (filterSelect.value == 0) icons.forEach(icon => renderCard(icon));
	else {
		const filteredCards = icons.filter(icon => {
			return icon.type == iconsTypeArr[filterSelect.value];
		});
		filteredCards.forEach(ele => renderCard(ele));
	}
}

renderCards();

function renderCard(icon) {
	const card = document.createElement('div');
	card.classList.add('card');
	card.innerHTML = `
		<i class="${icon.family} ${icon.prefix}${icon.name}" style="color: ${icon.color}"></i>
		<div>${icon.name}</div>
	`;
	cardContainer.append(card);
}

filterSelect.addEventListener('change', renderCards);

function randomHexColor() {
	return `#${randomInt(0, 16777215).toString(16)}`;
}

function randomInt(min, max) {
	const randomNumber = Math.floor(Math.random() * max + min);
	return randomNumber;
}