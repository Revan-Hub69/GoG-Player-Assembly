export type Language = 'it' | 'en'

export interface Translations {
  // Header
  header: {
    process: string
    requests: string
    representatives: string
    kingdoms: string
    aiProcess: string
    submitRequest: string
    supportProject: string
  }
  // Hero
  hero: {
    title: string
    subtitle: string
    democraticProcess: string
    technicalValidation: string
    professionalCommunication: string
    aiAggregation: string
  }
  // Process
  process: {
    title: string
    subtitle: string
    collection: {
      title: string
      description: string
    }
    analysis: {
      title: string
      description: string
    }
    articulation: {
      title: string
      description: string
    }
    submission: {
      title: string
      description: string
    }
  }
  // AI Process
  aiProcess: {
    title: string
    subtitle: string
    capabilities: string
    benefits: string
    processSteps: {
      collection: {
        title: string
        description: string
      }
      analysis: {
        title: string
        description: string
      }
      aggregation: {
        title: string
        description: string
      }
      validation: {
        title: string
        description: string
      }
    }
    aiCapabilities: {
      semanticAnalysis: {
        title: string
        description: string
      }
      duplicateDetection: {
        title: string
        description: string
      }
      prioritization: {
        title: string
        description: string
      }
      technicalArticulation: {
        title: string
        description: string
      }
    }
    whyAiEssential: {
      title: string
      subtitle: string
      noProposalLost: {
        title: string
        description: string
      }
      professionalQuality: {
        title: string
        description: string
      }
      timeEfficiency: {
        title: string
        description: string
      }
    }
  }
  // Kingdoms
  kingdoms: {
    title: string
    subtitle: string
    participating: string
    totalKingdoms: string
    activeKingdoms: string
    withRepresentative: string
    totalProposals: string
    noRepresentative: string
    joined: string
    lastActivity: string
    proposals: string
    engagement: string
    mostActiveKingdoms: string
    viewAllKingdoms: string
    representativePositionsAvailable: string
    democraticRepresentationRequired: string
    apply: string
    status: {
      active: string
      pending: string
      inactive: string
      suspended: string
    }
    activity: {
      active: string
      recent: string
      inactive: string
    }
    engagementLevels: {
      excellent: string
      good: string
      moderate: string
      low: string
      minimal: string
    }
  }
  // Requests
  requests: {
    title: string
    subtitle: string
    submitNew: string
    technicalDetails: string
    expectedOutcome: string
    requestDetails: string
    submittedBy: string
    date: string
    requestId: string
    aiAggregated: string
    sourceProposals: string
    confidenceScore: string
  }
  // Categories
  categories: {
    gameplay: string
    economy: string
    social: string
    technical: string
    events: string
  }
  // Priorities
  priorities: {
    critical: string
    high: string
    medium: string
    low: string
    minimal: string
  }
  // Status
  status: {
    draft: string
    review: string
    submitted: string
    acknowledged: string
    implemented: string
    pending: string
    processing: string
    aggregated: string
    rejected: string
  }
  // Principles
  principles: {
    title: string
    subtitle: string
    democratic: {
      title: string
      description: string
    }
    technical: {
      title: string
      description: string
    }
    professional: {
      title: string
      description: string
    }
    aiPowered: {
      title: string
      description: string
    }
  }
  // Problem statement
  problemStatement: {
    title: string
    subtitle: string
    problems: {
      title: string
      socialNoise: {
        title: string
        description: string
      }
      toxicity: {
        title: string
        description: string
      }
      dominantVoices: {
        title: string
        description: string
      }
      unusableFeedback: {
        title: string
        description: string
      }
    }
    solutions: {
      title: string
      organizedStructure: {
        title: string
        description: string
      }
      professionalCommunication: {
        title: string
        description: string
      }
      fairRepresentation: {
        title: string
        description: string
      }
      technicalValidation: {
        title: string
        description: string
      }
    }
  }
  // Project costs
  projectCosts: {
    title: string
    subtitle: string
    infrastructure: {
      title: string
      description: string
      cost: string
    }
    ai: {
      title: string
      description: string
      cost: string
    }
    development: {
      title: string
      description: string
      cost: string
    }
    total: {
      title: string
      monthly: string
      description: string
    }
    support: {
      title: string
      description: string
      paypal: string
    }
  }
  // Representative form
  representativeForm: {
    title: string
    subtitle: string
    personalInfo: {
      title: string
      subtitle: string
      playerName: string
      email: string
      emailDescription: string
      discordTag: string
      discordDescription: string
    }
    kingdomInfo: {
      title: string
      subtitle: string
      kingdomName: string
      region: string
      selectRegion: string
      democraticNote: {
        title: string
        description: string
      }
    }
    experience: {
      title: string
      subtitle: string
      gameExperience: string
      gameExperiencePlaceholder: string
      motivation: string
      motivationPlaceholder: string
      availability: string
      selectAvailability: string
      availabilityOptions: {
        high: string
        medium: string
        low: string
      }
      approvalProcess: {
        title: string
        description: string
      }
    }
    navigation: {
      back: string
      next: string
      submit: string
      submitting: string
    }
  }
  // Modals
  modals: {
    activeRequests: {
      title: string
      subtitle: string
      noRequests: string
      viewDetails: string
      close: string
    }
    participatingKingdoms: {
      title: string
      subtitle: string
      stats: {
        total: string
        active: string
        represented: string
        available: string
      }
      representative: {
        available: string
        noRepresentative: string
      }
      cta: {
        title: string
        description: string
        apply: string
      }
      close: string
    }
  }
  // Footer
  footer: {
    description: string
  }
}

