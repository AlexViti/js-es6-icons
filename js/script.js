/* HTML ELEMENTS */
const filterSelect = document.getElementById('filter');
const cardContainer = document.querySelector('.card-container');
const colorSelect = document.getElementById('colors');

/* Math functions */
const randomInt = (min, max) => Math.floor(Math.random() * max + min);
const randomHexColor = () => `#${randomInt(0, 16777215).toString(16)}`;

/* Create an array with every different type + all
	Used for type filter option creation
*/
const iconsTypeArr = ['all'];
iconsBase.forEach(icon => {
	if (!iconsTypeArr.includes(icon.type)) {
		iconsTypeArr.push(icon.type);
	}
});

const iconsArr = [
	{array: iconsBase, 									 option: 'base'},
	{array: iconsBase.map(ele => ele = {...ele}), option: 'random'}
];
iconsArr[1].array.forEach(ele => ele.color = randomHexColor()); //Change colors into random ones

iconsArr.forEach((obj, index) => colorSelect.append(optionCreator(obj.option, index)));
iconsTypeArr.forEach((type, index) => filterSelect.append(optionCreator(type, index)));

function optionCreator(innerHTML, index) {
	const option = document.createElement('option');
	option.value = index;
	option.innerHTML = innerHTML;
	return option;
}

colorSelect.addEventListener('change', renderCards);
filterSelect.addEventListener('change', renderCards);

renderCards();

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

function renderCard(icon) {
	const card = document.createElement('div');
	card.classList.add('card');
	card.innerHTML = `
		<i class="${icon.family} ${icon.prefix}${icon.name}" style="color: ${icon.color}"></i>
		<div>${icon.name}</div>
	`;
	cardContainer.append(card);
}