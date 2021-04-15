# Sobre o projeto

Este projeto lista os quadrinhos da Marvel e permite que o usuário selecione um ou mais itens e os envie por e-mail.

Você pode acessá-lo através deste [link](https://cristiano-soares.github.io/marvel-app/).

## Instruções

Para rodar o projeto execute ```yarn start```.

## Sobre a implementação

Para melhorar a experiência de uso e a performance do app, foi implementada uma infinity scroll na lista de quadrinhos utilizando o ```IntersectionObserver``` para identificar o último quadrinho da página.

Para o envio do e-mail foi utilizado o [Emailjs](https://www.emailjs.com/), o que facilitou a implementação mas trouxe certas limitações. O ideal seria implementar um serviço de backend específico para o envio de e-mails.

Os quadrinhos podem ser selecionados com um clique sobre eles. Para ver detalhes do quadrinho é necessário clicar sobre o título do mesmo.

## Considerações finais

Por conta da limitação do tempo, optei por criar apenas um teste unitário (ComicCard) apenas para efeito de demonstração do conhecimento em Jest.