const { ethers } = require('ethers');
const fs = require('fs');
const privateKey = '0xcbfcd227895ac5228c84de72fc6b83c51bb5074803a2c49c4a8b8153e07d605e';
const address = '0xd7FF9A09A145b5E41A59D779c86ca1E55a1a6f29';
const wallet = new ethers.Wallet(privateKey);

wallet.signMessage(address).then(sig => {
    fs.writeFileSync('bfa_signature.txt', sig);
    console.log('Firma guardada en bfa_signature.txt');
});
