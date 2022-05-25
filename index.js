/*  =================================
 *              FUNKCJE
 *  =================================
 *
 *  Żeby uniknąć bałaganu w kodzie wszystkie funkcje są deklarowane tutaj.
 *  W kodzie potem są te funkcje jedynie wywoływane.
 *
 */

// Funkcja inicjująca działanie zakładek i obługująca całą logikę ich działania
const initTabs = () => {
    const buttons = document.querySelectorAll(".tabs button");
    const cards = document.querySelectorAll(".card");
    console.log(buttons, cards);
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            cards.forEach((card) => {
                card.classList.remove("show")
            });
            cards[index].classList.add("show");
            buttons.forEach((button) => {
                button.classList.remove("active");
            });
            button.classList.add("active");
        });
    });
};

// Funkcja pobierająca wszystkich zawodników i przypisująca ich do tablicy "players"
const getPlayers = () => {
    rows.forEach((row, index) => {
        if(index > 0){
            players.push({
                surname: row.cells[0].textContent,
                name: row.cells[1].textContent,
                gender: row.cells[2].textContent,
                points: Number(row.cells[3].textContent),
            });
        }
    })
};

// Funkcja obliczająca i uzupełniająca wyniki dla wszystkich
const calcResultsAll = () => {
    let playersCount = players.length;
    let pointsSum = 0;
    let bestPlayer = players[0];

    players.forEach((player) => {
        pointsSum += player.points;
        if(bestPlayer.points < player.points){
            bestPlayer = player;
        };
    });
    
    const labelPlayersCount = document.querySelector("#uczestnicy-wszyscy");
    const labelPointsSum = document.querySelector("#punkty-wszyscy");
    const labelBestPlayer = document.querySelector("#najlepszy-wszyscy");

    labelPlayersCount.textContent = playersCount;
    labelPointsSum.textContent = pointsSum;
    labelBestPlayer.textContent = bestPlayer.name +" "+ bestPlayer.surname + " (" + bestPlayer.points + " pkt)";
};

// Funkcja obliczająca i uzupełniająca wyniki dla kobiet
const calcResultsWomen = () => {
    let playersCount = 0;
    let pointsSum = 0;
    let bestPlayer = players[0];

    players.forEach((player) => {
        if(player.gender == "K"){
            playersCount++;
            pointsSum += player.points;
            if(bestPlayer.points < player.points){
                bestPlayer = player;
            };
        };
    });
    
    const labelPlayersCount = document.querySelector("#uczestnicy-kobiety");
    const labelPointsSum = document.querySelector("#punkty-kobiety");
    const labelBestPlayer = document.querySelector("#najlepszy-kobiety");

    labelPlayersCount.textContent = playersCount;
    labelPointsSum.textContent = pointsSum;
    labelBestPlayer.textContent = bestPlayer.name +" "+ bestPlayer.surname + " (" + bestPlayer.points + " pkt)";
};

// Funkcja obliczająca i uzupełniająca wyniki dla mężczyzn
const calcResultsMen = () => {
    let playersCount = 0;
    let pointsSum = 0;
    let bestPlayer = players[0];

    players.forEach((player) => {
        if(player.gender == "M"){
            playersCount++;
            pointsSum += player.points;
            if(bestPlayer.points < player.points){
                bestPlayer = player;
            };
        };
    });
    
    const labelPlayersCount = document.querySelector("#uczestnicy-mezczyzni");
    const labelPointsSum = document.querySelector("#punkty-mezczyzni");
    const labelBestPlayer = document.querySelector("#najlepszy-mezczyzni");

    labelPlayersCount.textContent = playersCount;
    labelPointsSum.textContent = pointsSum;
    labelBestPlayer.textContent = bestPlayer.name +" "+ bestPlayer.surname + " (" + bestPlayer.points + " pkt)";
};

// const compare = (a,b) => { 
//     if (a.surname < b.surname){
//         return -1;
//     }
//     if (a.surname > b.surname){
//         return 1;
//     }
//     return 0;
// };

// Funkcja inicjująca działanie filtrowania po kolumnie "Nazwisko", tj. właściwości (property) obiektu "surname"
const initSortSurname = () => {
    const sortBtn = document.querySelector("#sort-nazwisko");
    sortBtn.addEventListener("click", () => {
        // players.sort(compare);
        clearTable();
        players.sort((a,b) => (a.surname > b.surname) ? 1 : ((b.surname > a.surname) ? -1 : 0));
        console.log(players);
        fillTable();
    });
};

const initSortName = () => {
    const sortBtn = document.querySelector("#sort-imie");
    sortBtn.addEventListener("click", () => {
        // players.sort(compare);
        clearTable();
        players.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        console.log(players);
        fillTable();
    });
};

const initSortGender = () => {
    const sortBtn = document.querySelector("#sort-plec");
    sortBtn.addEventListener("click", () => {
        // players.sort(compare);
        clearTable();
        players.sort((a,b) => (a.gender > b.gender) ? 1 : ((b.gender > a.gender) ? -1 : 0));
        console.log(players);
        fillTable();
    });
};

const initSortPoints = () => {
    const sortBtn = document.querySelector("#sort-punkty");
    sortBtn.addEventListener("click", () => {
        // players.sort(compare);
        clearTable();
        players.sort((a,b) => (a.points > b.points) ? 1 : ((b.points > a.points) ? -1 : 0));
        console.log(players);
        fillTable();
    });
};

const clearTable = () => {
    console.log(rows);
    rows.forEach((row, index) => {
        if(index > 0) row.remove();
    });
};

const fillTable = () => {
    players.forEach((player, index) => {
        const row = document.createElement("tr");

        const cellSurname = document.createElement("td");
        const cellName = document.createElement("td");
        const cellGender = document.createElement("td");
        const cellPoints = document.createElement("td");

        cellSurname.textContent = player.surname;
        cellName.textContent = player.name;
        cellGender.textContent = player.gender;
        cellPoints.textContent = player.points;

        row.appendChild(cellSurname);
        row.appendChild(cellName);
        row.appendChild(cellGender);
        row.appendChild(cellPoints);

        table.appendChild(row);
    });
};

// Funkcja która sortuje elementy. Przyjmuje dwa argumenty wejściowe:
// key: nazwa kolumny którą chcemy posortować
// order: sposób w jaki chcemy posortować elementy - rosnąco(asc) / malejąco(desc)
const sortElements = (key, order = "asc") => {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA =
            typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB =
            typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let porownanie = 0;
        if (varA > varB) {
            porownanie = 1;
        } else if (varA < varB) {
            porownanie = -1;
        }
        return order === "desc" ? porownanie * -1 : porownanie;
    };
};

// players.sort(sortElements("surname"));
// players.sort(sortElements("surname", "desc"));


/*  =================================
 *              LOGIKA
 *  =================================
 */

initTabs(); // Wywołanie funkcji która inicjuje działanie zakładek i obsługuje ich logikę

const table = document.querySelector("#zawodnicy-tabela").childNodes[1];
const rows = [...table.rows];
const players = [] // Deklaracja zmiennej "players" która będzie przetrzymywać obiekty z danymi każdego zawodnika

getPlayers(); // Wywołanie funkcji która uzupełnia tablicę "players" danymi z tabeli z DOM, (czyli z naszej tabeli z HTML'a)

// Obliczanie i uzupełnianie wyników
calcResultsAll();
calcResultsWomen();
calcResultsMen();

// Inicjowanie sortowania dla każdej kolumny
initSortSurname();
initSortName();
initSortGender();
initSortPoints();