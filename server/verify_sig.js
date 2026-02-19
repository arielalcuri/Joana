const { ethers } = require('ethers');
const sig = '0xc89e0303a8d9e461a94f15867d9d510379a1ffde1878cb24ad1352b10457b8b73b33e13231ab33f3c38ec866c256fdbaa2db5102dd6fe495508489e9add6489e1c';
const addr = '0xd7ff9a09a145b5e41a59d779c86ca1e55a1a6f29';
const bytes = Buffer.from(addr.replace('0x', ''), 'hex');
try {
    const recovered = ethers.utils.verifyMessage(bytes, sig);
    console.log('RECOVERED:', recovered);
    console.log('MATCH:', recovered.toLowerCase() === addr.toLowerCase());
} catch (e) {
    console.error(e);
}
