export default function Library() {
  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-primary-700 mb-6">Content Library</h1>
      
      {/* Filters */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-4 mb-6">
          <select className="border border-accent-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>All Sections</option>
            <option>Reading</option>
            <option>Writing & Language</option>
            <option>Math (No Calculator)</option>
            <option>Math (Calculator)</option>
          </select>
          <select className="border border-accent-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>All Difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <select className="border border-accent-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>All Topics</option>
            <option>Algebra</option>
            <option>Geometry</option>
            <option>Grammar</option>
            <option>Reading Comprehension</option>
            <option>Data Analysis</option>
          </select>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg">
            Apply Filters
          </button>
        </div>
      </section>
      
      {/* Content Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Math Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Math</span>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Medium</span>
          </div>
          <h3 className="font-semibold text-primary-700 mb-2">Quadratic Equations</h3>
          <p className="text-primary-700/70 text-sm mb-4">Practice solving quadratic equations using factoring, completing the square, and the quadratic formula.</p>
          <div className="flex items-center justify-between">
            <span className="text-primary-600 text-sm">15 questions</span>
            <button className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-4 py-2 rounded">
              Start Practice
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Math</span>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Hard</span>
          </div>
          <h3 className="font-semibold text-primary-700 mb-2">Geometry & Trigonometry</h3>
          <p className="text-primary-700/70 text-sm mb-4">Master geometric concepts including circles, triangles, and basic trigonometry.</p>
          <div className="flex items-center justify-between">
            <span className="text-primary-600 text-sm">20 questions</span>
            <button className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-4 py-2 rounded">
              Start Practice
            </button>
          </div>
        </div>
        
        {/* Reading Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Reading</span>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Medium</span>
          </div>
          <h3 className="font-semibold text-primary-700 mb-2">Literature Passages</h3>
          <p className="text-primary-700/70 text-sm mb-4">Analyze literary texts and understand author&apos;s purpose, tone, and literary devices.</p>
          <div className="flex items-center justify-between">
            <span className="text-primary-600 text-sm">5 passages</span>
            <button className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-4 py-2 rounded">
              Start Practice
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Reading</span>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Hard</span>
          </div>
          <h3 className="font-semibold text-primary-700 mb-2">Science Passages</h3>
          <p className="text-primary-700/70 text-sm mb-4">Interpret scientific data, graphs, and experimental procedures.</p>
          <div className="flex items-center justify-between">
            <span className="text-primary-600 text-sm">4 passages</span>
            <button className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-4 py-2 rounded">
              Start Practice
            </button>
          </div>
        </div>
        
        {/* Writing Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Writing</span>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Easy</span>
          </div>
          <h3 className="font-semibold text-primary-700 mb-2">Grammar Fundamentals</h3>
          <p className="text-primary-700/70 text-sm mb-4">Master basic grammar rules including subject-verb agreement and punctuation.</p>
          <div className="flex items-center justify-between">
            <span className="text-primary-600 text-sm">25 questions</span>
            <button className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-4 py-2 rounded">
              Start Practice
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Writing</span>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Medium</span>
          </div>
          <h3 className="font-semibold text-primary-700 mb-2">Rhetorical Skills</h3>
          <p className="text-primary-700/70 text-sm mb-4">Improve writing style, organization, and effective expression.</p>
          <div className="flex items-center justify-between">
            <span className="text-primary-600 text-sm">18 questions</span>
            <button className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-4 py-2 rounded">
              Start Practice
            </button>
          </div>
        </div>
      </section>
      
      {/* Load More */}
      <div className="text-center mt-8">
        <button className="bg-white border border-primary-300 text-primary-700 hover:bg-primary-50 font-semibold px-6 py-3 rounded-lg">
          Load More Content
        </button>
      </div>
    </main>
  );
} 