/* HTML ELEMENTS */
const filterSelect = document.getElementById('filter');
const cardContainer = document.querySelector('.card-container');
const colorSelect = document.getElementById('colors');
const fontAwesomeSelect = document.getElementById('font-awesome');
const fontAwesomeCDN = document.getElementById('font-awesome-CDN');

/* Math functions */
const randomInt = (min, max) => Math.floor(Math.random() * max + min); //Max excluded
const randomHexColor = () => {
	let randomHex = '#';
	while (randomHex.length < 7) {
		randomHex += randomInt(0, 16).toString(16);
	}
	return randomHex;
}

/* Create an array with every different type + all
	Used for type filter option creation */
const iconsTypeArr = ['all'];
iconsBase.forEach(icon => {if (!iconsTypeArr.includes(icon.type)) iconsTypeArr.push(icon.type)});

const iconsArr = [
	{array: iconsBase, 										 option: 'base'},
	{array: iconsBase.map(icon => icon = {...icon}), option: 'random'}
];
iconsArr[1].array.forEach(ele => ele.color = randomHexColor()); //Change colors into random ones

function FontAwesomeVersion(version) {
	this.version = version;
	this.href = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/${this.version}/css/all.min.css`
}
const fontAwesome = [new FontAwesomeVersion('5.15.4'), new FontAwesomeVersion('6.0.0')];

iconsArr.forEach((obj, index) => colorSelect.append(optionCreator(obj.option, index)));
iconsTypeArr.forEach((type, index) => filterSelect.append(optionCreator(type, index)));
fontAwesome.forEach((ele, index) => fontAwesomeSelect.append(optionCreator(ele.version, index)));

function optionCreator(innerHTML, index) {
	const option = document.createElement('option');
	option.value = index;
	option.innerHTML = innerHTML;
	return option;
}

filterSelect.addEventListener('change', renderCards);
colorSelect.addEventListener('change', renderCards);

fontAwesomeSelect.addEventListener('change', function () {
	const family =  this.value == 0 ? 'fas' : 'fa-solid';
	fontAwesomeCDN.href = fontAwesome[this.value].href;
	iconsArr.forEach(obj => {
		obj.array.map(icon => {
			icon.family = family;
		})
	})
	renderCards();
});

function renderCards() {
	cardContainer.innerHTML = '';
	const icons = iconsArr[colorSelect.value].array;
	
	if (filterSelect.value == 0) icons.forEach(icon => cardCreator(icon));
	else {
		const filteredCards = icons.filter(icon => {
			return icon.type == iconsTypeArr[filterSelect.value];
		});
		filteredCards.forEach(ele => cardCreator(ele));
	}
}

function cardCreator(icon) {
	const card = document.createElement('div');
	card.classList.add('card');
	card.innerHTML = `
	<i class="${icon.family} ${icon.prefix}${icon.name}" style="color: ${icon.color}"></i>
	<div>${icon.name}</div>
	`;
	cardContainer.append(card);
}

/* Default render */
renderCards();