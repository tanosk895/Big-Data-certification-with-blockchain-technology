# Big Data Certification with Blockchain
#### This project is a case study and is an integral part of a thesis focused on analyzing big data management with blockchain technology.
### Problem
#### Scalability is one of the fundamental issues that blockchains must address. It refers to the system's ability to handle a growing number of transactions or users without compromising performance, security, or decentralization. Therefore, it's important to keep the infrastructure lightweight.
 #### Analysis
### A dam has several IoT sensors that transmit data to the central station. These sensors transmit information about the dam's water level every second. Additionally, a further device, a camera, records the entire day, and the generated .mp4 file must then be saved. A third-party entity, such as a research company, must be able to verify that these files have not been tampered with over time.
### Solution
#### The proposed solution allows for saving data within a filesystem, followed by the generation of the data's hash, which is then stored on the blockchain. The hash serves as a tool to ensure the immutability of the information over time. The blockchain structure itself enables the certification of data, as its structure preserves important properties such as:

- non-modifiable.
- Non-repudiation of the data.
- Non-fungibility of the data over time.

There are two types of big data: Volume Data and Frequency Data. Optimization is carried out on these aspects because the information transmitted every second by the devices is saved every minute on the blockchain, while voluminous data is saved outside the blockchain, but a reference to it is maintained on the blockchain.
Prerequisites:
Hyperledger Firefly Supernode (The installation mechanism of the Firefly supernode is not explained in this repository. I delegate this task to the official documentation: Hyperledger Firefly. The only process to be performed is deploying the HashStorage.sol contract on the blockchain for the project to function correctly.)
- Node.js environment
- npm package manager.
- Install Nest CLI globally.

![image](/images_for_md/workflow%20store%20and%20certification%20big%20data.png)


The sequence diagram describes a process involving a dam controller, a backend system, a blockchain, and a dam altitude sensor. It relates to the monitoring and potentially certifying data related to the dam's altitude. Here's a translation into English:

Dam Altitude Sensor (Actor): This sensor actively monitors the dam's altitude.

Backend (System): The backend system receives data from the dam altitude sensor. Upon receiving the data, it triggers an action to transmit a message that will be displayed by the controller and sent to the blockchain.

Dam Controller (Actor): The dam controller receives the message transmitted by the backend system. This message contains information about the dam's altitude or related data.

Blockchain (System): The backend system interacts with a blockchain to store and certify data related to the dam's altitude. It transmits the received message to the blockchain.

Blockchain (System): Upon receiving the message from the backend system, the blockchain system saves the data. This involves securely storing them and certifying them using blockchain technology to ensure their immutability and traceability.

Installation:
To download the libraries, run npm install

Execution
To download the libraries, run npm run start,






# Certificazione dati massivi con blockchain

#### Questo progetto è un caso di studio ed è parte integrante di una tesi incentrata sull'analisi della gestione dei dati massivi con la tecnologia blockchain.

### Problema
#####  La scalabilità è uno dei problemi fondamentali che le blockchain devono affrontare. Si riferisce alla capacità del sistema di gestire un crescente numero di transazioni o utenti senza compromettere le prestazioni, la sicurezza o la decentralizzazione. è quindi importante mantenere l'infrastruttura leggera.

### Analisi
##### Una diga ha diversi <u>sensori Iot che trasmettono alla centrale dei dati </u>, tale sensori <u>trasmettono</u> informazioni del livello della diga <u>ogni secondo</u>. Un ulteriore dispositivo, una videocamera registra l'intera giornata, il file .mp4 generato, deve essere poi salvato. <u> Un ente terzo come </u>, ad esempio, un'azienda di ricerca, deve poter <u>verificare che non siano stati modificati nel tempo</u>.

### Soluzione 
##### La soluzione proposta permette di poter salvare dati all'interno di un filesystem, viene in seguito generato l'hash del dato e salvato su blockchain. L'hash sarà uno strumento utile per garantire la non modificabilità dell'informazione nel tempo. la struttura blockchain invece permette di garantire la certificazione dei dati, in quanto la sua struttura conserva importanti proprietà come :

* non modificabilità.
* Non ripudiabilità del dato.
* non Traslabilità del dato nel tempo.

##### Abbiamo 2 tipi di dati massivi: Dati massivi in Volume, e dati massivi in Frequenza, l'ottimizzazione viene effettuata su questi aspetti in quanto le informazioni trasmesse ogni secondo dai dispositivi vengono salvati ogni minuto su blockchian, mentre i dati voluminosi vengono salvati al di fuori della blockchain, mantendo però un riferimento di esso su blockchain.


###### Prerequisiti:
- Superdono Hyperledger Firefly ( In questa depository non viene spiegato il meccanismo di installazione del supernodo firefly, delego alla documentazione ufficiale questo compito: https://hyperledger.github.io/firefly/, l'unico processo da dover effettuare è il deploy del contratto HashStorage.sol su Blockchian per il corretto funzionamento del progetto )
- Ambiente Node.js
- `npm` gestore di pacchetti.
- Installa Nest CLI Globalmente.


![image](/images_for_md/workflow%20store%20and%20certification%20big%20data.png)

il sequence Diagram descrive un processo che coinvolge un controllore di diga, un sistema backend, una blockchain e un sensore di altitudine della diga. E' correlato al monitoraggio e, eventualmente, alla certificazione dei dati relativi all'altitudine della diga. Ecco una traduzione in italiano:

Sensore di Altitudine della Diga (Attore): Questo sensore monitora attivamente l'altitudine della diga.

Backend (Sistema): Il sistema backend riceve dati dal sensore di altitudine della diga. Al ricevere i dati, attiva un'azione per trasmettere un messaggio che verrà visualizzato dal controllore e inviato alla blockchain.

Controllore della Diga (Attore): Il controllore della diga riceve il messaggio trasmesso dal sistema backend. Questo messaggio contiene informazioni sull'altitudine della diga o dati correlati.

Blockchain (Sistema): Il sistema backend interagisce con una blockchain, per memorizzare e certificare i dati relativi all'altitudine della diga. Trasmette il messaggio ricevuto alla blockchain.

Blockchain (Sistema): Al ricevere il messaggio dal sistema backend, il sistema blockchain salva i dati. Ciò comporta il loro archivio in modo sicuro e, la loro certificazione tramite tecnologia blockchain per garantirne l'immutabilità e la tracciabilità.



###### Installazione:

  Per scaricare le librerie `npm install`

###### Esecuzione 
Per scaricare le librerie `npm run start`, 
