import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthContext';
import { AppRoutes } from './components/AppRoutes';
import { Toaster } from 'sonner';
import { CheckCircle2, AlertCircle, Info, Loader2 } from 'lucide-react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
          <Navbar />
          <main className="flex-1 flex flex-col relative">
            <AppRoutes />
          </main>
          <Footer />
          <Toaster 
            position="top-right" 
            closeButton
            duration={4000}
            icons={{
              success: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
              error: <AlertCircle className="w-5 h-5 text-rose-600" />,
              info: <Info className="w-5 h-5 text-blue-600" />,
              loading: <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
            }}
            toastOptions={{
              classNames: {
                toast: 'w-full flex items-center p-4 rounded-xl border shadow-lg font-sans',
                title: 'font-semibold text-sm',
                description: 'text-sm',
                closeButton: 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800',
                success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
                error: 'border-rose-200 bg-rose-50 text-rose-900',
                info: 'border-blue-200 bg-blue-50 text-blue-900',
                default: 'border-slate-200 bg-white text-slate-800',
              }
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
