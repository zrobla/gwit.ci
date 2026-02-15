# Phase 3 — Plan d'intégration du contenu technique

## Constat Audit

**Document source** : `services/ENRICHISSEMENT_CONTENUS.md` (15,6 Ko)  
**Statut actuel** : ⚠️ Contenu technique détaillé NON intégré dans les pages HTML

### Analyse présence termes techniques par page

| Page | Termes présents | Profondeur | Gap détecté |
|------|----------------|------------|-------------|
| `benchmarking.html` | ARTCI-ready (1×), CAPEX/OPEX (2×), scoring (3×) | Superficiel | ❌ Manque protocoles détaillés, scoring par couche (Voix/Data/SMS), dashboards personas |
| `ingenierie-telecom.html` | HLD/LLD (1×), CAPEX/OPEX (1×), SON (mentionné) | Basique | ❌ Manque détails SON (MLB/MRO/CCO), dimensionnement 3-5 ans, SSV/acceptance |
| `installations-telecom.html` | quality gate (1×) | Minimal | ❌ Manque HSE (ISO 45001/14001), 4 quality gates, dossiers as-built, PV acceptance |
| `solutions-it.html` | SOC (1×), RTO/RPO (mentionné light) | Incomplet | ❌ Manque SOC 24/7 (SIEM/SOAR), PRA/PCA détaillé, DevSecOps, observabilité |
| `conseil-formation.html` | 0 terme technique détaillé | Très limité | ❌ Manque modules (3 niveaux), indicateurs adoption (5 phases), transfert structuré |

**Conclusion** : Les pages contiennent des mentions superficielles mais PAS le contenu technique approfondi documenté dans ENRICHISSEMENT_CONTENUS.md.

---

## Actions requises : Intégration HTML

