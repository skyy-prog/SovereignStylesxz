import React, { useState } from "react";

const faqs = [
  {
    question: "Why choose SovereignStylesxz?",
    answer:
      "SovereignStylesxz stands for premium quality, modern design, and everyday comfort. Every piece is crafted to deliver style without compromising durability or fit.",
  },
  {
    question: "What makes SovereignStylesxz clothing different?",
    answer:
      "Our products use carefully selected fabrics, attention to detail, and trend-inspired designs. We focus on timeless fashion that looks good today and lasts tomorrow.",
  },
  {
    question: "Is SovereignStylesxz suitable for daily wear?",
    answer:
      "Yes. Our collections are designed for everyday comfort, whether you’re heading out casually or dressing up for a special occasion.",
  },
  {
    question: "Do you offer quality assurance?",
    answer:
      "Absolutely. Every product goes through strict quality checks to ensure proper stitching, fabric strength, and finishing before reaching you.",
  },
  {
    question: "Why trust SovereignStylesxz as a brand?",
    answer:
      "We value transparency, customer satisfaction, and consistent quality. SovereignStylesxz is built to create long-term trust, not just sell clothes.",
  },
];

const BrandFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className=" universalfontgreatvibes mx-auto px-4 py-16  w-full  ">
      <h2 className="text-3xl font-bold text-black mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6 p-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-black pb-4 cursor-pointer"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            <div className="flex justify-between items-center">
              <h3 className= "  sm:text-lg   font-bold  lg:text-5xl text-center font-medium text-black">
                {faq.question}
              </h3>
              <span className="text-xl  p-5 font-bold">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>

            {openIndex === index && (
              <p className="mt-4 text-black lg:text-3xl text-sm leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandFAQ;
