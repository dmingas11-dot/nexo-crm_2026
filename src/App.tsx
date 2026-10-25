import { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, BriefcaseBusiness,
  CalendarClock, Check, ChevronDown, CircleHelp, ClipboardList,
  ContactRound, DollarSign, LayoutDashboard, Menu, Plus, Search,
  Settings, Target, TrendingUp, Users, X
} from "lucide-react";

type Page = "Visão geral" | "Contactos" | "Oportunidades" | "Tarefas" | "Relatórios" | "Definições";
type Contact = { id: number; name: string; company: string; email: string; phone: string; type: string; status: string };
type Deal = { id: number; title: string; company: string; amount: number; stage: string; probability: number; close: string };
type Task = { id: number; title: string; person: string; due: string; priority: string; done: boolean };

const initialContacts: Contact[] = [
  { id: 1, name: "Ana Manuel", company: "Kwanza Digital", email: "ana@kwanzadigital.ao", phone: "+244 923 000 111", type: "Cliente", status: "Activo" },
  { id: 2, name: "Paulo Domingos", company: "Angola Logística", email: "paulo@alogistica.ao", phone: "+244 923 000 222", type: "Lead", status: "Novo" },
  { id: 3, name: "Marta Joaquim", company: "Mundo Verde", email: "marta@mundoverde.ao", phone: "+244 923 000 333", type: "Parceiro", status: "Activo" },
  { id: 4, name: "João Pedro", company: "Nova Construções", email: "joao@novaconstr.ao", phone: "+244 923 000 444", type: "Lead", status: "Em seguimento" },
];

const initialDeals: Deal[] = [
  { id: 1, title: "Licença empresarial", company: "Kwanza Digital", amount: 2450000, stage: "Negociação", probability: 75, close: "2026-11-12" },
  { id: 2, title: "Pacote de gestão", company: "Angola Logística", amount: 1800000, stage: "Proposta", probability: 55, close: "2026-11-20" },
  { id: 3, title: "Implementação CRM", company: "Nova Construções", amount: 950000, stage: "Qualificação", probability: 30, close: "2026-12-03" },
  { id: 4, title: "Renovação anual", company: "Mundo Verde", amount: 620000, stage: "Ganho", probability: 100, close: "2026-10-10" },
];

const initialTasks: Task[] = [
  { id: 1, title: "Enviar proposta comercial", person: "Angola Logística", due: "Hoje, 14:00", priority: "Alta", done: false },
  { id: 2, title: "Confirmar reunião de demonstração", person: "Nova Construções", due: "Hoje, 16:30", priority: "Média", done: false },
  { id: 3, title: "Fazer seguimento da renovação", person: "Mundo Verde", due: "Amanhã, 10:00", priority: "Baixa", done: true },
];

const money = (n: number) => new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA", maximumFractionDigits: 0 }).format(n);
const navItems: { name: Page; icon: typeof LayoutDashboard }[] = [
  { name: "Visão geral", icon: LayoutDashboard }, { name: "Contactos", icon: ContactRound },
  { name: "Oportunidades", icon: Target }, { name: "Tarefas", icon: ClipboardList },
  { name: "Relatórios", icon: TrendingUp }, { name: "Definições", icon: Settings },
];

