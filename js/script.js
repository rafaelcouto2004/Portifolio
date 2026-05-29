/* ============================================================
   SCRIPT.JS
   Lógica principal do portfólio:
   - Estrelas animadas
   - Menu mobile (hambúrguer)
   - Efeito máquina de escrever
   - Contador animado das estatísticas
   - Animação das barras de skill
   - Efeito de scroll na navbar
   - Scroll suave nos links âncora
   - Formulário de contato (simulado)
   - Fade-in dos cards ao entrar na viewport
   - Parallax nos orbs
   - Destaque do link ativo na navbar
   ============================================================ */


// ===== Estrelas (geradas dinamicamente no container .stars) =====
const starsContainer = document.querySelector('.stars');

function criarEstrelas() {
  if (!starsContainer) return;

  for (let i = 0; i < 100; i++) {
    const estrela = document.createElement('div');
    estrela.className = 'star';

    // Posição aleatória na tela
    estrela.style.left = Math.random() * 100 + '%';
    estrela.style.top  = Math.random() * 100 + '%';

    // Delays aleatórios para dessincronizar as animações de piscar e mover
    estrela.style.animationDelay =
      Math.random() * 2 + 's, ' + Math.random() * 15 + 's';

    starsContainer.appendChild(estrela);
  }
}

criarEstrelas();


// ===== Menu Mobile (abre/fecha ao clicar no hambúrguer) =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu    = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });

  // Fecha o menu ao clicar em qualquer link
  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });
}


// ===== Efeito de Máquina de Escrever =====
const elementoTypewriter = document.getElementById('typewriter');

const frases = [
  'Estudante de Análise e Desenvolvimento de Sistemas',
  'Cloud Computing Enthusiast',
  'Python Automation Enthusiast',
  'Building solutions with Python & Cloud'
];

let indiceFrase  = 0;  // qual frase está sendo exibida
let indiceChar   = 0;  // quantos caracteres já foram digitados
let apagando     = false;
let velocidade   = 100;

function maquinaEscrever() {
  const fraseAtual = frases[indiceFrase];

  if (apagando) {
    // Apaga um caractere por vez
    elementoTypewriter.textContent = fraseAtual.substring(0, indiceChar - 1);
    indiceChar--;
    velocidade = 50;
  } else {
    // Digita um caractere por vez
    elementoTypewriter.textContent = fraseAtual.substring(0, indiceChar + 1);
    indiceChar++;
    velocidade = 100;
  }

  // Chegou ao final da frase: aguarda antes de apagar
  if (!apagando && indiceChar === fraseAtual.length) {
    apagando  = true;
    velocidade = 2000; // pausa antes de apagar
  }
  // Terminou de apagar: passa para a próxima frase
  else if (apagando && indiceChar === 0) {
    apagando    = false;
    indiceFrase = (indiceFrase + 1) % frases.length;
    velocidade  = 500; // pausa antes de digitar a próxima
  }

  setTimeout(maquinaEscrever, velocidade);
}

// Inicia com pequeno delay para não começar junto com o carregamento
setTimeout(maquinaEscrever, 1000);


// ===== Contadores Animados (seção hero) =====
const numerosEstatisticas = document.querySelectorAll('.stat-number');

function animarContador(elemento) {
  const alvo     = parseInt(elemento.getAttribute('data-target'));
  const duracao  = 2000; // duração total em ms
  const passo    = alvo / (duracao / 16); // incremento por frame (~60fps)
  let atual      = 0;

  const intervalo = setInterval(() => {
    atual += passo;
    if (atual >= alvo) {
      elemento.textContent = alvo;
      clearInterval(intervalo);
    } else {
      elemento.textContent = Math.floor(atual);
    }
  }, 16);
}

// Só inicia o contador quando o elemento entra na viewport
const observadorContadores = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      animarContador(entrada.target);
      observadorContadores.unobserve(entrada.target); // para não repetir
    }
  });
}, { threshold: 0.5 });

numerosEstatisticas.forEach(num => observadorContadores.observe(num));


// ===== Animação das Barras de Skill =====
const barrasSkill = document.querySelectorAll('.skill-fill');

// Adiciona a classe .animate quando a barra entra na tela,
// o que ativa a animação CSS (animation-play-state: running)
const observadorSkills = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('animate');
      observadorSkills.unobserve(entrada.target);
    }
  });
}, { threshold: 0.3 });

barrasSkill.forEach(barra => observadorSkills.observe(barra));


// ===== Efeito de Scroll na Navbar (aumenta opacidade ao rolar) =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (!navbar) return;

  if (window.pageYOffset > 100) {
    navbar.style.background = 'rgba(10, 10, 15, 0.95)'; // mais opaco ao rolar
  } else {
    navbar.style.background = 'rgba(10, 10, 15, 0.8)';  // transparente no topo
  }
});


// ===== Scroll Suave para Links Âncora (ex: href="#projetos") =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ===== Formulário de Contato (envio simulado com feedback visual) =====
const formularioContato = document.getElementById('contactForm');

if (formularioContato) {
  formularioContato.addEventListener('submit', function (e) {
    e.preventDefault();

    const botao        = this.querySelector('button[type="submit"]');
    const textoOriginal = botao ? botao.innerHTML : '';

    // Estado: enviando
    if (botao) {
      botao.innerHTML  = '<span>Enviando...</span>';
      botao.disabled   = true;
    }

    // Simula delay de envio (1.5s) e mostra confirmação
    setTimeout(() => {
      if (botao) {
        botao.innerHTML = '<span>Mensagem Enviada!</span>';
        botao.style.background = 'linear-gradient(135deg, #10B981, #059669)';
      }

      // Restaura o botão depois de 3s
      setTimeout(() => {
        if (botao) {
          botao.innerHTML        = textoOriginal;
          botao.style.background = '';
          botao.disabled         = false;
        }
        formularioContato.reset();
      }, 3000);
    }, 1500);
  });
}


// ===== Fade-in dos Cards ao Entrar na Viewport =====
// Aplica a cards de projeto, categorias de skill, itens da timeline e cards de contato
const elementosFade = document.querySelectorAll(
  '.project-card, .skill-category, .timeline-item, .contact-card'
);

const observadorFade = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.style.opacity   = '1';
      entrada.target.style.transform = 'translateY(0)';
      observadorFade.unobserve(entrada.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px' // ativa um pouco antes de entrar completamente
});

// Inicializa os elementos invisíveis e abaixo do ponto final
elementosFade.forEach(elemento => {
  elemento.style.opacity    = '0';
  elemento.style.transform  = 'translateY(30px)';
  elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observadorFade.observe(elemento);
});


// ===== Parallax nos Orbs ao Rolar a Página =====
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  const orbs    = document.querySelectorAll('.orb');

  orbs.forEach((orb, index) => {
    const velocidade = (index + 1) * 0.05;
    orb.style.transform = `translateY(${scrollY * velocidade}px)`;
  });
});


// ===== Destaque do Link Ativo na Navbar =====
// Muda a cor do link correspondente à seção visível no momento
const secoes   = document.querySelectorAll('section[id]');
const linksNav = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let secaoAtual = '';

  secoes.forEach(secao => {
    const topoSecao = secao.offsetTop;
    if (pageYOffset >= topoSecao - 200) {
      secaoAtual = secao.getAttribute('id');
    }
  });

  linksNav.forEach(link => {
    link.style.color = ''; // reseta cor
    if (link.getAttribute('href') === '#' + secaoAtual) {
      link.style.color = '#00F5FF'; // cyan para o link ativo
    }
  });
});