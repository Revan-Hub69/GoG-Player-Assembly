# Requirements Document

## Introduction

GoG Player Assembly è un hub digitale progettato per coalizzare i rappresentanti dei server del gioco Guns of Glory. Il sistema consente ai referenti di ogni server di raccogliere feedback dai giocatori, proporre modifiche al gioco, votare su proposte della comunità e rappresentare in modo strutturato il sentiment della community, inclusi segnali storici e dichiarativi relativi all'engagement economico.

The purpose of the CSPI is not to escalate conflict, but to make escalation risk visible in order to encourage dialogue between the community and the developers before extreme reactions occur.

## Glossary

- **System**: GoG Player Assembly platform
- **Server_Representative**: Referente ufficiale di un server di Guns of Glory
- **Proposal**: Proposta di modifica al gioco presentata dalla comunità
- **Feedback**: Commenti e suggerimenti raccolti dai giocatori
- **Spending_Propensity_Level**: Valutazione soggettiva e non vincolante dichiarata da un Server_Representative sulla propensione percepita di riduzione della spesa in-game nel proprio server, basata su sentiment e precedenti storici
- **Community_Spending_Propensity_Index (CSPI)**: Indicatore aggregato e normalizzato derivato dalle dichiarazioni di propensione a livello server, inteso a rappresentare il sentiment generale della comunità e i pattern di rischio dell'engagement storico
- **Vote**: Voto espresso da un rappresentante su una proposta
- **Server**: Server specifico del gioco Guns of Glory

## Requirements

### Requirement 1: Server Representative Management

**User Story:** As a system administrator, I want to manage server representatives, so that each server has an official voice in the assembly.

#### Acceptance Criteria

1. WHEN a new server representative is registered, THE System SHALL verify their server affiliation and create their profile
2. WHEN a representative's status changes, THE System SHALL update their permissions and notify relevant parties
3. THE System SHALL maintain one active representative per server at any time
4. WHEN a representative is inactive for 30 days, THE System SHALL flag their account for review

### Requirement 2: Proposal Creation and Management

**User Story:** As a server representative, I want to create and submit proposals for game changes, so that community concerns can be formally presented.

#### Acceptance Criteria

1. WHEN a representative creates a proposal, THE System SHALL validate the proposal format and store it for community review
2. WHEN a proposal is submitted, THE System SHALL notify all other representatives for voting
3. THE System SHALL categorize proposals by type (gameplay, economy, events, technical)
4. WHEN a proposal receives majority support, THE System SHALL mark it as "Community Approved"

### Requirement 3: Voting System

**User Story:** As a server representative, I want to vote on community proposals, so that decisions reflect the collective will of the player base.

#### Acceptance Criteria

1. WHEN a representative casts a vote, THE System SHALL record the vote with timestamp and representative identity
2. THE System SHALL prevent duplicate voting by the same representative on the same proposal
3. WHEN voting period expires, THE System SHALL calculate results and update proposal status
4. THE System SHALL require a minimum quorum of 60% server participation for valid votes

### Requirement 4: Feedback Collection

**User Story:** As a server representative, I want to collect and organize feedback from my server's players, so that their voices are heard in the assembly.

#### Acceptance Criteria

1. WHEN feedback is submitted, THE System SHALL associate it with the representative's server and categorize it
2. THE System SHALL allow representatives to aggregate similar feedback items
3. WHEN feedback relates to existing proposals, THE System SHALL link them automatically
4. THE System SHALL provide analytics on feedback trends and common issues

### Requirement 5: Community Spending Propensity Indicator

**User Story:** As a server representative, I want to declare the perceived spending disengagement propensity of my server, so that aggregated community sentiment can be transparently represented at a global level.

#### Acceptance Criteria

1. THE System SHALL allow each Server_Representative to declare a non-binding spending propensity level for their own server
2. THE declared value SHALL be based on a predefined ordinal scale and reflect subjective sentiment and historical patterns
3. THE System SHALL aggregate server-level values into a normalized Community Spending Propensity Index (CSPI)
4. THE CSPI SHALL be presented as a descriptive and informational indicator of community sentiment
5. THE System SHALL maintain historical records of CSPI values and observed correlations with developer responses
6. THE System SHALL NOT provide coordination tools, instructions, or recommendations related to spending behavior

#### CSPI Definition

The Community Spending Propensity Index (CSPI) is an observational indicator that measures how many servers perceive conditions that, in the past, led to extreme community reactions such as a total or near-total suspension of in-game spending.

The CSPI does not initiate, promote, or coordinate any action. It solely records whether server representatives recognize patterns comparable to previous high-impact community reactions already observed in the game's history.

#### Representative Declaration Context

When a Server_Representative declares a Spending_Propensity_Level, they are stating:

"Based on what I observe on my server, the current situation resembles past circumstances in which players reacted with extreme measures, including widespread spending suspension."

This declaration does not represent:

- an intention
- a decision
- a recommendation
- or a coordinated plan

It is a recognition of historical patterns, not a call to action.

#### System Purpose

The purpose of the CSPI is not to escalate conflict, but to make escalation risk visible in order to encourage dialogue between the community and the developers before extreme reactions occur.

### Requirement 6: Communication Hub

**User Story:** As a server representative, I want to communicate with other representatives, so that we can coordinate strategies and share information.

#### Acceptance Criteria

1. THE System SHALL provide secure messaging between representatives
2. WHEN urgent matters arise, THE System SHALL support broadcast notifications to all representatives
3. THE System SHALL maintain discussion threads for ongoing topics
4. THE System SHALL archive communications for future reference

### Requirement 7: Reporting and Analytics

**User Story:** As a system administrator, I want to generate reports on community activity, so that we can track engagement and measure impact.

#### Acceptance Criteria

1. THE System SHALL generate reports on proposal success rates and voting patterns
2. THE System SHALL track representative activity and server participation levels
3. WHEN significant community sentiment shifts are observed, THE System SHALL analyze their historical context and potential impact
4. THE System SHALL provide dashboards showing community health metrics

### Requirement 8: Developer Communication Interface

**User Story:** As a community coordinator, I want to present validated and structured community feedback to developers, while transparently tracking responses and outcomes.

#### Acceptance Criteria

1. THE System SHALL generate neutral, structured reports of community-approved proposals
2. THE System SHALL include participation metrics and consensus indicators
3. WHEN developers respond, THE System SHALL record responses without editorial modification
4. THE System SHALL allow proposals to be marked as Accepted, Rejected, or Deferred
5. THE System SHALL provide historical visibility into developer engagement patterns
