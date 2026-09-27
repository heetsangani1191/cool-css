'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudioProject, StudioElement, Breakpoint, ElementStyles, CssVariable } from '@/types/css-studio';
import { DEFAULT_PROJECT, DEFAULT_ROOT_ELEMENT, DEFAULT_INITIAL_BUTTON } from '@/utils/presets';
import { getSavedProjects, saveProjectToStorage, deleteProjectFromStorage } from '@/utils/storage';

interface StudioContextType {
  project: StudioProject;
  setProject: React.Dispatch<React.SetStateAction<StudioProject>>;
  selectedElementId: string;
  setSelectedElementId: (id: string) => void;
  activeBreakpoint: Breakpoint;
  setActiveBreakpoint: (bp: Breakpoint) => void;
  activeState: 'normal' | 'hover' | 'active' | 'focus';
  setActiveState: (state: 'normal' | 'hover' | 'active' | 'focus') => void;
  zoom: number;
  setZoom: (z: number) => void;
  activeTab: 'editor' | 'builder' | 'dashboard' | 'landing' | 'flexbox' | 'grid' | 'art' | 'challenges' | 'cheatsheet';
  setActiveTab: (tab: 'editor' | 'builder' | 'dashboard' | 'landing' | 'flexbox' | 'grid' | 'art' | 'challenges' | 'cheatsheet') => void;

  // History / Undo / Redo
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;

  // Element Actions
  selectedElement: StudioElement | null;
  updateElementStyles: (styles: Partial<ElementStyles>) => void;
  updateElementContent: (content: string) => void;
  updateElementSrc: (src: string) => void;
  addElement: (type: StudioElement['type'], name?: string, presetStyles?: Partial<ElementStyles>, parentId?: string) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  reorderElements: (startIndex: number, endIndex: number) => void;
  moveElement: (draggedId: string, targetParentId: string) => void;

  // Project Management
  savedProjects: StudioProject[];
  saveCurrentProject: () => void;
  createNewProject: (name?: string) => void;
  loadProject: (p: StudioProject) => void;
  deleteProject: (id: string) => void;
  autosaveStatus: string;

  // CSS Variables
  addCssVariable: (name: string, value: string) => void;
  deleteCssVariable: (id: string) => void;
  toggleUseVariables: () => void;

  // UI Modals
  isCodeModalOpen: boolean;
  setIsCodeModalOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isShortcutsOpen: boolean;
  setIsShortcutsOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Design Presets / Random Generator
  applyPresetStyleToSelected: (presetStyle: Partial<ElementStyles>) => void;
  generateRandomElement: () => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<StudioProject>(DEFAULT_PROJECT);
  const [history, setHistory] = useState<StudioProject[]>([DEFAULT_PROJECT]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [selectedElementId, setSelectedElementId] = useState<string>('default-button-1');
  const [activeBreakpoint, setActiveBreakpoint] = useState<Breakpoint>('desktop');
  const [activeState, setActiveState] = useState<'normal' | 'hover' | 'active' | 'focus'>('normal');
  const [zoom, setZoom] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<'editor' | 'builder' | 'dashboard' | 'landing' | 'flexbox' | 'grid' | 'art' | 'challenges' | 'cheatsheet'>('landing');

  const [savedProjects, setSavedProjects] = useState<StudioProject[]>([]);
  const [autosaveStatus, setAutosaveStatus] = useState<string>('Saved');

  // Modals
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load projects and active project from localStorage on mount
  useEffect(() => {
    const list = getSavedProjects();
    setSavedProjects(list);

    if (typeof window !== 'undefined') {
      const activeId = localStorage.getItem('css_studio_active_id');
      if (activeId && list.length > 0) {
        const found = list.find((p) => p.id === activeId);
        if (found) {
          setProject(found);
          setHistory([found]);
          setHistoryIndex(0);
          if (found.elements.length > 1) {
            setSelectedElementId(found.elements[1].id);
          }
        }
      }

      // Sync activeTab with current URL route
      const path = window.location.pathname;
      if (path.includes('/builder')) setActiveTab('builder');
      else if (path.includes('/editor')) setActiveTab('editor');
      else if (path.includes('/dashboard')) setActiveTab('dashboard');
      else if (path.includes('/flexbox')) setActiveTab('flexbox');
      else if (path.includes('/grid')) setActiveTab('grid');
      else if (path.includes('/art')) setActiveTab('art');
      else if (path.includes('/challenges')) setActiveTab('challenges');
      else if (path.includes('/cheatsheet')) setActiveTab('cheatsheet');
      else setActiveTab('landing');
    }
  }, []);

  // Update project state with undo history recording
  const pushProjectState = (newProject: StudioProject) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newProject);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setProject(newProject);

