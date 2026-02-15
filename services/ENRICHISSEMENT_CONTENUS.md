# Phase 3 — Enrichissement contenus services

## 1. BENCHMARKING & INTELLIGENCE QoS

### Protocoles de mesure
**Méthodologie ARTCI-compliant**
- Campagnes drive-tests conformes aux spécifications techniques ARTCI
- Routes stratifiées : urbain dense, périurbain, zones rurales, axes routiers
- Horaires critiques : 8h-10h (peak morning), 12h-14h (midday), 17h-19h (peak evening)
- Fréquence de mesure : échantillonnage toutes les 2-5 secondes selon vitesse véhicule
- Technologies couvertes : 2G (GSM/GPRS/EDGE), 3G (UMTS/HSPA+), 4G (LTE/LTE-A), 5G NSA/SA

**Équipements certifiés**
- Scanners multi-opérateurs Keysight/TEMS/Nemo
- Smartphones de test calibrés (référence et DUT)
- Serveurs de test FTP/HTTP/Streaming dédiés
- Enregistrement GPS haute précision (<5m)

### Scoring par couche
**Service VOIX (CS Voice & VoLTE)**
- **Accessibilité** : taux de succès d'établissement d'appel (Call Setup Success Rate ≥98%)
- **Maintien** : taux d'appels non coupés (Call Drop Rate ≤2%)
- **Intégrité** : qualité audio MOS (Mean Opinion Score ≥3.5/5), POLQA, PESQ
- **Délai** : temps d'établissement d'appel (<6s 2G/3G, <3s 4G/5G)

**Service DATA (PS Data)**
- **Accessibilité RF** : taux de succès d'activation PDP/PDN (≥98%)
- **Maintien RF** : taux de sessions non interrompues (≥97%)
- **Accessibilité applicative** : succès HTTP GET/POST, FTP connexion (≥95%)
- **Débit** : DL/UL throughput par techno (ex: 4G DL ≥15 Mbps urbain, UL ≥5 Mbps)
- **Latency** : ping moyen (<50ms 4G, <20ms 5G), jitter, packet loss (<1%)

**Service SMS**
- Taux de succès d'envoi/réception (≥98%)
- Délai de bout en bout (<10s)

**Scoring global**
- Pondération par usage : Voix 40%, Data 50%, SMS 10%
- Normalisation 0-100 avec seuils ARTCI
- Heatmaps géolocalisées par KPI

### Restitution régulateur (ARTCI-ready)
**Rapports exécutifs**
- Synthèse comparative multi-opérateurs anonymisée
- Conformité SLA par opérateur vs obligations de licence
- Classement par zone administrative (communes, préfectures)
- Alertes zones mal desservies (blanc/gris sur couverture ou QoS)

**Dashboards décisionnels**
- Portail web interactif avec filtres dynamiques (opérateur, zone, techno, période)
- Export automatisé PDF/Excel pour comités techniques ARTCI
- Historiques tendanciels sur 6-12-24 mois
- Recommandations d'investissement priorisées (hotspots à améliorer)

**Livrables techniques**
- Fichiers log bruts (.mdf, .xml) pour audit indépendant
- Base de données géoréférencées (shapefiles, KML)
- Méthodologie détaillée et conditions de test
- Certificats de calibration des équipements

---

## 2. INGÉNIERIE TÉLÉCOM 360°

### HLD/LLD Radio & Backhaul
**High Level Design (HLD)**
- Architecture cible 3-5 ans : roadmap 2G→3G→4G→5G
- Stratégie spectre : réallocation fréquences, carrier aggregation, DSS (Dynamic Spectrum Sharing)
- Topologie réseau : macro/micro/small cells, distribution géographique
- Dimensionnement CAPEX par phase : sites nouveaux, upgrades, swaps
- Budget link : couverture indoor/outdoor, pénétration bâtiment

**Low Level Design (LLD)**
- Paramètres physiques par site : coordonnées GPS, hauteur pylône, azimuts/tilts antennes
- Cellules radio détaillées : PCI planning, EARFCN, TAC/LAC, TA, puissance émission
- Backhaul détaillé : topologie anneau/étoile, capacité MW/FO par lien, redondance
- Plan de fréquences optimisé : réutilisation, interférences co-canal/adjacent
- Budgets de liaison : MAPL (Maximum Allowable Path Loss), fade margin, availability 99.99%

