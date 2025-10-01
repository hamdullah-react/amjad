"use client";
import React from 'react';
import { useFAQ } from '@/contexts/FAQContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = ({ 
  title = "Frequently Asked Questions",
  subtitle = "Quick answers to common questions",
  className = "" 
}) => {
  const { faqs, loading, error } = useFAQ();

  if (loading) {
    return (
      <div className={`mt-20 ${className}`}>
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto"></div>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-200 rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`mt-20 text-center ${className}`}>
        <p className="text-red-500">Error loading FAQs: {error}</p>
      </div>
    );
  }

  if (!faqs || faqs.length === 0) {
    return (
      <div className={`mt-20 text-center ${className}`}>
        <p className="text-gray-500">No FAQs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={`mt-20 ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title.includes('Questions') ? (
            <>
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Questions</span>
            </>
          ) : (
            title
          )}
        </h2>
        <p className="text-gray-600 text-lg">{subtitle}</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 px-6 py-2"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-blue-600 font-bold">?</span>
                  </div>
                  <span className="font-bold text-lg text-gray-800">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pt-2 pl-14">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;