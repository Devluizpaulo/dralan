// Menu hambúrguer
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  
  if (menuToggle && navMobile) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navMobile.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const mobileLinks = navMobile.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
      });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !navMobile.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
      }
    });
  }
  
  // Rolagem suave para links de âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80; // Ajuste conforme a altura do seu header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Destacar seção ativa durante a rolagem
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop a, .nav-mobile a');
  
  function highlightNavigation() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Adicione a classe active ao CSS
  const style = document.createElement('style');
  style.textContent = `
    .nav-desktop a.active, .nav-mobile a.active {
      color: var(--dourado);
    }
    .nav-desktop a.active::after {
      width: 80%;
    }
    .nav-mobile a.active {
      background: rgba(255, 179, 0, 0.1);
    }
    .nav-mobile a.active::before {
      opacity: 1;
      transform: translateX(0);
    }
  `;
  document.head.appendChild(style);
  
  window.addEventListener('scroll', highlightNavigation);
  highlightNavigation(); // Executar na carga inicial

  // Header scroll state
  const header = document.querySelector('header');
  const onScrollHeader = () => {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add('header-scrolled');
    else header.classList.remove('header-scrolled');
  };
  window.addEventListener('scroll', onScrollHeader);
  onScrollHeader();

  // Reveal animations
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }
});

// Formulário de contato
const contatoForm = document.getElementById('form-contato');
if (contatoForm) {
  contatoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = this.querySelector('button[type="submit"]');
    if (!btn) return;

    const originalText = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ Enviado!';
      this.reset();

      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Mensagem enviada! Em breve entraremos em contato.';
      successMessage.style.cssText = `
        background: #4CAF50;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
      `;

      this.parentNode.appendChild(successMessage);
      successMessage.offsetHeight;
      successMessage.style.opacity = '1';
      successMessage.style.transform = 'translateY(0)';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;

        setTimeout(() => {
          successMessage.style.opacity = '0';
          successMessage.style.transform = 'translateY(10px)';
          setTimeout(() => successMessage.remove(), 300);
        }, 5000);
      }, 3000);
    }, 1500);
  });
}