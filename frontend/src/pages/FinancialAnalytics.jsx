import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FinancialAnalyticsPanel from "../components/FinancialAnalytics.jsx";

export default function FinancialAnalytics() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-900/10">
      <Navbar />
      <main className="mx-auto w-full max-w-screen-2xl flex-1 px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
        <FinancialAnalyticsPanel />
      </main>
      <Footer />
    </div>
  );
}

