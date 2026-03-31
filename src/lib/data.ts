export type Tipo = 'at' | 'nt' | 'sal';

export interface Day {
  d: number;
  date: string;
  theme: string;
  ref: string;
  tipo: Tipo;
  reflexao: string;
  oracao: string;
  bloco: number;
}

export interface Bloco {
  num: number;
  title: string;
  subtitle: string;
  days: [number, number];
  color: string;
}

export const BLOCOS: Bloco[] = [
  { num: 1, title: 'Fundamentos', subtitle: 'Criação, identidade, aliança, sabedoria para o lar', days: [1, 28], color: '#8B6E42' },
  { num: 2, title: 'Jornada e Fé', subtitle: 'Êxodo, Hebreus, João, Salmos de peregrinação', days: [29, 56], color: '#3B6B8B' },
  { num: 3, title: 'Habitação e Presença', subtitle: 'Tabernáculo, Apocalipse 21, João 14–17', days: [57, 84], color: '#5C7A8B' },
  { num: 4, title: 'Profetas e Promessa', subtitle: 'Isaías, Jeremias, Ezequiel e Paulo', days: [85, 112], color: '#6B4A8B' },
  { num: 5, title: 'Os Evangelhos', subtitle: 'Marcos, Lucas, João — Jesus e os relacionamentos', days: [113, 140], color: '#A85C6E' },
  { num: 6, title: 'Sabedoria Prática', subtitle: 'Provérbios, Eclesiastes, Tiago', days: [141, 168], color: '#4A6741' },
  { num: 7, title: 'Cartas e Comunidade', subtitle: 'Paulo, Pedro, João', days: [169, 196], color: '#8B4A42' },
  { num: 8, title: 'Escritos Históricos', subtitle: 'Samuel, Reis, Crônicas', days: [197, 224], color: '#5C6B42' },
  { num: 9, title: 'Salmos e Oração', subtitle: '150 salmos em blocos temáticos', days: [225, 252], color: '#6B5C3B' },
  { num: 10, title: 'Chegada', subtitle: 'Mateus 24–28, Hebreus 11–13, Apocalipse 19–22', days: [253, 276], color: '#C9A96E' },
];

