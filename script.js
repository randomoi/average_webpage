document.addEventListener('DOMContentLoaded', () => {
    const views = {
        project: document.getElementById('projectView'),
        about: document.getElementById('aboutView'),
        contact: document.getElementById('contactView')
    };

    const links = {
        project: document.getElementById('projectLink'),
        about: document.getElementById('aboutLink'),
        contact: document.getElementById('contactLink')
    };

    const videoIframe = document.getElementById('videoIframe');
    const closeButtons = document.querySelectorAll('.close-btn');

    function switchView(targetKey) {
        Object.keys(views).forEach(key => {
            if (key === targetKey) {
                views[key].classList.remove('hidden');
                
                const scroller = views[key].querySelector('.scroll-box');
                if (scroller) {
                    scroller.scrollTop = 0;
                    scroller.style.display = 'none';
                    scroller.offsetHeight; 
                    scroller.style.display = 'block';
                }
            } else {
                views[key].classList.add('hidden');
            }
        });

        Object.keys(links).forEach(key => {
            if (key === targetKey) {
                links[key].classList.add('active');
            } else {
                links[key].classList.remove('active');
            }
        });

        if (targetKey === 'project') {
            videoIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        } else {
            videoIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    }

    links.project.addEventListener('click', (e) => { e.preventDefault(); switchView('project'); });
    links.about.addEventListener('click', (e) => { e.preventDefault(); switchView('about'); });
    links.contact.addEventListener('click', (e) => { e.preventDefault(); switchView('contact'); });
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => switchView('project'));
    });
});