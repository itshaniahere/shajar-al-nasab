'use client';

import { useState, useEffect } from 'react';
import { FamilyTree } from '@/components/FamilyTree';
import { DetailPanel } from '@/components/DetailPanel';
import { demoFamilyTree } from '@/lib/demoData';
import { exportAsJSON, getGenerationStats } from '@/lib/utils';
import { SelectedMember } from '@/types/family';
import { Sun, Moon, Download, Users } from 'lucide-react';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedMember, setSelectedMember] = useState<SelectedMember | null>(null);
  const [showStats, setShowStats] = useState(false);

  // Set initial theme based on system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleExport = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    exportAsJSON(demoFamilyTree, `shajra-family-tree-${timestamp}.json`);
  };

  const stats = getGenerationStats(demoFamilyTree);

  return (
    <div className={`flex flex-col h-screen w-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">🌳</div>
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Shajra
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Islamic Family Tree
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Stats button */}
          <button
            onClick={() => setShowStats(!showStats)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            title="View family statistics"
            aria-label="Family Statistics"
          >
            <Users size={20} />
            <span className="text-sm font-medium">Stats</span>
          </button>

          {/* Export button */}
          <button
            onClick={handleExport}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            title="Export family tree as JSON"
            aria-label="Export as JSON"
          >
            <Download size={20} />
            <span className="text-sm font-medium">Export</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-700 text-yellow-400'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Stats panel */}
      {showStats && (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-b px-4 py-3`}>
          <div className="flex gap-6">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Members</p>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {stats.totalMembers}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex relative">
        {/* Family tree canvas */}
        <div className="flex-1">
          <FamilyTree
            rootMember={demoFamilyTree}
            selectedMember={selectedMember}
            onSelectMember={setSelectedMember}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Detail panel */}
        <DetailPanel
          selectedMember={selectedMember}
          onClose={() => setSelectedMember(null)}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Footer - Privacy notice */}
      <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t px-4 py-2 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
        <p>
          🔒 Your family data is stored locally in your browser and never sent to any server. Please export your data regularly for backup.
        </p>
      </footer>
    </div>
  );
}
