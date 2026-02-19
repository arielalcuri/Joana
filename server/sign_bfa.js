const { ethers } = require('ethers');

// Tu llave privada generada anteriormente
const privateKey = '0xcbfcd227895ac5228c84de72fc6b83c51bb5074803a2c49c4a8b8153e07d605e';
const wallet = new ethers.Wallet(privateKey);

async function signMessage(message) {
    console.log('--- GENERANDO FIRMA DIGITAL ---');
    console.log('Mensaje a firmar:', message);

    const signature = await wallet.signMessage(message);

    console.log('\nTU FIRMA (SIGNATURE):');
    console.log(signature);
    console.log('-------------------------------');
}

// Cambia 'BFA' por el mensaje que te pida la web si es distinto
const messageToSign = process.argv[2] || 'BFA';
signMessage(messageToSign);
