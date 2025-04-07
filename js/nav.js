document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 创建遮罩层
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    // 初始化菜单状态
    function initMenu() {
        if (navMenu && navToggle && navOverlay) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // 打开菜单
    function openMenu() {
        if (!navMenu || !navToggle || !navOverlay) return;
        
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 关闭菜单
    function closeMenu() {
        if (!navMenu || !navToggle || !navOverlay) return;
        
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 切换菜单状态
    function toggleMenu() {
        if (!navMenu || !navToggle || !navOverlay) return;
        
        const isActive = navMenu.classList.contains('active');
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // 初始化
    initMenu();

    // 添加事件监听器
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            closeMenu();
        });
    }

    // 处理触摸事件
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    if (navMenu) {
        navMenu.addEventListener('touchstart', function(e) {
            if (!e.touches || !e.touches[0]) return;
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        navMenu.addEventListener('touchmove', function(e) {
            if (!isDragging || !e.touches || !e.touches[0]) return;
            
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            
            if (diff < -50) { // 向左滑动超过50px时关闭菜单
                closeMenu();
                isDragging = false;
            }
        });

        navMenu.addEventListener('touchend', function() {
            isDragging = false;
        });
    }

    // 处理窗口大小改变
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // 处理滚动
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动且超过100px时隐藏导航栏
            nav.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动时显示导航栏
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}); 