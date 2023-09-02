import { NegotiationController } from "./controllers/NegotiationController";

const controller = new NegotiationController();

const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.addNegotiation();
    });
} else {
    throw Error('Não foi possível inicializar a aplicação. Verifique se o formulário existe.');
}

const importButton = document.querySelector('#botao-importa');
if (importButton) {
    importButton.addEventListener('click', () => {
        controller.importData();
    });
} else {
    throw Error('Botão importa não foi encontrado.');
}