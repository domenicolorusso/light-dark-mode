# LIGHT & DARK MODE 

 

## User Interface 

La commessa richiedeva la creazione di un app abbastanza semplice nel suo sviluppo, in virtù di questo ho deciso di optare per un design minimal ed elegante, utilizzando sfumature del nero e del bianco, ammiccando ad Apple. 

Nello specifico ho optato per il “neumorphism” per quanto riguarda i bottoni. 

Il design è intrinsecamente responsive, gli elementi della UI sono mantenuti al centro. 

Per una interazione più  piacevole ho usato uno switch che richiama iOS per passare da una modalità all’altra.  

Per una maggiore interazione ho creato un pulsante che apre e chiude la sezione delle statistiche. 

 

## Scelta delle tecnologie 

Ho scelto di non usare alcun tipo di framework, quindi il progetto è  stato sviluppato interamente in HTML, CSS, Javascript Vanilla. 

Essendo un frontender, ho deciso anche di utilizzare ciò che il browser mette a disposizione per simulare un DB, nello specifico ho utilizzato il Local Storage che permette di mantenere i dati nonostante il refresh della pagina. Per evitare che si continui ad aggiungere dati, ho aggiungo anche un bottone che pulisce il local storage dai dati salvati. 

 

## Sviluppo 

 

### dati 

Ho pensato a che tipo di dato utilizzare per salvare le interazioni dell’utente e la scelta è ricaduta su un array di oggetti, che mi avrebbe permesso di utilizzare i metodi tipici degli array per manipolare i dati. In questa maniera abbiamo una “fotografia” di ogni istante di interazione, utile anche per uno sviluppo di funzionalità aggiuntive tra le quali la scelta, da parte dell’utente, di un momento specifico dello stato dell’app e quindi la possibile visualizzazione dei dati. 

### funzionalità  

Non sapendo quale potesse essere una deadline adeguata per lo sviluppo dell’app ho optato per l’aggiunta di 3 funzionalità, l’app potrebbe comunque essere estesa ulteriormente. 

L’utente ha la possibilità di vedere quante volte ha cliccato sullo switch, lo stato precedente, quindi se Dark Mode o Light Mode e la media di click tra Light e Dark. 
 

###  switch 

Ogni volta che l’utente preme lo switch, chiama una callback anonima. 

Nella callback: 

si controlla se la variabile isDark sia true o false e in base a quello si richiama la funzione darkMode o lightMode 

si aggiorna il valore di howManyTimes che mostra quante volte l’utente ha cliccato sullo switch (il valore non è altro che la lunghezza dello state). 

si mostra la media di click tra Dark e Light attraverso la funzione averageClick che è un high order function che accetta gli ultimi valori dell’ultimo oggetto inserito e la funzione average che si occupa di fare la media. Questa soluzione può essere utile qualora volessimo utilizzare la funzione in altri casi d’uso. 

Nelle funzioni darkMode e lightMode: 

la variabile isDark cambia il suo stato e si chiamano le rispettive funzioni di rendering della UI (ho cercato di separare le funzioni in base alle loro funzionalità) 

nello state, si aggiunge un nuovo oggetto con i dati aggiornati 

viene aggiornato il Local Storage 

 

### clear state 

Ogni volta che l’utente preme il bottone clear state, chiama una callback anonima. 

Nella callback: 

Si eliminano i dati dal Local Storage 

Attraverso il metodo .splice() elimino i dati dallo state lasciando l’oggetto iniziale (i contatori iniziali saranno sempre uguali a 0) 

Aggiorno il Locale storage con il nuovo state 

Mostro in howManyTimes il nuovo valore (sarà sempre 0) 

Mostro in averageValueField il nuovo valore (sarà sempre 0) 

### handleMounted 

Quando la pagina viene caricata la prima volta e solo la prima volta si chiama la funzione handleMounted che permette di memorizzare i dati dal Local Storage allo state: 

Si assegna alla variabile session i valori presenti nel LocalStorage 

Se session è  vuoto si crea una nuova sessione aggiungendo i dati presenti nello state nel local storage 

Se session contiene dei dati il nuovo state sarà  dato dai dati presenti nel Local Storage 

Il nuovo state viene assegnato allo state dell’app 

Si aggiornano i dati che devono essere renderizzati 

### showStats 

Quando l’utente preme su showStats viene chiamata la funzione showHideStats. 

In showHideStats: 

Si controlla che il bottone abbia come contenuto testuale “Show Stats”, se true chiama handleShowStats che aggiunge una classe visible a statsWrapper e cambia il contenuto del bottone in “Hide Stats”, altrimenti, chiama handleHideStats che rimuove la sclasse visible da statsWrapper e cambia il contenuto del bottone in “Show stats” 
