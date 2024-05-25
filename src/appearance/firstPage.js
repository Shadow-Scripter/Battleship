import swords from '../assets/sword.png';
import rightArrow from '../assets/right-arrow.png';
import { createBackOrNextButton } from './hideDisplayPages';
import SecondPage from './secondPage';
 
class FirstPage {
    constructor () {
        this.startMain = document.getElementById('start-screen-container');

        this.generateFirstStartPage();

        this.secondPage = new SecondPage();
    }

    // creates first start screen page with
    // choice between PlayerVSPlayer and PlayerVSBot
    generateFirstStartPage () {
        const body = document.querySelector('body');
        
        this.generatePlayerOrBotChoice();
        this.handlePlayerOrBotChange();
        
        createBackOrNextButton(rightArrow, (playerOrBot) => {
            this.secondPage.generateNameInput(playerOrBot.id);
            this.secondPage.displayButtons();
            this.secondPage.displayGameBoard();
        });
        
        body.appendChild(this.startMain);
    }

    // creates PlayerVSPlayer and PlayerVSBot containers
    // for first page
    generatePlayerOrBotChoice() {
        const playerOrBotContainer = document.createElement('div');
        const or = document.createElement('div');
        const playerVsRobot = this.#createPlayerOption('Player', 'Bot');

        playerOrBotContainer.setAttribute('id', 'player-or-bot-container');
        playerVsPlayer.classList.add('active-play');

        or.textContent = 'OR';
        or.setAttribute('id', 'or');
    
        playerOrBotContainer.appendChild(playerVsPlayer);
        playerOrBotContainer.appendChild(or);
        playerOrBotContainer.appendChild(playerVsRobot);
    
        this.startMain.appendChild(playerOrBotContainer);
    }

    // create options of WhoVSWho according to the 
    // passed attributes for first page
    #createPlayerOption(player1, player2) {
        const playerOption = document.createElement('div');
        const playerText1 = document.createTextNode(player1);
        const playerText2 = document.createTextNode(player2);
        const vsImg = document.createElement('img');

        playerOption.setAttribute('id', `${player1.toLowerCase()}-vs-${player2.toLowerCase()}`);
    
        vsImg.src = swords;
    
        playerOption.appendChild(playerText1);
        playerOption.appendChild(vsImg);
        playerOption.appendChild(playerText2);
    
        return playerOption;
    }

    // adds event listeners to PlayerVSPlayer and PlayerVSBot 
    // to change the class of the active one for first page
    handlePlayerOrBotChange () {
        const playerVsPlayer = document.getElementById('player-vs-player');
        const playerVsBot = document.getElementById('player-vs-bot');

        playerVsPlayer.addEventListener('click', () => {
            if (playerVsPlayer.class === undefined) {
                playerVsBot.classList.remove('active-play')
                playerVsPlayer.classList.add('active-play');
            }
        })

        playerVsBot.addEventListener('click', () => {
            if (playerVsBot.class === undefined) {
                playerVsPlayer.classList.remove('active-play')
                playerVsBot.classList.add('active-play');
            }
        })
    }
}

export default FirstPage;