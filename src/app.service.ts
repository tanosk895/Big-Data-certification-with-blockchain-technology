import { Injectable } from '@nestjs/common';
import { WebsocketsGateway } from './gateway/websockets.gateway';
import { ApiService } from './firefly/firefly.service'; 
import * as crypto from 'crypto-js'; 
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';
import * as fs from 'fs';
import * as path from 'path';
momentTimezone.tz.setDefault('Europe/Rome');
// import { MerkleTreeService } from './MerkleTree/merkletree.service';
import { join } from 'path';
import { constrainedMemory } from 'process';
@Injectable()
export class AppService {
  constructor(private readonly randomNumberGateway:WebsocketsGateway,
              private readonly fireflyService: ApiService,
              // private readonly merkleTree: MerkleTreeService
              ) {}

  sendBlob():void {
    this.fireflyService.sendMessagePrivateBlob({ciao:"",hash:""})
  }

  async retriveData(hash:string):Promise<any> {
    const res = await this.fireflyService.getData();
    console.log('0x'.concat(hash));
    return res.includes('0x'.concat(hash));
  }
  
  sensorActiveTransactionMinute() {
    let data = []; 
    // Avvia un intervallo di esecuzione della funzione ogni secondo
    setInterval(async () => { 
        const min = 16;
        const max = 19;
        // Genera un numero casuale tra min e max
        const number = Math.random() * (max - min) + min; 
         // Arrotonda il numero a due cifre decimali
        const randomNumber = Number(number).toFixed(2);
        // Rimuove il punto decimale dal numero e lo memorizza come stringa
        let processedString = randomNumber.replace(/\./g, '');
        if (processedString.length < 4) { 
            processedString = '0'.concat(processedString); // Aggiunge zeri iniziali se la lunghezza della stringa è inferiore a 4
        } // Ottiene il timestamp attuale in millisecondi
        const date = momentTimezone(new Date()).millisecond(0).valueOf();
        const path = `./uploads/buffer${moment().format('DD-MM-YYYY HH:mm')}.json`; // Crea un percorso del file JSON includendo la data e l'ora attuali
        let content = await fs.promises.access(join(process.cwd(), path), fs.constants.F_OK).then(() => true).catch(() => false); // Controlla se il file esiste
        if (!content) {
            if(data.length !== 0) {
                let dataHahed = data.map((obj) => { return crypto.SHA256(JSON.stringify(obj)).toString(); }); // Calcola l'hash SHA-256 dell'oggetto dei dati
                let hashObj = { "input": { "hashes": dataHahed } }
                this.fireflyService.setStorageData(hashObj);
            }
        data = []; // Resetta l'array dei dati
        await fs.promises.appendFile(path, `[]`, 'utf8'); // Crea un nuovo file JSON vuoto
        }
        const theObj = {'level': randomNumber,'path':path, 'timestamp': date }; // Crea un oggetto contenente il livello del sensore e il timestamp
        data.push(theObj); // Aggiunge l'oggetto all'array dei dati
        const jsonString = JSON.stringify(data); // Converti l'array dei dati in una stringa JSON
        fs.promises.writeFile(path, jsonString); // Scrive la stringa JSON nel file
        this.randomNumberGateway.broadcastMessage([date, randomNumber]); // Trasmette il timestamp e il numero casuale a un gateway
    }, 1000); // Ogni secondo
  }

  sensorActiveTransactionForSecond() {
    let data = []; 
    // Avvia un intervallo di esecuzione della funzione ogni secondo
    setInterval(async () => { 
        const min = 16;
        const max = 19;
        // Genera un numero casuale tra min e max
        const number = Math.random() * (max - min) + min; 
         // Arrotonda il numero a due cifre decimali
        const randomNumber = Number(number).toFixed(2);
        // Rimuove il punto decimale dal numero e lo memorizza come stringa
        let processedString = randomNumber.replace(/\./g, '');
        if (processedString.length < 4) { 
            processedString = '0'.concat(processedString); // Aggiunge zeri iniziali se la lunghezza della stringa è inferiore a 4
        } // Ottiene il timestamp attuale in millisecondi
        const date = momentTimezone(new Date()).millisecond(0).valueOf();
        const path = `./uploads/buffer${moment().format('DD-MM-YYYY HH:mm')}.json`; // Crea un percorso del file JSON includendo la data e l'ora attuali
        let content = await fs.promises.access(join(process.cwd(), path), fs.constants.F_OK).then(() => true).catch(() => false); // Controlla se il file esiste
        if (!content) {
            if(data.length !== 0) {
                console.log(data);
                this.fireflyService.setStorageData(data);
            }
        data = []; // Resetta l'array dei dati
        await fs.promises.appendFile(path, `[]`, 'utf8'); // Crea un nuovo file JSON vuoto
        }
        const theObj = {'level': randomNumber,'path':path, 'timestamp': date }; // Crea un oggetto contenente il livello del sensore e il timestamp
        data.push(theObj); // Aggiunge l'oggetto all'array dei dati
        const jsonString = JSON.stringify(data); // Converti l'array dei dati in una stringa JSON
        fs.promises.writeFile(path, jsonString); // Scrive la stringa JSON nel file
        this.randomNumberGateway.broadcastMessage([date, randomNumber]); // Trasmette il timestamp e il numero casuale a un gateway
        const hash = crypto.SHA256(JSON.stringify(theObj)).toString(); // Calcola l'hash SHA-256 dell'oggetto dei dati
        let hashObj = { "input": { "_hash": hash } }; // Crea un oggetto contenente l'hash
        // this.fireflyService.SendTransaction(hashObj); // Invia l'hash a un servizio di transazione
    }, 1000); // Ogni secondo
}

async getAllDataCertificated(): Promise<any[]> {
            let data = [];
            const folderPath = "./uploads";
            const files = await fs.promises.readdir(folderPath);
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const filePath = path.join(folderPath, file);
                if (path.extname(file) === '.json') { // Verifica se il file è JSON
                    const fileContent = await fs.promises.readFile(filePath, 'utf8');
                    const jsonData = JSON.parse(fileContent);
                    data.push(...jsonData); // Aggiungi i dati JSON all'array data
                }
            }
            return data;
    }

    async uploadDataOnIpfs(file: any) {
        this.fireflyService.setStorageFile(file);
    }
}