export const DAYS_DATA: Day[] = [
  // BLOCO 1 — FUNDAMENTOS (Dias 1–28)
  // SEMANA 1 — Criação e Chamado
  { d: 1, date: '30 mar', theme: 'Criação: o início de todas as coisas', ref: 'Gênesis 1–2; João 1:1–14', tipo: 'at', bloco: 1, reflexao: 'O mundo começou com a Palavra de Deus. João 1 nos mostra que essa Palavra é uma Pessoa — Jesus. Para um casal que começa uma jornada juntos, é significativo começar reconhecendo que tudo que existe — incluindo o amor de vocês — tem origem nEle.', oracao: 'Senhor, assim como Tu falaste o mundo à existência, fala sobre o nosso relacionamento. Que o começo desta jornada juntos seja marcado pelo reconhecimento de que Tu és o autor da nossa história.' },
  { d: 2, date: '31 mar', theme: 'O jardim: o primeiro lar e a primeira crise', ref: 'Gênesis 3–4', tipo: 'at', bloco: 1, reflexao: 'A queda não destruiu o amor — mas revelou sua vulnerabilidade. Adão e Eva esconderam-se um do outro e de Deus. Para o casal, a tentação de esconder falhas, vergonhas e medos do cônjuge é uma das mais antigas. A redescoberta da intimidade verdadeira começa com honestidade.', oracao: 'Guarda-nos da tentação de esconder quem somos um do outro. Que o nosso relacionamento seja um lugar seguro para a vulnerabilidade e para a verdade.' },
  { d: 3, date: '1 abr', theme: 'A aliança com Abraão: fé e promessa', ref: 'Gênesis 12; 15; 17', tipo: 'at', bloco: 1, reflexao: 'Abraão foi chamado sem mapa — só com promessa. O casamento tem algo dessa estrutura: é uma aliança que exige fé antes da certeza. Deus escolheu Abraão não por sua perfeição, mas por sua disposição de confiar. Essa confiança é também o que sustenta um lar.', oracao: 'Assim como chamaste Abraão a uma jornada de fé, chama-nos também. Que a nossa aliança seja fundada na Tua promessa e não apenas em nossas próprias forças.' },
  { d: 4, date: '2 abr', theme: 'Isaque e Rebeca: a providência no amor', ref: 'Gênesis 24', tipo: 'at', bloco: 1, reflexao: 'A história de Isaque e Rebeca é uma das mais detalhadas narrativas de busca de um cônjuge na Bíblia. O servo ora antes de agir; a família busca a vontade de Deus; Rebeca parte com coragem. A providência de Deus não elimina a agência humana — ela a honra.', oracao: 'Obrigado por como nos trouxeste um ao outro. Que nunca deixemos de ver Tua mão nessa história. E que continuemos a te consultar em cada decisão importante do nosso caminho juntos.' },
  { d: 5, date: '3 abr', theme: 'Jacó: a luta que transforma', ref: 'Gênesis 28–29; 32', tipo: 'at', bloco: 1, reflexao: 'Jacó lutou com Deus e saiu mancando — mas com um nome novo. Muitas vezes as lutas mais transformadoras são as que resistimos por mais tempo. Para o casal, os conflitos não precisam ser destruidores: podem ser momentos onde ambos saem com identidades mais verdadeiras.', oracao: 'Nos momentos de luta — com Tu, entre nós mesmos, ou dentro de cada um — não nos deixes sair os mesmos. Usa as dificuldades para nos moldar.' },
  { d: 6, date: '4 abr', theme: 'José: confiança quando não faz sentido', ref: 'Gênesis 37; 39–41', tipo: 'at', bloco: 1, reflexao: 'José não entendeu o plano de Deus quando estava no poço, nem na prisão. Mas continuou fiel. Para o casal, haverá temporadas onde a jornada juntos parecerá estagnada ou incompreensível. A fidelidade de José nos convida a confiar no narrador mesmo quando a história parece ter dado errado.', oracao: 'Quando nossa jornada juntos passar por "poços" — períodos de espera ou dificuldade — que mantenhamos fé em Ti como o Deus que age mesmo no silêncio.' },
  { d: 7, date: '5 abr', theme: 'Reconciliação: José e seus irmãos', ref: 'Gênesis 45; 50:15–21', tipo: 'at', bloco: 1, reflexao: 'A cena de José revelando-se aos irmãos é uma das mais emocionantes da Bíblia. Ele chora. Ele não guarda rancor. Ele vê a mão de Deus mesmo na traição. Para o casal, o perdão genuíno — não aquele que minimiza a dor, mas o que a carrega e ainda assim liberta — é o modelo de José.', oracao: 'Ensina-nos a perdoar como José — não porque a dor foi pequena, mas porque Tu és maior que ela. Que o nosso amor seja marcado pela capacidade de recomeçar.' },

  // SEMANA 2 — Promessas e Identidade
  { d: 8, date: '6 abr', theme: 'Identidade em Cristo: quem somos antes de qualquer papel', ref: 'Efésios 1–2', tipo: 'nt', bloco: 1, reflexao: 'Paulo começa Efésios não com obrigações, mas com identidade: escolhidos, adotados, redimidos, selados. Para o casal, saber quem cada um é em Cristo antes de ser cônjuge é libertador — não traz dependência doentia, mas amor de pessoas inteiras.', oracao: 'Que eu não busque no meu parceiro aquilo que só Tu podes dar. Que eu entre nesse relacionamento como pessoa completa em Ti, e não como alguém que precisa ser completado.' },
  { d: 9, date: '7 abr', theme: 'O Sermão da Montanha: o jeito de Jesus de viver junto', ref: 'Mateus 5–7', tipo: 'nt', bloco: 1, reflexao: 'As bem-aventuranças descrevem um tipo de pessoa que vai contra a lógica do mundo: os mansos, os misericordiosos, os pacificadores. Para um casal, esse é o retrato de como tratar o cônjuge: sem acumular direitos, sem exigir, construindo pontes onde há ruptura.', oracao: 'Molda-nos de acordo com o Sermão da Montanha. Que as bem-aventuranças não sejam apenas ideais distantes, mas marcas reais do nosso relacionamento.' },
  { d: 10, date: '8 abr', theme: 'Cântico dos Cânticos: o amor celebrado', ref: 'Cântico dos Cânticos 1–3', tipo: 'sal', bloco: 1, reflexao: 'A Bíblia inclui um livro inteiro sobre amor romântico — não apologeticamente, mas com celebração plena. O amor físico, emocional e espiritual entre o amado e a amada é apresentado como dom de Deus. Para o casal, o Cântico dos Cânticos é um convite a celebrar o amor sem culpa.', oracao: 'Obrigado por ter criado o amor romântico e por tê-lo incluso nas Escrituras. Que possamos celebrar nosso amor como dádiva Tua, com alegria e sem vergonha.' },
  { d: 11, date: '9 abr', theme: 'A oração de Paulo pelo casal: amor com conhecimento', ref: 'Filipenses 1:9–11; Efésios 3:14–21', tipo: 'nt', bloco: 1, reflexao: 'Paulo ora para que o amor "abunde cada vez mais em pleno conhecimento e toda a percepção". Amor sem conhecimento é sentimento. Amor com conhecimento é compromisso que cresce. Para o casal, a oração de Paulo é um modelo do que pedir por si mesmos.', oracao: 'Faz com que nosso amor seja profundo em conhecimento mútuo. Que quanto mais nos conhecemos — em nossas falhas, medos e esperanças — mais profundo seja o nosso amor.' },
  { d: 12, date: '10 abr', theme: 'Rute e Noemim: lealdade além do obrigatório', ref: 'Rute 1–4', tipo: 'at', bloco: 1, reflexao: '"Onde tu morreres, morrerei eu." Rute tinha uma saída razoável — e escolheu ficar. O amor maduro tem esse contorno: não fica porque é obrigado, mas porque escolhe ficar. Para o casal, a história de Rute é um espelho de como o amor se parece quando é fiel além do esperado.', oracao: 'Que o nosso amor seja da qualidade da lealdade de Rute: uma escolha renovada todos os dias, não apenas um sentimento passageiro.' },
  { d: 13, date: '11 abr', theme: 'Salmos 8 e 23: Deus como pastor do lar', ref: 'Salmos 8; 23; 121', tipo: 'sal', bloco: 1, reflexao: 'O Salmo 23 não é apenas para funerais — é um retrato de como Deus cuida da vida cotidiana: descanso, restauração, orientação, proteção. Para o casal, Deus quer ser o pastor do lar de vocês — guiando as decisões, restaurando os momentos de cansaço, acompanhando pelos vales.', oracao: 'Sê o pastor do nosso lar. Guia-nos nas decisões difíceis, restaura-nos quando estivermos esgotados, e caminha conosco por todas as etapas desta jornada.' },
  { d: 14, date: '12 abr', theme: 'A lei do amor: o maior mandamento', ref: 'Mateus 22:34–40; 1 João 4:7–21', tipo: 'nt', bloco: 1, reflexao: 'Jesus reduz toda a Lei a dois mandamentos: amar a Deus e amar ao próximo. João vai além: quem ama a Deus ama o irmão. Para o casal, o cônjuge é o "próximo" mais próximo — o primeiro destinatário do amor que transborda de uma vida com Deus.', oracao: 'Que o nosso amor um pelo outro seja fruto do amor que recebemos de Ti. Que amar o meu parceiro seja uma extensão natural de conhecer a Ti.' },

  // SEMANA 3 — Lei, Graça e Perdão
  { d: 15, date: '13 abr', theme: 'Êxodo: a libertação como ato de amor', ref: 'Êxodo 1–6; 14', tipo: 'at', bloco: 1, reflexao: 'Deus ouviu o gemido do povo antes de agir — Ele não estava distante, estava presente na dor. A libertação do Egito começa com Deus ouvindo. Para o casal, a confiança de que Deus ouve as orações de vocês — inclusive as mais difíceis — é a base de toda esperança.', oracao: 'Obrigado por seres o Deus que ouve. Que saibamos trazer nossas lutas e dificuldades a Ti, confiando que Tu escutas antes mesmo de agir.' },
  { d: 16, date: '14 abr', theme: 'A parábola do filho pródigo: graça sem merecimento', ref: 'Lucas 15', tipo: 'nt', bloco: 1, reflexao: 'O pai da parábola vê o filho de longe e corre — não espera, não condiciona. Essa é a imagem mais clara de como Deus nos recebe. Para um casal, cultivar essa mesma graça é essencial: aprender a receber o cônjuge de volta depois de falhas, sem lembrar em perspectiva de punição.', oracao: 'Ensina-nos a correr um em direção ao outro após conflitos, como o pai correu ao filho. Que a graça seja o tom do nosso relacionamento.' },
  { d: 17, date: '15 abr', theme: 'O Servo Sofredor e o amor sacrificial', ref: 'Isaías 52–53', tipo: 'at', bloco: 1, reflexao: 'Isaías 53 é uma das profecias mais impressionantes da Bíblia — um retrato preciso de Cristo séculos antes de Sua vinda. Mas é também um convite ao tipo de amor que se entrega sem garantia de retorno. O amor conjugal maduro tem essa marca: serve mesmo quando não é visto, carrega mesmo quando é pesado.', oracao: 'Diante do amor sacrificial que Tu demonstraste, humilha nossos corações para que o serviço mútuo seja nossa resposta natural e não apenas nossa obrigação.' },
  { d: 18, date: '16 abr', theme: 'A ressurreição: esperança que transforma tudo', ref: '1 Coríntios 15; João 20', tipo: 'nt', bloco: 1, reflexao: 'A ressurreição não é apenas evento passado — é força presente. Paulo diz que sem ela, a fé é vã. Para um casal, a esperança da ressurreição transforma como encaram o tempo juntos: as dificuldades são provisórias, os conflitos são remediáveis, e o futuro é garantido por Deus.', oracao: 'Que a esperança da ressurreição nos liberte da ansiedade sobre o futuro do nosso relacionamento. Tu fizeste o impossível — podes também restaurar e renovar.' },
  { d: 19, date: '17 abr', theme: 'Salmos de lamento: honestidade diante de Deus', ref: 'Salmos 22; 42; 88', tipo: 'sal', bloco: 1, reflexao: 'Esses salmos não são exemplos de falta de fé — são modelos de honestidade radical com Deus. O lamento bíblico reconhece a dor sem negar a presença de Deus. Para o casal, aprender a lamentar juntos — em vez de fingir que está tudo bem — é uma forma profunda de intimidade espiritual.', oracao: 'Ensina-nos a sermos honestos com Ti e entre nós, especialmente nas dores. Que não precisemos performar força quando estivermos frágeis.' },
  { d: 20, date: '18 abr', theme: 'A bênção de Aarão e o nome de Deus', ref: 'Números 6:22–27; João 17', tipo: 'at', bloco: 1, reflexao: 'A bênção sacerdotal — "o Senhor te abençoe e te guarde" — foi pronunciada sobre Israel por séculos. Em João 17, Jesus intercede pelos seus com o mesmo cuidado. Para o casal, pronunciar bênçãos sobre o cônjuge é um ato priesterial bonito: declarar sobre o amado o que Deus vê nele.', oracao: 'Ensina-nos a abençoar um ao outro com palavras. Que nossa boca seja instrumento de edificação e não de destruição no relacionamento.' },
  { d: 21, date: '19 abr', theme: 'Cântico dos Cânticos: o reencontro e a espera', ref: 'Cântico dos Cânticos 4–8', tipo: 'sal', bloco: 1, reflexao: 'A segunda metade do Cântico aprofunda o retrato da intimidade e da espera. A noiva busca o amado com urgência; o amor é descrito como "forte como a morte". Para o casal em noivado, essa espera ansiosa pelo encontro completo é santificada por Deus — a antecipação faz parte da dádiva.', oracao: 'Santifica nossa espera. Que a antecipação que sentimos seja oferecida a Ti como oferta de obediência e confiança em Teu timing perfeito.' },

  // SEMANA 4 — Sabedoria para o Lar
  { d: 22, date: '20 abr', theme: 'Provérbios: a sabedoria no cotidiano', ref: 'Provérbios 1–4', tipo: 'at', bloco: 1, reflexao: 'Provérbios começa com um pai ensinando o filho sobre a vida prática. A sabedoria aqui não é abstrata — é como falar, como trabalhar, como se relacionar. Para o casal, Provérbios 3 especialmente é convite à humildade que um relacionamento duradouro exige.', oracao: 'Dai-nos sabedoria prática para as decisões que tomamos juntos — sobre dinheiro, tempo, família e prioridades. Que dependamos mais de Ti do que de nós mesmos.' },
  { d: 23, date: '21 abr', theme: 'A mulher virtuosa — e o homem que a celebra', ref: 'Provérbios 31; Efésios 5:25–33', tipo: 'at', bloco: 1, reflexao: 'Provérbios 31 é frequentemente lido apenas como padrão para mulheres, mas é também uma carta de admiração de um homem por sua esposa. Efésios 5 complementa: o amor do marido deve ser modelado no amor sacrificial de Cristo. Ambos os textos colocam a barra no mais alto nível de cuidado mútuo.', oracao: 'Que eu aprenda a ver e celebrar as qualidades do meu parceiro como dons de Deus. Que o nosso amor mútuo reflita o amor de Cristo pela Igreja.' },
  { d: 24, date: '22 abr', theme: 'Eclesiastes: encontrando sentido no efêmero', ref: 'Eclesiastes 3; 9; 12', tipo: 'sal', bloco: 1, reflexao: 'Qohélet olha para a vida com honestidade brutal: tudo passa, tudo é vaidade — exceto o que é feito com Deus. Para o casal, esse texto liberta: a perfeição não é o objetivo, a presença é. Aproveitem cada momento juntos como dádiva, não como conquista.', oracao: 'Ensina-nos a valorizar o presente um do outro. Que não adiantemos tanto o futuro que percamos o presente que Tu nos oferes hoje.' },
  { d: 25, date: '23 abr', theme: 'O discurso de Jó a Deus: integridade na dor', ref: 'Jó 1–2; 38–42', tipo: 'at', bloco: 1, reflexao: 'Jó não entendeu suas circunstâncias, mas manteve sua integridade diante de Deus. No final, Deus não explica — Ele se revela. Para o casal, haverá momentos de dor sem explicação. Jó mostra que não é necessário entender tudo para confiar em quem conhece tudo.', oracao: 'Quando não entendermos as dificuldades que enfrentaremos como casal, que confiemos no Deus de Jó. Que a nossa fé sobreviva às perguntas sem resposta.' },
  { d: 26, date: '24 abr', theme: 'O Espírito Santo e os dons para o corpo', ref: '1 Coríntios 12; Romanos 12:1–13', tipo: 'nt', bloco: 1, reflexao: 'Paulo fala de um corpo com muitas partes — cada uma diferente, cada uma necessária. Para o casal, reconhecer os dons específicos que Deus deu a cada um é uma forma de honrar a singularidade do cônjuge, sem tentar moldá-lo à própria imagem.', oracao: 'Obrigado pelos dons que Tu deste a cada um de nós diferentemente. Ensina-nos a celebrar nossas diferenças como complementaridade e não como fonte de conflito.' },
  { d: 27, date: '25 abr', theme: 'A oração como respiração do relacionamento', ref: 'Mateus 6:5–15; Lucas 11:1–13', tipo: 'nt', bloco: 1, reflexao: 'Jesus ensina a orar de forma comunitária: "Pai nosso" — não "Pai meu". A oração em conjunto é uma das práticas mais transformadoras para um casal cristão. O Pai Nosso em si é um roteiro: adoração, submissão, provisão, perdão, proteção.', oracao: 'Ensina-nos a orar juntos com facilidade e profundidade. Que a nossa oração em casal seja tão natural quanto a nossa conversa.' },
  { d: 28, date: '26 abr', theme: 'Colossenses: Cristo em primeiro lugar', ref: 'Colossenses 1–3', tipo: 'nt', bloco: 1, reflexao: 'Paulo pede que Cristo tenha preeminência em tudo — não apenas nos domingos, mas no trabalho, nas relações, nas decisões. Em Colossenses 3, ele conecta essa centralidade com as relações domésticas. Para o casal, colocar Cristo primeiro não é slogan — é reorganização de prioridades concreta.', oracao: 'Que Cristo seja o centro do nosso lar de forma prática e visível. Que nossas prioridades de tempo, dinheiro e energia reflitam que Tu vieres primeiro.' },
];

