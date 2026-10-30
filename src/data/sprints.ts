import { SprintTier, CaseStudy } from '../types';

export const TIERS: SprintTier[] = [
  {
    id: 'ai',
    name: 'AI Workflow & Prompt QA',
    tagline: 'Reliable LLM Pipelines with Automated Eval Suites',
    iconName: 'Cpu',
    badge: 'Most Popular',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    accentColor: 'cyan',
    description: 'Automate manual ops, candidate screening, or document processing with reliable custom LLM pipelines.',
    pricing: {
      INR: { total: 35000, deposit: 17500, display: '₹35,000', depositDisplay: '₹17,500' },
      USD: { total: 650, deposit: 325, display: '$650', depositDisplay: '$325' },
      EUR: { total: 600, deposit: 300, display: '€600', depositDisplay: '€300' },
    },
    deliverables: [
      'End-to-end custom AI automation PoC',
      'Prompt architecture & evaluation suite (Ragas / DeepEval)',
      'GitHub repository & containerized API documentation',
      'Structured schema validation (Pydantic / Zod) & guardrails',
      '30-min recorded team training & handover session'
    ],
    techStack: ['Python / TypeScript', 'FastAPI / Next.js', 'LangChain / LlamaIndex', 'OpenAI / Gemini / Anthropic', 'DeepEval / Pytest', 'Docker'],
    sampleRepoStructure: [
      'pipeline/engine.py — Core prompt chaining & LLM router',
      'evals/benchmark.py — Golden dataset test & precision scores',
      'guardrails/filter.py — Hallucination & PII detection checks',
      'api/server.py — High-throughput async REST endpoint',
      'Dockerfile & docker-compose.yml'
    ],
    idealFor: 'Teams drowning in manual text reviews, support tickets, unstructured PDFs, or needing an audit-proof LLM evaluation pipeline.'
  },
  {
    id: 'security',
    name: 'Security & SIEM Triage',
    tagline: 'Defang Alert Fatigue with Precision Detection & SOAR Scripts',
    iconName: 'Shield',
    badge: 'High Impact',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    accentColor: 'emerald',
    description: 'Audit logs, eliminate false-positive alert noise, and deploy automated incident response scripts.',
    pricing: {
      INR: { total: 35000, deposit: 17500, display: '₹35,000', depositDisplay: '₹17,500' },
      USD: { total: 650, deposit: 325, display: '$650', depositDisplay: '$325' },
      EUR: { total: 600, deposit: 300, display: '€600', depositDisplay: '€300' },
    },
    deliverables: [
      'SIEM, firewall & app log audit & telemetry review',
      'Automated alert classification & enrichment script',
      'Custom alert routing dashboard config & noise filter',
      'Sigma / YARA detection rule repository',
      'Incident response playbook handbook & runbook'
    ],
    techStack: ['Wazuh / Splunk / Elastic', 'Python / Bash', 'Sigma Rules', 'VirusTotal / AbuseIPDB APIs', 'Slack / Webhook SOAR', 'Fluentbit'],
    sampleRepoStructure: [
      'ingest/log_normalizer.py — Multi-source log canonicalizer',
      'triage/classifier.py — Threat score calculation & false-positive filter',
      'enrichment/threat_intel.py — GeoIP, VirusTotal, AbuseIPDB lookup',
      'actions/quarantine_webhook.py — Automated endpoint isolation hook',
      'rules/sigma_rules.yml — Custom detection signatures'
    ],
    idealFor: 'DevOps & security teams overwhelmed by 10,000+ daily alerts and spending hours manually chasing routine anomalies.'
  },
  {
    id: 'iot',
    name: 'Smart Edge / IoT PoC',
    tagline: 'Embedded Microcontrollers to Cloud Telemetry Pipelines',
    iconName: 'Wrench',
    badge: 'Hardware & Cloud',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    accentColor: 'amber',
    description: 'Wire up ESP32/M5Stack sensors and build real-time cloud telemetry and monitoring pipelines.',
    pricing: {
      INR: { total: 35000, deposit: 17500, display: '₹35,000', depositDisplay: '₹17,500' },
      USD: { total: 650, deposit: 325, display: '$650', depositDisplay: '$325' },
      EUR: { total: 600, deposit: 300, display: '€600', depositDisplay: '€300' },
    },
    deliverables: [
      'Working ESP32 / ESPHome / C++ firmware PoC',
      'Secure real-time cloud telemetry pipeline (MQTT/TLS)',
      'BOM, wiring schematic & pinout map (Fritzing/KiCad)',
      'Edge threshold alerting & offline flash buffering logic',
      'Live system stress-test, bench video & handover'
    ],
    techStack: ['ESP32 / ESP-IDF / C++', 'ESPHome / MicroPython', 'MQTT over TLS (MQTTS)', 'InfluxDB / TimescaleDB', 'Grafana Dashboard', 'AWS IoT / HiveMQ'],
    sampleRepoStructure: [
      'firmware/main.cpp — Sensor loop, deep sleep & Wi-Fi state machine',
      'firmware/nvs_buffer.cpp — Flash storage for zero-data-loss disconnects',
      'backend/mqtt_subscriber.py — Secure payload ingestion service',
      'schematics/pinout_bom.pdf — Complete bill of materials & circuit guide',
      'dashboards/grafana_export.json — Plug-and-play monitoring layout'
    ],
    idealFor: 'Startups and industrial operators needing a tangible, working hardware prototype connecting sensors to a cloud dashboard fast.'
  }
];