### 1. Benchmarking.html
**Sections à ajouter** :
```html
<section class="service-section">
  <div class="container">
    <h2>Protocoles de mesure ARTCI-compliant</h2>
    <div class="protocol-grid">
      <div class="protocol-card">
        <h3>Méthodologie terrain</h3>
        <ul>
          <li>Routes stratifiées : urbain dense, périurbain, rural, axes routiers</li>
          <li>Horaires critiques : 8h-10h, 12h-14h, 17h-19h (peaks)</li>
          <li>Échantillonnage : toutes les 2-5s selon vitesse</li>
          <li>Technologies : 2G → 5G (NSA/SA)</li>
        </ul>
      </div>
      <div class="protocol-card">
        <h3>Équipements certifiés</h3>
        <ul>
          <li>Scanners Keysight/TEMS/Nemo multi-opérateurs</li>
          <li>Smartphones calibrés (référence + DUT)</li>
          <li>Serveurs test FTP/HTTP/Streaming dédiés</li>
          <li>GPS haute précision (<5m)</li>
        </ul>
      </div>
    </div>

    <h2>Scoring par couche</h2>
    <div class="scoring-layers">
      <div class="layer-card">
        <h3>Service VOIX (40% pondération)</h3>
        <table>
          <tr><td>Call Setup Success Rate</td><td>≥98%</td></tr>
          <tr><td>Call Drop Rate</td><td>≤2%</td></tr>
          <tr><td>MOS audio (POLQA/PESQ)</td><td>≥3.5/5</td></tr>
          <tr><td>Délai établissement</td><td><6s (2G/3G), <3s (4G/5G)</td></tr>
        </table>
      </div>
      <div class="layer-card">
        <h3>Service DATA (50% pondération)</h3>
        <table>
          <tr><td>Accessibilité RF (PDP/PDN)</td><td>≥98%</td></tr>
          <tr><td>Maintien RF</td><td>≥97%</td></tr>
          <tr><td>HTTP/FTP succès</td><td>≥95%</td></tr>
          <tr><td>DL throughput 4G urbain</td><td>≥15 Mbps</td></tr>
          <tr><td>Latency 4G/5G</td><td><50ms / <20ms</td></tr>
        </table>
      </div>
      <div class="layer-card">
        <h3>Service SMS (10% pondération)</h3>
        <table>
          <tr><td>Taux succès envoi/réception</td><td>≥98%</td></tr>
          <tr><td>Délai bout-en-bout</td><td><10s</td></tr>
        </table>
      </div>
    </div>

    <h2>Restitution régulateur (ARTCI-ready)</h2>
    <div class="deliverables-grid">
      <div class="deliverable-card">
        <h3>Rapports exécutifs</h3>
        <ul>
          <li>Synthèse comparative multi-opérateurs anonymisée</li>
          <li>Conformité SLA vs obligations de licence</li>
          <li>Classement par zone administrative (communes, préfectures)</li>
          <li>Alertes zones mal desservies (blanc/gris)</li>
        </ul>
      </div>
      <div class="deliverable-card">
        <h3>Dashboards décisionnels</h3>
        <ul>
          <li>Portail web interactif avec filtres dynamiques</li>
          <li>Heatmaps géolocalisées par KPI</li>
          <li>Exports Excel/PDF automatisés</li>
          <li>API REST pour intégration SI client</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

### 2. Ingenierie-telecom.html
**Sections à ajouter** :
```html
<section class="service-section">
  <div class="container">
    <h2>HLD/LLD Radio & Backhaul</h2>
    <div class="design-levels">
      <div class="level-card">
        <h3>High-Level Design (HLD)</h3>
        <ul>
          <li>Architecture réseau global (RAN, Transport, Core)</li>
          <li>Stratégie fréquentielle multi-bandes (700/900/1800/2100/2600 MHz)</li>
          <li>Roadmap technologique (2G sunset → 5G standalone)</li>
          <li>Capacité cible par zone (GO/mois, abonnés actifs)</li>
        </ul>
      </div>
      <div class="level-card">
        <h3>Low-Level Design (LLD)</h3>
        <ul>
          <li>Fichiers site-by-site (coordonnées, azimuts, tilts)</li>
          <li>Link budget détaillé (gains antenne, pertes propagation)</li>
          <li>Dimensionnement nombre de TRX/secteurs</li>
          <li>Ingénierie voisinage (liste adjacence, handover, ANR)</li>
        </ul>
      </div>
    </div>

    <h2>SON & Optimisation</h2>
    <div class="son-modules">
      <div class="module-card">
        <h3>MLB (Mobility Load Balancing)</h3>
        <p>Répartition charge inter-fréquences & inter-RAT selon congestion</p>
      </div>
      <div class="module-card">
        <h3>MRO (Mobility Robustness Optimization)</h3>
        <p>Réduction HO failures, ping-pong, RLF via ajustement automatique TTT/Hysteresis</p>
      </div>
      <div class="module-card">
        <h3>CCO (Coverage & Capacity Optimization)</h3>
        <p>Auto-tuning puissance pilote, RACH, admission control</p>
      </div>
    </div>

    <h2>Dimensionnement CAPEX/OPEX</h2>
    <table class="capex-table">
      <thead>
        <tr><th>Poste</th><th>CAPEX (Year 1-3)</th><th>OPEX annuel</th></tr>
      </thead>
      <tbody>
        <tr><td>Sites (rollout)</td><td>BBU, RRU, antennes, câbles</td><td>Energie, loyers, maintenance</td></tr>
        <tr><td>Transmission</td><td>MW hops, fibres, agrégateurs</td><td>Leased lines, IP transit</td></tr>
        <tr><td>Core</td><td>EPC/5GC, IMS, HSS, licences</td><td>Serveurs, support éditeurs</td></tr>
        <tr><td>Ingénierie</td><td>Outils (SON, OSS, OMC)</td><td>Consultants, trainings</td></tr>
      </tbody>
    </table>

    <h2>SSV & Acceptance</h2>
    <ul>
      <li><strong>SSV (Single Site Verification)</strong> : tests post-installation (RSRP, SINR, DL/UL throughput, handover, CSFB)</li>
      <li><strong>Cluster acceptance</strong> : validation inter-site (voisinage, HO success, KPI agrégés)</li>
      <li><strong>PV réception</strong> : dossier avec mesures, screenshots OMC, recommandations tuning</li>
    </ul>
  </div>
