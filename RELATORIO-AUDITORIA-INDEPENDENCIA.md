# Relatório de Auditoria — Independência de Serviços Externos
Projeto: site institucional CSPM · Data: 07/07/2026

## 1. Metodologia
Varredura de todos os arquivos do projeto (`*.html`, `*.css`, `*.js`, `*.xml`, `*.txt`, `.gitattributes`, `README.md`) buscando: URLs `http(s)://`, `<script src>`, `<link>`, `url()` em CSS, `<img>`, `<iframe>`, favicons, meta tags, referências a Claude/Anthropic, analytics/trackers e bibliotecas de CDN.

## 2. Referências a Claude/Anthropic
**Nenhuma encontrada.** O projeto não contém menções, atribuições, links ou marcas d'água relacionadas a Claude, Anthropic ou qualquer ferramenta de IA em HTML, CSS, JS, README ou metadados do Git.

## 3. Dependências externas encontradas (antes da correção)

| Categoria | Recurso | Onde | Situação |
|---|---|---|---|
| Fontes web | Google Fonts (Fraunces, Inter, IBM Plex Mono) | `<head>` de todas as páginas | ❌ Removido na auditoria anterior |
| Imagens | `https://cspm.com.br/images/logo.png` (logo + favicon) | 10 páginas | ✅ Corrigido nesta auditoria |
| Imagens | `https://cspm.com.br/images/q1.jpg` … `q8.jpg`, `q6n.jpg` | `quem-somos.html`, `index.html` | ✅ Corrigido |
| Imagens | `https://cspm.com.br/images/tabela-emergencia.jpg` | `emergencia-24h.html` | ✅ Corrigido |
| Imagens | `https://cspm.com.br/images/qrcode-vagas.jpeg` | `contato.html` | ✅ Corrigido |
| Imagens | `https://cspm.com.br/media/imagens/tvs/*.jpg` (5 arquivos) | `index.html`, `servicos.html`, `emergencia-24h.html` | ✅ Corrigido |
| Widget incorporado | Google Maps (`iframe src="https://www.google.com/maps?...output=embed"`) | `index.html`, `localizacao.html` | ⚠️ Mantido — ver seção 5 |
| Links institucionais (não carregados, apenas `<a href>`) | Instagram, WhatsApp (`wa.me`), portal de laudos (`laudoonline.com.br`), portal de vagas (`sistemapeoplenet.com.br`) | todas as páginas | ✅ Mantidos — ver seção 4 |
| CDN de scripts/bibliotecas | — | — | Nenhum encontrado |
| Ícones externos (Font Awesome, ícone via CDN) | — | — | Nenhum encontrado — todos os ícones já são SVG inline |
| Analytics/telemetria (GA, GTM, Meta Pixel, Hotjar, Sentry etc.) | — | — | Nenhum encontrado |
| APIs públicas não essenciais | — | — | Nenhuma encontrada |
| Variáveis de ambiente / configs de build / banco de dados | — | — | Não aplicável — projeto é HTML/CSS/JS estático, sem build step, sem backend |

## 4. Itens intencionalmente mantidos (não são "dependência de carregamento")

Estes são apenas **links de saída** (`<a href="...">`) clicados pelo usuário — não são baixados, executados nem exigidos para a página renderizar. Removê-los quebraria regras de negócio reais (contato, resultados de exame, vagas):

- Link para Instagram oficial (`instagram.com/casadesaudepinheiromachado`)
- Link para WhatsApp (`wa.me/552121254882`)
- Link para o portal de resultado de exames (`laudoonline.com.br/cspm`)
- Link para o portal de vagas (`sistemapeoplenet.com.br`)
- `canonical`, `og:url`, `og:image`, `twitter:image` e o campo `@id`/`logo` do Schema.org (JSON‑LD), que apontam para `https://cspm.com.br/...`

Esses metadados **precisam** permanecer como URL absoluta do próprio domínio (não de terceiros) — é assim que crawlers de redes sociais e o Google leem preview e dados estruturados quando o site estiver publicado em `cspm.com.br`. Isso não é uma dependência de terceiro nem quebra a renderização da página caso fique offline; apenas o preview social deixaria de puxar a imagem, o que é comportamento padrão de qualquer site.

