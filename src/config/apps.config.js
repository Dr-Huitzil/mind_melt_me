import { lazy } from "react";


// Lazy load all apps for better performance and code splitting
const About = lazy(() => import('../components/windows/about'));
const CalculatorWindow = lazy(() => import('../components/windows/CalculatorWindow'));
const ContactWindow = lazy(() => import('../components/windows/ContactWindow'));

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
    },
    Calculator: {
        id: 'calculator',
        windowName: 'Calculator',
        component: CalculatorWindow,
        desktopIcon: require('../assets/desktop-icons/kirby2.jpg'),
        taskbarIcon: '🧮',
        displayName: 'Calculator',
        showOnDesktop: true,
        showInStartMenu: true
    },
    Contact: {
        id: 'contact',
        windowName: 'Contact',
        component: ContactWindow,
        desktopIcon: require('../assets/desktop-icons/kirby1.jpg'),
        taskbarIcon: '📇',
        displayName: 'Contact',
        showOnDesktop: true,
        showInStartMenu: true
    }
};

// derived lists for UI mapping
export const desktopIcons = Object.values(appsConfig).filter(app => app.showOnDesktop);
export const startMenuItems = Object.values(appsConfig).filter(app => app.showInStartMenu);

// quick lookup mapping for the app container to find which component to render
// it relies on mapping he actual react component to teh `windowName` variable passed to context.
export const windowComponentMap = Object.values(appsConfig).reduce((acc, app) => {
    if (app.component) {
        acc[app.windowName] = app.component;
    }
    return acc;
}, {});