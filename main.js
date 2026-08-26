const navItems = document.querySelector('.nav__items');
const openNavButton = document.querySelector('#open__nav-btn');
const closeNavButton = document.querySelector('#close__nav-btn');

// open dropdown
const openNav = () => {
    if (navItems) navItems.style.display = 'flex';
    if (openNavButton) openNavButton.style.display = 'none';
    if (closeNavButton) closeNavButton.style.display = 'inline-block';
}

//close dropdown
const closeNav = () => {
    if (navItems) navItems.style.display = 'none';
    if (closeNavButton) closeNavButton.style.display = 'none';
    if (openNavButton) openNavButton.style.display = 'inline-block';
}

if (openNavButton && closeNavButton) {
    openNavButton.addEventListener('click', openNav);
    closeNavButton.addEventListener('click', closeNav);
}

const sidebar = document.querySelector('aside');
const showSidebarBtn = document.querySelector('#show__sidebar-btn');
const hideSidebarBtn = document.querySelector('#hide__sidebar-btn');

//show sidebar on small devices
const showSidebar = () => {
    if (sidebar) sidebar.style.left = '0';
    if (showSidebarBtn) showSidebarBtn.style.display = 'none';
    if (hideSidebarBtn) hideSidebarBtn.style.display = 'inline-block';
}

//hide sidebar on small devices
const hideSidebar = () => {
    if (sidebar) sidebar.style.left = '-100%';
    if (showSidebarBtn) showSidebarBtn.style.display = 'inline-block';
    if (hideSidebarBtn) hideSidebarBtn.style.display = 'none';
}

if (showSidebarBtn && hideSidebarBtn && sidebar) {
    showSidebarBtn.addEventListener('click', showSidebar);
    hideSidebarBtn.addEventListener('click', hideSidebar);
}
