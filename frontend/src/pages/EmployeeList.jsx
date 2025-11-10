import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Cell, Funnel, FunnelChart, LabelList, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const overviewStats = [
  {
    label: "Hired",
    value: "2",
    subtitle: "Offers accepted this month",
    change: "+1 vs July",
    changeTone: "text-emerald-600",
    gradient: "from-sky-50 via-cyan-50 to-white",
    progress: 45,
    progressColor: "bg-sky-500",
    progressLabel: "45% of quarterly target",
  },
  {
    label: "Apps Per Hire",
    value: "2.1",
    subtitle: "Quality of applicant pipeline",
    change: "-0.4 vs benchmark",
    changeTone: "text-amber-600",
    gradient: "from-amber-50 via-amber-100 to-white",
    progress: 65,
    progressColor: "bg-amber-500",
    progressLabel: "Pipeline health 65%",
  },
  {
    label: "Days to Hire",
    value: "5",
    subtitle: "Average time from application",
    change: "-2 days vs last month",
    changeTone: "text-emerald-600",
    gradient: "from-emerald-50 via-teal-50 to-white",
    progress: 72,
    progressColor: "bg-emerald-500",
    progressLabel: "Service-level 72%",
  },
  {
    label: "Cost Per Hire",
    value: "₹1400",
    subtitle: "Recruiting spend per hire",
    change: "+₹120 vs budget",
    changeTone: "text-rose-600",
    gradient: "from-rose-50 via-rose-100 to-white",
    progress: 58,
    progressColor: "bg-rose-500",
    progressLabel: "Budget used 58%",
  },
  {
    label: "Open Positions",
    value: "5",
    subtitle: "Roles awaiting final interviews",
    change: "2 critical",
    changeTone: "text-sky-600",
    gradient: "from-indigo-50 via-sky-50 to-white",
    progress: 33,
    progressColor: "bg-indigo-500",
    progressLabel: "Critical roles 33%",
  },
  {
    label: "Days in Market",
    value: "6",
    subtitle: "Average posting visibility",
    change: "+1 day vs goal",
    changeTone: "text-amber-600",
    gradient: "from-purple-50 via-fuchsia-50 to-white",
    progress: 52,
    progressColor: "bg-fuchsia-500",
    progressLabel: "Exposure 52%",
  },
];

const monthlyMetrics = [
  { month: "May 2021", hired: "0", daysToHire: "-", status: "Planning", statusTone: "bg-slate-200 text-slate-600" },
  { month: "June 2021", hired: "0", daysToHire: "-", status: "Sourcing", statusTone: "bg-sky-100 text-sky-700" },
  { month: "July 2021", hired: "1", daysToHire: "6", status: "Filled", statusTone: "bg-emerald-100 text-emerald-700" },
  { month: "August 2021", hired: "x", daysToHire: "x", status: "In progress", statusTone: "bg-amber-100 text-amber-700" },
];

const funnelData = [
  { name: "Application", value: 100 },
  { name: "Phone Screen", value: 85 },
  { name: "MGR Interview", value: 75 },
  { name: "Onsite Interview", value: 65 },
  { name: "Offer", value: 55 },
  { name: "Hire", value: 45 },
];

const funnelColors = ["#5B79F3", "#5B79F3", "#4C68D5", "#3E57B8", "#314699", "#263879"];

const funnelInsights = [
  { stage: "Application → Phone Screen", drop: "15% drop", note: "Automated acknowledgement reduced wait time" },
  { stage: "Phone Screen → MGR Interview", drop: "10% drop", note: "Hiring manager capacity improving week-on-week" },
  { stage: "Onsite → Offer", drop: "10% drop", note: "Offer alignment workshop scheduled for next sprint" },
];

const pipelineData = [
  { name: "Application", value: 17, description: "Resume review within 24 hrs" },
  { name: "Phone Screen", value: 17, description: "Initial HR screening" },
  { name: "MGR Interview", value: 17, description: "Panel of hiring leads" },
  { name: "Onsite Interview", value: 17, description: "Clinical simulation" },
  { name: "Offer", value: 17, description: "Compensation negotiation" },
  { name: "Hire", value: 17, description: "Background & onboarding" },
];

const pipelineColors = ["#00B9F3", "#2CC4E8", "#41CBE2", "#5DD4DC", "#74DBD7", "#8BE1D1"];

