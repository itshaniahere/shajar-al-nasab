'use client';

import React from 'react';
import { SelectedMember } from '@/types/family';
import { X } from 'lucide-react';

interface DetailPanelProps {
  selectedMember: SelectedMember | null;
  onClose: () => void;
  isDarkMode: boolean;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({
  selectedMember,
  onClose,
  isDarkMode,
}) => {
  if (!selectedMember) return null;

  const { member, generation, childrenCount } = selectedMember;
  const hasChildren = childrenCount > 0;

  return (
    <div
      className={`absolute top-0 right-0 h-full w-80 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-l shadow-lg z-20 flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Family Information
        </h2>
        <button
          onClick={onClose}
          className={`p-1 rounded hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}
          aria-label="Close panel"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4`}>
        {/* Name section */}
        <div>
          <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 uppercase tracking-wide`}>
            Name
          </h3>
          <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {member.name.english}
          </p>
          {member.name.arabic && (
            <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mt-1 text-right`}>
              {member.name.arabic}
            </p>
          )}
        </div>

        {/* Children count */}
        {member.metadata && (
          <>
            <div>
              <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 uppercase tracking-wide`}>
                Children
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {childrenCount} {childrenCount === 1 ? 'child' : 'children'}
              </p>
            </div>

            {/* Birth year */}
            {member.metadata.birthYear && (
              <div>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 uppercase tracking-wide`}>
                  Birth
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {member.metadata.birthYear}
                  {member.metadata.location && ` • ${member.metadata.location}`}
                </p>
              </div>
            )}

            {/* Death year */}
            {member.metadata.deathYear && (
              <div>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 uppercase tracking-wide`}>
                  Death
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {member.metadata.deathYear}
                </p>
              </div>
            )}

            {/* Kunyah (honorific title) */}
            {member.metadata.kunyah && (
              <div>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 uppercase tracking-wide`}>
                  Honorific Title
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {member.metadata.kunyah}
                </p>
              </div>
            )}

            {/* Notes */}
            {member.metadata.notes && (
              <div>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 uppercase tracking-wide`}>
                  Notes
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {member.metadata.notes}
                </p>
              </div>
            )}

          </>
        )}

        {/* Leaf node indicator */}
        {!hasChildren && (
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
              ✓ {member.name.english.split(' ')[0]} is a leaf node (no children recorded yet)
            </p>
          </div>
        )}
      </div>

      {/* Footer info  */}
      <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          Click another family member to update details
        </p>
      </div>
    </div>
  );
};
