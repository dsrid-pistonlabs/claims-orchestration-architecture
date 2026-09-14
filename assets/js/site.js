(() => {
 const page = document.body.dataset.page || '';
 const rootPath = () => '../'.repeat(Math.max(0, page.split('/').length - 1));
 const prefix = rootPath();
 // Keep the working prototype one click away from every architecture page.
 const topbar = document.querySelector('.topbar');
 if(topbar && !topbar.querySelector('.top-prototype-link')){
   const link=document.createElement('a'); link.className='top-prototype-link'; link.href=prefix+'prototype/index.html'; link.textContent=page==='prototype/index.html'?'Prototype':'Run prototype';
   const meta=topbar.querySelector('.top-meta'); if(meta) topbar.insertBefore(link,meta); else topbar.appendChild(link);
 }
 const functions = window.CORA_FUNCTIONS || [];
 const functionMap = new Map(functions.map(r => [String(r.id), r]));
 const arch = window.CORA_ARCHITECTURE || {nodeFunctions:{},nodeOverrides:{},graphs:{},serviceByFunction:{},stateByMajor:{},stateSpecific:{},stateAnchor:{},controls:[]};
 const controls = arch.controls || [];
 const graph = arch.graphs?.[page] || {edges:[],parallel_groups:[]};
 const nodeFunctionMap = arch.nodeFunctions?.[page] || {};
 const nodeOverrides = arch.nodeOverrides?.[page] || {};

 const toggle = document.querySelector('.nav-toggle');
 const nav = document.querySelector('.sidebar');
 const scrim = document.querySelector('.nav-scrim');
 const closeNav = () => { nav?.classList.remove('open'); scrim?.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); };
 toggle?.addEventListener('click', () => { const open = !nav.classList.contains('open'); nav.classList.toggle('open',open); scrim?.classList.toggle('open',open); toggle.setAttribute('aria-expanded', String(open)); });
 scrim?.addEventListener('click', closeNav);
 document.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', closeNav));

 const esc = s => String(s ?? '').replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const uniq = arr => [...new Set((arr||[]).filter(Boolean).map(String))];
 const processPage = id => {
 const n = Number(String(id).split('.')[0]);
 if (n===1) return prefix+'process/intake.html';
 if (n===2) return prefix+'process/intelligence.html';
 if (n===3) return prefix+'process/decision-readiness.html';
 if (n===4 || n===7) return prefix+'process/fulfilment-closure.html';
 if (n===5 || n===6) return prefix+'process/communications-controls.html';
 return prefix+'process/function-catalogue.html';
 };
 const catalogueAnchor = id => prefix+'process/function-catalogue.html#fn-'+String(id).replaceAll('.','-');
 const controlAnchor = id => prefix+'governance/control-framework.html#'+String(id).toLowerCase();
 const serviceAnchor = text => {
 const m=String(text).match(/\b(INT|DEC|HUM|ACT|COM|CTL)-\d+\b/); return m ? prefix+'reference/agents-services.html#svc-'+m[0].toLowerCase() : prefix+'reference/agents-services.html';
 };
 const stateHref = label => prefix+'reference/claim-state.html#'+(arch.stateAnchor?.[label] || 'state-audit-residual');
 const functionsForNode = id => {
 if (nodeFunctionMap[id]) return uniq(nodeFunctionMap[id]);
 if (functionMap.has(String(id))) return [String(id)];
 const parts=String(id).split('.'); if(parts.length>2){const parent=parts.slice(0,2).join('.'); if(functionMap.has(parent)) return [parent];}
 return [];
 };
 const functionRows = id => functionsForNode(id).map(fid=>functionMap.get(fid)).filter(Boolean);
 const stateFields = id => {
 const fids=functionsForNode(id); const out=[];
 fids.forEach(fid => { (arch.stateSpecific?.[fid] || arch.stateByMajor?.[fid.split('.')[0]] || []).forEach(x=>out.push(x)); });
 if(!out.length) (arch.stateByMajor?.[String(id).split('.')[0]]||[]).forEach(x=>out.push(x));
 return uniq(out).slice(0,10);
 };
 const responsibilities = id => {
 const out=[]; functionsForNode(id).forEach(fid => (arch.serviceByFunction?.[fid]||[]).forEach(x=>out.push(x)));
 return uniq(out).slice(0,8);
 };
 const numericRefs = text => {
 const s=String(text||''); const out=[];
 const range=/\b(\d+)\.(\d+)\s*-\s*(?:(\d+)\.)?(\d+)\b/g; let m;
 while((m=range.exec(s))){const major=m[1], a=+m[2], b=+m[4]; if(a<=b && b-a<30) for(let i=a;i<=b;i++) out.push(`${major}.${i}`);}
 (s.match(/\b\d+\.\d+\b/g)||[]).forEach(x=>out.push(x)); return uniq(out);
 };
 const processStringMatches = (text, fid) => {
 const s=String(text||'').toLowerCase(); if(s.includes('all')) return true;
 const refs=numericRefs(text); if(refs.includes(fid)) return true;
 // Broad family references such as 4.0 / 3.0
 const major=fid.split('.')[0]; if(refs.some(r=>r===major+'.0')) return true;
 if(s.includes('orchestration') && ['1','3','7'].includes(major)) return true;
 if(s.includes('fulfilment') && major==='4') return true;
 if(s.includes('external services') && ['4','6'].includes(major)) return true;
 if(s.includes('technology') && ['1','2','3','4','5','6','7'].includes(major)) return true;
 return false;
 };
 const controlsForNode = id => {
 const fids=functionsForNode(id); const major=String(id).split('.')[0];
 return controls.filter(c => {
 if(['CTRL-09','CTRL-17','CTRL-19'].includes(c.id)) return true;
 if(c.id==='CTRL-18' && ['1','3','4','7'].includes(major)) return true;
 return fids.some(fid=>processStringMatches(c.process,fid));
 }).slice(0,9);
 };
 const localRelations = id => {
 const upstream=uniq(graph.edges.filter(e=>e[1]===id).map(e=>e[0]));
 const downstream=uniq(graph.edges.filter(e=>e[0]===id).map(e=>e[1]));
 const parallel=[]; (graph.parallel_groups||[]).forEach(g=>{if(g.includes(id)) g.filter(x=>x!==id).forEach(x=>parallel.push(x));});
 return {upstream,downstream,parallel:uniq(parallel)};
 };
 const broaderRelatedFunctions = id => {
 const out=[]; functionRows(id).forEach(f => numericRefs(f.parallel_controls).forEach(x=>out.push(x))); return uniq(out);
 };
 const functionHref = id => processPage(id)+'#function='+encodeURIComponent(id);
 const chip = (label,cls,href,attrs='') => `<a class="arch-chip ${cls}" href="${href}" ${attrs}><span class="chip-dot"></span>${esc(label)}</a>`;

 document.querySelectorAll('[data-diagram]').forEach(view => {
 const card = view.closest('.diagram-card'); const host = view.querySelector('.diagram-svg-host'); let panel=card?.querySelector('.diagram-sidepanel');
 if(!host || !card || !panel) return;
 let svg, base, vb, drag=null, selectedId=null;
 // Add toolbar actions that only make sense once relationship exploration exists.
 const actions=card.querySelector('.diagram-actions');
 if(actions && !actions.querySelector('[data-action="clear"]')){
 const clear=document.createElement('button'); clear.type='button'; clear.className='diagram-btn'; clear.dataset.action='clear'; clear.textContent='Clear'; clear.setAttribute('aria-label','Clear selected activity');
 const copy=document.createElement('button'); copy.type='button'; copy.className='diagram-btn copy-link'; copy.dataset.action='copy'; copy.textContent='Copy link'; copy.setAttribute('aria-label','Copy deep link to selected activity');
 actions.insertBefore(clear,actions.querySelector('.text-link')); actions.insertBefore(copy,actions.querySelector('.text-link'));
 }
 // Relationship legend.
 if(!card.querySelector('.diagram-legend')){
 const legend=document.createElement('div'); legend.className='diagram-legend'; legend.innerHTML='<span class="legend-key"><i class="legend-swatch"></i>Selected</span><span class="legend-key"><i class="legend-swatch upstream"></i>Immediate upstream</span><span class="legend-key"><i class="legend-swatch downstream"></i>Immediate downstream</span><span class="legend-key"><i class="legend-swatch parallel"></i>Parallel / co-active</span><span class="legend-key"><i class="legend-swatch control"></i>Related control activity</span>';
 const ws=card.querySelector('.diagram-workspace'); ws?.insertAdjacentElement('afterend',legend);
 }

 const setVB=()=>{if(svg)svg.setAttribute('viewBox',`${vb.x} ${vb.y} ${vb.w} ${vb.h}`)};
 const fit=()=>{if(base){vb={...base};setVB();}};
 const zoom=factor=>{if(!vb)return;const cx=vb.x+vb.w/2,cy=vb.y+vb.h/2,nw=vb.w*factor,nh=vb.h*factor;vb={x:cx-nw/2,y:cy-nh/2,w:nw,h:nh};setVB();};
 const allHotspots=()=>[...host.querySelectorAll('.bpmn-node-hotspot')];
 const resolveHotspot = target => allHotspots().find(h=>h.dataset.nodeId===target);
 const resolveFunctionHotspot = target => allHotspots().find(h=>functionsForNode(h.dataset.nodeId).includes(target));
 const labelFor = id => resolveHotspot(id)?.dataset.nodeLabel || functionMap.get(id)?.name || id;
 const updateHash=(id,mode='push')=>{const h=id?'#node='+encodeURIComponent(id):location.pathname+location.search; if(mode==='replace')history.replaceState({node:id},'',id?h:location.pathname+location.search); else history.pushState({node:id},'',id?h:location.pathname+location.search);};
 const clearClasses=()=>{allHotspots().forEach(h=>h.classList.remove('is-selected','is-upstream','is-downstream','is-parallel','is-control')); view.classList.remove('has-selection'); card.classList.remove('has-selection');};
 const relatedControlNodeIds = id => {
 const c=controlsForNode(id); const controlRefs=uniq(c.flatMap(x=>numericRefs(x.process)).filter(x=>x.startsWith('6.')));
 return allHotspots().filter(h=>functionsForNode(h.dataset.nodeId).some(fid=>controlRefs.includes(fid))).map(h=>h.dataset.nodeId);
 };
 const relationLink=(rid,cls)=>{
 const local=resolveHotspot(rid); const href=local?`#node=${encodeURIComponent(local.dataset.nodeId)}`:functionHref(rid);
 const target=local?local.dataset.nodeId:rid; return chip(`${target} · ${labelFor(target)}`,cls,href,local?`data-select-node="${esc(target)}"`:`data-select-function="${esc(rid)}"`);
 };
 const renderPanel=(id,label)=>{
 const rows=functionRows(id), funcs=functionsForNode(id), o=nodeOverrides[id]||{}; const rel=localRelations(id); const relatedF=broaderRelatedFunctions(id); const ctrls=controlsForNode(id); const states=stateFields(id); const resp=responsibilities(id);
 const purpose=o.purpose || rows[0]?.note || 'This activity contributes to the published process contract at this decomposition level.';
 const trigger=o.trigger || rows[0]?.trigger || 'See the BPMN flow and mapped function contract.';
 const inputs=rows.length?uniq(rows.flatMap(r=>String(r.inputs||'').split(/,\s*/))).slice(0,12).join(', '):'See decomposition context.';
 const output=o.output || (rows.length?uniq(rows.map(r=>r.output)).join(' / '):'Process state / event as shown in BPMN.');
 const functionHtml=funcs.length?funcs.map(fid=>chip(`${fid} · ${functionMap.get(fid)?.name||'L3 function'}`,'function',catalogueAnchor(fid))).join(''):'<span class="panel-empty">No single L3 function maps one-to-one to this decomposition activity.</span>';
 const relationBlock=(title,arr,cls)=>arr.length?`<div class="arch-section-title">${title}<span>${arr.length}</span></div><div class="arch-chip-row">${arr.map(x=>relationLink(x,cls)).join('')}</div>`:'';
 const broader=relatedF.filter(x=>!rel.upstream.includes(x)&&!rel.downstream.includes(x));
 const stateHtml=states.map(x=>chip(x,'state',stateHref(x))).join('');
 const respHtml=resp.map(x=>{const human=/human|specialist|handler|decision maker|owner|investigator|assessor|expert/i.test(x)&&!/(service|rules|orchestration)/i.test(x);return chip(x,human?'human':'service',serviceAnchor(x));}).join('');
 const controlsHtml=ctrls.map(c=>`<div class="control-card-mini"><a href="${controlAnchor(c.id)}">${esc(c.id)} · ${esc(c.name)}</a><div class="control-meta">${esc(c.class)} · ${esc(c.basis)}</div><p>${esc(c.behaviour)}</p></div>`).join('');
 panel.innerHTML=`<div class="diagram-panel-header"><div class="panel-kicker">Architecture explorer</div><h4>${esc(label||id)}</h4><div class="panel-id">BPMN activity <span class="mono">${esc(id)}</span></div></div><div class="diagram-panel-body">
 <section class="arch-section"><div class="arch-section-title">Design intent</div><p class="arch-purpose">${esc(purpose)}</p><dl><dt>Trigger</dt><dd>${esc(trigger)}</dd><dt>Inputs</dt><dd>${esc(inputs)}</dd><dt>Output</dt><dd>${esc(output)}</dd></dl></section>
 <section class="arch-section"><div class="arch-section-title">Mapped L3 functions <span>${funcs.length}</span></div><div class="arch-chip-row">${functionHtml}</div></section>
 <section class="arch-section">${relationBlock('Immediate upstream',rel.upstream,'upstream')}${relationBlock('Immediate downstream',rel.downstream,'downstream')}${relationBlock('Parallel / co-active',rel.parallel,'parallel')}${broader.length?`<div class="arch-section-title" style="margin-top:11px">Cross-process relationships <span>${broader.length}</span></div><div class="arch-chip-row">${broader.map(x=>{const local=resolveFunctionHotspot(x); const href=local?`#function=${encodeURIComponent(x)}`:functionHref(x); return chip(`${x} · ${functionMap.get(x)?.name||'Related function'}`,'parallel',href,local?`data-select-function="${esc(x)}"`:'');}).join('')}</div>`:''}</section>
 <section class="arch-section"><div class="arch-section-title">Human / agent / service responsibility</div><div class="arch-chip-row">${respHtml||'<span class="panel-empty">Responsibility is defined at the parent process level.</span>'}</div></section>
 <section class="arch-section"><div class="arch-section-title">Claim State touched</div><div class="arch-chip-row">${stateHtml}</div></section>
 <section class="arch-section"><div class="arch-section-title">Applicable controls <span>${ctrls.length}</span></div><p>Mapped controls in this reference architecture. Legal/Code applicability remains product, entity and context dependent.</p>${controlsHtml||'<span class="panel-empty">No control is mapped specifically at this activity level.</span>'}</section>
 <div class="diagram-panel-actions"><a class="button secondary" href="${processPage(funcs[0]||id)}">Open process page</a>${funcs[0]?`<a class="button secondary" href="${catalogueAnchor(funcs[0])}">Open function contract</a>`:''}<button class="button secondary" type="button" data-panel-copy>Copy deep link</button><button class="button secondary" type="button" data-panel-clear>Clear</button></div><div class="diagram-copy-status" aria-live="polite"></div>
 </div>`;
 panel.querySelectorAll('[data-select-node]').forEach(a=>a.addEventListener('click',e=>{const h=resolveHotspot(a.dataset.selectNode);if(h){e.preventDefault();selectNode(h,{updateHash:true});}}));
 panel.querySelectorAll('[data-select-function]').forEach(a=>a.addEventListener('click',e=>{const h=resolveFunctionHotspot(a.dataset.selectFunction);if(h){e.preventDefault();selectNode(h,{updateHash:true});}}));
 panel.querySelector('[data-panel-copy]')?.addEventListener('click',copyLink);
 panel.querySelector('[data-panel-clear]')?.addEventListener('click',()=>clearSelection(true));
 };
 const applyHighlights=id=>{
 clearClasses(); view.classList.add('has-selection'); card.classList.add('has-selection');
 const h=resolveHotspot(id); h?.classList.add('is-selected'); const rel=localRelations(h?.dataset.nodeId||id);
 rel.upstream.forEach(x=>resolveHotspot(x)?.classList.add('is-upstream')); rel.downstream.forEach(x=>resolveHotspot(x)?.classList.add('is-downstream')); rel.parallel.forEach(x=>resolveHotspot(x)?.classList.add('is-parallel'));
 relatedControlNodeIds(h?.dataset.nodeId||id).forEach(x=>{const n=resolveHotspot(x); if(n&&!n.classList.contains('is-selected'))n.classList.add('is-control');});
 };
 const selectNode=(hotspot,{updateHash=false,replace=false}={})=>{
 if(!hotspot)return; selectedId=hotspot.dataset.nodeId; applyHighlights(selectedId); renderPanel(selectedId,hotspot.dataset.nodeLabel); if(updateHash)updateHashFn(selectedId,replace); hotspot.focus?.({preventScroll:true});
 };
 const updateHashFn=(id,replace=false)=>{const hash='#node='+encodeURIComponent(id); if(location.hash===hash)return; history[replace?'replaceState':'pushState']({node:id},'',hash);};
 const clearSelection=(update=true)=>{selectedId=null;clearClasses();panel.innerHTML='<div class="diagram-panel-header"><div class="panel-kicker">Architecture explorer</div><h4>Select an activity</h4></div><div class="diagram-panel-body"><p class="panel-empty">Select a BPMN activity to explore immediate dependencies, parallel work, mapped L3 functions, controls, Claim State impact and accountable services.</p><div class="architecture-context-note"><div><strong>Deep links are enabled.</strong><br>A selected activity is encoded in the URL, so a specific architecture context can be shared directly.</div></div></div>'; if(update && (location.hash.startsWith('#node=')||location.hash.startsWith('#function='))) history.pushState({},'',location.pathname+location.search);};
 const copyLink=async()=>{if(!selectedId)return; const u=new URL(location.href);u.hash='node='+encodeURIComponent(selectedId); const status=panel.querySelector('.diagram-copy-status'); try{await navigator.clipboard.writeText(u.href);if(status)status.textContent='Deep link copied.';}catch(e){const ta=document.createElement('textarea');ta.value=u.href;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();if(status)status.textContent='Deep link copied.';}};
 const selectFromHash=(replace=false)=>{
 if(location.hash.startsWith('#node=')){const target=decodeURIComponent(location.hash.slice(6)); const h=resolveHotspot(target); if(h){selectNode(h,{updateHash:false,replace}); return true;}}
 if(location.hash.startsWith('#function=')){const target=decodeURIComponent(location.hash.slice(10)); const h=resolveFunctionHotspot(target); if(h){selectNode(h,{updateHash:false,replace}); return true;}}
 return false;
 };
 const init=()=>{
 svg=host.querySelector('svg');if(!svg)return;const raw=(svg.getAttribute('viewBox')||`0 0 ${svg.getAttribute('width')||1000} ${svg.getAttribute('height')||700}`).split(/\s+/).map(Number);base={x:raw[0],y:raw[1],w:raw[2],h:raw[3]};vb={...base};svg.style.width='100%';svg.style.height='100%';svg.style.userSelect='none';svg.setAttribute('preserveAspectRatio','xMidYMid meet');
 allHotspots().forEach(h=>{h.setAttribute('aria-describedby','diagram-relationship-help');const activate=()=>selectNode(h,{updateHash:true});h.addEventListener('click',activate);h.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}});});
 svg.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?.88:1.14);},{passive:false});
 svg.addEventListener('pointerdown',e=>{if(e.target?.classList?.contains('bpmn-node-hotspot'))return;drag={x:e.clientX,y:e.clientY,vx:vb.x,vy:vb.y};svg.setPointerCapture?.(e.pointerId);view.classList.add('is-dragging');});
 svg.addEventListener('pointermove',e=>{if(!drag)return;const rect=svg.getBoundingClientRect();vb.x=drag.vx-(e.clientX-drag.x)*(vb.w/rect.width);vb.y=drag.vy-(e.clientY-drag.y)*(vb.h/rect.height);setVB();});
 const up=()=>{drag=null;view.classList.remove('is-dragging');};svg.addEventListener('pointerup',up);svg.addEventListener('pointercancel',up);fit();
 if(!selectFromHash(true)) clearSelection(false);
 };
 init();
 card.querySelector('[data-action="zoom-in"]')?.addEventListener('click',()=>zoom(.82));
 card.querySelector('[data-action="zoom-out"]')?.addEventListener('click',()=>zoom(1.22));
 card.querySelector('[data-action="fit"]')?.addEventListener('click',fit);
 card.querySelector('[data-action="fullscreen"]')?.addEventListener('click',()=>document.fullscreenElement?document.exitFullscreen():card.requestFullscreen?.());
 card.querySelector('[data-action="clear"]')?.addEventListener('click',()=>clearSelection(true));
 card.querySelector('[data-action="copy"]')?.addEventListener('click',copyLink);
 window.addEventListener('popstate',()=>{if(!selectFromHash())clearSelection(false);});
 });

 const toc=document.getElementById('page-toc'); if(toc){const heads=[...document.querySelectorAll('.section h2,.section h3')];heads.forEach((h,i)=>{if(!h.id)h.id='section-'+(i+1)+'-'+h.textContent.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');const a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;a.className=h.tagName==='H3'?'toc-h3':'toc-h2';toc.appendChild(a);});}
})();
