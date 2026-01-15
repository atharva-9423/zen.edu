window.setTheme = function(themeId) {
    document.body.classList.remove('theme-aqua', 'theme-material3', 'theme-dark-glass');
    if (themeId !== 'dark-glass') {
        document.body.classList.add(`theme-${themeId}`);
    }
    localStorage.setItem('app-theme', themeId);
    updateThemeSelection(themeId);
    
    // Communicate with parent if needed, or just go back
    setTimeout(() => window.history.back(), 300);
};

function updateThemeSelection(themeId) {
    const items = document.querySelectorAll('.settings-item');
    items.forEach(item => {
        const onclick = item.getAttribute('onclick');
        if (onclick && onclick.includes(`'${themeId}'`)) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('app-theme') || 'aqua';
    updateThemeSelection(currentTheme);
    if (currentTheme !== 'dark-glass') {
        document.body.classList.add(`theme-${currentTheme}`);
    }
});