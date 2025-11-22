import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { dashboardAPI } from "../utils/api.js";

const retentionColors = ["bg-[#0BB47C]", "bg-[#067E59]", "bg-[#4DA7FF]", "bg-[#0BB47C]", "bg-[#067E59]", "bg-[#4DA7FF]"];

const retentionLegend = [
  { label: "95%+", tone: "bg-[#067E59]" },
  { label: "90-95%", tone: "bg-[#0BB47C]" },
  { label: "85-90%", tone: "bg-[#4DA7FF]" },
  { label: "75-85%", tone: "bg-[#60A5FA]" },
  { label: "65-75%", tone: "bg-[#FF8C42]" },
  { label: "<65%", tone: "bg-[#F4C542]" },
];

// Function to get color based on retention percentage
const getRetentionColor = (percentage) => {
  const num = parseFloat(percentage);
  if (num >= 95) return "bg-[#067E59]"; // Dark Green
  if (num >= 90) return "bg-[#0BB47C]"; // Medium Green
  if (num >= 85) return "bg-[#4DA7FF]"; // Light Blue
  if (num >= 75) return "bg-[#60A5FA]"; // Medium Blue
  if (num >= 65) return "bg-[#FF8C42]"; // Orange
  return "bg-[#F4C542]"; // Yellow
};

const kpiCards = [
  {
    title: "Conversion Rate",
    value: "3.8%",
    helper: "+0.6pp vs last month",
    gradient: "from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
    badge: "Healthy",
    badgeTone: "bg-white/20 text-white",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 3.75 4.5 12h6l-3.75 8.25L19.5 12h-6l3.75-8.25-5.25 6" />
      </svg>
    ),
  },
  {
    title: "Returning Customers",
    value: "58%",
    helper: "+4% QoQ",
    gradient: "from-[#FF6B6B] via-[#FF7F7F] to-[#FF8E8E]",
    badge: "Growing",
    badgeTone: "bg-white/20 text-white",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v10.5m0 0 3.75-3.75M12 17.25 8.25 13.5M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
      </svg>
    ),
  },
  {
    title: "Average Basket",
    value: "₹148.90",
    helper: "+₹12 vs goal",
    gradient: "from-[#FF8C42] via-[#FF7A33] to-[#FF6B24]",
    badge: "Above target",
    badgeTone: "bg-white/20 text-white",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2.25l1.5 12.75A2.25 2.25 0 0 0 8.99 18h6.02a2.25 2.25 0 0 0 2.24-2.25L18.75 6H5.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM8.25 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      </svg>
    ),
  },
];

const actionItems = [
  {
    title: "Launch A/B test on checkout copy",
    owner: "Growth Team",
    due: "Due tomorrow",
    tone: "border-[#0BB47C] bg-neon-gradient-blur text-white",
  },
  {
    title: "Review VIP loyalty tier pricing",
    owner: "Finance & CRM",
    due: "Due Friday",
    tone: "border-[#067E59] bg-neon-gradient-blur text-white",
  },
  {
    title: "Enable referral bonus tracking",
    owner: "Product Ops",
    due: "In progress",
    tone: "border-[#4DA7FF] bg-neon-gradient-blur text-white",
  },
];

