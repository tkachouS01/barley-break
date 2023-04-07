let continueResultMinutes = 1; //отсчитывать от (+1)
let continueResultSeconds = 0; //отсчитывать от
//------------------------------------------------------------------------------------------------------------------------ БЛОК ЗАГОЛОВОК
let header = document.body.appendChild(document.createElement('header'));
//------------------------------------------------------------------------------------------------------------------------ БЛОК ВРЕМЯ ИГРЫ
let timeBlock = header.appendChild(document.createElement('div'));
timeBlock.className = "time-block";

//описание блока времени
let timeDescription = timeBlock.appendChild(document.createElement('span'));
timeDescription.className = "description";
timeDescription.innerHTML = "Время игры ";

//самО отображение времени
let timeStopwatch = timeBlock.appendChild(document.createElement('span'));
timeStopwatch.className = "time-stopwatch";
//------------------------------------------------------------------------------------------------------------------------ БЛОК СЧЁТЧИК ШАГОВ
let stepsBlock = header.appendChild(document.createElement('div'));
stepsBlock.className = "steps-block";

//описание блока счетчика шагов
let stepsDescription = stepsBlock.appendChild(document.createElement('span'));
stepsDescription.className = "description";
stepsDescription.innerHTML = "Шагов ";

//самО отобращение счётчика шагов
let numSteps = stepsBlock.appendChild(document.createElement('span'));
numSteps.className = "num-steps";
//------------------------------------------------------------------------------------------------------------------------ СОЗДАНИЕ КНОПКИ ПРИОСТАНОВИТЬ
let butPauseVisible = header.appendChild(document.createElement("button"));
butPauseVisible.appendChild(document.createTextNode("Приостановить игру"));
butPauseVisible.classList.add("but_Pause");
butPauseVisible.classList.add("hidden");
//------------------------------------------------------------------------------------------------------------------------ СОЗДАНИЕ КНОПКИ ПРОДОЛЖИТЬ
let butContinueVisible = header.appendChild(document.createElement("button"));
butContinueVisible.appendChild(document.createTextNode("Продолжить игру"));
butContinueVisible.classList.add("but_Pause");
butContinueVisible.classList.add("hidden");
//------------------------------------------------------------------------------------------------------------------------ ГЛАВНЫЙ БЛОК
let gameArea = document.body.appendChild(document.createElement('div'));
gameArea.className = "game-area";
//------------------------------------------------------------------------------------------------------------------------ ОБЪЯВЛЕНИЕ ГЛАВНЫХ ПЕРЕМЕННЫХ
//localStorage.clear();
let fieldDimension = localStorage.getItem('fieldDimension') == undefined ? 4 : localStorage.getItem('fieldDimension');//размерность игрового поля
let count = 0; //счётчик шагов
const sizeBlock = 500; //размер игрового поля
let currentLocation; //комбинация ячеек на данный момент (копия)
let savedGemes = []; //сохранённые игры (массив)
let winnings = []; //сохранённые победы


let overlayVisible; //вся область меню
let navContainer; //область навигации
let settingsContainer; //область настроек
let savedGamesContainer; //область сохранённых игр
let winningsContainer; //область победы
let lblTitl; //название раздела (общее для всех)

let btnNewGame; //кнопка меню
let btnSavedGames; //кнопка меню
let btnWinnings; //кнопка меню

let btnStartGame; //начать игру (в разделе настройки новой игры)
let btnGoBack; //кнопка вернуться назад
let btnSliderLeft; //лево (сохран.игры)
let btnSliderRight; //право (сохран.игры)
let dateResults; //(выигрыши)
let sizeResults; //(выигрыши)
let movesResults; //(выигрыши)
let timeResults; //(выигрыши)

let message; //сообщение о возможности сохранения игры (+кнопка)
let message2; //сообщение о сохранённной игре
//------------------------------------------------------------------------------------------------------------------------ ОЧИСТКА СЧЁТЧИКА И СЕККУНДОМЕРА
var clocktimer, resultMinutes, resultSeconds, ms;
var readout;
var h, m, tm, s, ts, init;
timePlaySaved();
function timePlaySaved() {
    h = 1; m = continueResultMinutes; tm = 1; s = continueResultSeconds; ts = 0;
}
clearTimeSteps();

