import { useState } from 'react'

const ButtonTabs = () => {
  const [activeTab, setActiveTab] = useState('METHOD');
  const [activeTabBottom, setActiveTabBottom] = useState('APPROACH');
  const tabContent = {
    HISTORY: "Contenido de tabNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
    APPROACH: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    CULTURE: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    METHOD: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
  };

  return (
    
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Button Tabs</h2>
          
          {/* Tab Buttons */}
          <div className="flex space-x-2 mb-4">
            {['HISTORY', 'APPROACH', 'CULTURE', 'METHOD'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded transition-colors ${
                  activeTab === tab
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 text-sm leading-relaxed">
              {tabContent[activeTab as keyof typeof tabContent]}
            </p>
          </div>

          {/* Bottom Tab Navigation */}
          <div className="flex border-b border-gray-200 mt-6 mb-4">
            {['HISTORY', 'APPROACH', 'CULTURE', 'METHOD'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTabBottom(tab)}
                className={`px-4 py-2 border-b-2 transition-colors ${
                  activeTabBottom === tab
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Bottom Tab Content */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 text-sm leading-relaxed">
              {tabContent[activeTabBottom as keyof typeof tabContent]}
            </p>
          </div>
        </div>
  )
}

export default ButtonTabs