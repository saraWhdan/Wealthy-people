const btnAddUser = document.getElementById('btnAddUser');
const btnDoubleMoney = document.getElementById('btnDoubleMoney');
const btnShowMillionaires = document.getElementById('btnShowMillionaires');
const btnSort = document.getElementById('btnSort');
const btnCalculateTotal = document.getElementById('btnCalculateTotal');
const main = document.getElementById('main');

let persons = [];

// add the random person inside the main section
let addToDom = person => {
    let element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<span>${person.name}</span> <span>$${person.wealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>`;
    main.appendChild(element);

    // Remove total div if it is existing
    removeTotalDiv();
};

// get random person from external API
let getRandomUser = async () => {
    let res = await (await fetch('https://randomuser.me/api')).json();
    const person = {
        name: `${res.results[0].name.first} ${res.results[0].name.last}`,
        wealth: Math.floor(Math.random() * 1000000)
    };
    persons.push(person);
    addToDom(person);
};

let doubleMoney = async () => {    
    persons = persons.map(person => {
        return {name: person.name, wealth: person.wealth * 2}
    });
    refreshPersonsTable();
};

let showMillionaires = async () => {
    persons = persons.filter(person => person.wealth >= 1000000);
    refreshPersonsTable();
}

let sort = async () => {
    persons = persons.sort((person1, person2) => person2.wealth - person1.wealth)
    refreshPersonsTable();
}

let calculateTotal = async () => {
    removeTotalDiv();
    let totalWealth = persons.reduce((total, person) => (total += person.wealth), 0);
    let element = document.createElement('div');
    element.classList.add('total');
    element.innerHTML = `<span>Total</span> <span>$${totalWealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>`;
    main.appendChild(element);
}

btnAddUser.addEventListener('click', getRandomUser);
btnDoubleMoney.addEventListener('click', doubleMoney);
btnShowMillionaires.addEventListener('click', showMillionaires);
btnSort.addEventListener('click', sort);
btnCalculateTotal.addEventListener('click', calculateTotal);

const refreshPersonsTable = () => {
    main.innerHTML = '<h2><span>Person</span> Wealth</h2>';
    persons.forEach(person => addToDom(person));
};

const removeTotalDiv = () => {
    let totalDiv = document.getElementsByClassName('total')[0];
    if (totalDiv != null) {
        totalDiv.remove();
    }
};