</section>
```

### 3. Installations-telecom.html
**Sections à ajouter** :
```html
<section class="service-section">
  <div class="container">
    <h2>HSE (Hygiène, Sécurité, Environnement)</h2>
    <div class="hse-compliance">
      <div class="cert-card">
        <h3>ISO 45001:2018</h3>
        <p>Système de management Santé & Sécurité au travail</p>
        <ul>
          <li>Formation sécurité obligatoire (travaux en hauteur, électrique)</li>
          <li>EPI fournis : casques, harnais, gants isolants</li>
          <li>Procédures rescue & premiers secours</li>
        </ul>
      </div>
      <div class="cert-card">
        <h3>ISO 14001:2015</h3>
        <p>Système de management environnemental</p>
        <ul>
          <li>Gestion déchets (piles, batteries, huiles usagées)</li>
          <li>Mesure émissions RF vs limites OMS/ICNIRP</li>
          <li>Études d'impact environnemental sites sensibles</li>
        </ul>
      </div>
    </div>

    <h2>Quality Gates (4 niveaux)</h2>
    <div class="gates-timeline">
      <div class="gate">
        <h3>Gate 1 : Survey</h3>
        <ul>
          <li>Validation faisabilité technique (ligne de vue MW, accès fibre)</li>
          <li>Autorisations : permis de construire, accord propriétaire, mairie</li>
          <li>Photos géoréférencées, croquis, levé topographique</li>
        </ul>
        <p><strong>Critère Go/No-Go</strong> : Faisabilité confirmée + autorisations en cours</p>
      </div>
      <div class="gate">
        <h3>Gate 2 : Génie civil</h3>
        <ul>
          <li>Fondations pylône (calcul structure, béton, ancrage)</li>
          <li>Local technique (murs, toiture, climatisation, groupe électrogène)</li>
          <li>Raccordement énergie & transmission</li>
        </ul>
        <p><strong>Critère Go/No-Go</strong> : PV réception travaux civils signé</p>
      </div>
      <div class="gate">
        <h3>Gate 3 : Installation</h3>
        <ul>
          <li>Montage pylône, antennes, câbles feeders</li>
          <li>Installation équipements actifs (BBU, RRU, rectifiers)</li>
          <li>Mise sous tension, configuration OMC, intégration réseau</li>
        </ul>
        <p><strong>Critère Go/No-Go</strong> : Site ON AIR avec alarmes normales</p>
      </div>
      <div class="gate">
        <h3>Gate 4 : Acceptance</h3>
        <ul>
          <li>SSV complet (drive-tests, benchmarks KPI)</li>
          <li>Dossier as-built (plans mis à jour, photos, inventaire équipements)</li>
          <li>Formation équipe exploitation client</li>
        </ul>
        <p><strong>Critère Go/No-Go</strong> : KPI ≥ seuils contractuels + PV réception signé</p>
      </div>
    </div>

    <h2>Dossiers As-Built</h2>
    <ul>
      <li>Plans AutoCAD/PDF avec coordonnées GPS précises</li>
      <li>Photos avant/pendant/après travaux horodatées</li>
      <li>Inventaire exhaustif équipements (S/N, versions logicielles)</li>
      <li>Mesures finales : RSRP, SINR, throughput, azimuts/tilts vérifiés</li>
      <li>Certificats de conformité RF (limites exposition champs électromagnétiques)</li>
    </ul>
  </div>
