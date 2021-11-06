# Release

In this file, you indicate the status of your assignment by checking the checkboxes below. No unchecked checkboxes are allowed in the document when your hand in for the assessment.

## Release status

- [x] I have started working on the assignment.
- [x] `npm install` is being used to install all dependencies.
- [x] `npm start` is being used to start the application.
- [x] All functional requirements are fulfilled.
- [x] All Production requirements are fulfilled.
- [x] All non-functional requirements are fulfilled.
- [x] I have completed the assignment report (see below).

---

- [x] I intend to submit the assignment and at the same time I guarantee that I am the one who created the code that is submitted. In cases where I use external libraries or borrowed code from other sources, the source is clearly stated.
(_Jag avser göra en inlämning av uppgiften och jag garanterar samtidigt att jag är den som skapat koden som lämnas in. I de fall jag använder externa bibliotek eller har lånat kod från andra källor så är källan tydligt angiven._)

---

## Assignment report

### URL to your application

https://cscloud462.lnu.se
(Self-signed certificate)

### Security

Jag har satt upp SSL-certifikat för trafiken mellan användare och nginx.
Kod-mässigt har jag endast gjort att man hamnar tillbaka till startsidan ifall man inte är inloggad. Även websocket körs automatiskt 
över wss.

### Description of entities

_ Describe the following parts, how you are using them, and what their purpose is in your solution:

- Reversed proxy
  nginx som ligger och tar emot anrop och skickar vidare till min applikation utefter hur requesten ser ut.
- Process manager
  pm2 som ligger och wrappar runt min applikation och ser till den startar om vid krascher m.m. Inte konfigurerad mycket då man kan göra 
  många olika saker inom bland annat monitoring.
- TLS certificates
  Transport Layer Security är de SSL-certifikat jag har lagt in till nginx för att kryptera anslutningarna.
- Environment variables
  dotenv package kör jag i appen för att kunna styra specifika saker som även kan vara känsliga t.ex. secret för application till gitlab.lnu.se.
_

### Development vs. Production

_What differs in your application when running it in development from running it in production?_
Detta påverkar express genom att använda cache funktioner för view templates och genererar kortare felmeddelanden vid händelser.

### Use of external dependencies

- express, express-hbs, express-session
  Webservern i sig med view engine och session för hantera användar sessioner.
- gitlab
  gitlab är ett npm package som gör det lättare att hämta issues och projects ifrån ett gitlab api.
  Här används även https vid hämtning av data.
- axios
  axios är en webklient som kan göra http-requests till websidor. I detta fallet används det till att verifiera med oauth till gitlab.lnu.se.
  Använder https när den gör sina requests.
- dotenv
  dotenv är ett package som används för att ladda in .env filen med variablar som behövs för appen.
  Säkerhetsmässigt så laddas väl inte den riktiga .env filen in till repository utan sätts vid production deployment.
- socket.io
  socket.io är ett package som använder websocket för att skapa en realtids connection mellan klient och server.
  Den går över till secure websocket (wss) när det finns tillgängligt. Just nu är det auto-discovery men nginx tvingar wss.
- helmet
  Satte upp helmet så den åtminstone kör med grundläggande säkerhet för HTTP headers.

### Overall Reflection

Jag började denna assignment med att jag ville göra oauth istället för hårdkodat så jag fick en utaming. Det var inte direkt svårt men tog tid att läsa sig till
bland annat varför man ska använda PKCE (Proof Key for Code Exchange) istället för att försöka använda implicit grant. Det gör att access_token till api:et hamnar endast hos appen och aldrig hos klienten utan det är session cookien som identifierar användaren.

Blev riktigt förkyld inför helgen och allting blev släpandes över helgen innan deadline så fick lösa det som kraven i stort sett visades. Mestadels är det klient javascript och css som behöver fixas till för att det ska presenteras på ett bättre sätt.
Det var mycket som blev mer komplicerat bara för jag valde oauth ifrån början, t.ex. hur man skulle veta vilken användare som var på vilken socket.
Jag valde istället att lägga dem i "room" per projekt så alla som kollar på ett projekt i taget hamnar i det rummet för webhooks. Detta kan förbättras senare.

Ngrok valde jag testa på, funkade jättebra och var värdefullt verktyg för att se varje POST som kom in ifrån webhook.

### Further improvments

Jag hann inte fixa all säkerhet. Bland annat verifiera det är gitlab.lnu.se webhooken kommer ifrån och verifiera webhooken.
Men även att lägga till webhook automatiskt hann jag inte med.
Jag hade velat fixa mycket mer frontend och presentation, dvs så issues hålls uppdaterade så mycket som möjligt, nu får man bara notifications. 
Skulle vilja fixa iordning koden för det var så mycket nya saker när det gäller gitlab och det finns inte mycket att gå på och hur man skulle strukturera för det apiet.
Flera saker blev lite kaos-artade till slut efter man försökt flera saker och förstå sig på hur det fungerade.

### Extras

Oauth var väl inte krav men det enda jag implementera.
Man väljer vilket project eller repository till att kolla på men det är ingen automatisk webhook för tillfället.

### Feedback

Jag gillade uppgiften och hade gärna haft mer tid men med sjukdom så blev det mer problem och jag försökte hinna klart grundkraven innan inlämning.
Gillar dock ta vatten över huvudet och ge mig på svårare saker som oauth som jag inte implementerat innan.
