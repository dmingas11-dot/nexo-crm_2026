# Nexo CRM

CRM web app for managing leads, customers, sales opportunities, tasks, and team activity. Built with Lovable and synchronized with this GitHub repository.

## Product scope

- Dashboard with sales KPIs, pipeline totals, upcoming tasks, and recent activity.
- Contacts: create, search, filter, view, edit, and archive leads and customers.
- Sales pipeline: configurable stages, opportunity value, expected close date, owner, and notes.
- Tasks and follow-ups: due dates, priority, status, and assignment.
- Team access with authenticated sessions and role-based permissions.
- Responsive Portuguese-first interface (pt-AO), currency configurable with AOA as the default.
- Secure persistent database, validation, empty/loading/error states, and audit-friendly timestamps.

## Suggested stack in Lovable

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Supabase for PostgreSQL, authentication, and row-level security
- Zod or equivalent schema validation

## Getting started with Lovable

1. Open Lovable and create a project named **Nexo CRM**.
2. Connect the GitHub account that owns `dmingas11-dot/nexo-crm_2026`.
3. Import this repository or connect it from the project's GitHub settings. If Lovable requires a non-empty repository, this README initializes the project documentation; let Lovable generate the application scaffold in the connected repository.
4. In Lovable, use the project brief below as the initial build prompt.
5. Connect Supabase from Lovable and configure the database schema, authentication, and row-level security before using real customer data.
6. Verify that commits synchronize between Lovable and GitHub, then preview and test the app before publishing.

## Initial build prompt

Build **Nexo CRM**, a polished, production-minded CRM for small and medium businesses in Angola. The interface language is Portuguese (Angola), default currency AOA, dates in a clear local format, and the design must be responsive on desktop, tablet, and mobile.

Create a professional app shell with a left navigation sidebar and pages for Dashboard, Contactos, Oportunidades, Tarefas, Relatórios, and Definições. Use a modern, restrained business design, accessible contrast, clear typography, useful tables, search, filters, pagination, and well-designed create/edit forms.

Dashboard: show total contacts, open opportunities, weighted pipeline value, won deals, tasks due today, and recent activity. Use realistic demo data only until Supabase is connected.

Contacts: support create/read/update/archive, contact type (lead/customer/partner), name, company, email, phone, source, owner, status, notes, and created/updated timestamps. Include search and filters.

Opportunities: support title, linked contact/company, value in AOA, stage (Novo, Qualificação, Proposta, Negociação, Ganho, Perdido), probability, expected close date, owner, and notes. Provide a pipeline board and a table view. Calculate pipeline totals from persisted records.

Tasks: support title, linked contact/opportunity, assignee, due date, priority, status, and description. Highlight overdue tasks and tasks due today.

Reports: provide sales pipeline by stage, won/lost outcomes, and task completion summaries, based on real database data.

Authentication and security: use Supabase Auth. Add login, logout, protected routes, and roles for administrator, manager, and salesperson. Create SQL migrations for profiles, contacts, opportunities, tasks, and activity log. Enable Row Level Security on every user-data table; do not expose service-role keys in frontend code. Define policies so users only access records permitted by their role/team. Never use localStorage as the production database.

Engineering requirements: TypeScript throughout, reusable components, clear loading/empty/error states, form validation, accessible labels, toast feedback, responsive layout, and no dead buttons. Seed demo data only in a clearly marked development/demo path. Keep secrets in environment variables and document required setup. Implement the app in working increments and fix build/type errors before declaring completion.

Start with the complete navigable UI and data model, then connect every CRUD flow to Supabase. Do not claim authentication, persistence, or security is complete until it has been implemented and tested.
