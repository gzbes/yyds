/* ===== 睿钰昇官网 - 交互脚本 ===== */

// 移动端导航切换
document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  if (toggle && nav) {
    function toggleNav(open) {
      toggle.classList.toggle('active', open);
      nav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function() {
      var isOpen = nav.classList.contains('open');
      toggleNav(!isOpen);
    });

    // 点击导航链接后关闭菜单
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        toggleNav(false);
      });
    });

    // 窗口 resize 回桌面时恢复滚动
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && nav.classList.contains('open')) {
        toggleNav(false);
      }
    });
  }

  // 当前页面高亮导航
  var path = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    }
  });

  // 产品缩略图切换主图
  document.querySelectorAll('.thumb-list').forEach(function(list) {
    var mainImg = list.closest('.product-gallery').querySelector('.main-img');
    list.querySelectorAll('img').forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        list.querySelectorAll('img').forEach(function(t) { t.classList.remove('active'); });
        thumb.classList.add('active');
        if (mainImg) mainImg.src = thumb.src.replace(/_(b\.jpg|_\.webp)$/, '.jpg');
      });
    });
  });

  // 数字递增动画
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    if (!target) return;
    var current = 0;
    var step = Math.ceil(target / 30);
    var timer = setInterval(function() {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString();
    }, 40);
  }

  // 滚动到视口时触发计数器
  var counters = document.querySelectorAll('.stat-item .num[data-target]');
  if (counters.length) {
    var observed = new Set();
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !observed.has(entry.target)) {
          observed.add(entry.target);
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function(c) { observer.observe(c); });
  }
});
