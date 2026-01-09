'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

interface Proposal {
  id: string;
  title: { [key: string]: string };
  summary: { [key: string]: string };
  details: { [key: string]: string[] };
  support: string;
  lastUpdated: string;
  status: string;
}

interface ProposalCardProps {
  proposal: Proposal;
}

export default function ProposalCard({ proposal }: ProposalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  const getSupportColor = (support: string) => {
    switch (support) {
      case 'alto':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'basso':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'archived':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleToggle = () => {
    setIsAnimating(true);
    setIsExpanded(!isExpanded);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="gog-card animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-4">
        <h3 className="text-xl font-semibold text-gray-900 flex-1">
          {proposal.title[locale]}
        </h3>
        <div className="flex gap-2 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSupportColor(proposal.support)}`}>
            {t(`support.${proposal.support}`)}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(proposal.status)}`}>
            {t(`status.${proposal.status}`)}
          </span>
        </div>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">
        {proposal.summary[locale]}
      </p>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <span className="text-sm text-gray-500">
          {t('proposals.updated')}: {new Date(proposal.lastUpdated).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
        <button
          onClick={handleToggle}
          disabled={isAnimating}
          className="gog-button-secondary text-sm self-start sm:self-auto"
          aria-expanded={isExpanded}
          aria-controls={`proposal-details-${proposal.id}`}
        >
          {isExpanded ? t('proposals.readLess') : t('proposals.readMore')}
        </button>
      </div>

      {isExpanded && (
        <div 
          id={`proposal-details-${proposal.id}`}
          className="border-t pt-4 animate-fade-in-up"
        >
          <ul className="space-y-3">
            {proposal.details[locale].map((detail, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-600 mt-1 text-sm">•</span>
                <span className="text-gray-700 leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}