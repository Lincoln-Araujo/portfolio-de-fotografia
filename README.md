# Projeto Mari Loreto

Este repositório contém o site em homenagem à Mari Loreto, apresentando sua trajetória e fotos organizadas em galerias com recursos de animações e carrosséis interativos.

## Estrutura do Projeto

A arquitetura básica do site é:

MARI_LORETO/ 
  - images/ 
  - biografia.html 
  - foto.html 
  - fotoA.webp 
  - fotoB.jpg 
  - fotoC.webp 
  - galeria.html 
  - index.html 
  - paginamodelo.html 
  - script.js 
  - secao.html 
  - style.css


### Descrição de cada arquivo/parte

- **index.html**  
  Página inicial, com animação de tiles (grade recortada) que rotacionam entre três imagens configuradas no `script.js`, uma galeria inicial que pode mostrar algumas das fotos da artista e um breve resumo da biografia dela.
- **biografia.html**  
  Página que apresenta a biografia de Mari Loreto.  
- **foto.html**  
  Página individual para exibir uma foto em destaque, com carrossel de miniaturas logo abaixo.  
- **galeria.html** / **secao.html**  
  Exemplos de páginas de galeria ou seções de fotos, organizando as imagens por temas.  
- **paginamodelo.html**  
  Modelo de página para possíveis extensões ou seções adicionais.  
- **script.js**  
  Arquivo JavaScript principal, que concentra:
  - **Animação** da página inicial (tiles invertendo).  
  - **Menu** mobile (toggle entre aberto e fechado).  
  - **Dropdown** de temas da galeria na versão mobile.  
  - **Carrossel** interativo na página de foto individual (com clique/arraste e botões de navegação).  
- **style.css**  
  Arquivo principal de estilos para o site (cores, layout, etc.).  
- **images/**  
  Pasta contendo imagens adicionais para o site.  
- **fotoA.webp**, **fotoB.jpg**, **fotoC.webp**  
  Exemplos de imagens referenciadas na animação da página inicial.

## Como Utilizar

1. **Abrir o site**  
   - Basta abrir o arquivo `index.html` em um navegador moderno. A animação inicial (tiles) deverá aparecer, rotacionando entre as imagens definidas no `script.js`.

2. **Animação da Página Inicial**  
   - No `script.js`, localize a variável `const images = ["fotoA.webp", "fotoB.jpg", "fotoC.webp"];` e substitua pelos caminhos das imagens desejadas.
   - Essas imagens são exibidas na animação de tiles, em ciclos diagonais.

3. **Menu Mobile**  
   - O elemento `menuBtnMob` controla a abertura/fechamento do menu.  
   - A função `toggleMenu(element)` adiciona ou remove a classe `open`, exibindo ou ocultando o menu mobile.

4. **Dropdown de Temas (Versão Mobile)**  
   - Os elementos `dropdownButton`, `dropdownList` e `dropdownLabel` controlam a lista de temas ou seções na página da galeria.  
   - Ao clicar no botão, a lista suspensa abre ou fecha; ao selecionar um tema, o `dropdownLabel` muda para o nome escolhido.

5. **Galeria e Navegação**  
   - Em páginas como `galeria.html`, você pode organizar fotos em seções, e se houver muitas imagens, recomenda-se **limitar a 20 fotos por página** para melhor performance e organização.

6. **Página de Foto (foto.html)**  
   - Exibe uma foto principal (`.foto-em-destaque`) e um carrossel de miniaturas.  
   - O carrossel permite **clique** nas setas (anterior e próximo) para navegar em “saltos” de largura, além do **recurso de arraste** (mouse/touch).  
   - Cada miniatura (`.carousel-item img`) possui `data-full="..."`, definindo a imagem em tamanho maior. Ao clicar, a foto principal troca.

### Paginação nas galerias
- Caso seja necessário paginar (por exemplo, “página 1”, “página 2”, etc.), recomenda-se usar **no máximo 20 fotos por página**.

## Detalhes do `script.js`

As principais seções do `script.js`:

1. **Variáveis e Seletores**  
   - Referências a elementos como o menu mobile, lista de temas, carrossel, imagens da animação, etc.

2. **Menu do site**  
   - `toggleMenu(element)` e listeners para abrir/fechar o menu mobile.

3. **Animação da página inicial**  
   - Funções `createTiles()`, `flipTiles()`, `showNextImage()`: geram a grade (3×4), fazem o flip diagonal e cíclico das imagens definidas na variável `images`.

4. **Dropdown de Temas**  
   - Mostra/oculta a lista de temas (`dropdownList`) no mobile, atualizando o `dropdownLabel` conforme a escolha do usuário.

5. **Carrossel da página foto**  
   - **Funções de posição**: `getMaxOffset()` e `updateCarouselPosition()` para calcular o limite de deslocamento.  
   - **Botões** (`prevBtn`, `nextBtn`): movem o carrossel em “saltos” de `itemWidth`.  
   - **Drag/Touch**: permite que o usuário arraste o carrossel manualmente (eventos `mousedown`, `mousemove`, `mouseup`, etc.).

## Executando o Projeto

1. **Clone ou baixe** este repositório.  
2. Abra o arquivo `index.html` em seu navegador.  
3. A página inicial exibirá a animação de tiles.  
4. Navegue até outras páginas (biografia, foto, galeria, etc.) pelos links no menu ou digitando o caminho no navegador.

## Observações Finais

- A animação e o carrossel requerem **navegadores modernos** (Chrome, Firefox, Edge, Safari).  
- Substitua ou adicione imagens conforme desejar, ajustando no `script.js` e nos HTMLs específicos.  
- **Limite de 20 fotos por página**: boa prática para evitar excesso de carregamento, especialmente em dispositivos móveis.