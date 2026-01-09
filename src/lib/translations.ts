export type Language = 'it' | 'en'

export interface Translations {
  // Header
  header: {
    process: string
    requests: string
    representatives: string
    submitRequest: string
  }
  // Hero
  hero: {
    title: string
    subtitle: string
    democraticProcess: string
    technicalValidation: string
    professionalCommunication: string
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
  }
  // Categories
  categories: {
    gameplay: string
    economy: string
    social: string
    technical: string
  }
  // Priorities
  priorities: {
    critical: string
    high: string
    medium: string
    low: string
  }
  // Status
  status: {
    draft: string
    review: string
    submitted: string
    acknowledged: string
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
      submitRequest: 'Invia Richiesta'
    },
    hero: {
      title: 'GoG Player Assembly',
      subtitle: 'Piattaforma strutturata per il feedback della community che trasforma le preoccupazioni dei giocatori in richieste tecnicamente valide e attuabili per gli sviluppatori.',
      democraticProcess: 'Processo Democratico',
      technicalValidation: 'Validazione Tecnica',
      professionalCommunication: 'Comunicazione Professionale'
    },
    process: {
      title: 'Processo Assembly',
      subtitle: 'Un approccio strutturato per raccogliere, validare e articolare il feedback della community in richieste professionali di sviluppo.',
      collection: {
        title: 'Raccolta',
        description: 'I rappresentanti dei regni raccolgono preoccupazioni e proposte della community attraverso canali strutturati.'
      },
      analysis: {
        title: 'Analisi',
        description: 'Revisione tecnica e consolidamento di richieste simili con valutazione dell\'impatto.'
      },
      articulation: {
        title: 'Articolazione',
        description: 'Formulazione di richieste chiare e tecnicamente valide con risultati attesi.'
      },
      submission: {
        title: 'Sottomissione',
        description: 'Presentazione professionale al team di sviluppo con documentazione di supporto.'
      }
    },
    requests: {
      title: 'Richieste Attuali',
      subtitle: 'Richieste guidate dalla community attualmente in varie fasi del processo assembly.',
      submitNew: 'Invia Nuova Richiesta',
      technicalDetails: 'Dettagli Tecnici',
      expectedOutcome: 'Risultato Atteso',
      requestDetails: 'Dettagli Richiesta',
      submittedBy: 'Inviata da:',
      date: 'Data:',
      requestId: 'ID Richiesta:'
    },
    categories: {
      gameplay: 'Gameplay',
      economy: 'Economia',
      social: 'Sociale',
      technical: 'Tecnico'
    },
    priorities: {
      critical: 'Critica',
      high: 'Alta',
      medium: 'Media',
      low: 'Bassa'
    },
    status: {
      draft: 'Bozza',
      review: 'In Revisione',
      submitted: 'Inviata',
      acknowledged: 'Riconosciuta'
    },
    principles: {
      title: 'Principi Assembly',
      subtitle: 'Il nostro approccio strutturato garantisce che ogni preoccupazione della community sia adeguatamente valutata, tecnicamente validata e comunicata professionalmente ai team di sviluppo.',
      democratic: {
        title: 'Rappresentanza Democratica',
        description: 'Ogni regno elegge rappresentanti che raccolgono e prioritizzano le preoccupazioni della community attraverso processi democratici stabiliti.'
      },
      technical: {
        title: 'Validazione Tecnica',
        description: 'Tutte le richieste subiscono una revisione tecnica per garantire la fattibilità e fornire percorsi di implementazione chiari per gli sviluppatori.'
      },
      professional: {
        title: 'Comunicazione Professionale',
        description: 'Le richieste sono articolate in linguaggio professionale con obiettivi chiari, specifiche tecniche e risultati attesi.'
      }
    },
    footer: {
      description: 'GoG Player Assembly - Trasformare il feedback della community in richieste di sviluppo attuabili'
    }
  },
  en: {
    header: {
      process: 'Process',
      requests: 'Requests',
      representatives: 'Representatives',
      submitRequest: 'Submit Request'
    },
    hero: {
      title: 'GoG Player Assembly',
      subtitle: 'Structured community feedback platform transforming player concerns into technically sound, actionable requests for game developers.',
      democraticProcess: 'Democratic Process',
      technicalValidation: 'Technical Validation',
      professionalCommunication: 'Professional Communication'
    },
    process: {
      title: 'Assembly Process',
      subtitle: 'A structured approach to collecting, validating, and articulating community feedback into professional development requests.',
      collection: {
        title: 'Collection',
        description: 'Kingdom representatives gather community concerns and proposals through structured channels.'
      },
      analysis: {
        title: 'Analysis',
        description: 'Technical review and consolidation of similar requests with impact assessment.'
      },
      articulation: {
        title: 'Articulation',
        description: 'Formulation of clear, technically sound requests with expected outcomes.'
      },
      submission: {
        title: 'Submission',
        description: 'Professional presentation to development team with supporting documentation.'
      }
    },
    requests: {
      title: 'Current Requests',
      subtitle: 'Community-driven requests currently in various stages of the assembly process.',
      submitNew: 'Submit New Request',
      technicalDetails: 'Technical Details',
      expectedOutcome: 'Expected Outcome',
      requestDetails: 'Request Details',
      submittedBy: 'Submitted by:',
      date: 'Date:',
      requestId: 'Request ID:'
    },
    categories: {
      gameplay: 'Gameplay',
      economy: 'Economy',
      social: 'Social',
      technical: 'Technical'
    },
    priorities: {
      critical: 'Critical',
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    },
    status: {
      draft: 'Draft',
      review: 'In Review',
      submitted: 'Submitted',
      acknowledged: 'Acknowledged'
    },
    principles: {
      title: 'Assembly Principles',
      subtitle: 'Our structured approach ensures every community concern is properly evaluated, technically validated, and professionally communicated to development teams.',
      democratic: {
        title: 'Democratic Representation',
        description: 'Each kingdom elects representatives who collect and prioritize community concerns through established democratic processes.'
      },
      technical: {
        title: 'Technical Validation',
        description: 'All requests undergo technical review to ensure feasibility and provide clear implementation pathways for developers.'
      },
      professional: {
        title: 'Professional Communication',
        description: 'Requests are articulated in professional language with clear objectives, technical specifications, and expected outcomes.'
      }
    },
    footer: {
      description: 'GoG Player Assembly - Transforming community feedback into actionable development requests'
    }
  }
}

export function getTranslations(language: Language): Translations {
  return translations[language]
}