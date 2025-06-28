import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-secondary rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-accent rounded-full opacity-25 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-primary-200 rounded-full opacity-15 animate-pulse-slow"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center py-20 px-4 gap-8">
        <div className="animate-bounce-in">
          <h1 className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-4 leading-tight">
            Master the SAT
          </h1>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-700 mb-6">
            with Confidence
          </h2>
        </div>
        
        <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
          <p className="text-xl sm:text-2xl text-neutral-600 max-w-3xl mb-8 leading-relaxed">
            Personalized learning paths, real-time analytics, and expert resources for students and teachers. 
            <span className="font-semibold text-primary-600"> Achieve your best score</span> with the most modern SAT prep platform.
          </p>
        </div>
        
        <div className="animate-slide-up flex flex-col sm:flex-row gap-6 justify-center" style={{animationDelay: '0.6s'}}>
          <Link 
            href="/student/dashboard" 
            className="group relative bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-full px-10 py-4 text-xl shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse-slow"
          >
            <span className="relative z-10">Start Studying</span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Link>
          <Link 
            href="/register" 
            className="group bg-white border-2 border-primary-300 text-primary-700 hover:bg-primary-50 hover:border-primary-400 font-bold rounded-full px-10 py-4 text-xl shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Join as a Teacher
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-4">
        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.9s'}}>
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-6 group-hover:animate-bounce">
            <span className="text-3xl">📚</span>
          </div>
          <h3 className="font-bold text-xl mb-3 text-neutral-800">Personalized Learning</h3>
          <p className="text-neutral-600">Adaptive study plans and practice tailored to your strengths and weaknesses with AI-powered recommendations.</p>
        </div>
        
        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 animate-slide-up" style={{animationDelay: '1.2s'}}>
          <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mb-6 group-hover:animate-bounce">
            <span className="text-3xl">📈</span>
          </div>
          <h3 className="font-bold text-xl mb-3 text-neutral-800">Real-Time Analytics</h3>
          <p className="text-neutral-600">Track your progress, analyze performance, and get actionable insights instantly with beautiful charts.</p>
        </div>
        
        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 animate-slide-up" style={{animationDelay: '1.5s'}}>
          <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mb-6 group-hover:animate-bounce">
            <span className="text-3xl">🧑‍🏫</span>
          </div>
          <h3 className="font-bold text-xl mb-3 text-neutral-800">Expert Resources</h3>
          <p className="text-neutral-600">Access curated SAT content, tips, and strategies from top educators and proven study methods.</p>
        </div>
      </section>

      {/* Success Stats */}
      <section className="relative z-10 w-full max-w-6xl mx-auto py-12 px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-neutral-800">Platform Success</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div className="animate-bounce-in" style={{animationDelay: '1.8s'}}>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-success-500 to-success-600 bg-clip-text text-transparent mb-2">98%</div>
              <div className="text-neutral-600 font-medium">Student Satisfaction</div>
            </div>
            <div className="animate-bounce-in" style={{animationDelay: '2.1s'}}>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent mb-2">+12K</div>
              <div className="text-neutral-600 font-medium">Active Users</div>
            </div>
            <div className="animate-bounce-in" style={{animationDelay: '2.4s'}}>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-secondary-500 to-secondary-600 bg-clip-text text-transparent mb-2">+2.5K</div>
              <div className="text-neutral-600 font-medium">Practice Questions</div>
            </div>
            <div className="animate-bounce-in" style={{animationDelay: '2.7s'}}>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text text-transparent mb-2">4.9/5</div>
              <div className="text-neutral-600 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 w-full max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 animate-slide-up" style={{animationDelay: '3.0s'}}>
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">👨‍🎓</span>
            </div>
            <p className="text-neutral-600 mb-4 italic">&ldquo;This platform made SAT prep so much easier and less stressful. The analytics helped me focus on what mattered most!&rdquo;</p>
            <span className="font-semibold text-primary-600">— Student</span>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 animate-slide-up" style={{animationDelay: '3.3s'}}>
            <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">👩‍🏫</span>
            </div>
            <p className="text-neutral-600 mb-4 italic">&ldquo;Assigning quizzes and tracking my students&apos; progress is a breeze. Highly recommend for teachers!&rdquo;</p>
            <span className="font-semibold text-secondary-600">— Teacher</span>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 animate-slide-up" style={{animationDelay: '3.6s'}}>
            <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">👩‍🎓</span>
            </div>
            <p className="text-neutral-600 mb-4 italic">&ldquo;The practice questions and mock tests are top-notch. I felt fully prepared on test day.&rdquo;</p>
            <span className="font-semibold text-accent-600">— Student</span>
          </div>
        </div>
      </section>
    </main>
  );
}
