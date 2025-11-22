import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { NavLink } from 'react-router-dom'
import { payrollAPI } from '../utils/api.js'

const parseAmount = (value) => Number(value.replace(/[^0-9.]/g, ''))
const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

export default function Payroll() {
  const [payrollData, setPayrollData] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPayrollData() {
      try {
        setLoading(true)
        const [payrolls, summaryData] = await Promise.all([
          payrollAPI.getAll(),
          payrollAPI.getSummary()
        ])
        setPayrollData(payrolls || [])
        setSummary(summaryData || {})
      } catch (err) {
        console.error('Error fetching payroll data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPayrollData()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="mx-auto flex w-full max-w-7xl grow items-center justify-center px-4 py-8">
          <div className="text-center text-[#4A4A4A]">
            <div className="mb-4 text-2xl font-semibold">Loading payroll data...</div>
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0BB47C] border-r-transparent"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="mx-auto flex w-full max-w-7xl grow items-center justify-center px-4 py-8">
          <div className="text-center text-[#4A4A4A]">
            <div className="mb-4 text-xl font-semibold text-[#D9534F]">Error loading data</div>
            <div className="text-sm text-[#4A4A4A]">{error}</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const totalMonthly = summary?.totalMonthly || 0
  const totalAnnual = summary?.totalAnnual || 0
  const averageMonthly = summary?.averageMonthly || 0
  const highestMonthly = summary?.highestMonthly || 0
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl grow flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10">
        <section className="relative overflow-hidden rounded-3xl bg-[#3E96F4] px-5 py-8 text-white shadow-2xl sm:px-8 sm:py-10">
          <div className="absolute -left-16 top-6 h-32 w-32 rounded-full bg-[#A020F0]/40 blur-3xl sm:h-40 sm:w-40" />
          <div className="absolute right-0 bottom-0 h-40 w-40 translate-x-1/4 rounded-full bg-[#FF00CC]/20 blur-3xl sm:h-48 sm:w-48" />
          <div className="relative grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-black sm:text-xs">
                Payroll overview
              </span>
              <h1 className="mt-4 text-2xl font-semibold sm:text-3xl lg:text-4xl">
                Employee compensation summary
              </h1>
              <p className="mt-3 max-w-2xl text-xs text-slate-200 sm:mt-4 sm:text-sm">
                Review monthly salary commitments, annual packages, and growth trends across Pravara Health Care. Use the insights below to plan payouts, manage incentives, and align budgets.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
                <NavLink
                  to="/total-salaries"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-[#3E96F4] transition hover:bg-white/90 sm:px-4 sm:text-sm"
                >
                  View total salaries
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12l-3.75 3.75M21 12H3" />
                  </svg>
                </NavLink>
                <NavLink
                  to="/employees"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10 sm:px-4 sm:text-sm"
                >
                  Employee directory
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </NavLink>
              </div>
            </div>
            <div className="grid gap-3 rounded-2xl glass-card p-4 sm:gap-4 sm:p-5">
              {[{ label: 'Monthly payroll', value: formatCurrency(totalMonthly), detail: '+4.2% vs last cycle' }, { label: 'Annualised payroll', value: formatCurrency(totalAnnual), detail: 'Including bonuses & perks' }, { label: 'Highest monthly pay', value: formatCurrency(highestMonthly), detail: `${summary?.employeeCount || 0} employees` }].map((stat) => (
                <div key={stat.label} className="rounded-xl glass p-3 sm:p-4">
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-black/80 sm:text-xs">{stat.label}</p>
                  <p className="mt-2 text-xl font-semibold text-black sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-[0.65rem] font-medium text-black/70 sm:text-xs">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-4 sm:gap-4">
          {[{ label: 'Average monthly pay', value: formatCurrency(averageMonthly), tone: 'bg-[#A020F0]/20 text-[#A020F0]' }, { label: 'Median salary band', value: '₹72K', tone: 'bg-[#D400FF]/20 text-[#D400FF]' }, { label: 'Variable payout fund', value: '₹2.4L', tone: 'bg-[#FF00CC]/20 text-[#FF00CC]' }, { label: 'Employees', value: `${summary?.employeeCount || 0}`, tone: 'bg-[#A020F0]/20 text-[#A020F0]' }].map((item) => (
            <div key={item.label} className="card-neon p-4 sm:p-5">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-[#4A4A4A] sm:text-xs">{item.label}</p>
              <p className={`mt-3 inline-flex items-center rounded-full glass px-3 py-1 text-xs font-semibold ${item.tone} sm:text-sm`}>{item.value}</p>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-3xl card-neon">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#D9D9D9] text-left">
              <thead className="glass text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#4A4A4A] sm:text-xs">
                <tr>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Employee</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Employee ID</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Monthly Salary</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Annual Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D9D9] text-xs text-[#4A4A4A] sm:text-sm">
                {payrollData.map((employee) => (
                  <tr key={employee.id} className="transition hover:bg-[#F7F8FA]">
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0BB47C] text-xs font-semibold text-white sm:h-10 sm:w-10 sm:text-sm">
                          {employee.name
                            .split(' ')
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join('')}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[#4A4A4A] sm:text-base">{employee.name}</p>
                          <p className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-[#4A4A4A] sm:text-xs">Payroll cycle</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#4A4A4A] sm:px-6 sm:py-4">{employee.id}</td>
                    <td className="px-4 py-3 text-[#4A4A4A] sm:px-6 sm:py-4">{employee.monthlySalary}</td>
                    <td className="px-4 py-3 text-[#4A4A4A] sm:px-6 sm:py-4">{employee.annualPackage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