// Generate placeholder days for 29–276
const START_DATE = new Date(2026, 2, 30); // March 30, 2026

function getDateStr(dayNum: number): string {
  const d = new Date(START_DATE);
  d.setDate(d.getDate() + dayNum - 1);
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }).replace('.', '');
}

const BLOCO_REFS: Record<number, { themes: string[]; refs: string[]; tipos: Tipo[] }> = {
  2: {
    themes: ['Êxodo e a jornada de fé', 'Hebreus: uma fé que persevera', 'João: o pão da vida', 'Salmos de peregrinação', 'A travessia do deserto', 'Moisés e a mediação', 'A Páscoa: sangue e libertação'],
    refs: ['Êxodo 15–18', 'Hebreus 11', 'João 6', 'Salmos 84; 120–134', 'Êxodo 19–24', 'Números 12–14', 'Êxodo 12–13'],
    tipos: ['at', 'nt', 'nt', 'sal', 'at', 'at', 'at'],
  },
  3: {
    themes: ['O tabernáculo: Deus habitando no meio', 'Apocalipse 21: a nova criação', 'João 14: a Casa do Pai', 'Levítico e a santidade', 'A glória de Deus enchendo o templo', 'A presença que guia', 'A oração sumo-sacerdotal'],
    refs: ['Êxodo 25–31', 'Apocalipse 21', 'João 14–17', 'Levítico 1–7', '1 Reis 8', 'Números 9–10', 'João 17'],
    tipos: ['at', 'nt', 'nt', 'at', 'at', 'at', 'nt'],
  },
  4: {
    themes: ['Isaías: o servo sofredor', 'Jeremias: o profeta do lamento', 'Ezequiel e a visão da glória', 'O novo coração prometido', 'Isaías 40: consolação', 'O cumprimento em Paulo', 'Promessas para o futuro'],
    refs: ['Isaías 40–45', 'Jeremias 29–31', 'Ezequiel 1; 36–37', 'Ezequiel 36:26', 'Isaías 40', 'Romanos 8', 'Isaías 65–66'],
    tipos: ['at', 'at', 'at', 'at', 'at', 'nt', 'at'],
  },
  5: {
    themes: ['Marcos: Jesus em ação', 'Lucas: o evangelho da graça', 'João: o Verbo se fez carne', 'Jesus e a mulher samaritana', 'O milagre nas bodas de Caná', 'Jesus e Maria Madalena', 'A última ceia'],
    refs: ['Marcos 1–4', 'Lucas 1–4', 'João 1–4', 'João 4', 'João 2', 'João 20', 'Lucas 22'],
    tipos: ['nt', 'nt', 'nt', 'nt', 'nt', 'nt', 'nt'],
  },
  6: {
    themes: ['Provérbios sobre o lar', 'Eclesiastes: tudo tem seu tempo', 'Tiago: fé que age', 'Provérbios sobre a língua', 'Sabedoria nas finanças', 'A amizade fiel', 'O descanso como sabedoria'],
    refs: ['Provérbios 10–15', 'Eclesiastes 3–5', 'Tiago 1–2', 'Provérbios 16–18', 'Provérbios 22–24', 'Provérbios 17; 27', 'Eclesiastes 4; Mateus 11:28'],
    tipos: ['at', 'sal', 'nt', 'at', 'at', 'at', 'sal'],
  },
  7: {
    themes: ['Romanos: justificados pela fé', 'Gálatas: liberdade em Cristo', 'Filipenses: alegria no sofrimento', 'Colossenses: Cristo preeminente', '1 Timóteo: liderança e família', '1 Pedro: esperança no sofrimento', '1 João: o amor que permanece'],
    refs: ['Romanos 1–5', 'Gálatas 1–3', 'Filipenses 1–4', 'Colossenses 1–4', '1 Timóteo 1–6', '1 Pedro 1–5', '1 João 1–5'],
    tipos: ['nt', 'nt', 'nt', 'nt', 'nt', 'nt', 'nt'],
  },
  8: {
    themes: ['Davi: um coração segundo Deus', 'Salomão: sabedoria e queda', 'O rei que buscou a Deus', 'Josias e a reforma', 'Ester: coragem no lugar certo', 'Neemias: reconstrução', 'Daniel: fidelidade no exílio'],
    refs: ['1 Samuel 16–17; 2 Samuel 7', '1 Reis 3–4; 11', '2 Reis 22–23', '2 Crônicas 34–35', 'Ester 1–10', 'Neemias 1–6', 'Daniel 1; 6'],
    tipos: ['at', 'at', 'at', 'at', 'at', 'at', 'at'],
  },
  9: {
    themes: ['Salmos de louvor', 'Salmos de lamento', 'Salmos de confiança', 'Salmos de peregrinação', 'Salmos de criação', 'Salmos de vitória', 'Salmos de entrega'],
    refs: ['Salmos 96–100', 'Salmos 6; 13; 22', 'Salmos 46; 91', 'Salmos 120–134', 'Salmos 8; 19; 104', 'Salmos 2; 110; 118', 'Salmos 23; 131; 139'],
    tipos: ['sal', 'sal', 'sal', 'sal', 'sal', 'sal', 'sal'],
  },
  10: {
    themes: ['O monte das Oliveiras: o fim dos tempos', 'Hebreus 11: a nuvem de testemunhas', 'Apocalipse: a noiva se preparou', 'O casamento do Cordeiro', 'Hebreus 12: a corrida com perseverança', 'A nova Jerusalém', 'Chegada: Maranata!'],
    refs: ['Mateus 24–25', 'Hebreus 11', 'Apocalipse 19–20', 'Apocalipse 21–22', 'Hebreus 12–13', 'Apocalipse 21:1–5', 'Mateus 28; Apocalipse 22:20'],
    tipos: ['nt', 'nt', 'nt', 'nt', 'nt', 'nt', 'nt'],
  },
};

