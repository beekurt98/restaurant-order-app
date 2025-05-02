import { AuthProvider } from './components/AuthProvider';
import CartProvider from './components/CartProvider';
import Navbar from './components/Navbar';
import './App.css'
import { ToastBar, Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'My App',
  description: 'Simple Supabase Auth App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AuthProvider>
            {children}
            <Navbar />

            <Toaster />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
