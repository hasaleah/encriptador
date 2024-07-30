// Definiciones iniciales
const vowels = ['e', 'i', 'a', 'o', 'u'];
const code = ['enter', 'imes', 'ai', 'ober', 'ufat'];

document.getElementById('text-out').style.display = "none";

// Funciones de encriptado y desencriptado
function readMessage() {
    return document.querySelector('#texto-insertado').value;
}

function replaceC(message) {
    return message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function validateMessage(message) {
    if (!message || message.trim() === '') {
        document.getElementById('text-out').style.display = "none";
        document.getElementById('text-out-placeholder').style.display = "flex";
        return false;
    } else {
        document.getElementById('text-out-placeholder').style.display = "none";
        document.getElementById('text-out').style.display = "block";
        return true;
    }
}

function encryptText(message) {
    for (let i = 0; i < code.length; i++) {
        message = message.replaceAll(vowels[i], code[i]);
    }
    return message;
}

function decryptText(message) {
    for (let i = code.length - 1; i >= 0; i--) {
        message = message.replaceAll(code[i], vowels[i]);
    }
    return message;
}

function generateEncrypt(message) {
    document.getElementById('out-cod').value = message;
}

function showCopySuccess() {
    const box = document.querySelector('#copy_btn .copy_message');
    box.style.display = 'block';
    setTimeout(() => {
        box.style.display = 'none';
    }, 1500);
}

// Funciones de evento
function encrypting() {
    let message = readMessage();
    message = replaceC(message);
    if (validateMessage(message)) {
        message = encryptText(message);
        generateEncrypt(message);
    } else {
        showError();
    }
}

function decrypting() {
    let message = readMessage();
    message = replaceC(message);
    if (validateMessage(message)) {
        message = decryptText(message);
        generateEncrypt(message);
    } else {
        showError();
    }
}

function copyText() {
    try {
        const text = document.querySelector("#out-cod");
        text.select();
        document.execCommand("copy");
        showCopySuccess();
        document.querySelector('#texto-insertado').value = "";
        document.querySelector('#encriptar_btn').disabled = true;
        document.querySelector('#desencriptar_btn').disabled = true;
    } catch (error) {
        console.log(error);
    }
}

// Configuración de eventos y estado de botones
function toggleButtonsState() {
    const textInput = document.querySelector('#texto-insertado');
    const encryptButton = document.querySelector('#encriptar_btn');
    const decryptButton = document.querySelector('#desencriptar_btn');
    
    if (textInput.value.trim() === '') {
        encryptButton.disabled = true;
        decryptButton.disabled = true;
    } else {
        encryptButton.disabled = false;
        decryptButton.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#encriptar_btn').addEventListener('click', encrypting);
    document.querySelector('#desencriptar_btn').addEventListener('click', decrypting);
    document.querySelector('#copy_btn').addEventListener('click', copyText);
    document.querySelector('#texto-insertado').addEventListener('input', toggleButtonsState);
    toggleButtonsState();
});
