(() => {
  const $ = selector => document.querySelector(selector);
  const SERVICES = [
    {id:'coverage',name:'Coverage intelligence',owner:'Policy & event match'},
    {id:'damage',name:'Damage intelligence',owner:'Vision & repairability'},
    {id:'liability',name:'Liability intelligence',owner:'Circumstances & road rules'},
    {id:'integrity',name:'Integrity intelligence',owner:'Cross-source consistency'},
    {id:'customer',name:'Customer intelligence',owner:'Needs & vulnerability'},
    {id:'recovery',name:'Recovery intelligence',owner:'Third-party opportunity'},
    {id:'economics',name:'Economics intelligence',owner:'Cost & proportionality'}
  ];

  const STAGES = [
    {time:'09:01',directive:'Dispatching seven independent evidence tasks from the new Claim State.',summary:'Claim notification received. Evidence services are working concurrently.',action:['READY','Acknowledge and orient customer','Claim identity and contact channel are established.'],updates:{coverage:['running','Matching policy and event'],damage:['running','Inspecting submitted photographs'],liability:['running','Parsing incident circumstances'],integrity:['running','Comparing sources and metadata'],customer:['running','Identifying immediate needs'],recovery:['running','Screening third-party details'],economics:['running','Estimating initial exposure']}},
    {time:'09:02',directive:'Customer finding published. Other services continue without interruption.',summary:'Mobility need confirmed while six intelligence services continue.',action:['READY','Provide immediate mobility support','The customer need is established and does not depend on final liability.'],updates:{customer:['complete','Mobility need confirmed · 98%'],coverage:['running','Policy match in progress'],damage:['running','Image analysis in progress'],liability:['running','Circumstances assessment in progress'],integrity:['running','Consistency checks in progress'],recovery:['running','Recovery screening in progress'],economics:['running','Exposure estimate in progress']}},
    {time:'09:03',directive:'Reconciling three new findings and re-evaluating every candidate action.',summary:'Coverage, damage and integrity findings published into Claim State.',action:['READY','Authorise damage assessment','Coverage and damage evidence are sufficient for assessment.'],updates:{coverage:['complete','Likely covered · 97%'],damage:['complete','Repairable damage likely · 91%'],integrity:['complete','No material conflict · 96%'],liability:['running','Awaiting third-party account'],recovery:['running','Preparing recovery facts'],economics:['running','Testing proportionality']}},
    {time:'09:05',directive:'Releasing recovery preparation without waiting for final liability.',summary:'Recovery can begin. Liability remains unresolved and independently active.',action:['READY','Begin recovery preparation','Third party is identified; evidence preservation can begin now.'],updates:{liability:['running','Responsibility likely · 62%'],recovery:['complete','Recovery opportunity · 78%'],economics:['running','Repair economics developing']}},
    {time:'10:10',directive:'Evidence threshold met. Routing repair authority to the accountable human.',summary:'Repair scope is complete; delegated authority requires a human decision.',action:['HUMAN','Approve repair authority','Evidence supports repair, but authority remains with the claims decision-maker.'],human:true,updates:{damage:['complete','Scope and estimate confirmed · 97%'],economics:['complete','Repair proportionate · 96%'],liability:['complete','Third-party responsibility · 89%']}},
    {time:'10:12',directive:'Human approval recorded. Releasing the repair instruction and preserving provenance.',summary:'Repair instruction released. Residual recovery continues separately.',action:['EXECUTED','Repair authorised','The human-approved instruction has been released to fulfilment.'],updates:{recovery:['running','Recovery continues after repair release']}},
    {time:'15:40',directive:'Customer outcome complete. Closing the customer-facing lifecycle.',summary:'Repair and payment reconciled. Residual recovery remains insurer work.',action:['READY','Close customer-facing claim','Customer outcome and mandatory communication obligations are complete.'],updates:{recovery:['complete','Recovery package complete · 93%']}},
    {time:'15:42',directive:'Customer-facing lifecycle closed. Retaining the complete decision and evidence trace.',summary:'The claim outcome is complete and the orchestration record is preserved.',action:['EXECUTED','Customer-facing claim closed','Closure criteria were satisfied and the outcome was recorded.'],updates:{}}
  ];

  let index = -1;
  let timer = null;
  let humanApproved = false;
  let events = [];
  let serviceState = Object.fromEntries(SERVICES.map(s => [s.id,{status:'waiting',detail:'Waiting for dispatch'}]));

  const icon = status => ({waiting:'○',running:'↻',complete:'✓',human:'!'})[status] || '○';
  function renderAgents(){
    $('#agent-grid').innerHTML = SERVICES.map(service => {
      const state=serviceState[service.id];
      return `<article class="agent-card ${state.status}"><div class="agent-card-top"><span class="agent-icon">${icon(state.status)}</span><span>${state.status==='running'?'ACTIVE':state.status==='complete'?'PUBLISHED':'QUEUED'}</span></div><h3>${service.name}</h3><p>${service.owner}</p><div class="agent-progress"><i></i></div><small>${state.detail}</small></article>`;
    }).join('');
  }

  function render(){
    const stage=STAGES[index];
    const active=Object.values(serviceState).filter(s=>s.status==='running').length;
    const complete=Object.values(serviceState).filter(s=>s.status==='complete').length;
    $('#ops-version').textContent=`v${Math.max(0,index+1)}`; $('#hub-version').textContent=`v${Math.max(0,index+1)}`;
    $('#ops-active').textContent=active; $('#ops-complete').textContent=`${complete} / 7`;
    $('#ops-human-count').textContent=stage?.human && !humanApproved?'1 pending':'None';
    $('#ops-mode').textContent=index<0?'Waiting':stage?.human&&!humanApproved?'Awaiting human':index===STAGES.length-1?'Complete':'Orchestrating';
    $('#ops-state').textContent=index<0?'IDLE':stage?.human&&!humanApproved?'HUMAN GATE':index===STAGES.length-1?'COMPLETE':'ACTIVE';
    $('#ops-state').className=`orchestrator-state ${stage?.human&&!humanApproved?'human':index===STAGES.length-1?'complete':''}`;
    $('#ops-directive').textContent=stage?.directive || 'Start the claim to dispatch parallel work.';
    $('#hub-summary').textContent=stage?.summary || 'No evidence has been published.';
    $('#hub-pulse').textContent=index<0?'Waiting for input':`${active} active · ${complete} published`;
    const action=stage?.human&&humanApproved?['READY','Release repair instruction','Human authority is recorded; the orchestrator can now release fulfilment.']:(stage?.action || ['WAITING','Start orchestration','No action has been assessed yet.']);
    $('#ops-action-status').textContent=action[0]; $('#ops-action-status').className=`ops-action-status ${action[0].toLowerCase()}`;
    $('#ops-action').textContent=action[1]; $('#ops-action-reason').textContent=action[2];
    const pending=!!stage?.human&&!humanApproved;
    $('#human-status').textContent=pending?'REVIEW REQUIRED':'CLEAR'; $('#human-status').className=pending?'pending':'';
    $('#human-copy').textContent=pending?'Review the repair scope, evidence confidence, authority and control checks before release.':'No decision currently requires human authority.';
    $('#human-approve').disabled=!pending;
    $('#ops-next').disabled=index<0 || pending || index===STAGES.length-1;
    $('#ops-play').disabled=index<0 || pending || index===STAGES.length-1;
    $('#ops-events').innerHTML=events.length?events.map(e=>`<li><time>${e.time}</time><div><strong>${e.title}</strong><p>${e.copy}</p></div></li>`).join(''):'<li class="empty">No activity yet.</li>';
    $('#event-count').textContent=`${events.length} event${events.length===1?'':'s'}`;
    renderAgents();
  }

  function advance(){
    if(index>=STAGES.length-1 || (STAGES[index]?.human&&!humanApproved)) return;
    index+=1; const stage=STAGES[index];
    Object.entries(stage.updates).forEach(([id,[status,detail]])=>{serviceState[id]={status,detail};});
    events.unshift({time:stage.time,title:index===0?'Parallel work dispatched':stage.human?'Human decision requested':'Claim State updated',copy:stage.summary});
    humanApproved=false; render();
    if(stage.human) stopPlay();
  }

  function start(){ resetState(); $('#ops-start').textContent='Restart orchestration'; $('#ops-reset').disabled=false; advance(); }
  function approve(){
    if(!STAGES[index]?.human) return;
    humanApproved=true; events.unshift({time:'10:11',title:'Human authority recorded',copy:'Claims consultant approved repair within delegated authority.'});
    render();
  }
  function play(){
    if(timer){stopPlay();return;}
    $('#ops-play').textContent='Pause'; timer=setInterval(()=>{ if(index>=STAGES.length-1 || (STAGES[index]?.human&&!humanApproved)){stopPlay();return;} advance(); },1100);
  }
  function stopPlay(){ if(timer){clearInterval(timer);timer=null;} $('#ops-play').textContent='Play'; }
  function resetState(){ stopPlay(); index=-1; humanApproved=false; events=[]; serviceState=Object.fromEntries(SERVICES.map(s=>[s.id,{status:'waiting',detail:'Waiting for dispatch'}])); }
  function reset(){ resetState(); $('#ops-start').textContent='Start orchestration'; $('#ops-reset').disabled=true; render(); }

  $('#ops-start').addEventListener('click',start); $('#ops-next').addEventListener('click',advance); $('#ops-play').addEventListener('click',play); $('#ops-reset').addEventListener('click',reset); $('#human-approve').addEventListener('click',approve);
  render();
})();
