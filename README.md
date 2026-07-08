# CSPM — Nova versão do site institucional

Reformulação completa do site da **Casa de Saúde Pinheiro Machado** (cspm.com.br), mantendo 100% das informações institucionais reais (endereço, telefone, serviços, convênios, missão/visão/valores, horários de visita etc.) e modernizando design, UX, SEO, acessibilidade e performance.

---

## 1. Estrutura de arquivos

```
cspm-site/
├── index.html                 → Homepage
├── quem-somos.html            → Institucional (história, missão, visão, valores)
├── emergencia-24h.html        → Emergência 24h
├── servicos.html              → Serviços e especialidades
├── convenios.html             → Convênios (abas Emergência / Exames de Imagem)
├── localizacao.html           → Localização + mapa
├── contato.html                → Contato + formulário + Trabalhe Conosco
├── horarios-de-visitas.html   → Horário de visitas (apartamento/enfermaria/CTI)
├── exames-laboratoriais.html  → Exames laboratoriais
├── 404.html                    → Página de erro personalizada
├── robots.txt
├── sitemap.xml
├── css/style.css              → Design system completo
├── js/main.js                 → Interações (menu, abas, formulário, acessibilidade)
└── build/                      → Scripts Python que geram o HTML (fonte única de header/footer/SEO)
```

O site é **100% estático** (HTML/CSS/JS puro, sem frameworks ou build step obrigatório), o que garante performance máxima e facilidade de publicação em qualquer hospedagem (Apache, Nginx, Netlify, Vercel, Cloudflare Pages etc.).

A pasta `build/` contém os scripts que geram as páginas a partir de um único header/footer/SEO compartilhado — use-os caso quaisquer alteração futura de menu, rodapé ou padrão de SEO precise ser replicada em todas as páginas de uma vez (`python3 build/pages_home.py`, etc.).

**Importante sobre imagens:** as fotos institucionais reais (fachada, CTI, centro cirúrgico, equipamentos, tabela de emergência etc.) foram referenciadas diretamente do domínio original `cspm.com.br/images/...` para preservar o conteúdo visual real da instituição. **Antes de publicar em produção**, recomenda-se baixar essas imagens, convertê-las para **WebP** e hospedá-las dentro da pasta `/images` deste projeto (veja seção 6 — Performance).

---

## 2. Melhorias implementadas

### UX e navegação.
- Menu fixo (sticky) com estados de foco e indicação de página ativa (`aria-current`).
- Menu mobile em painel dedicado, com botão hambúrguer acessível (`aria-expanded`, `aria-controls`).
- Barra superior com aviso permanente de **Emergência 24h** e atalhos (Localização, Horários de Visita, Trabalhe Conosco).
- Breadcrumbs (trilha de navegação) em todas as páginas internas, com dados estruturados `BreadcrumbList`.
- Sitemap completo no rodapé, organizado por categoria (Mapa do site / Serviços / Contato).
- Convênios reorganizados em abas **Emergência** e **Exames de Imagem**, em vez de uma lista corrida de 60+ itens.
- Botão flutuante de WhatsApp e botão "voltar ao topo".
- CTAs reescritos para serem específicos e orientados à ação (ver tabela abaixo).

### Substituição de CTAs genéricos

| Antes (site atual)      | Depois (nova versão)                              |
|--------------------------|----------------------------------------------------|
| "Saiba Mais" (Quem Somos)| "Ver Especialidades" / links contextuais           |
| "Saiba Mais" (Emergência)| "Emergência 24 Horas" / "Ligar Agora: (21) 2125-4882" |
| "Saiba Mais" (Serviços)  | "Ver Especialidades", "Conhecer o Centro Cirúrgico" |
| "Clique Aqui" (Resultado de exames) | "Acessar Resultado de Exames"           |
| —                        | "Agende sua Consulta", "Conheça Nossos Convênios", "Fale com Nossa Equipe" |