function App() {
  const [page, setPage] = useState<Page>("Visão geral");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState(initialContacts);
  const [deals] = useState(initialDeals);
  const [tasks, setTasks] = useState(initialTasks);
  const [showContactForm, setShowContactForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [toast, setToast] = useState("");
  const openTasks = tasks.filter(t => !t.done).length;
  const openDeals = deals.filter(d => !["Ganho", "Perdido"].includes(d.stage));
  const pipeline = openDeals.reduce((sum, d) => sum + d.amount, 0);
  const filteredContacts = useMemo(() => contacts.filter(c => [c.name, c.company, c.email].some(v => v.toLowerCase().includes(search.toLowerCase()))), [contacts, search]);

  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2800); };
  const addContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setContacts(prev => [{ id: Math.max(0, ...prev.map(c => c.id)) + 1, name: newName.trim(), company: newCompany.trim() || "—", email: newEmail.trim() || "—", phone: "—", type: "Lead", status: "Novo" }, ...prev]);
    setNewName(""); setNewCompany(""); setNewEmail(""); setShowContactForm(false); notify("Contacto adicionado à demonstração.");
  };
  const toggleTask = (id: number) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  return (
    <div className="app-shell">
      {sidebarOpen && <button className="mobile-scrim" aria-label="Fechar menu" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand"><div className="brand-mark"><Activity size={22} /></div><div><strong>nexo<span>.</span></strong><small>CRM DE VENDAS</small></div><button className="icon-button sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu"><X size={18} /></button></div>
        <div className="workspace-label">ESPAÇO DE TRABALHO</div>
        <button className="workspace-switch"><div className="workspace-avatar">N</div><span><strong>Nexo Angola</strong><small>Plano de demonstração</small></span><ChevronDown size={15} /></button>
        <div className="nav-caption">MENU PRINCIPAL</div>
        <nav>{navItems.map(item => { const Icon = item.icon; return <button key={item.name} className={`nav-link ${page === item.name ? "active" : ""}`} onClick={() => { setPage(item.name); setSidebarOpen(false); }}><Icon size={18} /><span>{item.name}</span>{item.name === "Tarefas" && <em>{openTasks}</em>}</button>; })}</nav>
        <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={18} /></div><strong>Precisa de ajuda?</strong><p>Veja como tirar o máximo partido do Nexo.</p><button onClick={() => notify("Centro de ajuda estará disponível numa próxima versão.")}>Abrir centro de ajuda <span>↗</span></button></div><div className="profile"><div className="profile-avatar">DC</div><div className="profile-info"><strong>Domingas Celestino</strong><small>Administradora</small></div><button className="icon-button" aria-label="Opções do perfil" onClick={() => setPage("Definições")}><Settings size={17} /></button></div></div>
      </aside>

      <main className="main-area">
        <header className="topbar"><div className="topbar-left"><button className="icon-button mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu"><Menu size={20} /></button><div className="breadcrumbs">Nexo CRM <span>/</span> <strong>{page}</strong></div></div><div className="topbar-actions"><label className="global-search"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar..." /><kbd>⌘ K</kbd></label><button className="icon-button notification-button" aria-label="Notificações" onClick={() => notify("Não tem notificações novas.")}><Bell size={19} /><i /></button><div className="top-avatar">DC</div></div></header>
        <div className="page-content">
          <div className="welcome-row"><div><div className="eyebrow"><span className="live-dot" /> QUARTA-FEIRA, 25 DE OUTUBRO DE 2026</div><h1>{page === "Visão geral" ? "Bom dia, Domingas 👋" : page}</h1><p className="page-subtitle">{page === "Visão geral" ? "Aqui está o resumo do que está a acontecer no teu negócio." : page === "Contactos" ? "Gere os teus relacionamentos e acompanha cada contacto." : page === "Oportunidades" ? "Acompanha o pipeline e transforma propostas em negócios." : page === "Tarefas" ? "Organiza o trabalho e mantém os seguimentos em dia." : page === "Relatórios" ? "Analisa o desempenho comercial da tua equipa." : "Personaliza a tua experiência Nexo CRM."}</p></div><button className="primary-button" onClick={() => page === "Contactos" ? setShowContactForm(true) : notify("Esta acção será ligada à base de dados na próxima etapa.")}><Plus size={17} /> {page === "Contactos" ? "Novo contacto" : page === "Oportunidades" ? "Nova oportunidade" : page === "Tarefas" ? "Nova tarefa" : "Criar novo"}</button></div>
          {page === "Visão geral" && <Dashboard contacts={contacts.length} openTasks={openTasks} openDeals={openDeals.length} pipeline={pipeline} tasks={tasks} toggleTask={toggleTask} setPage={setPage} />}
          {page === "Contactos" && <Contacts contacts={filteredContacts} onAdd={() => setShowContactForm(true)} />}
          {page === "Oportunidades" && <Deals deals={deals} />}
          {page === "Tarefas" && <TaskList tasks={tasks} toggleTask={toggleTask} />}
          {page === "Relatórios" && <Reports deals={deals} tasks={tasks} />}
          {page === "Definições" && <SettingsPage />}
          <footer className="page-footer"><span>© 2026 Nexo CRM</span><span><span className="footer-dot" /> Modo de demonstração · Os dados ainda não estão guardados numa base de dados</span></footer>
        </div>
      </main>
      {showContactForm && <div className="modal-backdrop" onClick={() => setShowContactForm(false)}><form className="modal" onSubmit={addContact} onClick={e => e.stopPropagation()}><div className="modal-head"><div><h2>Novo contacto</h2><p>Adiciona um lead ou cliente ao teu CRM.</p></div><button type="button" className="icon-button" onClick={() => setShowContactForm(false)} aria-label="Fechar"><X size={18} /></button></div><label>Nome completo *<input required autoFocus value={newName} onChange={e => setNewName(e.target.value)} placeholder="Ex.: Ana Manuel" /></label><label>Empresa<input value={newCompany} onChange={e => setNewCompany(e.target.value)} placeholder="Nome da empresa" /></label><label>Email<input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="nome@empresa.ao" /></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowContactForm(false)}>Cancelar</button><button className="primary-button" type="submit"><Plus size={16} /> Adicionar contacto</button></div></form></div>}
      {toast && <div className="toast"><Check size={17} />{toast}</div>}
    </div>
  );
}

