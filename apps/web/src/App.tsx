import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { SmoothScroll } from './components/common/SmoothScroll';
import { RishuAvatar } from './avatar/RishuAvatar';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Certifications } from './pages/Certifications';
import { Services } from './pages/Services';
import { BookSession } from './pages/BookSession';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const NotFound: React.FC = () => (
  <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 text-center space-y-6">
    <RishuAvatar size="lg" expression="thinking" />
    <div className="space-y-2">
      <h1 className="text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#00D9FF]">
        404
      </h1>
      <h2 className="text-2xl font-heading font-bold text-white">Dimension Not Found</h2>
      <p className="text-gray-400 font-mono text-sm max-w-md">
        The coordinates you navigated to in Rishu&apos;s digital universe do not exist or have been re-indexed.
      </p>
    </div>
    <Link
      to="/"
      className="px-6 py-3 rounded-xl text-xs font-mono text-white bg-gradient-to-r from-[#A855F7] to-[#7E22CE] hover:scale-105 transition-all shadow-glow-primary"
    >
      Return to Origin (Home)
    </Link>
  </div>
);

export const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#050505] text-white flex flex-col">
        <CustomCursor />
        {!isAdminRoute && <Navbar />}

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/services" element={<Services />} />
            <Route path="/book-session" element={<BookSession />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin CMS (Direct Access - No Login Barrier) */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminDashboard />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {!isAdminRoute && <Footer />}
      </div>
    </SmoothScroll>
  );
};
