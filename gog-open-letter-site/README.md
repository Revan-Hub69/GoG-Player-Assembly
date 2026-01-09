# GOG Open Letter - Community Initiative

Una lettera aperta della comunità di Guns of Glory agli sviluppatori, con proposte costruttive per migliorare il dialogo e il gioco.

## 🎯 Scopo del Progetto

Questo sito web rappresenta un'iniziativa della comunità per:
- Presentare una lettera aperta rispettosa agli sviluppatori di Guns of Glory
- Raccogliere e organizzare proposte costruttive della comunità
- Facilitare un dialogo più strutturato tra giocatori e sviluppatori
- Mantenere un tono sempre rispettoso e collaborativo

## 🌍 Multilingua

Il sito supporta:
- **Italiano** (IT) - Lingua principale
- **Inglese** (EN) - Per la comunità internazionale

## 📝 Come Aggiornare i Contenuti

### Modificare la Lettera

1. Per l'italiano: modifica `content/letters/it.md`
2. Per l'inglese: modifica `content/letters/en.md`
3. Fai commit e push - Vercel aggiornerà automaticamente il sito

### Aggiungere/Modificare Proposte

1. Modifica il file `content/proposals.json`
2. Segui la struttura esistente:

```json
{
  "id": "identificativo-unico",
  "title": {
    "it": "Titolo in italiano",
    "en": "Title in English"
  },
  "summary": {
    "it": "Breve riassunto in italiano",
    "en": "Brief summary in English"
  },
  "details": {
    "it": ["Punto 1", "Punto 2", "Punto 3"],
    "en": ["Point 1", "Point 2", "Point 3"]
  },
  "support": "alto|medio|basso",
  "lastUpdated": "YYYY-MM-DD",
  "status": "active|draft|archived"
}
```

3. Fai commit e push per pubblicare le modifiche

## 📋 Regole di Stile

Per mantenere la credibilità e l'efficacia dell'iniziativa:

- **Tono sempre rispettoso**: Niente attacchi personali o linguaggio aggressivo
- **Proposte concrete**: Evitare lamentele generiche, proporre soluzioni specifiche
- **Supporto documentato**: Indicare il livello di supporto della comunità
- **Fatti, non opinioni**: Basarsi su dati e osservazioni concrete
- **Costruttivo**: Ogni critica deve essere accompagnata da una proposta di miglioramento

## 🚀 Sviluppo Locale

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build
```

## 🌐 Deploy

Il sito è automaticamente deployato su Vercel:
- **Live URL**: [Inserire URL quando disponibile]
- **Auto-deploy**: Ogni push su main triggera un nuovo deploy
- **Preview**: Le PR generano preview automatici

## 🤝 Come Contribuire

1. **Fork** questo repository
2. **Crea un branch** per le tue modifiche
3. **Modifica** i contenuti seguendo le regole di stile
4. **Apri una Pull Request** con una descrizione chiara delle modifiche
5. **Attendi la review** da parte dei maintainer

### Tipi di Contributi Benvenuti

- Miglioramenti alla lettera (correzioni, chiarimenti)
- Nuove proposte supportate dalla comunità
- Traduzioni e miglioramenti linguistici
- Correzioni di bug o miglioramenti tecnici

## 📞 Contatti

- **Email**: [Inserire email di contatto]
- **Discord**: [Inserire server Discord se disponibile]
- **Issues**: Usa le GitHub Issues per segnalazioni tecniche

## ⚖️ Disclaimer

Questa è un'iniziativa **non ufficiale** della comunità di Guns of Glory. Non siamo affiliati con gli sviluppatori o publisher del gioco. L'obiettivo è facilitare un dialogo costruttivo, non organizzare proteste o boicottaggi.

## 📄 Licenza

Questo progetto è open source. I contenuti della lettera e delle proposte rappresentano la voce della comunità e possono essere liberamente condivisi e citati.

---

*Fatto con ❤️ dalla comunità di Guns of Glory*