window.CORA_ARCHITECTURE = {
 "nodeFunctions": {
 "process/master.html": {
 "1.1": [
 "1.1",
 "1.3"
 ],
 "1.2": [
 "1.4",
 "2.5"
 ],
 "1.3": [
 "1.5"
 ],
 "1.4": [
 "3.1",
 "3.2",
 "3.3",
 "3.4",
 "3.5",
 "3.6",
 "3.7"
 ],
 "1.5": [
 "3.1"
 ],
 "1.6": [
 "7.2",
 "7.3"
 ],
 "4.1": [
 "4.1"
 ],
 "2.0": [
 "2.1",
 "2.2",
 "2.3",
 "2.4",
 "2.5",
 "2.6",
 "2.7"
 ],
 "5.0": [
 "5.1",
 "5.2",
 "5.3",
 "5.4",
 "5.5",
 "5.6"
 ],
 "6.0": [
 "6.1",
 "6.2",
 "6.3",
 "6.4",
 "6.5",
 "6.6",
 "6.7",
 "6.8",
 "6.9"
 ],
 "3.0": [
 "3.6"
 ],
 "4.0": [
 "4.1",
 "4.2",
 "4.3",
 "4.4",
 "4.5",
 "4.6"
 ]
 },
 "process/intake.html": {
 "1.1.1": [
 "1.1"
 ],
 "1.1.2": [
 "1.3"
 ],
 "1.1.3": [
 "1.1",
 "1.3"
 ],
 "1.1.4": [
 "1.1"
 ],
 "1.1.5": [
 "1.5",
 "6.1",
 "6.6"
 ],
 "1.2.1": [
 "1.2"
 ],
 "1.2.2": [
 "1.4"
 ],
 "4.1.1": [
 "4.1"
 ],
 "5.1.1": [
 "5.1"
 ],
 "5.1.2": [
 "2.5",
 "5.1"
 ],
 "6.1.1": [
 "6.1"
 ],
 "6.1.2": [
 "6.6",
 "6.9"
 ]
 },
 "process/intelligence.html": {
 "2.0.1": [],
 "2.1": [
 "2.1"
 ],
 "2.2": [
 "2.2"
 ],
 "2.3": [
 "2.3"
 ],
 "2.4": [
 "2.4"
 ],
 "2.5": [
 "2.5"
 ],
 "2.6": [
 "2.6"
 ],
 "2.7": [
 "2.7"
 ],
 "2.8": [
 "1.5",
 "3.1"
 ]
 },
 "process/decision-readiness.html": {
 "3.1": [
 "1.5",
 "3.1"
 ],
 "3.2": [
 "3.1"
 ],
 "3.3": [
 "3.2",
 "3.3"
 ],
 "3.4": [
 "3.2"
 ],
 "3.5": [
 "3.5"
 ],
 "3.7": [
 "3.3",
 "3.6"
 ],
 "3.8": [
 "3.6"
 ],
 "3.9": [
 "3.4"
 ],
 "3.10": [
 "3.4",
 "3.6"
 ],
 "4.2": [
 "4.1"
 ],
 "4.3": [
 "4.2",
 "4.3"
 ],
 "4.4": [
 "4.4"
 ],
 "4.5": [
 "4.5",
 "4.6"
 ]
 },
 "process/communications-controls.html": {
 "5.1": [],
 "5.2": [
 "5.1"
 ],
 "5.3": [
 "5.3"
 ],
 "5.4": [
 "5.2"
 ],
 "5.5": [
 "5.3"
 ],
 "5.6": [
 "5.4"
 ],
 "5.7": [
 "5.6"
 ],
 "6.1": [],
 "6.2": [
 "6.2"
 ],
 "6.3": [
 "6.1",
 "6.2"
 ],
 "6.4": [
 "6.1"
 ],
 "6.5": [
 "6.5",
 "6.7"
 ],
 "6.6": [
 "6.4",
 "6.8"
 ],
 "6.7": [
 "6.3"
 ]
 },
 "process/fulfilment-closure.html": {
 "4.2": [
 "4.1"
 ],
 "4.4": [
 "4.4"
 ],
 "4.6": [
 "6.5"
 ],
 "4.7": [
 "6.6"
 ],
 "5.9": [
 "5.3"
 ],
 "4.8": [
 "7.1"
 ]
 }
 },
 "nodeOverrides": {
 "process/master.html": {
 "1.1": {
 "trigger": "Claim notification is received through an approved channel.",
 "output": "A claim/case identity exists and the customer/policy context can be resolved.",
 "purpose": "Establish the claim without requiring every downstream fact to be known."
 },
 "1.2": {
 "trigger": "A claim identity and initial event context exist.",
 "output": "Immediate need, support and orientation requirements are explicit.",
 "purpose": "Separate immediate customer need from later claim determination."
 },
 "1.3": {
 "trigger": "Enough identity/event context exists to initialise the coordination object.",
 "output": "Persistent Claim State v1, obligations and provenance are active.",
 "purpose": "Create the durable state around which evidence, decisions and actions assemble."
 },
 "1.4": {
 "trigger": "Claim State is created or materially updated.",
 "output": "One or more actions are ready, blocked, routed for human judgement or require targeted evidence.",
 "purpose": "Continuously determine what can safely and lawfully happen now."
 },
 "1.5": {
 "trigger": "A material intelligence, human, customer, control or execution event occurs.",
 "output": "Candidate actions and readiness are recalculated.",
 "purpose": "Re-plan from state changes rather than wait for stage completion."
 },
 "1.6": {
 "trigger": "Customer-facing closure criteria are met.",
 "output": "Customer claim closes and residual recovery/investigation/other work transitions independently.",
 "purpose": "Do not keep the customer-facing claim open merely because internal residual work remains."
 },
 "2.0": {
 "trigger": "Claim State exists and a relevant intelligence domain can add decision value.",
 "output": "Evidence-linked findings and material unknowns are published independently.",
 "purpose": "Run intelligence concurrently without a global fan-in join."
 },
 "3.0": {
 "trigger": "Consequence, ambiguity, authority, customer need or control policy requires accountable human judgement.",
 "output": "Structured human decision/rationale/override.",
 "purpose": "Bring people in because judgement or accountability is required, not because a stage belongs to a team."
 },
 "4.0": {
 "trigger": "An action independently passes evidence, human and hard-control gates.",
 "output": "Bounded side-effecting execution with success/failure events returned to Claim State.",
 "purpose": "Progress beneficial actions independently rather than release one monolithic claim outcome."
 },
 "5.0": {
 "trigger": "Customer-relevant claim events, timers or obligations occur.",
 "output": "Contextual communication/support actions and interaction events.",
 "purpose": "Treat communication as an always-on lifecycle, not an activity at stage boundaries."
 },
 "6.0": {
 "trigger": "Claim, customer, supplier, complaint, investigation, decision or timer state changes.",
 "output": "Control status, obligations, blocks, escalations and audit evidence.",
 "purpose": "Make regulatory/risk/control logic continuous and action-specific."
 },
 "4.1": {
 "trigger": "Immediate support is eligible and can proceed before final determination.",
 "output": "Urgent assistance/advance outcome and event back to Claim State.",
 "purpose": "Do not make genuine urgent need wait for unrelated analysis."
 }
 },
 "process/intelligence.html": {
 "2.0.1": {
 "trigger": "Claim State is created or materially changes.",
 "output": "Only intelligence domains relevant to the claim/action context are activated.",
 "purpose": "Avoid running every model on every claim."
 },
 "2.8": {
 "trigger": "Any intelligence domain publishes a new or changed finding.",
 "output": "Material findings update Claim State and signal decision-readiness re-evaluation.",
 "purpose": "Publish findings independently instead of waiting for all analysis to finish."
 }
 },
 "process/communications-controls.html": {
 "5.1": {
 "trigger": "Any material customer-relevant event occurs.",
 "output": "Applicable communication branches are activated.",
 "purpose": "Classify customer relevance before generating communication."
 },
 "6.1": {
 "trigger": "Any material claim/customer/decision/timer event occurs.",
 "output": "Applicable obligation/control branches are activated.",
 "purpose": "Evaluate controls continuously rather than through one final compliance gate."
 }
 }
 },
 "graphs": {
 "process/master.html": {
 "edges": [
 [
 "1.1",
 "1.2"
 ],
 [
 "1.2",
 "1.3"
 ],
 [
 "1.2",
 "4.1"
 ],
 [
 "4.1",
 "1.3"
 ],
 [
 "1.3",
 "1.4"
 ],
 [
 "1.3",
 "2.0"
 ],
 [
 "1.3",
 "5.0"
 ],
 [
 "1.3",
 "6.0"
 ],
 [
 "2.0",
 "1.5"
 ],
 [
 "5.0",
 "1.5"
 ],
 [
 "6.0",
 "1.5"
 ],
 [
 "1.4",
 "3.0"
 ],
 [
 "3.0",
 "1.5"
 ],
 [
 "1.4",
 "4.0"
 ],
 [
 "4.0",
 "1.5"
 ],
 [
 "1.4",
 "1.5"
 ],
 [
 "1.5",
 "1.4"
 ],
 [
 "1.5",
 "1.6"
 ]
 ],
 "parallel_groups": [
 [
 "1.4",
 "2.0",
 "5.0",
 "6.0"
 ],
 [
 "3.0",
 "4.0"
 ]
 ]
 },
 "process/intake.html": {
 "edges": [
 [
 "1.1.1",
 "1.1.2"
 ],
 [
 "1.1.2",
 "1.1.3"
 ],
 [
 "1.1.3",
 "1.1.4"
 ],
 [
 "1.1.4",
 "1.1.5"
 ],
 [
 "1.1.5",
 "1.2.1"
 ],
 [
 "1.2.1",
 "1.2.2"
 ],
 [
 "1.2.2",
 "4.1.1"
 ],
 [
 "1.1.4",
 "5.1.1"
 ],
 [
 "1.1.4",
 "5.1.2"
 ],
 [
 "1.1.5",
 "6.1.1"
 ],
 [
 "1.1.5",
 "6.1.2"
 ]
 ],
 "parallel_groups": [
 [
 "5.1.1",
 "5.1.2"
 ],
 [
 "6.1.1",
 "6.1.2"
 ]
 ]
 },
 "process/intelligence.html": {
 "edges": [
 [
 "2.0.1",
 "2.1"
 ],
 [
 "2.0.1",
 "2.2"
 ],
 [
 "2.0.1",
 "2.3"
 ],
 [
 "2.0.1",
 "2.4"
 ],
 [
 "2.0.1",
 "2.5"
 ],
 [
 "2.0.1",
 "2.6"
 ],
 [
 "2.0.1",
 "2.7"
 ],
 [
 "2.1",
 "2.8"
 ],
 [
 "2.2",
 "2.8"
 ],
 [
 "2.3",
 "2.8"
 ],
 [
 "2.4",
 "2.8"
 ],
 [
 "2.5",
 "2.8"
 ],
 [
 "2.6",
 "2.8"
 ],
 [
 "2.7",
 "2.8"
 ],
 [
 "2.8",
 "2.0.1"
 ]
 ],
 "parallel_groups": [
 [
 "2.1",
 "2.2",
 "2.3",
 "2.4",
 "2.5",
 "2.6",
 "2.7"
 ]
 ]
 },
 "process/decision-readiness.html": {
 "edges": [
 [
 "3.1",
 "3.2"
 ],
 [
 "3.2",
 "3.3"
 ],
 [
 "3.3",
 "3.4"
 ],
 [
 "3.4",
 "3.5"
 ],
 [
 "3.5",
 "3.1"
 ],
 [
 "3.3",
 "3.7"
 ],
 [
 "3.7",
 "3.8"
 ],
 [
 "3.8",
 "3.9"
 ],
 [
 "3.3",
 "3.9"
 ],
 [
 "3.9",
 "3.10"
 ],
 [
 "3.10",
 "3.8"
 ],
 [
 "3.9",
 "4.2"
 ],
 [
 "3.9",
 "4.3"
 ],
 [
 "3.9",
 "4.4"
 ],
 [
 "3.9",
 "4.5"
 ],
 [
 "4.2",
 "3.1"
 ],
 [
 "4.3",
 "3.1"
 ],
 [
 "4.4",
 "3.1"
 ],
 [
 "4.5",
 "3.1"
 ]
 ],
 "parallel_groups": [
 [
 "4.2",
 "4.3",
 "4.4",
 "4.5"
 ]
 ]
 },
 "process/communications-controls.html": {
 "edges": [
 [
 "5.1",
 "5.2"
 ],
 [
 "5.1",
 "5.3"
 ],
 [
 "5.1",
 "5.4"
 ],
 [
 "5.1",
 "5.5"
 ],
 [
 "5.1",
 "5.6"
 ],
 [
 "5.1",
 "5.7"
 ],
 [
 "6.1",
 "6.2"
 ],
 [
 "6.1",
 "6.3"
 ],
 [
 "6.1",
 "6.4"
 ],
 [
 "6.1",
 "6.5"
 ],
 [
 "6.1",
 "6.6"
 ],
 [
 "6.1",
 "6.7"
 ],
 [
 "6.2",
 "5.4"
 ],
 [
 "6.3",
 "5.4"
 ],
 [
 "6.4",
 "5.3"
 ],
 [
 "6.5",
 "5.5"
 ],
 [
 "6.6",
 "5.2"
 ],
 [
 "6.6",
 "5.3"
 ],
 [
 "6.6",
 "5.6"
 ],
 [
 "6.7",
 "5.6"
 ]
 ],
 "parallel_groups": [
 [
 "5.2",
 "5.3",
 "5.4",
 "5.5",
 "5.6",
 "5.7"
 ],
 [
 "6.2",
 "6.3",
 "6.4",
 "6.5",
 "6.6",
 "6.7"
 ]
 ]
 },
 "process/fulfilment-closure.html": {
 "edges": [
 [
 "4.2",
 "4.6"
 ],
 [
 "4.4",
 "4.6"
 ],
 [
 "4.6",
 "4.7"
 ],
 [
 "4.7",
 "5.9"
 ],
 [
 "5.9",
 "4.8"
 ],
 [
 "4.8",
 "4.6"
 ]
 ],
 "parallel_groups": [
 [
 "4.2",
 "4.4"
 ]
 ]
 }
 },
 "serviceByFunction": {
 "1.1": [
 "Claims orchestration",
 "Intake/API channel",
 "Claims handler (exception)"
 ],
 "1.2": [
 "INT-01 Notification structuring service",
 "Claims orchestration",
 "Claims handler (ambiguity/low confidence)"
 ],
 "1.3": [
 "Claims orchestration",
 "Policy/customer record services",
 "Claims handler (identity/policy exception)"
 ],
 "1.4": [
 "Claims orchestration",
 "Urgency/vulnerability rules",
 "Claims/customer support specialist"
 ],
 "1.5": [
 "Claims orchestration",
 "Claim State service",
 "CTL-01 Obligation/timer service"
 ],
 "2.1": [
 "INT-02 Coverage intelligence service",
 "Coverage decision maker when required"
 ],
 "2.2": [
 "INT-03 Damage and quantum service",
 "Assessor/expert when material"
 ],
 "2.3": [
 "INT-04 Liability intelligence service",
 "Liability specialist when material"
 ],
 "2.4": [
 "INT-05 Integrity intelligence service",
 "Integrity/investigation specialist when escalation criteria are met"
 ],
 "2.5": [
 "INT-06 Customer context service",
 "Claims/customer support specialist"
 ],
 "2.6": [
 "INT-07 Recovery intelligence service",
 "Recovery specialist when required"
 ],
 "2.7": [
 "INT-08 Claim economics service",
 "Claims decision owner"
 ],
 "3.1": [
 "Claims orchestration",
 "DEC-01 Evidence sufficiency service"
 ],
 "3.2": [
 "DEC-01 Evidence sufficiency service",
 "Claims orchestration"
 ],
 "3.3": [
 "DEC-02 Authority and control service",
 "Human accountability policy"
 ],
 "3.4": [
 "DEC-02 Authority and control service",
 "Delegated authority/rules service"
 ],
 "3.5": [
 "Claims orchestration",
 "COM-01 Customer communication service",
 "Evidence connectors / expert service"
 ],
 "3.6": [
 "HUM-01 Human decision service",
 "Accountable claims decision maker"
 ],
 "3.7": [
 "Claims orchestration",
 "ACT-01 Action execution services"
 ],
 "4.1": [
 "ACT-01 Action execution services",
 "Claims/customer support specialist"
 ],
 "4.2": [
 "ACT-01 Action execution services",
 "External assessor/expert",
 "Claims handler oversight"
 ],
 "4.3": [
 "ACT-01 Action execution services",
 "Repair/replacement supplier",
 "Claims handler oversight"
 ],
 "4.4": [
 "ACT-01 Action execution services",
 "Payment/settlement service",
 "Delegated decision maker where required"
 ],
 "4.5": [
 "Recovery/salvage service",
 "Recovery specialist"
 ],
 "4.6": [
 "Investigation service",
 "Investigator",
 "Accountable investigation owner"
 ],
 "5.1": [
 "COM-01 Customer communication service",
 "Claims handler on exception"
 ],
 "5.2": [
 "COM-01 Customer communication service",
 "Claims orchestration"
 ],
 "5.3": [
 "COM-01 Customer communication service",
 "CTL-01 Obligation/timer service"
 ],
 "5.4": [
 "COM-01 Customer communication service",
 "Accountable claims decision maker"
 ],
 "5.5": [
 "Complaint recognition/IDR workflow",
 "Complaints specialist"
 ],
 "5.6": [
 "COM-01 Customer communication service",
 "Claims orchestration"
 ],
 "6.1": [
 "CTL-01 Obligation/timer service",
 "Claims orchestration"
 ],
 "6.2": [
 "DEC-02 Authority and control service",
 "Claims orchestration"
 ],
 "6.3": [
 "DEC-02 Authority and control service",
 "Accountable claims decision maker"
 ],
 "6.4": [
 "Customer context/vulnerability controls",
 "Claims/customer support specialist"
 ],
 "6.5": [
 "Supplier/expert governance service",
 "Claims/supplier manager"
 ],
 "6.6": [
 "Audit/provenance service",
 "Claims orchestration"
 ],
 "6.7": [
 "Investigation control service",
 "Accountable investigation owner"
 ],
 "6.8": [
 "IDR/complaints workflow",
 "Complaints specialist"
 ],
 "6.9": [
 "Privacy/data-use controls",
 "Privacy/risk owner"
 ],
 "7.1": [
 "Claims orchestration",
 "Closure-readiness rules"
 ],
 "7.2": [
 "Claims orchestration",
 "Residual work services",
 "Recovery/investigation specialist as applicable"
 ],
 "7.3": [
 "Claims orchestration",
 "COM-01 Customer communication service",
 "Claims handler on exception"
 ]
 },
 "stateByMajor": {
 "1": [
 "Identity & policy context",
 "Event facts",
 "Evidence inventory",
 "Customer context",
 "Obligations & timers",
 "Audit & provenance"
 ],
 "2": [
 "Evidence inventory",
 "Intelligence findings",
 "Material unknowns",
 "Customer context",
 "Candidate actions",
 "Audit & provenance"
 ],
 "3": [
 "Candidate actions",
 "Evidence sufficiency",
 "Decision records",
 "Authority & control status",
 "Material unknowns",
 "Audit & provenance"
 ],
 "4": [
 "Execution & external work",
 "Decision records",
 "Customer commitments",
 "Supplier/expert milestones",
 "Audit & provenance"
 ],
 "5": [
 "Customer context",
 "Communication history",
 "Evidence requests",
 "Decision/offer communication",
 "Obligations & timers"
 ],
 "6": [
 "Obligations & timers",
 "Control status",
 "Audit & provenance",
 "Complaint/investigation state",
 "Privacy & data-use metadata"
 ],
 "7": [
 "Closure readiness",
 "Residual work",
 "Execution status",
 "Customer closure evidence",
 "Audit & provenance"
 ]
 },
 "stateSpecific": {
 "1.5": [
 "Identity & policy context",
 "Event facts",
 "Evidence inventory",
 "Intelligence findings",
 "Candidate actions",
 "Obligations & timers",
 "Audit & provenance"
 ],
 "2.1": [
 "Intelligence findings: coverage",
 "Evidence inventory",
 "Material unknowns",
 "Policy/wording references",
 "Audit & provenance"
 ],
 "2.2": [
 "Intelligence findings: damage & quantum",
 "Evidence inventory",
 "Material unknowns",
 "Assessment need",
 "Audit & provenance"
 ],
 "2.3": [
 "Intelligence findings: liability",
 "Evidence inventory",
 "Material unknowns",
 "Recovery implications",
 "Audit & provenance"
 ],
 "2.4": [
 "Intelligence findings: integrity",
 "Evidence inventory",
 "Material unknowns",
 "Investigation state",
 "Audit & provenance"
 ],
 "2.5": [
 "Customer context",
 "Support/vulnerability needs",
 "Communication preference",
 "Audit & provenance"
 ],
 "2.6": [
 "Recovery opportunity",
 "Evidence preservation",
 "Residual work",
 "Audit & provenance"
 ],
 "2.7": [
 "Claim economics",
 "Evidence/action economics",
 "Candidate actions",
 "Audit & provenance"
 ],
 "3.2": [
 "Candidate action",
 "Evidence sufficiency",
 "Material unknowns",
 "Consequence/reversibility",
 "Audit & provenance"
 ],
 "3.4": [
 "Candidate action",
 "Authority & control status",
 "Decision records",
 "Audit & provenance"
 ],
 "3.6": [
 "Decision record",
 "Human rationale/override",
 "Authority",
 "Evidence references",
 "Audit & provenance"
 ],
 "3.7": [
 "Candidate actions",
 "Action release state",
 "Execution identifiers",
 "Audit & provenance"
 ],
 "4.4": [
 "Payment/settlement instruction",
 "Decision record",
 "Customer communication status",
 "Execution result",
 "Audit & provenance"
 ],
 "5.4": [
 "Decision/offer communication",
 "Reasons/rights/disclosures",
 "Delivery status",
 "Customer response",
 "Audit & provenance"
 ],
 "6.1": [
 "Obligations & timers",
 "Alternative timetable/exception state",
 "Escalations",
 "Audit & provenance"
 ],
 "6.6": [
 "Audit & provenance",
 "Evidence lineage",
 "Rule/model/service versions",
 "Human rationale/override",
 "Communication lineage"
 ],
 "6.9": [
 "Privacy purpose/use",
 "Data classification",
 "Access/use metadata",
 "Automated-decision metadata",
 "Audit & provenance"
 ],
 "7.1": [
 "Closure readiness",
 "Open commitments",
 "Open obligations",
 "Residual work",
 "Audit & provenance"
 ]
 },
 "stateAnchor": {
 "Identity & policy context": "state-identity-policy",
 "Event facts": "state-event-facts",
 "Evidence inventory": "state-evidence",
 "Intelligence findings": "state-intelligence",
 "Material unknowns": "state-intelligence",
 "Candidate actions": "state-candidate-actions",
 "Evidence sufficiency": "state-candidate-actions",
 "Decision records": "state-decisions",
 "Authority & control status": "state-decisions",
 "Customer context": "state-customer-context",
 "Communication history": "state-customer-context",
 "Support/vulnerability needs": "state-customer-context",
 "Communication preference": "state-customer-context",
 "Obligations & timers": "state-obligations",
 "Control status": "state-obligations",
 "Complaint/investigation state": "state-obligations",
 "Execution & external work": "state-execution",
 "Supplier/expert milestones": "state-execution",
 "Residual work": "state-audit-residual",
 "Closure readiness": "state-audit-residual",
 "Audit & provenance": "state-audit-residual",
 "Policy/wording references": "state-identity-policy",
 "Assessment need": "state-intelligence",
 "Recovery implications": "state-intelligence",
 "Recovery opportunity": "state-execution",
 "Evidence preservation": "state-evidence",
 "Claim economics": "state-intelligence",
 "Evidence/action economics": "state-candidate-actions",
 "Candidate action": "state-candidate-actions",
 "Consequence/reversibility": "state-candidate-actions",
 "Decision record": "state-decisions",
 "Human rationale/override": "state-decisions",
 "Authority": "state-decisions",
 "Evidence references": "state-evidence",
 "Action release state": "state-execution",
 "Execution identifiers": "state-execution",
 "Payment/settlement instruction": "state-execution",
 "Customer communication status": "state-customer-context",
 "Execution result": "state-execution",
 "Decision/offer communication": "state-customer-context",
 "Reasons/rights/disclosures": "state-customer-context",
 "Delivery status": "state-customer-context",
 "Customer response": "state-customer-context",
 "Alternative timetable/exception state": "state-obligations",
 "Escalations": "state-obligations",
 "Evidence lineage": "state-audit-residual",
 "Rule/model/service versions": "state-audit-residual",
 "Communication lineage": "state-audit-residual",
 "Privacy purpose/use": "state-audit-residual",
 "Data classification": "state-audit-residual",
 "Access/use metadata": "state-audit-residual",
 "Automated-decision metadata": "state-audit-residual",
 "Open commitments": "state-obligations",
 "Open obligations": "state-obligations",
 "Customer closure evidence": "state-audit-residual",
 "Execution status": "state-execution"
 },
 "controls": [
 {
 "id": "CTRL-01",
 "name": "Claim information relevance",
 "class": "CODE",
 "basis": "GICOP 67-68",
 "behaviour": "Only ask for and rely on claim information relevant to the decision; explain why it is needed; where further information/assessment is required, address the paragraph 68 timing and one-request best-endeavours requirements.",
 "process": "6.2"
 },
 {
 "id": "CTRL-02",
 "name": "Claim progress communication",
 "class": "CODE",
 "basis": "GICOP 70-71",
 "behaviour": "At least 20-business-day progress updates and response to routine progress enquiries within 10 business days, subject to Code qualifications/alternative timetables.",
 "process": "5.3 / 6.1"
 },
 {
 "id": "CTRL-03",
 "name": "External appointment communication",
 "class": "CODE",
 "basis": "GICOP 72-75",
 "behaviour": "Notify specified assessor/adjuster/investigator appointments within 5 business days, control expert timeframes/qualification and communicate expert delay where required.",
 "process": "4.2 / 5.3 / 6.5"
 },
 {
 "id": "CTRL-04",
 "name": "Claim decision timing",
 "class": "CODE",
 "basis": "GICOP 76-78, 83-84",
 "behaviour": "Decision timing is monitored from claim receipt and from completion of relevant enquiries; extended circumstances and alternative timetables are handled explicitly.",
 "process": "3.0 / 6.1"
 },
 {
 "id": "CTRL-05",
 "name": "Adverse/partial decision reasons",
 "class": "CODE",
 "basis": "GICOP 81-82",
 "behaviour": "Written communication identifies unaccepted aspects, reasons, information/report rights and complaints process where a claim is denied or not paid in full.",
 "process": "5.4 / 6.3"
 },
 {
 "id": "CTRL-06",
 "name": "Urgent financial need",
 "class": "CODE",
 "basis": "GICOP 64-66",
 "behaviour": "Fast-track assessment/decision and/or advance-payment controls apply where the paragraph 64 circumstances are met.",
 "process": "1.4 / 4.1"
 },
 {
 "id": "CTRL-07",
 "name": "Vulnerability support",
 "class": "CODE",
 "basis": "GICOP 91-103",
 "behaviour": "Customer vulnerability is a dynamic process control affecting communication, support, representation, identification and interpreter handling.",
 "process": "2.5 / 6.4"
 },
 {
 "id": "CTRL-08",
 "name": "Service supplier accountability",
 "class": "CODE",
 "basis": "GICOP 35-41, 86-87",
 "behaviour": "Supplier use does not remove insurer accountability; appointment, subcontracting, conduct, complaints and authorised-repair quality controls remain with the insurer.",
 "process": "4.2-4.3 / 6.5"
 },
 {
 "id": "CTRL-09",
 "name": "AFS claims handling conduct",
 "class": "LAW",
 "basis": "Corporations Act s912A; ASIC INFO 253",
 "behaviour": "Claims handling is a regulated financial service. The operating model must support efficient, honest and fair service, competent representatives, supervision and disclosure obligations.",
 "process": "All"
 },
 {
 "id": "CTRL-10",
 "name": "Complaint recognition and IDR",
 "class": "REG",
 "basis": "ASIC RG 271; REP 802",
 "behaviour": "Expressions of dissatisfaction must be recognised/recorded and managed through IDR; standard complaints generally require an IDR response within 30 calendar days, subject to exceptions and delay-notification requirements.",
 "process": "5.5 / 6.8"
 },
 {
 "id": "CTRL-11",
 "name": "Cash settlement disclosure and fairness",
 "class": "LAW/ASIC",
 "basis": "INFO 253; ASIC 2026 cash-settlement review",
 "behaviour": "Where a Cash Settlement Fact Sheet is legally required, issue it at the offer point with prescribed content. Settlement design must also support realistic, transparent amounts and informed customer choice.",
 "process": "4.4 / 5.4"
 },
 {
 "id": "CTRL-12",
 "name": "Privacy and data minimisation",
 "class": "LAW",
 "basis": "Privacy Act; APP 1, 3, 5, 6, 10, 11",
 "behaviour": "Limit personal-information collection/use to permitted and reasonably necessary purposes; maintain data quality/security and transparent privacy management.",
 "process": "6.9"
 },
 {
 "id": "CTRL-13",
 "name": "Automated decision transparency readiness",
 "class": "INCOMING",
 "basis": "Privacy Act reforms / OAIC APP 1 guidance",
 "behaviour": "From 10 Dec 2026, relevant APP entities must include specified information in privacy policies about certain significant automated decisions using personal information. Design metadata now to avoid retrofit.",
 "process": "6.9 / 6.6"
 },
 {
 "id": "CTRL-14",
 "name": "AI consequence boundary",
 "class": "DESIGN",
 "basis": "Blueprint control",
 "behaviour": "AI may recommend and summarise. Rights-affecting, adverse, high-consequence or otherwise controlled actions require deterministic gates and human accountability where the control model says so.",
 "process": "3.3-3.6"
 },
 {
 "id": "CTRL-15",
 "name": "Action idempotency",
 "class": "DESIGN",
 "basis": "Blueprint control",
 "behaviour": "Side-effecting actions such as payments, repair instructions, appointments and notifications require unique action IDs, duplicate prevention, retries, reconciliation and exception handling.",
 "process": "4.0"
 },
 {
 "id": "CTRL-16",
 "name": "Decision provenance",
 "class": "DESIGN",
 "basis": "Blueprint control",
 "behaviour": "Material decisions retain evidence references, relevant model/rule/service version, human rationale/override, authority and communication lineage.",
 "process": "6.6"
 },
 {
 "id": "CTRL-17",
 "name": "Utmost good faith in claim handling and settlement",
 "class": "LAW",
 "basis": "Insurance Contracts Act 1984 ss13-14A",
 "behaviour": "For contracts to which the Act applies, the claims operating model must support conduct consistent with the statutory duty of utmost good faith. Decision evidence, delay, communication and settlement behaviour must remain reconstructable.",
 "process": "All material claim handling and settlement activity"
 },
 {
 "id": "CTRL-18",
 "name": "Operational resilience and service-provider governance",
 "class": "PRUDENTIAL",
 "basis": "APRA CPS 230 Operational Risk Management",
 "behaviour": "For APRA-regulated insurers, claims design must fit operational-risk, critical-operation, business-continuity and service-provider governance requirements. Where claims management is outsourced or materially supported by service providers, provider risk, due diligence, monitoring, substitution and exit must be designed rather than assumed.",
 "process": "Orchestration, external services, fulfilment, continuity"
 },
 {
 "id": "CTRL-19",
 "name": "Information security",
 "class": "PRUDENTIAL",
 "basis": "APRA CPS 234 Information Security",
 "behaviour": "For APRA-regulated insurers, systems and services handling claim information must operate within the entity information-security capability, controls, testing and incident-management framework. This applies equally to AI, orchestration, integrations and external providers.",
 "process": "All technology and information-processing components"
 }
 ]
};
