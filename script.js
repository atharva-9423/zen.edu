const courses = [
    {
        id: 1,
        title: "Figma Design app",
        instructor: "Mark Jones",
        category: "Special",
        type: "featured",
        lessons: 8,
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400",
        content: ["Introduction", "Tools", "Components", "Prototyping"]
    },
    {
        id: 2,
        title: "Java Script",
        category: "Free",
        type: "popular",
        class: "js",
        level: "Beginner",
        lessons: "3/4",
        content: ["Variables", "Functions", "Arrays", "Objects"]
    },
    {
        id: 3,
        title: "Java",
        category: "Special",
        type: "popular",
        class: "java",
        level: "Medium",
        lessons: "3/4",
        content: ["Syntax", "OOP", "Collections", "Streams"]
    }
];

let completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || {};

// Passcode Logic
let currentPasscode = '';
const CORRECT_PASSCODE = '1234';

window.handleNum = function(num) {
    if (currentPasscode.length < 4) {
        currentPasscode += num;
        updateDots();
        updateActionButton();
    }
};

window.handleAction = function() {
    if (currentPasscode.length < 4) {
        // Backspace logic
        currentPasscode = currentPasscode.slice(0, -1);
        updateDots();
        updateActionButton();
    } else {
        // Enter logic
        if (currentPasscode === CORRECT_PASSCODE) {
            sessionStorage.setItem('unlocked', 'true');
            document.getElementById('passcode-screen').style.display = 'none';
        } else {
            handleError();
        }
    }
};

window.filterCourses = function(category, element) {
    if (element.classList.contains('active')) return;
    
    // Update active UI
    document.querySelectorAll('.category-chip').forEach(chip => chip.classList.remove('active'));
    element.classList.add('active');

    // Filter logic
    const popularGrid = document.getElementById('popular-grid');
    if (!popularGrid) return;

    const filtered = category === 'All' 
        ? courses.filter(c => c.type === 'popular')
        : courses.filter(c => c.type === 'popular' && c.category === category);

    popularGrid.innerHTML = filtered.map(course => `
        <div class="small-card ${course.class}" onclick="window.openCourse(${course.id})">
            <div class="top-row">
                <div class="lang-icon">${course.title.includes('Java Script') ? 'JS' : 'J'}</div>
                <div class="level">${course.level}</div>
            </div>
            <div>
                <div class="title">${course.title}</div>
                <div class="lessons">Lessons: ${course.lessons}</div>
            </div>
        </div>
    `).join('');
};

window.toggleSettings = function(show) {
    const settingsPage = document.getElementById('settings-page');
    if (!settingsPage) return;
    
    if (show) {
        settingsPage.style.display = 'flex';
        // Force reflow
        settingsPage.offsetHeight;
        settingsPage.classList.add('active');
    } else {
        settingsPage.classList.remove('active');
        setTimeout(() => {
            if (!settingsPage.classList.contains('active')) {
                settingsPage.style.display = 'none';
            }
        }, 400);
    }
};

window.toggleThemePage = function(show) {
    const themePage = document.getElementById('theme-page');
    if (!themePage) return;
    
    if (show) {
        themePage.style.display = 'flex';
        themePage.offsetHeight;
        themePage.classList.add('active');
        // Mark current theme as selected
        const currentTheme = localStorage.getItem('app-theme') || 'dark-glass';
        updateThemeSelection(currentTheme);
    } else {
        themePage.classList.remove('active');
        setTimeout(() => {
            if (!themePage.classList.contains('active')) {
                themePage.style.display = 'none';
            }
        }, 400);
    }
};

