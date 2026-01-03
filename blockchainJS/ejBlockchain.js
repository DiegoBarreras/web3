const crypto = require('crypto');

class Block {
    constructor(index, data, prevHash, hash) {
        this.index = index;
        this.timestamp = Date.now();
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.hashCalc();
    }

    hashCalc() {
        const nonHashedString = this.index + this.timestamp + JSON.stringify(this.data) + this.prevHash;
        return crypto
            .createHash('sha256')
            .update(nonHashedString)
            .digest('hex');
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesis()];
    }

    createGenesis() {
        return new Block(0, 'Genesis Block', '');
    }

    lastBlock() {
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(data) {
        const newBlock = new Block(this.chain.length,data,this.lastBlock().hash);
        return this.chain.push(newBlock);
    }
}

const blockchain = new Blockchain();
blockchain.addBlock("el pepe");

console.log(blockchain);