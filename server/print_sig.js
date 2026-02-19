const { ethers } = require('ethers');
const privateKey = '0xcbfcd227895ac5228c84de72fc6b83c51bb5074803a2c49c4a8b8153e07d605e';
const address = '0xd7ff9a09a145b5e41a59d779c86ca1e55a1a6f29';
const wallet = new ethers.Wallet(privateKey);
async function main() {
    const bytes = Buffer.from(address.replace('0x', ''), 'hex');
    const sig = await wallet.signMessage(bytes);
    console.log('PART1:' + sig.substring(0, 66));
    console.log('PART2:' + sig.substring(66));
}
main();
