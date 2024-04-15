import { Inject, Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js'; 

@Injectable()
export class MerkleTreeService {
    private leaves: any[];
    private rootHash: string;
  
    constructor(leaves: any[]) {
        this.leaves = leaves;
        this.rootHash = this.getRootHash();
    }
     setLeaves(...array:any[]) {
      this.leaves = array;
     }
    // Calcola l'hash Merkle Tree
    getRootHash(): string {
        return this.computeRootHash(this.leaves.map(data => JSON.stringify(data)));
    }
  
    // Calcola l'hash di un singolo nodo
    private hash(data: string): string {
        console.log(data+"\n\n");
        return CryptoJS.SHA256(data).toString();
    }
  
    // Calcola l'hash di un array di stringhe
    private computeRootHash(data: string[]): string {
        if (data.length === 1) {
            return this.hash(data[0]);
        }
  
        const nextLevel: string[] = [];
  
        for (let i = 0; i < data.length; i += 2) {
            const left = data[i];
            const right = i + 1 < data.length ? data[i + 1] : '';
            const combined = left + right;
            nextLevel.push(this.hash(combined));
        }
  
        return this.computeRootHash(nextLevel);
    }
  
    // Verifica se un dato è presente nel Merkle Tree
    isDataPresent(data: any): boolean {
        const leafHash = this.hash(JSON.stringify(data));
        return this.isHashPresent(this.rootHash, leafHash);
    }
  
    // Verifica ricorsivamente se un hash è presente nell'albero
    private isHashPresent(currentHash: string, targetHash: string): boolean {
        if (currentHash === targetHash) {
            return true;
        }
  
        // Se l'hash corrente è una foglia, non possiamo scendere ulteriormente nell'albero
        if (this.leaves.includes(currentHash)) {
            return false;
        }
  
        // Calcoliamo l'hash dei figli del nodo corrente
        const leftHash = this.hash(currentHash + 'left');
        const rightHash = this.hash(currentHash + 'right');
  
        // Verifichiamo se il targetHash è presente nei figli del nodo corrente
        return this.isHashPresent(leftHash, targetHash) || this.isHashPresent(rightHash, targetHash);
    }
  }
   