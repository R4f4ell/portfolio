# Portfólio — Rafael Martins

Portfólio pessoal, mostrando projetos reais, design responsivo, acessibilidade e atenção a performance. O site traz uma home de apresentação, descrições sobre minhas experiências, grid de projetos com modal de desempenho, carrossel de frases retratando minhas habilidades adicionais, carrossel de certificados e um background WebGL leve com efeitos para um fundo fixo do site.

## 🔧 Tecnologias
- React + Vite
- SCSS
- Framer Motion
- React Icons / Lucide
- IntersectionObserver (reveal on scroll, scroll spy)
- OGL (WebGL) para o background de luzes, com shaders customizados e controle de DPR (suave no mobile)
- Hooks utilitários: useLockBodyScroll, useRevealOnScroll, useScrollSpy e useBackSite

## 🚀 Funcionalidades
- Header fixo e responsivo: com clique e animação com scroll até a sessão específica do link
- Sessão inicial: com links para redes de comunicação (Linkedin, Github e WhatsApp)
- Sessão 'Sobre': texto direto sobre minhas habilidades, projetos reais e ícones de habilidades que possuo
- Sessão 'Projetos': Cards com lanterna interativa (desktop): quando o cursor passa, ícones de tecnologias e o título ganham destaque. Cada card abre o projeto online, traz link para repositório e botão “Desempenho” para abrir o modal. Imagens usam <picture> com breakpoints (768px/1024px).
- Modal de Desempenho: Acessível (role="dialog" + aria-modal), fecha por ESC/backdrop e exibe print Lighthouse por dispositivo.
- Sessão 'Frases': Carrossel leve com 7 cartões (com contagem)
- Sessão 'Certificados': Carrossel arrastável, setas, dots e teclado (←/→). Possui aria-live para leitura do slide atual. Cada certificado usa <picture> com mobile/tablet/desktop e fallback com dimensões (evita CLS).
- Background WebGL: Efeito de raios de luz suave e configurável, com DPR limitado e desalocação de contexto ao desmontar (economia de GPU).
- Footer minimalista: “© 2025 Rafael Martins". 

## 🔗 Links

- Projeto online: https://portfolio.rafaelldev.com
- Código-fonte: https://github.com/R4f4ell/portfolio