# Aplicativo de Rastreamento de Viagens

Este é um aplicativo de rastreamento de viagens que permite aos usuários acompanhar suas viagens e visualizar detalhes como distância, duração, velocidade máxima e rota em um mapa.

## Recursos

- Iniciar e parar o rastreamento da viagem
- Exibir a velocidade atual durante a viagem
- Registrar as posições da viagem e calcular distância, duração e velocidade máxima
- Exibir detalhes da viagem, incluindo cidade, país, distância, duração e horário de início
- Mostrar a rota da viagem em um mapa usando o OpenStreetMap

## Tecnologias Utilizadas

- HTML, CSS, Bootstrap e JavaScript
- Leaflet.js (para renderização do mapa)
- API de Geolocalização (para rastrear a posição do usuário, a API só funciona em um contexto seguro via https ou no local host por isso o uso do Ngrok) - https://api.bigdatacloud.net/
- Ngrok (para criar uma URL pública para desenvolvimento local)

## Como Começar

1. Clone o repositório:

git clone https://github.com/santiagritzky/app_rider

2.Instale e execute o Ngrok para criar uma URL pública para o servidor de desenvolvimento local:

./ngrok http 5500

3.Acesse o aplicativo em seu navegador usando a URL do Ngrok.

Uso:

Clique no botão "Iniciar" para começar o rastreamento da viagem.
Durante a viagem, a velocidade atual será exibida.
Clique no botão "Parar" para encerrar a viagem e visualizar os detalhes da viagem.
Os detalhes da viagem, incluindo distância, duração, velocidade máxima e rota, serão exibidos.
A rota da viagem será mostrada no mapa.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhorias, sinta-se à vontade para enviar um pull request.
