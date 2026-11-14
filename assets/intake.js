
(function () {
  var form = document.getElementById('intake-form');
  if (!form) return;
  var KEY = 'nsc-intake-v2';
  var YN = ['Yes', 'No'];
  var YNU = ['Yes', 'No', 'Unsure'];

  var SERVICES = [
    { key: 's1', title: 'Assessment and Strategy', items: [['svc-consult', 'Strategy Consultation'], ['svc-discovery', 'Discovery Assessment'], ['svc-roadmap', 'Implementation Roadmap'], ['svc-charts', 'Master Structure Charts'], ['svc-bizplan', 'Comprehensive Business Plan']] },
    { key: 's2', title: 'Corporate Record Repair', items: [['svc-rebuild', 'Corporate Record Rebuild'], ['svc-bylaws', 'Custom Bylaws'], ['svc-orgconsent', 'Organizational Unanimous Written Consent'], ['svc-issuance', 'Share Issuance'], ['svc-transfer', 'Share Transfer'], ['svc-resolution', 'Board or Shareholder Resolution'], ['svc-bylawamend', 'Bylaws Amendment'], ['svc-intercompany', 'Intercompany Agreement'], ['svc-ein', 'EIN Application'], ['svc-copyright', 'Copyright Registration'], ['svc-cfp', 'New Entity Formation (on request)']] },
    { key: 's3', title: 'Supporting Filings: State Compliance', items: [['svc-annual', 'Annual Report or Annual Registration'], ['svc-acp', 'Annual Compliance Plan'], ['svc-reinstate', 'Reinstatement'], ['svc-foreign', 'Foreign Qualification'], ['svc-amend', 'Certificate of Amendment'], ['svc-securities', 'Securities Exemption Notice'], ['svc-license', 'Business License Filing'], ['svc-agent', 'Registered Agent and Business Address Setup'], ['svc-dba', 'DBA Filing'], ['svc-duns', 'D-U-N-S Number Setup'], ['svc-goodstanding', 'Certificate of Good Standing']] },
    { key: 's4', title: 'Supporting Filings: Tax', items: [['svc-1120none', 'Form 1120, No Activity'], ['svc-1120act', 'Form 1120 or 1120-S, With Activity'], ['svc-2553', 'Form 2553 (S corporation election)'], ['svc-1023', 'Form 1023-EZ (501(c)(3) tax-exempt status)'], ['svc-8822', 'Form 8822-B (change of address or responsible party)']] },
    { key: 's5', title: 'Certifications', items: [['svc-sba', 'SBA Certification (WOSB or EDWOSB)'], ['svc-wbencapp', 'WBENC Application Management'], ['svc-wbencfull', 'WBENC Full-Service Certification'], ['svc-wbencrecert', 'WBENC Annual Recertification']] },
    { key: 's6', title: 'Real Estate and Funding Readiness', items: [['svc-property', 'Property Transfer Coordination'], ['svc-funding', 'Funding Readiness Package']] },
    { key: 's7', title: 'Systems Architecture and Other Services', items: [['svc-platform', 'Platform Build'], ['svc-platformsupport', 'Platform Support Plan'], ['svc-mgmt', 'Monthly Management Services'], ['svc-notary', 'Mobile Notary']] }
  ];

  var STEPS = [
    { title: 'Contact', heading: 'Part A: Primary contact', hint: 'All clients complete this part.', fields: [
      { id: 'name', label: 'Full legal name', req: true },
      { id: 'title', label: 'Title or role in the business' },
      { id: 'email', label: 'Email address', type: 'email', req: true },
      { id: 'phone', label: 'Phone number', type: 'tel', req: true },
      { id: 'pref', label: 'Preferred contact method', type: 'radio', options: ['Call', 'Text', 'Email'] },
      { id: 'times', label: 'Best days and times to reach you' },
      { id: 'mail', label: 'Mailing address', type: 'textarea', req: true, full: true, help: 'Street, city, state, and ZIP.' },
      { id: 'referral', label: 'How did you hear about NSC?', full: true, help: 'Name the referral, if any.' }
    ] },
    { title: 'Business', heading: 'Part A: Business snapshot', fields: [
      { id: 'bizname', label: 'Legal business name (or proposed name)', req: true },
      { id: 'dba', label: 'DBA or trade name, if any' },
      { id: 'etype', label: 'Entity type', type: 'select', req: true, options: ['Corporation', 'LLC', 'Nonprofit', 'Sole proprietor', 'Not yet formed'] },
      { id: 'stateform', label: 'State of formation', req: true },
      { id: 'otherstates', label: 'Other states where the business operates or owns property', type: 'textarea', full: true },
      { id: 'dateformed', label: 'Date formed' },
      { id: 'hasein', label: 'Has an EIN?', type: 'radio', options: YN },
      { id: 'industry', label: 'Industry and what the business does, in one sentence', type: 'textarea', req: true, full: true },
      { id: 'web', label: 'Website or social media' },
      { id: 'owners', label: 'Number of owners' },
      { id: 'employees', label: 'Number of employees' },
      { id: 'years', label: 'Years in operation' },
      { id: 'ent', type: 'repeat', label: 'All entities you own or control', help: 'List every entity, including any that are inactive or dissolved.', item: 'Entity', max: 8, fields: [
        { id: 'name', label: 'Entity name' }, { id: 'type', label: 'Type' }, { id: 'state', label: 'State' },
        { id: 'status', label: 'Status', type: 'select', options: ['Active', 'Dissolved', 'Unsure'] },
        { id: 'own', label: 'Owners and percentages', full: true }
      ] }
    ] },
    { title: 'Goals', heading: 'Part A: Goals and timeline', fields: [
      { id: 'prompt', label: 'What prompted you to contact NSC now?', type: 'textarea', req: true, full: true },
      { id: 'outcomes', label: 'What are the top three outcomes you want from this engagement?', type: 'textarea', req: true, full: true },
      { id: 'firmdeadline', label: 'Is there a firm deadline?', full: true, help: 'Loan closing, bank account, certification, contract bid, or state notice.' },
      { id: 'deadlinedate', label: 'Deadline date and what happens if it is missed', type: 'textarea', full: true },
      { id: 'involved', label: 'Who else is involved?', type: 'textarea', full: true, help: 'Attorney, CPA, lender, or business partner.' }
    ] },
    { title: 'Services', heading: 'Part B: Services requested', hint: 'Check every service you want quoted. Fees are listed in the NSC Standard Fee Schedule above.', services: true, fields: [
      { id: 'rush5', label: 'Do you need any work delivered in under five business days?', type: 'radio', options: YN },
      { id: 'rush0', label: 'Do you need any work delivered the same business day?', type: 'radio', options: YN }
    ] },
    { title: 'Details', heading: 'Service details', hint: 'Only the modules for the services you checked appear here.', modules: [
      { key: 's1', heading: 'Module 1: Assessment, Strategy, and Business Plan', fields: [
        { sub: 'Assessment and structure' },
        { id: 'm1notworking', label: 'What is not working right now?', type: 'textarea', full: true, help: 'Records, compliance, banking, funding, or growth.' },
        { id: 'm1records', label: 'Where are your corporate records kept, and who maintains them?', type: 'textarea', full: true },
        { id: 'm1notices', label: 'Have you received any state, IRS, or bank notices in the last 12 months? Describe.', type: 'textarea', full: true },
        { id: 'm1parent', label: 'Do you plan to use a parent or holding company?', type: 'radio', options: YNU },
        { id: 'm1addent', label: 'Do you plan to add entities in the next 12 months? Describe.', type: 'textarea', full: true },
        { sub: 'Business plan', showIf: 'svc-bizplan' },
        { id: 'bpwhat', label: 'Describe what the business does in two to three sentences', type: 'textarea', full: true, showIf: 'svc-bizplan' },
        { id: 'bpproblem', label: 'What problem does it solve, and for whom?', type: 'textarea', full: true, showIf: 'svc-bizplan' },
        { id: 'bpstage', label: 'Current stage', type: 'select', options: ['Idea', 'Startup', 'Operating', 'Expanding'], showIf: 'svc-bizplan' },
        { id: 'bpfor', label: 'Who is the plan for?', type: 'select', options: ['Bank', 'SBA lender', 'Investor', 'Grant', 'Internal'], showIf: 'svc-bizplan' },
        { id: 'bpcustomers', label: 'Target customers and where they are located', type: 'textarea', full: true, showIf: 'svc-bizplan' },
        { id: 'bpcompetitors', label: 'Main competitors and how you are different', type: 'textarea', full: true, showIf: 'svc-bizplan' },
        { id: 'bpproducts', label: 'Products or services offered, with pricing', type: 'textarea', full: true, showIf: 'svc-bizplan' },
        { id: 'bpmarketing', label: 'Marketing and sales channels used or planned', type: 'textarea', full: true, showIf: 'svc-bizplan' },
        { id: 'bplocation', label: 'Location, equipment, and operating needs', type: 'textarea', full: true, showIf: 'svc-bizplan' },
        { id: 'bpteam', label: 'Owners, key staff, and their experience', type: 'textarea', full: true, showIf: 'svc-bizplan' },
        { id: 'bpfunding', label: 'Funding amount sought and how it will be used', type: 'textarea', full: true, showIf: 'svc-bizplan' },
        { id: 'bpcosts', label: 'Startup costs or current revenue and expenses', type: 'textarea', full: true, showIf: 'svc-bizplan' },
        { id: 'bprecords', label: 'Financial records available', type: 'checks', options: ['Bank statements', 'P&L', 'Tax returns', 'None yet'], full: true, showIf: 'svc-bizplan' },
        { id: 'bpgoals', label: 'Goals for years one, three, and five', type: 'textarea', full: true, showIf: 'svc-bizplan' }
      ] },
      { key: 's2', heading: 'Module 2: Corporate Record Repair', fields: [
        { sub: 'Entity details' },
        { id: 'm2new', label: 'New entity or existing entity?', type: 'radio', options: ['New', 'Existing'] },
        { id: 'm2names', label: 'Proposed name and two alternates (new entities)', type: 'textarea', full: true },
        { id: 'm2state', label: 'State of formation' },
        { id: 'm2type', label: 'Entity type', type: 'select', options: ['C corporation', 'S corporation', 'Close corporation', 'LLC', 'Nonprofit'] },
        { id: 'm2purpose', label: 'Business purpose', type: 'textarea', full: true },
        { id: 'm2address', label: 'Principal business address', type: 'textarea', full: true },
        { id: 'm2agent', label: 'Registered agent name, or should NSC set one up?' },
        { id: 'm2shares', label: 'Number of authorized shares, if known' },
        { id: 'm2fye', label: 'Fiscal year end', help: 'December 31 unless you choose otherwise.' },
        { id: 'm2scorp', label: 'Do you plan to elect S corporation status?', type: 'radio', options: YNU },
        { id: 'own', type: 'repeat', label: 'Owners and shares', item: 'Owner', max: 6, fields: [
          { id: 'name', label: 'Owner name' }, { id: 'pct', label: 'Ownership %' }, { id: 'shares', label: 'Shares' }, { id: 'role', label: 'Role' },
          { id: 'capital', label: 'Capital contributed (cash, property, services)', full: true }
        ] },
        { sub: 'Directors and officers' },
        { id: 'm2directors', label: 'Director(s)' },
        { id: 'm2ceo', label: 'President or CEO' },
        { id: 'm2sec', label: 'Secretary' },
        { id: 'm2cfo', label: 'Treasurer or CFO' },
        { id: 'm2other', label: 'Other officers', full: true },
        { sub: 'Banking and existing records' },
        { id: 'm2bank', label: 'Bank where the account will be opened or is held' },
        { id: 'm2signers', label: 'Authorized signers on the account' },
        { id: 'm2existing', label: 'Which records already exist?', type: 'checks', options: ['Bylaws', 'Consents', 'Minutes', 'Stock certificates', 'Stock ledger', 'None'], full: true },
        { id: 'm2ratify', label: 'Actions taken before records were adopted that need ratifying', type: 'textarea', full: true, help: 'Contracts signed, accounts opened, or property bought.' },
        { id: 'm2transfers', label: 'Share transfers planned, such as into a parent or holding company. Describe.', type: 'textarea', full: true },
        { id: 'm2agreements', label: 'Agreements needed between related companies (management, services, lease). Describe.', type: 'textarea', full: true },
        { id: 'm2resolutions', label: 'Resolutions needed (borrowing, banking, officer changes). Describe.', type: 'textarea', full: true }
      ] },
      { key: 's3', heading: 'Module 3: State Compliance and Registrations', fields: [
        { id: 'stand', type: 'repeat', label: 'Entity standing', item: 'Entity', max: 8, fields: [
          { id: 'name', label: 'Entity name' }, { id: 'state', label: 'State' }, { id: 'lastreport', label: 'Last annual report filed (year)' }, { id: 'agent', label: 'Registered agent' },
          { id: 'standing', label: 'Current standing', type: 'select', options: ['Active', 'Dissolved', 'Delinquent', 'Unsure'] }
        ] },
        { sub: 'Registrations' },
        { id: 'm3dissolved', label: 'Entities that were administratively dissolved, and the approximate date', type: 'textarea', full: true },
        { id: 'm3newstates', label: 'New states where you need to register to do business', type: 'textarea', full: true },
        { id: 'm3changes', label: 'Changes needed to name, shares, or purpose on file with the state', type: 'textarea', full: true },
        { id: 'm3securities', label: 'Shares issued recently that may need a state securities notice (state and date)', type: 'textarea', full: true },
        { id: 'm3license', label: 'Cities or counties where you need a business license or tax registration', type: 'textarea', full: true },
        { id: 'm3dba', label: 'DBA or trade names to register, and the county', type: 'textarea', full: true },
        { id: 'm3duns', label: 'Does the business already have a D-U-N-S number?', type: 'radio', options: YNU },
        { id: 'm3maintain', label: 'Do you want NSC to maintain your annual compliance each year?', type: 'radio', options: YNU },
        { id: 'm3goodstanding', label: 'Certificates of Good Standing needed: which state, how many, and who is requesting them', type: 'textarea', full: true }
      ] },
      { key: 's4', heading: 'Module 4: Tax Filings', fields: [
        { sub: 'Corporate returns' },
        { id: 'm4years', label: 'Tax year or years you need filed' },
        { id: 'm4activity', label: 'Did the business have any income or expenses in those years?', type: 'radio', options: YNU },
        { id: 'm4books', label: 'How are your books kept?', help: 'Software name, spreadsheet, accountant, or none.' },
        { id: 'm4reconciled', label: 'Are the books reconciled to your bank statements?', type: 'radio', options: YNU },
        { id: 'm4prior', label: 'Who filed prior returns, and for which years?', type: 'textarea', full: true },
        { id: 'm4unfiled', label: 'Unfiled years, if any' },
        { id: 'm4notices', label: 'IRS or state tax notices received. Describe.', type: 'textarea', full: true },
        { sub: 'Elections and changes' },
        { id: 'm4sdate', label: 'S corporation election: desired effective date' },
        { id: 'm4sbefore', label: 'Has an S corporation election been filed before? Result?', type: 'textarea', full: true },
        { id: 'm4npreceipts', label: 'Nonprofit: projected annual gross receipts for the next three years' },
        { id: 'm4npassets', label: 'Nonprofit: total value of assets' },
        { id: 'm4npstate', label: 'Nonprofit: is the organization incorporated in a state? Which one?' },
        { id: 'm4change', label: 'Change of business address or responsible party: what changed and when', type: 'textarea', full: true }
      ] },
      { key: 's5', heading: 'Module 5: Certifications', note: 'Your answers tell NSC whether your records are ready for Application Management or need the Full-Service record rebuild.', fields: [
        { id: 'm5cert', label: 'Certification sought', type: 'checks', options: ['SBA WOSB', 'SBA EDWOSB', 'WBENC', 'Recertification'], full: true },
        { id: 'm5pct', label: 'Percentage of the business owned by women' },
        { id: 'm5citizen', label: 'Are the qualifying women owners U.S. citizens or lawful permanent residents?', type: 'radio', options: YNU },
        { id: 'm5decisions', label: 'Who makes day-to-day and long-term decisions?', type: 'textarea', full: true },
        { id: 'm5signs', label: 'Who signs contracts, loans, and bank documents?', type: 'textarea', full: true },
        { id: 'm5revenue', label: 'Years in business and most recent annual revenue' },
        { id: 'm5records', label: 'Are your bylaws, consents, share records, and ownership history complete and current?', type: 'radio', options: YNU },
        { id: 'm5ownchange', label: 'Has ownership changed since the business was formed? Describe.', type: 'textarea', full: true },
        { id: 'm5sam', label: 'Is the business registered in SAM.gov?', type: 'radio', options: YNU },
        { id: 'm5held', label: 'Current certifications held, with expiration dates', type: 'textarea', full: true },
        { id: 'm5denied', label: 'Any prior certification application denied or withdrawn? Describe.', type: 'textarea', full: true },
        { id: 'm5targets', label: 'Target customers, agencies, or supplier programs', type: 'textarea', full: true },
        { id: 'm5site', label: 'Is the business site ready for a site visit?', help: 'Office, home office, or job site.' }
      ] },
      { key: 's6', heading: 'Module 6: Real Estate, Assets, and Funding Readiness', fields: [
        { id: 'prop', type: 'repeat', label: 'Property and assets to move into the structure', item: 'Property', max: 6, fields: [
          { id: 'address', label: 'Property address or asset', full: true }, { id: 'owner', label: 'Current titled owner' }, { id: 'receiving', label: 'Receiving entity' },
          { id: 'lien', label: 'Mortgage or lien?', type: 'select', options: ['Yes', 'No'] }, { id: 'county', label: 'County' }
        ] },
        { id: 'm6other', label: 'Other assets to move into an entity', type: 'textarea', full: true, help: 'Equipment, vehicles, intellectual property, or digital assets.' },
        { id: 'm6attorney', label: 'Do you have a real estate attorney? Name and contact', full: true },
        { sub: 'Funding' },
        { id: 'm6amount', label: 'Amount of funding sought' },
        { id: 'm6lendertype', label: 'Lender type', type: 'select', options: ['Bank', 'SBA lender', 'Equipment lender', 'Private', 'Investor'] },
        { id: 'm6purpose', label: 'Purpose of the funds', type: 'textarea', full: true },
        { id: 'm6lender', label: 'Lender name, if already selected' },
        { id: 'm6deadline', label: 'Funding deadline' },
        { id: 'm6debts', label: 'Current business debts (lender, balance, monthly payment)', type: 'textarea', full: true },
        { id: 'm6collateral', label: 'Equipment or assets that can serve as collateral', type: 'textarea', full: true },
        { id: 'm6credit', label: 'Does the business have established business credit?', type: 'radio', options: YNU },
        { id: 'm6guarantee', label: 'Are the owners willing to sign a personal guarantee?', type: 'radio', options: YNU }
      ] }
    ] },
    { title: 'Sign', heading: 'Document checklist and acknowledgment', fields: [
      { id: 'docsall', label: 'Documents you have and can send (all clients)', type: 'checks', full: true, options: ['Articles of Incorporation or Organization, with any amendments', 'IRS EIN confirmation letter (CP 575 or 147C)', 'Bylaws or operating agreement', 'Consents, resolutions, or minutes', 'Stock certificates, stock ledger, or capitalization table', 'Most recent annual report for each entity', 'Any state, IRS, or bank notices received'] },
      { id: 'docs4', label: 'Tax filings', type: 'checks', full: true, showIf: 's4', options: ['Prior federal and state returns, bank statements, and books for the years being filed'] },
      { id: 'docs1', label: 'Business plan', type: 'checks', full: true, showIf: 'svc-bizplan', options: ['Existing financials, pitch materials, or lender requirements'] },
      { id: 'docs5', label: 'Certifications', type: 'checks', full: true, showIf: 's5', options: ['Owner resumes, proof of citizenship or residency, and prior applications'] },
      { id: 'docs6', label: 'Real estate and funding', type: 'checks', full: true, showIf: 's6', options: ['Current deeds and recent property tax statements', 'Debt statements, equipment list, and lender application or term sheet'] },
      { note: 'Keep your documents until NSC sends your secure upload link. Do not email Social Security numbers or full account numbers.' },
      { ack: true },
      { id: 'sig', label: 'Signature (type your full name)', req: true },
      { id: 'printed', label: 'Printed name', req: true },
      { id: 'sigtitle', label: 'Title' },
      { id: 'sigcompany', label: 'Company' },
      { id: 'sigdate', label: 'Date', type: 'date', req: true }
    ] },
    { title: 'Review', review: true }
  ];

  var ACK = [
    'The information in this form is accurate and complete to the best of my knowledge.',
    'NSC will quote my engagement in writing before work begins, and new scope is quoted separately in writing.',
    'Payment is due with each invoice, and no work begins before payment. Each invoice carries the Administrative Fee.',
    'Government fees, attorney review, and other third-party costs are billed separately at cost, or at the attorney’s rate plus 10% for attorney review.',
    'Incomplete intake that requires follow-up close to a deadline may carry the Expedite Fee.',
    'Fees for delivered work are non-refundable, fees for work not yet started are credited toward future NSC services for 12 months, and a chargeback made in error or in bad faith after delivery or approval is a material breach.',
    'My information is used only to deliver NSC services and is kept confidential.',
    'I have read and agree to the NSC Terms of Use (norrilssignature.com/terms) and Privacy Policy (norrilssignature.com/privacy), version effective November 12, 2026.'
  ];

  var nav = document.getElementById('steps-nav');
  var body = document.getElementById('intake-body');
  var next = document.getElementById('intake-next');
  var back = document.getElementById('intake-back');
  var status = document.getElementById('intake-saved');
  var stepEls = [], tabEls = [], current = 0, last = STEPS.length - 1;
  var repeatCounts = {};

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function control(f, idBase, nameBase) {
    var id = 'in-' + idBase;
    var wrap, input;
    var label = f.label + (f.req ? '' : '');
    if (f.type === 'radio' || f.type === 'checks') {
      wrap = el('fieldset', 'field' + (f.full ? ' full' : ''));
      var lg = el('legend', null, f.label); if (f.req) { var r = el('span', 'req', ' required'); lg.appendChild(r); }
      wrap.appendChild(lg);
      var ch = el('div', 'choices');
      if (f.req) ch.setAttribute('data-required', '1');
      f.options.forEach(function (o, i) {
        var l = el('label');
        var inp = document.createElement('input');
        inp.type = f.type === 'radio' ? 'radio' : 'checkbox';
        inp.name = nameBase; inp.value = o; inp.id = id + '-' + i;
        l.appendChild(inp); l.appendChild(document.createTextNode(' ' + o));
        ch.appendChild(l);
      });
      wrap.appendChild(ch);
    } else {
      wrap = el('div', 'field' + (f.full || f.type === 'textarea' ? ' full' : ''));
      var lb = el('label', null, f.label); lb.htmlFor = id;
      if (f.req) lb.appendChild(el('span', 'req', ' required'));
      wrap.appendChild(lb);
      if (f.type === 'textarea') input = document.createElement('textarea');
      else if (f.type === 'select') {
        input = document.createElement('select');
        var o0 = document.createElement('option'); o0.value = ''; o0.textContent = 'Select one'; input.appendChild(o0);
        f.options.forEach(function (o) { var op = document.createElement('option'); op.textContent = o; input.appendChild(op); });
      } else { input = document.createElement('input'); input.type = f.type || 'text'; }
      input.id = id; input.name = nameBase; if (f.req) input.required = true;
      if (f.id === 'name' && !f.inRepeat) input.autocomplete = 'name';
      if (f.type === 'email') input.autocomplete = 'email';
      if (f.type === 'tel') input.autocomplete = 'tel';
      wrap.appendChild(input);
    }
    if (f.help) wrap.appendChild(el('span', 'help', f.help));
    if (f.showIf) wrap.setAttribute('data-show-if', f.showIf);
    return wrap;
  }

  function renderRepeat(f, container) {
    var box = el('div', 'field full repeat');
    box.setAttribute('data-repeat', f.id);
    var head = el('div', 'repeat-head');
    head.appendChild(el('span', 'repeat-title', f.label));
    box.appendChild(head);
    if (f.help) box.appendChild(el('span', 'help', f.help));
    var list = el('div', 'repeat-list'); box.appendChild(list);
    var add = el('button', 'mini-btn repeat-add', 'Add ' + f.item.toLowerCase());
    add.type = 'button'; add.id = 'in-' + f.id + '-add';
    box.appendChild(add);
    function addRow(silent) {
      var n = list.children.length + 1;
      if (n > f.max) return;
      var card = el('div', 'repeat-card');
      card.appendChild(el('span', 'repeat-num', f.item + ' ' + n));
      var grid = el('div', 'fields');
      f.fields.forEach(function (sf) {
        var c = control({ id: sf.id, label: sf.label, type: sf.type, options: sf.options, full: sf.full, inRepeat: true }, f.id + n + '-' + sf.id, f.item + ' ' + n + ', ' + sf.label);
        grid.appendChild(c);
      });
      card.appendChild(grid);
      list.appendChild(card);
      repeatCounts[f.id] = n;
      add.hidden = n >= f.max;
      if (!silent) save();
    }
    add.addEventListener('click', function () { addRow(false); });
    box._addRow = addRow;
    container.appendChild(box);
    addRow(true);
  }

  function renderFields(fields, container) {
    var grid = el('div', 'fields');
    fields.forEach(function (f) {
      if (f.sub) { var h = el('h4', 'sub-head', f.sub); if (f.showIf) h.setAttribute('data-show-if', f.showIf); grid.appendChild(h); return; }
      if (f.note) { grid.appendChild(el('p', 'field full form-note', f.note)); return; }
      if (f.ack) {
        var a = el('div', 'field full ack');
        a.appendChild(el('p', 'ack-lead', 'By signing below, I confirm that:'));
        var ol = el('ol', 'ack-list');
        ACK.forEach(function (t) { ol.appendChild(el('li', null, t)); });
        a.appendChild(ol);
        a.appendChild(el('p', 'ack-notice', 'Norrils Signature Consulting Inc. is not a law firm, a CPA firm, or a lender. NSC provides administrative document preparation, filing support, and business support only, and does not give legal advice. Legal services are provided only by a licensed attorney under a separate engagement.'));
        var ch = el('div', 'choices'); ch.setAttribute('data-required', '1');
        var l = el('label'); var inp = document.createElement('input'); inp.type = 'checkbox'; inp.id = 'in-ack'; inp.name = 'Acknowledgment'; inp.value = 'Agreed to all eight statements, including the Terms of Use and Privacy Policy effective November 12, 2026';
        l.appendChild(inp); l.appendChild(document.createTextNode(' I agree to the statements above.'));
        ch.appendChild(l); a.appendChild(ch);
        grid.appendChild(a); return;
      }
      if (f.type === 'repeat') { renderRepeat(f, grid); return; }
      grid.appendChild(control(f, f.id, f.label));
    });
    container.appendChild(grid);
  }

  STEPS.forEach(function (s, i) {
    var tab = el('button'); tab.type = 'button'; tab.setAttribute('role', 'listitem');
    tab.appendChild(el('span', 'num', pad(i + 1))); tab.appendChild(document.createTextNode(s.title));
    nav.appendChild(tab); tabEls.push(tab);
    var step = el('div', 'step'); step.hidden = i !== 0; step.setAttribute('data-title', s.title);
    if (!s.review) {
      step.appendChild(el('h3', null, s.heading));
      if (s.hint) step.appendChild(el('p', 'hint', s.hint));
    }
    if (s.services) {
      var sv = el('div', 'svc-groups');
      var notSure = el('div', 'choices svc-unsure');
      var nl = el('label'); var ni = document.createElement('input'); ni.type = 'checkbox'; ni.id = 'in-svc-unsure'; ni.name = 'Services requested'; ni.value = 'Not sure, recommend for me';
      nl.appendChild(ni); nl.appendChild(document.createTextNode(' Not sure, recommend for me')); notSure.appendChild(nl);
      sv.appendChild(notSure);
      SERVICES.forEach(function (g) {
        var fs = el('fieldset', 'svc-group'); fs.setAttribute('data-section', g.key);
        fs.appendChild(el('legend', null, g.title));
        var ch = el('div', 'choices');
        g.items.forEach(function (it) {
          var l = el('label'); var inp = document.createElement('input'); inp.type = 'checkbox'; inp.id = 'in-' + it[0]; inp.name = 'Services requested'; inp.value = it[1]; inp.setAttribute('data-section', g.key);
          l.appendChild(inp); l.appendChild(document.createTextNode(' ' + it[1])); ch.appendChild(l);
        });
        fs.appendChild(ch); sv.appendChild(fs);
      });
      step.appendChild(sv);
      step.appendChild(el('h4', 'sub-head', 'Service timing'));
    }
    if (s.fields) renderFields(s.fields, step);
    if (s.modules) {
      s.modules.forEach(function (m) {
        var mod = el('div', 'module'); mod.setAttribute('data-show-if', m.key);
        mod.appendChild(el('h3', 'module-head', m.heading));
        if (m.note) mod.appendChild(el('p', 'hint', m.note));
        renderFields(m.fields, mod);
        step.appendChild(mod);
      });
      step.appendChild(el('p', 'hint no-modules', 'No additional details are needed for the services you checked. Continue to the document checklist.'));
    }
    if (s.review) {
      step.appendChild(el('h3', null, 'Review and send'));
      step.appendChild(el('p', 'hint', 'Check your answers, then send them to NSC. You can edit any step from the tabs above.'));
      var rv = el('div', 'review');
      var pre = el('pre'); pre.id = 'intake-summary'; pre.tabIndex = 0; rv.appendChild(pre);
      var send = el('div', 'send');
      var a = el('a', 'btn', 'Email my intake to NSC'); a.id = 'intake-email'; a.href = 'mailto:services@norrilssignature.com';
      var c = el('button', 'btn btn-ghost', 'Copy my answers'); c.type = 'button'; c.id = 'intake-copy';
      send.appendChild(a); send.appendChild(c); rv.appendChild(send);
      rv.appendChild(el('p', 'send-note', 'Your email app opens with your answers filled in. If it does not open, copy your answers and email them to services@norrilssignature.com with the subject "Client Intake."'));
      step.appendChild(rv);
    }
    body.appendChild(step); stepEls.push(step);
  });

  function checkedKeys() {
    var keys = {};
    form.querySelectorAll('.svc-group input:checked').forEach(function (i) { keys[i.getAttribute('data-section')] = true; keys[i.id.replace('in-', '')] = true; });
    return keys;
  }
  function applyVisibility() {
    var keys = checkedKeys();
    var anyModule = false;
    form.querySelectorAll('[data-show-if]').forEach(function (n) {
      var on = !!keys[n.getAttribute('data-show-if')];
      n.hidden = !on;
      if (on && n.classList.contains('module')) anyModule = true;
    });
    var nm = form.querySelector('.no-modules'); if (nm) nm.hidden = anyModule;
  }
  function visible(node) {
    while (node && node !== form) {
      if (node.classList && node.classList.contains('step')) return true;
      if (node.hidden) return false;
      node = node.parentNode;
    }
    return true;
  }

  function save() {
    var data = { _repeat: repeatCounts };
    form.querySelectorAll('input, select, textarea').forEach(function (e) {
      if (!e.id) return;
      data[e.id] = (e.type === 'checkbox' || e.type === 'radio') ? e.checked : e.value;
    });
    try { window.localStorage.setItem(KEY, JSON.stringify(data)); } catch (err) {}
  }
  function load() {
    var raw = null;
    try { raw = window.localStorage.getItem(KEY); } catch (err) {}
    if (!raw) return;
    try {
      var data = JSON.parse(raw);
      var rc = data._repeat || {};
      Object.keys(rc).forEach(function (k) {
        var box = form.querySelector('[data-repeat="' + k + '"]');
        if (!box) return;
        var have = box.querySelector('.repeat-list').children.length;
        for (var n = have; n < rc[k]; n++) box._addRow(true);
      });
      Object.keys(data).forEach(function (id) {
        if (id === '_repeat') return;
        var e = document.getElementById(id); if (!e) return;
        if (e.type === 'checkbox' || e.type === 'radio') e.checked = !!data[id]; else e.value = data[id];
      });
    } catch (err) {}
  }

  function clearErrors(step) {
    step.querySelectorAll('.field.invalid').forEach(function (f) { f.classList.remove('invalid'); });
    step.querySelectorAll('.err').forEach(function (e) { e.remove(); });
  }
  function flag(field, msg) { field.classList.add('invalid'); field.appendChild(el('span', 'err', msg)); }
  function validate(i) {
    var step = stepEls[i]; clearErrors(step);
    var firstBad = null;
    step.querySelectorAll('input[required], select[required], textarea[required]').forEach(function (e) {
      if (!visible(e)) return;
      var f = e.closest('.field'); var v = e.value.trim();
      var bad = !v;
      if (!bad && e.type === 'email') bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (bad) { flag(f, e.type === 'email' && v ? 'Enter a valid email address.' : 'This field is required.'); if (!firstBad) firstBad = e; }
    });
    step.querySelectorAll('[data-required]').forEach(function (g) {
      if (!visible(g)) return;
      if (!g.querySelector('input:checked')) { var f = g.closest('.field'); flag(f, 'Please check this box to continue.'); if (!firstBad) firstBad = g.querySelector('input'); }
    });
    if (STEPS[i].services && !step.querySelector('.svc-groups input:checked')) {
      var sg = step.querySelector('.svc-groups'); sg.appendChild(el('span', 'err', 'Check at least one service, or check "Not sure, recommend for me."'));
      if (!firstBad) firstBad = sg.querySelector('input');
    }
    if (firstBad) { firstBad.focus(); return false; }
    return true;
  }

  function valueOf(node, name) {
    var inputs = node.querySelectorAll('[name="' + name.replace(/"/g, '\\"') + '"]');
    if (!inputs.length) return '';
    var first = inputs[0];
    if (first.type === 'radio' || first.type === 'checkbox') {
      return Array.prototype.slice.call(inputs).filter(function (x) { return x.checked; }).map(function (x) { return x.value; }).join(', ');
    }
    if (first.type === 'date' && /^\d{4}-\d{2}-\d{2}$/.test(first.value)) { var p = first.value.split('-'); return p[1] + '/' + p[2] + '/' + p[0]; }
    return first.value.trim();
  }
  function buildSummary() {
    var lines = ['NSC CLIENT INTAKE FORM', 'Submitted ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), ''];
    stepEls.slice(0, last).forEach(function (step, i) {
      var groups = [];
      var current = { title: STEPS[i].heading, rows: [] };
      groups.push(current);
      var seen = {};
      step.querySelectorAll('h3.module-head, input, select, textarea').forEach(function (n) {
        if (!visible(n)) return;
        if (n.tagName === 'H3') { current = { title: n.textContent, rows: [] }; groups.push(current); return; }
        var name = n.name; if (!name || seen[name]) return; seen[name] = true;
        var v = valueOf(step, name);
        if (v) current.rows.push(name + (/[?.]$/.test(name) ? ' ' : ': ') + v);
      });
      groups.forEach(function (g) {
        if (!g.rows.length) return;
        lines.push(g.title.toUpperCase()); lines.push(g.rows.join('\n')); lines.push('');
      });
    });
    return lines.join('\n').trim();
  }

  function show(i) {
    current = i;
    applyVisibility();
    stepEls.forEach(function (s, n) { s.hidden = n !== i; });
    tabEls.forEach(function (t, n) { if (n === i) t.setAttribute('aria-current', 'step'); else t.removeAttribute('aria-current'); });
    back.hidden = i === 0;
    next.hidden = i === last;
    next.textContent = i === last - 1 ? 'Review my answers' : 'Continue';
    status.textContent = 'Step ' + (i + 1) + ' of ' + STEPS.length + (i > 0 ? ' · Saved on this device' : '');
    if (i === last) {
      var text = buildSummary();
      var pre = document.getElementById('intake-summary'); pre.textContent = text;
      var bodyText = text.length > 1700 ? text.slice(0, 1700) + '\n\n[Answers continue. Paste the copied answers here.]' : text;
      var biz = (document.getElementById('in-bizname').value || 'New client').trim();
      document.getElementById('intake-email').href = 'mailto:services@norrilssignature.com?subject=' + encodeURIComponent('Client Intake: ' + biz) + '&body=' + encodeURIComponent(bodyText);
    }
  }
  function go(i) { show(i); if (form.scrollIntoView) form.scrollIntoView({ block: 'start' }); }

  next.addEventListener('click', function () {
    if (!validate(current)) return;
    tabEls[current].classList.add('done'); save(); go(current + 1);
  });
  back.addEventListener('click', function () { go(current - 1); });
  tabEls.forEach(function (t, n) {
    t.addEventListener('click', function () {
      for (var k = current; k < n; k++) { if (!validate(k)) { show(k); return; } tabEls[k].classList.add('done'); }
      save(); go(n);
    });
  });
  form.addEventListener('input', save);
  form.addEventListener('change', function () { applyVisibility(); save(); });
  form.addEventListener('submit', function (e) { e.preventDefault(); });

  var copyBtn = document.getElementById('intake-copy');
  function copyText() {
    var pre = document.getElementById('intake-summary');
    var reset = function (t) { copyBtn.textContent = t; setTimeout(function () { copyBtn.textContent = 'Copy my answers'; }, 2000); };
    var fallback = function () { var r = document.createRange(); r.selectNodeContents(pre); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); reset('Selected, press copy'); };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(pre.textContent).then(function () { reset('Copied'); }, fallback);
      else fallback();
    } catch (err) { fallback(); }
  }
  copyBtn.addEventListener('click', copyText);
  document.getElementById('intake-email').addEventListener('click', function () {
    if (document.getElementById('intake-summary').textContent.length > 1700) copyText();
  });

  load();
  show(0);
})();