function clearTimeSteps() {
    timeStopwatch.innerHTML = "00 : 00 ";
    numSteps.innerHTML = "0";
    continueResultMinutes = 1;
    continueResultSeconds = 0;
    h = 1, m = continueResultMinutes, tm = 1, s = continueResultSeconds, ts = 0;
    count = 0;
}
let boolRemoveMessege2 = false;
preparingTheGame(); //фон 
createNavMenu();
//------------------------------------------------------------------------------------------------------------------------ СОЗДАНИЕ ВСЕГО МЕНЮ
function createNavMenu() {
    overlayVisible = gameArea.appendChild(document.createElement('span'));
    overlayVisible.classList.add("overlay");
    overlayVisible.classList.add("active");
    createNavContainer();
    createSettingsContainer();
    createWinningsContainer();
    createSavedGamesContainer();
}
//------------------------------------------------------------------------------------------------------------------------ СОЗДАНИЕ НАВИГАЦИОННОГО МЕНЮ
function createNavContainer() {
    navContainer = overlayVisible.appendChild(document.createElement('div'));
    navContainer.classList.add("screen-container");
    navContainer.classList.add("active");
    navContainer.setAttribute("data-screen-name", "mainBlock");

    lblTitl = navContainer.appendChild(document.createElement('h2'));
    lblTitl.className = "lbl-sreen-title";
    lblTitl.innerHTML = "Главное меню";

    btnNewGame = navContainer.appendChild(document.createElement('button'));
    btnNewGame.className = "nav-btn";
    btnNewGame.appendChild(document.createTextNode('Новая игра'));

    btnSavedGames = navContainer.appendChild(document.createElement('button'));
    btnSavedGames.className = "nav-btn";
    btnSavedGames.appendChild(document.createTextNode('Сохранённые игры'));

    btnWinnings = navContainer.appendChild(document.createElement('button'));
    btnWinnings.className = "nav-btn";
    btnWinnings.appendChild(document.createTextNode('Выигрыши'));

}
//------------------------------------------------------------------------------------------------------------------------ СОЗДАНИЕ РАЗДЕЛА НАСТРОЙКИ
function createSettingsContainer() {
    settingsContainer = overlayVisible.appendChild(document.createElement('div'));
    settingsContainer.classList.add("screen-container");
    settingsContainer.classList.add("hidden");
    settingsContainer.setAttribute("data-screen-name", "settingsBlock");

    lblTitl = settingsContainer.appendChild(document.createElement('h2'));
    lblTitl.className = "lbl-sreen-title";
    lblTitl.innerHTML = "Настройки новой игры";

    let lblFieldSize = settingsContainer.appendChild(document.createElement('label'));
    lblFieldSize.className = "lbl-field-size";
    lblFieldSize.innerHTML = 'Размер игрового поля';

    //выбор размера игрового поля
    let selFieldSize = settingsContainer.appendChild(document.createElement('select'));
    selFieldSize.id = 'sel_field_size';
    for (let i = 3; i <= 8; i++) {
        let option = selFieldSize.appendChild(document.createElement('option'));
        option.textContent = i + "x" + i;
        option.value = i;
    }
    selFieldSize.value = fieldDimension;//на основе ранее выбранного

    btnStartGame = settingsContainer.appendChild(document.createElement('button'));
    btnStartGame.className = "btn-start-game";
    btnStartGame.appendChild(document.createTextNode('Начать'));
}
//------------------------------------------------------------------------------------------------------------------------ СОЗДАНИЕ РАЗДЕЛА ВЫИГРЫШИ
let selFieldSize2;
function createWinningsContainer() {
    //весь блок выигрыши
    winningsContainer = overlayVisible.appendChild(document.createElement('div'));
    winningsContainer.classList.add("screen-container");
    winningsContainer.classList.add("hidden");
    winningsContainer.setAttribute("data-screen-name", "winningsBlock");

    //название раздела
    lblTitl = winningsContainer.appendChild(document.createElement('h2'));
    lblTitl.className = "lbl-sreen-title";
    lblTitl.innerHTML = "Твои выигрыши";
}
//------------------------------------------------------------------------------------------------------------------------ СОЗДАНИЕ РАЗДЕЛА СОХРАН.ИГР
function createSavedGamesContainer() {
    savedGamesContainer = overlayVisible.appendChild(document.createElement('div'));
    savedGamesContainer.className = "screen-container";
    savedGamesContainer.classList.add("hidden");
    savedGamesContainer.setAttribute("data-screen-name", "savedGamesBlock");

    lblTitl = savedGamesContainer.appendChild(document.createElement('h2'));
    lblTitl.className = "lbl-sreen-title";
    lblTitl.innerHTML = "Твои сохранённые игры";
}