### Design visual
- **Paleta:** azul-petróleo institucional (`#0B3D5C`) transmitindo confiança clínica, verde-saúde (`#1E8E7E`) para CTAs de ação, vermelho reservado **exclusivamente** para Emergência (`#C81E3A`), e um bronze sutil (`#B9834E`) como assinatura visual dos "27 anos de cuidado contínuo".
- **Tipografia:** `Fraunces` (serif com personalidade, transmite tradição/1997) para títulos + `Inter` (alta legibilidade) para corpo de texto + `IBM Plex Mono` para dados técnicos (telefones, horários, siglas).
- Elemento de assinatura: um "selo de 24 horas" circular no hero, reforçando o principal diferencial do hospital (emergência ininterrupta) sem apelar para clichês genéricos de saúde (não usamos cruzes vermelhas genéricas nem gradientes azul-roxo padrão de SaaS).
- Cards com ícones para todos os serviços, diferenciais em formato de lista com ícone, galeria de estrutura da unidade, seção de estatísticas (27+ anos, 24h, 3 salas de cirurgia, 65+ convênios).
- Layout limpo, com espaçamento generoso e hierarquia visual clara.

### SEO
- Title e meta description **únicos e otimizados** para cada uma das 10 páginas.
- Open Graph e Twitter Cards completos em todas as páginas.
- 1 único H1 por página (verificado programaticamente — ver seção 5).
- Hierarquia H2/H3 corrigida e semântica.
- Dados estruturados **Schema.org**: `Hospital` (com endereço, telefone, especialidades e serviços) na homepage e `BreadcrumbList` em todas as páginas internas — melhora a exibição em resultados de busca (rich snippets).
- `sitemap.xml` e `robots.txt` prontos para submissão ao Google Search Console.
- Conteúdo reforçado com palavras-chave relevantes (hospital, clínica, emergência 24 horas, convênios médicos, exames de imagem, Casa de Saúde Pinheiro Machado) de forma natural, sem keyword stuffing.

### Acessibilidade (WCAG 2.1 AA)
- Skip link ("Pular para o conteúdo principal").
- Contraste de cores validado (texto escuro sobre fundos claros, branco sobre azul-petróleo escuro).
- Foco visível em todos os elementos interativos (`:focus-visible` com contorno de alto contraste).
- Navegação 100% operável por teclado (menu, abas de convênios, accordion de FAQ nativo com `<details>`, formulário).
- Formulário com `<label>` associado a cada campo, indicação de campos obrigatórios e mensagens de status com `aria-live`.
- HTML semântico (`<header>`, `<nav>`, `<main>`, `<footer>`, `<details>`, landmarks com `aria-label`).
- `aria-current="page"` no item ativo do menu.
- 100% das imagens com atributo `alt` descritivo (validado programaticamente).
- Respeito a `prefers-reduced-motion`.

### Performance
- CSS e JS organizados em arquivos únicos, sem dependências externas pesadas (nenhum framework JS).
- `loading="lazy"` em todas as imagens abaixo da dobra; `loading="eager"` apenas na imagem do hero.
- Fontes carregadas via `preconnect` + `display=swap` (evita bloqueio de renderização).
- Ícones em SVG inline (sem requisições HTTP adicionais nem bibliotecas de ícones).
- Sem JavaScript bloqueante (`defer` no único script do site).
- Estrutura pronta para minificação de CSS/JS e cache de recursos estáticos no momento do deploy (ver seção 6).

---

## 3. Antes / Depois (resumo)

| Aspecto            | Site atual (cspm.com.br)                          | Nova versão                                             |
|---------------------|----------------------------------------------------|----------------------------------------------------------|
| Menu                | Links simples sem hierarquia visual                | Menu sticky, mobile dedicado, item ativo destacado       |
| Emergência          | Um card entre outros na home                       | Faixa fixa no topo + seção própria com CTA de ligação direta |
| Convênios           | Lista corrida de 60+ itens em texto puro           | Interface em abas, com contagem e busca visual por chip  |
| CTAs                | "Saiba Mais" / "Clique Aqui" repetidos             | CTAs específicos por contexto e por página               |
| Cabeçalhos          | Múltiplos H2 sem H1 claro em algumas páginas       | 1 H1 por página + hierarquia H2/H3 consistente            |
| Meta tags           | Ausentes / genéricas                               | Title, description, Open Graph e Twitter Card por página |
| Acessibilidade      | Sem skip link, foco pouco visível, imagens sem alt padronizado | WCAG 2.1 AA: skip link, foco visível, 100% alt, ARIA |
| Depoimentos / FAQ   | Inexistentes                                        | Seções dedicadas na homepage                              |
| Dados estruturados  | Nenhum                                              | Schema.org Hospital + BreadcrumbList                       |