export default function Dashboard() {
  const [topLineData, setTopLineData] = useState([]);
  const [summaryStats, setSummaryStats] = useState([]);
  const [lifetimeRevenueData, setLifetimeRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const data = await dashboardAPI.getOverview();
        setTopLineData(data.topLineData || []);
        setSummaryStats(data.summaryStats || []);
        setLifetimeRevenueData(data.lifetimeRevenueData || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  // Default funnel data (can be moved to backend later)
  const funnelStages = [
    {
      step: "Visitors",
      value: "256.2K",
      conversion: "50.4% to Activity",
      color: "from-lime-300 via-lime-400 to-emerald-500",
    },
    {
      step: "Product Views",
      value: "198.4K",
      conversion: "To cart initiation 32.1%",
      color: "from-emerald-400 via-emerald-500 to-teal-500",
    },
    {
      step: "Add to Cart",
      value: "139.2K",
      conversion: "Cart conversion 24.2%",
      color: "from-teal-500 via-cyan-500 to-sky-500",
    },
    {
      step: "Check Out",
      value: "9.4K",
      conversion: "Checkout abandonment 6.4%",
      color: "from-sky-500 via-blue-500 to-indigo-500",
    },
    {
      step: "Complete Order",
      value: "5.9K",
      conversion: "Final conversion 3.8%",
      color: "from-indigo-500 via-indigo-600 to-slate-700",
    },
  ];

  const areaData = [
    { name: "Step 1", value: 100 },
    { name: "Step 2", value: 78 },
    { name: "Step 3", value: 52 },
    { name: "Step 4", value: 28 },
    { name: "Step 5", value: 16 },
  ];

  // Default retention matrix (can be moved to backend later)
  const retentionMatrix = [
    { month: "Jan", cohorts: ["100%", "88.7%", "82.1%", "74.5%", "68.0%", "61.4%"] },
    { month: "Feb", cohorts: ["100%", "90.1%", "84.3%", "77.2%", "69.6%", "63.0%"] },
    { month: "Mar", cohorts: ["100%", "91.2%", "85.7%", "79.9%", "73.1%", "67.8%"] },
    { month: "Apr", cohorts: ["100%", "92.3%", "86.9%", "80.5%", "74.2%", "68.6%"] },
    { month: "May", cohorts: ["100%", "89.9%", "83.6%", "77.4%", "70.8%", "65.5%"] },
    { month: "Jun", cohorts: ["100%", "87.6%", "81.4%", "74.9%", "68.2%", "62.7%"] },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F7F8FA] text-[#4A4A4A]">
        <Navbar />
        <main className="flex grow items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-2xl font-semibold">Loading dashboard...</div>
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0BB47C] border-r-transparent"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F7F8FA] text-[#4A4A4A]">
        <Navbar />
        <main className="flex grow items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-xl font-semibold text-[#D9534F]">Error loading data</div>
            <div className="text-sm text-[#4A4A4A]">{error}</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#4A4A4A]">
      <Navbar />
      <main className="flex grow">
        <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-8 lg:px-12 xl:px-16">
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[#4A4A4A]">Overview Dashboard</h1>
              <p className="text-sm text-[#4A4A4A]">Sales overview · Jan 1, 2023 – Jun 30, 2023</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-neon-outline text-sm px-4 py-2">
                Last 6 months
              </button>
              <button className="btn-neon-primary text-sm px-4 py-2">
                Export
              </button>
            </div>
          </header>

          {/* KPI CARDS */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {kpiCards.map((card) => (
              <article
                key={card.title}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient} p-6 text-white neon-glow-gradient transition hover:-translate-y-1 hover:neon-glow-strong`}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
                <div className="relative flex items-start justify-between">
                  <div className="rounded-2xl bg-white/15 p-2 backdrop-blur-sm">
                    {card.icon}
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] ${card.badgeTone}`}>
                    {card.badge}
                  </span>
                </div>
                <h2 className="relative mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
                  {card.title}
                </h2>
                <p className="relative mt-2 text-3xl font-semibold">{card.value}</p>
                <p className="relative mt-2 text-sm font-medium text-white/80">{card.helper}</p>
              </article>
            ))}
          </section>

          {/* TOTAL SALES + SUMMARY */}
          <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <article className="card-neon">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4A4A4A]">Total Sales</p>
                  <h2 className="mt-2 text-3xl font-semibold text-[#4A4A4A]">₹895.39K</h2>
                  <p className="text-xs text-[#4A4A4A]">last 30 days · +12.5% vs previous period</p>
                </div>
                <div className="mt-3 rounded-full bg-[#0BB47C] px-3 py-1 text-xs font-semibold text-white">
                  Jan 1, 2023 – Jun 30, 2023
                </div>
              </div>

              {/* 🔥🔥 BAR GRAPH (updated) */}
              <div className="mt-6 h-48">
                <ResponsiveContainer>
                  <BarChart data={topLineData.length > 0 ? topLineData : []} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(11, 180, 124, 0.2)" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#4A4A4A" tick={{ fill: "#4A4A4A" }} />
                    <YAxis stroke="#4A4A4A" tick={{ fill: "#4A4A4A" }} tickFormatter={(value) => `₹${value}K`} />
                <Tooltip
                    labelFormatter={(label) => `Month: ${label}`}
                    formatter={(value) => [`₹${value}K`, "Revenue"]} 
                    contentStyle={{
                    borderRadius: "1rem",
                    borderColor: "rgba(11, 180, 124, 0.3)",
                    backgroundColor: "rgba(247, 248, 250, 0.95)",
                    color: "#4A4A4A",
                    }}
                />

                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: 8, color: "#4A4A4A" }} />
                    <Bar dataKey="totalSales" name="Revenue" fill="#0BB47C" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="card-neon">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4A4A4A]">Summary</p>
              <p className="mt-2 text-xs text-[#4A4A4A]">Jan 1, 2023 – Jun 30, 2023</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {summaryStats.length > 0 ? summaryStats.map((stat) => (
                  <article key={stat.label} className="glass-card rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4A4A4A]">{stat.label}</p>
                      <span className={`text-xs font-semibold ${stat.trendTone}`}>{stat.trend}</span>
                    </div>
                    <p className="mt-3 text-xl font-semibold text-[#4A4A4A]">{stat.value}</p>
                    <div className="mt-4 h-2 w-full rounded-full bg-[#D9D9D9]">
                      <div className={`h-2 rounded-full bg-[#0BB47C]`} style={{ width: `${stat.progress}%` }} />
                    </div>
                  </article>
                )) : (
                  <div className="col-span-2 text-center text-[#4A4A4A] py-4">No summary data available</div>
                )}
              </div>
            </article>
          </section>

          {/* SALES FUNNEL + LTV */}
          <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            
            {/* SALES FUNNEL */}
            <article className="card-neon">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4A4A4A]">Sales Funnel</p>
                  <p className="text-xs text-[#4A4A4A]">Jan 1, 2023 – Jun 30, 2023</p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#0BB47C] px-3 py-1 text-xs font-semibold text-white">
                    +4.8% completion
                  </span>
                </div>
              </div>

              <div className="mt-6 h-40">
                <ResponsiveContainer>
                  <AreaChart data={areaData.length > 0 ? areaData : []}>
                    <defs>
                      <linearGradient id="funnelGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0BB47C" />
                        <stop offset="40%" stopColor="#067E59" />
                        <stop offset="80%" stopColor="#4DA7FF" />
                        <stop offset="100%" stopColor="#0BB47C" />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#4A4A4A" tick={{ fill: "#4A4A4A", fontSize: 12 }} />
                    <YAxis hide />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Stage completion"]}

                      contentStyle={{
                        borderRadius: "1rem",
                        borderColor: "rgba(11, 180, 124, 0.3)",
                        backgroundColor: "rgba(247, 248, 250, 0.95)",
                        color: "#4A4A4A"
                      }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#0BB47C" fill="url(#funnelGradient)" strokeWidth={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid gap-4 rounded-3xl glass-card p-4 sm:grid-cols-5">
                {funnelStages.length > 0 ? funnelStages.map((stage) => (
                  <div key={stage.step} className="flex flex-col gap-1 rounded-2xl glass p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4A4A4A]">{stage.step}</p>
                    <p className="text-lg font-semibold text-[#4A4A4A]">{stage.value}</p>
                    <p className="text-[0.65rem] text-[#4A4A4A]">{stage.conversion}</p>
                    <div className="mt-auto h-2 rounded-full bg-[#0BB47C]" />
                  </div>
                )) : (
                  <div className="col-span-5 text-center text-[#4A4A4A] py-4">No funnel data available</div>
                )}
              </div>
            </article>

            {/* LIFETIME VALUE */}
            <article className="card-neon">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4A4A4A]">Average Lifetime Revenue</p>
                  <p className="text-xs text-[#4A4A4A]">Jan 1, 2023 – Jun 30, 2023</p>
                </div>
                <span className="mt-3 rounded-full bg-[#0BB47C] px-3 py-1 text-xs font-semibold text-white">
                  +₹56K YoY
                </span>
              </div>

              <div className="mt-6 h-48">
                <ResponsiveContainer>
                  <LineChart data={lifetimeRevenueData.length > 0 ? lifetimeRevenueData : []} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(11, 180, 124, 0.2)" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#4A4A4A" tick={{ fill: "#4A4A4A" }} />
                    <YAxis stroke="#4A4A4A" tick={{ fill: "#4A4A4A" }} tickFormatter={(value) => `₹${value}K`} />
                    <Tooltip
                      labelFormatter={(label) => `Month: ${label}`}
                      formatter={(value, name) => [`₹${value}K`, name]}
                      contentStyle={{
                        borderRadius: "1rem",
                        borderColor: "rgba(11, 180, 124, 0.3)",
                        backgroundColor: "rgba(247, 248, 250, 0.95)",
                        color: "#4A4A4A"
                      }}
                    />
                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: 8, color: "#4A4A4A" }} />

                    <Line
                      type="monotone"
                      dataKey="newCustomers"
                      stroke="#4DA7FF"
                      strokeWidth={3}
                      dot={{ r: 3, fill: "#4DA7FF" }}
                      name="New customers"
                    />
                    <Line
                      type="monotone"
                      dataKey="returningCustomers"
                      stroke="#0BB47C"
                      strokeWidth={3}
                      dot={{ r: 3, fill: "#0BB47C" }}
                      name="Returning customers"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>
          </section>

          {/* RETENTION + ACTION CENTER */}
          <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <article className="card-neon">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4A4A4A]">Customer Retention</p>
                  <p className="text-xs text-[#4A4A4A]">Jan 1, 2023 – Jun 30, 2023</p>
                </div>
                <span className="mt-3 rounded-full bg-[#0BB47C] px-3 py-1 text-xs font-semibold text-white">
                  87% avg retention
                </span>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#4A4A4A]">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-[#4A4A4A]">Month</th>
                      {["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"].map((label) => (
                        <th key={label} className="px-3 py-2 text-center text-[#4A4A4A]">
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {retentionMatrix.length > 0 ? retentionMatrix.map((row) => (
                      <tr key={row.month}>
                        <td className="px-3 py-2 text-left text-sm font-semibold text-[#4A4A4A]">{row.month}</td>
                        {row.cohorts.map((value, idx) => (
                          <td key={`${row.month}-${idx}`} className="px-1 py-1 text-center">
                            <div className={`rounded-xl ${getRetentionColor(value)} px-2 py-3 text-xs font-semibold text-white`}>
                              {value}
                            </div>
                          </td>
                        ))}
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="7" className="px-3 py-4 text-center text-[#4A4A4A]">No retention data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-xs text-[#4A4A4A]">
                {retentionLegend.map((item) => (
                  <span key={item.label} className="inline-flex items-center gap-2 rounded-full glass px-3 py-1">
                    <span className={`h-2 w-6 rounded-full ${item.tone}`} />
                    {item.label}
                  </span>
                ))}
              </div>
            </article>

            <article className="flex flex-col gap-4 card-neon">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4A4A4A]">Action Center</p>
                  <p className="text-xs text-[#4A4A4A]">Keep momentum high with these next steps</p>
                </div>
                <span className="rounded-full bg-[#0BB47C] px-3 py-1 text-xs font-semibold text-white">3 open</span>
              </div>

              <ul className="space-y-3">
                {actionItems.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl glass-card px-4 py-3 text-sm font-medium"
                  >
                    <p className="text-[#4A4A4A]">{item.title}</p>
                    <div className="mt-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[#4A4A4A]">
                      <span>{item.owner}</span>
                      <span>{item.due}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <button className="mt-auto btn-neon-primary text-sm px-4 py-2">
                View full roadmap
              </button>
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
