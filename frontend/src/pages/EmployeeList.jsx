import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { dashboardAPI } from "../utils/api.js";

const pipelineColors = ["#0BB47C", "#067E59", "#4DA7FF", "#0BB47C", "#067E59", "#4DA7FF"];

export default function EmployeeList() {
  const [overviewStats, setOverviewStats] = useState([]);
  const [monthlyMetrics, setMonthlyMetrics] = useState([]);
  const [funnelData, setFunnelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHiringData() {
      try {
        setLoading(true);
        const data = await dashboardAPI.getHiring();
        setOverviewStats(data.overviewStats || []);
        setMonthlyMetrics(data.monthlyMetrics || []);
        setFunnelData(data.funnelData || []);
      } catch (err) {
        console.error('Error fetching hiring data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHiringData();
  }, []);

  // Default data (can be moved to backend later)
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

  const highlightCards = [
    {
      title: "Top Sourcing Channel",
      value: "Employee referrals",
      description: "Accounts for 55% of qualified applications with the lowest churn.",
      color: "bg-[#0BB47C]",
    },
    {
      title: "Urgent Role",
      value: "ICU Nurse (Night Shift)",
      description: "3 offers outstanding, final interviews scheduled this week.",
      color: "bg-[#F4C542]",
    },
    {
      title: "Diversity Goal",
      value: "58% female hires",
      description: "On track to meet quarterly objective with current pipeline mix.",
      color: "bg-[#4DA7FF]",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="mx-auto w-full max-w-screen-2xl grow items-center justify-center px-4 py-10 sm:px-6 lg:px-10 xl:px-16 flex">
          <div className="text-center text-[#4A4A4A]">
            <div className="mb-4 text-2xl font-semibold">Loading hiring data...</div>
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0BB47C] border-r-transparent"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="mx-auto w-full max-w-screen-2xl grow items-center justify-center px-4 py-10 sm:px-6 lg:px-10 xl:px-16 flex">
          <div className="text-center text-[#4A4A4A]">
            <div className="mb-4 text-xl font-semibold text-[#D9534F]">Error loading data</div>
            <div className="text-sm text-[#4A4A4A]">{error}</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="mx-auto w-full max-w-screen-2xl grow px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex flex-col gap-8 card-neon sm:p-8 xl:p-12">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#4A4A4A]">
              Overview
            </p>
            <h1 className="mt-4 text-2xl font-semibold text-[#4A4A4A] sm:text-3xl">
              Monthly Hiring Dashboard with Recruitment Funnel
            </h1>
          </div>
          <p className="self-start rounded-full bg-[#0BB47C] px-4 py-2 text-sm font-semibold text-white">
            August 2021
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {overviewStats.length > 0 ? overviewStats.map((stat) => (
            <article
              key={stat.label}
              className={`group flex flex-col justify-between card-neon-gradient p-5 transition hover:-translate-y-1 hover:neon-glow-strong sm:p-6`}
            >
              <header className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4A4A4A]">{stat.label}</p>
                <span className="inline-flex items-center gap-1 rounded-full glass px-2.5 py-1 text-[0.65rem] font-medium text-[#4A4A4A] transition group-hover:bg-[#F7F8FA]">
                  {stat.change}
                </span>
              </header>
              <div className="mt-4">
                <p className="text-3xl font-semibold text-[#4A4A4A] sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-[#4A4A4A]">{stat.subtitle}</p>
              </div>
              <div className="mt-5">
                <div className="h-2 w-full rounded-full bg-white/10">
                  <div
                    className={`h-2 rounded-full ${stat.progressColor} neon-glow-purple`}
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
                <p className={`mt-2 text-xs font-semibold ${stat.changeTone}`}>{stat.progressLabel}</p>
              </div>
            </article>
          )) : (
            <div className="col-span-3 text-center text-[#4A4A4A] py-8">No hiring statistics available</div>
          )}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr]">
          <div className="card-neon">
            <h2 className="text-lg font-semibold text-[#4A4A4A]">Monthly Metrics</h2>
            <div className="mt-4 overflow-hidden rounded-xl glass-card">
              <table className="w-full text-left text-sm text-[#4A4A4A]">
                <thead className="glass text-xs font-semibold uppercase tracking-widest text-[#4A4A4A]">
                  <tr>
                    <th className="px-4 py-3">Month</th>
                    <th className="px-4 py-3 text-center">Hired</th>
                    <th className="px-4 py-3 text-center">Days to Hire</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyMetrics.length > 0 ? monthlyMetrics.map((row, index) => (
                    <tr
                      key={row.month}
                      className={index % 2 === 0 ? "bg-white/5" : "bg-white/10"}
                    >
                      <td className="px-4 py-3 font-medium text-[#4A4A4A]">{row.month}</td>
                      <td
                        className={`px-4 py-3 text-center text-base font-semibold ${
                          row.hired === "1" ? "text-[#0BB47C]" : "text-[#4A4A4A]"
                        }`}
                      >
                        {row.hired}
                      </td>
                      <td
                        className={`px-4 py-3 text-center text-base font-semibold ${
                          row.daysToHire === "6" ? "text-[#F4C542]" : "text-[#4A4A4A]"
                        }`}
                      >
                        {row.daysToHire}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center rounded-full glass px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#4A4A4A]">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="px-4 py-3 text-center text-[#4A4A4A]">No monthly metrics available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-neon">
            <h2 className="text-lg font-semibold text-[#4A4A4A]">Recruitment Funnel</h2>
            <div className="mt-4">
              {/* Custom Funnel Visualization */}
              <div className="relative w-full">
                {/* Funnel Stages */}
                <div className="space-y-0">
                  {/* Application - 100% */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-full bg-[#3E96F4] py-5 pl-6 pr-6 rounded-t-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-white text-xl font-bold">100%</span>
                        <span className="text-white text-base font-semibold">Application</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Phone Screen - 85% */}
                  <div className="relative flex items-center justify-center">
                    <div className="bg-[#0BB47C] py-5 pl-6 pr-6 flex items-center justify-between" style={{ width: '85%' }}>
                      <div className="flex items-center gap-4">
                        <span className="text-white text-xl font-bold">85%</span>
                        <span className="text-white text-base font-semibold">Phone Screen</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* MGR Interview - 75% */}
                  <div className="relative flex items-center justify-center">
                    <div className="bg-[#3E96F4] py-5 pl-6 pr-6 flex items-center justify-between" style={{ width: '75%' }}>
                      <div className="flex items-center gap-4">
                        <span className="text-white text-xl font-bold">75%</span>
                        <span className="text-white text-base font-semibold">MGR Interview</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Onsite Interview - 65% */}
                  <div className="relative flex items-center justify-center">
                    <div className="bg-[#0BB47C] py-5 pl-6 pr-6 flex items-center justify-between" style={{ width: '65%' }}>
                      <div className="flex items-center gap-4">
                        <span className="text-white text-xl font-bold">65%</span>
                        <span className="text-white text-base font-semibold">Onsite Interview</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Offer - 55% */}
                  <div className="relative flex items-center justify-center">
                    <div className="bg-[#3E96F4] py-5 pl-6 pr-6 flex items-center justify-between" style={{ width: '55%' }}>
                      <div className="flex items-center gap-4">
                        <span className="text-white text-xl font-bold">55%</span>
                        <span className="text-white text-base font-semibold">Offer</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hire - 45% */}
                  <div className="relative flex items-center justify-center">
                    <div className="bg-[#0BB47C] py-5 pl-6 pr-6 rounded-b-xl flex items-center justify-between" style={{ width: '45%' }}>
                      <div className="flex items-center gap-4">
                        <span className="text-white text-xl font-bold">45%</span>
                        <span className="text-white text-base font-semibold">Hire</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {funnelInsights.length > 0 ? funnelInsights.map((item) => (
                <li key={item.stage} className="rounded-2xl bg-[#F7F8FA] px-4 py-3 border border-[#E5E7EB]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4A4A4A]">{item.stage}</p>
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="font-semibold text-[#3E96F4]">{item.drop}</span>
                    <span className="text-[#4A4A4A]">{item.note}</span>
                  </div>
                </li>
              )) : (
                <li className="text-center text-[#4A4A4A] py-4">No funnel insights available</li>
              )}
            </ul>
          </div>

          <div className="card-neon">
            <h2 className="text-lg font-semibold text-[#4A4A4A]">Pipeline Efficiency of Hiring</h2>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-[#4A4A4A]">
              Days taken for each stage in recruitment process
            </p>
            <div className="mt-2 h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip formatter={(value) => `${value}%`} contentStyle={{ backgroundColor: "rgba(247, 248, 250, 0.95)", borderColor: "rgba(11, 180, 124, 0.3)", borderRadius: "12px", color: "#4A4A4A" }} />
                  <Pie
                    data={pipelineData.length > 0 ? pipelineData : []}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="55%"
                    outerRadius="90%"
                    stroke="none"
                  >
                    {pipelineData.length > 0 ? pipelineData.map((entry, index) => (
                      <Cell key={entry.name} fill={pipelineColors[index % pipelineColors.length]} />
                    )) : null}
                  </Pie>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-[#4A4A4A] text-2xl font-semibold"
                  >
                    100%
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-[#4A4A4A] sm:grid-cols-2">
              {pipelineData.length > 0 ? pipelineData.map((stage, index) => (
                <li
                  key={stage.name}
                  className="flex items-start gap-3 rounded-2xl glass-card px-3.5 py-3"
                >
                  <span
                    className="mt-1 h-3 w-3 rounded-full bg-neon-gradient"
                    style={{ backgroundColor: pipelineColors[index] }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#4A4A4A]">{stage.name}</p>
                    <p className="text-xs text-[#4A4A4A]">{stage.description}</p>
                  </div>
                </li>
              )) : (
                <li className="col-span-2 text-center text-[#4A4A4A] py-4">No pipeline data available</li>
              )}
            </ul>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {highlightCards.length > 0 ? highlightCards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col gap-3 card-neon"
            >
              <span className={`inline-flex w-max items-center rounded-full ${card.color} px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white`}>
                {card.title}
              </span>
              <p className="text-lg font-semibold text-[#4A4A4A]">{card.value}</p>
              <p className="text-sm text-[#4A4A4A]">{card.description}</p>
            </article>
          )) : (
            <div className="col-span-3 text-center text-[#4A4A4A] py-4">No highlight cards available</div>
          )}
        </section>

        <p className="text-center text-xs text-[#4A4A4A]">
          This graph/chart is linked to Excel, and changes automatically based on data. Just left click on it and select "Edit Data".
        </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