    // Trigger Autosave
    setAutosaveStatus('Saving...');
    setTimeout(() => {
      saveProjectToStorage(newProject);
      setAutosaveStatus('Saved just now');
    }, 600);
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const undo = () => {
    if (canUndo) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setProject(history[prevIndex]);
    }
  };

  const redo = () => {
    if (canRedo) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setProject(history[nextIndex]);
    }
  };

  const selectedElement = project.elements.find((el) => el.id === selectedElementId) || null;

  // Update selected element styles for active breakpoint or active interactive state
  const updateElementStyles = (newStyles: Partial<ElementStyles>) => {
    if (!selectedElement) return;

    const updatedElements = project.elements.map((el) => {
      if (el.id !== selectedElementId) return el;

      if (activeState === 'hover') {
        return { ...el, hoverStyles: { ...(el.hoverStyles || {}), ...newStyles } };
      } else if (activeState === 'active') {
        return { ...el, activeStyles: { ...(el.activeStyles || {}), ...newStyles } };
      } else if (activeState === 'focus') {
        return { ...el, focusStyles: { ...(el.focusStyles || {}), ...newStyles } };
      } else {
        const bpStyles = el.styles[activeBreakpoint] || {};
        return {
          ...el,
          styles: {
            ...el.styles,
            [activeBreakpoint]: { ...bpStyles, ...newStyles },
          },
        };
      }
    });

    pushProjectState({ ...project, elements: updatedElements });
  };

  const updateElementContent = (content: string) => {
    if (!selectedElement) return;
    const updatedElements = project.elements.map((el) => (el.id === selectedElementId ? { ...el, content } : el));
    pushProjectState({ ...project, elements: updatedElements });
  };

  const updateElementSrc = (src: string) => {
    if (!selectedElement) return;
    const updatedElements = project.elements.map((el) => (el.id === selectedElementId ? { ...el, src } : el));
    pushProjectState({ ...project, elements: updatedElements });
  };

  const addElement = (type: StudioElement['type'], name?: string, presetStyles?: Partial<ElementStyles>, parentId?: string) => {
    const newId = `el-${Date.now()}`;
    const targetParentId = parentId || project.rootElementId;

    let defaultContent: string | undefined = undefined;
    if (type === 'button') defaultContent = 'Click Me 🚀';
    else if (type === 'heading') defaultContent = 'Heading Title';
    else if (type === 'paragraph') defaultContent = 'This is a paragraph text block for your website design.';
    else if (type === 'badge') defaultContent = 'New Badge';
    else if (type === 'text') defaultContent = 'Text Block';
    else if (type === 'input') defaultContent = '';

    const defaultTypeStyles: Partial<ElementStyles> =
      type === 'button'
        ? { padding: '12px 24px', borderRadius: '10px', backgroundColor: '#3b82f6', color: '#ffffff', fontWeight: '600', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }
        : type === 'image'
        ? { width: '300px', height: '200px', borderRadius: '12px', overflow: 'hidden' }
        : type === 'section' || type === 'container' || type === 'row' || type === 'column'
        ? { padding: '24px', borderRadius: '12px', backgroundColor: '#1e293b', width: '100%', minHeight: '100px', display: 'flex', flexDirection: type === 'column' ? 'column' : 'row', gap: '16px' }
        : type === 'heading'
        ? { fontSize: '28px', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }
        : type === 'paragraph'
        ? { fontSize: '15px', color: '#94a3b8', lineHeight: '1.6' }
        : type === 'badge'
        ? { padding: '6px 14px', borderRadius: '9999px', backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', fontSize: '12px', fontWeight: '600', display: 'inline-block' }
        : { padding: '16px', borderRadius: '8px', backgroundColor: '#1e293b', color: '#ffffff' };

    const newEl: StudioElement = {
      id: newId,
      name: name || `${type.charAt(0).toUpperCase() + type.slice(1)} ${project.elements.length}`,
      type,
      parentId: targetParentId,
      children: [],
      content: defaultContent,
      src: type === 'image' || type === 'avatar' ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80' : undefined,
      styles: {
        desktop: presetStyles || defaultTypeStyles,
        laptop: {},
        tablet: {},
        mobile: {},
      },
    };

    const updatedElements = [...project.elements, newEl];
    // Add child ID to parent
    const parentIdx = updatedElements.findIndex((el) => el.id === targetParentId);
    if (parentIdx >= 0) {
      const parent = updatedElements[parentIdx];
      updatedElements[parentIdx] = {
        ...parent,
        children: [...(parent.children || []), newId],
      };
    }

    pushProjectState({ ...project, elements: updatedElements });
    setSelectedElementId(newId);
  };

  const deleteElement = (id: string) => {
    if (id === project.rootElementId) return; // Cannot delete canvas root

    let updatedElements = project.elements.filter((el) => el.id !== id);
    // Remove from parent children array
    updatedElements = updatedElements.map((el) => ({
      ...el,
      children: el.children ? el.children.filter((cId) => cId !== id) : [],
    }));

    pushProjectState({ ...project, elements: updatedElements });
    if (selectedElementId === id) {
      setSelectedElementId(project.rootElementId);
    }
  };

  const duplicateElement = (id: string) => {
    const target = project.elements.find((el) => el.id === id);
    if (!target || id === project.rootElementId) return;

    const newId = `el-${Date.now()}`;
    const dup: StudioElement = {
      ...target,
      id: newId,
      name: `${target.name} Copy`,
      children: [],
    };

    const updatedElements = [...project.elements, dup];
    if (target.parentId) {
      const parentIdx = updatedElements.findIndex((el) => el.id === target.parentId);
      if (parentIdx >= 0) {
        const parent = updatedElements[parentIdx];
        updatedElements[parentIdx] = {
          ...parent,
          children: [...(parent.children || []), newId],
        };
      }
    }

    pushProjectState({ ...project, elements: updatedElements });
    setSelectedElementId(newId);
  };

  const reorderElements = (startIndex: number, endIndex: number) => {
    const result = Array.from(project.elements);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    pushProjectState({ ...project, elements: result });
  };

  const moveElement = (draggedId: string, targetParentId: string) => {
    if (draggedId === project.rootElementId || draggedId === targetParentId) return;

    // Remove dragged element from old parent's children array
    const updatedElements = project.elements.map((el) => {
      if (el.children && el.children.includes(draggedId)) {
        return { ...el, children: el.children.filter((id) => id !== draggedId) };
      }
      if (el.id === draggedId) {
        return { ...el, parentId: targetParentId };
      }
      return el;
    });

    // Add dragged element ID to new target parent's children array
    const finalElements = updatedElements.map((el) => {
      if (el.id === targetParentId) {
        const currentChildren = el.children || [];
        if (!currentChildren.includes(draggedId)) {
          return { ...el, children: [...currentChildren, draggedId] };
        }
      }
      return el;
    });

    pushProjectState({ ...project, elements: finalElements });
  };

  const saveCurrentProject = () => {
    saveProjectToStorage(project);
    setSavedProjects(getSavedProjects());
    setAutosaveStatus('Saved manually');
  };

  const createNewProject = (name?: string) => {
    const newProj: StudioProject = {
      ...DEFAULT_PROJECT,
      id: `proj-${Date.now()}`,
      name: name || `Project ${savedProjects.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProjectToStorage(newProj);
    setSavedProjects(getSavedProjects());
    setProject(newProj);
    setHistory([newProj]);
    setHistoryIndex(0);
    setSelectedElementId('default-button-1');
    setActiveTab('editor');
  };

  const loadProject = (p: StudioProject) => {
    setProject(p);
    setHistory([p]);
    setHistoryIndex(0);
    if (p.elements.length > 1) {
      setSelectedElementId(p.elements[1].id);
    } else {
      setSelectedElementId(p.rootElementId);
    }
    setActiveTab('editor');
  };

  const deleteProject = (id: string) => {
    deleteProjectFromStorage(id);
    setSavedProjects(getSavedProjects());
  };

  const addCssVariable = (name: string, value: string) => {
    const newVar: CssVariable = { id: `var-${Date.now()}`, name, value };
    pushProjectState({
      ...project,
      cssVariables: [...project.cssVariables, newVar],
    });
  };

  const deleteCssVariable = (id: string) => {
    pushProjectState({
      ...project,
      cssVariables: project.cssVariables.filter((v) => v.id !== id),
    });
  };

  const toggleUseVariables = () => {
    pushProjectState({
      ...project,
      useVariables: !project.useVariables,
    });
  };

  const applyPresetStyleToSelected = (presetStyle: Partial<ElementStyles>) => {
    updateElementStyles(presetStyle);
  };

  const generateRandomElement = () => {
    const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];
    const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
    const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
    const radii = ['4px', '8px', '16px', '9999px', '24px 8px 24px 8px'];
    const randomRadius = radii[Math.floor(Math.random() * radii.length)];

    const randomStyle: Partial<ElementStyles> = {
      gradientType: 'linear',
      gradientAngle: Math.floor(Math.random() * 360),
      gradientStops: [
        { id: 'rs1', color: randomColor1, position: 0 },
        { id: 'rs2', color: randomColor2, position: 100 },
      ],
      borderRadius: randomRadius,
      boxShadows: [
        {
          id: 'rs-sh',
          x: 0,
          y: 10,
          blur: 25,
          spread: 0,
          color: `${randomColor1}66`,
          inset: false,
        },
      ],
      padding: `${Math.floor(Math.random() * 10 + 10)}px ${Math.floor(Math.random() * 20 + 20)}px`,
      fontSize: `${Math.floor(Math.random() * 6 + 14)}px`,
    };

    updateElementStyles(randomStyle);
  };

  // Keyboard Shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveCurrentProject();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedElementId && selectedElementId !== project.rootElementId) {
          e.preventDefault();
          deleteElement(selectedElementId);
        }
      } else if (e.key === 'Escape') {
        setSelectedElementId(project.rootElementId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history, selectedElementId, project]);

  return (
    <StudioContext.Provider
      value={{
        project,
        setProject,
        selectedElementId,
        setSelectedElementId,
        activeBreakpoint,
        setActiveBreakpoint,
        activeState,
        setActiveState,
        zoom,
        setZoom,
        activeTab,
        setActiveTab,
        canUndo,
        canRedo,
        undo,
        redo,
        selectedElement,
        updateElementStyles,
        updateElementContent,
        updateElementSrc,
        addElement,
        deleteElement,
        duplicateElement,
        reorderElements,
        moveElement,
        savedProjects,
        saveCurrentProject,
        createNewProject,
        loadProject,
        deleteProject,
        autosaveStatus,
        addCssVariable,
        deleteCssVariable,
        toggleUseVariables,
        isCodeModalOpen,
        setIsCodeModalOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isShortcutsOpen,
        setIsShortcutsOpen,
        searchQuery,
        setSearchQuery,
        applyPresetStyleToSelected,
        generateRandomElement,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
};
