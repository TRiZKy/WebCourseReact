import React, { useState } from 'react';

/**
 * Accordion section component for expandable and collapsible sections.
 *
 * @component
 * @param {Object} props - The props passed to the component.
 * @param {string} props.title - The title of the accordion section.
 * @param {React.ReactNode} props.children - The content to be displayed inside the accordion section.
 * @returns {JSX.Element} The rendered accordion section component.
 */
const AccordionSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-b dark:border-gray-700">
            <button
                className="w-full text-left py-4 text-xl font-medium flex justify-between items-center"
                onClick={toggleAccordion}
            >
                {title}
                <svg
                    className={`w-6 h-6 transform transition-transform ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
            </button>
            {isOpen && <div className="pb-4">{children}</div>}
        </div>
    );
};

export default AccordionSection;
