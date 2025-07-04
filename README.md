GAMESHOP
🎮 GameDev Shop - Capstone Full Stack
GameDev Shop è una piattaforma e-commerce per videogiochi, sviluppata come progetto finale del corso Full Stack Web Developer.
Offre un'esperienza completa sia per gli utenti che per gli admin, con pagamenti integrati, sistema di recensioni, protezione delle rotte e notifiche via email.

✅ Completamente funzionante • ✅ Deploy-ready • ✅ Testato manualmente (front-end e back-end) • ✅ Copertura test automatica (front-end e back-end)

🚀 Funzionalità Principali
👤 Autenticazione Utente
Registrazione e login sicuri (JWT)

Verifica email via token

Reset password via email

Profilo modificabile con immagine (funzionalità di ritaglio inclusa) e nome utente.

Nota sulla Foto Profilo: In sviluppo locale, l'URL della foto profilo potrebbe puntare a un percorso temporaneo sul tuo server locale. In ambiente di produzione (dopo il deploy su Render/Netlify), le immagini profilo vengono caricate e gestite tramite Cloudinary, garantendo che siano persistenti e accessibili da qualsiasi dispositivo. L'URL della foto profilo viene quindi fornito dal backend deployato.

🛒 E-commerce Completo
Navigazione e filtri avanzati (genere, sistema, prezzo, disponibilità, ecc.)

Carrello persistente basato sull'utente loggato (ora risolto per isolamento e persistenza corretta)

Checkout sicuro via Stripe

Ricezione email di conferma per acquisto riuscito o avviso per pagamento fallito

Cronologia ordini completa e accessibile

🧑‍💻 Area Admin
Funzionalità CRUD (Create, Read, Update, Delete) completa per la gestione dei giochi

Creazione e modifica di giochi con upload di immagine personalizzata

Gestione di sezioni dedicate per DLC, Preordini e Giochi gratuiti

Pannello di amministrazione con lista giochi e funzionalità di ricerca avanzata

⭐ Recensioni
Sistema di rating e commenti per ogni gioco

Solo utenti autenticati possono lasciare recensioni

Possibilità per l'utente di modificare o cancellare le proprie recensioni

Gli amministratori possono rimuovere qualsiasi recensione

🌐 Tecnologie Utilizzate
Backend
Node.js + Express.js (Framework backend)

MongoDB + Mongoose (Database NoSQL e ORM)

JWT (JSON Web Tokens) + bcrypt (per autenticazione e sicurezza delle password)

Stripe API + Webhook (per la gestione dei pagamenti)

