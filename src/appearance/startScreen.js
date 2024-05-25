import cruise from '../assets/cruise.png';
import FirstPage from './firstPage';

class StartScreen {
    constructor () {
        this.body = document.querySelector('body');

        this.startMain = document.createElement('div');
        this.startMain.setAttribute('id', 'start-screen-container');
        
        this.startHeader = document.createElement('div');
        this.startHeader.setAttribute('id', 'start-header');

        this.body.appendChild(this.startMain);

        this.createHeader();
        new FirstPage();
    }

    //  creates start screen header (BATTLESHIP)
    createHeader () {
        const startImg = document.createElement('img');
        const startText = document.createTextNode('BATTLESHIP');
        const startImg2 = document.createElement('img');

        startImg.src = cruise;
        startImg2.src = cruise;

        this.startHeader.appendChild(startImg);
        this.startHeader.appendChild(startText);
        this.startHeader.appendChild(startImg2);

        this.startMain.appendChild(this.startHeader);
    }
}

export default StartScreen;