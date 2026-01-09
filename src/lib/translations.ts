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
    becomeRepresentative: string
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
      becomeRepresentative: 'Diventa Rappresentante'
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
      title: 'Processo Assembly',
      subtitle: 'Un approccio strutturato per raccogliere, validare e articolare il feedback della community in richieste professionali di sviluppo.',
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
      benefits: 'Perché l\'AI è Essenziale'
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
    footer: {
      description: 'GoG Player Assembly - Trasformare il feedback della community in richieste di sviluppo attuabili tramite AI'
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
      becomeRepresentative: 'Become Representative'
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
      title: 'Assembly Process',
      subtitle: 'A structured approach to collecting, validating, and articulating community feedback into professional development requests.',
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
      title: 'AI Assembly Process',
      subtitle: 'How artificial intelligence transforms community feedback into professional requests',
      capabilities: 'AI Capabilities',
      benefits: 'Why AI is Essential'
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
    footer: {
      description: 'GoG Player Assembly - Transforming community feedback into actionable development requests through AI'
    }
  }
}

export function getTranslations(language: Language): Translations {
  return translations[language]
}