function Dashboard({ contacts, openTasks, openDeals, pipeline, tasks, toggleTask, setPage }: { contacts:number; openTasks:number; openDeals:number; pipeline:number; tasks:Task[]; toggleTask:(id:number)=>void; setPage:(page:Page)=>void }) {
  return <><section className="stats-grid"><Stat label="Contactos totais" value={String(contacts).padStart(2,"0")} delta="+12,5%" note="vs. mês anterior" icon={Users} tone="violet" up /><Stat label="Oportunidades abertas" value={String(openDeals).padStart(2,"0")} delta="+8,2%" note="vs. mês anterior" icon={Target} tone="blue" up /><Stat label="Valor do pipeline" value={money(pipeline)} delta="+18,4%" note="vs. mês anterior" icon={DollarSign} tone="green" up /><Stat label="Tarefas pendentes" value={String(openTasks).padStart(2,"0")} delta="2 para hoje" note="mantém o ritmo" icon={CalendarClock} tone="orange" /></section>
    <section className="dashboard-grid"><div className="panel pipeline-panel"><div className="panel-heading"><div><h2>Pipeline de vendas</h2><p>Distribuição das oportunidades por etapa</p></div><button className="text-button" onClick={() => setPage("Oportunidades")}>Ver oportunidades <span>→</span></button></div><div className="pipeline-total"><strong>{money(pipeline)}</strong><span><ArrowUpRight size={15}/> 18,4%</span></div><div className="pipeline-bars">{[{label:"Qualificação",value:950000,color:"bar-purple"},{label:"Proposta",value:1800000,color:"bar-blue"},{label:"Negociação",value:2450000,color:"bar-green"}].map(stage => <div className="pipeline-row" key={stage.label}><div className="pipeline-label"><span>{stage.label}</span><strong>{money(stage.value)}</strong></div><div className="bar-track"><div className={stage.color} style={{width:`${stage.value / 2450000 * 100}%`}} /></div></div>)}</div><div className="panel-foot"><span><i className="legend-dot purple" /> Qualificação</span><span><i className="legend-dot blue" /> Proposta</span><span><i className="legend-dot green" /> Negociação</span></div></div>
      <div className="panel activity-panel"><div className="panel-heading"><div><h2>Actividade recente</h2><p>Últimas actualizações da equipa</p></div><button className="more-button" onClick={() => setPage("Relatórios")}>•••</button></div><div className="activity-list"><ActivityItem icon={ContactRound} tone="violet" title="Novo contacto adicionado" detail="Ana Manuel · Kwanza Digital" time="Há 24 min" /><ActivityItem icon={BriefcaseBusiness} tone="green" title="Oportunidade actualizada" detail="Licença empresarial" time="Há 1 h" /><ActivityItem icon={Check} tone="blue" title="Tarefa concluída" detail="Preparar resumo da reunião" time="Há 3 h" /><ActivityItem icon={ArrowDownRight} tone="orange" title="Nova proposta enviada" detail="Angola Logística" time="Ontem" /></div></div></section>
    <section className="panel tasks-panel"><div className="panel-heading"><div><h2>As tuas tarefas</h2><p>O que precisa da tua atenção</p></div><button className="text-button" onClick={() => setPage("Tarefas")}>Ver todas <span>→</span></button></div><div className="task-table"><div className="task-table-head"><span>TAREFA</span><span>CONTACTO / EMPRESA</span><span>PRAZO</span><span>PRIORIDADE</span><span>ESTADO</span></div>{tasks.map(task => <div className={`task-table-row ${task.done ? "task-done" : ""}`} key={task.id}><button className={`task-check ${task.done ? "checked" : ""}`} onClick={() => toggleTask(task.id)} aria-label={task.done ? "Marcar pendente" : "Concluir tarefa"}>{task.done && <Check size={13}/>}</button><strong>{task.title}</strong><span className="task-company">{task.person}</span><span className="task-due">{task.due}</span><span><i className={`priority-dot priority-${task.priority.toLowerCase()}`}/>{task.priority}</span><span className={`status-pill ${task.done ? "status-done" : "status-progress"}`}>{task.done ? "Concluída" : "Pendente"}</span></div>)}</div></section></>;
}

