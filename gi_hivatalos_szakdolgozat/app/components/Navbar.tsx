"use client";
 import React, { useState,useRef , useEffect } from "react";
 import { useRouter } from "next/navigation"; 
 import { FaUser, FaSearch, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
 
 const Navbar = () => {

   const [mobilmenu, setMobilmenu] = useState(false);
   const [hamburgerlenyilo, setHamburgerlenyilo] = useState<string | null>(null)
   let dropdownTimeout: NodeJS.Timeout;
   const [keresoNyitva, setKeresoNyitva] = useState(false);
   const searchInputRef = useRef<HTMLInputElement>(null);
   const router = useRouter();


   useEffect(() => {
     if (keresoNyitva && searchInputRef.current) {
       searchInputRef.current.focus();
     }
   }, [keresoNyitva]);


   useEffect(() => {
     const handleKeyDown = (event: KeyboardEvent) => {
       if (event.key === "Escape") {
         setKeresoNyitva(false);
       }
     };
     document.addEventListener("keydown", handleKeyDown);
     return () => document.removeEventListener("keydown", handleKeyDown);
   }, []);

   const closeSearch = () => {
     setKeresoNyitva(false);
   };
 
 
   return (
     <>

       <nav className="w-full bg-white font-inter font-mono text-black flex justify-between items-center px-6 lg:px-16 py-4 border-b border-gray-200 relative">

         <div className="hidden lg:flex space-x-6 text-xs md:text-sm font-semibold tracking-wider">
           {["FOR HIM", "FOR HER", "NEW DROP"].map((item) => (
             <div
               key={item}
               className="relative"
               onMouseEnter={() => {
                 clearTimeout(dropdownTimeout);
                 setHamburgerlenyilo(item);
               }}
               onMouseLeave={() => {
                 dropdownTimeout = setTimeout(() => setHamburgerlenyilo(null), 200);
               }}
             >
               <button className="hover:text-gray-700">{item} ▼</button>

               <div
                 className={`absolute left-0 mt-2 w-44 bg-white shadow-lg rounded-lg z-50 transition-opacity duration-200 ${
                   hamburgerlenyilo === item ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                 }`}
                 onMouseEnter={() => clearTimeout(dropdownTimeout)}
                 onMouseLeave={() => setHamburgerlenyilo(null)}
               >
                 <ul className="py-2 text-sm text-gray-700">
                   <li className="px-4 py-2 hover:bg-gray-100">
                     <a href="#">TOPS</a>
                   </li>
                   <li className="px-4 py-2 hover:bg-gray-100">
                     <a href="#">Bottoms</a>
                   </li>
                   <li className="px-4 py-2 hover:bg-gray-100">
                     <a href="#">Accessories</a>
                   </li>
                 </ul>
               </div>
             </div>
           ))}
         </div>

         <h1 className="text-2xl md:text-3xl font-bold tracking-widest">LIVETHE-FIT</h1>


         <div className="flex items-center space-x-6 text-xs md:text-sm">
           <div className="hidden lg:flex space-x-6">
             <p className="hidden md:block tracking-wide">QUESTIONS? (+36) 30 123 123</p>

             <FaUser
               className="text-lg md:text-xl cursor-pointer hover:text-gray-600"
               onClick={() => router.push("/auth")}
             />
               <FaSearch
               className={`text-lg md:text-xl cursor-pointer transition-transform duration-300 ${
                 keresoNyitva ? "rotate-90 scale-110 text-gray-900" : "hover:text-gray-600"
               }`}
               onClick={() => setKeresoNyitva(!keresoNyitva)}
             />
             <FaShoppingBag className="text-lg md:text-xl cursor-pointer hover:text-gray-600"
             onClick={() => router.push("/cart")}
             />
           </div>


       <div
         className={`fixed top-0 left-0 w-full bg-white shadow-md transition-transform duration-500 ease-in-out ${
           keresoNyitva ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
         } flex items-center px-6 py-4 z-50`}
       >
         <FaSearch className="text-gray-600 text-2xl" />
         <input
           ref={searchInputRef}
           type="text"
           placeholder="Search for products..."
           className="w-full text-lg px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black transition"
         />
         <FaTimes
           className="text-gray-600 text-2xl cursor-pointer hover:text-gray-900 transition-transform duration-300 transform hover:scale-110"
           onClick={closeSearch}
         />
       </div>


           <div className="hidden lg:flex items-center space-x-1 cursor-pointer">
             <img src="/icons/logo.webp" alt="US Flag" className="w-6 h-6" />
             <span className="text-xs md:text-sm">US ▼</span>
           </div>

           <button className="lg:hidden text-2xl" onClick={() => setMobilmenu(!mobilmenu)}>
             {mobilmenu ? <FaTimes className="animate-spin" /> : <FaBars className="animate-pulse" />}
           </button>
         </div>
       </nav>


       <div
         className={`fixed top-0 left-0 font-inter font-mono w-full h-full bg-black z-50 p-6 shadow-lg transition-transform duration-300 ease-in-out transform ${
           mobilmenu ? "translate-x-0 opacity-100 scale-100" : "-translate-x-full opacity-0 scale-95"
         } lg:hidden`}
       >
         <button
           className="absolute top-6 right-6 text-2xl"
           onClick={() => setMobilmenu(false)}
         >
           <FaTimes className="animate-spin" />
         </button>
 
         <div className="flex flex-col items-center space-y-6 mt-16 text-xl font-semibold">
           {["FOR HIM", "FOR HER", "NEW DROP"].map((item) => (
             <div key={item} className="relative w-full text-center">
               <button
                 onClick={() => setHamburgerlenyilo(hamburgerlenyilo === item ? null : item)}
                 className="block w-full py-2 hover:text-gray-700"
               >
                 {item} ▼
               </button>

               {hamburgerlenyilo === item && (
                 <div className="w-full bg-gray-100 py-2 rounded-md transition-all duration-300">
                   <ul className="text-sm text-gray-700">
                     <li className="px-4 py-2 hover:bg-gray-200">
                       <a href="#">TOPS</a>
                     </li>
                     <li className="px-4 py-2 hover:bg-gray-200">
                       <a href="#">BOTTOMS</a>
                     </li>
                     <li className="px-4 py-2 font-bold hover:bg-gray-200">
                       <a href="#">ACCESSORIES</a>
                     </li>
                     <li className="px-4 py-2 hover:bg-gray-200">
                       <a href="#">SHOES</a>
                     </li>
                   </ul>
                 </div>
               )}
             </div>
           ))}
 
           <a href="#" className="hover:text-gray-700">QUESTIONS? (+36) 30 123 123</a>
 
           <div className="flex space-x-6">
             <FaUser className="text-2xl cursor-pointer hover:text-gray-600" />
             <FaSearch className="text-2xl cursor-pointer hover:text-gray-600" />
             <FaShoppingBag className="text-2xl cursor-pointer hover:text-gray-600" />
           </div>
 
           <div className="flex items-center space-x-2 cursor-pointer">
             <img src="/icons/logo.webp" alt="US Flag" className="w-6 h-6" />
             <span>US ▼</span>
           </div>
         </div>
       </div>
     </>
   );
 };
 
 export default Navbar;