const highlightCards = [
  {
    title: "Top Sourcing Channel",
    value: "Employee referrals",
    description: "Accounts for 55% of qualified applications with the lowest churn.",
    color: "bg-emerald-500",
  },
  {
    title: "Urgent Role",
    value: "ICU Nurse (Night Shift)",
    description: "3 offers outstanding, final interviews scheduled this week.",
    color: "bg-rose-500",
  },
  {
    title: "Diversity Goal",
    value: "58% female hires",
    description: "On track to meet quarterly objective with current pipeline mix.",
    color: "bg-sky-500",
  },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-screen-2xl grow px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex flex-col gap-8 rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/40 sm:p-8 xl:p-12">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Overview
            </p>
            <h1 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Monthly Hiring Dashboard with Recruitment Funnel
            </h1>
          </div>
          <p className="self-start rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            August 2021
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {overviewStats.map((stat) => (
            <article
              key={stat.label}
              className={`group flex flex-col justify-between rounded-3xl border border-white/60 bg-gradient-to-br ${stat.gradient} p-5 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl sm:p-6`}
            >
              <header className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{stat.label}</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-[0.65rem] font-medium text-slate-500 transition group-hover:bg-white">
                  {stat.change}
                </span>
              </header>
              <div className="mt-4">
                <p className="text-3xl font-semibold text-slate-900 sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-600">{stat.subtitle}</p>
              </div>
              <div className="mt-5">
                <div className="h-2 w-full rounded-full bg-white/60">
                  <div
                    className={`h-2 rounded-full ${stat.progressColor}`}
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
                <p className={`mt-2 text-xs font-semibold ${stat.changeTone}`}>{stat.progressLabel}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr]">
          <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Monthly Metrics</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Month</th>
                    <th className="px-4 py-3 text-center">Hired</th>
                    <th className="px-4 py-3 text-center">Days to Hire</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyMetrics.map((row, index) => (
                    <tr
                      key={row.month}
                      className={index % 2 === 0 ? "bg-white" : "bg-slate-50/70"}
                    >
                      <td className="px-4 py-3 font-medium text-slate-700">{row.month}</td>
                      <td
                        className={`px-4 py-3 text-center text-base font-semibold ${
                          row.hired === "1" ? "text-emerald-600" : "text-slate-600"
                        }`}
                      >
                        {row.hired}
                      </td>
                      <td
                        className={`px-4 py-3 text-center text-base font-semibold ${
                          row.daysToHire === "6" ? "text-rose-600" : "text-slate-600"
                        }`}
                      >
                        {row.daysToHire}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${row.statusTone}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Recruitment Funnel</h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Funnel
                    dataKey="value"
                    data={funnelData}
                    isAnimationActive={false}
                    fill="#5B79F3"
                    stroke="none"
                  >
                    {funnelData.map((entry, index) => (
                      <Cell key={entry.name} fill={funnelColors[index]} />
                    ))}
                    <LabelList
                      position="right"
                      fill="#1f2937"
                      stroke="none"
                      dataKey="name"
                      formatter={(value, entry) => (entry?.name ? entry.name : value ?? "")}
                    />
                    <LabelList
                      position="inside"
                      fill="#ffffff"
                      stroke="none"
                      dataKey="value"
                      formatter={(value) => (value !== undefined ? `${value}%` : "")}
                    />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-4 space-y-3">
              {funnelInsights.map((item) => (
                <li key={item.stage} className="rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.stage}</p>
                  <div className="mt-1 flex items-center justify-between text-sm text-slate-700">
                    <span className="font-semibold text-indigo-600">{item.drop}</span>
                    <span>{item.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Pipeline Efficiency of Hiring</h2>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
              Days taken for each stage in recruitment process
            </p>
            <div className="mt-2 h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Pie
                    data={pipelineData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="55%"
                    outerRadius="90%"
                    stroke="none"
                  >
                    {pipelineData.map((entry, index) => (
                      <Cell key={entry.name} fill={pipelineColors[index]} />
                    ))}
                  </Pie>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-900 text-2xl font-semibold"
                  >
                    100%
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2">
              {pipelineData.map((stage, index) => (
                <li
                  key={stage.name}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 px-3.5 py-3"
                >
                  <span
                    className="mt-1 h-3 w-3 rounded-full"
                    style={{ backgroundColor: pipelineColors[index] }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{stage.name}</p>
                    <p className="text-xs text-slate-500">{stage.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {highlightCards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50"
            >
              <span className={`inline-flex w-max items-center rounded-full ${card.color} px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white`}>
                {card.title}
              </span>
              <p className="text-lg font-semibold text-slate-900">{card.value}</p>
              <p className="text-sm text-slate-600">{card.description}</p>
            </article>
          ))}
        </section>

        <p className="text-center text-xs text-slate-400">
          This graph/chart is linked to Excel, and changes automatically based on data. Just left click on it and select “Edit Data”.
        </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
