const crypto = require('crypto');
const { diff } = require('util');
const { measureMemory } = require('vm');

class Block {
    constructor(index, data, prevHash) {
        this.index = index;
        this.timestamp = Date.now();
        this.data = data;
        this.prevHash = prevHash;
        this.nonce = 0;
        this.hash = this.hashCalc();
    }

    hashCalc() {
        const nonHashedString = this.index + this.timestamp + JSON.stringify(this.data) + this.prevHash + this.nonce;
        return crypto
            .createHash('sha256')
            .update(nonHashedString)
            .digest('hex');
    }

    mineBlock(difficulty) {
        const target = '0'.repeat(difficulty);
        console.time('Measured Time');

        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.hashCalc();
        }

        console.log(`Block succesfully mined! Hash: ${this.hash} Nonce: ${this.nonce}`);

        console.timeEnd('Measured Time');
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

        console.log('Mining a new block...')
        newBlock.mineBlock(5);

        this.chain.push(newBlock);
    }
}

const blockchain = new Blockchain();
blockchain.addBlock("el pepe");

console.log(blockchain);