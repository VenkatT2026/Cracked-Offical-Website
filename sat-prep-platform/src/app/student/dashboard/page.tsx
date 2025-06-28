export default function StudentDashboard() {
  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-primary-700 mb-6">Welcome back, Alex!</h1>
      
      {/* Progress Overview */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-primary-600 mb-4">Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">1420</div>
            <div className="text-primary-700/70">Current Score</div>
            <div className="text-green-600 text-sm mt-1">+45 from last week</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">87%</div>
            <div className="text-primary-700/70">Completion Rate</div>
            <div className="text-primary-600 text-sm mt-1">23 of 26 modules</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">156</div>
            <div className="text-primary-700/70">Questions Answered</div>
            <div className="text-primary-600 text-sm mt-1">This week</div>
          </div>
        </div>
        
        {/* Progress Chart Placeholder */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-primary-700 mb-4">Score Trend</h3>
          <div className="w-full h-48 bg-accent-200 rounded mb-4 flex items-center justify-center text-primary-500">
            Interactive Progress Chart
          </div>
          <p className="text-primary-700/70 text-sm">Your score has improved by 12% over the last month!</p>
        </div>
      </section>
      
      {/* Upcoming Quizzes */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-primary-600 mb-4">Upcoming Quizzes</h2>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-accent-200 rounded-lg">
              <div>
                <h3 className="font-semibold text-primary-700">Math Section - Algebra</h3>
                <p className="text-primary-700/70 text-sm">Assigned by Ms. Johnson</p>
              </div>
              <div className="text-right">
                <div className="text-primary-600 font-medium">Due Tomorrow</div>
                <button className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-4 py-2 rounded mt-2">
                  Start Quiz
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-accent-200 rounded-lg">
              <div>
                <h3 className="font-semibold text-primary-700">Reading Comprehension</h3>
                <p className="text-primary-700/70 text-sm">Practice Quiz</p>
              </div>
              <div className="text-right">
                <div className="text-primary-600 font-medium">Due Friday</div>
                <button className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-4 py-2 rounded mt-2">
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bookmarks */}
      <section>
        <h2 className="text-xl font-semibold text-primary-600 mb-4">Recent Bookmarks</h2>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-accent-200 rounded-lg">
              <div>
                <h3 className="font-semibold text-primary-700">Quadratic Equations</h3>
                <p className="text-primary-700/70 text-sm">Math • Bookmarked 2 days ago</p>
              </div>
              <button className="text-primary-600 hover:text-primary-500 text-sm">
                Review
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border border-accent-200 rounded-lg">
              <div>
                <h3 className="font-semibold text-primary-700">Grammar Rules</h3>
                <p className="text-primary-700/70 text-sm">Writing • Bookmarked 1 week ago</p>
              </div>
              <button className="text-primary-600 hover:text-primary-500 text-sm">
                Review
              </button>
            </div>
            <div className="text-center py-4">
              <button className="text-primary-600 hover:text-primary-500 font-medium">
                View All Bookmarks →
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 