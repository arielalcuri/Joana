const { ethers } = require('ethers');
const fs = require('fs');

/**
 * Script para generar una identidad compatible con BFA
 */
function createBFAIdentity() {
    console.log('--- GENERANDO IDENTIDAD BFA ---');
    const wallet = ethers.Wallet.createRandom();

    const identity = {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase,
        blockchain: 'BFA (Blockchain Federal Argentina)'
    };

    console.log('DIRECCIÓN PÚBLICA:', identity.address);
    console.log('LLAVE PRIVADA:', identity.privateKey);
    console.log('-------------------------------');
    console.log('IMPORTANTE: Guarda la LLAVE PRIVADA en un lugar seguro.');
    console.log('Esta dirección es la que debes registrar en el portal de BFA.');

    // Opcionalmente guardar en un archivo temporal (luego lo borramos)
    fs.writeFileSync('bfa_identity.txt', JSON.stringify(identity, null, 2));
    console.log('\nDatos guardados en: bfa_identity.txt');
}

createBFAIdentity();