### SON (Self-Organizing Networks)
**Optimisation automatisée**
- Auto-configuration : PCI auto-assignment, neighbour relation auto-discovery
- Auto-optimisation : MLB (Mobility Load Balancing), MRO (Mobility Robustness Optimization)
- RACH optimization : ajustement seuils, réduction collisions
- Coverage & Capacity Optimization (CCO) : ajustement tilts électriques à distance

**Tuning paramètres clés**
- Handover : seuils RSRP/RSRQ/SINR, hystérésis, TTT (Time To Trigger)
- Admission control : seuils de rejet pour préserver QoS existant
- Power control : inner/outer loop, compensation fast fading
- Scheduler : priorités QCI, algorithmes PF (Proportional Fair) / RR (Round Robin)

### Dimensionnement CAPEX/OPEX
**Modèle technico-économique**
- Trafic projeté : croissance CAGR voix/data par zone, profils utilisateurs
- Capacité requise : Erlangs voix, Mbps data, simultanéité, busy hour
- Nombre de sites : calcul par contrainte couverture + capacité
- Architecture transmission : coût MW vs FO, ROI, maintenance

**Budget détaillé 3-5 ans**
- CAPEX : équipements RAN (BTS/eNodeB/gNodeB), transmission, core, énergie, génie civil
- OPEX : spectrum fees, energy, maintenance, leasing sites, backhaul
- Scénarios optimisés : densification vs upgrade vs swap
- Break-even analysis et NPV (Net Present Value)

### SSV & Acceptance
**Single Site Verification (SSV)**
- Tests RF : drive-tests autour du site, vérification couverture prédite vs mesurée
- Tests end-to-end : voice calls, data sessions, handovers entrants/sortants
- Vérification KPI : CSSR, DCR, HOSR, DL/UL throughput
- PV d'acceptance avec critères Go/No-Go

**Intégration réseau**
- Neighbour list validation, PCI conflicts check
- Optimisation fine post-intégration : tilts, azimuts, puissance
- Monitoring 7 jours : stabilité KPI, détection anomalies
- Documentation as-built : photos site, configurations exportées

---

## 3. DÉPLOIEMENT & INSTALLATIONS TÉLÉCOM

### HSE (Health, Safety, Environment)
**Plan de sécurité**
- Analyse de risques par site : travaux en hauteur, électrification, circulation
- EPI obligatoires : casques, harnais, gants isolants, chaussures sécurité
- Procédures d'urgence : évacuation, premiers secours, contacts SAMU
- Briefings sécurité quotidiens : 15 min avant démarrage chantier

**Conformité environnementale**
- Étude d'impact environnemental (EIE) pour sites sensibles
- Gestion des déchets : tri, recyclage batteries/équipements
- Émissions RF : conformité ICNIRP, mesures exposition publique
- Nuisances sonores : isolation groupes électrogènes, horaires chantier

**Audit HSE**
- Inspections hebdomadaires par superviseur HSE
- Non-conformités trackées : catégorie (mineure/majeure/critique), délai correction
- Reporting mensuel : statistiques accidents/incidents, actions correctives
- Certifications : ISO 45001 (santé & sécurité), ISO 14001 (environnement)

### Quality Gates multi-niveaux
**Gate 1 : Site Survey validé**
- Faisabilité génie civil confirmée
- Line of Sight (LoS) transmission vérifié
- Autorisations administratives obtenues
- Go/No-Go management

**Gate 2 : Génie civil & énergie achevés**
- Fondations pylône conformes plans
- Abri/shelter équipé (climatisation, protection incendie)
- Énergie : raccordement réseau ou groupe + batterie backup
- Tests mise à la terre (<1 Ohm)

**Gate 3 : Équipements installés**
- BTS/eNodeB/gNodeB montés et câblés
- Antennes fixées : hauteur, azimuts, tilts conformes LLD
- Transmission MW/FO connectée et testée (BER <10^-12)
- Alimentation redondée fonctionnelle

**Gate 4 : Acceptance technique**
- SSV réussi (KPI conformes)
- Intégration réseau validée
- Dossier as-built complet
- PV signé client

### Dossiers as-built
**Documentation technique**
- Plans génie civil réalisés (vs design initial)
- Photos site : vue générale, détails équipements, câblage, énergie
- Liste matériels : numéros série équipements, longueurs câbles
- Configurations exportées : paramètres radio, transmission, énergie

**Traçabilité qualité**
- Rapports de tests : puissance émission, VSWR antennes, BER transmission
- Certificats de conformité : matériels, installations électriques
- Fiches d'intervention : dates, intervenants, durées, anomalies
- Garanties équipements et travaux

