const { ethers } = require('ethers');

const privateKey = '0xcbfcd227895ac5228c84de72fc6b83c51bb5074803a2c49c4a8b8153e07d605e';
const address = '0xd7ff9a09a145b5e41a59d779c86ca1e55a1a6f29';
const wallet = new ethers.Wallet(privateKey);

async function main() {
    const results = {};

    // 1. Dirección en minúsculas (Ya la probamos, pero por las dudas)
    results.sig_low = await wallet.signMessage(address);

    // 2. Dirección sin 0x
    results.sig_no0x = await wallet.signMessage(address.replace('0x', ''));

    // 3. Dirección como BYTES (Este es el que suele usar BFA para verificar)
    const bytes = Buffer.from(address.replace('0x', ''), 'hex');
    results.sig_bytes = await wallet.signMessage(bytes);

    console.log('--- RESULTADOS ---');
    console.log('SIG_LOW:', results.sig_low);
    console.log('SIG_NO0X:', results.sig_no0x);
    console.log('SIG_BYTES:', results.sig_bytes);
}

main();
