'use strict';

const getStoredTheme = () => localStorage.getItem('theme');
const setStoredTheme = theme => localStorage.setItem('theme', theme);

const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
        return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = theme => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    const themeIcon = theme === 'dark' ? 'assets/icons/sun.svg' : 'assets/icons/moon.svg';
    document.getElementById('bd-theme-text').innerHTML = `<img src="${themeIcon}" alt="${theme} icon">`;
};

setTheme(getPreferredTheme());

window.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('bd-theme');

    themeButton.addEventListener('click', () => {
        const currentTheme = getStoredTheme() || getPreferredTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setStoredTheme(newTheme);
        setTheme(newTheme);
    });
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme();
    if (!storedTheme) {
        setTheme(getPreferredTheme());
    }
});


function showProjects(category, button) {

    const projects = document.querySelectorAll('.project');
    projects.forEach(project => project.style.display = 'none');
    
    const selectedProjects = document.querySelectorAll(`.${category}`);
    selectedProjects.forEach(project => project.style.display = 'block');
    
    const buttons = document.querySelectorAll('.btn-outline-primary');
    buttons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');
}

showProjects('html', document.querySelector('.btn-outline-primary.active'));