export const translations: Record<Language, Translations> = {
  it: {
    header: {
      process: 'Processo',
      requests: 'Richieste',
      representatives: 'Rappresentanti',
      kingdoms: 'Regni',
      aiProcess: 'AI Process',
      submitRequest: 'Invia Richiesta',
      supportProject: 'Supporta il Progetto'
    },
    hero: {
      title: 'GoG Player Assembly',
      subtitle: 'Piattaforma strutturata che trasforma il feedback della community in richieste tecnicamente valide per gli sviluppatori. Elimina il rumore dei social media attraverso rappresentanza democratica e aggregazione intelligente.',
      democraticProcess: 'Rappresentanza Democratica',
      technicalValidation: 'Validazione Tecnica AI',
      professionalCommunication: 'Comunicazione Strutturata',
      aiAggregation: 'Aggregazione Intelligente'
    },
    process: {
      title: 'Processo Strutturato',
      subtitle: 'Un approccio metodico per raccogliere, validare e articolare il feedback della community in richieste professionali di sviluppo.',
      collection: {
        title: 'Raccolta',
        description: 'I rappresentanti dei regni raccolgono preoccupazioni e proposte della community attraverso canali strutturati.'
      },
      analysis: {
        title: 'Analisi AI',
        description: 'L\'intelligenza artificiale analizza e aggrega automaticamente proposte simili con valutazione dell\'impatto.'
      },
      articulation: {
        title: 'Articolazione',
        description: 'L\'AI formula richieste chiare e tecnicamente valide con risultati attesi e specifiche implementative.'
      },
      submission: {
        title: 'Sottomissione',
        description: 'Presentazione professionale al team di sviluppo con documentazione di supporto e analisi dell\'impatto.'
      }
    },
    aiProcess: {
      title: 'Processo AI Assembly',
      subtitle: 'Come l\'intelligenza artificiale trasforma il feedback della community in richieste professionali',
      capabilities: 'Capacità dell\'AI',
      benefits: 'Perché l\'AI è Essenziale',
      processSteps: {
        collection: {
          title: 'Raccolta Proposte',
          description: 'I rappresentanti dei regni inviano le proposte della community attraverso il sistema strutturato'
        },
        analysis: {
          title: 'Analisi AI',
          description: 'L\'intelligenza artificiale analizza tutte le proposte, identifica temi comuni e valuta la similarità'
        },
        aggregation: {
          title: 'Aggregazione Intelligente',
          description: 'L\'AI aggrega proposte simili in richieste tecnicamente valide e ben articolate'
        },
        validation: {
          title: 'Validazione & Invio',
          description: 'Le richieste aggregate vengono validate e inviate professionalmente agli sviluppatori'
        }
      },
      aiCapabilities: {
        semanticAnalysis: {
          title: 'Analisi Semantica',
          description: 'Comprende il significato delle proposte oltre le parole chiave'
        },
        duplicateDetection: {
          title: 'Rilevamento Duplicati',
          description: 'Identifica proposte simili anche se formulate diversamente'
        },
        prioritization: {
          title: 'Prioritizzazione',
          description: 'Valuta l\'impatto e l\'urgenza delle richieste della community'
        },
        technicalArticulation: {
          title: 'Articolazione Tecnica',
          description: 'Trasforma feedback in specifiche tecniche comprensibili'
        }
      },
      whyAiEssential: {
        title: 'Perché l\'AI è Essenziale',
        subtitle: 'L\'intelligenza artificiale garantisce che ogni voce della community sia ascoltata e che le richieste siano formulate in modo professionale e tecnicamente accurato.',
        noProposalLost: {
          title: 'Nessuna Proposta Persa',
          description: 'Ogni feedback viene analizzato e considerato, anche se simile ad altri'
        },
        professionalQuality: {
          title: 'Qualità Professionale',
          description: 'Trasforma feedback informali in specifiche tecniche comprensibili'
        },
        timeEfficiency: {
          title: 'Efficienza Temporale',
          description: 'Processa centinaia di proposte in minuti invece di settimane'
        }
      }
    },
    kingdoms: {
      title: 'Regni Partecipanti',
      subtitle: 'Panoramica dei regni che partecipano al GoG Player Assembly e dei loro rappresentanti',
      participating: 'Partecipanti',
      totalKingdoms: 'Regni Totali',
      activeKingdoms: 'Attivi',
      withRepresentative: 'Con Rappresentante',
      totalProposals: 'Proposte Totali',
      noRepresentative: 'Nessun rappresentante',
      joined: 'Iscritto',
      lastActivity: 'Ultima attività',
      proposals: 'Proposte',
      engagement: 'Coinvolgimento',
      mostActiveKingdoms: 'Regni Più Attivi',
      viewAllKingdoms: 'Visualizza Tutti i Regni',
      representativePositionsAvailable: 'Posizioni Rappresentante Disponibili',
      democraticRepresentationRequired: 'Il sistema di rappresentanza democratica richiede delegati dei regni',
      apply: 'Candidati',
      status: {
        active: 'Attivo',
        pending: 'In Attesa',
        inactive: 'Inattivo',
        suspended: 'Sospeso'
      },
      activity: {
        active: 'Recente',
        recent: 'Moderata',
        inactive: 'Inattiva'
      },
      engagementLevels: {
        excellent: 'Eccellente',
        good: 'Buono',
        moderate: 'Moderato',
        low: 'Basso',
        minimal: 'Minimo'
      }
    },
    requests: {
      title: 'Richieste Aggregate AI',
      subtitle: 'Richieste generate dall\'intelligenza artificiale aggregando il feedback della community in proposte tecnicamente valide.',
      submitNew: 'Invia Nuova Proposta',
      technicalDetails: 'Specifiche Tecniche',
      expectedOutcome: 'Risultato Atteso',
      requestDetails: 'Dettagli Richiesta',
      submittedBy: 'Aggregata da:',
      date: 'Data:',
      requestId: 'ID Richiesta:',
      aiAggregated: 'Aggregata AI',
      sourceProposals: 'Proposte Sorgente',
      confidenceScore: 'Punteggio Confidenza'
    },
    categories: {
      gameplay: 'Gameplay',
      economy: 'Economia',
      social: 'Sociale',
      technical: 'Tecnico',
      events: 'Eventi'
    },
    priorities: {
      critical: 'Critica',
      high: 'Alta',
      medium: 'Media',
      low: 'Bassa',
      minimal: 'Minima'
    },
    status: {
      draft: 'Bozza',
      review: 'In Revisione',
      submitted: 'Inviata',
      acknowledged: 'Riconosciuta',
      implemented: 'Implementata',
      pending: 'In Attesa',
      processing: 'Elaborazione',
      aggregated: 'Aggregata',
      rejected: 'Rifiutata'
    },
    principles: {
      title: 'Principi Assembly',
      subtitle: 'Il nostro approccio strutturato garantisce che ogni preoccupazione della community sia adeguatamente valutata, tecnicamente validata e comunicata professionalmente ai team di sviluppo.',
      democratic: {
        title: 'Rappresentanza Democratica',
        description: 'Ogni regno elegge un rappresentante che raccoglie e prioritizza le preoccupazioni della community attraverso processi democratici stabiliti.'
      },
      technical: {
        title: 'Validazione Tecnica AI',
        description: 'L\'intelligenza artificiale analizza tutte le richieste per garantire la fattibilità tecnica e fornire percorsi di implementazione chiari per gli sviluppatori.'
      },
      professional: {
        title: 'Comunicazione Professionale',
        description: 'Le richieste sono articolate automaticamente in linguaggio professionale con obiettivi chiari, specifiche tecniche e risultati attesi.'
      },
      aiPowered: {
        title: 'Aggregazione Intelligente',
        description: 'L\'AI identifica pattern comuni, aggrega proposte simili e garantisce che nessun feedback della community venga perso o ignorato.'
      }
    },
    problemStatement: {
      title: 'Il Problema dei Social Media',
      subtitle: 'I canali social tradizionali creano rumore, frustrazione e feedback inutilizzabile. Il GoG Player Assembly risolve questi problemi strutturali.',
      problems: {
        title: 'Problemi Attuali',
        socialNoise: {
          title: 'Rumore Sociale',
          description: 'Migliaia di messaggi non strutturati rendono impossibile identificare feedback utile'
        },
        toxicity: {
          title: 'Flame e Tossicità',
          description: 'Discussioni degenerano in conflitti personali invece di feedback costruttivo'
        },
        dominantVoices: {
          title: 'Voci Dominanti',
          description: 'Regni più grandi o giocatori più attivi soffocano le voci dei regni più piccoli'
        },
        unusableFeedback: {
          title: 'Feedback Inutilizzabile',
          description: 'Richieste vaghe e non tecniche che gli sviluppatori non possono implementare'
        }
      },
      solutions: {
        title: 'Soluzioni Assembly',
        organizedStructure: {
          title: 'Struttura Organizzata',
          description: 'Canali dedicati e processi strutturati per raccogliere feedback mirato'
        },
        professionalCommunication: {
          title: 'Comunicazione Professionale',
          description: 'Linguaggio tecnico e obiettivi chiari eliminano conflitti emotivi'
        },
        fairRepresentation: {
          title: 'Rappresentanza Equa',
          description: 'Un rappresentante per regno garantisce che ogni community abbia voce'
        },
        technicalValidation: {
          title: 'Validazione Tecnica',
          description: 'AI trasforma richieste in specifiche implementabili dagli sviluppatori'
        }
      }
    },
    // Footer
    footer: {
      description: 'GoG Player Assembly - Trasformare il feedback della community in richieste di sviluppo attuabili tramite AI'
    },
    projectCosts: {
      title: 'Costi del Progetto',
      subtitle: 'Trasparenza completa sui costi minimi necessari per mantenere operativo il GoG Player Assembly',
      infrastructure: {
        title: 'Infrastruttura Server',
        description: 'Hosting database, API, sistema di autenticazione e backup automatici',
        cost: '€25/mese'
      },
      ai: {
        title: 'Servizi AI',
        description: 'Elaborazione linguaggio naturale, aggregazione proposte e analisi sentiment',
        cost: '€35/mese'
      },
      development: {
        title: 'Manutenzione',
        description: 'Aggiornamenti sicurezza, bug fixes e miglioramenti funzionalità',
        cost: '€15/mese'
      },
      total: {
        title: 'Costo Totale Mensile',
        monthly: '€75/mese',
        description: 'Costi minimi per mantenere la piattaforma operativa e garantire un servizio affidabile alla community'
      },
      support: {
        title: 'Supporta il Progetto',
        description: 'Il tuo contributo aiuta a mantenere la piattaforma gratuita e accessibile a tutti i regni',
        paypal: 'Dona con PayPal'
      }
    },
    representativeForm: {
      title: 'Candidatura Rappresentante',
      subtitle: 'Diventa il rappresentante ufficiale del tuo regno',
      personalInfo: {
        title: 'Informazioni Personali',
        subtitle: 'Fornisci i tuoi dati di contatto per l\'attivazione',
        playerName: 'Nome Giocatore *',
        email: 'Email *',
        emailDescription: 'Utilizzata per comunicazioni ufficiali e attivazione account',
        discordTag: 'Discord Tag *',
        discordDescription: 'Per coordinamento e comunicazioni rapide con altri rappresentanti'
      },
      kingdomInfo: {
        title: 'Informazioni Regno',
        subtitle: 'Dettagli sul regno che rappresenterai',
        kingdomName: 'Nome Regno *',
        region: 'Regione Server *',
        selectRegion: 'Seleziona regione',
        democraticNote: {
          title: 'Rappresentanza Democratica',
          description: 'Ogni regno può avere un solo rappresentante per garantire equità e voce democratica a tutti i regni, indipendentemente dalla dimensione.'
        }
      },
      experience: {
        title: 'Esperienza e Motivazione',
        subtitle: 'Raccontaci perché vuoi rappresentare il tuo regno',
        gameExperience: 'Esperienza di Gioco *',
        gameExperiencePlaceholder: 'Descrivi la tua esperienza con Guns of Glory (tempo di gioco, ruoli ricoperti, conoscenza del gioco...)',
        motivation: 'Motivazione *',
        motivationPlaceholder: 'Perché vuoi diventare rappresentante? Come pensi di contribuire al miglioramento del gioco?',
        availability: 'Disponibilità *',
        selectAvailability: 'Seleziona disponibilità',
        availabilityOptions: {
          high: 'Alta (più di 2 ore al giorno)',
          medium: 'Media (1-2 ore al giorno)',
          low: 'Bassa (meno di 1 ora al giorno)'
        },
        approvalProcess: {
          title: 'Processo di Approvazione',
          description: 'La tua candidatura sarà valutata dal team Assembly. Riceverai una risposta via email entro 48 ore con le istruzioni per l\'attivazione.'
        }
      },
      navigation: {
        back: 'Indietro',
        next: 'Avanti',
        submit: 'Invia Candidatura',
        submitting: 'Invio in corso...'
      }
    },
    modals: {
      activeRequests: {
        title: 'Richieste Attive',
        subtitle: 'Tutte le richieste aggregate dall\'AI attualmente in elaborazione',
        noRequests: 'Nessuna richiesta attiva al momento',
        viewDetails: 'Visualizza Dettagli',
        close: 'Chiudi'
      },
      participatingKingdoms: {
        title: 'Regni Partecipanti',
        subtitle: 'Panoramica del sistema di rappresentanza democratica',
        stats: {
          total: 'Regni Totali',
          active: 'Attivi',
          represented: 'Rappresentati',
          available: 'Slot Disponibili'
        },
        representative: {
          available: 'Disponibile',
          noRepresentative: 'Nessun rappresentante'
        },
        cta: {
          title: 'Posizione Rappresentante Disponibile',
          description: 'regni richiedono rappresentanza democratica',
          apply: 'Candidati Ora'
        },
        close: 'Chiudi'
      }
    }
  },
  en: {
    header: {
      process: 'Process',
      requests: 'Requests',
      representatives: 'Representatives',
      kingdoms: 'Kingdoms',
      aiProcess: 'AI Process',
      submitRequest: 'Submit Request',
      supportProject: 'Support Project'
    },
    hero: {
      title: 'GoG Player Assembly',
      subtitle: 'Structured platform transforming community feedback into technically valid requests for developers. Eliminates social media noise through democratic representation and intelligent aggregation.',
      democraticProcess: 'Democratic Representation',
      technicalValidation: 'AI Technical Validation',
      professionalCommunication: 'Structured Communication',
      aiAggregation: 'Intelligent Aggregation'
    },
    process: {
      title: 'Structured Process',
      subtitle: 'A methodical approach to collecting, validating, and articulating community feedback into professional development requests.',
      collection: {
        title: 'Collection',
        description: 'Kingdom representatives gather community concerns and proposals through structured channels.'
      },
      analysis: {
        title: 'AI Analysis',
        description: 'Artificial intelligence automatically analyzes and aggregates similar proposals with impact assessment.'
      },
      articulation: {
        title: 'Articulation',
        description: 'AI formulates clear, technically sound requests with expected outcomes and implementation specifications.'
      },
      submission: {
        title: 'Submission',
        description: 'Professional presentation to development team with supporting documentation and impact analysis.'
      }
    },
    aiProcess: {
      title: 'Intelligent AI Process',
      subtitle: 'How artificial intelligence transforms community feedback into professional requests',
      capabilities: 'AI Capabilities',
      benefits: 'Why AI is Essential',
      processSteps: {
        collection: {
          title: 'Proposal Collection',
          description: 'Kingdom representatives submit community proposals through the structured system'
        },
        analysis: {
          title: 'AI Analysis',
          description: 'Artificial intelligence analyzes all proposals, identifies common themes and evaluates similarity'
        },
        aggregation: {
          title: 'Intelligent Aggregation',
          description: 'AI aggregates similar proposals into technically valid and well-articulated requests'
        },
        validation: {
          title: 'Validation & Submission',
          description: 'Aggregated requests are validated and professionally submitted to developers'
        }
      },
      aiCapabilities: {
        semanticAnalysis: {
          title: 'Semantic Analysis',
          description: 'Understands the meaning of proposals beyond keywords'
        },
        duplicateDetection: {
          title: 'Duplicate Detection',
          description: 'Identifies similar proposals even if formulated differently'
        },
        prioritization: {
          title: 'Prioritization',
          description: 'Evaluates the impact and urgency of community requests'
        },
        technicalArticulation: {
          title: 'Technical Articulation',
          description: 'Transforms feedback into understandable technical specifications'
        }
      },
      whyAiEssential: {
        title: 'Why AI is Essential',
        subtitle: 'Artificial intelligence ensures that every community voice is heard and that requests are formulated professionally and technically accurately.',
        noProposalLost: {
          title: 'No Proposal Lost',
          description: 'Every feedback is analyzed and considered, even if similar to others'
        },
        professionalQuality: {
          title: 'Professional Quality',
          description: 'Transforms informal feedback into understandable technical specifications'
        },
        timeEfficiency: {
          title: 'Time Efficiency',
          description: 'Processes hundreds of proposals in minutes instead of weeks'
        }
      }
    },
    kingdoms: {
      title: 'Participating Kingdoms',
      subtitle: 'Overview of kingdoms participating in the GoG Player Assembly and their representatives',
      participating: 'Participating',
      totalKingdoms: 'Total Kingdoms',
      activeKingdoms: 'Active',
      withRepresentative: 'With Representative',
      totalProposals: 'Total Proposals',
      noRepresentative: 'No representative',
      joined: 'Joined',
      lastActivity: 'Last activity',
      proposals: 'Proposals',
      engagement: 'Engagement',
      mostActiveKingdoms: 'Most Active Kingdoms',
      viewAllKingdoms: 'View All Kingdoms',
      representativePositionsAvailable: 'Representative Positions Available',
      democraticRepresentationRequired: 'Democratic representation system requires kingdom delegates',
      apply: 'Apply',
      status: {
        active: 'Active',
        pending: 'Pending',
        inactive: 'Inactive',
        suspended: 'Suspended'
      },
      activity: {
        active: 'Recent',
        recent: 'Moderate',
        inactive: 'Inactive'
      },
      engagementLevels: {
        excellent: 'Excellent',
        good: 'Good',
        moderate: 'Moderate',
        low: 'Low',
        minimal: 'Minimal'
      }
    },
    requests: {
      title: 'AI Aggregated Requests',
      subtitle: 'Requests generated by artificial intelligence aggregating community feedback into technically valid proposals.',
      submitNew: 'Submit New Proposal',
      technicalDetails: 'Technical Specifications',
      expectedOutcome: 'Expected Outcome',
      requestDetails: 'Request Details',
      submittedBy: 'Aggregated by:',
      date: 'Date:',
      requestId: 'Request ID:',
      aiAggregated: 'AI Aggregated',
      sourceProposals: 'Source Proposals',
      confidenceScore: 'Confidence Score'
    },
    categories: {
      gameplay: 'Gameplay',
      economy: 'Economy',
      social: 'Social',
      technical: 'Technical',
      events: 'Events'
    },
    priorities: {
      critical: 'Critical',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      minimal: 'Minimal'
    },
    status: {
      draft: 'Draft',
      review: 'In Review',
      submitted: 'Submitted',
      acknowledged: 'Acknowledged',
      implemented: 'Implemented',
      pending: 'Pending',
      processing: 'Processing',
      aggregated: 'Aggregated',
      rejected: 'Rejected'
    },
    principles: {
      title: 'Assembly Principles',
      subtitle: 'Our structured approach ensures every community concern is properly evaluated, technically validated, and professionally communicated to development teams.',
      democratic: {
        title: 'Democratic Representation',
        description: 'Each kingdom elects one representative who collects and prioritizes community concerns through established democratic processes.'
      },
      technical: {
        title: 'AI Technical Validation',
        description: 'Artificial intelligence analyzes all requests to ensure technical feasibility and provide clear implementation pathways for developers.'
      },
      professional: {
        title: 'Professional Communication',
        description: 'Requests are automatically articulated in professional language with clear objectives, technical specifications, and expected outcomes.'
      },
      aiPowered: {
        title: 'Intelligent Aggregation',
        description: 'AI identifies common patterns, aggregates similar proposals, and ensures no community feedback is lost or ignored.'
      }
    },
    problemStatement: {
      title: 'Social Media Problem',
      subtitle: 'Traditional social channels create noise, frustration and unusable feedback. GoG Player Assembly solves these structural problems.',
      problems: {
        title: 'Current Problems',
        socialNoise: {
          title: 'Social Noise',
          description: 'Thousands of unstructured messages make it impossible to identify useful feedback'
        },
        toxicity: {
          title: 'Flames and Toxicity',
          description: 'Discussions degenerate into personal conflicts instead of constructive feedback'
        },
        dominantVoices: {
          title: 'Dominant Voices',
          description: 'Larger kingdoms or more active players drown out the voices of smaller kingdoms'
        },
        unusableFeedback: {
          title: 'Unusable Feedback',
          description: 'Vague and non-technical requests that developers cannot implement'
        }
      },
      solutions: {
        title: 'Assembly Solutions',
        organizedStructure: {
          title: 'Organized Structure',
          description: 'Dedicated channels and structured processes to collect targeted feedback'
        },
        professionalCommunication: {
          title: 'Professional Communication',
          description: 'Technical language and clear objectives eliminate emotional conflicts'
        },
        fairRepresentation: {
          title: 'Fair Representation',
          description: 'One representative per kingdom ensures every community has a voice'
        },
        technicalValidation: {
          title: 'Technical Validation',
          description: 'AI transforms requests into specifications implementable by developers'
        }
      }
    },
    // Footer
    footer: {
      description: 'GoG Player Assembly - Transforming community feedback into actionable development requests through AI'
    },
    projectCosts: {
      title: 'Project Costs',
      subtitle: 'Complete transparency on minimum costs required to keep the GoG Player Assembly operational',
      infrastructure: {
        title: 'Server Infrastructure',
        description: 'Database hosting, APIs, authentication system and automatic backups',
        cost: '€25/month'
      },
      ai: {
        title: 'AI Services',
        description: 'Natural language processing, proposal aggregation and sentiment analysis',
        cost: '€35/month'
      },
      development: {
        title: 'Maintenance',
        description: 'Security updates, bug fixes and feature improvements',
        cost: '€15/month'
      },
      total: {
        title: 'Total Monthly Cost',
        monthly: '€75/month',
        description: 'Minimum costs to keep the platform operational and ensure reliable service to the community'
      },
      support: {
        title: 'Support the Project',
        description: 'Your contribution helps keep the platform free and accessible to all kingdoms',
        paypal: 'Donate with PayPal'
      }
    },
    representativeForm: {
      title: 'Representative Application',
      subtitle: 'Become the official representative of your kingdom',
      personalInfo: {
        title: 'Personal Information',
        subtitle: 'Provide your contact details for activation',
        playerName: 'Player Name *',
        email: 'Email *',
        emailDescription: 'Used for official communications and account activation',
        discordTag: 'Discord Tag *',
        discordDescription: 'For coordination and quick communications with other representatives'
      },
      kingdomInfo: {
        title: 'Kingdom Information',
        subtitle: 'Details about the kingdom you will represent',
        kingdomName: 'Kingdom Name *',
        region: 'Server Region *',
        selectRegion: 'Select region',
        democraticNote: {
          title: 'Democratic Representation',
          description: 'Each kingdom can have only one representative to ensure equity and democratic voice for all kingdoms, regardless of size.'
        }
      },
      experience: {
        title: 'Experience and Motivation',
        subtitle: 'Tell us why you want to represent your kingdom',
        gameExperience: 'Game Experience *',
        gameExperiencePlaceholder: 'Describe your experience with Guns of Glory (playtime, roles held, game knowledge...)',
        motivation: 'Motivation *',
        motivationPlaceholder: 'Why do you want to become a representative? How do you think you can contribute to improving the game?',
        availability: 'Availability *',
        selectAvailability: 'Select availability',
        availabilityOptions: {
          high: 'High (more than 2 hours per day)',
          medium: 'Medium (1-2 hours per day)',
          low: 'Low (less than 1 hour per day)'
        },
        approvalProcess: {
          title: 'Approval Process',
          description: 'Your application will be evaluated by the Assembly team. You will receive a response via email within 48 hours with activation instructions.'
        }
      },
      navigation: {
        back: 'Back',
        next: 'Next',
        submit: 'Submit Application',
        submitting: 'Submitting...'
      }
    },
    modals: {
      activeRequests: {
        title: 'Active Requests',
        subtitle: 'All AI-aggregated requests currently being processed',
        noRequests: 'No active requests at the moment',
        viewDetails: 'View Details',
        close: 'Close'
      },
      participatingKingdoms: {
        title: 'Participating Kingdoms',
        subtitle: 'Overview of the democratic representation system',
        stats: {
          total: 'Total Kingdoms',
          active: 'Active',
          represented: 'Represented',
          available: 'Available Slots'
        },
        representative: {
          available: 'Available',
          noRepresentative: 'No representative'
        },
        cta: {
          title: 'Representative Position Available',
          description: 'kingdoms require democratic representation',
          apply: 'Apply Now'
        },
        close: 'Close'
      }
    }
  }
}

export function getTranslations(language: Language): Translations {
  return translations[language]
}