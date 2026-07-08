#!/bin/bash
# Baixa localmente as imagens que ainda estão hospedadas em cspm.com.br
# e as coloca exatamente nas pastas que o HTML já espera (images/ e media/imagens/tvs/).
# Rode este script UMA VEZ, numa máquina com acesso à internet, a partir da
# raiz do projeto (mesma pasta onde estão os arquivos .html).
#
# Uso:  bash baixar-imagens.sh

set -e
mkdir -p images "media/imagens/tvs"

BASE="https://cspm.com.br"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

baixar() {
  local caminho="$1"
  echo "Baixando $caminho ..."
  curl -sL -A "$UA" -e "$BASE/" "$BASE/$caminho" -o "$caminho"
}

baixar "images/logo.png"
baixar "images/q1.jpg"
baixar "images/q2.jpg"
baixar "images/q3.jpg"
baixar "images/q4.jpg"
baixar "images/q5.jpg"
baixar "images/q6n.jpg"
baixar "images/q7.jpg"
baixar "images/q8.jpg"
baixar "images/qrcode-vagas.jpeg"
baixar "images/tabela-emergencia.jpg"
baixar "media/imagens/tvs/4cd0041bd643207948b3d7b50dbf2e29.jpg"
baixar "media/imagens/tvs/7416ea95adad54943cade597830a97dc.jpg"
baixar "media/imagens/tvs/7af142f25a2b5e9151d7af349eba8c40.jpg"
baixar "media/imagens/tvs/b765dcdd221c2a0cfbc790ace8e10dd0.jpg"
baixar "media/imagens/tvs/f9273f70012f2acc50209ac891f5d51d.jpg"

echo ""
echo "Concluído. Verifique se todos os arquivos abaixo têm tamanho > 0:"
find images media -type f -exec ls -la {} \;
