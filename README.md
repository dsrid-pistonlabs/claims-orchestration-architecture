# Claims Orchestration Reference Architecture

Professional Web Edition 3.2. The website is the publication.

## Publish with GitHub Pages

1. Create a GitHub repository.
2. Copy the complete contents of this folder to the repository root.
3. Commit and push to the default branch.
4. In GitHub, open **Settings > Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select the default branch and `/ (root)`, then save.

No build step, server, package manager or external JavaScript dependency is required.

## Interactive BPMN

The six BPMN SVG views are embedded as same-origin SVG objects and enhanced with local JavaScript. They support:

- pan by dragging the canvas
- mouse-wheel and toolbar zoom
- fit-to-view and fullscreen
- keyboard-accessible activity hotspots
- click-to-inspect process/function details
- links from BPMN activities to the relevant process page and L3 function contract

If JavaScript is unavailable, the SVGs still render as standard vector diagrams and can be opened directly.

## Structure

- `/operating-model` - target operating model and principles
- `/process` - hierarchy, interactive BPMN and function catalogue
- `/reference` - Claim State, decisioning, services and NFRs
- `/governance` - controls, obligations, traceability, methodology and sources
- `/implementation` - feasibility, assurance and
- `/assets/diagrams` - embedded SVG BPMN assets
- `/assets/source` - editable BPMN XML source
- `/data` - machine-readable function, control and source registers

Copyright Dharshun Sridharan.


## Architecture explorer

The six BPMN views are the primary navigation surface for the architecture. Selecting an activity:

- highlights immediate upstream and downstream dependencies
- highlights co-active / parallel activities in the same BPMN view
- highlights related control activities where they are present in the current view
- maps the BPMN activity to the governing L3 function contract(s)
- shows accountable human, agent and service responsibilities
- shows the Claim State domains touched by the activity
- shows the relevant control register entries and their normative class/basis
- creates a stable `#node=` deep link for BPMN activities and `#function=` links when navigating by canonical L3 function

The BPMN activity identifier and L3 function identifier are intentionally kept separate where a detailed BPMN activity is a decomposition rather than a one-to-one function. This prevents false traceability.

All interaction is implemented in static HTML/CSS/SVG/JavaScript and is compatible with GitHub Pages. No server or runtime framework is required.

Deep-link semantics are deliberate: `#node=` identifies the exact BPMN activity shown on that page; `#function=` resolves a canonical L3 function to the appropriate activity on the target process page. This avoids ID collisions between detailed BPMN decomposition steps and the function catalogue.

## Validation snapshot

This edition was statically validated for:

- 66 interactive BPMN activity hotspots across 6 process views
- 111 BPMN-to-L3 function mappings
- 89 explicitly modelled immediate flow relationships
- 19 control-register anchors
- 14 service-catalogue anchors
- 10 Claim State domain anchors
- 0 unresolved mapping references
- 0 broken internal file/anchor links across the static site

The interaction layer preserves the published BPMN SVG as the visual source. Relationship overlays are navigation/traceability aids and do not alter BPMN sequence-flow semantics.

## Interactive prototype

`prototype/index.html` is a static synthetic claims simulator embedded in the publication. It requires no backend, API key, customer data or external runtime. It demonstrates persistent Claim State, parallel intelligence, action-specific readiness, customer/control lifecycles and human decision boundaries. All scenarios, confidence values, timings and decisions are illustrative and must not be interpreted as policy, legal, compliance or production claims determinations.
