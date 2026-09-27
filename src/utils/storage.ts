import { StudioProject } from '@/types/css-studio';

const PROJECTS_KEY = 'css_studio_projects';
const ACTIVE_PROJECT_KEY = 'css_studio_active_id';

export function getSavedProjects(): StudioProject[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load projects from localStorage', e);
    return [];
  }
}

export function saveProjectToStorage(project: StudioProject): void {
  if (typeof window === 'undefined') return;
  try {
    const projects = getSavedProjects();
    const index = projects.findIndex((p) => p.id === project.id);
    const updated = { ...project, updatedAt: new Date().toISOString() };

    if (index >= 0) {
      projects[index] = updated;
    } else {
      projects.push(updated);
    }
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    localStorage.setItem(ACTIVE_PROJECT_KEY, project.id);
  } catch (e) {
    console.error('Failed to save project to localStorage', e);
  }
}

export function deleteProjectFromStorage(projectId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const projects = getSavedProjects().filter((p) => p.id !== projectId);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to delete project', e);
  }
}

export function encodeProjectToUrlHash(project: StudioProject): string {
  try {
    const str = JSON.stringify(project);
    return btoa(encodeURIComponent(str));
  } catch (e) {
    return '';
  }
}

export function decodeProjectFromUrlHash(hash: string): StudioProject | null {
  try {
    const decoded = decodeURIComponent(atob(hash));
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}
