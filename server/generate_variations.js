const { ethers } = require('ethers');
const fs = require('fs');

const privateKey = '0xcbfcd227895ac5228c84de72fc6b83c51bb5074803a2c49c4a8b8153e07d605e';
const address = '0xd7ff9a09a145b5e41a59d779c86ca1e55a1a6f29';
const name = 'Ariel Alcuri';

async function main() {
    const wallet = new ethers.Wallet(privateKey);
    const variations = {};

    console.log('Generando variaciones para:', address);

    // 1. Firmar el NOMBRE (Ariel Alcuri)
    variations.signature_name = await wallet.signMessage(name);

    // 2. Firmar la DIRECCIÓN 
    variations.signature_address = await wallet.signMessage(address);

    fs.writeFileSync('bfa_variations.txt', JSON.stringify(variations, null, 2));
    console.log('Variaciones guardadas en bfa_variations.txt');

    console.log('\n--- COPIA ESTAS FIRMAS ---');
    console.log('OPCIÓN 1 (Si firmaste con el Nombre "Ariel Alcuri"):');
    console.log(variations.signature_name);
    console.log('\nOPCIÓN 2 (Si firmaste con la Dirección):');
    console.log(variations.signature_address);
}

main().catch(console.error);