const REFLEXOES_GENERICAS: Record<number, string> = {
  2: 'A jornada de fé de Israel pelo deserto espelha a caminhada de um casal: há dias de maná e dias de reclamação, momentos de glória e momentos de dúvida. O que sustenta a caminhada não é o terreno, mas a presença de Deus.',
  3: 'A presença de Deus não é apenas para os templos — Ele quer habitar no meio da vida cotidiana do casal. Como o tabernáculo era o centro do acampamento, Cristo deve ser o centro do lar.',
  4: 'Os profetas falam de um coração transformado, não apenas de regras cumpridas. Para o casal, o relacionamento maduro nasce de dentro para fora — de corações moldados por Deus.',
  5: 'Jesus mostrou em cada interação como o amor verdadeiro se parece: ele vê, ele ouve, ele toca, ele restaura. Observar Jesus tratar as pessoas é aprender a tratar o cônjuge.',
  6: 'A sabedoria bíblica é prática, não apenas espiritual. Tiago diz que fé sem obras é morta — e assim também o amor sem ações concretas no dia a dia.',
  7: 'As cartas de Paulo mostram o amor cristão em ação numa comunidade real — com seus conflitos, diferenças e necessidade de graça. O casal é a menor comunidade cristã.',
  8: 'Os grandes líderes bíblicos — Davi, Salomão, Neemias — mostram que a grandeza não está na ausência de falhas, mas na disposição de retornar a Deus após elas.',
  9: 'Os Salmos cobrem toda a gama da experiência humana: alegria, lamento, raiva, espanto, gratidão. Eles nos ensinam que não há emoção que seja inapropriada para levar a Deus.',
  10: 'A chegada ao fim do plano espelha a chegada ao casamento: não é fim de jornada, mas início de uma nova. Assim como a Bíblia termina em "Maranata", o casamento começa com uma promessa de presença eterna.',
};

