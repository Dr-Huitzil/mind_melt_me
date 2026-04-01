import { lazy } from "react";


// Lazy load all apps for better performance and code splitting
const About = lazy(() => import('../components/windows/about'));


//centralized define for all applications and folders
export const appsConfig = {
    About: {
        id: 'about',
        windowName: 'About',
        component: About,
        desktopIcon: require('../assets/desktop-icons/me-icon.png'),
        taskbarIcon: '',
        displayName: 'About',
        showOnDesktop: true,
        showInStartMenu: true
    }
};

// derived lists for UI mapping
export const desktopIcons = Object.values(appsConfig).filter(app => app.showOnDesktop);
export const startMenuApps = Object.values(appsConfig).filter(app => app.showInStartMenu);

// quick lookup mapping for the app container to find which component to render
// it relies on mapping he actual react component to teh `windowName` variable passed to context.
export const windowComponentMap = Object.values(appsConfig).reduce((acc, app) => {
    if (app.component) {
        acc[app.windowName] = app.component;
    }
    return acc;
}, {});