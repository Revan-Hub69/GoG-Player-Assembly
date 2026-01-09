# 🚀 Deploy su Vercel - Guida Completa

## Prerequisiti

1. **Account GitHub**: Assicurati di avere un account GitHub
2. **Account Vercel**: Registrati su [vercel.com](https://vercel.com) (puoi usare il tuo account GitHub)
3. **Repository**: Il codice deve essere su un repository GitHub

## Passo 1: Crea Repository GitHub

1. Vai su [github.com](https://github.com) e crea un nuovo repository
2. Chiamalo `gog-open-letter` (o un nome simile)
3. Imposta come **pubblico** per massima trasparenza
4. Non aggiungere README, .gitignore o licenza (li abbiamo già)

## Passo 2: Collega il Repository Locale

```bash
# Aggiungi il remote origin (sostituisci con il tuo username)
git remote add origin https://github.com/TUO-USERNAME/gog-open-letter.git

# Push del codice
git branch -M main
git push -u origin main
```

## Passo 3: Deploy su Vercel

### Opzione A: Dashboard Web (Consigliata)

1. Vai su [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clicca **"New Project"**
3. Seleziona **"Import Git Repository"**
4. Trova il tuo repository `gog-open-letter`
5. Clicca **"Import"**

**Configurazione:**
- **Framework Preset**: Next.js (auto-rilevato)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `out` (già configurato)
- **Install Command**: `npm install` (default)

6. Clicca **"Deploy"**

### Opzione B: Vercel CLI

```bash
# Installa Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Segui le istruzioni:
# - Set up and deploy? Y
# - Which scope? (seleziona il tuo account)
# - Link to existing project? N
# - Project name: gog-open-letter
# - Directory: ./
# - Override settings? N
```

## Passo 4: Configurazione Dominio (Opzionale)

1. Nel dashboard Vercel, vai al tuo progetto
2. Clicca **"Settings"** → **"Domains"**
3. Aggiungi il tuo dominio personalizzato
4. Segui le istruzioni per configurare i DNS

## Passo 5: Auto-Deploy

✅ **Già configurato!** Ogni volta che fai push su GitHub:
1. Vercel rileva automaticamente i cambiamenti
2. Esegue il build
3. Deploya la nuova versione
4. Invia notifiche (se configurate)

## Aggiornare i Contenuti

### Modificare la Lettera

1. Modifica `content/letters/it.md` o `content/letters/en.md`
2. Commit e push:
```bash
git add content/letters/
git commit -m "Aggiorna lettera: [descrizione modifiche]"
git push
```

### Aggiungere/Modificare Proposte

1. Modifica `content/proposals.json`
2. Commit e push:
```bash
git add content/proposals.json
git commit -m "Aggiorna proposte: [descrizione modifiche]"
git push
```

### Modifiche UI/Traduzioni

1. Modifica i file in `messages/` per le traduzioni
2. Modifica i componenti in `src/components/` per l'UI
3. Commit e push come sopra

## Monitoraggio

### Dashboard Vercel
- **Deployments**: Vedi tutti i deploy e il loro stato
- **Functions**: Monitora le performance
- **Analytics**: Statistiche di traffico (se abilitato)

### Notifiche
Configura notifiche per:
- Deploy riusciti/falliti
- Errori in produzione
- Aggiornamenti di sicurezza

## Troubleshooting

### Build Fallisce
1. Controlla i log nel dashboard Vercel
2. Testa localmente: `npm run build`
3. Verifica che tutti i file siano committati

### Contenuto Non Aggiornato
1. Verifica che il deploy sia completato
2. Controlla la cache del browser (Ctrl+F5)
3. Verifica che i file siano stati modificati correttamente

### Errori 404
1. Verifica la configurazione in `vercel.json`
2. Controlla che i percorsi siano corretti
3. Verifica la configurazione del middleware

## URL del Sito

Dopo il deploy, il tuo sito sarà disponibile a:
- **URL Vercel**: `https://gog-open-letter-[hash].vercel.app`
- **Dominio personalizzato**: Se configurato

## Sicurezza e Best Practices

✅ **Già implementato:**
- HTTPS automatico
- CDN globale
- Compressione automatica
- Ottimizzazione immagini
- Headers di sicurezza

## Costi

- **Hobby Plan**: Gratuito per progetti personali
- **Pro Plan**: $20/mese per team e funzionalità avanzate
- **Enterprise**: Per organizzazioni grandi

Il piano gratuito è più che sufficiente per questo progetto!

---

🎉 **Il tuo sito è ora live e si aggiorna automaticamente!**