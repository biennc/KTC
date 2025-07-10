import { useState } from 'react'

const ButtonAccordions = () => {
    const [accordionOpen, setAccordionOpen] = useState<string>('HISTORY');
    const [multiAccordionOpen, setMultiAccordionOpen] = useState<string[]>([]);


    const accordionContent = {
        HISTORY: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
        APPROACH: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
        CULTURE: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
        METHOD: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
    };

    const handleAccordionToggle = (section: string) => {
        setAccordionOpen(section);
    };

    const handleMultiAccordionToggle = (section: string) => {
        setMultiAccordionOpen(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    return (
        <>

            {/* Button Accordions */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Button Accordions</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Single Accordions */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Single Accordions</h3>
                        <div className="space-y-2">
                            {['HISTORY', 'APPROACH', 'CULTURE', 'METHOD'].map((section) => (
                                <div key={section} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => handleAccordionToggle(section)}
                                        className={`w-full p-3 text-left font-medium transition-colors ${accordionOpen === section
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {section}
                                    </button>
                                    {accordionOpen === section && (
                                        <div className="p-4 bg-white border-t">
                                            <p className="text-gray-700 text-sm leading-relaxed">
                                                {accordionContent[section as keyof typeof accordionContent]}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Multi Accordions */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Multi Accordions</h3>
                        <div className="space-y-2">
                            {['HISTORY', 'APPROACH', 'CULTURE', 'METHOD'].map((section) => (
                                <div key={section} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => handleMultiAccordionToggle(section)}
                                        className={`w-full p-3 text-left font-medium transition-colors ${multiAccordionOpen.includes(section)
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {section}
                                    </button>
                                    {multiAccordionOpen.includes(section) && (
                                        <div className="p-4 bg-white border-t">
                                            <p className="text-gray-700 text-sm leading-relaxed">
                                                {accordionContent[section as keyof typeof accordionContent]}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ButtonAccordions