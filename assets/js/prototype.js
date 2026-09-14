(() => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  const clone = obj => JSON.parse(JSON.stringify(obj));

  const BASE_CONTROLS = [
    {id:'CTRL-09', name:'AFS claims handling conduct', basis:'Corporations Act s912A; ASIC INFO 253', state:'ACTIVE'},
    {id:'CTRL-17', name:'Decision provenance and audit', basis:'Architecture control', state:'ACTIVE'},
    {id:'CTRL-19', name:'Action authority and side-effect control', basis:'Architecture control', state:'ACTIVE'},
    {id:'CTRL-01', name:'Relevant information only', basis:'GICOP claims information controls where applicable', state:'MONITORING'},
    {id:'CTRL-07', name:'Vulnerability and support', basis:'GICOP vulnerability provisions where applicable', state:'MONITORING'}
  ];

  const domains = () => ({
    coverage:{label:'Coverage',status:'WAITING',confidence:null,summary:'Not started',unknown:'Policy and event context not yet assessed.'},
    damage:{label:'Damage & quantum',status:'WAITING',confidence:null,summary:'Not started',unknown:'Damage evidence not yet assessed.'},
    liability:{label:'Liability',status:'WAITING',confidence:null,summary:'Not started',unknown:'Liability not yet relevant or assessed.'},
    integrity:{label:'Integrity',status:'WAITING',confidence:null,summary:'Not started',unknown:'No integrity assessment yet.'},
    customer:{label:'Customer context',status:'WAITING',confidence:null,summary:'Not started',unknown:'Support needs not yet assessed.'},
    recovery:{label:'Recovery',status:'WAITING',confidence:null,summary:'Not started',unknown:'Recovery opportunity not yet assessed.'},
    economics:{label:'Claim economics',status:'WAITING',confidence:null,summary:'Not started',unknown:'Cost and proportionality not yet assessed.'}
  });

  const actions = () => [
    {id:'ack',label:'Acknowledge and orient customer',status:'WAITING',reason:'Claim not established.'},
    {id:'support',label:'Provide immediate support',status:'WAITING',reason:'Customer need not yet assessed.'},
    {id:'assess',label:'Authorise damage assessment',status:'WAITING',reason:'Coverage and damage context not yet sufficient.'},
    {id:'repair',label:'Progress repair / replacement',status:'WAITING',reason:'Repair readiness not yet assessed.'},
    {id:'liability',label:'Determine liability position',status:'WAITING',reason:'Liability evidence incomplete.'},
    {id:'recovery',label:'Begin recovery preparation',status:'WAITING',reason:'Recovery facts not yet sufficient.'},
    {id:'settle',label:'Final settlement / payment',status:'WAITING',reason:'Outcome not yet decision-ready.'},
    {id:'close',label:'Close customer-facing claim',status:'WAITING',reason:'Mandatory outcome work remains open.'}
  ];

  const S = (time,title,kind,patch={}) => ({time,title,kind,...patch});

  const scenarios = {
    simple_motor:{
      name:'Simple motor collision',
      subtitle:'Driveable vehicle, likely cover, rear-end circumstances, customer needs transport for work.',
      claim:'CLM-2026-00127', customer:'Alex Morgan', product:'Comprehensive Motor', event:'Rear-end collision at low speed. Vehicle driveable.',
      traditional:{waits:5,handoffs:7,narrative:'A traditional sequence waits for coverage, assessment and liability activities to complete in order before later work progresses.'},
      steps:[
        S('09:01','Claim notification received','event',{summary:'Claim created from digital notification with photographs and third-party details.',updates:{coverage:{status:'RUNNING',summary:'Policy/event match underway'},damage:{status:'RUNNING',summary:'Photo and repairability assessment underway'},liability:{status:'RUNNING',summary:'Circumstances assessment underway'},integrity:{status:'RUNNING',summary:'Cross-source consistency checks underway'},customer:{status:'RUNNING',summary:'Immediate need assessment underway'},recovery:{status:'RUNNING',summary:'Third-party recovery screening underway'},economics:{status:'RUNNING',summary:'Initial cost/proportionality assessment underway'}},actions:{ack:{status:'READY',reason:'Claim identity and contact channel established.'}},customerMsg:'We have your claim and are assessing the things that can move now.'}),
        S('09:02','Immediate customer need identified','customer',{summary:'Customer requires transport for work tomorrow.',updates:{customer:{status:'SUFFICIENT',confidence:98,summary:'Mobility need confirmed',unknown:'No vulnerability indicators presently identified.'}},actions:{ack:{status:'EXECUTED',reason:'Acknowledgement sent.'},support:{status:'READY',reason:'Mobility need is established and does not depend on final liability.'}},customerMsg:'Your mobility need has been identified. We can progress support while other parts of the claim continue.'}),
        S('09:03','Coverage and damage findings published','intelligence',{summary:'Policy active and event type appears within cover. Photo evidence supports repair assessment.',updates:{coverage:{status:'SUFFICIENT',confidence:97,summary:'Likely covered on current evidence',unknown:'No material coverage uncertainty identified for assessment progression.'},damage:{status:'SUFFICIENT',confidence:91,summary:'Repairable damage likely',unknown:'Final repair scope and quantum require repairer assessment.'},integrity:{status:'CLEAR',confidence:96,summary:'No material inconsistency identified',unknown:'Continue passive monitoring if material evidence changes.'}},actions:{support:{status:'EXECUTED',reason:'Mobility support authorised.'},assess:{status:'READY',reason:'Coverage and damage evidence are sufficient for assessment.'},repair:{status:'CONDITIONAL',reason:'Can progress once assessment confirms scope within authority.'}},customerMsg:'We have enough information to progress assessment of your vehicle. You do not need to wait for the liability work to finish.'}),
        S('09:05','Liability remains unresolved, recovery can start','intelligence',{summary:'Rear-end facts support likely third-party responsibility, but the other driver statement is outstanding.',updates:{liability:{status:'DEVELOPING',confidence:62,summary:'Third-party responsibility likely',unknown:'Third-party account not yet received.'},recovery:{status:'SUFFICIENT',confidence:78,summary:'Recovery opportunity identified',unknown:'Final recovery position depends on liability evidence.'},economics:{status:'SUFFICIENT',confidence:89,summary:'Early repair progression proportionate',unknown:'Final quantum pending.'}},actions:{assess:{status:'EXECUTED',reason:'Assessment instruction issued.'},recovery:{status:'READY',reason:'Third party identified. Evidence preservation and recovery preparation can begin.'},liability:{status:'BLOCKED',reason:'Third-party evidence outstanding.'}}}),
        S('09:22','Third-party statement received','evidence',{summary:'New evidence materially changes liability confidence.',updates:{liability:{status:'SUFFICIENT',confidence:89,summary:'Third-party responsibility supported',unknown:'No material liability evidence gap remains for current decision.'},recovery:{status:'SUFFICIENT',confidence:93,summary:'Recovery pathway strengthened',unknown:'Recovery quantum follows final repair cost.'}},actions:{recovery:{status:'EXECUTED',reason:'Recovery preparation commenced.'},liability:{status:'READY',reason:'Evidence threshold met for liability position.'}},customerMsg:'We have received additional information about the accident. This does not change the repair work already underway.'}),
        S('10:10','Repair scope confirmed within authority','action',{summary:'Repairer estimate received and falls within configured authority.',updates:{damage:{status:'SUFFICIENT',confidence:97,summary:'Repair scope and estimate confirmed',unknown:'No material quantum uncertainty for repair authorisation.'},economics:{status:'SUFFICIENT',confidence:96,summary:'Repair remains proportionate',unknown:'None material to current action.'}},actions:{repair:{status:'READY',reason:'Coverage, scope, authority and controls are satisfied.'},liability:{status:'EXECUTED',reason:'Liability position recorded.'},settle:{status:'CONDITIONAL',reason:'Repair outcome and final invoice remain open.'}}}),
        S('10:12','Repair authorised','action',{summary:'Repair instruction released independently of recovery completion.',actions:{repair:{status:'EXECUTED',reason:'Repair authorised.'}},customerMsg:'Your repair has been authorised. Recovery from the other party will continue separately and does not require you to wait.'}),
        S('15:40','Customer outcome complete','complete',{summary:'Repair completed and payment reconciled. Recovery remains residual insurer work.',actions:{settle:{status:'EXECUTED',reason:'Final repair payment reconciled.'},close:{status:'READY',reason:'Customer-facing outcome and mandatory customer obligations are complete.'}},customerMsg:'Your vehicle repair is complete. We are closing the customer-facing claim. Any remaining recovery work continues separately.'}),
        S('15:42','Customer-facing claim closed','complete',{summary:'Residual recovery transferred without keeping the customer claim artificially open.',actions:{close:{status:'EXECUTED',reason:'Closure criteria satisfied.'}}})
      ]
    },
    ambiguous_coverage:{
      name:'Coverage ambiguity',
      subtitle:'Storm damage with an exclusion question. Immediate mitigation can progress, but final coverage needs human judgement.',
      claim:'CLM-2026-00341', customer:'Taylor Lee', product:'Home Building', event:'Water ingress following severe storm. Temporary make-safe required.',
      traditional:{waits:6,handoffs:8,narrative:'A stage-led process can freeze repair activity while coverage wording is interpreted, even when temporary mitigation is independently justified.'},
      steps:[
        S('08:11','Claim notification received','event',{summary:'Storm loss lodged with photos and emergency water ingress.',updates:{coverage:{status:'RUNNING',summary:'Policy wording and event causation review underway'},damage:{status:'RUNNING',summary:'Damage and make-safe need under assessment'},customer:{status:'RUNNING',summary:'Immediate safety and accommodation need under assessment'},integrity:{status:'RUNNING',summary:'Initial consistency review underway'}},actions:{ack:{status:'READY',reason:'Claim established.'}},customerMsg:'We have your storm claim and are assessing immediate safety and next actions.'}),
        S('08:13','Make-safe need confirmed','customer',{summary:'Further water ingress is likely without temporary mitigation.',updates:{customer:{status:'SUFFICIENT',confidence:99,summary:'Urgent property protection need confirmed',unknown:'No accommodation need at present.'},damage:{status:'DEVELOPING',confidence:88,summary:'Make-safe is justified',unknown:'Full causation and permanent scope remain open.'}},actions:{ack:{status:'EXECUTED',reason:'Acknowledgement sent.'},support:{status:'READY',reason:'Immediate property protection can proceed independently of final coverage.'},assess:{status:'READY',reason:'Expert causation assessment is decision-relevant.'}},customerMsg:'We can arrange temporary measures to reduce further damage while the coverage question is considered.'}),
        S('08:19','Coverage ambiguity detected','intelligence',{summary:'Policy wording and event facts create a material exclusion question.',updates:{coverage:{status:'HUMAN',confidence:61,summary:'Possible exclusion interaction',unknown:'Whether exclusion 14.2 applies requires policy interpretation against causation evidence.'},integrity:{status:'CLEAR',confidence:97,summary:'No integrity concern',unknown:'None material.'}},actions:{support:{status:'EXECUTED',reason:'Make-safe approved.'},assess:{status:'EXECUTED',reason:'Causation assessment instructed.'},repair:{status:'BLOCKED',reason:'Permanent repair depends on coverage determination.'},settle:{status:'BLOCKED',reason:'Final coverage unresolved.'}},decision:{title:'Does exclusion 14.2 apply?',risk:'HIGH CONSEQUENCE',body:'The evidence supports storm-related damage, but there is a material question about a pre-existing defect and the interaction of the exclusion with causation. The prototype will not convert a 61% model position into authority to decline cover.',recommendation:'Human coverage determination required.',choices:[{label:'Accept coverage',outcome:'accept'},{label:'Request targeted evidence',outcome:'evidence'},{label:'Apply exclusion',outcome:'decline'}]}}),
        S('08:35','Human coverage decision recorded','decision',{summary:'Coverage decision stored with rationale, evidence references and decision-maker accountability.',branch:{accept:{updates:{coverage:{status:'SUFFICIENT',confidence:100,summary:'Coverage accepted by authorised human decision',unknown:'None material.'}},actions:{repair:{status:'READY',reason:'Coverage accepted and permanent scope can progress.'}},customerMsg:'Coverage has been confirmed. We can now progress the permanent repair.'},evidence:{updates:{coverage:{status:'DEVELOPING',confidence:61,summary:'Targeted evidence requested',unknown:'Specific causation evidence required from assessor.'}},actions:{repair:{status:'BLOCKED',reason:'Waiting only on targeted causation evidence.'}},customerMsg:'We need one specific piece of causation evidence before the permanent repair decision. Temporary protection remains in place.'},decline:{updates:{coverage:{status:'SUFFICIENT',confidence:100,summary:'Coverage declined by authorised human decision',unknown:'Decision subject to communication and review rights.'}},actions:{repair:{status:'BLOCKED',reason:'Permanent repair not authorised under decision.'},settle:{status:'READY',reason:'Adverse decision communication package required.'}},customerMsg:'A coverage decision has been made. The decision, reasons and review options will be provided in writing.'}}}),
        S('09:05','Outcome path continues independently','action',{summary:'Only the action affected by the coverage decision remains constrained. Make-safe and customer communication continue.',actions:{close:{status:'CONDITIONAL',reason:'Closure depends on completing the selected coverage path and required communications.'}}})
      ]
    },
    integrity_signal:{
      name:'Potential integrity concern',
      subtitle:'A metadata inconsistency appears. The simulator demonstrates proportionate investigation without treating anomaly as fraud.',
      claim:'CLM-2026-00488', customer:'Jordan Patel', product:'Comprehensive Motor', event:'Single vehicle impact. Vehicle towed.',
      traditional:{waits:7,handoffs:9,narrative:'A broad fraud referral can freeze all claim activity. The target model isolates the concern and only blocks actions materially affected by it.'},
      steps:[
        S('11:02','Claim established','event',{summary:'Tow receipt, photos and event narrative captured.',updates:{coverage:{status:'RUNNING',summary:'Policy/event review underway'},damage:{status:'RUNNING',summary:'Damage review underway'},integrity:{status:'RUNNING',summary:'Cross-source review underway'},customer:{status:'RUNNING',summary:'Mobility need under assessment'}},actions:{ack:{status:'READY',reason:'Claim established.'}}}),
        S('11:04','Mobility need confirmed','customer',{summary:'Customer has no access to another vehicle.',updates:{customer:{status:'SUFFICIENT',confidence:98,summary:'Mobility need confirmed',unknown:'None material.'},coverage:{status:'SUFFICIENT',confidence:95,summary:'Policy active and event type potentially covered',unknown:'Integrity issue may affect later indemnity decisions but not immediate support.'}},actions:{ack:{status:'EXECUTED',reason:'Acknowledged.'},support:{status:'READY',reason:'Immediate mobility support can proceed within configured boundary.'}},customerMsg:'We can progress mobility support while we continue reviewing the claim information.'}),
        S('11:07','Image metadata inconsistency detected','control',{summary:'One uploaded image appears to pre-date the reported event. This is an anomaly, not a fraud determination.',updates:{integrity:{status:'DEVELOPING',confidence:72,summary:'Material inconsistency requires targeted clarification',unknown:'Reason for image timestamp discrepancy.'},damage:{status:'SUFFICIENT',confidence:90,summary:'Physical damage evident',unknown:'Some evidence provenance requires clarification.'}},actions:{support:{status:'EXECUTED',reason:'Mobility assistance released.'},assess:{status:'READY',reason:'Physical assessment is useful and does not prejudice integrity review.'},repair:{status:'BLOCKED',reason:'Repair authorisation depends on resolving material provenance question.'}},customerMsg:'We are continuing the vehicle assessment. We may need to clarify one item in the information provided.'}),
        S('11:15','Targeted evidence requested','evidence',{summary:'The system requests only the evidence needed to resolve the material inconsistency.',actions:{assess:{status:'EXECUTED',reason:'Independent assessment instructed.'}},controls:[{id:'CTRL-01',state:'ACTIVE',note:'Evidence request limited to the timestamp discrepancy, not a broad document sweep.'}]}),
        S('11:38','Customer clarification received','evidence',{summary:'Image was copied from a messaging application, altering metadata. Original source corroborates event timing.',updates:{integrity:{status:'CLEAR',confidence:96,summary:'Timestamp discrepancy explained and corroborated',unknown:'No material integrity concern remains.'}},actions:{repair:{status:'READY',reason:'Integrity blocker resolved and damage/coverage prerequisites satisfied.'}},customerMsg:'Thanks for clarifying the image. The assessment can now progress without the integrity hold.'}),
        S('11:40','Repair released','action',{summary:'Only the affected action was held. Other customer support continued.',actions:{repair:{status:'EXECUTED',reason:'Repair authorised.'}}})
      ]
    },
    vulnerable_customer:{
      name:'Vulnerable customer / urgent support',
      subtitle:'Home loss with immediate accommodation and financial pressure. Support moves before full quantum and causation.',
      claim:'CLM-2026-00602', customer:'Sam Rivera', product:'Home Building & Contents', event:'Kitchen fire. Property temporarily uninhabitable.',
      traditional:{waits:4,handoffs:7,narrative:'Waiting for complete assessment before support creates avoidable customer harm. The target model makes customer need a first-class process signal.'},
      steps:[
        S('17:43','Emergency notification received','event',{summary:'Fire loss reported. Customer and child cannot remain at property.',updates:{customer:{status:'RUNNING',summary:'Safety, accommodation and financial need assessment underway'},coverage:{status:'RUNNING',summary:'Policy/event context under review'},damage:{status:'RUNNING',summary:'Loss severity under review'}},actions:{ack:{status:'READY',reason:'Claim established.'}}}),
        S('17:45','Urgent support threshold met','customer',{summary:'Immediate accommodation required and customer reports limited available funds.',updates:{customer:{status:'SUFFICIENT',confidence:100,summary:'Urgent accommodation and financial need established',unknown:'Longer-term support requirements still developing.'}},actions:{ack:{status:'EXECUTED',reason:'Acknowledgement sent.'},support:{status:'READY',reason:'Immediate accommodation and urgent assistance can be considered before final quantum.'}},controls:[{id:'CTRL-06',state:'ACTIVE',note:'Urgent financial need pathway activated where applicable.'},{id:'CTRL-07',state:'ACTIVE',note:'Customer support profile drives communication and handling.'}],customerMsg:'Your immediate accommodation need is being prioritised. We are not waiting for the full loss assessment to start helping.'}),
        S('17:49','Initial coverage position sufficient for assistance','intelligence',{summary:'Policy active. Reported fire event is within the insured risk on current evidence.',updates:{coverage:{status:'SUFFICIENT',confidence:96,summary:'Likely covered on current evidence',unknown:'Final indemnity remains subject to full assessment.'},damage:{status:'DEVELOPING',confidence:84,summary:'Property likely temporarily uninhabitable',unknown:'Full building and contents scope pending.'}},actions:{support:{status:'EXECUTED',reason:'Temporary accommodation and urgent assistance released.'},assess:{status:'READY',reason:'Specialist assessment required for permanent scope.'}},customerMsg:'Temporary accommodation has been arranged. The detailed assessment will continue separately.'}),
        S('18:05','Specialist assessment arranged','action',{summary:'Assessment and customer support continue as separate workstreams.',actions:{assess:{status:'EXECUTED',reason:'Specialist assessment booked.'},repair:{status:'CONDITIONAL',reason:'Permanent scope awaits assessment.'}}}),
        S('08:30','Next-day proactive update','customer',{summary:'Customer receives an update without needing to chase the insurer.',customerMsg:'Your assessor is booked for 10:00. Your temporary accommodation remains in place. We will update you again after the assessment.'})
      ]
    },
    complex_loss:{
      name:'High-value complex loss',
      subtitle:'Large commercial-style property loss used to demonstrate lower automation tolerance, experts, authority and staged commitment.',
      claim:'CLM-2026-00901', customer:'Morgan Holdings Pty Ltd', product:'Illustrative Property Cover', event:'Major water damage across multiple floors after pipe failure.',
      traditional:{waits:8,handoffs:11,narrative:'Complexity is often answered with more sequential review. The target model instead lowers action tolerance, increases evidence quality and authority controls, but still parallelises independent work.'},
      steps:[
        S('06:18','Complex loss notification received','event',{summary:'High-severity loss identified. Safety and mitigation are immediate priorities.',updates:{coverage:{status:'RUNNING',summary:'Policy and causation review underway'},damage:{status:'RUNNING',summary:'Multi-disciplinary damage assessment underway'},customer:{status:'RUNNING',summary:'Business continuity needs under assessment'},integrity:{status:'RUNNING',summary:'Baseline integrity review underway'},economics:{status:'RUNNING',summary:'High-value loss economics initiated'}},actions:{ack:{status:'READY',reason:'Claim established.'},support:{status:'CONDITIONAL',reason:'Immediate mitigation can progress subject to emergency authority.'}}}),
        S('06:22','Emergency mitigation authorised','action',{summary:'Water extraction and safety work released under emergency authority without waiting for final coverage or quantum.',updates:{customer:{status:'SUFFICIENT',confidence:99,summary:'Immediate business continuity need confirmed',unknown:'Longer-term interruption impacts developing.'},damage:{status:'DEVELOPING',confidence:86,summary:'Material water damage confirmed',unknown:'Full scope, contamination and structural impact unknown.'}},actions:{ack:{status:'EXECUTED',reason:'Acknowledged.'},support:{status:'EXECUTED',reason:'Emergency mitigation authorised.'},assess:{status:'READY',reason:'Engineering/restoration experts required.'}},controls:[{id:'CTRL-19',state:'ACTIVE',note:'Emergency authority and spend boundaries applied.'}],customerMsg:'Emergency mitigation has been authorised. Detailed coverage and quantum work will continue in parallel.'}),
        S('07:05','Expert workstreams launched in parallel','intelligence',{summary:'Engineering, restoration scope, coverage and business interruption evidence progress independently.',updates:{coverage:{status:'DEVELOPING',confidence:84,summary:'Coverage position developing',unknown:'Causation allocation across damaged areas remains open.'},damage:{status:'DEVELOPING',confidence:78,summary:'Multiple damage streams developing',unknown:'Final scope and quantum require specialist reports.'},economics:{status:'DEVELOPING',confidence:80,summary:'Early mitigation clearly proportionate',unknown:'Final exposure range remains broad.'},recovery:{status:'RUNNING',summary:'Potential contractor/manufacturer recovery being screened'}},actions:{assess:{status:'EXECUTED',reason:'Experts appointed.'},repair:{status:'BLOCKED',reason:'Permanent high-value works require scope, authority and coverage maturity.'}}}),
        S('10:40','Interim works package becomes decision-ready','action',{summary:'A bounded restoration package can proceed while full loss valuation remains open.',updates:{damage:{status:'DEVELOPING',confidence:91,summary:'Interim restoration scope supported',unknown:'Full reinstatement scope still open.'}},actions:{repair:{status:'HUMAN',reason:'Interim works exceed automated authority and require human approval.'}},decision:{title:'Approve bounded interim restoration package?',risk:'HIGH VALUE',body:'Evidence is sufficient for a defined package of drying, strip-out and contamination controls. Full reinstatement remains unresolved. The action is reversible only in part and exceeds automated authority.',recommendation:'Authorised human approval required for this bounded package.',choices:[{label:'Approve interim package',outcome:'accept'},{label:'Request revised scope',outcome:'evidence'}]}}),
        S('10:55','Human authority decision recorded','decision',{summary:'Decision is bounded to the interim package. It does not imply final quantum or full coverage determination.',branch:{accept:{actions:{repair:{status:'EXECUTED',reason:'Bounded interim works approved by authorised human.'}},customerMsg:'The interim restoration package has been approved. The full reinstatement scope continues separately.'},evidence:{actions:{repair:{status:'BLOCKED',reason:'Revised scope requested before commitment.'}},customerMsg:'We have asked the specialist to refine one part of the interim scope before authorisation.'}}}),
        S('14:20','Full claim remains open without blocking bounded progress','intelligence',{summary:'The claim continues as a live state. Coverage, full quantum, recovery and business interruption remain active while authorised mitigation proceeds.'})
      ]
    }
  };

  let state = null, scenario = null, stepIndex = -1, timer = null, pendingDecision = null;

  const statusClass = v => String(v||'').toLowerCase().replace(/\s+/g,'-');
  const domainStatusLabel = d => d.confidence == null ? d.status : `${d.status} · ${d.confidence}%`;
  const actionIcon = s => ({READY:'✓',EXECUTED:'✓',BLOCKED:'×',HUMAN:'!',CONDITIONAL:'○',WAITING:'·'}[s] || '·');

  function initialState(sc){ return {version:0,time:'00:00',summary:'Claim has not started.',domains:domains(),actions:actions(),events:[],customerEvents:[],controls:clone(BASE_CONTROLS),selectedBranch:null,complete:false}; }

  function mergeObj(target, patch){ Object.entries(patch||{}).forEach(([k,v])=>{ if(v && typeof v==='object' && !Array.isArray(v)) target[k]={...(target[k]||{}),...v}; else target[k]=v; }); }
  function patchActions(patch){ Object.entries(patch||{}).forEach(([id,val])=>{ const a=state.actions.find(x=>x.id===id); if(a) Object.assign(a,val); }); }
  function patchControls(items){ (items||[]).forEach(p=>{ let c=state.controls.find(x=>x.id===p.id); if(!c){c={id:p.id,name:p.id,basis:'Prototype control',state:'MONITORING'};state.controls.push(c);} Object.assign(c,p); }); }

  function applyStep(step){
    state.version += 1; state.time = step.time; state.summary = step.summary || step.title;
    let patch = step;
    if(step.branch){ patch = step.branch[state.selectedBranch] || {}; state.selectedBranch=null; }
    if(patch.updates) Object.entries(patch.updates).forEach(([k,v])=>Object.assign(state.domains[k],v));
    patchActions(patch.actions); patchControls(patch.controls);
    state.events.unshift({time:step.time,title:step.title,kind:step.kind,summary:step.summary||'',version:state.version});
    if(patch.customerMsg) state.customerEvents.unshift({time:step.time,text:patch.customerMsg});
    if(step.customerMsg && !patch.customerMsg) state.customerEvents.unshift({time:step.time,text:step.customerMsg});
    if(step.decision){ pendingDecision = step.decision; }
    if(stepIndex === scenario.steps.length-1) state.complete=true;
  }

  function render(){
    if(!state || !scenario) return renderIdle();
    $('#claim-id').textContent=scenario.claim; $('#sim-time').textContent=state.time; $('#state-version').textContent='v'+state.version;
    $('#progress-bar').style.width = `${Math.max(4,((stepIndex+1)/scenario.steps.length)*100)}%`;
    $('#state-badge').textContent = state.complete ? 'CUSTOMER OUTCOME COMPLETE' : pendingDecision ? 'HUMAN DECISION' : 'LIVE';
    $('#state-badge').className='state-badge '+(state.complete?'complete':pendingDecision?'human':'live');
    $('#claim-state-summary').innerHTML=`<div class="claim-overview"><div><span>Customer</span><strong>${esc(scenario.customer)}</strong></div><div><span>Product</span><strong>${esc(scenario.product)}</strong></div><div><span>Event</span><strong>${esc(scenario.event)}</strong></div></div><p class="state-narrative">${esc(state.summary)}</p>`;
    $('#state-domains').innerHTML=Object.entries(state.domains).map(([k,d])=>`<article class="state-domain"><span>${esc(d.label)}</span><strong class="domain-${statusClass(d.status)}">${esc(domainStatusLabel(d))}</strong><p>${esc(d.summary)}</p><small>${esc(d.unknown)}</small></article>`).join('');
    $('#intel-grid').innerHTML=Object.entries(state.domains).map(([k,d])=>`<article class="intel-card ${statusClass(d.status)}"><div class="intel-top"><h3>${esc(d.label)}</h3><span>${esc(d.status)}</span></div>${d.confidence!=null?`<div class="confidence"><i style="width:${d.confidence}%"></i></div><div class="confidence-label">Evidence confidence <strong>${d.confidence}%</strong></div>`:''}<p>${esc(d.summary)}</p><small><strong>Material unknown:</strong> ${esc(d.unknown)}</small></article>`).join('');
    const actionRows=`<div class="action-header"><span>Candidate action</span><span>Readiness</span><span>Why</span></div>`+state.actions.map(a=>`<div class="action-row ${statusClass(a.status)}"><div class="action-name"><i>${actionIcon(a.status)}</i><strong>${esc(a.label)}</strong></div><span class="action-status">${esc(a.status)}</span><p>${esc(a.reason)}</p></div>`).join('');
    const priority={HUMAN:0,READY:1,CONDITIONAL:2,BLOCKED:3,WAITING:4,EXECUTED:5};
    const recommended=[...state.actions].sort((a,b)=>(priority[a.status]??9)-(priority[b.status]??9))[0];
    $('#action-board').innerHTML=recommended?`<article class="next-action-card ${statusClass(recommended.status)}"><div class="next-action-top"><span>${actionIcon(recommended.status)} ${esc(recommended.status)}</span><small>Based on current evidence</small></div><h3>${esc(recommended.label)}</h3><p>${esc(recommended.reason)}</p><div class="next-action-foot"><span>Human remains accountable</span><span>Claim State v${state.version}</span></div></article>`:'<div class="next-action-empty">No action is available yet.</div>';
    $('#all-actions-board').innerHTML=actionRows;
    $('#event-stream').innerHTML=state.events.length?state.events.map(e=>`<li class="event-${statusClass(e.kind)}"><time>${esc(e.time)}</time><div><strong>${esc(e.title)}</strong><p>${esc(e.summary)}</p><small>Claim State v${e.version}</small></div></li>`).join(''):'<li class="empty">No events yet.</li>';
    $('#customer-stream').innerHTML=state.customerEvents.length?state.customerEvents.map(e=>`<li><time>${esc(e.time)}</time><p>${esc(e.text)}</p></li>`).join(''):'<li class="empty">No customer communications yet.</li>';
    $('#control-console').innerHTML=state.controls.map(c=>`<article class="prototype-control ${statusClass(c.state)}"><div><span>${esc(c.id)}</span><strong>${esc(c.state)}</strong></div><h3>${esc(c.name)}</h3><p>${esc(c.note||c.basis)}</p></article>`).join('');
    const next = pendingDecision ? pendingDecision.title : state.complete ? 'Customer outcome complete' : scenario.steps[stepIndex+1]?.title || 'No further event';
    $('#next-decision').textContent=next;
    $('#next-event').disabled=!!pendingDecision || state.complete; $('#auto-run').disabled=!!pendingDecision || state.complete; $('#reset-sim').disabled=false;
    if(pendingDecision) showDecision(pendingDecision);
  }

  function renderIdle(){
    $('#claim-id').textContent='Not started'; $('#sim-time').textContent='00:00'; $('#state-version').textContent='v0'; $('#next-decision').textContent='Start a scenario'; $('#progress-bar').style.width='0%';
    $('#state-badge').textContent='WAITING'; $('#state-badge').className='state-badge';
    $('#action-board').innerHTML='<div class="next-action-empty"><span>Ready when you are</span><strong>Start a scenario to see the recommended action.</strong><p>Evidence, controls and action readiness will update as the claim develops.</p></div>';
    $('#all-actions-board').innerHTML='';
    $('#claim-state-summary').innerHTML='<p>Choose a scenario and start the claim.</p>'; $('#intel-grid').innerHTML=''; $('#state-domains').innerHTML='';
    $('#event-stream').innerHTML='<li class="empty">No events yet.</li>'; $('#customer-stream').innerHTML='<li class="empty">No customer communications yet.</li>'; $('#control-console').innerHTML='';
  }

  function start(){
    stopAuto(); closeDisclosures(); const key=$('#scenario-select').value; scenario=scenarios[key]; state=initialState(scenario); stepIndex=-1; pendingDecision=null; $('#start-sim').textContent='Restart scenario'; $('#next-event').disabled=false; $('#auto-run').disabled=false; $('#reset-sim').disabled=false; render(); next();
  }
  function next(){
    if(!state || pendingDecision || stepIndex>=scenario.steps.length-1) return;
    stepIndex++; const step=scenario.steps[stepIndex]; applyStep(step); render();
  }
  function reset(){ stopAuto(); state=null; scenario=null; stepIndex=-1; pendingDecision=null; $('#start-sim').textContent='Start scenario'; $('#next-event').disabled=true; $('#auto-run').disabled=true; $('#reset-sim').disabled=true; closeDecision(); closeDisclosures(); renderIdle(); document.querySelectorAll('.sim-panel').forEach(x=>x.classList.remove('pulse')); }
  function closeDisclosures(){ document.querySelectorAll('.prototype-disclosure[open]').forEach(x=>{x.open=false;}); }
  function auto(){
    if(timer){stopAuto();return;} $('#auto-run').textContent='Pause';
    timer=setInterval(()=>{ if(pendingDecision || !state || state.complete){stopAuto();return;} next(); },1100);
  }
  function stopAuto(){ if(timer){clearInterval(timer);timer=null;} const b=$('#auto-run'); if(b)b.textContent='Play'; }

  function showDecision(d){
    stopAuto(); const m=$('#decision-modal'); $('#decision-title').textContent=d.title; $('#decision-risk').textContent=d.risk;
    $('#decision-body').innerHTML=`<p class="decision-copy">${esc(d.body)}</p><div class="decision-recommendation"><span>Prototype recommendation</span><strong>${esc(d.recommendation)}</strong></div><div class="decision-evidence"><div><span>What the machine can do</span><p>Assemble evidence, surface uncertainty, explain the proposed path and identify which controls or authorities remain unsatisfied.</p></div><div><span>What it cannot do here</span><p>Convert confidence into authority. This decision remains explicitly accountable to a human because of consequence, ambiguity or delegated authority.</p></div></div>`;
    $('#decision-actions').innerHTML=d.choices.map(c=>`<button class="sim-btn ${c.outcome==='accept'?'primary':''}" data-outcome="${esc(c.outcome)}">${esc(c.label)}</button>`).join('');
    $('#decision-actions').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>resolveDecision(b.dataset.outcome)));
    m.hidden=false;m.setAttribute('aria-hidden','false');
  }
  function closeDecision(){ const m=$('#decision-modal');m.hidden=true;m.setAttribute('aria-hidden','true'); }
  function resolveDecision(outcome){ state.selectedBranch=outcome; pendingDecision=null; closeDecision(); next(); }

  function renderComparison(){
    const box=$('#comparison-content'); if(!scenario){box.innerHTML='<p>Start a scenario first.</p>';return;}
    const executed=state?state.actions.filter(a=>a.status==='EXECUTED').length:0;
    box.innerHTML=`<div class="compare-grid"><article class="compare-card traditional"><p class="panel-kicker">Traditional stage model</p><h3>The file moves</h3><div class="linear-flow"><span>FNOL</span><i>→</i><span>Coverage</span><i>→</i><span>Assessment</span><i>→</i><span>Liability</span><i>→</i><span>Repair</span><i>→</i><span>Settlement</span></div><p>${esc(scenario.traditional.narrative)}</p><dl><div><dt>Illustrative hand-offs</dt><dd>${scenario.traditional.handoffs}</dd></div><div><dt>Potential waiting dependencies</dt><dd>${scenario.traditional.waits}</dd></div></dl></article><article class="compare-card orchestrated"><p class="panel-kicker">Orchestrated model</p><h3>The claim stays still</h3><div class="radial-flow"><div class="claim-core">Claim State</div><span>Coverage</span><span>Damage</span><span>Liability</span><span>Integrity</span><span>Customer</span><span>Recovery</span><span>Economics</span></div><p>Independent intelligence publishes into Claim State. The readiness engine releases each action when its own evidence, authority, human and control prerequisites are satisfied.</p><dl><div><dt>Actions already executed</dt><dd>${executed}</dd></div><div><dt>Global stage gate</dt><dd>None</dd></div></dl></article></div><p class="comparison-note">These counts are illustrative characteristics of the synthetic scenario, not measured savings or a claim about production performance.</p>`;
  }

  function populate(){
    const sel=$('#scenario-select'); sel.innerHTML=Object.entries(scenarios).map(([k,s])=>`<option value="${k}">${esc(s.name)}</option>`).join('');
    const update=()=>{$('#scenario-summary').textContent=scenarios[sel.value].subtitle;}; sel.addEventListener('change',()=>{update();if(state)reset();}); update();
    $('#start-sim').addEventListener('click',start); $('#next-event').addEventListener('click',next); $('#auto-run').addEventListener('click',auto); $('#reset-sim').addEventListener('click',reset);
    $('#comparison-disclosure').addEventListener('toggle',e=>{const b=$('#comparison-content');b.hidden=!e.currentTarget.open;if(e.currentTarget.open)renderComparison();});
    renderIdle();
  }

  populate();
})();