</section>
```

### 4. Solutions-it.html
**Sections à ajouter** :
```html
<section class="service-section">
  <div class="container">
    <h2>SOC 24/7 (Security Operations Center)</h2>
    <div class="soc-architecture">
      <div class="soc-layer">
        <h3>Collecte & Détection</h3>
        <ul>
          <li><strong>SIEM</strong> : Splunk/QRadar/ELK pour agrégation logs (firewalls, IDS/IPS, endpoints)</li>
          <li><strong>EDR</strong> : CrowdStrike/SentinelOne pour menaces endpoints</li>
          <li><strong>NTA</strong> : analyse trafic réseau (DarkTrace, anomalies comportementales)</li>
        </ul>
      </div>
      <div class="soc-layer">
        <h3>Orchestration & Réponse</h3>
        <ul>
          <li><strong>SOAR</strong> : Cortex XSOAR/Demisto pour automatisation workflows</li>
          <li><strong>Playbooks</strong> : scénarios pré-définis (phishing, malware, DDoS)</li>
          <li><strong>Ticketing</strong> : intégration ServiceNow/JIRA pour suivi incidents</li>
        </ul>
      </div>
      <div class="soc-layer">
        <h3>SLA Réactivité</h3>
        <table>
          <tr><td>Critique (P1)</td><td>Détection <15min, Containment <30min</td></tr>
          <tr><td>Majeure (P2)</td><td>Détection <1h, Résolution <4h</td></tr>
          <tr><td>Mineure (P3)</td><td>Détection <4h, Résolution <24h</td></tr>
        </table>
      </div>
    </div>

    <h2>PRA/PCA (Plans Reprise/Continuité)</h2>
    <div class="dr-tiers">
      <div class="tier-card">
        <h3>Tier 1 : Critique</h3>
        <p><strong>RTO</strong> : <30min | <strong>RPO</strong> : <5min</p>
        <ul>
          <li>Réplication synchrone active-active</li>
          <li>Cluster haute disponibilité (Pacemaker/DRBD)</li>
          <li>Basculement automatique sans intervention humaine</li>
          <li><em>Ex : Core banking, facturation temps réel</em></li>
        </ul>
      </div>
      <div class="tier-card">
        <h3>Tier 2 : Important</h3>
        <p><strong>RTO</strong> : <4h | <strong>RPO</strong> : <1h</p>
        <ul>
          <li>Réplication asynchrone vers site distant</li>
          <li>Snapshots horaires (ZFS/LVM)</li>
          <li>Procédures basculement semi-automatisées</li>
          <li><em>Ex : ERP, CRM, portail e-commerce</em></li>
        </ul>
      </div>
      <div class="tier-card">
        <h3>Tier 3 : Standard</h3>
        <p><strong>RTO</strong> : <24h | <strong>RPO</strong> : <24h</p>
        <ul>
          <li>Sauvegardes quotidiennes (Veeam/Bacula)</li>
          <li>Stockage offsite (bandes LTO, cloud S3)</li>
          <li>Restauration manuelle sur environnement froid</li>
          <li><em>Ex : Data warehouse, archives, outils internes</em></li>
        </ul>
      </div>
    </div>

    <h2>DevSecOps Pipeline</h2>
    <div class="pipeline-stages">
      <div class="stage">
        <h3>1. Code (Git)</h3>
        <p>GitLab/GitHub avec branch protection, MFA, signed commits</p>
      </div>
      <div class="stage">
        <h3>2. SAST (Static)</h3>
        <p>SonarQube, Checkmarx : scan code source (vulns, secrets hardcodés)</p>
      </div>
      <div class="stage">
        <h3>3. Build (CI)</h3>
        <p>Jenkins/GitLab CI : compilation, tests unitaires, image Docker</p>
      </div>
      <div class="stage">
        <h3>4. DAST (Dynamic)</h3>
        <p>OWASP ZAP, Burp Suite : scan appli déployée (XSS, SQLi, CSRF)</p>
      </div>
      <div class="stage">
        <h3>5. SCA (Dependencies)</h3>
        <p>Snyk, Dependabot : vulns librairies tierces (CVE tracking)</p>
      </div>
      <div class="stage">
        <h3>6. Deploy (CD)</h3>
        <p>ArgoCD/Spinnaker : déploiement Kubernetes avec policies OPA/Gatekeeper</p>
      </div>
      <div class="stage">
        <h3>7. Runtime Protection</h3>
        <p>Falco/Sysdig : détection comportements anormaux containers</p>
      </div>
    </div>

    <h2>Observabilité Full-Stack</h2>
    <div class="observability-pillars">
      <div class="pillar">
        <h3>Metrics (RED/USE)</h3>
        <ul>
          <li>Prometheus + Grafana : CPU, RAM, disk, network</li>
          <li>RED : Rate, Errors, Duration (services)</li>
          <li>USE : Utilization, Saturation, Errors (infra)</li>
        </ul>
      </div>
      <div class="pillar">
        <h3>Logs (ELK)</h3>
        <ul>
          <li>Elasticsearch + Logstash/Fluentd + Kibana</li>
          <li>Parsing structured logs (JSON), indexation full-text</li>
          <li>Alertes seuils (taux erreurs HTTP 5xx, exceptions Java)</li>
        </ul>
      </div>
      <div class="pillar">
        <h3>Traces (Distributed)</h3>
        <ul>
          <li>Jaeger/Zipkin : traçage appels micro-services</li>
          <li>Spans avec contexte de propagation (headers W3C)</li>
          <li>Analyse latence bout-en-bout, hot paths</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

