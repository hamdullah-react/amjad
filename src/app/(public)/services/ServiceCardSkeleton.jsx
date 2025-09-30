import React from 'react'

const ServiceCardSkeleton = () => {
  return (
     <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-lg animate-pulse">
       <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full mb-3"></div>
       <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
       <div className="h-3 bg-gray-300 rounded mb-1 w-full"></div>
       <div className="h-3 bg-gray-300 rounded mb-3 w-5/6"></div>
       
       <div className="space-y-1 md:space-y-2">
         <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
         <div className="space-y-1">
           {[1, 2, 3, 4].map((item) => (
             <div key={item} className="flex items-center">
               <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-300 rounded-full mr-1.5 md:mr-2 mt-1 flex-shrink-0"></div>
               <div className="h-3 bg-gray-300 rounded w-4/5"></div>
             </div>
           ))}
         </div>
       </div>
       
       <div className="mt-3 pt-3 border-t border-gray-100">
         <div className="h-4 bg-gray-300 rounded w-1/2"></div>
       </div>
     </div>
  )
}

export default ServiceCardSkeleton