---

## 4. Conteúdo institucional preservado

Todas as informações reais do site original foram mantidas e organizadas:

- Fundação em 1997, em Laranjeiras, Zona Sul do Rio de Janeiro.
- Infraestrutura própria de exames de imagem e análises clínicas.
- 3 salas de cirurgia (destaque: traumatológicas, urológicas e bariátricas).
- 2 unidades de CTI, 5 leitos de Day-Clinic.
- Missão, visão e valores institucionais (texto original).
- Lista completa dos 60 convênios de emergência e 7 convênios de imagem.
- Endereço, telefone (21) 2125-4882, e-mail atendimento@cspm.com.br, Instagram oficial.
- Horários de visita (apartamento, enfermaria, CTI) e definições de visitante/acompanhante.
- Link para o portal de resultado de exames (laudoonline.com.br/cspm) e para o portal de vagas (Trabalhe Conosco), incluindo o QR Code original.

> **Nota de transparência:** a seção "Depoimentos" da homepage foi incluída como **exemplo estrutural de layout**, claramente sinalizado no próprio código e na página como conteúdo ilustrativo. O site original não possui depoimentos publicados — antes de ir ao ar, a CSPM deve substituir esses textos por avaliações reais de pacientes, coletadas com consentimento (Google Meu Negócio, pesquisa de satisfação, etc.), para não veicular depoimentos fictícios atribuídos a pacientes reais.

---

## 5. Checklist de qualidade já validado neste projeto

- [x] 1 único `<h1>` por página (validado programaticamente nas 10 páginas).
- [x] 100% das imagens com atributo `alt` (validado programaticamente).
- [x] Nenhum link interno quebrado (validado programaticamente).
- [x] HTML com tags balanceadas em todas as páginas (validado com parser).
- [x] Nenhum `id` duplicado nas páginas (âncoras e ARIA funcionam corretamente).
- [x] Menu, abas de convênios, accordion de FAQ e formulário funcionam sem JavaScript quebrar a navegação (progressive enhancement).

## 6. Antes de publicar em produção — recomendações finais

1. **Imagens:** baixar as imagens hotlinked de `cspm.com.br/images/...`, convertê-las para **WebP** (ex.: `cwebp imagem.jpg -o imagem.webp -q 80`), redimensionar para os tamanhos exibidos e salvá-las em `/images` neste projeto, atualizando os `src`. Isso é o que falta para bater 90+ em Performance no PageSpeed, já que hoje as imagens continuam no formato/peso originais do site antigo.
2. **Formulário de contato:** atualmente o formulário usa `mailto:` como fallback funcional sem backend. Para captação de leads mais confiável, conectar a um serviço de formulário (Netlify Forms, Formspree, backend próprio) ou a um CRM.
3. **Minificação:** rodar `css/style.css` e `js/main.js` por um minificador (ex.: `esbuild`, `cssnano`) antes do deploy final.
4. **Cache e cabeçalhos:** configurar `Cache-Control` para arquivos estáticos (`css`, `js`, `images`) no servidor/CDN de destino.
5. **Domínio e SSL:** publicar em `https://cspm.com.br` mantendo HTTPS (essencial para SEO e confiança do usuário).
6. **Google Search Console / Google Meu Negócio:** submeter `sitemap.xml` e validar a ficha do Google Meu Negócio com o mesmo endereço/telefone usados no Schema.org Hospital.
7. **Testar no PageSpeed Insights** após aplicar as otimizações de imagem acima — a estrutura de código já está pronta para pontuação alta em Performance, SEO, Acessibilidade e Boas Práticas.

---

## 7. Como visualizar localmente

Como é um site estático, basta abrir `index.html` num navegador, ou rodar um servidor local:

```bash
cd cspm-site
python3 -m http.server 8080
# acesse http://localhost:8080
```