export const SPRINT_TIMELINE = [
  {
    day: 'Day 1 - 2',
    title: 'Scope Lock & Architecture Alignment',
    summary: 'Kickoff call, access provisioning (APIs/hardware specs), threat/boundary definition, and binding acceptance test criteria.',
    deliverable: 'Approved Scope Statement & Architecture Blueprint'
  },
  {
    day: 'Day 3 - 6',
    title: 'Core Engine Build & Integration',
    summary: 'Writing the primary business logic: LLM orchestration, log parsing & enrichment pipelines, or sensor firmware & MQTT queues.',
    deliverable: 'Alpha Codebase & Integration Harness'
  },
  {
    day: 'Day 7 - 8',
    title: 'Mid-Point Checkpoint & Working Demo',
    summary: 'Interactive screen-share walkthrough of the live functional build. Adjust tolerances, edge cases, and client input in real time.',
    deliverable: 'Live Demo & Checkpoint Review Notes'
  },
  {
    day: 'Day 9 - 11',
    title: 'Hardening, Evals & Edge Case Testing',
    summary: 'Prompt regression testing, false-positive benchmarking, sensor stress tests, reconnect loops, and error-handling guardrails.',
    deliverable: 'Benchmark Report & Resiliency Suite'
  },
  {
    day: 'Day 12 - 13',
    title: 'Packaging, Dockerization & Runbooks',
    summary: 'Clean modular repository, `.env.example`, Docker setup, Swagger/API specs, wiring schematics, and incident playbooks.',
    deliverable: 'Production-Ready Repository & Documentation'
  },
  {
    day: 'Day 14',
    title: 'Final Handover & Team Walkthrough',
    summary: 'Full Git ownership transfer, 30-min recorded video handover for your engineering team, and kickoff of the 14-day bug warranty window.',
    deliverable: 'Full IP & Git Transfer + 30-Min Recorded Walkthrough'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-ai-1',
    trackId: 'ai',
    clientType: 'B2B Logistics SaaS',
    problem: 'Manual inspection of complex multi-page freight customs invoices was taking 45 minutes per shipment, resulting in backlogs.',
    solution: 'Built a multimodal RAG extraction engine with confidence scoring, Pydantic strict schemas, and automated human-in-the-loop flags.',
    results: [
      'Processing time dropped from 45 mins to 82 seconds',
      '99.2% extraction accuracy across 14 carrier formats',
      'Zero hallucinations via semantic citation validation'
    ],
    timeframe: 'Completed in exactly 12 days',
    tech: ['Python', 'FastAPI', 'Gemini Flash', 'Qdrant', 'DeepEval']
  },
  {
    id: 'cs-sec-1',
    trackId: 'security',
    clientType: 'Fintech Series A Platform',
    problem: 'Over 8,000 Wazuh SIEM alerts generated every 24 hours, causing security analyst burnout and missed real credential stuffing attacks.',
    solution: 'Engineered an intelligent enrichment proxy and Sigma-based deduplication layer with automated threat intel caching.',
    results: [
      '87.4% reduction in false-positive alert volume',
      'Sub-3-second Slack alert with geo-reputation context',
      'Automated rate-limiting IP webhook trigger'
    ],
    timeframe: 'Delivered in 13 days',
    tech: ['Wazuh', 'Python SOAR', 'Sigma Rules', 'Redis Cache', 'Slack API']
  },
  {
    id: 'cs-iot-1',
    trackId: 'iot',
    clientType: 'AgriTech Cold-Chain Fleet',
    problem: 'Perishable pharma cargo required continuous temperature & humidity telemetry with zero data loss during tunnel cellular blackouts.',
    solution: 'Built ESP32 firmware with local SPI flash circular buffer, auto-reconnecting TLS MQTT queue, and Grafana telemetry dashboards.',
    results: [
      'Zero data lost across 48-hour cellular dropouts',
      'Power-efficient sleep cycles extending battery life to 380 days',
      'Instant SMS/webhook dispatch on thermal threshold breach'
    ],
    timeframe: 'Completed in 14 days',
    tech: ['ESP32 (C++)', 'MQTT TLS', 'TimescaleDB', 'Grafana', 'Twilio Webhook']
  }
];