### 5. Conseil-formation.html
**Sections à ajouter** :
```html
<section class="service-section">
  <div class="container">
    <h2>Modules de formation (3 niveaux)</h2>
    <div class="training-levels">
      <div class="level-card">
        <h3>Niveau 1 : Fondamentaux (5 jours)</h3>
        <p><strong>Public</strong> : Nouveaux entrants, reconversion</p>
        <ul>
          <li>Concepts réseau telecom (CS/PS, protocoles RRC/NAS)</li>
          <li>Architecture RAN 2G→5G (NodeB, eNodeB, gNodeB)</li>
          <li>Core mobile (MSC, SGSN, MME, AMF)</li>
          <li>KPI essentiels (CSSR, CDR, Throughput, Latency)</li>
        </ul>
        <p><strong>Certification</strong> : QCM 80% réussite</p>
      </div>
      <div class="level-card">
        <h3>Niveau 2 : Opérationnel (10 jours)</h3>
        <p><strong>Public</strong> : Ingénieurs junior, techniciens senior</p>
        <ul>
          <li>Planification RF (link budget, modèles propagation)</li>
          <li>Optimisation (drive-tests, tuning paramètres)</li>
          <li>Troubleshooting (analyse logs OMC, traces Wireshark)</li>
          <li>Projets sur cas réels (dimensionnement cluster LTE)</li>
        </ul>
        <p><strong>Certification</strong> : Projet pratique + présentation</p>
      </div>
      <div class="level-card">
        <h3>Niveau 3 : Expert (15 jours)</h3>
        <p><strong>Public</strong> : Seniors, leaders techniques</p>
        <ul>
          <li>Architecture E2E multi-vendor (Ericsson/Huawei/Nokia)</li>
          <li>SON avancé (MLB/MRO/CCO, algorithmes propriétaires)</li>
          <li>5G standalone : slicing, MEC, URLLC</li>
          <li>Business case CAPEX/OPEX, roadmaps stratégiques</li>
        </ul>
        <p><strong>Certification</strong> : Mémoire technique + soutenance devant jury</p>
      </div>
    </div>

    <h2>Indicateurs d'adoption (5 phases)</h2>
    <div class="adoption-phases">
      <div class="phase">
        <h3>J+0 : Baseline</h3>
        <p>Audit compétences initiales (test diagnostic, cartographie gaps)</p>
      </div>
      <div class="phase">
        <h3>J+30 : Formation</h3>
        <p>Taux participation ≥90%, satisfaction ≥4/5</p>
      </div>
      <div class="phase">
        <h3>J+60 : Application</h3>
        <p>Suivi projets pilotes avec KPI définis (ex: réduire CSSR <95% de 30%)</p>
      </div>
      <div class="phase">
        <h3>J+120 : Autonomie</h3>
        <p>Équipes capables de reproduire méthodologies sans support externe</p>
      </div>
      <div class="phase">
        <h3>J+180 : Amélioration continue</h3>
        <p>Innovation locale (nouveaux use cases, optimisations spécifiques contexte)</p>
      </div>
    </div>

    <h2>Transfert de compétences structuré</h2>
    <div class="transfer-method">
      <div class="method-step">
        <h3>1. Shadowing (Semaines 1-2)</h3>
        <p>Équipes client observent consultants GWIT sur missions réelles</p>
      </div>
      <div class="method-step">
        <h3>2. Co-pilotage (Semaines 3-6)</h3>
        <p>Binômes mixtes : client mène, consultant supervise et corrige</p>
      </div>
      <div class="method-step">
        <h3>3. Autonomie supervisée (Semaines 7-10)</h3>
        <p>Client exécute en solo, revues hebdomadaires avec GWIT</p>
      </div>
      <div class="method-step">
        <h3>4. Support distant (Mois 4-6)</h3>
        <p>Hotline technique, Q&A, partage bonnes pratiques</p>
      </div>
    </div>

    <h2>Livrables pédagogiques</h2>
    <ul>
      <li><strong>Documentation</strong> : Supports de cours (PDF), labs pratiques (VMs préconfigurées)</li>
      <li><strong>Toolbox</strong> : Scripts Python/MATLAB, templates Excel dimensionnement</li>
      <li><strong>Knowledge base</strong> : Wiki interne avec FAQ, troubleshooting guides</li>
      <li><strong>Vidéos</strong> : Screencast procédures complexes (re-visionnables)</li>
    </ul>
  </div>
</section>
```