### PV d'acceptance standardisés
**Critères techniques**
- Couverture : RSRP ≥-110 dBm à 67% de la zone cible
- Accessibilité voix : CSSR ≥98%
- Accessibilité data : PDP/PDN SR ≥98%
- Débit : DL throughput ≥70% du théorique

**Critères administratifs**
- Conformité plans approuvés
- Respect délais contractuels
- HSE : 0 accident, 0 non-conformité critique
- Documentation complète remise

**Procédure signature**
- Pré-acceptance : validation technique équipe client
- Levée de réserves : délai 7 jours pour corrections mineures
- Acceptance définitive : PV co-signé, déclenchement paiement
- SAV : période garantie 12 mois

---

## 4. SOLUTIONS IT & CYBERSÉCURITÉ

### SOC 24/7 (Security Operations Center)
**Architecture SOC**
- SIEM centralisé : collecte logs réseaux, serveurs, applications, endpoints
- Corrélation événements : détection patterns malveillants, alertes temps réel
- Threat Intelligence : flux IoCs (Indicators of Compromise), CTI (Cyber Threat Intelligence)
- Orchestration SOAR : automatisation réponses incidents niveau 1

**Équipe & processus**
- Analystes SOC : shifts 3x8, escalade niveau 2/3
- Playbooks incidents : malware, phishing, DDoS, intrusion, fuite données
- Temps de réponse : alerte critique <15 min, majeure <1h, mineure <4h
- Reporting : dashboards temps réel, rapports hebdomadaires/mensuels management

**Use cases prioritaires**
- Détection ransomware & cryptominers
- Identification accès non autorisés (comptes compromis)
- Surveillance attaques DDoS/DoS
- Conformité PCI-DSS, ISO 27001, RGPD

### PRA/PCA (Plan Reprise Activité / Continuité)
**Stratégie de résilience**
- Site principal (production) + site secours distant (>50 km)
- Réplication synchrone/asynchrone selon criticité données
- Bascule automatique : clustering actif-actif ou actif-passif
- Tests trimestriels : simulation sinistres, mesure RTO/RPO réels

**RTO/RPO contractuels**
- **Criticité 1** (services vitaux : facturation, CRM) : RTO <1h, RPO <15 min
- **Criticité 2** (services importants : portail web, email) : RTO <4h, RPO <1h
- **Criticité 3** (services standards : reporting, intranet) : RTO <24h, RPO <4h

**Composants PRA/PCA**
- Sauvegarde incrémentielle quotidienne, complète hebdomadaire
- Snapshots applicatifs : bases de données, machines virtuelles
- Stockage géoredondé : cloud S3, NAS répliqué
- Runbooks de bascule : procédures détaillées, contacts escalade

### DevSecOps & Observabilité
**Pipeline DevSecOps**
- **Code** : SAST (Static Application Security Testing) intégré IDE
- **Build** : analyse dépendances (SCA), scan containers (Trivy, Clair)
- **Test** : DAST (Dynamic Application Security Testing), fuzzing
- **Deploy** : signature images, policy-as-code (OPA), secrets management (Vault)
- **Run** : runtime protection (Falco), RASP (Runtime Application Self-Protection)

**Observabilité full-stack**
- **Métriques** : CPU, mémoire, I/O, latences, taux d'erreur (RED : Rate, Errors, Duration)
- **Logs** : agrégation centralisée (ELK, Loki), corrélation avec traces
- **Traces** : APM (Application Performance Monitoring), distributed tracing (Jaeger)
- **Alertes** : seuils dynamiques, anomaly detection ML, escalade PagerDuty/Slack

**SLI/SLO/SLA**
- **SLI** (Service Level Indicators) : disponibilité, latence p50/p95/p99, error rate
- **SLO** (Service Level Objectives) : disponibilité ≥99.97%, latence p95 <200ms
- **SLA** (Service Level Agreement) : pénalités si non-respect SLO, crédits clients

### RTO/RPO contractuels détaillés
**Infrastructure critique (Tier 1)**
- RTO : <30 minutes (bascule automatique cluster)
- RPO : <5 minutes (réplication synchrone)
- Disponibilité : 99.99% (downtime max 52 min/an)

**Applications métiers (Tier 2)**
- RTO : <2 heures (restauration depuis backup chaud)
- RPO : <30 minutes (snapshots fréquents)
- Disponibilité : 99.97% (downtime max 4.4h/an)