// Material 3 Color Palettes
const M3_PALETTES = [
    {
        primary: '#D7FF3D',
        onPrimary: '#000000',
        secondary: '#C1E1C1',
        onSecondary: '#000000',
        tertiary: '#B0BEC5',
        onTertiary: '#000000',
        container: '#121212',
        onContainer: '#FFFFFF'
    },
    {
        primary: '#2196F3', // Blue
        onPrimary: '#FFFFFF',
        secondary: '#BBDEFB',
        onSecondary: '#000000',
        tertiary: '#E3F2FD',
        onTertiary: '#000000',
        container: '#101824',
        onContainer: '#FFFFFF'
    },
    {
        primary: '#FFC107', // Amber
        onPrimary: '#000000',
        secondary: '#FFECB3',
        onSecondary: '#000000',
        tertiary: '#FFF8E1',
        onTertiary: '#000000',
        container: '#1A1610',
        onContainer: '#FFFFFF'
    },
    {
        primary: '#607D8B', // Blue Grey
        onPrimary: '#FFFFFF',
        secondary: '#CFD8DC',
        onSecondary: '#000000',
        tertiary: '#ECEFF1',
        onTertiary: '#000000',
        container: '#1A1D1F',
        onContainer: '#FFFFFF'
    },
    {
        primary: '#6750A4', // Purple
        onPrimary: '#FFFFFF',
        secondary: '#EADDFF',
        onSecondary: '#000000',
        tertiary: '#FFD8E4',
        onTertiary: '#000000',
        container: '#140E1D',
        onContainer: '#FFFFFF'
    },
    {
        primary: '#7D5260', // Rose/Brown
        onPrimary: '#FFFFFF',
        secondary: '#FFD9E3',
        onSecondary: '#000000',
        tertiary: '#EADDFF',
        onTertiary: '#000000',
        container: '#1D1216',
        onContainer: '#FFFFFF'
    }
];

function applyRandomM3Palette() {
    const palette = M3_PALETTES[Math.floor(Math.random() * M3_PALETTES.length)];
    const root = document.documentElement;
    root.style.setProperty('--m3-primary', palette.primary);
    root.style.setProperty('--m3-on-primary', palette.onPrimary);
    root.style.setProperty('--m3-secondary', palette.secondary);
    root.style.setProperty('--m3-on-secondary', palette.onSecondary);
    root.style.setProperty('--m3-tertiary', palette.tertiary);
    root.style.setProperty('--m3-on-tertiary', palette.onTertiary);
    root.style.setProperty('--m3-container', palette.container);
    root.style.setProperty('--m3-on-container', palette.onContainer);
}

window.setTheme = function(themeId) {
    document.body.classList.remove('theme-aqua', 'theme-material3', 'theme-dark-glass');
    if (themeId !== 'dark-glass') {
        document.body.classList.add(`theme-${themeId}`);
    }
    
    if (themeId === 'material3') {
        applyRandomM3Palette();
    }
    
    localStorage.setItem('app-theme', themeId);
    updateThemeSelection(themeId);
    
    // Optional: Auto close or feedback
    setTimeout(() => window.toggleThemePage(false), 300);
};

