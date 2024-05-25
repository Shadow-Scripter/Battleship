import leftArrow from '../assets/left-arrow.png';
import rightArrow from '../assets/right-arrow.png';

// sets display style of all 'first start page' elements to FLEX
function displayFirstPageElements () {
    const playerOrBotContainer = document.getElementById('player-or-bot-container');
    const next = document.getElementById('next');
    playerOrBotContainer.style.display = 'flex';
    next.style.display = 'flex';
}

// sets display style of all 'second start page' elements to FLEX
function displaySecondPageElements () {
    const back = document.getElementById('back');
    const inputs = document.getElementById('inputs');
    back.style.display = 'flex';
    inputs.style.display = 'flex';
}

// sets display style of all 'first start page' elements to NONE
function hideFirstPageElements () {
    const playerOrBotContainer = document.getElementById('player-or-bot-container');
    const next = document.getElementById('next');
    playerOrBotContainer.style.display = 'none';
    next.style.display = 'none';
}

// sets display style of all 'second start page' elements to NONE
function hideSecondPageElements () {
    const back = document.getElementById('back');
    const inputs = document.getElementById('inputs');
    back.style.display = 'none';
    inputs.style.display = 'none';
}

// shows 'first page' and hides 'second page' 
function displayFirstPage () {
    displayFirstPageElements();
    hideSecondPageElements();
}

// shows 'second page' and hides 'first page' 
function displaySecondPage () {
    hideFirstPageElements();
    displaySecondPageElements();
}

// creates button back (to go back of the start screen choice) OR
// creates button next (to go to the next start screen choice)
function createBackOrNextButton (arrowDirection, callback) {
    const startMain = document.getElementById('start-screen-container');
    const backOrNextArrow = document.createElement('button');
    const arrow = document.createElement('img');
    
    arrow.src = arrowDirection;
    
    if (arrowDirection === leftArrow) {
        backOrNextArrow.setAttribute('id', 'back');
        backOrNextArrow.addEventListener('click', () => displayFirstPage());
    } else if (arrowDirection === rightArrow) {
        backOrNextArrow.setAttribute('id', 'next');
        backOrNextArrow.addEventListener('click', () => {
            displaySecondPage()
            const playerOrBot = document.querySelector('.active-play');
            callback(playerOrBot);
        });
    }
    
    backOrNextArrow.appendChild(arrow);
    startMain.appendChild(backOrNextArrow);
}

export {
    createBackOrNextButton
};