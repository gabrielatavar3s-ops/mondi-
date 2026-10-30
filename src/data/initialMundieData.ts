import {
  CharacterProfile,
  ComicPage,
  Episode,
  NarrativeState,
  Season,
} from '../types/mundie';

export const GENERATED_ASSETS = {
  mundieBrandLogo: '/assets/aistudio/imagem_2026-10-30_162913229_8784ad86.png',
  heroEntreNos: '/src/assets/images/hero_entre_nos_1793381246117.jpg',
  miaPortrait: '/src/assets/images/char_mia_portrait_1793381247976.jpg',
  aylaPortrait: '/src/assets/images/char_ayla_portrait_1793381249724.jpg',
  noahPortrait: '/src/assets/images/char_noah_portrait_1793381251555.jpg',
  leoPortrait: '/src/assets/images/char_leo_portrait_1793381253265.jpg',
  ep01PilotScene: '/src/assets/images/ep01_pilot_scene_1793381253717.jpg',
  ep01BedroomPhone: '/src/assets/images/ep01_mia_bedroom_phone_1793385098223.jpg',
  ep01CafePapelariaSol: '/src/assets/images/ep01_cafe_papelaria_sol_1793385100571.jpg',
  ep01BranchAStairs: '/src/assets/images/ep01_branch_a_stairs_1793385103339.jpg',
  ep01BranchBLockerNote: '/src/assets/images/ep01_branch_b_locker_note_1793385103755.jpg',
  ep01BranchCCorridorNoah: '/src/assets/images/ep01_branch_c_corridor_noah_1793385103458.jpg',
};

export const INITIAL_SEASONS: Season[] = [
  {
    id: 'season-entre-nos',
    number: 1,
    title: 'ENTRE NÓS',
    tagline: 'Todo mundo tem uma história que ninguém vê.',
    ageRange: '10 a 14 anos',
    editorialNote:
      'Coleção inaugural da MUNDIÊ: dez histórias em quadrinhos interativas onde decisões narrativas despertam soft skills reais a partir de dilemas autênticos da pré-adolescência.',
    heroImageUrl: GENERATED_ASSETS.heroEntreNos,
  },
];

export const INITIAL_CHARACTERS: CharacterProfile[] = [
  {
    id: 'mia',
    name: 'Mia',
    age: 12,
    shortRole: 'Observadora e ilustradora de cadernos',
    visualSignature:
      'Cabelo preto longo e liso, jaqueta azul-cobalto, caderno de desenho sempre por perto.',
    personalityTraits: ['Criativa', 'Observadora', 'Atenta aos detalhes', 'Leal'],
    internalConflict:
      'Tem medo de ser deixada para trás nas amizades à medida que os interesses do grupo mudam.',
    biography:
      'Mia repara em tudo o que passa despercebido na sala: quem mudou de lugar, quem apagou um story, quem sorriu sem vontade. Seu caderno de esboços é onde organiza o que sente, mas essa mesma sensibilidade às vezes faz com que ela preencha silêncios com receios antes de perguntar.',
    signatureQuote:
      '“Eu não ligo de ficar quieta. Só dói achar que ninguém notou que eu não estava lá.”',
    portraitUrl: GENERATED_ASSETS.miaPortrait,
    accentHex: '#244B8A',
    softBgHex: '#E5ECF8',
    appearancesCount: 8,
  },
  {
    id: 'ayla',
    name: 'Ayla',
    age: 13,
    shortRole: 'Sensível, reservada e apaixonada por música',
    visualSignature:
      'Cabelo preto longo com franja leve, moletom roxo-lavanda, fones no pescoço.',
    personalityTraits: ['Sensível', 'Independente', 'Ouvinte', 'Introspectiva'],
    internalConflict:
      'Tem dificuldade de falar sobre os próprios sentimentos e tende a se fechar quando está sobrecarregada.',
    biography:
      'Um ano mais velha que parte da turma, Ayla parece segura e autossuficiente de longe. Na prática, sente tudo com intensidade e trava quando precisa pedir ajuda ou explicar por que sumiu por alguns dias, preferindo gestos discretos a conversas em grupo.',
    signatureQuote:
      '“Não é que eu não confie em vocês. É que às vezes nem eu sei explicar o que tá acontecendo comigo.”',
    portraitUrl: GENERATED_ASSETS.aylaPortrait,
    accentHex: '#6E56AF',
    softBgHex: '#EEEAF8',
    appearancesCount: 7,
  },
  {
    id: 'noah',
    name: 'Noah',
    age: 12,
    shortRole: 'Articulador da turma e planejador nato',
    visualSignature:
      'Pele negra, cabelo crespo curto bem definido, jaqueta jeans sobre camiseta pêssego.',
    personalityTraits: ['Comunicativo', 'Organizado', 'Prestativo', 'Mediador'],
    internalConflict:
      'Tenta controlar situações que fogem do seu planejamento para evitar que os amigos briguem.',
    biography:
      'Noah é quem cria o grupo do trabalho, lembra os aniversários e tenta manter todo mundo unido. Quando algo sai do roteiro, porém, ele assume responsabilidades demais sozinho e acaba escondendo problemas para entregar tudo resolvido.',
    signatureQuote:
      '“Eu achei que, se eu resolvesse tudo rápido, ninguém ia sair magoado.”',
    portraitUrl: GENERATED_ASSETS.noahPortrait,
    accentHex: '#2F5D8C',
    softBgHex: '#FBECE3',
    appearancesCount: 8,
  },
  {
    id: 'leo',
    name: 'Leo',
    age: 12,
    shortRole: 'Bem-humorado, espontâneo e inquieto',
    visualSignature:
      'Pele clara com sardas, cabelo castanho ondulado, boné vermelho-coral.',
    personalityTraits: ['Espontâneo', 'Engraçado', 'Impulsivo', 'Afetuoso'],
    internalConflict:
      'Usa o humor para esconder inseguranças e desviar de conversas tensas.',
    biography:
      'Leo quebra qualquer silêncio desconfortável com uma piada em três segundos. Por trás da leveza, morre de receio de perder espaço na turma ou parecer vulnerável. Muitas vezes posta ou fala por impulso sem perceber como aquilo soa para quem está de fora.',
    signatureQuote:
      '“Foi mal, eu fiz piada porque não sabia que cara fazer na hora!”',
    portraitUrl: GENERATED_ASSETS.leoPortrait,
    accentHex: '#D65A47',
    softBgHex: '#FCEAE6',
    appearancesCount: 7,
  },
];