//-------------------------------------------------------------------------------------------------------------------- ОБРАБОТКА НОВАЯ ИГРА (РАЗДЕЛ)
btnNewGame.onclick = function () {
    if (boolRemoveMessege2) { message2.remove(); }
    createGoBack();

    navContainer.classList.remove("active");
    navContainer.classList.add("hidden");
    settingsContainer.classList.remove("hidden");
    settingsContainer.classList.add("active");
    lblTitl.innerHTML = "Настройки новой игры";
};
//-------------------------------------------------------------------------------------------------------------------- ОБРАБОТКА НАЧАТЬ ИГРУ
btnStartGame.onclick = function () {
    clearTimeSteps();
    butContinueVisible.classList.remove("active");
    butContinueVisible.classList.add("hidden");
    ClearingPlayingield();

    //получение выбранного пользователем размера игрового поля
    let sel = document.getElementById("sel_field_size");
    fieldDimension = sel.options[sel.selectedIndex].value;
    localStorage.setItem('fieldDimension', fieldDimension);

    overlayVisible.classList.remove("active");
    overlayVisible.classList.add("hidden");

    settingsContainer.classList.remove("active");
    settingsContainer.classList.add("hidden");
    btnGoBack.remove();

    butContinueVisible.classList.remove("active");
    butContinueVisible.classList.add("hidden");
    butPauseVisible.classList.remove("hidden");
    butPauseVisible.classList.add("active");

    StartStopStopwatch(0);
    preparingTheGame();
};
//-------------------------------------------------------------------------------------------------------------------- ОБРАБОТКА СОХР.ИГР (РАЗДЕЛ)
let noSavedGames;
let btnSlider;
let sliderContainer;
let loadGame;
btnSavedGames.onclick = function () {
    if (boolRemoveMessege2) { message2.remove(); }
    createGoBack();
    lblTitl.innerHTML = "Твои сохранённые игры";
    navContainer.classList.remove("active");
    navContainer.classList.add("hidden");
    savedGamesContainer.classList.remove("hidden");
    savedGamesContainer.classList.add("active");

    savedGemes = JSON.parse(localStorage.getItem("savedGemes"));

    if (noSavedGames != null) noSavedGames.remove();
    if (btnSlider != null) btnSlider.remove();
    if (sliderContainer != null) sliderContainer.remove();
    if (loadGame != null) loadGame.remove();

    if (savedGemes == null || savedGemes == undefined || savedGemes.length == 0) {
        noSavedGames = (savedGamesContainer.appendChild(document.createElement('span')));
        noSavedGames.className = "noSavedGames"; noSavedGames.innerHTML = "Сохранённых игр нет!";
    }
    else {

        btnSlider = savedGamesContainer.appendChild(document.createElement('div'));
        btnSlider.className = "btn-slider";

        btnSliderLeft = btnSlider.appendChild(document.createElement('button'));
        btnSliderLeft.classList.add("arrow-left");
        btnSliderLeft.classList.add("slider-arrow");
        btnSliderLeft.setAttribute("data-direction", "left");
        btnSliderLeft.appendChild(document.createTextNode("<"));
        let numberGemes = savedGemes.length;
        let numGemeInfo = btnSlider.appendChild(document.createElement('span'));
        numGemeInfo.innerHTML = "Количество игр: 1/" + numberGemes;

        btnSliderRight = btnSlider.appendChild(document.createElement('button'));
        btnSliderRight.classList.add("arrow-right");
        btnSliderRight.classList.add("slider-arrow");
        btnSliderRight.setAttribute("data-direction", "right");
        btnSliderRight.appendChild(document.createTextNode(">"));

        sliderContainer = savedGamesContainer.appendChild(document.createElement('div'));
        sliderContainer.className = "slider-container";
        let itemTemp = [];
        let gameDescription;

        if (loadGame != null || loadGame != undefined) loadGame.remove();
        for (let b = 0; b < numberGemes; b++) {
            itemTemp[b] = sliderContainer.appendChild(document.createElement('div'));
            itemTemp[b].classList.add("slider-item");
            if (b == 0) { itemTemp[b].classList.add("active"); itemTemp[b].setAttribute("data-direction", "0"); }
            else { itemTemp[b].classList.add("hidden"); itemTemp[b].setAttribute("data-direction", "+1"); }
            itemTemp[b].setAttribute("data-slide", b);

            gameDescription = itemTemp[b].appendChild(document.createElement('div'));
            gameDescription.className = "game-description";

            let info = gameDescription.appendChild(document.createElement('div'));
            info.className = "info";

            info.appendChild(document.createElement('div')).innerHTML = "Поле " + savedGemes[b].fieldDimension + "x" + savedGemes[b].fieldDimension;
            info.appendChild(document.createElement('div')).innerHTML = "Время " + savedGemes[b].readout;
            info.appendChild(document.createElement('div')).innerHTML = "Ходов " + savedGemes[b].count;
        }
        loadGame = savedGamesContainer.appendChild(document.createElement('button'));
        loadGame.classList.add("nav-btn");
        loadGame.classList.add('load');
        loadGame.appendChild(document.createTextNode('Продолжить игру'));
        let currentPosition = 0;


        checkedPositions();
        btnSliderLeft.onclick = function () {
            checkedPositions();
            itemTemp[currentPosition].setAttribute("data-direction", "-1");
            itemTemp[currentPosition].classList.remove("active");
            itemTemp[currentPosition].classList.add("hidden");
            currentPosition--;
            checkedPositions();
            numGemeInfo.innerHTML = "Количество игр: " + (currentPosition + 1) + "/" + numberGemes;
            itemTemp[currentPosition].setAttribute("data-direction", "-1");
            itemTemp[currentPosition].setAttribute("data-direction", "0");
            itemTemp[currentPosition].classList.remove("hidden");
            itemTemp[currentPosition].classList.add("active");
            checkedPositions();
        }

        btnSliderRight.onclick = function () {
            checkedPositions();
            itemTemp[currentPosition].setAttribute("data-direction", "+1");
            itemTemp[currentPosition].classList.remove("active");
            itemTemp[currentPosition].classList.add("hidden");
            currentPosition++;
            checkedPositions();
            numGemeInfo.innerHTML = "Количество игр: " + (currentPosition + 1) + "/" + numberGemes;
            itemTemp[currentPosition].setAttribute("data-direction", "+1");
            itemTemp[currentPosition].setAttribute("data-direction", "0");
            itemTemp[currentPosition].classList.remove("hidden");
            itemTemp[currentPosition].classList.add("active");
            checkedPositions();
        }

        function checkedPositions() {
            if (currentPosition == 0) {
                btnSliderLeft.disabled = true;
            }
            else {
                btnSliderLeft.disabled = false;
            }

            if ((currentPosition + 1) == numberGemes) {
                btnSliderRight.disabled = true;
            }
            else {
                btnSliderRight.disabled = false;
            }
        }

        loadGame.onclick = function () {
            btnGoBack.remove();
            savedGamesContainer.classList.remove("active");
            savedGamesContainer.classList.add("hidden");

            overlayVisible.classList.remove("active");
            overlayVisible.classList.add("hidden");

            butContinueVisible.classList.remove("active");
            butContinueVisible.classList.add("hidden");

            fieldDimension = savedGemes[currentPosition];


            parseSavedGeme(savedGemes[currentPosition].currentLocation, savedGemes[currentPosition].fieldDimension, currentPosition);
        }
    }
};
//------------------------------------------------------------------------------------------------------------------------ ПАРСИНГ МАССИВА СОХРАНЁННЫХ ИГР
function parseSavedGeme(tempArr, size, currentPosition) {
    let num = tempArr.length;
    let value = [];
    let numCurrentRow;
    for (let count = 0; count < num; count++) {
        numCurrentRow = (tempArr[count].top * size) + tempArr[count].left;
        value[numCurrentRow] = (tempArr[count].value - 1);
    }
    fieldDimension = size;
    ClearingPlayingield();
    count = savedGemes[currentPosition].count;
    readout = savedGemes[currentPosition].readout;

    savedGemes.splice(currentPosition, 1);
    localStorage.setItem("savedGemes", JSON.stringify(savedGemes));

    numSteps.innerHTML = count;
    butPauseVisible.classList.remove("hidden");
    butPauseVisible.classList.add("active");

    let tempTimes = readout.split(' : ');
    continueResultMinutes = Number.parseInt(tempTimes[0]) + 1; //отсчитывать от (+1)
    continueResultSeconds = Number.parseInt(tempTimes[1]);
    timePlaySaved();
    StartStopStopwatch(0);
    play(value, size ** 2);
}
//------------------------------------------------------------------------------------------------------------------------ СОЗДАНИЕ КНОПКИ НАЗАД
function createGoBack() {
    btnGoBack = overlayVisible.appendChild(document.createElement('button'));
    btnGoBack.className = "btn-nav-go-back";
    btnGoBack.appendChild(document.createTextNode('Вернуться в главное меню'));

    btnGoBack.onclick = function () {
        settingsContainer.classList.remove("active");
        settingsContainer.classList.add("hidden");
        winningsContainer.classList.remove("active");
        winningsContainer.classList.add("hidden");
        savedGamesContainer.classList.remove("active");
        savedGamesContainer.classList.add("hidden");

        navContainer.classList.remove("hidden");
        navContainer.classList.add("active");
        btnGoBack.remove();
    };
}
//-------------------------------------------------------------------------------------------------------------------- ОБРАБОТКА ВЫИГРЫШИ (РАЗДЕЛ)
let noWinnings;
let resultsContainer;
let parametersWinningsBlock;
btnWinnings.onclick = function () {
    if (boolRemoveMessege2) { message2.remove(); }
    winnings = [];
    createGoBack();

    navContainer.classList.remove("active");
    navContainer.classList.add("hidden");
    winningsContainer.classList.remove("hidden");
    winningsContainer.classList.add("active");

    winnings = JSON.parse(localStorage.getItem("winnings"));
    if (parametersWinningsBlock != null || parametersWinningsBlock != undefined) parametersWinningsBlock.remove();
    if (noWinnings != null) noWinnings.remove();
    if (winnings == null || winnings == undefined) {
        noWinnings = winningsContainer.appendChild(document.createElement('span'));
        noWinnings.className = "noWinnings"; noWinnings.innerHTML = "Ни одной игры не закончено!";
    }
    else {
        //
        parametersWinningsBlock = winningsContainer.appendChild(document.createElement('div'));
        parametersWinningsBlock.className = "param-winnings-block";

        let lblFieldSize2 = parametersWinningsBlock.appendChild(document.createElement('label'));
        lblFieldSize2.className = "lbl-field-size";
        lblFieldSize2.innerHTML = 'Размер игрового поля';

        let selFieldSize2 = parametersWinningsBlock.appendChild(document.createElement('select'));
        selFieldSize2.id = 'sel_field_size_winnings';
        for (let i = 3; i <= 8; i++) {
            let option2 = selFieldSize2.appendChild(document.createElement('option'));
            option2.textContent = i + "x" + i;
            option2.value = i;
        }
        selFieldSize2.value = fieldDimension;
        //

        displayWinnings(fieldDimension);
        selFieldSize2.addEventListener('change', function (e) { displayWinnings(e.target.value) })

        function displayWinnings(currentSize) {

            let tempWinnings = [];
            for (let i = 0; i < winnings.length; i++) {
                if (winnings[i].size == currentSize) {
                    tempWinnings.push(winnings[i]);
                }
            }

            if (noWinnings != null) noWinnings.remove();
            if (resultsContainer != null) resultsContainer.remove();

            if (tempWinnings != null && tempWinnings != undefined && tempWinnings.length != 0) {
                tempWinnings.sort(function (a, b) { return a.count > b.count });

                resultsContainer = winningsContainer.appendChild(document.createElement('div'));
                resultsContainer.className = "results";

                dateResults = resultsContainer.appendChild(document.createElement('div'));
                dateResults.className = "date";
                let subtitleDate = dateResults.appendChild(document.createElement('div'));
                subtitleDate.className = "subtitle";
                subtitleDate.innerHTML = "Дата";

                sizeResults = resultsContainer.appendChild(document.createElement('div'));
                sizeResults.className = "size";
                let subtitleSize = sizeResults.appendChild(document.createElement('div'));
                subtitleSize.className = "subtitle";
                subtitleSize.innerHTML = "Размер";

                movesResults = resultsContainer.appendChild(document.createElement('div'));
                movesResults.className = "moves";
                let subtitleMoves = movesResults.appendChild(document.createElement('div'));
                subtitleMoves.className = "subtitle";
                subtitleMoves.innerHTML = "Шагов";

                timeResults = resultsContainer.appendChild(document.createElement('div'));
                timeResults.className = "time";
                let subtitleTime = timeResults.appendChild(document.createElement('div'));
                subtitleTime.className = "subtitle";
                subtitleTime.innerHTML = "Время";

                let items;
                for (let i = 0; i < tempWinnings.length; i++) {
                    items = dateResults.appendChild(document.createElement('div'));
                    items.className = "item_" + (i + 1);
                    items.innerHTML = tempWinnings[i].date;

                    items = sizeResults.appendChild(document.createElement('div'));
                    items.className = "item_" + (i + 1);
                    items.innerHTML = tempWinnings[i].size;

                    items = movesResults.appendChild(document.createElement('div'));
                    items.className = "item_" + (i + 1);
                    items.innerHTML = tempWinnings[i].moves;

                    items = timeResults.appendChild(document.createElement('div'));
                    items.className = "item_" + (i + 1);
                    items.innerHTML = tempWinnings[i].time;
                }
            }
            else {
                noWinnings = winningsContainer.appendChild(document.createElement('span'));
                noWinnings.className = "noWinnings"; noWinnings.innerHTML = "Ни одной игры " + currentSize + "x" + currentSize + " не закончено!";
            }
        }
    }

};
//------------------------------------------------------------------------------------------------------------------------ СООБЩЕНИЕ О ПРИОСТАНОВКЕ ИГРЫ
let btnSaveGame;
function createMessageSave() {
    message = overlayVisible.appendChild(document.createElement('span'));
    message.className = "message";
    message.innerHTML = "игра приостановлена, сохранить её?  ";

    btnSaveGame = message.appendChild(document.createElement('button'));
    btnSaveGame.classList.add("nav-btn");
    btnSaveGame.classList.add("save");
    btnSaveGame.appendChild(document.createTextNode('сохранить игру'));

    btnSaveGame.onclick = function () {
        butContinueVisible.classList.remove("active");
        butContinueVisible.classList.add("hidden");

        savedGemes = JSON.parse(localStorage.getItem("savedGemes"));
        if (savedGemes == null || savedGemes == undefined || savedGemes.length == 0) { savedGemes = []; }
        savedGemes.push(
            {
                fieldDimension: fieldDimension,
                count: count,
                readout: readout,
                currentLocation: currentLocation
            });
        clearTimeSteps();
        localStorage.setItem("savedGemes", JSON.stringify(savedGemes));

        boolRemoveMessege2 = true;
        createMessageSaved();
    };
}
//------------------------------------------------------------------------------------------------------------------------ СООБЩЕНИЕ О СОХРАНЁННОЙ ИГРЕ
function createMessageSaved() {
    let elements = document.querySelectorAll('.message');
    for (let element of elements) {
        element.remove();
    }
    message2 = overlayVisible.appendChild(document.createElement('span'));
    message2.className = "message2";
    message2.innerHTML = "игра сохранена, для продолжения перейдите в раздел \"Сохранённые игры\"";
    message2.style.display = "block";
}
//------------------------------------------------------------------------------------------------------------------------ ОБРАБОТКА ПРИОСТАНОВКА ИГРЫ
butPauseVisible.onclick = function () {
    StartStopStopwatch(1);
    overlayVisible.classList.remove("hidden");
    overlayVisible.classList.add("active");

    navContainer.classList.remove("hidden");
    navContainer.classList.add("active");

    //
    settingsContainer.classList.remove("active");
    settingsContainer.classList.add("hidden");
    winningsContainer.classList.remove("active");
    winningsContainer.classList.add("hidden");
    savedGamesContainer.classList.remove("active");
    savedGamesContainer.classList.add("hidden");

    butPauseVisible.classList.remove("active");
    butPauseVisible.classList.add("hidden");

    butContinueVisible.classList.remove("hidden");
    butContinueVisible.classList.add("active");

    createMessageSave();
};
//------------------------------------------------------------------------------------------------------------------------ ОБРАБОТКА ПРОДОЛЖИТЬ ИГРУ
butContinueVisible.onclick = function () {
    if (btnGoBack != null) btnGoBack.remove();
    overlayVisible.classList.remove("active");
    overlayVisible.classList.add("hidden");

    butPauseVisible.classList.remove("hidden");
    butPauseVisible.classList.add("active");

    butContinueVisible.classList.remove("active");
    butContinueVisible.classList.add("hidden");
    StartStopStopwatch(0);

    message.remove();
};
//------------------------------------------------------------------------------------------------------------------------ ОЧИСТКА СЕКУНДОМЕРА
function ClearStopwatchBlock() {
    clearTimeout(clocktimer);
    init = 0;
    timeStopwatch.innerHTML = readout;
}
//------------------------------------------------------------------------------------------------------------------------ РАБОТА СУКУНДОМЕРА
function StartStopwatch() {
    s++;

    if (s >= (m * 60)) {
        ts = 0;
        m++;
    }

    else {
        ts = s;
        if (ts >= 60) {
            ts = ts - ((m - 1) * 60);
        }
    }

    if (m > (h * 60)) {
        tm = 1;
        h++;
    }
    else {
        tm = m;
        if (tm >= 60) {
            tm = tm - ((h - 1) * 60);
        }
    }
    if (ts > 0) {
        resultSeconds = ts;
        if (ts < 10) {
            resultSeconds = '0' + ts;
        }
    }
    else {
        resultSeconds = '00';
    }

    resultMinutes = tm - 1;

    if (resultMinutes > 0) {
        if (resultMinutes < 10) {
            resultMinutes = '0' + resultMinutes;
        }
    }
    else {
        resultMinutes = '00';
    }

    readout = resultMinutes + ' : ' + resultSeconds;
    timeStopwatch.innerHTML = readout;
    clocktimer = setTimeout("StartStopwatch()", 1000);
}
//------------------------------------------------------------------------------------------------------------------------ ЗАПУСК/ПАУЗА/СТОП СЕКУНДОМЕР
function StartStopStopwatch(init) {
    if (init == 0) {
        ClearStopwatchBlock();
        StartStopwatch();
        init = 1;
    }
    else {
        continueResultMinutes = resultMinutes;
        continueResultSeconds = resultSeconds;
        clearTimeout(clocktimer);
        init = 0;
    }
}
//------------------------------------------------------------------------------------------------------------------------ УДАЛЕНИЕ ВСЕХ ЯЧЕЕК
function ClearingPlayingield() {
    let elements = document.querySelectorAll('.cell');
    for (let element of elements) {
        element.remove();
    }
}
//------------------------------------------------------------------------------------------------------------------------ ПОДГОТОВКА К ИГРЕ
function preparingTheGame() {
    ClearingPlayingield();

    let numCells = fieldDimension ** 2;

    let numbers = [...Array(numCells).keys()]
        .sort(() => Math.random() - 0.5);
    play(numbers, numCells);
    //проверка комбинации
    if (CheckingCombination(numbers, numCells)) { play(numbers, numCells); }
    else { preparingTheGame(); }
    //проверка комбинации (-)
}
//------------------------------------------------------------------------------------------------------------------------ ПРОВЕРКА КОМБИНАЦИИ
function CheckingCombination(numbers, numCells) {
    let tempCell;
    let sum = 0;
    for (let f1 = 0; f1 < numCells; f1++) {
        tempCell = numbers[f1] + 1;
        for (let f2 = f1 + 1; f2 < numCells; f2++) {
            if (tempCell > (numbers[f2] + 1) && tempCell != numCells && ((numbers[f2] + 1) != numCells)) {
                sum++;
            }
        }
    }

    sum += ((numbers.indexOf(numCells - 1) - (numbers.indexOf(numCells - 1) % fieldDimension)) / fieldDimension) + 1;

    if (sum % 2 != 0) {
        return false;
    }
    return true;
}
//------------------------------------------------------------------------------------------------------------------------ СОЗДАНИЕ ИГРОВОГО ПОЛЯ
function play(numbers, numCells) {
    let cellSeze = sizeBlock / fieldDimension;
    let cells = [];
    let empty;
    for (let i = 0; i < numCells; i++) {
        let left = i % fieldDimension;
        let top = (i - left) / fieldDimension;
        let value = numbers[i] + 1;
        if ((numbers[i] + 1) != numCells) {
            let cell = gameArea.appendChild(document.createElement('div'));

            cells.push
                ({
                    left: left,
                    top: top,
                    value: value,
                    element: cell
                });

            cell.className = 'cell';

            cell.innerHTML = value;

            cell.style.left = `${left * cellSeze}px`;
            cell.style.top = `${top * cellSeze}px`;
            cell.style.width = `${cellSeze}px`;
            cell.style.height = `${cellSeze}px`;
            cell.style.fontSize = `${cellSeze * 0.6}px`;
            cell.style.borderRadius = `${cellSeze * 0.2}px`;

            cell.addEventListener('click', () => {
                move(i, cells, empty, cellSeze);
            });
            currentLocation = cells;

        }
        else {
            empty =
            {
                top: top,
                left: left,
                value: value
            };

            cells.push(empty);
        }
    }
}
//------------------------------------------------------------------------------------------------------------------------ ПЕРЕМЕЩЕНИЕ ЯЧЕЕК
function move(index, cells, empty, cellSeze) {
    let cell = cells[index];

    let leftDiff = Math.abs(empty.left - cell.left);
    let topDiff = Math.abs(empty.top - cell.top);

    if ((leftDiff + topDiff) > 1) {
        return;
    }

    cell.element.style.left = `${empty.left * cellSeze}px`;
    cell.element.style.top = `${empty.top * cellSeze}px`;

    let emptyLeft = empty.left;
    let emptyTop = empty.top;

    empty.left = cell.left;
    empty.top = cell.top;

    cell.left = emptyLeft;
    cell.top = emptyTop;

    count++;
    numSteps.innerHTML = count;

    let isFinished = cells.every(cell => {
        return cell.value === cell.top * fieldDimension + cell.left + 1;
    });

    if (isFinished) {
        StartStopStopwatch(1);
        let tempDate = new Date();


        winnings = JSON.parse(localStorage.getItem("winnings"));
        if (winnings == null) { winnings = []; }
        winnings.push(
            {
                date: tempDate.getFullYear() + "." + tempDate.getMonth() + "." + tempDate.getDate(),
                size: fieldDimension,
                moves: count,
                time: readout
            });
        localStorage.setItem("winnings", JSON.stringify(winnings));


        alert('Комбинация собрана. Время \"' + readout + '\" Количество шагов \"' + count + '\"');


        butPauseVisible.classList.remove("active");
        butPauseVisible.classList.add("hidden");
        overlayVisible.classList.remove("hidden");
        overlayVisible.classList.add("active");

        //
        settingsContainer.classList.remove("active");
        settingsContainer.classList.add("hidden");
        winningsContainer.classList.remove("active");
        winningsContainer.classList.add("hidden");
        savedGamesContainer.classList.remove("active");
        savedGamesContainer.classList.add("hidden");

        navContainer.classList.remove("hidden");
        navContainer.classList.add("active");
        clearTimeSteps();

    }
}