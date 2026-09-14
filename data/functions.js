window.CORA_FUNCTIONS = [
 {
 "id": "1.1",
 "name": "Receive Claim Notification",
 "trigger": "Customer/representative notification through an approved channel",
 "inputs": "Customer identity/representative context, loss narrative, attachments, channel metadata",
 "output": "Claim notification received event",
 "next": "1.2",
 "parallel_controls": "5.1, 6.1",
 "note": "Capture once. Do not force the customer to structure information for the insurer."
 },
 {
 "id": "1.2",
 "name": "Normalise Claim Notification",
 "trigger": "1.1 complete",
 "inputs": "Notification content, documents, media, known policy/customer references",
 "output": "Structured event facts, extracted entities, evidence inventory, unresolved fields",
 "next": "1.3",
 "parallel_controls": "5.1, 6.6",
 "note": "AI/document intelligence may structure content, but source evidence must remain linked and reviewable."
 },
 {
 "id": "1.3",
 "name": "Establish Customer and Policy Context",
 "trigger": "Sufficient identity/policy clues available",
 "inputs": "Customer/policy records, representative authority, event timing, product context",
 "output": "Verified or provisional customer/policy context",
 "next": "1.4",
 "parallel_controls": "2.1, 5.2, 6.9",
 "note": "Do not block urgent support merely because every administrative field is unresolved where support can lawfully proceed."
 },
 {
 "id": "1.4",
 "name": "Assess Immediate Need and Safety",
 "trigger": "Claim notification and customer context",
 "inputs": "Loss severity, accommodation/mobility/safety needs, financial urgency, vulnerability indicators",
 "output": "Immediate support actions and routing",
 "next": "1.5",
 "parallel_controls": "4.1, 5.4, 6.4",
 "note": "Urgent need may require fast-track treatment. The orchestration must be able to progress support before final claim determination where permitted."
 },
 {
 "id": "1.5",
 "name": "Create Initial Claim State",
 "trigger": "Initial facts and context available",
 "inputs": "Facts, evidence, provenance, customer context, provisional obligations, open unknowns",
 "output": "Versioned Claim State v1 and material event stream",
 "next": "2.0 / 3.0",
 "parallel_controls": "5.0, 6.0",
 "note": "Claim State is the coordination backbone, not a loose summary field."
 },
 {
 "id": "2.1",
 "name": "Develop Coverage Intelligence",
 "trigger": "Claim State created or material coverage evidence changes",
 "inputs": "Policy wording/version, endorsements, insured interest, event facts, relevant evidence",
 "output": "Coverage findings, cited clauses, confidence/reliability, material unknowns, action implications",
 "next": "3.1",
 "parallel_controls": "2.2-2.7, 6.3",
 "note": "A coverage recommendation is not the same as a final coverage decision. Preserve clause/evidence traceability."
 },
 {
 "id": "2.2",
 "name": "Develop Damage and Quantum Intelligence",
 "trigger": "Material damage evidence available/changes",
 "inputs": "Photos/video, customer description, repair data, quotes, prior asset/property data, approved external data",
 "output": "Damage finding, repairability, scope hypothesis, quantum range, assessment need, uncertainty",
 "next": "3.1",
 "parallel_controls": "2.1, 2.3-2.7, 6.5",
 "note": "Use remote/digital evidence where reliable. Escalate to expert/physical assessment where it will materially change the decision."
 },
 {
 "id": "2.3",
 "name": "Develop Liability Intelligence",
 "trigger": "Liability relevant and circumstances/evidence available",
 "inputs": "Statements, scene/event facts, applicable rules, third-party evidence",
 "output": "Liability position, confidence, evidence gap, recovery implications",
 "next": "3.1",
 "parallel_controls": "2.1-2.2, 2.4-2.7",
 "note": "Unresolved liability must not automatically block first-party repair/support where the proposed action does not depend on it."
 },
 {
 "id": "2.4",
 "name": "Develop Integrity Intelligence",
 "trigger": "Claim State/evidence changes or integrity signal received",
 "inputs": "Cross-source consistency, claim/policy history, evidence metadata, approved fraud indicators",
 "output": "Integrity concern, materiality, rationale, next evidence recommendation",
 "next": "3.1",
 "parallel_controls": "2.1-2.3, 2.5-2.7, 6.7",
 "note": "An anomaly is not fraud. Escalation must be based on materiality and controlled investigation criteria."
 },
 {
 "id": "2.5",
 "name": "Develop Customer Context Intelligence",
 "trigger": "Customer interaction or context changes",
 "inputs": "Customer statements, communication needs, vulnerability/hardship indicators, representation/support needs",
 "output": "Customer support profile, preferred communication, required accommodations and routing",
 "next": "3.1",
 "parallel_controls": "5.0, 6.4",
 "note": "Treat support needs as dynamic. Customer context can change the process without changing the claim facts."
 },
 {
 "id": "2.6",
 "name": "Develop Recovery Intelligence",
 "trigger": "Third-party/recovery facts emerge",
 "inputs": "Liability/recovery facts, third-party details, salvage/subrogation evidence",
 "output": "Recovery opportunity, evidence preservation actions, expected value",
 "next": "3.1",
 "parallel_controls": "2.3, 2.7, 4.5",
 "note": "Recovery can start early and continue after customer outcome. It should rarely hold the customer claim hostage."
 },
 {
 "id": "2.7",
 "name": "Develop Claim Economics",
 "trigger": "Material cost/uncertainty/action changes",
 "inputs": "Expected indemnity, handling cost, assessment/investigation cost, delay cost, recovery potential",
 "output": "Expected-value comparison and evidence/action economics",
 "next": "3.1",
 "parallel_controls": "2.1-2.6",
 "note": "Economics informs proportionality. It must not override rights, policy terms or mandatory controls."
 },
 {
 "id": "3.1",
 "name": "Identify Candidate Actions",
 "trigger": "Any material Claim State update",
 "inputs": "Current facts, findings, obligations, customer needs and open work",
 "output": "Set of possible next actions with prerequisites",
 "next": "3.2",
 "parallel_controls": "2.0, 5.0, 6.0",
 "note": "Candidate actions can coexist. Do not reduce the claim to one next-step queue item."
 },
 {
 "id": "3.2",
 "name": "Assess Evidence Sufficiency Per Action",
 "trigger": "Candidate action identified",
 "inputs": "Evidence relevant to that action, reliability, material unknowns, consequence, reversibility",
 "output": "Ready / not ready assessment and specific blocking uncertainty",
 "next": "3.3",
 "parallel_controls": "6.2, 6.3",
 "note": "Evidence sufficiency is decision-specific. It is not \"all tasks complete\"."
 },
 {
 "id": "3.3",
 "name": "Determine Human Accountability Requirement",
 "trigger": "Evidence sufficient or near-sufficient",
 "inputs": "Action consequence, adverse impact, vulnerability, authority, ambiguity, investigation status, customer request",
 "output": "Human required / not required with reason",
 "next": "3.4 or 3.6",
 "parallel_controls": "6.3, 6.4, 6.7",
 "note": "High model confidence does not remove a mandated or consequence-based human control."
 },
 {
 "id": "3.4",
 "name": "Apply Hard Controls and Authority",
 "trigger": "Action otherwise ready",
 "inputs": "Regulatory rules, delegated authority, privacy, complaint/investigation state, payment/settlement controls",
 "output": "Permitted / blocked / escalate with control reason",
 "next": "3.7 or 3.6",
 "parallel_controls": "6.0",
 "note": "This is deterministic control logic. AI should not be able to override it."
 },
 {
 "id": "3.5",
 "name": "Acquire Decision-Relevant Evidence",
 "trigger": "3.2 identifies a material gap",
 "inputs": "Specific decision gap, available internal/connected evidence sources, customer burden, expert value",
 "output": "New evidence or documented inability/timeout",
 "next": "3.1",
 "parallel_controls": "5.2, 6.2",
 "note": "Source hierarchy: approved internal/connected evidence first, customer second where necessary, expert third where justified. Exceptions exist by product/context."
 },
 {
 "id": "3.6",
 "name": "Obtain Human Judgement",
 "trigger": "3.3/3.4 requires human accountability",
 "inputs": "Decision-ready pack: facts, evidence, findings, controls, uncertainty, proposed action and reason human is required",
 "output": "Human decision/rationale/override and authority",
 "next": "3.7 or 3.5",
 "parallel_controls": "5.4, 6.6",
 "note": "The open human task must not block unrelated actions."
 },
 {
 "id": "3.7",
 "name": "Release Eligible Actions",
 "trigger": "One or more actions pass evidence/human/control gates",
 "inputs": "Approved action set and execution parameters",
 "output": "Action release commands with idempotency/trace identifiers",
 "next": "4.0",
 "parallel_controls": "5.0, 6.6",
 "note": "Use inclusive release semantics: one, several or no actions may progress."
 },
 {
 "id": "4.1",
 "name": "Provide Immediate Assistance",
 "trigger": "Eligible support action released",
 "inputs": "Approved assistance, customer need, authority",
 "output": "Accommodation/mobility/emergency assistance milestone/result",
 "next": "1.4 / 3.7",
 "parallel_controls": "5.3, 6.6",
 "note": "Return success/failure/exception events to Claim State."
 },
 {
 "id": "4.2",
 "name": "Appoint Assessment or Expert Service",
 "trigger": "Assessment/expert action released",
 "inputs": "Question to resolve, scope, required expertise, SLA/control requirements",
 "output": "Appointment, report/milestone events, exception/delay events",
 "next": "3.7",
 "parallel_controls": "5.3, 6.5",
 "note": "External appointment never transfers insurer accountability for oversight or customer communication."
 },
 {
 "id": "4.3",
 "name": "Authorise Repair or Replacement",
 "trigger": "Repair/replacement action released",
 "inputs": "Approved scope, supplier/customer choice, authority, dependencies",
 "output": "Instruction, milestones, completion/exception events",
 "next": "3.7",
 "parallel_controls": "5.3, 6.5",
 "note": "Supplier quality/timeliness issues remain connected to claim/customer obligations."
 },
 {
 "id": "4.4",
 "name": "Execute Payment or Settlement",
 "trigger": "Payment/settlement action released",
 "inputs": "Amount, payee, authority, settlement basis, required disclosures",
 "output": "Payment/offer success/failure, settlement state",
 "next": "3.7",
 "parallel_controls": "5.4, 6.6",
 "note": "Cash settlement pathways require separate disclosure/choice controls where applicable."
 },
 {
 "id": "4.5",
 "name": "Progress Recovery or Salvage",
 "trigger": "Recovery action released",
 "inputs": "Recovery target, evidence, economics, authority",
 "output": "Recovery milestones/results",
 "next": "3.7",
 "parallel_controls": "7.2, 6.6",
 "note": "May continue after customer-facing closure where separable."
 },
 {
 "id": "4.6",
 "name": "Conduct Focused Investigation",
 "trigger": "Investigation approved",
 "inputs": "Material integrity concern, scope, authority, investigation standards",
 "output": "Investigation findings, milestones, review/closure events",
 "next": "3.7",
 "parallel_controls": "5.3, 6.7",
 "note": "Investigation scope must remain proportional and reviewable; investigation is not default routing for uncertainty."
 },
 {
 "id": "5.1",
 "name": "Acknowledge and Orient Customer",
 "trigger": "Claim established",
 "inputs": "Claim reference, known process context, contact options, immediate next steps",
 "output": "Acknowledgement and process orientation",
 "next": "1.1-1.5",
 "parallel_controls": "6.1",
 "note": "Meet applicable Code communication requirements and adapt communication to customer needs."
 },
 {
 "id": "5.2",
 "name": "Request Specific Evidence",
 "trigger": "Approved request from 3.5",
 "inputs": "Exact decision gap, requested item, reason, submission options, deadline if relevant",
 "output": "Customer evidence request and response tracking",
 "next": "3.5",
 "parallel_controls": "6.2",
 "note": "Explain why information is needed. Avoid generic evidence lists and duplicate asks."
 },
 {
 "id": "5.3",
 "name": "Provide Meaningful Progress Update",
 "trigger": "Material state/customer-relevant change, timer, delay or customer enquiry",
 "inputs": "Current status, completed actions, actual dependency, expected next milestone/customer action",
 "output": "Contextual update",
 "next": "2.0/4.0/6.1",
 "parallel_controls": "6.1, 6.6",
 "note": "A generic \"still assessing\" message is not the target. Communicate what changed, what is waiting and what happens next."
 },
 {
 "id": "5.4",
 "name": "Communicate Decision or Offer",
 "trigger": "Valid decision/offer exists and release controls passed",
 "inputs": "Decision, reasons, settlement/repair options, next steps, applicable rights/complaint information",
 "output": "Decision/offer communication and acknowledgement",
 "next": "3.6/4.4",
 "parallel_controls": "6.3, 6.8",
 "note": "Adverse/partial decisions require the stronger written-reason controls applicable to the claim."
 },
 {
 "id": "5.5",
 "name": "Recognise and Route Dissatisfaction",
 "trigger": "Expression of dissatisfaction detected or complaint made",
 "inputs": "Customer expression, claim context, existing complaint state",
 "output": "IDR complaint record/task and preserved claim context",
 "next": "Any",
 "parallel_controls": "6.8",
 "note": "Do not rely on the customer using the word complaint. Complaint recognition must be designed into channels and AI-assisted interactions."
 },
 {
 "id": "5.6",
 "name": "Close Customer Communication",
 "trigger": "Closure ready",
 "inputs": "Final outcome, residual work explanation if relevant, complaint/review rights where relevant",
 "output": "Closure communication",
 "next": "7.3",
 "parallel_controls": "6.6",
 "note": "Closure communication must match the actual state, not merely system status."
 },
 {
 "id": "6.1",
 "name": "Manage Claim and Communication Timers",
 "trigger": "Claim created and throughout",
 "inputs": "Code/IDR/service commitments, event dates, agreed alternate timetable",
 "output": "Timer events, reminders, pre-breach tasks/escalations",
 "next": "1.5",
 "parallel_controls": "5.3, 6.8",
 "note": "Treat timers as process events, not reporting fields."
 },
 {
 "id": "6.2",
 "name": "Validate Evidence Request",
 "trigger": "Proposed evidence request",
 "inputs": "Decision gap, request content, existing evidence, customer burden, product/control rules",
 "output": "Approve / revise / reject",
 "next": "3.5",
 "parallel_controls": "5.2",
 "note": "Current Code requires claim information requests to be relevant and reasons to be explained. One-request best endeavours apply where further information/assessment is needed."
 },
 {
 "id": "6.3",
 "name": "Validate Decision Basis",
 "trigger": "Proposed substantive decision/action",
 "inputs": "Relevant facts, policy terms, evidence, law/rules, reasoning, authority, material unknowns",
 "output": "Decision control pass / fail / human escalation",
 "next": "3.4",
 "parallel_controls": "5.4",
 "note": "Do not encode \"AI confidence threshold = decision\". The basis must be substantively defensible."
 },
 {
 "id": "6.4",
 "name": "Apply Vulnerability and Hardship Controls",
 "trigger": "Customer support need identified",
 "inputs": "Customer context, support request, representation/interpreter needs, hardship context",
 "output": "Support actions, routing changes, human support requirements",
 "next": "2.5",
 "parallel_controls": "5.0, 6.1",
 "note": "Support must be applied early and with privacy sensitivity."
 },
 {
 "id": "6.5",
 "name": "Oversee Supplier and Expert Performance",
 "trigger": "External supplier/expert appointed",
 "inputs": "Appointment, SLA, report quality, delays, customer issues",
 "output": "Intervention/escalation, replacement/rework decision, customer update trigger",
 "next": "4.2/4.3",
 "parallel_controls": "5.3",
 "note": "ASIC has specifically highlighted weaknesses in independent-expert oversight in home claims."
 },
 {
 "id": "6.6",
 "name": "Maintain Audit and Provenance",
 "trigger": "Any material event",
 "inputs": "Evidence links, model/rule/service version, prompt/context where material, human rationale, authority, communication record",
 "output": "Reconstructable decision/action lineage",
 "next": "All",
 "parallel_controls": "All",
 "note": "Build for complaint, audit and regulatory reconstruction from day one."
 },
 {
 "id": "6.7",
 "name": "Control Investigation",
 "trigger": "Integrity concern and proposed investigation",
 "inputs": "Materiality, alternative evidence options, scope, authority, investigation standards",
 "output": "Approve/restrict/review/close investigation",
 "next": "2.4/4.6",
 "parallel_controls": "5.3",
 "note": "Investigation must be targeted and cannot become a substitute for ordinary evidence gathering."
 },
 {
 "id": "6.8",
 "name": "Manage Complaint and IDR Obligations",
 "trigger": "Complaint/dissatisfaction recognised",
 "inputs": "Complaint issues, claim state, prior communications/decisions",
 "output": "IDR workflow, response/delay events, outcome implementation",
 "next": "5.5",
 "parallel_controls": "3.0/4.0/5.0",
 "note": "Standard complaints generally require an IDR response no later than 30 calendar days, subject to RG 271 exceptions."
 },
 {
 "id": "6.9",
 "name": "Manage Privacy and Data Use",
 "trigger": "Any collection/use/disclosure/AI processing event",
 "inputs": "Purpose, data type, consent/authority where applicable, retention/security rules",
 "output": "Permitted use, minimisation, notice/security actions",
 "next": "All",
 "parallel_controls": "6.6",
 "note": "Design for data minimisation, purpose limitation, quality and security. Prepare for incoming automated-decision transparency obligations from 10 Dec 2026."
 },
 {
 "id": "7.1",
 "name": "Assess Closure Readiness",
 "trigger": "Candidate closure state",
 "inputs": "Customer outcome, payment/repair, mandatory communications, open complaint, obligations, residual work",
 "output": "Close / remain open / transition residual work",
 "next": "4.0",
 "parallel_controls": "7.2 or 7.3",
 "note": "Do not equate no open tasks with closure readiness."
 },
 {
 "id": "7.2",
 "name": "Transition Residual Work",
 "trigger": "Customer outcome complete but separable work remains",
 "inputs": "Recovery/litigation/reconciliation work, linkage and ownership",
 "output": "Linked residual process/case",
 "next": "7.1",
 "parallel_controls": "7.3",
 "note": "Residual work must retain traceability to the closed customer claim."
 },
 {
 "id": "7.3",
 "name": "Close Customer-Facing Claim",
 "trigger": "Closure controls passed",
 "inputs": "Final Claim State and closure evidence",
 "output": "Closed customer claim, retention/audit state",
 "next": "7.1/7.2",
 "parallel_controls": "5.6, 6.6",
 "note": "Closure means the customer-facing outcome and mandatory obligations are complete, not that every back-office activity has ended."
 }
];
