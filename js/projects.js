// Projects page functionality
class ProjectsManager {
    constructor() {
        this.filters = document.getElementById('projectFilters');
        this.projectsGrid = document.getElementById('projectsGrid');
        this.noResults = document.getElementById('noResults');
        this.projects = [];
        this.activeFilter = 'tous';
        
        this.init();
    }

    init() {
        if (this.filters && this.projectsGrid) {
            this.collectProjects();
            this.bindEvents();
            this.filterProjects();
        }
    }

    collectProjects() {
        const projectCards = this.projectsGrid.querySelectorAll('.project-card');
        this.projects = Array.from(projectCards).map(card => ({
            element: card,
            type: card.dataset.type,
            year: card.dataset.year,
            location: card.dataset.location
        }));
    }

    bindEvents() {
        this.filters.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.handleFilterClick(e.target);
            }
        });

        // Keyboard navigation for filters
        this.filters.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target.classList.contains('filter-btn')) {
                    e.preventDefault();
                    this.handleFilterClick(e.target);
                }
            }
        });
    }

    handleFilterClick(button) {
        // Update active filter
        this.filters.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Get filter value
        this.activeFilter = button.dataset.filter;
        
        // Filter projects
        this.filterProjects();

        // Announce change to screen readers
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            const visibleCount = this.getVisibleProjectsCount();
            liveRegion.textContent = `Filtre appliqué: ${button.textContent}. ${visibleCount} projet(s) affiché(s).`;
        }
    }

    filterProjects() {
        let visibleCount = 0;

        this.projects.forEach(project => {
            const shouldShow = this.activeFilter === 'tous' || project.type === this.activeFilter;
            
            if (shouldShow) {
                project.element.style.display = 'block';
                // Add animation
                project.element.style.opacity = '0';
                project.element.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    project.element.style.opacity = '1';
                    project.element.style.transform = 'translateY(0)';
                }, visibleCount * 100); // Stagger animation
                
                visibleCount++;
            } else {
                project.element.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (this.noResults) {
            this.noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }

        // Update URL without page reload
        this.updateURL();
    }

    getVisibleProjectsCount() {
        return this.projects.filter(project => 
            this.activeFilter === 'tous' || project.type === this.activeFilter
        ).length;
    }

    updateURL() {
        const url = new URL(window.location);
        if (this.activeFilter === 'tous') {
            url.searchParams.delete('filter');
        } else {
            url.searchParams.set('filter', this.activeFilter);
        }
        window.history.replaceState({}, '', url);
    }

    // Initialize from URL parameters
    initFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');
        
        if (filterParam) {
            const filterButton = this.filters.querySelector(`[data-filter="${filterParam}"]`);
            if (filterButton) {
                this.handleFilterClick(filterButton);
            }
        }
    }
}

// Search functionality (if needed in the future)
class ProjectSearch {
    constructor() {
        this.searchInput = document.getElementById('projectSearch');
        this.projects = [];
        this.init();
    }

    init() {
        if (this.searchInput) {
            this.collectProjects();
            this.bindEvents();
        }
    }

    collectProjects() {
        const projectCards = document.querySelectorAll('.project-card');
        this.projects = Array.from(projectCards).map(card => ({
            element: card,
            title: card.querySelector('h3').textContent.toLowerCase(),
            description: card.querySelector('p').textContent.toLowerCase(),
            location: card.dataset.location || '',
            type: card.dataset.type || ''
        }));
    }

    bindEvents() {
        let searchTimeout;
        
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });
    }

    performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Show all projects
            this.projects.forEach(project => {
                project.element.style.display = 'block';
            });
            return;
        }

        let visibleCount = 0;

        this.projects.forEach(project => {
            const matches = 
                project.title.includes(searchTerm) ||
                project.description.includes(searchTerm) ||
                project.location.includes(searchTerm) ||
                project.type.includes(searchTerm);

            if (matches) {
                project.element.style.display = 'block';
                visibleCount++;
            } else {
                project.element.style.display = 'none';
            }
        });

        // Update no results message
        const noResults = document.getElementById('noResults');
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
                noResults.textContent = `Aucun projet trouvé pour "${query}".`;
            } else {
                noResults.style.display = 'none';
            }
        }

        // Announce to screen readers
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = `Recherche effectuée: ${visibleCount} projet(s) trouvé(s) pour "${query}".`;
        }
    }
}

// Sort functionality
class ProjectSorter {
    constructor() {
        this.sortSelect = document.getElementById('projectSort');
        this.projectsGrid = document.getElementById('projectsGrid');
        this.projects = [];
        this.init();
    }

    init() {
        if (this.sortSelect && this.projectsGrid) {
            this.collectProjects();
            this.bindEvents();
        }
    }

    collectProjects() {
        const projectCards = this.projectsGrid.querySelectorAll('.project-card');
        this.projects = Array.from(projectCards).map(card => ({
            element: card,
            title: card.querySelector('h3').textContent,
            year: parseInt(card.dataset.year) || 0,
            location: card.dataset.location || ''
        }));
    }

    bindEvents() {
        this.sortSelect.addEventListener('change', (e) => {
            this.sortProjects(e.target.value);
        });
    }

    sortProjects(sortBy) {
        let sortedProjects = [...this.projects];

        switch (sortBy) {
            case 'year-desc':
                sortedProjects.sort((a, b) => b.year - a.year);
                break;
            case 'year-asc':
                sortedProjects.sort((a, b) => a.year - b.year);
                break;
            case 'title-asc':
                sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                sortedProjects.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'location-asc':
                sortedProjects.sort((a, b) => a.location.localeCompare(b.location));
                break;
            default:
                // Keep original order
                break;
        }

        // Reorder DOM elements
        sortedProjects.forEach(project => {
            this.projectsGrid.appendChild(project.element);
        });

        // Add staggered animation
        sortedProjects.forEach((project, index) => {
            project.element.style.opacity = '0';
            project.element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                project.element.style.opacity = '1';
                project.element.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const projectsManager = new ProjectsManager();
    
    // Initialize from URL parameters
    projectsManager.initFromURL();
    
    // Initialize other features if elements exist
    new ProjectSearch();
    new ProjectSorter();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const projectsManager = new ProjectsManager();
    projectsManager.initFromURL();
});