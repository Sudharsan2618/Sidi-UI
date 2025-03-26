import React, { useState } from 'react';
import { X } from 'lucide-react';

const plans = [
    {
      key: 'free',
      title: 'Free',
      price: '$0',
      note: 'Get a glimpse of economic insights and data',
      features: [
        'Access to country-wise economic data',
        'Basic industry insights',
        'Standard data visualization tools',
        'Real-time data for a limited number of countries',
        'Limited access to custom analysis tools',
        'Explore world-class investment features (trial)'
      ],
      button: 'Your current plan',
      disabled: true,
      highlight: false
    },
    {
      key: 'plus',
      title: 'Plus',
      price: '$20',
      badge: 'POPULAR',
      features: [
        'Everything in Free',
        'State-wise economic data and industry trends',
        'Advanced data visualization and reports',
        'Create custom dashboards and analyses',
        'Priority real-time updates for economic shifts',
        'Early access to investment forecasting tools',
        'Personalized recommendations for industries and countries'
      ],
      button: 'Continue',
      highlight: true
    },
    {
      key: 'pro',
      title: 'Pro',
      price: '$200',
      features: [
        'Everything in Plus',
        'Unlimited access to global and state-level data',
        'World-class investment forecasting tools',
        'AI-driven industry and market analysis',
        'Exclusive insights into emerging markets',
        'Customizable investment strategies',
        '24/7 expert support and early feature previews'
      ],
      button: 'Continue',
      highlight: false
    }
  ];
  

const UpgradeModal = ({ onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 max-w-5xl w-full shadow-lg relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-black text-center">Upgrade your plan</h2>

        {/* <div className="flex justify-center mb-4">
          <div className="bg-gray-200 rounded-full px-3 py-1 text-sm text-black font-medium">Personal</div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.key;
            const baseClasses = `rounded-lg p-6 flex flex-col relative cursor-pointer transition-all duration-200 ${
              isSelected ? 'bg-green-50 border-2 border-green-500' : 'border'
            }`;

            return (
              <div
                key={plan.key}
                className={baseClasses}
                onClick={() => setSelectedPlan(plan.key)}
              >
                {plan.badge && (
                  <div className="absolute top-4 right-4 text-xs bg-green-500 text-white px-2 py-1 rounded">
                    {plan.badge}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-black mb-2">{plan.title}</h3>
                <p className="text-2xl text-black font-bold">
                  {plan.price}
                  <span className="text-base font-normal"> /month</span>
                </p>
                {plan.note && <p className="text-gray-500 my-2">{plan.note}</p>}

                <ul className="text-sm text-gray-700 space-y-2 flex-1 mt-4 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>

                {plan.disabled ? (
                  <button
                    className="mt-auto bg-gray-100 text-gray-500 rounded px-4 py-2 cursor-default"
                    disabled
                  >
                    {plan.button}
                  </button>
                ) : (
                  <button
                    className={`mt-auto rounded px-4 py-2 font-medium ${
                      isSelected
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-800 text-white hover:bg-gray-900'
                    }`}
                  >
                    {plan.button}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