Nodemailer (per l'invio di email transazionali)

Cloudinary (per l'hosting e l'ottimizzazione delle immagini caricate)

Swagger (per la documentazione automatica delle API)
Nota su Swagger: Per garantire un deploy stabile del backend, la documentazione Swagger per alcune rotte (es. authRoutes.js) è stata temporaneamente disabilitata (commentata nei file delle rotte). Se si desidera visualizzare la documentazione completa tramite /api-docs, sarà necessario riattivare manualmente i blocchi di commento JSDoc agg un *  =  /* ... */,  =  /** ... */ ... */,  nei file delle rotte pertinenti. Si consiglia cautela nel farlo e di verificare l'indentazione YAML per evitare errori di deploy.

Jest + Supertest (per i test automatici di backend)

Ngrok (utilizzato in fase di sviluppo locale per esporre i webhook di Stripe, non necessario in produzione)

Frontend
React 19 + React Router DOM (Libreria UI e routing)

Context API (per la gestione dello stato globale di Autenticazione e Carrello)

Bootstrap 5 + React Bootstrap (Framework CSS e componenti UI)

CropperJS (react-easy-crop) (per il ritaglio delle immagini profilo)

Axios (client HTTP per le chiamate RESTful)

Jest + React Testing Library (per i test automatici di frontend)

Deployato su Netlify (frontend hosting)

📁 Struttura del Progetto
frontend/
├── components/         # Componenti riutilizzabili dell'interfaccia utente
├── context/            # Contesti React per lo stato globale (Auth, Cart)
├── pages/              # Pagine principali dell'applicazione
├── services/           # Servizi API (e.g., apis.js per axios)
└── App.js              # Componente radice dell'applicazione

backend/
├── controllers/         # Logica di business e gestione delle richieste
├── middleware/          # Funzioni middleware (e.g., autenticazione, upload)
├── models/              # Schemi e modelli MongoDB (Mongoose)
├── routes/              # Definizioni delle rotte API
├── tests/               # Test automatici per il backend
└── server.js            # Punto di ingresso del server Express

⚙️ Setup in Locale (Full Stack)
Per avviare l'applicazione in locale, segui questi passaggi per il backend e il frontend.

🔧 Backend Setup
Clona il repository del backend e installa le dipendenze:

git clone https://github.com/tuo-username/backend-gamedev.git
cd backend-gamedev
npm install

Crea un file .env nella directory backend-gamedev con le seguenti variabili d'ambiente. Assicurati di sostituire i placeholder con le tue chiavi e URL reali:

PORT=5000
MONGO_URI=<la tua connessione MongoDB Atlas o locale>
JWT_SECRET=la_tua_chiave_segreta_jwt_molto_lunga_e_complessa

STRIPE_SECRET_KEY=sk_test_xxx_xxx # La tua chiave segreta Stripe (test o live)
STRIPE_WEBHOOK_SECRET=whsec_xxx # Chiave segreta del webhook, ottenuta dopo la configurazione dell'endpoint

CLOUDINARY_NAME=il_tuo_cloud_name
CLOUDINARY_API_KEY=la_tua_api_key_cloudinary
CLOUDINARY_API_SECRET=la_tua_api_secret_cloudinary

EMAIL_USER=la_tua_email_per_invio@gmail.com
EMAIL_PASS=la_tua_password_app_specifica_o_normale

# URL del tuo frontend. Cruciale per i reindirizzamenti Stripe e i link email.
# In locale, punta al frontend locale:
CLIENT_ORIGIN=http://localhost:3000

Avvia il server backend:

npm run dev

Configurazione Webhook Stripe (per sviluppo locale):
Per testare i pagamenti Stripe in locale e ricevere i webhook, devi esporre il tuo localhost. Il modo più comune è usare ngrok.
Installa ngrok (se non l'hai già fatto) e avvialo per esporre la porta 5000 del tuo backend:

ngrok http 5000
```ngrok` ti fornirà un URL pubblico (es. `[https://xxxxxx.ngrok-free.app](https://xxxxxx.ngrok-free.app)`).
Vai alla [Dashboard Sviluppatori di Stripe](https://dashboard.stripe.com/test/webhooks).
Aggiungi un nuovo endpoint webhook (o modifica uno esistente) con l'URL fornito da `ngrok`, aggiungendo il percorso del webhook del tuo backend:
`https://<IL_TUO_URL_NGROK>/api/checkout/webhook`
Seleziona gli eventi: `checkout.session.completed` e `payment_intent.payment_failed`.
Copia la "Chiave segreta del webhook" (inizia con `whsec_`) che Stripe genera e incollala nel tuo `.env` come `STRIPE_WEBHOOK_SECRET`.

### 💻 Frontend Setup
Vai nella directory `frontend/` del progetto:

```bash
cd ../frontend # Se sei nella cartella backend, altrimenti naviga nella cartella frontend
npm install

Crea un file .env nella directory frontend con la seguente variabile d'ambiente:

# In locale, punta al backend locale, includendo il prefisso API
REACT_APP_API_URL=http://localhost:5000

Avvia l'applicazione React:

npm start

L'applicazione sarà disponibile su http://localhost:3000.

⚙️ Deployment
Questa sezione descrive come l'applicazione è stata deployata per l'ambiente di produzione.

🚀 Backend Deployment (Render.com)
Piattaforma: Render.com
Link del Servizio: https://gameshop-back.onrender.com
Configurazione:

Repository collegato al servizio Render.com.

Variabili d'ambiente configurate su Render.com (Environment section):

PORT (Render imposta automaticamente la sua porta)

MONGO_URI

JWT_SECRET

STRIPE_SECRET_KEY

STRIPE_WEBHOOK_SECRET

CLOUDINARY_NAME

CLOUDINARY_API_KEY

CLOUDINARY_API_SECRET

EMAIL_USER

EMAIL_PASS

CLIENT_ORIGIN: Deve essere impostato sull'URL del frontend deployato su Netlify (es. https://gleeful-pavlova-171567.netlify.app). Questo è cruciale per i reindirizzamenti di Stripe e i link nelle email.

Build Command: npm install

Start Command: node server.js

Nota Aggiuntiva sul Deploy di Swagger:
La documentazione API di Swagger è abilitata tramite setupSwagger(app) in server.js. Tuttavia, per risolvere precedenti errori di deploy (YAMLSemanticError), i blocchi di commento JSDoc per Swagger sono stati temporaneamente disabilitati (commentati con /* ... */) in alcuni file di rotta, in particolare backend/routes/authRoutes.js. Questo significa che le API definite in quei file non appariranno nella documentazione /api-docs finché non verranno riattivate manualmente. Per riattivare la documentazione, sarà necessario modificare i file delle rotte e cambiare /* in /** all'inizio di ogni blocco di commento Swagger, prestando molta attenzione all'indentazione YAML.

🌐 Frontend Deployment (Netlify)
Piattaforma: Netlify
Link del Servizio: https://gleeful-pavlova-171567.netlify.app
Configurazione:

Repository collegato al servizio Netlify.

Build Command: npm run build

Publish directory: build

Variabili d'ambiente (Build & deploy -> Environment section):

REACT_APP_API_URL: Deve essere impostato sull'URL pubblico del tuo backend deployato (es. https://gameshop-back.onrender.com).

Regole di Reindirizzamento SPA: Il file public/_redirects (o netlify.toml nella root) è configurato per gestire il routing lato client, assicurando che tutte le rotte siano servite dall'index.html. Esempio di public/_redirects:

/* /index.html 200

🔑 Configurazione Webhook Stripe (per Produzione)
Una volta che il tuo backend è deployato su Render.com e accessibile pubblicamente, devi aggiornare l'URL del webhook di Stripe.
Vai alla Dashboard Sviluppatori di Stripe (o test/webhooks per l'ambiente di test).
Modifica l'endpoint del tuo webhook (quello che prima puntava a ngrok) e imposta l'URL su:
https://gameshop-back.onrender.com/api/checkout/webhook

Salva le modifiche. Non è necessario avviare ngrok in produzione.

✅ Test (Manuali e Automatici)
💳 Test Stripe (Carte di Prova)
✅ Pagamento riuscito: Utilizza i dettagli della carta 4242 4242 4242 4242 con una data di scadenza futura e qualsiasi CVC.

❌ Pagamento fallito: Utilizza i dettagli della carta 4000 0000 0000 9995 con una data di scadenza futura e qualsiasi CVC.

📧 Email Inviate Automaticamente
Registrazione: Email di verifica dell'account.

Recupero Password: Email con link per il reset della password.

Checkout Riuscito: Conferma d'ordine con dettagli e link alla pagina degli ordini.

Checkout Fallito: Avviso di pagamento fallito.

🧪 Test Automatici (Backend e Frontend)
Test automatici coperti per:

Login / Registrazione e autenticazione JWT

Protezione delle rotte (middleware di autenticazione e admin)

Flusso di Checkout con Stripe (inclusa la gestione dei webhook)

Gestione degli errori (edge-case)

Operazioni CRUD complete per i giochi

Tutti gli endpoint API.

Componenti UI e funzionalità di navigazione (frontend)

Interazione con i contesti globali (Auth, Cart in frontend)

👤 Autore
José Bueso

📧 josephbueso1997al@gmail.com
📧 jose_R_licona12@hotmail.com