export const FAQS = [
  {
    question: 'Why 14 days and not an ongoing hourly retainer?',
    answer: 'Hourly billing misaligns incentives and leads to scope drag. A 14-day fixed-price sprint forces razor-sharp prioritization, clear acceptance criteria, and hands you an actual, functional system you can immediately deploy or build on.'
  },
  {
    question: 'Who owns the intellectual property and code?',
    answer: 'You do, 100%. Upon final payment on Day 14, all Git repositories, documentation, schematics, and configurations are transferred exclusively to your team with no vendor lock-in or recurring software licensing.'
  },
  {
    question: 'What happens if we discover the scope is larger on Day 1?',
    answer: 'During our Day 1 Scope Lock, we explicitly agree on the core minimum viable production proof-of-concept. If the project cannot realistically be shipped to production standards within 14 days, you can either de-scope to the most critical slice or receive an immediate 100% refund of your deposit.'
  },
  {
    question: 'What kind of support is included after Day 14?',
    answer: 'Every sprint includes a 14-day post-delivery bug warranty window. If any deliverable breaks due to bugs in our implemented code during that period, it will be patched promptly at no additional cost.'
  },
  {
    question: 'How do we communicate throughout the 14 days?',
    answer: 'You will receive an asynchronous daily recap via Slack, WhatsApp, or email, plus two live milestone calls: the Day 1 Scope Lock and the Day 8 Mid-Point Checkpoint demo.'
  }
];

export interface DayDeliverable {
  day: number;
  title: string;
  phaseId: number;
  phaseName: string;
  focus: string;
  ai: {
    deliverable: string;
    codeArtifact: string;
    acceptanceMetric: string;
  };
  security: {
    deliverable: string;
    codeArtifact: string;
    acceptanceMetric: string;
  };
  iot: {
    deliverable: string;
    codeArtifact: string;
    acceptanceMetric: string;
  };
  notification: {
    time: string;
    subject: string;
    summary: string;
    tags: string[];
    commitHash: string;
  };
}