## 5. Risco remanescente: mapa do Google (não eliminável sem alterar a experiência)

`index.html` e `localizacao.html` têm um `<iframe>` do Google Maps mostrando a localização do hospital. Diferente de uma imagem, um mapa interativo **não pode ser "baixado" e hospedado localmente** — ele depende de tiles e da infraestrutura do provedor de mapas em tempo real. Como você pediu para não alterar layout/funcionalidade/UX, mantive o widget como estava. Enquadra-se na exceção que você mesmo definiu ("APIs externas estritamente necessárias ao negócio" — aqui, mostrar a localização do hospital).

Se quiser eliminar 100% dessa dependência também, as opções são (nenhuma tem o mesmo efeito visual/interativo do mapa atual):
1. Substituir o iframe por uma **imagem estática** do mapa + um link "Ver rotas" (que abriria o Google Maps só quando clicado).
2. Substituir por outro provedor de mapas (ex. OpenStreetMap com Leaflet), que **também precisa de um servidor de tiles externo** para funcionar — o problema não desaparece, só muda de fornecedor.

Nenhuma ação foi tomada aqui até você confirmar qual opção prefere.

## 6. O que foi corrigido nesta auditoria

- **16 tags** (`<img src>` e `<link rel="icon" href>`) em 10 páginas HTML tiveram a URL alterada de absoluta (`https://cspm.com.br/...`) para **caminho local relativo** (`images/...` ou `media/imagens/tvs/...`).
- Criadas as pastas `images/` e `media/imagens/tvs/` na raiz do projeto, prontas para receber os arquivos reais.
- Removida uma pasta duplicada (`cspm-site/cspm-site/`) que continha um `.git` interno remanescente do upload original.

## 7. Limitação técnica importante — leia antes de publicar

**Eu não consegui baixar os arquivos de imagem binários neste ambiente**: o sandbox onde processo arquivos não tem `cspm.com.br` liberado na lista de domínios de rede permitidos (confirmei isso tentando o download — a rede bloqueou explicitamente com "Host not in allowlist"). Ou seja, os caminhos no HTML já apontam para `images/...` e `media/imagens/tvs/...` corretamente, **mas as pastas ainda estão vazias** — as imagens vão aparecer quebradas até você colocar os arquivos reais nelas.

Preparei `baixar-imagens.sh` dentro do projeto: rode-o uma vez, numa máquina com internet, na raiz do projeto, e ele baixa as 16 imagens exatamente nos caminhos que o HTML espera:
```bash
bash baixar-imagens.sh
```
Depois disso o site fica 100% autocontido, sem precisar de `cspm.com.br` no ar para renderizar nenhuma imagem.

## 8. Arquivos alterados nesta auditoria
- `index.html`, `quem-somos.html`, `emergencia-24h.html`, `servicos.html`, `convenios.html`, `localizacao.html`, `contato.html`, `horarios-de-visitas.html`, `exames-laboratoriais.html`, `404.html` — caminhos de imagem/favicon convertidos para local.
- Novo: `baixar-imagens.sh` (script auxiliar de download).
- Novo: este relatório.

## 9. Resumo do estado final
- ✅ Zero referências a Claude/Anthropic.
- ✅ Zero scripts de CDN externos.
- ✅ Zero fontes carregadas pela internet (100% Arial/system font, sem Google Fonts).
- ✅ Zero analytics/telemetria/trackers.
- ✅ Zero APIs públicas não essenciais.
- ✅ Todos os `<img>` e o favicon apontam para arquivos locais do projeto.
- ⚠️ Mapa do Google mantido de propósito (funcionalidade de negócio, não pode ser localizado sem trocar o tipo de recurso).
- ⚠️ Ação pendente do seu lado: rodar `baixar-imagens.sh` para popular as pastas `images/` e `media/imagens/tvs/` com os arquivos reais.
