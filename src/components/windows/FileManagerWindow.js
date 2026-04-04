import React, { useState } from 'react';
import WindowFrame from './WindowFrame';

import { db } from '../../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import '../../styles/windows/FileManagerWindow.css';

const FileManagerWindow = ({ initialPath = 'C:\\', onClose, onMinimize, zIndex, onFocus, minimized, onLaunchApp }) => {
    const [currentPath, setCurrentPath] = useState(initialPath);
    const [selectedItem, setSelectedItem] = useState(null);
    const [expandedNodes, setExpandedNodes] = useState(new Set(['C:\\']));

    const [fileSystem, setFileSystem] = useState({
        /* =========================================================
           FILE SYSTEM TEMPLATE / GUIDE
           ---------------------------------------------------------
           To create new hardcoded folders, follow this pattern:
           
           1. First, add the folder name as a string to the 'children' 
              array of its parent directory. 
              (e.g., inside 'Documents', add 'My_New_Folder')
              
           2. Then, define that new folder's own dictionary entry using 
              its full path as the key.
              (e.g., 'Documents\\My_New_Folder': { type: 'dir', name: 'My_New_Folder', children: [] })
              
           3. To add files, add an object to a folder's 'children' array:
              { name: 'file.txt', size: '2 KB', date: '01/01/95' }
           ========================================================= */

        'C:\\': { type: 'dir', name: 'C:\\', children: ['Desktop', 'Documents', 'Pictures', 'Music', 'Videos'] },
        'Desktop': { type: 'dir', name: 'Desktop', children: [{ name: 'about.txt', size: '2 KB', date: '10/25/08' }, { name: 'calculator.exe', size: '43 KB', date: '11/1/93' }] },

        'Documents': { type: 'dir', name: 'Documents', children: ['Work', 'Personal', { name: 'resume.doc', size: '24 KB', date: '10/25/08' }, { name: 'notes.txt', size: '1 KB', date: '5/26/95' }] },
        'Documents\\Work': { type: 'dir', name: 'Work', children: [{ name: 'report.doc', size: '45 KB', date: '1/4/99' }] },
        'Documents\\Personal': { type: 'dir', name: 'Personal', children: [] },

        'Pictures': { type: 'dir', name: 'Pictures', children: ['Vacation_1995', { name: 'kirby.bmp', size: '630 B', date: '11/1/93' }] },
        'Pictures\\Vacation_1995': { type: 'dir', name: 'Vacation_1995', children: [{ name: 'vacation.bmp', size: '144 KB', date: '11/1/93' }] },

        'Music': { type: 'dir', name: 'Music', children: ['Classics', 'Favorites', { name: 'canyon.mid', size: '33 KB', date: '11/1/93' }, { name: 'sound.wav', size: '11 KB', date: '11/1/93' }] },
        'Music\\Classics': { type: 'dir', name: 'Classics', children: [{ name: 'beethoven.mid', size: '22 KB', date: '10/2/94' }] },
        'Music\\Favorites': { type: 'dir', name: 'Favorites', children: [] },

        'Videos': { type: 'dir', name: 'Videos', children: ['Home_Movies', { name: 'home_movie.avi', size: '1485 KB', date: '8/28/05' }] },
        'Videos\\Home_Movies': { type: 'dir', name: 'Home_Movies', children: [{ name: 'birthday.avi', size: '2048 KB', date: '5/2/01' }] }
    });

    // Dynamically poll Firebase for external files stored remotely
    React.useEffect(() => {
        const fetchRemoteFiles = async () => {
            if (!db) return; // Fallback safely to mock local FS if user has not entered Firebase APIs yet
            try {
                // Fetch ALL files to bypass string-escaping issues with backslashes in Firebase Console
                const q = query(collection(db, 'files'));
                const querySnapshot = await getDocs(q);

                const remoteFiles = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    // Provide defaults for size and date to match the OS aesthetic
                    if (!data.size) data.size = '1234 KB';
                    if (!data.date) data.date = 'Today';

                    // Extremely resilient matching: check if folderLoc contains the folder name
                    const targetFolder = data.folderLoc ? data.folderLoc.replace(/\\/g, '') : '';
                    const currentFolderClean = currentPath.replace(/\\/g, '');

                    if (targetFolder === currentFolderClean) {
                        remoteFiles.push(data);
                    }
                });

                setFileSystem(prev => {
                    // Filter out previous remote files to prevent infinitely duplicating the list every render
                    const folderKey = currentPath === 'C:\\' ? 'C:\\' : currentPath.replace('C:\\', '');
                    const existingChildren = prev[folderKey]?.children || [];
                    const originalLocalChildren = existingChildren.filter(item => typeof item === 'string' || !item.url); // Mocks don't have .url

                    return {
                        ...prev,
                        [folderKey]: {
                            ...prev[folderKey],
                            children: [...originalLocalChildren, ...remoteFiles] // Merge local dummy strings with remote Firestore API objects
                        }
                    };
                });
            } catch (err) {
                console.error("Failed fetching directory from Firebase:", err);
            }
        };

        fetchRemoteFiles();
    }, [currentPath]);

    const handleFileDoubleClick = (item) => {
        const isFolder = typeof item === 'string';
        const itemName = isFolder ? item : item.name;
        // If it has a cloud URL, prefer that!
        const targetUrl = item.url ? item.url : itemName;

        const fileToApp = {
            'calculator.exe': 'Calculator'
        };
        const isPicture = itemName.endsWith('.bmp') || itemName.endsWith('.jpg') || itemName.endsWith('.png') || itemName.endsWith('.gif');
        const isAudio = itemName.endsWith('.mid') || itemName.endsWith('.wav') || itemName.endsWith('.mp3');
        const isText = itemName.endsWith('.txt') || itemName.endsWith('.ini') || itemName.endsWith('.log');
        const isVideo = itemName.endsWith('.mp4') || itemName.endsWith('.mov') || itemName.endsWith('.avi') || itemName.endsWith('.MTS');

        if (isPicture && onLaunchApp) {
            onLaunchApp('Paint', { targetFile: targetUrl, fileTitle: itemName });
        } else if (isAudio && onLaunchApp) {
            onLaunchApp('MusicPlayer', { targetFile: targetUrl, fileTitle: itemName });
        } else if (isVideo && onLaunchApp) {
            onLaunchApp('VideoPlayer', { targetFile: targetUrl, fileTitle: itemName });
        } else if (isText && onLaunchApp) {
            if (itemName === 'about.txt') {
                onLaunchApp('Notepad', { targetFile: targetUrl, fileTitle: itemName });
            } else {
                onLaunchApp('Notepad', { targetFile: targetUrl, fileTitle: itemName });
            }
        } else if (fileToApp[itemName] && onLaunchApp) {
            onLaunchApp(fileToApp[itemName]);
        } else if (!fileToApp[itemName] && !itemName.includes('.')) {
            // It's a folder, open it relative to current path!
            handleNodeClick(itemName, true);
        } else {
            alert(`No application associated with ${itemName}.`);
        }
    };

    // Resolve current directory contents
    // If the path is C:\, show top level dirs. If it's a specific dir, show its files.
    let folderKey = currentPath === 'C:\\' ? 'C:\\' : currentPath.replace('C:\\', '');
    const currentDirectory = fileSystem[folderKey] || { children: [] };

    const handleNodeClick = (folderPath, isRelative = false) => {
        let newPath;
        if (folderPath.startsWith('C:\\')) {
            newPath = folderPath;
        } else if (isRelative) {
            newPath = currentPath === 'C:\\' ? `C:\\${folderPath}` : `${currentPath}\\${folderPath}`;
        } else {
            newPath = `C:\\${folderPath}`;
        }
        setCurrentPath(newPath);

        setExpandedNodes(prev => {
            const next = new Set(prev);
            let walks = newPath.split('\\');
            let built = '';
            walks.forEach((part, idx) => {
                if (idx === 0) {
                    built = 'C:\\';
                } else {
                    built = built === 'C:\\' ? `C:\\${part}` : `${built}\\${part}`;
                }
                next.add(built);
            });
            return next;
        });

        setSelectedItem(null);
    };

    const toggleExpand = (dirPath, e) => {
        e.stopPropagation();
        setExpandedNodes(prev => {
            const next = new Set(prev);
            if (next.has(dirPath)) {
                next.delete(dirPath);
            } else {
                next.add(dirPath);
            }
            return next;
        });
    };

    // Recursive component function to render the classic DOS/Win3.1 left-pane tree
    const renderTreeLevel = (dirPath) => {
        // Find the dictionary entry for this level
        const dirKey = dirPath === 'C:\\' ? 'C:\\' : dirPath.replace('C:\\', '');
        const currentDirContent = fileSystem[dirKey];
        if (!currentDirContent) return null;

        // Extract subfolders
        const subFolders = currentDirContent.children.filter(item => typeof item === 'string');

        // Check if the current level should be expanded to reveal children.
        const isExpanded = expandedNodes.has(dirPath);

        return (
            <div style={{ paddingLeft: dirPath === 'C:\\' ? '0px' : '20px' }}>
                <div
                    className={`fm-tree-node ${currentPath === dirPath ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); handleNodeClick(dirPath); }}
                >
                    {subFolders.length > 0 && (
                        <span
                            className="fm-tree-icon"
                            onClick={(e) => toggleExpand(dirPath, e)}
                        >
                            {isExpanded ? '[-]' : '[+]'}
                        </span>
                    )}
                    {subFolders.length === 0 && <span className="fm-tree-spacer"></span>}
                    📁 {dirPath === 'C:\\' ? 'c:\\' : currentDirContent.name.toLowerCase()}
                </div>

                {isExpanded && subFolders.map(subFolder => {
                    const childPath = dirPath === 'C:\\' ? `C:\\${subFolder}` : `${dirPath}\\${subFolder}`;
                    return (
                        <div key={childPath}>
                            {renderTreeLevel(childPath)}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <WindowFrame
            title={`File Manager - [${currentPath}\\*.* - [MS-DOS_6]]`}
            minimized={minimized}
            onClose={onClose}
            onMinimize={onMinimize}
            zIndex={zIndex}
            onFocus={onFocus}
            defaultSize={{ width: 650, height: 450 }}
            minConstraints={[500, 300]}
        >
            <div className="fm-window-container">

                {/* Menu Bar */}
                <div className="fm-menu-bar">
                    <span className="fm-menu-item"><u>F</u>ile</span>
                    <span className="fm-menu-item"><u>D</u>isk</span>
                    <span className="fm-menu-item"><u>T</u>ree</span>
                    <span className="fm-menu-item"><u>V</u>iew</span>
                    <span className="fm-menu-item"><u>O</u>ptions</span>
                    <span className="fm-menu-item"><u>T</u>ools</span>
                    <span className="fm-menu-item"><u>W</u>indow</span>
                    <span className="fm-menu-item"><u>H</u>elp</span>
                </div>

                {/* Toolbar (Drives) */}
                <div className="fm-toolbar">
                    <div className="fm-drive-btn">
                        <span style={{ marginRight: '4px' }}>💾</span> A:
                    </div>
                    <div className="fm-drive-btn active">
                        <span style={{ marginRight: '4px' }}>🖴</span> C:
                    </div>
                    <div className="fm-toolbar-actions">
                        {/* Functional Up Directory button */}
                        <div
                            className="fm-toolbar-btn clickable"
                            onClick={() => {
                                if (currentPath !== 'C:\\') {
                                    const parts = currentPath.split('\\');
                                    parts.pop();
                                    const newPath = parts.length === 1 && parts[0] === 'C:' ? 'C:\\' : parts.join('\\');
                                    handleNodeClick(newPath);
                                }
                            }}
                            title="Up One Level"
                        >↰</div>
                        <div className="fm-toolbar-btn">★</div>
                    </div>
                </div>

                {/* Main Split View */}
                <div className="fm-split-view">

                    {/* Left Pane - Tree View */}
                    <div className="fm-pane fm-left-pane">
                        <div className="fm-tree-root">[-] C: [MS-DOS_6]</div>
                        <div style={{ paddingLeft: '5px' }}>
                            {renderTreeLevel('C:\\')}
                        </div>
                    </div>

                    {/* Right Pane - File List */}
                    <div className="fm-pane fm-right-pane">
                        {currentDirectory.children.map((item, index) => {
                            const isFolder = typeof item === 'string';
                            const itemName = isFolder ? item : item.name;
                            const itemDate = isFolder ? '11/1/93' : item.date;
                            const itemSize = isFolder ? '' : item.size;
                            const isSelected = selectedItem === itemName;

                            return (
                                <div
                                    key={itemName}
                                    className={`fm-list-item ${isSelected ? 'active' : ''}`}
                                    onClick={() => setSelectedItem(itemName)}
                                    onDoubleClick={() => handleFileDoubleClick(item)}
                                >
                                    <div className="fm-list-col-name">
                                        {isFolder ? '📁' : '📄'} {itemName}
                                    </div>
                                    <div className="fm-list-col-size">{itemSize}</div>
                                    <div className="fm-list-col-date">{itemDate}</div>
                                    <div className="fm-list-col-attr">a</div>
                                </div>
                            );
                        })}
                    </div>

                </div>

                {/* Status Bar */}
                <div className="fm-status-bar">
                    <div>{selectedItem ? `Selected 1 file(s)` : `${currentPath}`}</div>
                    <div>Total {currentDirectory.children.length} file(s) (13.7MB)</div>
                </div>
            </div>
        </WindowFrame>
    );
};

export default FileManagerWindow;