export const DAILY_DELIVERABLES: DayDeliverable[] = [
  {
    day: 1,
    title: 'Scope Lock & Architecture Blueprint',
    phaseId: 1,
    phaseName: 'Scope Lock & Architecture',
    focus: 'Kickoff call, threat boundary & API access exchange',
    ai: {
      deliverable: 'Prompt architecture schematic & LLM schema definition',
      codeArtifact: 'specs/pipeline_architecture.md',
      acceptanceMetric: 'Mutual acceptance criteria signed off'
    },
    security: {
      deliverable: 'SIEM log telemetry audit & ingress threat model',
      codeArtifact: 'specs/threat_boundary_map.md',
      acceptanceMetric: 'Log sources mapped & ingestion format agreed'
    },
    iot: {
      deliverable: 'ESP32 pinout schematic, GPIO allocation & BOM review',
      codeArtifact: 'schematics/esp32_pinout_v1.pdf',
      acceptanceMetric: 'BOM component compatibility verified'
    },
    notification: {
      time: '05:30 PM',
      subject: 'Day 1 Complete: Scope Locked & Access Provisioned',
      summary: 'Kickoff call completed. Architecture blueprint signed off. Development branch initialized with zero blockers.',
      tags: ['Kickoff', 'Scope Locked', 'Access Exchanged'],
      commitHash: '0a71f9e'
    }
  },
  {
    day: 2,
    title: 'Acceptance Criteria & Test Matrix',
    phaseId: 1,
    phaseName: 'Scope Lock & Architecture',
    focus: 'Binding test matrix definition & golden sample dataset',
    ai: {
      deliverable: 'Curated 50-sample golden evaluation dataset with ground truth',
      codeArtifact: 'evals/datasets/golden_samples_v1.json',
      acceptanceMetric: '50 edge-case test cases approved'
    },
    security: {
      deliverable: 'Alert baseline audit & sample raw log capture archive',
      codeArtifact: 'data/raw_siem_logs_baseline.json',
      acceptanceMetric: 'Sample of 2,500 noisy alerts categorized'
    },
    iot: {
      deliverable: 'Firmware state machine specification & MQTT protocol schema',
      codeArtifact: 'firmware/include/state_machine_spec.h',
      acceptanceMetric: 'Payload byte-budget <= 256 bytes per packet'
    },
    notification: {
      time: '06:15 PM',
      subject: 'Day 2 Complete: Acceptance Test Matrix Established',
      summary: 'Golden baseline dataset and automated evaluation harness test assertions committed to repository.',
      tags: ['Test Suite', 'Baseline', 'PR #1 Merged'],
      commitHash: '1f84b2c'
    }
  },
  {
    day: 3,
    title: 'Core Engine Foundation & Ingestion Skeleton',
    phaseId: 2,
    phaseName: 'Core Engine & Ingestion',
    focus: 'Initial data ingestion pipelines and service skeleton',
    ai: {
      deliverable: 'FastAPI async ingestion proxy & document chunking parser',
      codeArtifact: 'pipeline/ingestion.py',
      acceptanceMetric: 'Pydantic strict schema parsing functional'
    },
    security: {
      deliverable: 'Log normalizer service & multi-source canonicalizer',
      codeArtifact: 'ingest/log_canonicalizer.py',
      acceptanceMetric: 'JSON / Syslog / CEF parsing latency < 4ms'
    },
    iot: {
      deliverable: 'ESP32 Wi-Fi & MQTT TLS client connection state machine',
      codeArtifact: 'firmware/src/mqtt_tls_client.cpp',
      acceptanceMetric: 'TLS handshake completes in < 800ms'
    },
    notification: {
      time: '06:45 PM',
      subject: 'Day 3 Complete: Core Ingestion Service Live in Staging',
      summary: 'Ingestion pipeline operational. Core data stream successfully flowing through initial transformation layer.',
      tags: ['Core Engine', 'Ingestion', 'CI Passed'],
      commitHash: '2e95a7d'
    }
  },
  {
    day: 4,
    title: 'Transformation Logic & Processing Engine',
    phaseId: 2,
    phaseName: 'Core Engine & Ingestion',
    focus: 'Primary algorithmic routing and extraction logic',
    ai: {
      deliverable: 'Prompt chaining graph with dynamic token budget router',
      codeArtifact: 'pipeline/prompt_chains.py',
      acceptanceMetric: 'Multi-stage LLM extraction working on test docs'
    },
    security: {
      deliverable: 'Deduplication engine & threat-intelligence cache layer',
      codeArtifact: 'triage/threat_cache.py',
      acceptanceMetric: 'Redis cache lookup sub-millisecond latency'
    },
    iot: {
      deliverable: 'Sensor I2C / SPI reading loop with hardware timers',
      codeArtifact: 'firmware/src/sensors_loop.cpp',
      acceptanceMetric: 'Sampling drift < 5ms over 1-hour test bench'
    },
    notification: {
      time: '05:50 PM',
      subject: 'Day 4 Complete: Processing Engine Functional',
      summary: 'Core transformation modules online. Initial end-to-end data flow verified on live sandbox inputs.',
      tags: ['Processing', 'Algorithms', 'Passes Unit Tests'],
      commitHash: '3d18c4b'
    }
  },
  {
    day: 5,
    title: 'Enrichment & Error Recovery Protocols',
    phaseId: 2,
    phaseName: 'Core Engine & Ingestion',
    focus: 'Handling edge cases, third-party lookups & retries',
    ai: {
      deliverable: 'Citation verification module & hallucination detection filter',
      codeArtifact: 'guardrails/citation_checker.py',
      acceptanceMetric: 'Factual hallucination rate < 1.5%'
    },
    security: {
      deliverable: 'VirusTotal & AbuseIPDB automated enrichment worker',
      codeArtifact: 'enrichment/intel_worker.py',
      acceptanceMetric: 'Parallel async enrichment without rate-limit breach'
    },
    iot: {
      deliverable: 'Flash NVS circular buffer for cellular / Wi-Fi dead zones',
      codeArtifact: 'firmware/src/nvs_circular_queue.cpp',
      acceptanceMetric: 'Zero byte loss across simulated 4-hour disconnect'
    },
    notification: {
      time: '06:30 PM',
      subject: 'Day 5 Complete: Error Resiliency & Enrichment Active',
      summary: 'Automatic retry logic, fault tolerance, and enrichment workers successfully integrated.',
      tags: ['Resiliency', 'Enrichment', 'Fault-Tolerant'],
      commitHash: '4a62e1f'
    }
  },
  {
    day: 6,
    title: 'Pre-Demo Integration & Alpha Stabilization',
    phaseId: 2,
    phaseName: 'Core Engine & Ingestion',
    focus: 'End-to-end alpha wiring and internal smoke test',
    ai: {
      deliverable: 'End-to-end pipeline connector with sample UI sandbox',
      codeArtifact: 'api/server.py',
      acceptanceMetric: 'End-to-end pipeline latency < 3.2s'
    },
    security: {
      deliverable: 'Automated alert routing dispatcher with Slack / PagerDuty webhook',
      codeArtifact: 'actions/webhook_dispatcher.py',
      acceptanceMetric: 'Critical alerts reach destination in < 1.2s'
    },
    iot: {
      deliverable: 'Cloud telemetry ingestion endpoint & TimescaleDB writer',
      codeArtifact: 'backend/telemetry_writer.py',
      acceptanceMetric: 'Ingests 100 msgs/sec without backpressure'
    },
    notification: {
      time: '07:10 PM',
      subject: 'Day 6 Complete: Alpha Codebase Assembled for Demo',
      summary: 'Alpha build frozen. All core capabilities passing internal integration suite in preparation for Day 8 demo.',
      tags: ['Alpha Build', 'Integration', 'Demo Prep'],
      commitHash: '5c73f8a'
    }
  },
  {
    day: 7,
    title: 'Mid-Point Benchmark & Demo Rehearsal',
    phaseId: 3,
    phaseName: 'Mid-Point Demo & Review',
    focus: 'Precision calibration and demo rehearsal run',
    ai: {
      deliverable: 'Initial evaluation score metrics (91.4% accuracy baseline)',
      codeArtifact: 'evals/reports/midpoint_eval_v1.json',
      acceptanceMetric: 'Demonstrable improvement over legacy manual process'
    },
    security: {
      deliverable: 'Live false-positive reduction metric: 78% noise filtered',
      codeArtifact: 'metrics/triage_efficiency.csv',
      acceptanceMetric: 'Zero critical true-positives filtered out'
    },
    iot: {
      deliverable: '24-hour continuous bench telemetry recording in Grafana',
      codeArtifact: 'dashboards/midpoint_grafana.json',
      acceptanceMetric: 'Continuous 24-hr runtime with zero packet drops'
    },
    notification: {
      time: '04:45 PM',
      subject: 'Day 7 Complete: Pre-Demo Benchmark Benchmarking',
      summary: 'Demo environment staging locked. Working screens and preliminary benchmark metrics ready for client walkthrough.',
      tags: ['Milestone', 'Benchmark', 'Ready for Demo'],
      commitHash: '6b89c3d'
    }
  },
  {
    day: 8,
    title: 'Mid-Point Live Demo & Calibration Checkpoint',
    phaseId: 3,
    phaseName: 'Mid-Point Demo & Review',
    focus: 'Interactive client screen-share & feedback calibration',
    ai: {
      deliverable: 'Live prompt extraction demo with client-provided edge documents',
      codeArtifact: 'docs/checkpoints/day8_demo_notes.md',
      acceptanceMetric: 'Client approved core workflow demonstration'
    },
    security: {
      deliverable: 'Live triage script execution on client sample SIEM alert log feed',
      codeArtifact: 'docs/checkpoints/day8_triage_review.md',
      acceptanceMetric: 'Filter sensitivity thresholds approved by client lead'
    },
    iot: {
      deliverable: 'Live hardware bench telemetry stream & threshold buzzer/alert trigger',
      codeArtifact: 'docs/checkpoints/day8_hardware_review.md',
      acceptanceMetric: 'Real-time telemetry acknowledged on client dashboard'
    },
    notification: {
      time: '03:30 PM',
      subject: 'Day 8 Milestone Met: Mid-Point Demo Approved!',
      summary: '25-minute live screen-share walkthrough completed. Client feedback notes recorded. Hardening phase begins.',
      tags: ['Client Approved', 'Live Demo', 'Milestone ✓'],
      commitHash: '7e90d2e'
    }
  },
  {
    day: 9,
    title: 'Client Feedback Integration & Edge-Case Hardening',
    phaseId: 4,
    phaseName: 'Hardening, Evals & Stress QA',
    focus: 'Implementing demo feedback and fine-tuning edge cases',
    ai: {
      deliverable: 'Dynamic schema fallback for multi-lingual and distorted PDFs',
      codeArtifact: 'pipeline/ocr_cleaner.py',
      acceptanceMetric: 'Handles poorly scanned and rotated document inputs'
    },
    security: {
      deliverable: 'Custom Sigma detection rules tailored to client infrastructure',
      codeArtifact: 'rules/sigma/custom_rules.yml',
      acceptanceMetric: 'Zero false alarms on authorized VPN / deployment IPs'
    },
    iot: {
      deliverable: 'Power optimization: Deep sleep state & sensor wake interrupt',
      codeArtifact: 'firmware/src/power_management.cpp',
      acceptanceMetric: 'Average sleep current < 18uA'
    },
    notification: {
      time: '06:00 PM',
      subject: 'Day 9 Complete: Checkpoint Feedback Implemented',
      summary: 'All Day 8 client feedback points addressed. Precision thresholds and edge-case guardrails tightened.',
      tags: ['Hardening', 'Feedback Applied', 'Sprint Pace'],
      commitHash: '8f01a3b'
    }
  },
  {
    day: 10,
    title: 'Evaluation Suite Benchmarking & Accuracy Regression',
    phaseId: 4,
    phaseName: 'Hardening, Evals & Stress QA',
    focus: 'Running rigorous automated regression evaluations',
    ai: {
      deliverable: 'DeepEval automated test report with 98.7% semantic precision',
      codeArtifact: 'evals/reports/regression_benchmark_v2.json',
      acceptanceMetric: 'Precision > 98% across all 50 golden test cases'
    },
    security: {
      deliverable: 'Noise filter stress test: 87.4% false-positive elimination verified',
      codeArtifact: 'metrics/final_benchmark.json',
      acceptanceMetric: 'Zero missed true positives across 10,000 simulated alerts'
    },
    iot: {
      deliverable: 'Thermal chamber / power cycle stress-test log report',
      codeArtifact: 'firmware/tests/stress_results.csv',
      acceptanceMetric: '500 continuous power-cut recoveries with zero corruption'
    },
    notification: {
      time: '06:30 PM',
      subject: 'Day 10 Complete: High-Score Regression Benchmark Achieved',
      summary: 'Regression evaluation finished with flying colors. Target accuracy and throughput metrics fully met.',
      tags: ['Benchmarked', '98%+ Accuracy', 'Stress QA'],
      commitHash: '9a12c4f'
    }
  },
  {
    day: 11,
    title: 'Security Audit, Guardrails & Secret Sanitation',
    phaseId: 4,
    phaseName: 'Hardening, Evals & Stress QA',
    focus: 'OWASP / injection checks, secrets sanitation & rate limiting',
    ai: {
      deliverable: 'Prompt injection defense & PII redactor middleware',
      codeArtifact: 'guardrails/prompt_injection_guard.py',
      acceptanceMetric: 'Blocks 100% of tested jailbreak & injection attacks'
    },
    security: {
      deliverable: 'Least-privilege API token scopes & encrypted secret storage config',
      codeArtifact: 'deploy/vault_config.yml',
      acceptanceMetric: 'Clean security audit scan (Bandit / Trivy)'
    },
    iot: {
      deliverable: 'Encrypted flash storage (NVS) & device unique certificate provisioning',
      codeArtifact: 'firmware/src/crypto_provisioning.cpp',
      acceptanceMetric: 'TLS mutual authentication (mTLS) compliant'
    },
    notification: {
      time: '05:40 PM',
      subject: 'Day 11 Complete: Security Hardening & Zero-Vulnerability Scan',
      summary: 'Prompt injection safeguards, secrets sanitation, and least-privilege token enforcement verified.',
      tags: ['Security Audit', 'Zero Vulnerabilities', 'Hardened'],
      commitHash: 'ab23d5e'
    }
  },
  {
    day: 12,
    title: 'Containerization, Docker Compose & Swagger Specs',
    phaseId: 5,
    phaseName: 'Packaging & IP Handover',
    focus: 'Production packaging, Docker environment & OpenAPI docs',
    ai: {
      deliverable: 'Multi-stage Dockerfile, docker-compose.yml & OpenAPI 3.1 Swagger spec',
      codeArtifact: 'docker-compose.yml',
      acceptanceMetric: 'Single-command launch via `docker compose up -d`'
    },
    security: {
      deliverable: 'Standalone containerized triage daemon & systemd service unit',
      codeArtifact: 'deploy/systemd/triage-daemon.service',
      acceptanceMetric: 'Automated restart upon host reboot verified'
    },
    iot: {
      deliverable: 'Complete KiCad / Fritzing schematics, Gerber files & final BOM',
      codeArtifact: 'hardware/schematics/esp32_sensor_board.kicad_sch',
      acceptanceMetric: '100% reproducible PCB / wiring schematic package'
    },
    notification: {
      time: '06:15 PM',
      subject: 'Day 12 Complete: Production Containers & Schematics Packaged',
      summary: 'Single-command deployment container verified. Comprehensive OpenAPI specs and wiring maps completed.',
      tags: ['Docker Ready', 'Packaging', 'Docs Complete'],
      commitHash: 'bc34e6f'
    }
  },
  {
    day: 13,
    title: 'Documentation, Operator Runbook & Staging Smoke Test',
    phaseId: 5,
    phaseName: 'Packaging & IP Handover',
    focus: 'Clear operational runbook and handover rehearsal',
    ai: {
      deliverable: 'Production Operator Runbook & prompt maintenance guide',
      codeArtifact: 'README.md & docs/OPERATOR_RUNBOOK.md',
      acceptanceMetric: 'Fresh engineer can replicate environment in < 15 mins'
    },
    security: {
      deliverable: 'Incident Response Playbook handbook & rule authoring guide',
      codeArtifact: 'docs/INCIDENT_RESPONSE_PLAYBOOK.md',
      acceptanceMetric: 'Step-by-step containment instructions verified'
    },
    iot: {
      deliverable: 'Firmware flashing guide, OTA update workflow & calibration sheet',
      codeArtifact: 'docs/FIRMWARE_FLASHING_GUIDE.md',
      acceptanceMetric: 'One-click flashing via esptool / PlatformIO'
    },
    notification: {
      time: '05:00 PM',
      subject: 'Day 13 Complete: Runbooks Written & Final Smoke Test Passed',
      summary: 'Comprehensive documentation and operator runbook committed. Staging smoke test passed with 100% green metrics.',
      tags: ['Runbooks', 'Clean Docs', 'Handover Ready'],
      commitHash: 'cd45f7a'
    }
  },
  {
    day: 14,
    title: 'Full Repository Ownership Transfer & Video Handover',
    phaseId: 5,
    phaseName: 'Packaging & IP Handover',
    focus: 'Git repo ownership transfer, recorded walkthrough & 14-day warranty',
    ai: {
      deliverable: 'Git repo transferred to client org + 30-min recorded team training video',
      codeArtifact: 'HANDOVER_SIGNOFF.md',
      acceptanceMetric: 'Client has 100% exclusive administrative repo control'
    },
    security: {
      deliverable: 'Full SIEM triage repo transferred + recorded SecOps team runbook demo',
      codeArtifact: 'HANDOVER_SIGNOFF.md',
      acceptanceMetric: 'Client SecOps team successfully triggers test quarantine'
    },
    iot: {
      deliverable: 'Firmware repo transferred + bench video walkthrough & warranty kickoff',
      codeArtifact: 'HANDOVER_SIGNOFF.md',
      acceptanceMetric: 'Client receives working firmware, BOM and Grafana setup'
    },
    notification: {
      time: '04:00 PM',
      subject: 'Day 14 Sprint Handover Complete: 100% IP Transferred!',
      summary: 'Repository transfer confirmed. 30-min recorded team training video dispatched. 14-day bug warranty active.',
      tags: ['Handover Complete', '100% Client IP', 'Warranty Active'],
      commitHash: 'de56a8b'
    }
  }
];

