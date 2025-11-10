import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const monthlySummary = [
  { month: "Jan", income: 38.5, expense: 32.1 },
  { month: "Feb", income: 40.2, expense: 33.6 },
  { month: "Mar", income: 42.8, expense: 34.9 },
  { month: "Apr", income: 44.4, expense: 36.8 },
  { month: "May", income: 39.8, expense: 37.2 },
  { month: "Jun", income: 45.6, expense: 38.8 },
  { month: "Jul", income: 47.1, expense: 39.4 },
  { month: "Aug", income: 49.3, expense: 40.2 },
  { month: "Sep", income: 48.7, expense: 41.1 },
  { month: "Oct", income: 51.2, expense: 42.3 },
  { month: "Nov", income: 52.4, expense: 43.5 },
  { month: "Dec", income: 54.1, expense: 44.9 },
];

const incomeBreakdown = [
  { label: "Salary", value: 142000 },
  { label: "Business", value: 168000 },
  { label: "Investment", value: 74500 },
];

const expenseBreakdown = [
  { name: "Housing", value: 40, color: "#7c3aed" },
  { name: "Transportation", value: 20, color: "#6366f1" },
  { name: "Entertainment", value: 13, color: "#ec4899" },
  { name: "Food", value: 17, color: "#22d3ee" },
  { name: "Other", value: 10, color: "#fbbf24" },
];

const forecastData = [
  { month: "Jan", income: 36, expense: 31 },
  { month: "Feb", income: 38, expense: 32 },
  { month: "Mar", income: 41, expense: 34 },
  { month: "Apr", income: 44, expense: 35 },
  { month: "May", income: 39, expense: 37 },
  { month: "Jun", income: 46, expense: 38 },
  { month: "Jul", income: 48, expense: 39 },
  { month: "Aug", income: 50, expense: 41 },
];

const metricCards = [
  { title: "Total Income", value: 384567.45, change: "+8.7%", tone: "text-emerald-400", chip: "bg-emerald-500/10" },
  { title: "Total Expenses", value: 328942.6, change: "-6.3%", tone: "text-rose-400", chip: "bg-rose-500/10" },
  { title: "Net Savings", value: 55624.85, change: "+12.4%", tone: "text-emerald-400", chip: "bg-emerald-500/10" },
];

const incomeTotal = incomeBreakdown.reduce((sum, item) => sum + item.value, 0);
const expenseTotalTransactions = 130;
const formatCurrency = (amount) =>
  `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function FinancialAnalytics() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-[#0f111a] text-slate-100 shadow-2xl shadow-black/40">
      <header className="flex flex-col gap-4 border-b border-slate-800 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Analytics · Summary</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Financial analytics</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">
          <span className="rounded-full border border-slate-700 px-3 py-1">All accounts</span>
          <span className="rounded-full border border-slate-700 px-3 py-1">Monthly</span>
          <span className="rounded-full border border-slate-700 px-3 py-1">2024</span>
        </div>
      </header>

      <div className="grid gap-6 px-6 py-6 lg:grid-cols-[2.1fr_0.9fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-inner shadow-black/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Cashflow trends</h3>
              <p className="text-xs text-slate-500">Income vs expenses · Jan - Dec</p>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              Highlight: May variance
            </span>
          </div>
          <div className="mt-6 h-60">
            <ResponsiveContainer>
              <AreaChart data={monthlySummary}>
                <defs>
                  <linearGradient id="incomeArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.9} />
                    <stop offset="80%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.9} />
                    <stop offset="80%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e2235" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#475569" />
                <YAxis stroke="#475569" tickFormatter={(value) => `₹${value}L`} />
                <Tooltip
                  formatter={(value, name) => [`₹${Number(value).toFixed(1)}L`, name]}
                  contentStyle={{ backgroundColor: "#11131f", borderColor: "#1e2235", borderRadius: "12px" }}
                />
                <Legend iconType="circle" wrapperStyle={{ color: "#cbd5f5" }} />
                <Area type="monotone" dataKey="income" name="Income" stroke="#22d3ee" fill="url(#incomeArea)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="expense" name="Expense" stroke="#a855f7" fill="url(#expenseArea)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <aside className="grid gap-4">
          {metricCards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{card.title}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{formatCurrency(card.value)}</p>
              <span className={`mt-2 inline-flex items-center gap-2 rounded-full ${card.chip} px-3 py-1 text-xs font-semibold ${card.tone}`}>
                {card.change}
              </span>
            </div>
          ))}
        </aside>
      </div>

      <div className="grid gap-6 border-t border-slate-800 px-6 py-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-inner shadow-black/30">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Income Overview</h3>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-slate-400">
              Categories
            </span>
          </div>
          <p className="mt-6 text-3xl font-semibold text-white">{formatCurrency(incomeTotal)}</p>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            {incomeBreakdown.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span>{item.label}</span>
                <span className="font-semibold text-white">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-inner shadow-black/30">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Expense Analysis</h3>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-slate-400">
              Transactions
            </span>
          </div>
          <div className="mt-6 h-48">
            <ResponsiveContainer>
              <PieChart>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{ backgroundColor: "#11131f", borderColor: "#1e2235", borderRadius: "12px" }}
                />
                <Pie
                  data={expenseBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="90%"
                  strokeWidth={0}
                >
                  {expenseBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#cbd5f5" fontSize="24" fontWeight="600">
                  {expenseTotalTransactions}
                </text>
                <text x="50%" y="50%" dy="24" dominantBaseline="middle" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  Bills
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid gap-2 text-xs text-slate-300">
            {expenseBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-inner shadow-black/30">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Financial Forecast</h3>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-slate-400">
              May focus
            </span>
          </div>
          <div className="mt-6 h-48">
            <ResponsiveContainer>
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="forecastIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.8} />
                    <stop offset="90%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="forecastExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.8} />
                    <stop offset="90%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e2235" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#475569" />
                <YAxis stroke="#475569" tickFormatter={(value) => `₹${value}L`} />
                <Tooltip
                  formatter={(value, name) => [`₹${Number(value).toFixed(1)}L`, name]}
                  contentStyle={{ backgroundColor: "#11131f", borderColor: "#1e2235", borderRadius: "12px" }}
                />
                <Legend iconType="circle" wrapperStyle={{ color: "#cbd5f5" }} />
                <Area type="monotone" dataKey="income" name="Income" stroke="#22d3ee" fill="url(#forecastIncome)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="expense" name="Expense" stroke="#f97316" fill="url(#forecastExpense)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-5 text-xs text-slate-400">
            Expecting deficit in May. Consider cutting leisure expenses or delaying non-essential purchases to maintain momentum.
          </p>
        </article>
      </div>
    </section>
  );
}

