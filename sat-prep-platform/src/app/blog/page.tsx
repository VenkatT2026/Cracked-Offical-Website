export default function Blog() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-primary-700 mb-6">Resource Center</h1>
      <section className="grid gap-8">
        <article className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-primary-600 mb-2">Top 10 SAT Study Tips</h2>
          <p className="text-primary-700/80 mb-2">Boost your SAT score with these proven strategies from top scorers and educators.</p>
          <span className="text-primary-500 font-medium">Read more</span>
        </article>
        <article className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-primary-600 mb-2">How to Manage Test Anxiety</h2>
          <p className="text-primary-700/80 mb-2">Learn techniques to stay calm and focused on test day.</p>
          <span className="text-primary-500 font-medium">Read more</span>
        </article>
        <article className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-primary-600 mb-2">SAT Math: Key Concepts</h2>
          <p className="text-primary-700/80 mb-2">A breakdown of the most important math topics you need to master.</p>
          <span className="text-primary-500 font-medium">Read more</span>
        </article>
      </section>
    </main>
  );
} 