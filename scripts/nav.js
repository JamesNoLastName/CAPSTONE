function showTab(tabId) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
      tab.style.display = 'none';
    });

    // Show the selected tab
    const selectedTab = document.getElementById(tabId + 'Tab');
    selectedTab.style.display = 'block';

    // Update active link in the navbar
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.classList.remove('active');
    });
    document.getElementById(tabId + 'Link').classList.add('active');
  }

  // Optionally, you can show the "home" tab by default on page load
  document.addEventListener('DOMContentLoaded', () => {
    showTab('home');
  });