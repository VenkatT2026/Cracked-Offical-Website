export default function TeacherDashboard() {
  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-primary-700 mb-6">Welcome back, Ms. Johnson!</h1>
      
      {/* Quick Stats */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">24</div>
            <div className="text-primary-700/70">Active Students</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">8</div>
            <div className="text-primary-700/70">Pending Assignments</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">92%</div>
            <div className="text-primary-700/70">Average Completion</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">3</div>
            <div className="text-primary-700/70">Live Classes Today</div>
          </div>
        </div>
      </section>
      
      {/* Recent Assignments */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-primary-600 mb-4">Recent Assignments</h2>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-accent-200 rounded-lg">
              <div>
                <h3 className="font-semibold text-primary-700">Math Section - Algebra Quiz</h3>
                <p className="text-primary-700/70 text-sm">Due: Tomorrow • 18/24 students completed</p>
              </div>
              <div className="text-right">
                <div className="text-green-600 font-medium">75%</div>
                <button className="text-primary-600 hover:text-primary-500 text-sm">
                  View Results
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-accent-200 rounded-lg">
              <div>
                <h3 className="font-semibold text-primary-700">Reading Comprehension Practice</h3>
                <p className="text-primary-700/70 text-sm">Due: Friday • 12/24 students completed</p>
              </div>
              <div className="text-right">
                <div className="text-yellow-600 font-medium">50%</div>
                <button className="text-primary-600 hover:text-primary-500 text-sm">
                  View Results
                </button>
              </div>
            </div>
            <div className="text-center py-4">
              <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-2 rounded-lg">
                Create New Assignment
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Student Performance */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-primary-600 mb-4">Top Performing Students</h2>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-accent-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
                  AS
                </div>
                <div>
                  <h3 className="font-semibold text-primary-700">Alex Smith</h3>
                  <p className="text-primary-700/70 text-sm">Last activity: 2 hours ago</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">1520</div>
                <div className="text-green-600 text-sm">+120 this month</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-accent-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
                  MJ
                </div>
                <div>
                  <h3 className="font-semibold text-primary-700">Maria Johnson</h3>
                  <p className="text-primary-700/70 text-sm">Last activity: 1 day ago</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">1480</div>
                <div className="text-green-600 text-sm">+85 this month</div>
              </div>
            </div>
            <div className="text-center py-4">
              <button className="text-primary-600 hover:text-primary-500 font-medium">
                View All Students →
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold text-primary-600 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-primary-700 mb-4">Create Quiz</h3>
            <p className="text-primary-700/70 mb-4">Build custom quizzes with our question bank</p>
            <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-4 py-2 rounded">
              New Quiz
            </button>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-primary-700 mb-4">Schedule Class</h3>
            <p className="text-primary-700/70 mb-4">Set up live tutoring sessions</p>
            <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-4 py-2 rounded">
              Schedule
            </button>
          </div>
        </div>
      </section>
    </main>
  );
} 