function updateThemeSelection(themeId) {
    const items = document.querySelectorAll('#theme-page .settings-item');
    items.forEach(item => {
        const onclick = item.getAttribute('onclick');
        if (onclick && onclick.includes(`'${themeId}'`)) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

// Initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('app-theme') || 'aqua';
    window.setTheme(savedTheme);
});

// Add touch events for immediate feedback on mobile
document.addEventListener('DOMContentLoaded', () => {
    const numButtons = document.querySelectorAll('.num-btn, .enter-btn');
    numButtons.forEach(btn => {
        btn.addEventListener('touchstart', function(e) {
            // No preventDefault to allow click to still fire for logic
            this.classList.add('active-touch');
        }, {passive: true});
        
        btn.addEventListener('touchend', function() {
            this.classList.remove('active-touch');
        }, {passive: true});

        btn.addEventListener('touchcancel', function() {
            this.classList.remove('active-touch');
        }, {passive: true});
    });
});

function handleError() {
    const dots = document.querySelectorAll('.dot');
    const display = document.querySelector('.passcode-display');
    
    // Turn red and shake
    display.classList.add('shaking');
    dots.forEach(dot => dot.classList.add('error'));
    
    setTimeout(() => {
        // Collapse and fade out
        dots.forEach(dot => dot.classList.add('collapse'));
        
        setTimeout(() => {
            // Reset state
            currentPasscode = '';
            display.classList.remove('shaking');
            dots.forEach(dot => {
                dot.classList.remove('error', 'collapse', 'active');
            });
            updateActionButton();
        }, 500);
    }, 400);
}

function updateActionButton() {
    const btn = document.getElementById('action-btn');
    if (!btn) return;
    
    if (currentPasscode.length < 4) {
        btn.innerHTML = '<i class="fa-solid fa-delete-left"></i>';
    } else {
        btn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i>';
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        if (idx < currentPasscode.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function checkLock() {
    const isUnlocked = sessionStorage.getItem('unlocked');
    const screen = document.getElementById('passcode-screen');
    if (isUnlocked === 'true') {
        if (screen) screen.style.display = 'none';
    }
}

function renderApp() {
    const featured = document.getElementById('featured-course');
    const popularGrid = document.getElementById('popular-grid');
    
    if (featured) {
        const fCourse = courses.find(c => c.type === 'featured');
        featured.innerHTML = `
            <div onclick="window.openCourse(${fCourse.id})">
                <div class="card-content">
                    <span class="badge">Design course</span>
                    <h2>${fCourse.title}</h2>
                    <p class="instructor">By ${fCourse.instructor}</p>
                    <div class="action-row">
                        <div class="icon-circle"><i class="bi bi-bookmark"></i></div>
                        <div class="icon-circle"><i class="bi bi-heart"></i></div>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" class="img-overlay">
            </div>
        `;
    }

    if (popularGrid) {
        popularGrid.innerHTML = courses.filter(c => c.type === 'popular').map(course => `
            <div class="small-card ${course.class}" onclick="window.openCourse(${course.id})">
                <div class="top-row">
                    <div class="lang-icon">${course.title.includes('Java Script') ? 'JS' : 'J'}</div>
                    <div class="level">${course.level}</div>
                </div>
                <div>
                    <div class="title">${course.title}</div>
                    <div class="lessons">Lessons: ${course.lessons}</div>
                </div>
            </div>
        `).join('');
    }
}

window.openCourse = function(id) {
    const course = courses.find(c => c.id === id);
    const modal = document.getElementById('course-modal');
    const body = document.getElementById('modal-body');
    
    if (!course || !modal || !body) return;

    let lessonHtml = '';
    course.content.forEach((lesson, idx) => {
        const key = `${id}-${idx}`;
        const isDone = completedLessons[key];
        lessonHtml += `
            <div class="lesson-item">
                <span>${lesson}</span>
                <button class="complete-btn ${isDone ? 'done' : ''}" onclick="event.stopPropagation(); window.toggleLesson(${id}, ${idx})">
                    ${isDone ? 'Done' : 'Complete'}
                </button>
            </div>
        `;
    });

    body.innerHTML = `
        <h2 style="margin-bottom: 16px;">${course.title}</h2>
        <div class="lesson-list">
            ${lessonHtml}
        </div>
    `;
    modal.style.display = 'block';
};

window.toggleLesson = function(courseId, lessonIdx) {
    const key = `${courseId}-${lessonIdx}`;
    completedLessons[key] = !completedLessons[key];
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
    window.openCourse(courseId);
};

document.addEventListener('DOMContentLoaded', () => {
    checkLock();
    renderApp(); 
    console.log("App rendered.");

    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.onclick = () => {
            document.getElementById('course-modal').style.display = 'none';
        };
    }

    window.onclick = (event) => {
        const modal = document.getElementById('course-modal');
        if (event.target == modal) modal.style.display = 'none';
    };

    // Search Logic
    const searchInput = document.querySelector('.search-input');
    const clearBtn = document.querySelector('.clear-search');

    if (searchInput && clearBtn) {
        searchInput.addEventListener('focus', () => {
            document.body.classList.add('searching');
        });

        searchInput.addEventListener('blur', (e) => {
            // Delay blur if clicking clear to allow the click event to fire
            setTimeout(() => {
                if (document.activeElement !== searchInput) {
                    document.body.classList.remove('searching');
                }
            }, 100);
        });

        searchInput.addEventListener('input', () => {
            if (searchInput.value.length > 0) {
                clearBtn.style.visibility = 'visible';
            } else {
                clearBtn.style.visibility = 'hidden';
            }
        });

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.style.visibility = 'hidden';
            searchInput.focus();
        });
    }
});