export const PILOT_EPISODE_PAGES: ComicPage[] = [
  // =========================================================================
  // ATO I — PÁGINAS 01 A 04 (TRONCO NARRATIVO INICIAL)
  // =========================================================================
  {
    id: 'ep01-p1',
    pageNumberLabel: 'Página 01',
    title: 'O silêncio no meio da frase',
    nextPageId: 'ep01-p2',
    learningNote: {
      skillFocus: 'Autopercepção & Leitura de Contexto',
      pedagogicalTitle: 'Quando um detalhe acende o alerta interno',
      insight:
        'Notar mudanças de tom no grupo faz parte da sensibilidade social de Mia. O desafio socioemocional começa quando uma observação real (“eles pararam de falar”) se transforma imediatamente em certeza (“estão me excluindo”).',
    },
    panels: [
      {
        id: 'p1-panel-1',
        order: 1,
        title: 'Pátio da Escola Castro Alves — 10h15',
        framing: 'wide',
        visualPreset: 'courtyard-silence',
        imageUrl: GENERATED_ASSETS.ep01PilotScene,
        imageObjectPosition: 'center 35%',
        atmosphereTint: 'warm',
        sceneCaption:
          'Quinta-feira, intervalo da manhã. O barulho do pátio parecia igual ao de sempre — até Mia chegar perto dos armários.',
        altText:
          'Ilustração em estilo webtoon do pátio escolar: Ayla, Leo e Noah conversam próximos aos armários ao fundo enquanto Mia observa em primeiro plano.',
        bubbles: [
          {
            id: 'b-p1-1',
            speaker: 'Leo',
            text: '...não, sério, se a gente passar lá antes das três dá tempo tranquilo, só não comenta nada perto dela—',
            style: 'fala',
            position: 'top-left',
          },
        ],
        aiPromptSpec: {
          scenePrompt:
            'Wide school courtyard break scene, three friends talking near lockers while Mia approaches in blue jacket',
          cameraAngle: 'Plano geral com profundidade de campo suave',
          lightingMood: 'Luz solar de manhã tardia com sombra fria no primeiro plano',
          characterRefs: ['mia', 'ayla', 'noah', 'leo'],
          integrationStatus: 'custom_uploaded',
        },
      },
      {
        id: 'p1-panel-2',
        order: 2,
        title: 'A troca de olhares',
        framing: 'split',
        visualPreset: 'friends-awkward-pause',
        imageUrl: GENERATED_ASSETS.miaPortrait,
        imageObjectPosition: 'center 22%',
        atmosphereTint: 'neutral',
        altText:
          'Enquadramento duplo mostrando Mia segurando seu caderno de desenho e a pausa repentina entre os três amigos.',
        bubbles: [
          {
            id: 'b-p1-2',
            speaker: 'Mia',
            text: 'Oi, gente! Olha só o rascunho que eu fiz pro cartaz da mostra...',
            style: 'fala',
            position: 'top-left',
          },
          {
            id: 'b-p1-3',
            speaker: 'Leo',
            text: 'Ah! Oi, Mia! A gente tava... é... falando do relatório de Ciências.',
            style: 'fala',
            position: 'bottom-right',
          },
          {
            id: 'b-p1-4',
            speaker: 'Mia',
            text: 'Ciências? Mas o Noah e a Ayla nem fazem dupla de laboratório...',
            style: 'pensamento',
            position: 'bottom-left',
          },
        ],
      },
    ],
  },
  {
    id: 'ep01-p2',
    pageNumberLabel: 'Página 02',
    title: 'Três pontinhos e nada',
    nextPageId: 'ep01-p3',
    learningNote: {
      skillFocus: 'Ansiedade Digital & Tolerância à Incerteza',
      pedagogicalTitle: 'O peso emocional do “visualizado”',
      insight:
        'Na comunicação digital faltam expressão facial, tom de voz e contexto do que acontece do outro lado da tela. Sem essas pistas, o silêncio costuma ser lido como rejeição pessoal.',
    },
    panels: [
      {
        id: 'p2-panel-1',
        order: 1,
        title: 'Grupo “Quarteto do Pátio” — 16h40',
        framing: 'medium',
        visualPreset: 'phone-group-chat',
        atmosphereTint: 'cool',
        sceneCaption:
          'Sexta-feira à tarde. Em casa, Mia resolveu mandar um convite simples para testar se o clima estranho era impressão sua.',
        altText:
          'Quadro ilustrado da tela do celular de Mia mostrando sua mensagem no grupo sem resposta, apesar das confirmações de leitura.',
        bubbles: [
          {
            id: 'b-p2-1',
            text: 'Visualizado por Ayla, Noah e Leo às 16h44. “Noah está digitando...” apareceu duas vezes e sumiu.',
            style: 'narracao',
            position: 'bottom-right',
          },
        ],
      },
      {
        id: 'p2-panel-2',
        order: 2,
        title: 'O quarto ao entardecer',
        framing: 'wide',
        visualPreset: 'mia-bedroom-twilight',
        imageUrl: GENERATED_ASSETS.ep01BedroomPhone,
        imageObjectPosition: 'center center',
        atmosphereTint: 'lavender',
        altText:
          'Mia sentada na escrivaninha do quarto ao entardecer, olhando o celular aceso ao lado do caderno de desenho aberto e duas canetas nanquim sem tampa.',
        bubbles: [
          {
            id: 'b-p2-2',
            speaker: 'Mia',
            text: 'Minhas canetas secaram bem na semana da mostra... e parece que todo mundo sumiu junto.',
            style: 'pensamento',
            position: 'top-left',
          },
          {
            id: 'b-p2-3',
            text: 'Às vezes o silêncio na tela ocupa mais espaço no quarto do que uma resposta negativa.',
            style: 'narracao',
            position: 'bottom-right',
          },
        ],
      },
    ],
  },
  {
    id: 'ep01-p3',
    pageNumberLabel: 'Página 03',
    title: 'A foto de sábado',
    nextPageId: 'ep01-p4',
    learningNote: {
      skillFocus: 'Pensamento Crítico & Comparação Social',
      pedagogicalTitle: 'O recorte invisível de cada publicação',
      insight:
        'Uma foto captura um instante de risada, mas esconde o antes e o depois (repare na sacolinha de papel pardo sobre a mesa). Quando estamos inseguros, vemos apenas a nossa ausência na cena.',
    },
    panels: [
      {
        id: 'p3-panel-1',
        order: 1,
        title: 'Story publicado há 18 minutos',
        framing: 'wide',
        visualPreset: 'saturday-story-post',
        imageUrl: GENERATED_ASSETS.ep01CafePapelariaSol,
        imageObjectPosition: 'center 38%',
        atmosphereTint: 'coral',
        sceneCaption:
          'Sábado, 15h20. Mia abriu o aplicativo por hábito e deu de cara com a mesa da Papelaria & Café Sol.',
        altText:
          'Ayla, Leo e Noah rindo juntos em uma mesa da Papelaria e Café Sol com milkshakes e um pequeno pacote embrulhado em papel pardo sobre a madeira.',
        bubbles: [
          {
            id: 'b-p3-1',
            speaker: 'Mia',
            text: 'Papelaria Sol... fica a duas quadras da minha casa. Eles tavam aqui do lado agora há pouco.',
            style: 'pensamento',
            position: 'bottom-left',
          },
        ],
      },
      {
        id: 'p3-panel-2',
        order: 2,
        title: 'Duas vozes dentro da mesma dúvida',
        framing: 'closeup',
        visualPreset: 'mia-window-reflection',
        imageUrl: GENERATED_ASSETS.ep01PilotScene,
        imageObjectPosition: '82% 28%',
        atmosphereTint: 'cool',
        altText:
          'Close em Mia pensativa, dividida entre a mágoa de não ter sido chamada e a dúvida se há algo que ela não sabe.',
        bubbles: [
          {
            id: 'b-p3-2',
            speaker: 'Mia',
            text: 'Ninguém respondeu ontem, e hoje saem juntos sem falar nada...',
            style: 'pensamento',
            position: 'top-left',
          },
          {
            id: 'b-p3-3',
            speaker: 'Mia',
            text: 'Será que eu fiz alguma coisa errada? Ou será que tem alguma história ali que eu não tô enxergando?',
            style: 'pensamento',
            position: 'bottom-right',
          },
        ],
      },
    ],
  },
  {
    id: 'ep01-p4',
    pageNumberLabel: 'Página 04',
    title: 'Segunda-feira, antes do sinal',
    learningNote: {
      skillFocus: 'Tomada de Decisão Responsável & Regulação Emocional',
      pedagogicalTitle: '1ª Escolha: Como atravessar o desconforto?',
      insight:
        'Não há resposta moralmente “correta”. Perguntar direto exige coragem mas expõe todo mundo; afastar-se protege na hora mas cria ruído; buscar um amigo em particular reduz a tensão mas adia a conversa em grupo.',
    },
    panels: [
      {
        id: 'p4-panel-1',
        order: 1,
        title: 'Escada do pátio — 07h22',
        framing: 'wide',
        visualPreset: 'monday-corridor-tension',
        imageUrl: GENERATED_ASSETS.heroEntreNos,
        imageObjectPosition: 'center 32%',
        atmosphereTint: 'warm',
        sceneCaption:
          'Segunda-feira cedo. Faltam oito minutos para o sinal. Perto da escada, Ayla e Leo cochicham; Noah fecha a mochila a poucos passos dali.',
        altText:
          'Os amigos próximos aos degraus da escola antes da primeira aula.',
        bubbles: [
          {
            id: 'b-p4-1',
            speaker: 'Ayla',
            text: 'Leo, você tem certeza absoluta de que ocultou aquele story a tempo?',
            style: 'sussurro',
            position: 'top-left',
          },
          {
            id: 'b-p4-2',
            speaker: 'Leo',
            text: 'Quase certeza! Quer dizer... uns oitenta por cento de certeza.',
            style: 'sussurro',
            position: 'top-right',
          },
        ],
      },
      {
        id: 'p4-panel-2',
        order: 2,
        title: 'Oito minutos antes da aula',
        framing: 'closeup',
        visualPreset: 'mia-jacket-grip',
        imageUrl: GENERATED_ASSETS.ep01PilotScene,
        imageObjectPosition: '80% 35%',
        atmosphereTint: 'lavender',
        altText:
          'Mia segurando o celular e a manga da jaqueta azul no corredor, decidindo como agir diante dos amigos.',
        bubbles: [
          {
            id: 'b-p4-3',
            text: 'Mia ouviu só metade do cochicho. O coração disparou. A decisão que ela toma agora muda o rumo da manhã.',
            style: 'narracao',
            position: 'bottom-left',
          },
        ],
      },
    ],
    decision: {
      id: 'dec-ep01-stage1',
      stageLabel: 'Decisão 1 de 2 · A Aproximação',
      promptTitle: 'Como Mia decide agir antes do sinal tocar?',
      promptSubtitle:
        'Cada atitude protege uma necessidade legítima de Mia — e provoca reações reais diferentes em Ayla, Noah e Leo.',
      options: [
        {
          id: 'opt-ep01-a',
          keyLabel: 'A',
          label: 'Mia pergunta diretamente por que não foi convidada.',
          subtleContext:
            'Coloca a dúvida em pratos limpos diante dos três, mesmo com um friozinho no estômago.',
          nextPageId: 'ep01-p5-a',
          consequenceSummary:
            'Mia enfrentou o desconforto na hora. O grupo revelou o presente surpresa na escada, mas Ayla acabou exposta em um assunto delicado de casa.',
          mobilizedSkills: [
            'Comunicação assertiva',
            'Coragem emocional',
            'Checagem de suposições',
          ],
          reflectionQuestion:
            'Quando abrimos o jogo na frente de todo mundo, o que se resolve mais rápido e quem pode se sentir pressionado?',
          relationshipNotes: {
            ayla: 'Ayla ficou sem graça por falar da família na roda, mas respeitou a franqueza de Mia.',
            noah: 'Noah percebeu na hora que esconder a surpresa machucou Mia sem querer.',
            leo: 'Leo parou de fazer piada e assumiu o descuido com o story.',
          },
        },
        {
          id: 'opt-ep01-b',
          keyLabel: 'B',
          label: 'Mia finge que não se importou e se afasta.',
          subtleContext:
            'Preserva o orgulho no momento e evita mostrar que ficou chateada na frente da turma.',
          nextPageId: 'ep01-p5-b',
          consequenceSummary:
            'O afastamento protegeu Mia de chorar ou discutir cedo, mas fez os amigos pensarem que ela estava brava — até Ayla deixar um bilhete no armário.',
          mobilizedSkills: [
            'Autopercepção de limites',
            'Reconhecimento de defesas emocionais',
            'Leitura de gestos sutis',
          ],
          reflectionQuestion:
            'Dar um passo atrás ajuda a respirar, mas como o outro interpreta o nosso silêncio quando não explicamos o motivo?',
          relationshipNotes: {
            ayla: 'Por também se fechar quando sofre, Ayla reconheceu a dor de Mia e escreveu um bilhete.',
            noah: 'Noah ficou preocupado achando que estragou a amizade e hesitou em se aproximar.',
            leo: 'Leo achou que Mia tinha cansado das brincadeiras dele e ficou quieto.',
          },
        },
        {
          id: 'opt-ep01-c',
          keyLabel: 'C',
          label: 'Mia conversa primeiro com Noah em particular.',
          subtleContext:
            'Procura um espaço seguro um a um antes de tirar conclusões sobre o grupo inteiro.',
          nextPageId: 'ep01-p5-c',
          consequenceSummary:
            'Perto do bebedouro, Noah explicou tanto a reposição das canetas quanto o dia difícil de Ayla, abrindo espaço para decidirem juntos como reunir a turma.',
          mobilizedSkills: [
            'Escuta ativa',
            'Mediação cuidadosa',
            'Empatia em perspectiva',
          ],
          reflectionQuestion:
            'Como escolher o momento e o interlocutor muda a qualidade de uma conversa difícil?',
          relationshipNotes: {
            ayla: 'Ayla teve sua privacidade preservada antes de precisar se explicar na roda.',
            noah: 'Noah dividiu o peso de tentar controlar tudo sozinho e ouviu o lado de Mia.',
            leo: 'Leo recebeu espaço para se desculpar sem se sentir num julgamento.',
          },
        },
      ],
    },
  },

  // =========================================================================
  // ROTA A — PERGUNTA DIRETA NA ESCADA + 2ª DECISÃO
  // =========================================================================
  {
    id: 'ep01-p5-a',
    pageNumberLabel: 'Página 05 · Rota A',
    title: 'A pergunta em voz alta na escada',
    branchTag: 'Rota A · Assertividade direta',
    learningNote: {
      skillFocus: 'Empatia & Distinção entre Intenção e Impacto',
      pedagogicalTitle: 'Descobrir uma boa intenção apaga o que sentimos?',
      insight:
        'Saber que era uma surpresa alivia o medo de rejeição, mas não invalida o fim de semana difícil de Mia — e ainda revela que Ayla também carregava seu próprio peso em silêncio.',
    },
    panels: [
      {
        id: 'p5a-panel-1',
        order: 1,
        title: 'O pacote pardo entre os quatro',
        framing: 'wide',
        visualPreset: 'branch-a-confrontation',
        imageUrl: GENERATED_ASSETS.ep01BranchAStairs,
        imageObjectPosition: 'center 28%',
        atmosphereTint: 'warm',
        sceneCaption:
          'Mia respirou fundo, subiu meio degrau e fez a pergunta que estava presa desde sábado. O silêncio durou três segundos — até Noah abrir a mochila.',
        altText:
          'Na escada iluminada da escola, Mia conversa de frente com os amigos enquanto Noah estende uma pequena caixa embrulhada em papel pardo, Ayla baixa os olhos timidamente e Leo parece arrependido.',
        bubbles: [
          {
            id: 'b-p5a-1',
            speaker: 'Mia',
            text: 'Gente... eu vi o story na Papelaria Sol. Vocês não me chamaram porque tão chateados comigo?',
            style: 'fala',
            position: 'top-left',
          },
          {
            id: 'b-p5a-2',
            speaker: 'Noah',
            text: 'Mia, não! Suas canetas nanquim secaram na quinta e você ficou super triste por causa da mostra. A gente foi na Sol comprar um estojo novo pra te entregar hoje!',
            style: 'fala',
            position: 'top-right',
          },
          {
            id: 'b-p5a-3',
            speaker: 'Ayla',
            text: 'E sexta eu não respondi do sorvete porque... teve uma discussão feia lá em casa. Eu travei e pedi pro Noah não marcar nada.',
            style: 'sussurro',
            position: 'bottom-right',
          },
        ],
      },
    ],
    decision: {
      id: 'dec-ep01-stage2-a',
      stageLabel: 'Decisão 2 de 2 · O Novo Combinado',
      promptTitle: 'Com o presente nas mãos e vendo Ayla sem graça, o que Mia faz?',
      promptSubtitle:
        'A verdade apareceu, mas o clima na escada ainda está delicado para todo mundo.',
      options: [
        {
          id: 'opt-ep01-a1',
          keyLabel: 'A1',
          label: 'Agradece de coração, mas explica que o vácuo machucou e propõe um combinado pro grupo.',
          subtleContext:
            'Une gratidão sincera com clareza sobre seus limites afetivos.',
          nextPageId: 'ep01-p6-a1',
          consequenceSummary:
            'Mia validou o carinho do presente sem fingir que não doeu ficar no escuro, criando um acordo mais maduro entre os quatro.',
          mobilizedSkills: ['Comunicação não violenta', 'Construção de acordos', 'Autenticidade'],
          reflectionQuestion:
            'É possível agradecer o gesto de um amigo e, ao mesmo tempo, dizer que o jeito como aconteceu nos machucou?',
          relationshipNotes: {
            ayla: 'Ayla respirou aliviada ao ver que ninguém ia cobrar explicações longas ali na escada.',
            noah: 'Noah aprendeu que um simples “hoje não dá, segunda te conto” vale mais que um plano perfeito.',
            leo: 'Leo abraçou o combinado e prometeu aposentar os stories misteriosos.',
          },
        },
        {
          id: 'opt-ep01-a2',
          keyLabel: 'A2',
          label: 'Deixa a própria mágoa de lado na hora para acolher Ayla discretamente antes da aula.',
          subtleContext:
            'Prioriza proteger a amiga mais reservada do desconforto em público.',
          nextPageId: 'ep01-p6-a2',
          consequenceSummary:
            'Ayla se sentiu profundamente acolhida pelo gesto de Mia, embora Mia tenha percebido que ainda precisará falar do próprio medo depois.',
          mobilizedSkills: ['Empatia sensível', 'Acolhimento', 'Percepção do tempo do outro'],
          reflectionQuestion:
            'Cuidar de um amigo num momento frágil aproxima, mas como lembrar de não engolir o que nós mesmos sentimos?',
          relationshipNotes: {
            ayla: 'Ayla se abriu com Mia no caminho da sala como raramente faz com alguém.',
            noah: 'Noah notou a generosidade de Mia ao mudar o foco da conversa.',
            leo: 'Leo entregou as canetas mais calmo e subiu junto com Noah.',
          },
        },
      ],
    },
  },
  {
    id: 'ep01-p6-a1',
    pageNumberLabel: 'Página 06 · Desfecho A1',
    title: 'Carinho também combina com aviso',
    branchTag: 'Desfecho A1 · Honestidade e acordo',
    isEnding: true,
    endingCode: 'A1',
    endingTitle: 'A franqueza virou um novo combinado para o quarteto',
    endingReflection:
      'Mia não precisou escolher entre agradecer o presente ou validar o que sentiu. Ao nomear as duas coisas com calma, ela mostrou ao grupo que boas intenções funcionam muito melhor quando ninguém fica no escuro.',
    characterPerspectives: {
      mia: '“Deu medo perguntar na frente dos três, mas guardar aquilo mais um dia teria sido pior. Gostei de conseguir agradecer sem fingir que sábado foi fácil.”',
      ayla: '“Fiquei gelada quando precisei falar de sexta na escada, mas quando a Mia falou das próprias dúvidas sem culpar ninguém, o peso diminuiu.”',
      noah: '“Eu jurei que esconder tudo até segunda era o jeito mais organizado. Não tinha pensado no que o silêncio fazia na cabeça da Mia.”',
      leo: '“Quase fiz piada na hora do nervoso, mas ainda bem que segurei. Aquele story sem legenda parecia provocação mesmo.”',
    },
    panels: [
      {
        id: 'p6a1-panel-1',
        order: 1,
        title: 'Subindo juntos para o 7º B',
        framing: 'wide',
        visualPreset: 'branch-a-ending',
        imageUrl: GENERATED_ASSETS.heroEntreNos,
        imageObjectPosition: 'center 40%',
        atmosphereTint: 'warm',
        sceneCaption:
          'O sinal tocou. Mia abriu um cantinho do papel pardo só para espiar as pontas novas de nanquim antes de entrarem na sala.',
        altText:
          'Os quatro amigos juntos conversando com mais leveza na luz dourada da manhã escolar.',
        bubbles: [
          {
            id: 'b-p6a1-1',
            speaker: 'Mia',
            text: 'Vocês são incríveis por lembrarem da mostra, sério. Só me manda um “hoje tá corrido” da próxima vez? Minha cabeça já tava criando novela.',
            style: 'fala',
            position: 'top-left',
          },
          {
            id: 'b-p6a1-2',
            speaker: 'Noah',
            text: 'Trato feito. Zero vácuo tático daqui pra frente.',
            style: 'fala',
            position: 'bottom-right',
          },
        ],
      },
    ],
  },
  {
    id: 'ep01-p6-a2',
    pageNumberLabel: 'Página 06 · Desfecho A2',
    title: 'O passo no ritmo de quem precisa',
    branchTag: 'Desfecho A2 · Acolhimento primeiro',
    isEnding: true,
    endingCode: 'A2',
    endingTitle: 'Ouvir a dor silenciosa da amiga mudou o peso da manhã',
    endingReflection:
      'Ao perceber o esforço de Ayla para admitir que as coisas não iam bem em casa, Mia escolheu acolher antes de cobrar. O vínculo entre as duas ganhou confiança, deixando o aprendizado de que todo silêncio tem mais de uma camada.',
    characterPerspectives: {
      mia: '“Quando vi a cara da Ayla, minha raiva de sábado encolheu. Depois ainda quero contar pro Noah como me senti, mas naquela hora ela precisava de fôlego.”',
      ayla: '“Eu morro de vergonha de falar quando lá em casa tá tenso. A Mia só me chamar pra andar devagar até a sala valeu por mil conselhos.”',
      noah: '“A Mia percebeu num segundo que a Ayla tava travada. Fiquei admirado com o jeito que ela mudou o tom.”',
      leo: '“Entreguei o pacote rapidinho e deixei as duas conversarem. Aprendi que nem toda hora é hora de fazer graça.”',
    },
    panels: [
      {
        id: 'p6a2-panel-1',
        order: 1,
        title: 'Corredor do segundo andar',
        framing: 'medium',
        visualPreset: 'branch-a-ending',
        imageUrl: GENERATED_ASSETS.aylaPortrait,
        imageObjectPosition: 'center 24%',
        atmosphereTint: 'lavender',
        sceneCaption:
          'Noah e Leo subiram na frente. Mia diminuiu o passo ao lado de Ayla segurando a caixinha de canetas contra o peito.',
        altText:
          'Ayla com seu moletom roxo olhando com gratidão tranquila enquanto caminha pelo corredor.',
        bubbles: [
          {
            id: 'b-p6a2-1',
            speaker: 'Mia',
            text: 'Obrigada pelas canetas, Ayla. E... se na próxima sexta você só quiser ficar desenhando quieta sem falar nada, me chama também.',
            style: 'fala',
            position: 'top-left',
          },
          {
            id: 'b-p6a2-2',
            speaker: 'Ayla',
            text: '...Chamo sim. Obrigada por não fazer mil perguntas na escada.',
            style: 'fala',
            position: 'bottom-right',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // ROTA B — AFASTAMENTO PROTETOR + BILHETE NO ARMÁRIO + 2ª DECISÃO
  // =========================================================================
  {
    id: 'ep01-p5-b',
    pageNumberLabel: 'Página 05 · Rota B',
    title: 'A armadura e o bilhete no armário',
    branchTag: 'Rota B · Silêncio protetor',
    learningNote: {
      skillFocus: 'Autoconhecimento & Efeito Espelho nas Relações',
      pedagogicalTitle: 'Quando nossa defesa parece rejeição para o outro',
      insight:
        'Afastar-se protegeu Mia de se expor, mas gerou um espelho curioso: os amigos acharam que era Mia quem não queria estar perto. Pequenos gestos — como o bilhete de Ayla — podem reabrir portas que o orgulho fechou.',
    },
    panels: [
      {
        id: 'p5b-panel-1',
        order: 1,
        title: 'Armário 14 — Fim da última aula',
        framing: 'wide',
        visualPreset: 'branch-b-locker-note',
        imageUrl: GENERATED_ASSETS.ep01BranchBLockerNote,
        imageObjectPosition: 'center 28%',
        atmosphereTint: 'lavender',
        sceneCaption:
          'Mia passou a manhã inteira distante. Na saída, ao abrir o armário, uma folha quadriculada dobrada caiu sobre seu tênis — enquanto Ayla olhava de longe perto do arco do pátio.',
        altText:
          'Mia em frente ao armário escolar azul aberto lendo um bilhete em papel quadriculado; ao fundo no corredor iluminado, Ayla de moletom roxo olha para trás com delicadeza.',
        bubbles: [
          {
            id: 'b-p5b-1',
            speaker: 'Ayla',
            text: '“Mia, você ficou brava por sexta? Eu tava mal lá em casa e travei no grupo. Sábado fomos na Sol repor suas canetas da mostra, mas o Leo quase entregou tudo no story. Se quiser conversar sem barulho, tô indo pro ponto. — Ayla”',
            style: 'narracao',
            position: 'bottom-left',
          },
        ],
      },
    ],
    decision: {
      id: 'dec-ep01-stage2-b',
      stageLabel: 'Decisão 2 de 2 · A Fresta no Silêncio',
      promptTitle: 'Ayla ainda está no fim do corredor. Como Mia responde ao bilhete?',
      promptSubtitle:
        'A armadura da manhã já não faz mais o mesmo sentido, mas dar o próximo passo ainda pede escolha.',
      options: [
        {
          id: 'opt-ep01-b1',
          keyLabel: 'B1',
          label: 'Alcança Ayla antes do portão e confessa por que tinha se afastado de manhã.',
          subtleContext:
            'Desarma a postura fria na mesma hora e aproveita a ponte que Ayla estendeu.',
          nextPageId: 'ep01-p6-b1',
          consequenceSummary:
            'As duas conversaram caminhando até o ponto de ônibus e perceberam como o silêncio de uma tinha alimentado a insegurança da outra.',
          mobilizedSkills: ['Vulnerabilidade compartilhada', 'Reconciliação', 'Desconstrução de defesas'],
          reflectionQuestion:
            'O que muda quando admitimos “eu me afastei porque fiquei magoada” em vez de fingir indiferença?',
          relationshipNotes: {
            ayla: 'Ayla se sentiu compreendida por descobrir que Mia também se cala quando tem medo.',
            noah: 'Noah recebeu mensagem das duas mais tarde combinando de entregar as canetas na terça.',
            leo: 'Leo respirou aliviado ao saber que o gelo da manhã tinha explicação.',
          },
        },
        {
          id: 'opt-ep01-b2',
          keyLabel: 'B2',
          label: 'Responde na língua das duas: manda foto de um rascunho de agradecimento prometendo conversar na terça.',
          subtleContext:
            'Respeita o próprio tempo emocional sem deixar o gesto de Ayla no vácuo.',
          nextPageId: 'ep01-p6-b2',
          consequenceSummary:
            'Mia usou sua expressão artística para sinalizar afeto e marcou um recomeço calmo para o dia seguinte.',
          mobilizedSkills: ['Autorregulação emocional', 'Expressão criativa', 'Cuidado com o vínculo'],
          reflectionQuestion:
            'Quando ainda precisamos de um tempinho para digerir tudo, como avisar o outro sem sumir?',
          relationshipNotes: {
            ayla: 'Ayla sorriu no ônibus ao receber o desenho dos dois bonequinhos de fone e caderno.',
            noah: 'Noah entendeu que o grupo precisava de menos pressa e mais escuta na terça.',
            leo: 'Leo respondeu com figurinha pedindo trégua oficial na manhã seguinte.',
          },
        },
      ],
    },
  },
  {
    id: 'ep01-p6-b1',
    pageNumberLabel: 'Página 06 · Desfecho B1',
    title: 'Duas armaduras desmontadas na calçada',
    branchTag: 'Desfecho B1 · Conversa no portão',
    isEnding: true,
    endingCode: 'B1',
    endingTitle: 'Reconhecer a própria defesa impediu que um ruído virasse distância',
    endingReflection:
      'Se afastar cedo foi o jeito que Mia encontrou para se proteger, mas alcançar Ayla na saída mostrou maturidade para recalcular a rota assim que percebeu o outro lado da história.',
    characterPerspectives: {
      mia: '“Passei a manhã toda gastando energia pra parecer que não ligava. Falar a verdade ali no corredor tirou dez quilos das costas.”',
      ayla: '“Deixar bilhete era o máximo de coragem que eu tinha hoje. Quando ouvi os passos da Mia correndo atrás de mim, deu um alívio enorme.”',
      noah: '“Passei a aula achando que meu plano das canetas tinha acabado com o grupo! Ainda bem que a Ayla teve a ideia do bilhete.”',
      leo: '“Juro que achei que a Mia nunca mais ia rir das minhas piadas depois daquele bom-dia congelado.”',
    },
    panels: [
      {
        id: 'p6b1-panel-1',
        order: 1,
        title: 'Arco de saída da escola',
        framing: 'medium',
        visualPreset: 'branch-b-ending',
        imageUrl: GENERATED_ASSETS.aylaPortrait,
        imageObjectPosition: 'center 25%',
        atmosphereTint: 'warm',
        sceneCaption:
          'Mia apertou o passo até o portão ainda com a folha quadriculada na mão.',
        altText:
          'Ayla parando perto da saída com um sorriso suave e sincero ao ouvir Mia chamá-la.',
        bubbles: [
          {
            id: 'b-p6b1-1',
            speaker: 'Mia',
            text: 'Ayla, espera! Eu não tava brava com você... eu só achei que tinha sobrado e fiquei com vergonha de perguntar.',
            style: 'fala',
            position: 'top-left',
          },
          {
            id: 'b-p6b1-2',
            speaker: 'Ayla',
            text: 'A gente é péssima fingindo que não se importa, né? Vem, o Noah ainda tá lá fora com uma caixa pra você.',
            style: 'fala',
            position: 'bottom-right',
          },
        ],
      },
    ],
  },
  {
    id: 'ep01-p6-b2',
    pageNumberLabel: 'Página 06 · Desfecho B2',
    title: 'Um desenho vale por um recomeço',
    branchTag: 'Desfecho B2 · Tempo e sinal de afeto',
    isEnding: true,
    endingCode: 'B2',
    endingTitle: 'Respeitar o próprio ritmo também funciona quando avisamos que estamos perto',
    endingReflection:
      'Nem todo mundo consegue resolver tudo no calor do corredor. A diferença entre se isolar e pedir tempo esteve no gesto de Mia: responder ao bilhete com afeto para que ninguém dormisse na dúvida.',
    characterPerspectives: {
      mia: '“Eu precisava chegar em casa pra organizar a cabeça, mas desta vez não deixei ninguém no vácuo. Meu desenho falou por mim.”',
      ayla: '“Receber o rabisco da Mia no celular bem quando sentei no ônibus foi a melhor parte da segunda-feira.”',
      noah: '“Quando a Mia mandou mensagem no grupo marcando de nos ver cedo na terça, todo mundo voltou a respirar normal.”',
      leo: '“Guardei as canetas na minha mochila com cuidado triplo pra entregar amanhã sem estragar mais nada!”',
    },
    panels: [
      {
        id: 'p6b2-panel-1',
        order: 1,
        title: 'Mesa do quarto, mais leve desta vez',
        framing: 'wide',
        visualPreset: 'mia-bedroom-twilight',
        imageUrl: GENERATED_ASSETS.ep01BedroomPhone,
        imageObjectPosition: 'center 35%',
        atmosphereTint: 'warm',
        sceneCaption:
          'Em casa, na mesma mesa de sexta-feira, Mia colou o bilhete de Ayla no caderno e fotografou um pequeno esboço dos quatro nos degraus.',
        altText:
          'Mia em sua escrivaninha iluminada pela luminária quente, enviando uma mensagem tranquila pelo celular ao lado do caderno de desenhos.',
        bubbles: [
          {
            id: 'b-p6b2-1',
            speaker: 'Mia',
            text: '“Li seu bilhete, Ayla. Obrigada de verdade. Fiquei boba hoje cedo, mas amanhã no primeiro intervalo quero ouvir tudo.”',
            style: 'fala',
            position: 'top-left',
          },
          {
            id: 'b-p6b2-2',
            text: 'Pedir tempo não afasta quando o outro sabe que a porta continua aberta.',
            style: 'narracao',
            position: 'bottom-right',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // ROTA C — CONVERSA COM NOAH NO BEBEDOURO + 2ª DECISÃO
  // =========================================================================
  {
    id: 'ep01-p5-c',
    pageNumberLabel: 'Página 05 · Rota C',
    title: 'Um a um perto do bebedouro',
    branchTag: 'Rota C · Conversa com Noah',
    learningNote: {
      skillFocus: 'Escuta Ativa & Ponto Cego do Controle',
      pedagogicalTitle: 'Até quem quer cuidar pode acabar afastando sem perceber',
      insight:
        'Conversar em particular diminuiu a defesa de ambos: Mia pôde mostrar vulnerabilidade sem plateia, e Noah enxergou como sua mania de resolver tudo em segredo deixou a amiga se sentindo invisível.',
    },
    panels: [
      {
        id: 'p5c-panel-1',
        order: 1,
        title: 'Corredor lateral — 07h25',
        framing: 'wide',
        visualPreset: 'branch-c-noah-talk',
        imageUrl: GENERATED_ASSETS.ep01BranchCCorridorNoah,
        imageObjectPosition: 'center 25%',
        atmosphereTint: 'warm',
        sceneCaption:
          'Mia esperou Noah ir encher a garrafinha no corredor lateral. Longe do barulho da escada, a pergunta saiu sem tom de acusação.',
        altText:
          'Mia de jaqueta azul e Noah de jaqueta jeans segurando sua garrafinha d’água conversam com atenção e empatia ao lado do bebedouro iluminado pelo sol.',
        bubbles: [
          {
            id: 'b-p5c-1',
            speaker: 'Mia',
            text: 'Noah, posso te perguntar uma coisa sincera? Depois do silêncio de sexta e daquele story na Sol... aconteceu alguma coisa entre a gente?',
            style: 'fala',
            position: 'top-left',
          },
          {
            id: 'b-p5c-2',
            speaker: 'Noah',
            text: 'Putz, Mia... desculpa. A Ayla teve um dia péssimo em casa na sexta e pediu pra não sairmos. E sábado fomos na Sol repor suas canetas nanquim pra mostra — só que o Leo postou story no automático!',
            style: 'fala',
            position: 'bottom-right',
          },
        ],
      },
    ],
    decision: {
      id: 'dec-ep01-stage2-c',
      stageLabel: 'Decisão 2 de 2 · De Volta ao Grupo',
      promptTitle: 'Noah se oferece para explicar tudo aos outros por Mia. O que ela prefere?',
      promptSubtitle:
        'Noah já quer assumir o comando de novo para consertar o clima rápido no recreio.',
      options: [
        {
          id: 'opt-ep01-c1',
          keyLabel: 'C1',
          label: 'Mia mesma puxa a conversa nos degraus no recreio, com leveza mas pedindo zero segredos de vácuo.',
          subtleContext:
            'Exercita a própria voz diante do grupo depois de ganhar segurança com Noah.',
          nextPageId: 'ep01-p6-c1',
          consequenceSummary:
            'A conversa com Noah serviu de apoio — não de muleta. No intervalo, Mia falou por si mesma e deixou o quarteto mais próximo.',
          mobilizedSkills: ['Autonomia emocional', 'Liderança afetiva', 'Comunicação clara'],
          reflectionQuestion:
            'Como usar o apoio de um amigo de confiança para ganhar coragem de falar por conta própria?',
          relationshipNotes: {
            ayla: 'Ayla ficou tranquila porque ninguém tocou no assunto da família dela sem ela querer.',
            noah: 'Noah ficou feliz em não precisar ser o porta-voz oficial da turma dessa vez.',
            leo: 'Leo riu de si mesmo e pediu desculpas pelo susto de sábado.',
          },
        },
        {
          id: 'opt-ep01-c2',
          keyLabel: 'C2',
          label: 'Mia pede que Noah tire o peso das costas e deixe Leo e Ayla contarem o sábado do jeito deles.',
          subtleContext:
            'Ajuda Noah a soltar o controle e abre espaço para uma escuta horizontal na roda.',
          nextPageId: 'ep01-p6-c2',
          consequenceSummary:
            'No recreio, sem roteiro ensaiado por Noah, Leo pediu desculpas espontaneamente e Ayla entregou o cartão que tinha escrito.',
          mobilizedSkills: ['Escuta empática', 'Confiança no grupo', 'Corresponsabilidade'],
          reflectionQuestion:
            'O que acontece nas amizades quando paramos de tentar roteirizar a reação de todo mundo?',
          relationshipNotes: {
            ayla: 'Ayla entregou pessoalmente o cartãozinho desenhado que tinha guardado na bolsa.',
            noah: 'Noah percebeu o alívio de não precisar gerenciar os sentimentos dos três amigos.',
            leo: 'Leo pôde se explicar do seu jeito atrapalhado e sincero.',
          },
        },
      ],
    },
  },
  {
    id: 'ep01-p6-c1',
    pageNumberLabel: 'Página 06 · Desfecho C1',
    title: 'A própria voz nos degraus do pátio',
    branchTag: 'Desfecho C1 · Clareza coletiva',
    isEnding: true,
    endingCode: 'C1',
    endingTitle: 'Checar antes de julgar transformou um mal-entendido em confiança',
    endingReflection:
      'Conversar com Noah primeiro deu a Mia o contexto que faltava; falar ela mesma no intervalo garantiu que todos ouvissem como o silêncio digital impacta quem está do outro lado.',
    characterPerspectives: {
      mia: '“Falar com o Noah antes tirou aquele nó da garganta. Na hora do recreio, consegui falar com todo mundo sem parecer briga.”',
      ayla: '“Adorei que ninguém me forçou a explicar minha sexta-feira, e mesmo assim deu pra sentir que tava tudo bem entre nós.”',
      noah: '“Eu ia tentar resolver tudo pelos panos quentes de novo. Foi muito melhor ver a Mia falando direto com a gente.”',
      leo: '“Tá proibido deixar o marketing de qualquer surpresa na minha mão, eu confesso!”',
    },
    panels: [
      {
        id: 'p6c1-panel-1',
        order: 1,
        title: 'Intervalo das dez — Escada ensolarada',
        framing: 'wide',
        visualPreset: 'branch-c-ending',
        imageUrl: GENERATED_ASSETS.heroEntreNos,
        imageObjectPosition: 'center 42%',
        atmosphereTint: 'warm',
        sceneCaption:
          'No recreio, Mia já testava as canetas novas no caderno enquanto os quatro dividiam os degraus de sempre.',
        altText:
          'Mia segurando seu caderno ilustrado ao lado de Ayla, Noah e Leo nos degraus ensolarados do pátio.',
        bubbles: [
          {
            id: 'b-p6c1-1',
            speaker: 'Leo',
            text: 'Em minha defesa, aquele milkshake de morango tava bonito demais pra não ir pro story!',
            style: 'fala',
            position: 'top-right',
          },
          {
            id: 'b-p6c1-2',
            speaker: 'Mia',
            text: 'Da próxima vez posta o milkshake e me manda pelo menos um figurinha no grupo, combinado?',
            style: 'fala',
            position: 'bottom-left',
          },
        ],
      },
    ],
  },
  {
    id: 'ep01-p6-c2',
    pageNumberLabel: 'Página 06 · Desfecho C2',
    title: 'Quatro vozes sem roteiro pronto',
    branchTag: 'Desfecho C2 · Escuta compartilhada',
    isEnding: true,
    endingCode: 'C2',
    endingTitle: 'Soltar o controle permitiu que cada amigo se aproximasse do seu jeito',
    endingReflection:
      'Não foi só Mia que aprendeu algo naquela segunda-feira: Noah também descobriu que amizades reais não precisam de um gerente de crises quando há espaço para cada um falar por si.',
    characterPerspectives: {
      mia: '“Percebi que até o Noah, que parece sempre seguro, fica ansioso tentando fazer tudo dar certo pra gente.”',
      ayla: '“Como ninguém ficou me olhando esperando discurso, consegui entregar o cartão que eu tinha feito pra mostra da Mia.”',
      noah: '“Quando a Mia disse ‘deixa eles contarem do jeito deles’, percebi o quanto eu tento controlar tudo quando fico nervoso.”',
      leo: '“Contei toda a trapalhada da papelaria e pela primeira vez a gente riu junto, não pra esconder climão.”',
    },
    panels: [
      {
        id: 'p6c2-panel-1',
        order: 1,
        title: 'De volta à roda completa',
        framing: 'wide',
        visualPreset: 'branch-c-ending',
        imageUrl: GENERATED_ASSETS.heroEntreNos,
        imageObjectPosition: 'center 38%',
        atmosphereTint: 'warm',
        sceneCaption:
          'Sem discurso ensaiado, Leo contou a saga da papelaria inteira errado, Ayla riu baixinho e Noah pela primeira vez só escutou tranquilo.',
        altText:
          'Mia, Ayla, Noah e Leo rindo naturalmente sentados nos degraus da escola ao entardecer.',
        bubbles: [
          {
            id: 'b-p6c2-1',
            speaker: 'Noah',
            text: 'Olha aí... nem precisava de mim tentando organizar as falas de todo mundo.',
            style: 'fala',
            position: 'top-left',
          },
          {
            id: 'b-p6c2-2',
            speaker: 'Mia',
            text: 'Cada um tinha uma metade da história. Juntando as quatro até que faz sentido.',
            style: 'fala',
            position: 'bottom-right',
          },
        ],
      },
    ],
  },
];

export const INITIAL_EPISODES: Episode[] = [
  {
    id: 'ep-01',
    seasonId: 'season-entre-nos',
    number: 1,
    pilotBadge: 'PILOTO 01 · HQ INTERATIVA COMPLETA',
    title: 'Todo Mundo Menos Eu',
    theme: 'Exclusão e pertencimento',
    synopsis:
      'Conversas interrompidas perto dos armários, mensagens visualizadas sem resposta e uma foto publicada no sábado despertam em Mia a sensação de estar ficando de fora — mas cada escolha revela que todo silêncio esconde mais de um ponto de vista.',
    learningGoal:
      'Transformar um conflito real de pertencimento em aprendizagem socioemocional viva por meio de 2 etapas de decisão, soft skills mobilizadas na prática e 6 desfechos com consequências autênticas.',
    characters: ['mia', 'ayla', 'noah', 'leo'],
    estimatedMinutes: 10,
    skills: [
      'Exclusão e pertencimento',
      'Comunicação assertiva',
      'Checagem de suposições',
      'Empatia em perspectiva',
    ],
    status: 'disponivel',
    coverVariant: 'ep01',
    customCoverUrl: GENERATED_ASSETS.ep01PilotScene,
    scriptExcerpt:
      'PILOTO 01 — PÁTIO INTERNO (SEGUNDA, 07h22). Duas decisões encadeadas conduzem Mia por 6 desfechos possíveis, revelando os 4 pontos de vista do mesmo fim de semana.',
    startPageId: 'ep01-p1',
    pages: PILOT_EPISODE_PAGES,
  },
  {
    id: 'ep-02',
    seasonId: 'season-entre-nos',
    number: 2,
    title: 'A Foto Que Eu Não Postei',
    theme: 'Autoestima e comparação',
    synopsis:
      'Depois da feira cultural, Leo tira dezenas de fotos da turma, mas trava na hora de escolher uma em que ele mesmo apareça sem fazer careta ou esconder o rosto sob a aba do boné.',
    characters: ['leo', 'mia', 'ayla'],
    estimatedMinutes: 9,
    skills: ['Autoestima', 'Autocompaixão', 'Olhar crítico sobre comparação'],
    status: 'em_producao',
    coverVariant: 'ep02',
    scriptExcerpt:
      'LEO olha a galeria do celular com 14 selfies apagadas. Na 15ª, ele faz uma careta exagerada e digita uma legenda engraçadinha para postar primeiro.',
    pages: [],
  },
  {
    id: 'ep-03',
    seasonId: 'season-entre-nos',
    number: 3,
    title: 'Era Só Uma Brincadeira',
    theme: 'Bullying e empatia',
    synopsis:
      'Um apelido inventado na quadra começa arrancando risadas rápidas, inclusive de quem não queria ferir ninguém. Noah e Leo precisam decidir onde termina a piada quando quem ouve sorri só para não chorar.',
    characters: ['leo', 'noah', 'mia'],
    estimatedMinutes: 10,
    skills: ['Prevenção ao bullying', 'Empatia ativa', 'Posicionamento ético', 'Reparação'],
    status: 'em_producao',
    coverVariant: 'ep03',
    scriptExcerpt:
      'NOAH percebe o colega do 6º ano guardando o caderno devagar depois da risada geral. Leo olha para os lados esperando aprovação.',
    pages: [],
  },
  {
    id: 'ep-04',
    seasonId: 'season-entre-nos',
    number: 4,
    title: 'Visualizado às 22h14',
    theme: 'Comunicação e ansiedade digital',
    synopsis:
      'Uma frase curta enviada à noite sem pontuação vira motivo de insônia para Noah e Ayla. Como ler o tom de voz de alguém quando só existem letras na tela e um visto azul?',
    characters: ['ayla', 'noah'],
    estimatedMinutes: 8,
    skills: ['Ansiedade digital', 'Regulação da ansiedade', 'Clareza ao comunicar'],
    status: 'roteiro',
    coverVariant: 'ep04',
    scriptExcerpt:
      '22h14. Mensagem de Ayla: “Tanto faz, Noah.” Para ela, era cansaço. Para Noah, o começo de uma revisão mental de todas as frases do dia.',
    pages: [],
  },
  {
    id: 'ep-05',
    seasonId: 'season-entre-nos',
    number: 5,
    title: 'Dez em Tudo, Menos em Mim',
    theme: 'Perfeccionismo e pressão escolar',
    synopsis:
      'Noah assume a coordenação da maquete interdisciplinar, do mural da turma e dos treinos na mesma semana — até que um imprevisto mostra o custo de nunca se permitir errar.',
    characters: ['noah', 'mia', 'leo'],
    estimatedMinutes: 10,
    skills: ['Perfeccionismo', 'Pedir ajuda', 'Tolerância à frustração'],
    status: 'roteiro',
    coverVariant: 'ep05',
    scriptExcerpt:
      'As mãos de Noah tremem ao tentar colar a ponte de madeira quebrada dez minutos antes da apresentação enquanto Mia oferece dividir a fala.',
    pages: [],
  },
  {
    id: 'ep-06',
    seasonId: 'season-entre-nos',
    number: 6,
    title: 'Lá em Casa É Diferente',
    theme: 'Família e desigualdades',
    synopsis:
      'Um passeio pago de fim de semestre anima a escola inteira, mas expõe realidades familiares muito distintas dentro do mesmo grupo de amigos.',
    characters: ['ayla', 'noah', 'mia', 'leo'],
    estimatedMinutes: 11,
    skills: [
      'Sensibilidade social',
      'Respeito às desigualdades',
      'Solidariedade sem exposição',
    ],
    status: 'roteiro',
    coverVariant: 'ep06',
    scriptExcerpt:
      'A autorização dobrada na mochila pesa diferente para cada um. Como incluir sem constranger quem prefere dizer que “não está a fim de ir”?',
    pages: [],
  },
  {
    id: 'ep-07',
    seasonId: 'season-entre-nos',
    number: 7,
    title: 'Quem Eu Sou Quando Ninguém Vê?',
    theme: 'Identidade e autenticidade',
    synopsis:
      'Mia recebe o convite para entrar em uma roda nova de estudantes mais velhos da oficina de artes, mas percebe que está mudando seu jeito de vestir e opinar para caber lá.',
    characters: ['mia', 'ayla'],
    estimatedMinutes: 9,
    skills: ['Identidade', 'Autoconhecimento', 'Autenticidade'],
    status: 'roteiro',
    coverVariant: 'ep07',
    scriptExcerpt:
      'Diante do espelho, Mia tira e coloca a jaqueta azul três vezes antes de sair.',
    pages: [],
  },
  {
    id: 'ep-08',
    seasonId: 'season-entre-nos',
    number: 8,
    title: 'A Pessoa Mais Sozinha da Sala',
    theme: 'Solidão e conexão',
    synopsis:
      'Rodeada de colegas no pátio cheio, Ayla atravessa uma semana em que parece impossível explicar o que sente — descobrindo que presença verdadeira nem sempre exige muitas palavras.',
    characters: ['ayla', 'mia', 'leo'],
    estimatedMinutes: 9,
    skills: ['Solidão e conexão', 'Acolhimento', 'Escuta sem julgamento'],
    status: 'roteiro',
    coverVariant: 'ep08',
    scriptExcerpt:
      'Ayla divide um lado do fone de ouvido em silêncio nos degraus da quadra; às vezes companhia começa antes da conversa.',
    pages: [],
  },
  {
    id: 'ep-09',
    seasonId: 'season-entre-nos',
    number: 9,
    title: 'O Print',
    theme: 'Boatos e responsabilidade digital',
    synopsis:
      'Um recorte tirado fora de contexto de uma conversa privada começa a circular pelos grupos do 7º ano. Cada clique de encaminhar — ou de interromper — muda o rumo da tarde.',
    characters: ['noah', 'leo', 'ayla', 'mia'],
    estimatedMinutes: 11,
    skills: [
      'Responsabilidade digital',
      'Pensamento crítico sobre boatos',
      'Coragem diante do grupo',
    ],
    status: 'roteiro',
    coverVariant: 'ep09',
    scriptExcerpt:
      'A imagem cortada esconde a pergunta anterior. Em dez minutos, metade do corredor acha que já sabe a história inteira.',
    pages: [],
  },
  {
    id: 'ep-10',
    seasonId: 'season-entre-nos',
    number: 10,
    title: 'Entre Nós',
    theme: 'Reconciliação e amadurecimento',
    synopsis:
      'No último dia antes das férias, uma cápsula de memórias na Escola Castro Alves reúne Mia, Ayla, Noah e Leo diante dos ruídos, aprendizados e afetos que construíram ao longo do ano.',
    characters: ['mia', 'ayla', 'noah', 'leo'],
    estimatedMinutes: 12,
    skills: ['Reconciliação', 'Gratidão', 'Construção de vínculos saudáveis'],
    status: 'roteiro',
    coverVariant: 'ep10',
    scriptExcerpt:
      'Os quatro voltam aos mesmos degraus do primeiro episódio sob o sol alaranjado de fim de ano — não iguais, mas mais inteiros.',
    pages: [],
  },
];

export const INITIAL_NARRATIVE_STATE: NarrativeState = {
  progressByEpisode: {},
  choiceHistory: [],
  personalReflections: {},
  relationshipStates: {
    ayla: 'Amiga próxima de Mia, embora mais silenciosa nos últimos dias.',
    noah: 'Ponto de equilíbrio da turma, sempre tentando organizar os planos do grupo.',
    leo: 'Parceiro de risadas no intervalo, mas anda desviando de conversas diretas.',
  },
  readerModePreference: 'paginas',
  showSocioemotionalLens: true,
};
