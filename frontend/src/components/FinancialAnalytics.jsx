import { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { financialAPI } from "../utils/api.js";

const formatCurrency = (amount) =>
  `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function FinancialAnalytics() {
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [incomeBreakdown, setIncomeBreakdown] = useState([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);
  const [metricCards, setMetricCards] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFinancialData() {
      try {
        setLoading(true);
        const data = await financialAPI.getAnalytics(2024);
        
        setMonthlySummary(data.monthlySummary || []);
        setIncomeBreakdown(data.incomeBreakdown || []);
        setExpenseBreakdown(data.expenseBreakdown || []);
        
        // Set metric cards
        setMetricCards([
          { title: "Total Income", value: data.totalIncome || 0, change: "+8.7%", tone: "text-[#0BB47C]", chip: "bg-[#0BB47C]/20" },
          { title: "Total Expenses", value: data.totalExpense || 0, change: "-6.3%", tone: "text-[#F4C542]", chip: "bg-[#F4C542]/20" },
          { title: "Total Net Income", value: data.netIncome || 0, change: "+21.4%", tone: "text-[#0BB47C]", chip: "bg-[#0BB47C]/20" },
        ]);
        
        // Use monthly summary for forecast (last 8 months)
        setForecastData((data.monthlySummary || []).slice(0, 8));
      } catch (err) {
        console.error("Error fetching financial data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFinancialData();
  }, []);

  if (loading) {
    return (
      <section className="rounded-3xl card-neon text-[#4A4A4A] shadow-2xl p-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-xl font-semibold">Loading financial data...</div>
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0BB47C] border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-3xl card-neon text-[#4A4A4A] shadow-2xl p-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-xl font-semibold text-[#D9534F]">Error loading data</div>
            <div className="text-sm text-[#4A4A4A]">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  const incomeTotal = incomeBreakdown.reduce((sum, item) => sum + item.value, 0);
  const expenseTotalTransactions = expenseBreakdown.reduce((sum, item) => sum + item.value, 0);
  return (
    <section className="rounded-3xl card-neon text-white shadow-2xl">
      <header className="flex flex-col gap-2 border-b border-[#D9D9D9] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#4A4A4A]">Analytics · Summary</p>
          <h2 className="mt-1 text-xl font-semibold text-[#4A4A4A] sm:text-2xl">Financial analytics</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-[0.65rem] font-medium text-[#4A4A4A]">
          <span className="rounded-full glass px-2.5 py-1">All accounts</span>
          <span className="rounded-full glass px-2.5 py-1">Monthly</span>
          <span className="rounded-full glass px-2.5 py-1">2024</span>
        </div>
      </header>

      <div className="grid gap-4 px-4 py-4 lg:grid-cols-[2.1fr_0.9fr]">
        <article className="rounded-2xl glass-card p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col">
              <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4A4A4A]">Monthly Income & Expenses</h3>
              <p className="text-[0.65rem] text-[#4A4A4A]">Income vs expenses · Jan - Dec</p>
            </div>
          </div>
          <div className="mt-4 h-44">
            <ResponsiveContainer>
              <BarChart 
                data={monthlySummary} 
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                barCategoryGap="15%"
                barGap={8}
              >
                <CartesianGrid stroke="rgba(11, 180, 124, 0.2)" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  stroke="#4A4A4A" 
                  tick={{ fill: "#4A4A4A", fontSize: 10 }} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#4A4A4A" 
                  tick={{ fill: "#4A4A4A", fontSize: 10 }} 
                  tickFormatter={(value) => `₹${value}L`}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value, name) => {
                    const formattedValue = `₹${Number(value).toFixed(2)}L`;
                    return [formattedValue, name === "income" ? "Income" : "Expenses"];
                  }}
                  labelFormatter={(label) => `${label} 2024`}
                  contentStyle={{ 
                    backgroundColor: "rgba(247, 248, 250, 0.95)", 
                    borderColor: "rgba(11, 180, 124, 0.3)", 
                    borderRadius: "12px", 
                    color: "#4A4A4A",
                    padding: "8px 12px"
                  }}
                  itemStyle={{ padding: "4px 0" }}
                />
                <Legend 
                  iconType="circle" 
                  wrapperStyle={{ color: "#4A4A4A", paddingTop: "5px", fontSize: "12px" }} 
                />
                <Bar 
                  dataKey="income" 
                  name="Income" 
                  fill="#0BB47C" 
                  radius={[4, 4, 0, 0]}
                  style={{ filter: 'drop-shadow(0 0 4px rgba(11, 180, 124, 0.5))' }}
                />
                <Bar 
                  dataKey="expense" 
                  name="Expenses" 
                  fill="#F4C542" 
                  radius={[4, 4, 0, 0]}
                  style={{ filter: 'drop-shadow(0 0 4px rgba(244, 197, 66, 0.5))' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <aside className="grid gap-3">
          {metricCards.map((card) => (
            <div key={card.title} className="rounded-2xl glass-card p-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#4A4A4A]">{card.title}</p>
              <p className="mt-2 text-xl font-semibold text-[#4A4A4A]">{formatCurrency(card.value)}</p>
              <span className={`mt-1.5 inline-flex items-center gap-2 rounded-full glass px-2.5 py-1 text-[0.65rem] font-semibold ${card.tone}`}>
                {card.change}
              </span>
            </div>
          ))}
        </aside>
      </div>

      <div className="grid gap-4 border-t border-[#D9D9D9] px-4 py-4 lg:grid-cols-3">
        <article className="rounded-2xl glass-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4A4A4A]">Income Overview</h3>
            <span className="rounded-full glass px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-[#4A4A4A]">
              Categories
            </span>
          </div>
          <p className="mt-3 text-xl font-semibold text-[#4A4A4A]">{formatCurrency(incomeTotal)}</p>
          <div className="mt-3 space-y-2.5">
            {incomeBreakdown.map((item, index) => {
              const percentage = Math.round((item.value / incomeTotal) * 100);
              const colors = ["#0BB47C", "#067E59", "#4DA7FF"];
              return (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#4A4A4A]">
                    <span className="font-medium">{item.label}</span>
                    <span className="font-semibold text-[0.65rem]">{formatCurrency(item.value)} ({percentage}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: colors[index % colors.length],
                        boxShadow: `0 0 10px ${colors[index % colors.length]}40`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-2xl glass-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4A4A4A]">Expense Analysis</h3>
            <span className="rounded-full glass px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-[#4A4A4A]">
              Transactions
            </span>
          </div>
          <div className="mt-4 h-36">
            <ResponsiveContainer>
              <PieChart>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{ backgroundColor: "rgba(247, 248, 250, 0.95)", borderColor: "rgba(11, 180, 124, 0.3)", borderRadius: "12px", color: "#4A4A4A" }}
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
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#4A4A4A" fontSize="18" fontWeight="600">
                  {expenseTotalTransactions} Total
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid gap-1.5 text-[0.65rem] text-[#4A4A4A]">
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

        <article className="rounded-2xl glass-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4A4A4A]">Financial Forecast</h3>
            <span className="rounded-full glass px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-[#4A4A4A]">
              May focus
            </span>
          </div>
          <div className="mt-4 h-36">
            <ResponsiveContainer>
              <LineChart data={forecastData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0BB47C" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#4DA7FF" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(11, 180, 124, 0.2)" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  stroke="#4A4A4A" 
                  tick={{ fill: "#4A4A4A", fontSize: 10 }} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#4A4A4A" 
                  tick={{ fill: "#4A4A4A", fontSize: 10 }} 
                  tickFormatter={(value) => `₹${value}L`}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value, name) => [`₹${Number(value).toFixed(1)}L`, name === "income" ? "Income" : "Expenses"]}
                  contentStyle={{ 
                    backgroundColor: "rgba(247, 248, 250, 0.95)", 
                    borderColor: "rgba(11, 180, 124, 0.3)", 
                    borderRadius: "12px", 
                    color: "#4A4A4A",
                    padding: "8px 12px"
                  }}
                  itemStyle={{ padding: "4px 0" }}
                />
                <Legend 
                  iconType="line" 
                  wrapperStyle={{ color: "#4A4A4A", fontSize: "12px", paddingTop: "5px" }} 
                />
                <ReferenceLine 
                  x="May" 
                  stroke="#4A4A4A" 
                  strokeWidth={1.5} 
                  strokeDasharray="3 3"
                  label={{ 
                    value: "May", 
                    position: "top", 
                    fill: "#4A4A4A",
                    fontSize: 11,
                    fontWeight: 600,
                    backgroundColor: "rgba(247, 248, 250, 0.8)",
                    padding: "4px 8px",
                    borderRadius: "6px"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="none"
                  fill="url(#forecastGradient)"
                  fillOpacity={0.3}
                />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  name="Income" 
                  stroke="#0BB47C" 
                  strokeWidth={3}
                  dot={{ fill: "#0BB47C", r: 4, strokeWidth: 2, stroke: "#FFFFFF" }}
                  activeDot={{ r: 6, fill: "#0BB47C" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expense" 
                  name="Expenses" 
                  stroke="#F4C542" 
                  strokeWidth={3}
                  dot={{ fill: "#F4C542", r: 4, strokeWidth: 2, stroke: "#FFFFFF" }}
                  activeDot={{ r: 6, fill: "#F4C542" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-[0.65rem] text-[#4A4A4A] leading-relaxed">
            Expecting deficit in May. Consider saving more in April or optimizing leisure expenses.
          </p>
        </article>
      </div>
    </section>
  );
}

