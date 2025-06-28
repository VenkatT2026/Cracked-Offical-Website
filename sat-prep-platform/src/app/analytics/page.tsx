export default function Analytics() {
  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-primary-700 mb-6">Analytics & Reports</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-primary-600 mb-2">Performance Overview</h2>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
          {/* Placeholder for performance chart */}
          <div className="w-full h-32 bg-accent-200 rounded mb-2 flex items-center justify-center text-primary-500">Performance Chart</div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-primary-600 mb-2">Strengths & Weaknesses</h2>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
          <div className="text-primary-700">Analysis coming soon!</div>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-primary-600 mb-2">Downloadable Reports</h2>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
          <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded px-4 py-2 w-fit">Download Report</button>
        </div>
      </section>
    </main>
  );
} 