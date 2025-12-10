import { useState } from 'react';
import { Check, ArrowRight, Calendar, Mail, Briefcase, Activity, CheckCircle2, Clock, Smartphone } from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
  connected: boolean;
}

export function Onboarding() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: 'calendar',
      name: 'Calendar',
      icon: Calendar,
      description: 'Analyze time allocation and scheduling patterns',
      color: 'from-blue-500 to-blue-600',
      connected: false,
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      description: 'Understand communication habits and relationships',
      color: 'from-red-500 to-red-600',
      connected: false,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Briefcase,
      description: 'Track career progression and professional network',
      color: 'from-blue-700 to-blue-800',
      connected: false,
    },
    {
      id: 'health',
      name: 'Health & Fitness',
      icon: Activity,
      description: 'Monitor wellness metrics and activity levels',
      color: 'from-green-500 to-green-600',
      connected: false,
    },
    {
      id: 'digital-wellbeing',
      name: 'Digital Wellbeing',
      icon: Smartphone,
      description: 'Track screen time, app usage, and digital habits',
      color: 'from-purple-500 to-purple-600',
      connected: false,
    },
  ]);

  const handleConnect = (id: string) => {
    setDataSources(sources =>
      sources.map(source =>
        source.id === id ? { ...source, connected: !source.connected } : source
      )
    );
  };

  const connectedCount = dataSources.filter(s => s.connected).length;
  const totalCount = dataSources.length;
  const progress = (connectedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span className="text-sm text-indigo-600">Takes only 2 minutes</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
            Connect Your Data Sources
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            LifeLens analyzes your data to provide personalized insights. The more you connect, the better we understand your unique patterns.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {connectedCount} of {totalCount} connected
            </span>
            <span className="text-sm text-indigo-600">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Data Sources Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {dataSources.map((source) => {
            const Icon = source.icon;
            return (
              <div
                key={source.id}
                className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                  source.connected
                    ? 'border-indigo-500 shadow-lg shadow-indigo-100'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {source.connected && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${source.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-900 mb-1">{source.name}</h3>
                    <p className="text-sm text-gray-600">{source.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleConnect(source.id)}
                  className={`w-full py-2.5 px-4 rounded-lg transition-all ${
                    source.connected
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md'
                  }`}
                >
                  {source.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
          <button
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Skip for now
          </button>
          
          <button
            className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Privacy Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            <svg className="inline w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Your data is encrypted and never shared with third parties
          </p>
        </div>
      </div>
    </div>
  );
}