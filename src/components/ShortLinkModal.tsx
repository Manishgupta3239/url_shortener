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
      className="fixed inset-0  bg-opacity-50 z-40 flex items-center justify-center ba"
    // onClick={onClose} // Close when clicking the backdrop
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative z-50"
      // onClick={(e) => e.stopPropagation()} 
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={() => close(false)}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Create Short Link</h2>

        {/* Modal Content Here */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Enter long URL..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />

          <button
            onClick={(e) => { e.preventDefault(); handleShorten(url) }}
            disabled={!url || isShortening}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
            <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-cyan-300 font-mono">
                  {shortenedUrl}
                </span>
                <button
                  onClick={(e) => { e.preventDefault(); copyToClipboard() }}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
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