 DDent Odontologia — Website Institucional

> Ecossistema web completo para a **DDent Odontologia**, clínica odontológica em São Paulo. O projeto abrange dois subsites com identidades visuais distintas: o site voltado a **pacientes** da clínica e o portal **DDent Lab**, direcionado a dentistas e laboratórios parceiros.

---

## 🦷 Sobre o Projeto

O site da DDent foi desenvolvido do zero como projeto freelance, com foco em UI/UX refinada, identidade de marca coesa e estrutura de navegação clara para dois públicos completamente diferentes — pacientes buscando atendimento e profissionais da área odontológica buscando parceria com o laboratório.

Cada seção possui arquivos CSS e JS próprios, garantindo modularidade e facilidade de manutenção.

---

## 🗂️ Estrutura de Páginas

### 🏥 Site da Clínica — Pacientes

| Arquivo | Página |
|---|---|
| `index.html` + `style.css` + `main.js` | Home — Página principal da clínica |
| `paciente.html` + `paciente.css` + `paciente.js` | Área do Paciente |
| `especialidades.html` + `especialidades.css` + `especialidades.js` | Especialidades Odontológicas |
| `quem-somos.html` + `quem-somos.css` + `quem-somos.js` | Quem Somos |
| `contato.html` + `contato.css` + `contato.js` | Contato da Clínica |

### 🔬 DDent Lab — Portal do Laboratório

| Arquivo | Página |
|---|---|
| `laboratorio.html` + `laboratorio.css` + `laboratorio.js` | Home do Laboratório |
| `laboratorio-servicos.html` + `laboratorio-servicos.css` + `laboratorio-servicos.js` | Serviços do Lab |
| `laboratorio-blog.html` + `laboratorio-blog.css` + `laboratorio-blog.js` | Blog / Conteúdo Técnico |
| `laboratorio-contato.html` + `laboratorio-contato.css` + `laboratorio-contato.js` | Contato do Lab |
| `quem-somos-laboratorio.html` + `quem-somos-laboratorio.css` + `quem-somos-laboratorio.js` | Sobre o Laboratório |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** — Estrutura semântica e acessível (54.3%)
- **CSS3** — Estilização modular por página, responsividade e identidades visuais distintas (37.0%)
- **JavaScript** — Interatividade, animações, fluxogramas SVG e comportamentos de UI (8.7%)

---

## ✨ Destaques Técnicos

- **Duas identidades visuais separadas** — a clínica usa paleta clara e acolhedora; o laboratório utiliza estética técnica e profissional
- **Fluxograma SVG circular** — representação visual do workflow digital odontológico na seção do laboratório
- **Reordenação responsiva com CSS** — uso de `order` e `display: contents` para reorganizar cards no mobile sem duplicar HTML
- **Accordions** — seções de conteúdo expandível para especialidades e serviços
- **Formulários de contato** separados para clínica e laboratório
- **34 commits** refletindo iterações contínuas de UI e refinamentos de UX

---

## 🚀 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/Felipe0Guilherme/DDENT.git
   ```

2. Navegue até a pasta:
   ```bash
   cd DDENT
   ```

3. Abra o `index.html` no navegador ou use o **Live Server** (VS Code) para servir os arquivos e garantir que os caminhos relativos funcionem corretamente.

> **Dica:** Os assets de imagens e mídia estão no `files.zip`. Extraia na raiz do projeto antes de visualizar as páginas completas.

---

## 📁 Arquitetura de Arquivos

O projeto segue o padrão **um trio por página** (`html` + `css` + `js`), com um `style.css` e `main.js` globais compartilhados:

```
DDENT/
├── index.html          # Home da clínica
├── style.css           # Estilos globais compartilhados
├── main.js             # Scripts globais
├── paciente.*          # Área do paciente
├── especialidades.*    # Especialidades
├── quem-somos.*        # Sobre a clínica
├── contato.*           # Contato da clínica
├── laboratorio.*       # Home do laboratório
├── laboratorio-servicos.*
├── laboratorio-blog.*
├── laboratorio-contato.*
├── quem-somos-laboratorio.*
└── files.zip           # Assets de mídia
```

---

## 📌 Próximos Passos

- [ ] Deploy via GitHub Pages ou Vercel
- [ ] Otimização de imagens (WebP + lazy loading)
- [ ] Integração de formulários com backend (ex: Formspree ou EmailJS)
- [ ] Adicionar meta tags de SEO e Open Graph em todas as páginas
- [ ] Criar pasta `/assets` centralizada para imagens e fontes

---

## 👨‍💻 Autor

**Felipe Guilherme**
Desenvolvedor Front-End & Mobile — São Paulo, SP
[GitHub](https://github.com/Felipe0Guilherme) · [Portfólio](https://felipe0guilherme.github.io/website-portfolio)

---

## 📄 Licença

Este projeto é de uso pessoal/freelance. O conteúdo, marca e identidade visual pertencem à **DDent Odontologia**.
