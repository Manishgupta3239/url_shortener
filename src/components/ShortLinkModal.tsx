'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Copy,
  CheckCircle,
} from "lucide-react";
import { useUrlStore } from '@/store/AuthStore';

const ShortLinkModal = ({ open, close }: { open: boolean, close: (val: boolean) => void }) => {

  const [url, setUrl] = useState("");
  const { shortenedUrl, handleShorten, isShortening, loading, User: user, credits } = useUrlStore();
  const [copied, setCopied] = useState(false);
  const [customDomain, setCustomDomain] = useState("");
  console.log("hello")
  const copyToClipboard = () => {
    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    // const fullUrl = `${baseUrl}/api/${shortenedUrl}`;
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    // onClick={onClose} // Close when clicking the backdrop
    >
      <div
        className="bg-slate-900/95 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-full max-w-md relative"
      // onClick={(e) => e.stopPropagation()} 
      >
        <button
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          onClick={() => close(false)}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-white mb-6">Create Short Link</h2>

        {/* Modal Content Here */}
        <form className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Enter long URL..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
          </div>

          {/* custom domain */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Custom domain (optional)..."
              className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 ${user?.plan !== 'Pro' ? 'blur-[2px] opacity-70 cursor-not-allowed select-none' : ''}`}
              onChange={(e)=> setCustomDomain(e.target.value)}
              value={customDomain}
              disabled={user?.plan !== 'Pro'}
            />
            {user?.plan !== 'Pro' && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <span className="px-3 py-1 bg-slate-900/90 text-amber-400 text-xs font-semibold rounded-full border border-amber-400/30 shadow-lg backdrop-blur-md">
                  ⭐ Pro Feature
                </span>
              </div>
            )}
          </div>

          <button
            onClick={(e) => { e.preventDefault(); handleShorten(url,customDomain) }}
            disabled={!url || isShortening}
            className="w-full px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isShortening ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>
                  {!user ? (
                    "Shorten"
                  ) : loading ? (
                    <div className="items-center translate-x-[50%]">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  ) : credits <= 0 && user.plan == "Free" ? (
                    "Limit crossed !"
                  ) : (
                    "Shorten"
                  )}
                </span>
                {!user ? (
                  <ArrowRight className="w-5 h-5" />
                ) : loading ? (
                  <div className="items-center translate-x-[50%]">
                    <div className="w-6 h-6 "></div>
                  </div>
                ) : user?.credits <= 0 ? (
                  ""
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </>
            )}
          </button>



          {shortenedUrl && (
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex flex-col space-y-3">
                <span className="text-cyan-400 font-mono text-sm break-all">
                  {shortenedUrl}
                </span>
                <button
                  onClick={(e) => { e.preventDefault(); copyToClipboard() }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-white/70" />
                      <span className="text-white/70">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}


        </form>
      </div>
    </div>
  );
};

export default ShortLinkModal;



// <div className="max-w-2xl mx-auto mb-16">
//               <div className="relative group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
//                 <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <div className="flex-1">
//                       <input
//                         type="url"
//                         value={url}
//                         onChange={(e) => setUrl(e.target.value)}
//                         placeholder="Enter your long URL here..."
//                         className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 backdrop-blur-sm transition-all duration-300"
//                       />
//                     </div>
//                     <button
//                       onClick={handleShorten}
//                       disabled={!url || isShortening}
//                       className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//                     >
//                       {isShortening ? (
//                         <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       ) : (
//                         <>
//                           <span>
//                             {!user ? (
//                               "Shorten"
//                             ) : loading ? (
//                               <div className="items-center translate-x-[50%]">
//                                 <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                               </div>
//                             ) : credits <= 0 && user.plan == "Free" ? (
//                               "Limit crossed !"
//                             ) : (
//                               "Shorten"
//                             )}
//                           </span>
//                           {!user ? (
//                             <ArrowRight className="w-5 h-5" />
//                           ) : loading ? (
//                             <div className="items-center translate-x-[50%]">
//                               <div className="w-6 h-6 "></div>
//                             </div>
//                           ) : user?.credits <= 0 ? (
//                             ""
//                           ) : (
//                             <ArrowRight className="w-5 h-5" />
//                           )}
//                         </>
//                       )}
//                     </button>
//                   </div>

//                   {shortenedUrl && (
//                     <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
//                       <div className="flex items-center justify-between">
//                         <span className="text-cyan-300 font-mono">
//                           {shortenedUrl}
//                         </span>
//                         <button
//                           onClick={copyToClipboard}
//                           className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
//                         >
//                           {copied ? (
//                             <>
//                               <CheckCircle className="w-4 h-4 text-green-400" />
//                               <span className="text-green-400">Copied!</span>
//                             </>
//                           ) : (
//                             <>
//                               <Copy className="w-4 h-4 text-white/70" />
//                               <span className="text-white/70">Copy</span>
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>