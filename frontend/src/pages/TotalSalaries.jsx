import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { NavLink } from 'react-router-dom'
import { payrollAPI } from '../utils/api.js'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

export default function TotalSalaries() {
  const [totalSalaryData, setTotalSalaryData] = useState([])
  const [totals, setTotals] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [payrolls, totalsData] = await Promise.all([
          payrollAPI.getAll(),
          payrollAPI.getTotalSalaries()
        ])
        setTotalSalaryData(payrolls || [])
        setTotals(totalsData || {})
      } catch (err) {
        console.error('Error fetching total salaries:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="mx-auto flex w-full max-w-7xl grow items-center justify-center px-4 py-8">
          <div className="text-center text-[#4A4A4A]">
            <div className="mb-4 text-2xl font-semibold">Loading salary data...</div>
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

  const totalMonthlySalary = totals?.totalMonthlySalary || 0
  const totalRecharge = totals?.totalRecharge || 0
  const totalIncentives = totals?.totalIncentives || 0
  const totalVouchers = totals?.totalVouchers || 0
  const totalFuel = totals?.totalFuel || 0
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl grow flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10">
        <section className="relative overflow-hidden rounded-3xl bg-[#3E96F4] px-5 py-8 text-white shadow-2xl sm:px-8 sm:py-10">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 rounded-bl-[6rem] bg-white/10 blur-3xl sm:block" />
          <div className="relative grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-black sm:text-xs">
                Total salaries
              </span>
              <h1 className="mt-4 text-2xl font-semibold sm:text-3xl lg:text-4xl">
                Comprehensive compensation breakdown
              </h1>
              <p className="mt-3 max-w-2xl text-xs text-indigo-100/80 sm:mt-4 sm:text-sm">
                Audit every salary component including allowances, benefits, vehicle reimbursements, and vouchers. Keep transparency high and approvals swift for Pravara Health Care leadership.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
                <NavLink
                  to="/payroll"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-[#3E96F4] transition hover:bg-white/90 sm:px-4 sm:text-sm"
                >
                  Back to payroll
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 8.25 3 12l3.75 3.75M3 12h18" />
                  </svg>
                </NavLink>
                <button className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10 sm:px-4 sm:text-sm">
                  Export summary
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12M12 3.75v12m0 0 3.75-3.75M12 15.75 8.25 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid gap-3 rounded-2xl glass-card p-4 sm:gap-4 sm:p-5">
              {[{ label: 'Monthly salary payout', value: formatCurrency(totalMonthlySalary), detail: '+5.1% QoQ' }, { label: 'Monthly allowances', value: formatCurrency(totalRecharge + totalIncentives + totalVouchers + totalFuel), detail: 'All reimbursements combined' }, { label: 'Fuel reimbursements', value: formatCurrency(totalFuel), detail: `${totals?.employeeCount || 0} employees` }].map((stat) => (
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
          {[{ label: 'Recharge support', value: formatCurrency(totalRecharge), tone: 'bg-[#A020F0]/20 text-[#A020F0]' }, { label: 'Monthly incentives', value: formatCurrency(totalIncentives), tone: 'bg-[#D400FF]/20 text-[#D400FF]' }, { label: 'Gift vouchers', value: formatCurrency(totalVouchers), tone: 'bg-[#FF00CC]/20 text-[#FF00CC]' }, { label: 'Employees covered', value: `${totals?.employeeCount || 0} team members`, tone: 'bg-[#A020F0]/20 text-[#A020F0]' }].map((item) => (
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
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Mobile Recharge</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Fuel & Vehicle</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Monthly Incentive</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Gift Vouchers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D9D9] text-xs text-[#4A4A4A] sm:text-sm">
                {totalSalaryData.map((employee) => (
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
                          <p className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-[#4A4A4A] sm:text-xs">{employee.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#4A4A4A] sm:px-6 sm:py-4">{employee.id}</td>
                    <td className="px-4 py-3 text-[#4A4A4A] sm:px-6 sm:py-4">{employee.monthlySalary}</td>
                    <td className="px-4 py-3 text-[#4A4A4A] sm:px-6 sm:py-4">{employee.mobileRecharge}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <span className="inline-flex flex-col gap-1 text-[0.65rem] text-[#4A4A4A] sm:text-xs">
                        <span className="text-sm font-semibold text-[#4A4A4A]">{employee.fuelExpense.split('·')[0].trim()}</span>
                        <span className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-[#4A4A4A]">
                          {employee.fuelExpense.split('·')[1]?.trim() ?? '—'}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#4A4A4A] sm:px-6 sm:py-4">{employee.monthlyIncentive}</td>
                    <td className="px-4 py-3 text-[#4A4A4A] sm:px-6 sm:py-4">{employee.giftVoucher}</td>
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

