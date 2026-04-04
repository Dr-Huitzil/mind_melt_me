import { lazy } from 'react';

// Lazy load all window components
const About = lazy(() => import('../components/windows/about'));
const ChatboxWindow = lazy(() => import('../components/windows/ChatboxWindow'));
const CalculatorWindow = lazy(() => import('../components/windows/CalculatorWindow'));
const FileManagerWindow = lazy(() => import('../components/windows/FileManagerWindow'));
const PaintWindow = lazy(() => import('../components/windows/PaintWindow'));
const RecycleBinWindow = lazy(() => import('../components/windows/RecycleBinWindow'));
const MusicPlayerWindow = lazy(() => import('../components/windows/MusicPlayerWindow'));
const NotepadWindow = lazy(() => import('../components/windows/NotepadWindow'));
const VideoPlayerWindow = lazy(() => import('../components/windows/VideoPlayerWindow'));
const ContactWindow = lazy(() => import('../components/windows/ContactWindow'));
const PowerOptionsWindow = lazy(() => import('../components/windows/PowerOptionsWindow'));
const SettingsWindow = lazy(() => import('../components/windows/SettingsWindow'));

// Centralized define for all applications and folders
export const appsConfig = {
    About: {
        id: 'about',
        windowName: 'About',
        component: About,
        desktopIcon: require('../assets/desktop-icons/me-icon.png'),
        taskbarIcon: '👤',
        displayName: 'About',
        showOnDesktop: true,
        showInStartMenu: true
    },
    Chatbox: {
        id: 'chat',
        windowName: 'Chatbox',
        component: ChatboxWindow,
        desktopIcon: require('../assets/desktop-icons/kirby1.jpg'),
        taskbarIcon: '💬',
        displayName: 'Chatbox',
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
    Notepad: {
        id: 'notepad',
        windowName: 'Notepad',
        component: NotepadWindow,
        desktopIcon: require('../assets/desktop-icons/kirby4.jpg'),
        taskbarIcon: '📝',
        displayName: 'Notepad',
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
    },
    RecycleBin: {
        id: 'recycle',
        windowName: 'RecycleBin',
        component: RecycleBinWindow,
        desktopIcon: require('../assets/desktop-icons/kirby3.png'),
        displayName: 'Recycle Bin',
        showOnDesktop: true,
        showInStartMenu: false
    },
    FileManager: {
        id: 'filemanager',
        windowName: 'FileManager',
        component: FileManagerWindow,
        showOnDesktop: false,
        showInStartMenu: false
    },
    MyDocuments: {
        id: 'documents',
        windowName: 'FileManager',
        props: { initialPath: 'C:\\Documents' },
        desktopIcon: require('../assets/desktop-icons/kirby4.jpg'),
        taskbarIcon: '📄',
        displayName: 'My Documents',
        showOnDesktop: true,
        showInStartMenu: true
    },
    MyPictures: {
        id: 'images',
        windowName: 'FileManager',
        props: { initialPath: 'C:\\Pictures' },
        desktopIcon: require('../assets/desktop-icons/kirby2.jpg'),
        taskbarIcon: '🖼️',
        displayName: 'My Pictures',
        showOnDesktop: true,
        showInStartMenu: true
    },
    MyMusic: {
        id: 'music',
        windowName: 'FileManager',
        props: { initialPath: 'C:\\Music' },
        desktopIcon: require('../assets/desktop-icons/kirby5.jpg'),
        taskbarIcon: '🎵',
        displayName: 'My Music',
        showOnDesktop: true,
        showInStartMenu: true
    },
    MyVideos: {
        id: 'video',
        windowName: 'FileManager',
        props: { initialPath: 'C:\\Videos' },
        desktopIcon: require('../assets/desktop-icons/kirby6.png'),
        taskbarIcon: '🎬',
        displayName: 'My Videos',
        showOnDesktop: true,
        showInStartMenu: true
    },
    DesktopFolder: {
        id: 'desktop',
        windowName: 'FileManager',
        props: { initialPath: 'C:\\Desktop' },
        desktopIcon: require('../assets/desktop-icons/kirby1.jpg'),
        displayName: 'Desktop Folder',
        showOnDesktop: true,
        showInStartMenu: false
    },
    Shop: {
        id: 'shop',
        windowName: 'Shop',
        desktopIcon: require('../assets/desktop-icons/kirby3.png'),
        taskbarIcon: '🛒',
        displayName: 'Shop',
        showOnDesktop: true,
        showInStartMenu: true
    },
    PowerOptions: {
        id: 'power',
        windowName: 'PowerOptions',
        component: PowerOptionsWindow,
        displayName: 'Power Settings',
        showOnDesktop: false,
        showInStartMenu: false
    },
    Settings: {
        id: 'settings',
        windowName: 'Settings',
        component: SettingsWindow,
        displayName: 'Settings',
        showOnDesktop: false,
        showInStartMenu: false
    },
    MusicPlayer: {
        id: 'music-player',
        windowName: 'MusicPlayer',
        component: MusicPlayerWindow,
        displayName: 'Media Player',
        showOnDesktop: false,
        showInStartMenu: false
    },
    VideoPlayer: {
        id: 'video-player',
        windowName: 'VideoPlayer',
        component: VideoPlayerWindow,
        displayName: 'Video Player',
        showOnDesktop: false,
        showInStartMenu: false
    },
    Paint: {
        id: 'paint',
        windowName: 'Paint',
        component: PaintWindow,
        displayName: 'Paint',
        showOnDesktop: false,
        showInStartMenu: false
    }
};

// Derived lists for UI mapping
export const desktopIcons = Object.values(appsConfig).filter(app => app.showOnDesktop);
export const startMenuItems = Object.values(appsConfig).filter(app => app.showInStartMenu);

// Quick lookup mapping for the App container to find which component to render
// It relies on mapping the actual React Component to the `windowName` variable passed to Context.
export const windowComponentsMap = Object.values(appsConfig).reduce((acc, app) => {
    if (app.component) {
        acc[app.windowName] = app.component;
    }
    return acc;
}, {});