---

## Plan d'exécution

### Étape 1 : Backup pages actuelles
```bash
cd services/
for f in *.html; do cp "$f" "${f%.html}_backup.html"; done
```

### Étape 2 : Intégrer contenus section par section
- Éditer chaque `services/*.html` après la section hero existante
- Ajouter les blocs HTML détaillés ci-dessus
- Vérifier cohérence classes CSS (service-section, container, grid layouts)

### Étape 3 : CSS complémentaire (si nécessaire)
```css
/* assets/css/gwit-refresh.css */
.protocol-grid, .scoring-layers, .design-levels, .son-modules, 
.gates-timeline, .soc-architecture, .dr-tiers, .pipeline-stages,
.observability-pillars, .training-levels, .adoption-phases, .transfer-method {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.protocol-card, .layer-card, .level-card, .module-card, .gate,
.soc-layer, .tier-card, .stage, .pillar, .phase, .method-step {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #0066cc;
}

.capex-table {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
}

.capex-table th, .capex-table td {
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  text-align: left;
}

.capex-table thead {
  background: #0066cc;
  color: white;
}
```

### Étape 4 : Tests
- Vérifier responsive (mobile/tablet/desktop)
- Valider liens internes
- Contrôler accessibilité (headings hiérarchie, contrastes)

### Étape 5 : Mise à jour rapports
- Actualiser `Phase3_rapport.md` : statut "Intégré dans HTML"
- Mettre à jour `GWIT_content_workplan.md` : Phase 3 100% terminée

---

## Estimation effort

| Tâche | Temps estimé |
|-------|--------------|
| Backup + setup | 10 min |
| Integration benchmarking.html | 45 min |
| Integration ingenierie-telecom.html | 60 min |
| Integration installations-telecom.html | 45 min |
| Integration solutions-it.html | 60 min |
| Integration conseil-formation.html | 45 min |
| CSS ajustements | 30 min |
| Tests multi-devices | 30 min |
| **TOTAL** | **~5h** |

---

## Validation finale

**Checklist** :
- [ ] 5 pages services/*.html enrichies avec contenu technique détaillé
- [ ] Termes techniques présents : HLD/LLD, SON (MLB/MRO/CCO), CAPEX/OPEX 3-5 ans, SSV, ISO 45001/14001, 4 quality gates, SOC 24/7, SIEM/SOAR, PRA/PCA RTO/RPO, DevSecOps, 3 niveaux formation, 5 phases adoption
- [ ] CSS responsive fonctionnel
- [ ] Accessibilité préservée (headings, alt, contrastes)
- [ ] Maillage interne cohérent (liens cross-services)
- [ ] Rapports phases actualisés

**Une fois complété, le site GWIT aura atteint 100% de profondeur technique documentée sur toutes les pages services.**
