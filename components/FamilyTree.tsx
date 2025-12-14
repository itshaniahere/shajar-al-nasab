'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FamilyMember, CanvasTransform, SelectedMember } from '@/types/family';
import { GENERATION_COLORS } from '@/lib/demoData';

interface FamilyTreeProps {
  rootMember: FamilyMember;
  selectedMember: SelectedMember | null;
  onSelectMember: (member: SelectedMember) => void;
  isDarkMode: boolean;
  svgRef?: React.MutableRefObject<SVGSVGElement | null>;
}

interface NodePosition {
  x: number;
  y: number;
  member: FamilyMember;
  generation: number;
}

interface NodeWithWidth {
  member: FamilyMember;
  generation: number;
  x: number;
  y: number;
  width: number;
}

const NODE_RADIUS = 70;
const GENERATION_HEIGHT = 250;
const MIN_SIBLING_SPACING = 220;
const SUBTREE_PADDING = 50;

export const FamilyTree: React.FC<FamilyTreeProps> = ({
  rootMember,
  selectedMember,
  onSelectMember,
  isDarkMode,
  svgRef: externalSvgRef,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const internalSvgRef = useRef<SVGSVGElement>(null);
  const svgRef = externalSvgRef || internalSvgRef;
  const [transform, setTransform] = useState<CanvasTransform>({
    x: 0,
    y: 100,
    scale: 2,
  });
  const [nodes, setNodes] = useState<NodePosition[]>([]);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Proper tree layout algorithm
  const buildTreePositions = (member: FamilyMember): NodePosition[] => {
    const positions: NodePosition[] = [];
    const NODE_WIDTH = MIN_SIBLING_SPACING;

    // Calculate subtree width
    const getSubtreeWidth = (node: FamilyMember): number => {
      if (!node.children || node.children.length === 0) {
        return NODE_WIDTH;
      }
      const childrenWidth = node.children.reduce(
        (sum, child) => sum + getSubtreeWidth(child),
        0
      );
      return Math.max(childrenWidth, NODE_WIDTH);
    };

    // Position nodes recursively
    const positionNode = (
      node: FamilyMember,
      generation: number,
      xOffset: number,
      subtreeWidth: number
    ): void => {
      // Center node in its subtree
      const nodeX = xOffset + subtreeWidth / 2;

      positions.push({
        x: nodeX,
        y: generation * GENERATION_HEIGHT,
        member: node,
        generation,
      });

      // Position children
      if (node.children && node.children.length > 0) {
        let childXOffset = xOffset;

        node.children.forEach((child) => {
          const childSubtreeWidth = getSubtreeWidth(child);
          positionNode(child, generation + 1, childXOffset, childSubtreeWidth);
          childXOffset += childSubtreeWidth;
        });
      }
    };

    const totalWidth = getSubtreeWidth(member);
    // Position root at center (x=0), spread children around it
    positionNode(member, 0, -totalWidth / 2, totalWidth);
    
    // Adjust all positions so root is at x=0 (center)
    if (positions.length > 0) {
      const rootX = positions[0].x;
      positions.forEach((pos) => {
        pos.x -= rootX;
      });
    }

    return positions;
  };

  useEffect(() => {
    const positions = buildTreePositions(rootMember);
    setNodes(positions);
  }, [rootMember]);

  // Handle pan and zoom
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && !isClickingNode(e)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;

    const dx = e.clientX - panStart.x;
    const dy = e.clientY - panStart.y;

    setTransform((prev) => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    setPanStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setTransform((prev) => ({
      ...prev,
      scale: Math.max(0.5, Math.min(3, prev.scale * zoomFactor)),
    }));
  };

  const isClickingNode = (e: React.MouseEvent): boolean => {
    if (!svgRef.current) return false;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (const node of nodes) {
      const screenX = node.x * transform.scale + transform.x;
      const screenY = node.y * transform.scale + transform.y;
      const distance = Math.sqrt((x - screenX) ** 2 + (y - screenY) ** 2);
      if (distance <= NODE_RADIUS * transform.scale) {
        return true;
      }
    }
    return false;
  };

  const handleNodeClick = (node: NodePosition) => {
    const childrenCount = node.member.children?.length || 0;
    onSelectMember({
      member: node.member,
      generation: node.generation,
      childrenCount,
    });
  };

  const handleReset = () => {
    setTransform({ x: 0, y: 50, scale: 1 });
  };

  const handleZoomIn = () => {
    setTransform((prev) => ({
      ...prev,
      scale: Math.min(3, prev.scale * 1.2),
    }));
  };

  const handleZoomOut = () => {
    setTransform((prev) => ({
      ...prev,
      scale: Math.max(0.5, prev.scale / 1.2),
    }));
  };

  const bgColor = isDarkMode ? '#1f2937' : '#ffffff';
  const textColor = isDarkMode ? '#e5e7eb' : '#111827';
  const gridColor = isDarkMode ? '#374151' : '#e5e7eb';

  return (
    <div className="relative w-full h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Main canvas */}
      <div
        ref={canvasRef}
        className={`w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ backgroundColor: bgColor }}
      >
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox="-1500 -100 3000 2000"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: 'center top',
            cursor: isPanning ? 'grabbing' : 'grab',
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid background */}
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={gridColor}
                strokeWidth="0.5"
                opacity="0.1"
              />
            </pattern>
          </defs>
          <rect width="3000" height="2000" x="-1500" y="-100" fill="url(#grid)" />

          {/* Connection lines */}
          {nodes.map((node) => {
            if (!node.member.children || node.member.children.length === 0) {
              return null;
            }

            const children = node.member.children
              .map((child) => nodes.find((n) => n.member.id === child.id))
              .filter((n): n is NodePosition => n !== undefined);

            if (children.length === 0) return null;

            // Calculate parent node radius
            const parentNameLength = node.member.name.english.length;
            let parentRadius = NODE_RADIUS;
            if (parentNameLength <= 8) {
              parentRadius = 40;
            } else if (parentNameLength <= 15) {
              parentRadius = 55;
            } else if (parentNameLength <= 25) {
              parentRadius = 70;
            } else {
              parentRadius = 85;
            }

            const lineColor = isDarkMode ? '#4b5563' : '#9ca3af';
            const startY = node.y + parentRadius;
            const midY = node.y + parentRadius + 50;

            return (
              <g key={`lines-${node.member.id}`}>
                {/* Curved line from parent to each child */}
                {children.map((child) => {
                  // Calculate child node radius
                  const childNameLength = child.member.name.english.length;
                  let childRadius = NODE_RADIUS;
                  if (childNameLength <= 8) {
                    childRadius = 40;
                  } else if (childNameLength <= 15) {
                    childRadius = 55;
                  } else if (childNameLength <= 25) {
                    childRadius = 70;
                  } else {
                    childRadius = 85;
                  }

                  // Create a smooth curve from parent to child
                  const x1 = node.x;
                  const y1 = startY;
                  const x2 = child.x;
                  const y2 = child.y - childRadius;

                  // Control points for smooth curve
                  const cpX1 = x1;
                  const cpY1 = midY;
                  const cpX2 = x2;
                  const cpY2 = midY;

                  const pathData = `M ${x1} ${y1} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x2} ${y2}`;

                  return (
                    <path
                      key={`curve-${node.member.id}-${child.member.id}`}
                      d={pathData}
                      stroke={lineColor}
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Family member nodes */}
          {nodes.map((node) => {
            const isSelected =
              selectedMember?.member.id === node.member.id;
            const isLeafNode = !node.member.children || node.member.children.length === 0;

            // Calculate dynamic radius based on name length
            const nameLength = node.member.name.english.length;
            let dynamicRadius = NODE_RADIUS;
            
            if (nameLength <= 8) {
              dynamicRadius = 40;
            } else if (nameLength <= 15) {
              dynamicRadius = 55;
            } else if (nameLength <= 25) {
              dynamicRadius = 70;
            } else {
              dynamicRadius = 85;
            }

            // Calculate lines for wrapping
            const words = node.member.name.english.split(' ');
            const lines: string[] = [];
            let currentLine = '';

            words.forEach((word) => {
              if ((currentLine + ' ' + word).length > 18) {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
              } else {
                currentLine = currentLine ? currentLine + ' ' + word : word;
              }
            });
            if (currentLine) lines.push(currentLine);

            return (
              <g
                key={node.member.id}
                onClick={() => handleNodeClick(node)}
                style={{ cursor: 'pointer' }}
              >
                {/* Node circle with dynamic radius */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={dynamicRadius}
                  fill={node.member.color || (isDarkMode ? '#4b5563' : '#9ca3af')}
                  stroke={
                    isSelected
                      ? isDarkMode ? '#fbbf24' : '#f59e0b'
                      : isDarkMode ? '#2d5a52' : '#a8d5ba'
                  }
                  strokeWidth={isSelected ? 4 : 2}
                  opacity={0.85}
                  className="hover:opacity-100 transition-opacity"
                />

                {/* Display full name inside circle with dynamic line wrapping */}
                {(() => {
                  const lineHeight = 15;
                  const totalHeight = lines.length * lineHeight;
                  const startY = node.y - (totalHeight / 2) + 5;

                  return lines.map((line, index) => (
                    <text
                      key={`name-line-${index}`}
                      x={node.x}
                      y={startY + index * lineHeight}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="13"
                      fontFamily="sans-serif"
                      fill={isDarkMode ? '#ffffff' : '#ffffff'}
                      fontWeight="700"
                      letterSpacing="-0.3"
                      pointerEvents="none"
                      style={{ paintOrder: 'stroke', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                      stroke={node.member.color || (isDarkMode ? '#4b5563' : '#9ca3af')}
                      strokeWidth="0.3"
                      strokeOpacity="0.4"
                    >
                      {line}
                    </text>
                  ));
                })()}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Control buttons */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <span className="text-lg">🔍+</span>
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <span className="text-lg">🔍−</span>
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Reset View"
          aria-label="Reset View"
        >
          <span className="text-lg">⊙</span>
        </button>
      </div>

      {/* Info text */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-500 dark:text-gray-400 pointer-events-none">
        <p>Click family members to view details</p>
        <p>Drag to pan • Scroll to zoom</p>
      </div>
    </div>
  );
};