**Services support (Tier 3)**
- RTO : <8 heures (restauration depuis backup froid)
- RPO : <4 heures (backup quotidien)
- Disponibilité : 99.9% (downtime max 43.8h/an)

---

## 5. CONSEIL & FORMATIONS

### Modules de formation
**Niveau 1 : Fondamentaux (2-3 jours)**
- Architectures réseaux mobiles 2G/3G/4G/5G : protocoles, interfaces, stack
- Principes radio : propagation, modulation, MIMO, beamforming
- KPI réseaux : définitions, méthodes de calcul, interprétation
- Public : techniciens débutants, non-télécoms reconvertis
- Format : 60% théorie, 40% labs pratiques

**Niveau 2 : Opérationnel (3-5 jours)**
- Planification radio : link budget, cell planning, frequency planning
- Optimisation RAN : analyse KPI, tuning paramètres, troubleshooting
- Drive-tests & benchmarking : outils TEMS/Nemo, analyse post-processing
- Public : ingénieurs réseaux, responsables NOC/RNO
- Format : 40% théorie, 60% cas pratiques réels

**Niveau 3 : Expert (5-10 jours)**
- Advanced RAN features : SON, CoMP, eICIC, CA, eMBMS
- Core network évolution : EPC, 5GC, network slicing, MEC
- Dimensionnement technico-économique : modèles CAPEX/OPEX, business case
- Public : architectes réseaux, responsables stratégie/planification
- Format : 30% théorie, 70% workshops, projets de groupe

**Modules transverses**
- Régulation télécom : obligations licences, contrôle QoS ARTCI, sanctions
- Gestion de projet PRINCE2 : phase initiation, planification, contrôle, clôture
- Cybersécurité IT/Telecom : menaces, architecture défense en profondeur, SOC
- HSE chantiers télécoms : risques, EPI, procédures d'urgence

### Indicateurs d'adoption
**Phase 1 : Évaluation initiale (J0)**
- Assessment compétences : quiz, exercices pratiques, gap analysis
- Identification besoins : entretiens managers, analyse fiches de poste
- Définition objectifs : compétences cibles, délais, budget

**Phase 2 : Formation (J+1 à J+30)**
- Taux de participation : présence ≥90% sessions
- Satisfaction à chaud : questionnaires post-formation, note ≥4/5
- Quiz de validation : score ≥80% pour certification

**Phase 3 : Transfert terrain (J+30 à J+90)**
- Coaching on-the-job : accompagnement 2-4 semaines par expert GWIT
- Projets tutorés : cas réels à résoudre avec support progressif décroissant
- Feedback managers : amélioration autonomie, réduction erreurs

**Phase 4 : Mesure d'impact (J+90 à J+180)**
- **Taux de certification** : % stagiaires ayant obtenu certificat final (objectif ≥85%)
- **Adoption processus** : % d'application des nouvelles méthodes (audit aléatoire, objectif ≥90%)
- **Temps résolution incidents** : réduction moyenne 30-50% post-formation
- **Productivité** : indicateurs métiers (ex: sites optimisés/ingénieur/mois +40%)
- **Autonomie** : réduction sollicitations support externe -60%

**Phase 5 : Pérennisation (J+180+)**
- Sessions de recyclage trimestrielles (1 jour)
- Veille technologique partagée : webinars mensuels sur nouveautés 5G, cyber, etc.
- Communauté de pratique : forum interne, partage retours d'expérience
- Certifications externes : préparation ITIL, PRINCE2, ISO 27001, Scrum

### Transfert de compétences
**Méthodologie structurée**
- **Shadowing** (semaines 1-2) : expert GWIT mène, stagiaire observe
- **Co-pilotage** (semaines 3-4) : expert & stagiaire collaborent à parts égales
- **Supervision** (semaines 5-6) : stagiaire mène, expert supervise et corrige
- **Autonomie** (semaine 7+) : stagiaire autonome, expert en support ponctuel

**Livrables du transfert**
- Manuels opératoires illustrés (procédures pas-à-pas, screenshots)
- Bibliothèque de cas types : troubleshooting guides, FAQ, lessons learned
- Templates & checklists : planification, tests, rapports
- Vidéos tutoriels : démonstrations outils, bonnes pratiques

**Mesure de la réussite**
- Autonomie atteinte : stagiaire peut réaliser tâche sans support (validation par manager)
- Qualité maintenue : erreurs <5% vs expert, respect délais
- Satisfaction client interne : feedback positif équipes qui sollicitent le stagiaire
- Pérennité : compétence maintenue 6 mois après fin du programme