for (let dayNum = 29; dayNum <= 276; dayNum++) {
  const bloco = BLOCOS.find(b => dayNum >= b.days[0] && dayNum <= b.days[1])!;
  const blocoData = BLOCO_REFS[bloco.num];
  const weekInBloco = Math.floor((dayNum - bloco.days[0]) / 7) % blocoData.themes.length;
  
  DAYS_DATA.push({
    d: dayNum,
    date: getDateStr(dayNum),
    theme: blocoData.themes[weekInBloco],
    ref: blocoData.refs[weekInBloco],
    tipo: blocoData.tipos[weekInBloco],
    bloco: bloco.num,
    reflexao: REFLEXOES_GENERICAS[bloco.num] || 'Cada dia desta jornada é um presente de Deus para o casal — uma oportunidade de crescer juntos no conhecimento dEle e um do outro.',
    oracao: 'Que este dia de leitura nos aproxime mais de Ti e mais um do outro. Que Tua Palavra não retorne vazia, mas produza fruto em nossas vidas e no nosso relacionamento.',
  });
}

export const TOTAL_DAYS = DAYS_DATA.length;

export function getDayByNumber(d: number): Day | undefined {
  return DAYS_DATA.find(day => day.d === d);
}

export function getBlocoForDay(d: number): Bloco {
  return BLOCOS.find(b => d >= b.days[0] && d <= b.days[1]) || BLOCOS[0];
}

export function getWeekLabel(d: number): string {
  const week = Math.ceil(d / 7);
  const weekInBloco = Math.ceil((d - (getBlocoForDay(d).days[0] - 1)) / 7);
  const bloco = getBlocoForDay(d);
  return `Semana ${week} — ${bloco.title}`;
}