function Stat({label,value,delta,note,icon:Icon,tone,up}:{label:string;value:string;delta:string;note:string;icon:typeof Users;tone:string;up?:boolean}) { return <div className="stat-card"><div className="stat-top"><span>{label}</span><div className={`stat-icon ${tone}`}><Icon size={18}/></div></div><div className="stat-value">{value}</div><div className="stat-bottom"><span className={up ? "delta-positive" : "delta-neutral"}>{up && <ArrowUpRight size={14}/>} {delta}</span><span>{note}</span></div></div>; }
function ActivityItem({icon:Icon,tone,title,detail,time}:{icon:typeof Users;tone:string;title:string;detail:string;time:string}) { return <div className="activity-item"><div className={`activity-icon ${tone}`}><Icon size={16}/></div><div className="activity-copy"><strong>{title}</strong><span>{detail}</span></div><time>{time}</time></div>; }

function Contacts({contacts,onAdd}:{contacts:Contact[];onAdd:()=>void}) { return <div className="panel data-panel"><div className="panel-heading"><div><h2>Todos os contactos</h2><p>{contacts.length} registos encontrados · Dados de demonstração</p></div><button className="primary-button compact" onClick={onAdd}><Plus size={16}/> Novo contacto</button></div><div className="table-wrap"><table><thead><tr><th>CONTACTO</th><th>EMPRESA</th><th>TIPO</th><th>EMAIL</th><th>ESTADO</th><th></th></tr></thead><tbody>{contacts.map(c=><tr key={c.id}><td><div className="contact-cell"><div className="contact-avatar">{c.name.split(" ").map(p=>p[0]).slice(0,2).join("")}</div><strong>{c.name}</strong></div></td><td>{c.company}</td><td><span className={`type-pill type-${c.type.toLowerCase()}`}>{c.type}</span></td><td>{c.email}</td><td><span className="status-pill status-progress">{c.status}</span></td><td><button className="more-button" aria-label="Mais opções">•••</button></td></tr>)}</tbody></table>{contacts.length===0&&<div className="empty-state">Não foram encontrados contactos.</div>}</div></div>; }
function Deals({deals}:{deals:Deal[]}) { const stages=["Qualificação","Proposta","Negociação","Ganho"]; return <div className="deals-grid">{stages.map(stage=><div className="deal-column" key={stage}><div className="deal-column-head"><span>{stage}</span><b>{deals.filter(d=>d.stage===stage).length}</b></div>{deals.filter(d=>d.stage===stage).map(d=><div className="deal-card" key={d.id}><span className="deal-tag">{stage}</span><h3>{d.title}</h3><p>{d.company}</p><strong>{money(d.amount)}</strong><div className="deal-progress"><span style={{width:`${d.probability}%`}}/></div><small>{d.probability}% probabilidade · Fecho {new Date(d.close+"T12:00:00").toLocaleDateString("pt-AO")}</small></div>)}<button className="add-deal" onClick={()=>window.alert("A criação de oportunidades será ligada à base de dados na próxima etapa.")}><Plus size={15}/> Adicionar oportunidade</button></div>)}</div>; }
function TaskList({tasks,toggleTask}:{tasks:Task[];toggleTask:(id:number)=>void}) { return <div className="panel data-panel"><div className="panel-heading"><div><h2>Lista de tarefas</h2><p>Assinala as tarefas à medida que as concluis.</p></div></div><div className="full-task-list">{tasks.map(t=><div className="full-task-row" key={t.id}><button className={`task-check ${t.done?"checked":""}`} onClick={()=>toggleTask(t.id)} aria-label="Alterar estado">{t.done&&<Check size={13}/>}</button><div className="full-task-copy"><strong className={t.done?"completed-text":""}>{t.title}</strong><span>{t.person} · {t.due}</span></div><span className={`priority-pill priority-pill-${t.priority.toLowerCase()}`}>{t.priority}</span><span className={`status-pill ${t.done?"status-done":"status-progress"}`}>{t.done?"Concluída":"Pendente"}</span></div>)}</div></div>; }
function Reports({deals,tasks}:{deals:Deal[];tasks:Task[]}) { const won=deals.filter(d=>d.stage==="Ganho"); const total=deals.reduce((s,d)=>s+d.amount,0); return <div className="reports-grid"><div className="stat-card"><div className="stat-top"><span>Valor total de oportunidades</span><div className="stat-icon blue"><DollarSign size={18}/></div></div><div className="stat-value">{money(total)}</div><div className="stat-bottom"><span>Dados de demonstração</span></div></div><div className="stat-card"><div className="stat-top"><span>Negócios ganhos</span><div className="stat-icon green"><Target size={18}/></div></div><div className="stat-value">{won.length}</div><div className="stat-bottom"><span>{money(won.reduce((s,d)=>s+d.amount,0))} fechados</span></div></div><div className="stat-card"><div className="stat-top"><span>Tarefas concluídas</span><div className="stat-icon violet"><ClipboardList size={18}/></div></div><div className="stat-value">{tasks.filter(t=>t.done).length}/{tasks.length}</div><div className="stat-bottom"><span>{Math.round(tasks.filter(t=>t.done).length/Math.max(1,tasks.length)*100)}% de conclusão</span></div></div></div>; }
function SettingsPage() { return <div className="panel settings-panel"><div className="panel-heading"><div><h2>Preferências do espaço</h2><p>Configuração inicial do Nexo CRM</p></div></div><div className="setting-row"><div><strong>Idioma</strong><span>Idioma principal da aplicação</span></div><span className="setting-value">Português (Angola)</span></div><div className="setting-row"><div><strong>Moeda</strong><span>Moeda usada nos valores comerciais</span></div><span className="setting-value">AOA · Kwanza</span></div><div className="setting-row"><div><strong>Base de dados</strong><span>O armazenamento persistente ainda não está ligado.</span></div><span className="status-pill status-progress">Pendente</span></div><div className="setting-row"><div><strong>Autenticação</strong><span>Login e permissões por perfil serão configurados com o backend.</span></div><span className="status-pill status-progress">Pendente</span></div></div>; }

export default App;