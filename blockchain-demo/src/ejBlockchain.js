import SHA256 from "crypto-js/sha256.js";

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
        return SHA256(nonHashedString).toString();
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
        console.log(blockchain);
    }
}

let blockchain = new Blockchain();

function restartBlockchain() {
    blockchain = new Blockchain();
    alert('Blockchain Restarted')
    console.log(blockchain);
}
const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", restartBlockchain)

const data = document.getElementById("data");
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
    const text = data.value;
    blockchain.addBlock(text);
});

// console.log(blockchain);