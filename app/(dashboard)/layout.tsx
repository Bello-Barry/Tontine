'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/lib/stores/authStore';
import {  
  Home,  
  CreditCard,  
  PiggyBank,  
  Users,  
  Bell,  
  LogOut,  
  FileText,  
  Users2,  
  BarChart3,  
  Info,  
  Mail 
} from 'lucide-react';

export default function DashboardLayout({ 
  children, 
}: { 
  children: React.ReactNode; 
}) { 
  const router = useRouter(); 
  const [isMenuOpen, setIsMenuOpen] = useState(true); 
  const { user, setUser } = useAuthStore(); 

  useEffect(() => { 
    const unsubscribe = auth.onAuthStateChanged((user) => { 
      setUser(user); 
      if (!user) { 
    router.push('/login'); 
      } 
    }); 

    return () => unsubscribe(); 
  }, [setUser, router]); 

  const menuItems = [ 
    { icon: Home, label: 'Accueil', path: '/dashboard' }, 
    { icon: CreditCard, label: 'Prêts', path: '/dashboard/loans' }, 
    { icon: PiggyBank, label: 'Épargne', path: '/dashboard/savings' }, 
    { icon: Users, label: 'Tontines', path: '/dashboard/membre/mes-tontines' }, 
    { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' }, 
    { icon: Users2, label: 'Utilisateurs', path: '/dashboard/admin/users' }, 
    { icon: FileText, label: 'Tontines', path: '/dashboard/admin/tontines' }, 
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/admin/analytics' }, 
    { icon: Info, label: 'À Propos', path: '/about' }, 
    { icon: Mail, label: 'Contact', path: '/contact' }, 
  ]; 

  const handleLogout = async () => { 
    try { 
      await auth.signOut(); 
      router.push('/login'); 
    } catch (error) { 
      console.error('Erreur lors de la déconnexion:', error); 
    } 
  }; 

  return ( 
    <div className="flex h-screen bg-gray-100"> 
      {/* Sidebar */} 
      <aside  
    className={`${ 
    isMenuOpen ? 'w-64' : 'w-20' 
    } bg-white shadow-lg transition-all duration-300`} 
      > 
    <div className="p-4"> 
      <div className="flex items-center justify-between"> 
        <h1 className={`${ 
          isMenuOpen ? 'block' : 'hidden' 
        } font-bold text-xl"> 
        FinTech App 
        </h1> 
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="p-2 rounded hover:bg-gray-100" 
        > 
          {/* Menu toggle icon */} 
          <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
          > 
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 6h16M4 12h16M4 18h16" 
        /> 
          </svg> 
        </button> 
      </div> 
    </div> 
    <nav className="mt-8"> 
      {menuItems.map((item) => ( 
        <a 
          key={item.path} 
          href={item.path} 
          className="flex items-center px-4 py-3 hover:bg-gray-100" 
        > 
          <item.icon className="w-6 h-6" /> 
          {isMenuOpen && ( 
        <span className="ml-3">{item.label}</span> 
          )} 
        </a> 
      ))} 
    </nav> 
    <div className="absolute bottom-0 w-full p-4"> 
      <button 
        onClick={handleLogout} 
        className="flex items-center px-4 py-3 w-full hover:bg-gray-100" 
      > 
        <LogOut className="w-6 h-6" /> 
        {isMenuOpen && ( 
          <span className="ml-3">Déconnexion</span> 
        )} 
      </button> 
    </div> 
      </aside> 
      {/* Main content */} 
      <main className="flex-1 overflow-y-auto p-8"> 
    {children} 
      </main> 
    </div> 
  ); 
}
