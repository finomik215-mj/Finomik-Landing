export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  subsections?: Array<{ heading: string; paragraphs: string[] }>;
}

export interface ArticleReference {
  citation: string;
  url?: string;
}

export interface ArticleContent {
  title: string;
  intro: string;
  sections: ArticleSection[];
  ctaText: string;
}

export interface Article {
  slug: string;
  seo: {
    es: { title: string; description: string };
    en: { title: string; description: string };
    ca: { title: string; description: string };
    keywords: string[];
  };
  meta: {
    date: string;
    author: string;
    readTime: string;
    category: string;
    stat: string;
    statLabel: string;
    source: string;
  };
  content: {
    es: ArticleContent;
    en: ArticleContent;
    ca: ArticleContent;
  };
  references: ArticleReference[];
}

export const articles: Article[] = [
  {
    slug: 'educacion-financiera-colegios-ocde-pisa-2023',
    seo: {
      es: {
        title: 'El 77% pide educación financiera en la escuela | Finomik',
        description:
          'El informe PISA 2023 de la OCDE revela que el 77% de adultos cree que la educación financiera debería enseñarse en el colegio. Qué significa para los centros educativos.',
      },
      en: {
        title: '77% of Adults Want Financial Education in Schools | Finomik',
        description:
          'The OECD PISA 2023 report reveals that 77% of adults believe financial education should be taught in school. What this means for educational institutions.',
      },
      ca: {
        title: "El 77% vol educació financera a l'escola | Finomik",
        description:
          "L'informe PISA 2023 de l'OCDE revela que el 77% dels adults creu que l'educació financera hauria d'ensenyar-se al col·legi.",
      },
      keywords: [
        'educación financiera colegios',
        'PISA 2023 educación financiera',
        'OCDE alfabetización financiera',
        'competencia financiera alumnado',
        'educación financiera España',
      ],
    },
    meta: {
      date: '2026-02-06',
      author: 'Equipo Finomik',
      readTime: '5 min',
      category: 'Investigación y datos',
      stat: '77%',
      statLabel: 'de adultos creen que la educación financiera debería enseñarse en el colegio',
      source: 'OCDE / PISA, 2023',
    },
    content: {
      es: {
        title: 'El 77% de adultos cree que la educación financiera debería enseñarse en el colegio',
        intro:
          'Cada edición del informe PISA obliga a los sistemas educativos a preguntarse qué enseñan y qué dejan fuera. Los datos de 2023 sobre alfabetización financiera son especialmente claros: el 77% de los adultos encuestados cree que la educación financiera debería formar parte del currículo escolar. No es una demanda marginal. Es una demanda generacional que los centros ya no pueden ignorar.',
        sections: [
          {
            heading: 'Qué dice exactamente el informe PISA 2023 sobre educación financiera',
            paragraphs: [
              'El Programme for International Student Assessment (PISA) evalúa cada tres años las competencias de jóvenes de 15 años en matemáticas, lectura, ciencias y, desde 2012, alfabetización financiera. En su edición de 2022 (publicada en 2023), la OCDE evaluó a estudiantes de 20 países y territorios en su capacidad para entender y aplicar conceptos financieros básicos.',
              'Los resultados muestran que España se sitúa por debajo de la media OCDE en competencia financiera del alumnado. Más llamativo aún es el dato que surge de las encuestas a adultos: el 77% considera que debería haber recibido formación financiera explícita durante su etapa escolar y que esta debería ser parte obligatoria del currículo.',
              'Este dato no mide lo que los estudiantes saben hoy. Mide el arrepentimiento de quienes no lo aprendieron a tiempo, y el efecto que esa ausencia ha tenido en sus decisiones financieras como adultos.',
            ],
          },
          {
            heading: 'Por qué los centros educativos tienen un papel que nadie más puede asumir',
            paragraphs: [
              'La familia transmite hábitos financieros, pero también reproduce sus propios sesgos y limitaciones. Un hogar con dificultades económicas difícilmente puede enseñar planificación presupuestaria avanzada. En ambos casos, el centro escolar es el único canal universal que llega a todos los estudiantes independientemente de su origen.',
              'La investigación en economía del comportamiento señala que los hábitos financieros se forman antes de los 20 años. Lo que no se trabaja en esa ventana tiene un coste medible en las decisiones de vida adulta.',
              'Los países que han incorporado educación financiera como materia curricular muestran resultados consistentes: mayor tasa de ahorro en adultos jóvenes, menor endeudamiento de consumo improductivo y mejor comprensión de los productos financieros. Australia, Reino Unido y los países nórdicos llevan más de una década con programas estructurados.',
            ],
          },
          {
            heading: 'Qué competencias financieras define la OCDE para el alumnado de secundaria',
            paragraphs: [
              'El marco de evaluación PISA define cinco áreas de competencia financiera que todo estudiante debería desarrollar antes de terminar la educación obligatoria:',
            ],
            subsections: [
              {
                heading: 'Dinero y transacciones',
                paragraphs: [
                  'Entender el valor del dinero, los distintos medios de pago y cómo funcionan las transacciones cotidianas, incluyendo tarjetas de débito y crédito y transferencias digitales.',
                ],
              },
              {
                heading: 'Planificación y gestión de las finanzas',
                paragraphs: [
                  'Capacidad para presupuestar ingresos y gastos, establecer objetivos de ahorro y planificar a corto y medio plazo. Esta competencia correlaciona directamente con la estabilidad financiera en la vida adulta.',
                ],
              },
              {
                heading: 'Riesgo y rentabilidad',
                paragraphs: [
                  'Comprender que toda decisión financiera implica un nivel de riesgo. Evaluar productos de inversión básicos y reconocer promesas de rentabilidad irreales.',
                ],
              },
              {
                heading: 'Contexto financiero',
                paragraphs: [
                  'Entender el entorno en el que se toman las decisiones financieras: derechos del consumidor, regulación básica y cómo la economía afecta a las finanzas personales.',
                ],
              },
            ],
          },
          {
            heading: 'Qué implica este dato para los equipos directivos y pedagógicos',
            paragraphs: [
              'El 77% no es solo una estadística. Es la señal de que existe una brecha entre lo que la sociedad espera del sistema educativo y lo que el sistema educativo está ofreciendo actualmente en materia financiera.',
              'Los centros que actúan hoy están respondiendo a una demanda social clara, adelantándose a regulaciones que varios países europeos ya están desarrollando, y ofreciendo a su alumnado herramientas que usarán el resto de su vida.',
              'La pregunta no es si la educación financiera llegará al currículo español. La pregunta es cuándo. Los centros que se anticipen tendrán la ventaja de haber construido una metodología propia en lugar de adoptar una impuesta.',
            ],
          },
        ],
        ctaText:
          'Finomik diseña itinerarios de educación financiera adaptados al currículo y a la edad de cada grupo. Si tu centro quiere cerrar esta brecha, empezamos con un piloto sin compromiso.',
      },
      en: {
        title:
          '77% of adults believe financial education should be taught in school',
        intro:
          'Every edition of the PISA report forces education systems to ask what they are teaching and what they are leaving out. The 2023 data on financial literacy is especially clear: 77% of adults surveyed believe financial education should be part of the school curriculum. This is not a marginal demand. It is a generational demand that schools can no longer ignore.',
        sections: [
          {
            heading: 'What the PISA 2023 report actually says about financial education',
            paragraphs: [
              'The Programme for International Student Assessment (PISA) evaluates the competencies of 15-year-olds in mathematics, reading, science and, since 2012, financial literacy — every three years. In its 2022 edition (published in 2023), the OECD assessed students from 20 countries and territories on their ability to understand and apply basic financial concepts.',
              'The results show that Spain scores below the OECD average in students\' financial competence. Even more striking is the figure from surveys of adults: 77% believe they should have received explicit financial education during their school years, and that it should be a mandatory part of the curriculum.',
              'This figure does not measure what students know today. It measures the regret of those who did not learn it in time, and the impact that absence has had on their financial decisions as adults.',
            ],
          },
          {
            heading: 'Why schools have a role that no one else can fill',
            paragraphs: [
              'Families pass on financial habits, but they also pass on their own biases and limitations. A household facing economic hardship can hardly teach advanced budget planning. In both cases, the school is the only universal channel that reaches every student regardless of their background.',
              'Research in behavioural economics makes clear that financial habits are formed before the age of 20. What is not addressed within that window carries a measurable cost in adult life decisions.',
              'Countries that have incorporated financial education as a curricular subject show consistent results: higher savings rates among young adults, lower unproductive consumer debt and better understanding of financial products. Australia, the United Kingdom and the Nordic countries have had structured programmes for over a decade.',
            ],
          },
          {
            heading: 'The financial competencies the OECD defines for secondary school students',
            paragraphs: [
              'The PISA assessment framework defines five areas of financial competence that every student should develop before completing compulsory education:',
            ],
            subsections: [
              {
                heading: 'Money and transactions',
                paragraphs: [
                  'Understanding the value of money, the different means of payment and how everyday transactions work, including debit and credit cards and digital transfers.',
                ],
              },
              {
                heading: 'Planning and managing finances',
                paragraphs: [
                  'The ability to budget income and expenses, set savings goals and plan for the short and medium term. This competence correlates directly with financial stability in adult life.',
                ],
              },
              {
                heading: 'Risk and reward',
                paragraphs: [
                  'Understanding that every financial decision involves a level of risk. Evaluating basic investment products and recognising unrealistic promises of returns.',
                ],
              },
              {
                heading: 'Financial landscape',
                paragraphs: [
                  'Understanding the environment in which financial decisions are made: consumer rights, basic regulation and how the broader economy affects personal finances.',
                ],
              },
            ],
          },
          {
            heading: 'What this figure means for school leadership and teaching teams',
            paragraphs: [
              '77% is not just a statistic. It is a signal that a gap exists between what society expects from the education system and what the education system is currently delivering in financial matters.',
              'Schools that act today are responding to a clear social demand, getting ahead of regulations that several European countries are already developing, and giving their students tools they will use for the rest of their lives.',
              'The question is not whether financial education will reach the Spanish curriculum. The question is when. Schools that move first will have the advantage of having built their own methodology rather than adopting one imposed from outside.',
            ],
          },
        ],
        ctaText:
          'Finomik designs financial education itineraries adapted to the curriculum and the age of each group. If your school wants to close this gap, we start with a no-commitment pilot.',
      },
      ca: {
        title:
          "El 77% dels adults creu que l'educació financera hauria d'ensenyar-se al col·legi",
        intro:
          "Cada edició de l'informe PISA obliga els sistemes educatius a preguntar-se què ensenyen i què deixen fora. Les dades del 2023 sobre alfabetització financera són especialment clares: el 77% dels adults enquestats creu que l'educació financera hauria de formar part del currículum escolar. No és una demanda marginal. És una demanda generacional que els centres ja no poden ignorar.",
        sections: [
          {
            heading: "Què diu exactament l'informe PISA 2023 sobre educació financera",
            paragraphs: [
              "El Programme for International Student Assessment (PISA) avalua cada tres anys les competències de joves de 15 anys en matemàtiques, lectura, ciències i, des del 2012, alfabetització financera. En la seva edició del 2022 (publicada el 2023), l'OCDE va avaluar estudiants de 20 països i territoris en la seva capacitat per entendre i aplicar conceptes financers bàsics.",
              "Els resultats mostren que Espanya se situa per sota de la mitjana de l'OCDE en competència financera de l'alumnat. Encara més cridaner és el dato que sorgeix de les enquestes als adults: el 77% considera que hauria d'haver rebut formació financera explícita durant l'etapa escolar i que aquesta hauria de ser part obligatòria del currículum.",
              "Aquest dato no mesura el que els estudiants saben avui. Mesura el penediment de qui no ho va aprendre a temps, i l'efecte que aquesta absència ha tingut en les seves decisions financeres com a adults.",
            ],
          },
          {
            heading: 'Per què els centres educatius tenen un paper que ningú més pot assumir',
            paragraphs: [
              "La família transmet hàbits financers, però també reprodueix els seus propis biaixos i limitacions. Una llar amb dificultats econòmiques difícilment pot ensenyar planificació pressupostària avançada. En tots dos casos, el centre escolar és l'únic canal universal que arriba a tots els estudiants independentment del seu origen.",
              "La recerca en economia del comportament assenyala que els hàbits financers es formen abans dels 20 anys. El que no es treballa en aquesta finestra té un cost mesurable en les decisions de la vida adulta.",
              "Els països que han incorporat l'educació financera com a matèria curricular mostren resultats consistents: una taxa d'estalvi més alta en adults joves, menys endeutament de consum improductiu i una millor comprensió dels productes financers. Austràlia, el Regne Unit i els països nòrdics fa més d'una dècada que tenen programes estructurats.",
            ],
          },
          {
            heading: "Quines competències financeres defineix l'OCDE per a l'alumnat de secundària",
            paragraphs: [
              "El marc d'avaluació PISA defineix cinc àrees de competència financera que tot estudiant hauria de desenvolupar abans d'acabar l'educació obligatòria:",
            ],
            subsections: [
              {
                heading: 'Diners i transaccions',
                paragraphs: [
                  "Entendre el valor dels diners, els diferents mitjans de pagament i com funcionen les transaccions quotidianes, incloent-hi targetes de dèbit i crèdit i transferències digitals.",
                ],
              },
              {
                heading: 'Planificació i gestió de les finances',
                paragraphs: [
                  "Capacitat per pressupostar ingressos i despeses, establir objectius d'estalvi i planificar a curt i mitjà termini. Aquesta competència correlaciona directament amb l'estabilitat financera en la vida adulta.",
                ],
              },
              {
                heading: 'Risc i rendibilitat',
                paragraphs: [
                  "Comprendre que tota decisió financera implica un nivell de risc. Avaluar productes d'inversió bàsics i reconèixer promeses de rendibilitat irreals.",
                ],
              },
              {
                heading: 'Context financer',
                paragraphs: [
                  "Entendre l'entorn en el qual es prenen les decisions financeres: drets del consumidor, regulació bàsica i com l'economia afecta les finances personals.",
                ],
              },
            ],
          },
          {
            heading: 'Què implica aquest dato per als equips directius i pedagògics',
            paragraphs: [
              "El 77% no és només una estadística. És el senyal que existeix una bretxa entre el que la societat espera del sistema educatiu i el que el sistema educatiu està oferint actualment en matèria financera.",
              "Els centres que actuen avui estan responent a una demanda social clara, avançant-se a regulacions que diversos països europeus ja estan desenvolupant, i oferint al seu alumnat eines que faran servir la resta de la seva vida.",
              "La pregunta no és si l'educació financera arribarà al currículum espanyol. La pregunta és quan. Els centres que s'anticipin tindran l'avantatge d'haver construït una metodologia pròpia en lloc d'adoptar-ne una d'imposada.",
            ],
          },
        ],
        ctaText:
          "Finomik dissenya itineraris d'educació financera adaptats al currículum i a l'edat de cada grup. Si el teu centre vol tancar aquesta bretxa, comencem amb un pilot sense compromís.",
      },
    },
    references: [
      {
        citation: 'OCDE (2023). PISA 2022 Assessment and Analytical Framework. Paris: OECD Publishing.',
        url: 'https://www.oecd.org/pisa/',
      },
      {
        citation:
          'OCDE (2020). PISA 2018 Results (Volume IV): Are Students Smart about Money? Paris: OECD Publishing.',
      },
      {
        citation:
          'Lusardi, A. & Mitchell, O.S. (2014). The Economic Importance of Financial Literacy. Journal of Economic Literature, 52(1), 5–44.',
      },
    ],
  },

  {
    slug: 'alfabetizacion-financiera-adultos-mundo-sp-global',
    seo: {
      es: {
        title: 'Solo el 33% de adultos tiene competencia financiera | Finomik',
        description:
          'El S&P Global Financial Literacy Survey muestra que solo 1 de cada 3 adultos en el mundo tiene competencia financiera básica. Datos, causas y qué pueden hacer los centros.',
      },
      en: {
        title: 'Only 33% of Adults Are Financially Literate | Finomik',
        description:
          'The S&P Global Financial Literacy Survey shows that only 1 in 3 adults worldwide has basic financial competence. Data, causes and what schools can do.',
      },
      ca: {
        title: "Només el 33% d'adults és financerament competent | Finomik",
        description:
          "L'S&P Global Financial Literacy Survey mostra que només 1 de cada 3 adults al món té competència financera bàsica.",
      },
      keywords: [
        'alfabetización financiera adultos',
        'S&P Global FinLit Survey',
        'competencia financiera España',
        'educación financiera estadísticas',
      ],
    },
    meta: {
      date: '2026-02-20',
      author: 'Equipo Finomik',
      readTime: '6 min',
      category: 'Investigación y datos',
      stat: '33%',
      statLabel: 'de los adultos en el mundo es financieramente competente',
      source: 'S&P Global FinLit Survey, 2015',
    },
    content: {
      es: {
        title: 'Solo el 33% de los adultos en el mundo tiene competencia financiera básica',
        intro:
          'En 2015, S&P Ratings, Gallup y el Banco Mundial realizaron el mayor estudio sobre alfabetización financiera de la historia: 150.000 adultos entrevistados en 148 países. La conclusión fue contundente: solo 1 de cada 3 adultos en el mundo comprende conceptos financieros básicos como el interés compuesto, la inflación o la diversificación del riesgo.',
        sections: [
          {
            heading: 'Cómo se midió: la metodología del S&P Global Financial Literacy Survey',
            paragraphs: [
              'El estudio evaluó a adultos de 148 países usando cuatro preguntas que representan los conceptos financieros más relevantes para las decisiones del día a día. Para ser considerado "financieramente competente", un entrevistado debía responder correctamente al menos tres de las cuatro.',
              'Las cuatro áreas: diversificación del riesgo, inflación, cálculo de interés simple e interés compuesto. El resultado global: el 67% de los adultos falló en al menos dos de esas cuatro preguntas.',
            ],
          },
          {
            heading: 'España: mejor que la media global, pero con margen importante de mejora',
            paragraphs: [
              'España se sitúa por encima de la media mundial, con aproximadamente el 49% de la población adulta clasificada como financieramente competente. Sin embargo, esto significa que más de la mitad de los adultos españoles no comprende conceptos financieros fundamentales.',
              'El estudio identifica también una brecha de género significativa: en la mayoría de los países, incluida España, las mujeres puntúan por debajo de los hombres. No por capacidad, sino por acceso histórico diferencial a la educación financiera. Una brecha que la educación temprana puede cerrar si es igualitaria desde el diseño.',
            ],
          },
          {
            heading: 'El coste concreto de la baja alfabetización financiera',
            paragraphs: [
              'La baja competencia financiera tiene consecuencias económicas medibles: endeudamiento de consumo excesivo con créditos de alto coste, vulnerabilidad ante fraudes financieros, e infrautilización del ahorro para la jubilación.',
              'España tiene uno de los niveles más bajos de ahorro privado para la jubilación de la Unión Europea (Banco de España, Encuesta Financiera de las Familias, 2020). La dependencia casi exclusiva del sistema público de pensiones representa un riesgo sistémico que la educación financiera temprana puede contribuir a reducir.',
            ],
          },
          {
            heading: 'Por qué el punto de intervención más eficaz es el colegio',
            paragraphs: [
              'Los programas de educación financiera para adultos tienen tasas de impacto limitadas. Los hábitos financieros con años de arraigo cambian con dificultad.',
              'La investigación en economía del comportamiento es clara: los hábitos financieros más determinantes se forman entre los 12 y los 20 años. Intervenir en ese periodo tiene un efecto multiplicador que los programas de adultos no pueden replicar.',
            ],
          },
        ],
        ctaText:
          'Finomik lleva estas competencias al aula antes de que el alumnado tome sus primeras decisiones financieras. Empezamos con un piloto en tu centro en menos de una semana.',
      },
      en: {
        title: 'Only 33% of adults worldwide have basic financial competency',
        intro:
          'In 2015, S&P Ratings, Gallup and the World Bank conducted the largest financial literacy study in history: 150,000 adults interviewed across 148 countries. The conclusion was unambiguous: only 1 in 3 adults worldwide understands basic financial concepts such as compound interest, inflation or risk diversification.',
        sections: [
          {
            heading: 'How it was measured: the S&P Global Financial Literacy Survey methodology',
            paragraphs: [
              'The study assessed adults from 148 countries using four questions that represent the financial concepts most relevant to everyday decisions. To be considered "financially competent", a respondent had to answer at least three of the four correctly.',
              'The four areas tested: risk diversification, inflation, simple interest calculation and compound interest. The global result: 67% of adults got at least two of those four questions wrong.',
            ],
          },
          {
            heading: 'Spain: above the global average, but with significant room to improve',
            paragraphs: [
              'Spain ranks above the world average, with approximately 49% of the adult population classified as financially competent. Even so, this means that more than half of Spanish adults do not understand fundamental financial concepts.',
              'The study also identifies a significant gender gap: in most countries, including Spain, women score lower than men. Not because of ability, but because of historically unequal access to financial education. A gap that early education can close if it is designed to be equitable from the outset.',
            ],
          },
          {
            heading: 'The concrete cost of low financial literacy',
            paragraphs: [
              'Low financial competence has measurable economic consequences: excessive consumer debt through high-cost credit, vulnerability to financial fraud and under-utilisation of retirement savings.',
              'Spain has one of the lowest levels of private retirement savings in the European Union (Banco de España, Encuesta Financiera de las Familias, 2020). Near-total dependence on the public pension system represents a systemic risk that early financial education can help reduce.',
            ],
          },
          {
            heading: 'Why school is the most effective point of intervention',
            paragraphs: [
              'Financial education programmes aimed at adults have limited impact rates. Financial habits that have been entrenched for years are hard to change.',
              'Behavioural economics research is clear: the most consequential financial habits are formed between the ages of 12 and 20. Intervening during that period has a multiplier effect that adult programmes simply cannot replicate.',
            ],
          },
        ],
        ctaText:
          'Finomik brings these competencies into the classroom before students make their first financial decisions. We start with a pilot at your school in under a week.',
      },
      ca: {
        title: 'Només el 33% dels adults al món té competència financera bàsica',
        intro:
          "El 2015, S&P Ratings, Gallup i el Banc Mundial van dur a terme el major estudi sobre alfabetització financera de la història: 150.000 adults entrevistats en 148 països. La conclusió va ser contundent: només 1 de cada 3 adults al món comprèn conceptes financers bàsics com l'interès compost, la inflació o la diversificació del risc.",
        sections: [
          {
            heading: "Com es va mesurar: la metodologia de l'S&P Global Financial Literacy Survey",
            paragraphs: [
              'L\'estudi va avaluar adults de 148 països fent servir quatre preguntes que representen els conceptes financers més rellevants per a les decisions del dia a dia. Per ser considerat "financerament competent", un entrevistat havia de respondre correctament almenys tres de les quatre.',
              "Les quatre àrees: diversificació del risc, inflació, càlcul d'interès simple i interès compost. El resultat global: el 67% dels adults va fallar almenys dues d'aquestes quatre preguntes.",
            ],
          },
          {
            heading: 'Espanya: millor que la mitjana global, però amb marge important de millora',
            paragraphs: [
              "Espanya se situa per sobre de la mitjana mundial, amb aproximadament el 49% de la població adulta classificada com a financerament competent. Tot i així, això significa que més de la meitat dels adults espanyols no comprèn conceptes financers fonamentals.",
              "L'estudi identifica també una bretxa de gènere significativa: a la majoria dels països, inclosa Espanya, les dones puntuen per sota dels homes. No per capacitat, sinó per accés històric diferencial a l'educació financera. Una bretxa que l'educació primerenca pot tancar si és igualitària des del disseny.",
            ],
          },
          {
            heading: "El cost concret de la baixa alfabetització financera",
            paragraphs: [
              "La baixa competència financera té conseqüències econòmiques mesurables: endeutament de consum excessiu amb crèdits d'alt cost, vulnerabilitat davant fraus financers i infrautilització de l'estalvi per a la jubilació.",
              "Espanya té un dels nivells més baixos d'estalvi privat per a la jubilació de la Unió Europea (Banco de España, Encuesta Financiera de las Familias, 2020). La dependència gairebé exclusiva del sistema públic de pensions representa un risc sistèmic que l'educació financera primerenca pot contribuir a reduir.",
            ],
          },
          {
            heading: "Per què el punt d'intervenció més eficaç és el col·legi",
            paragraphs: [
              "Els programes d'educació financera per a adults tenen taxes d'impacte limitades. Els hàbits financers arrelats durant anys canvien amb dificultat.",
              "La recerca en economia del comportament és clara: els hàbits financers més determinants es formen entre els 12 i els 20 anys. Intervenir en aquest període té un efecte multiplicador que els programes per a adults no poden replicar.",
            ],
          },
        ],
        ctaText:
          "Finomik porta aquestes competències a l'aula abans que l'alumnat prengui les seves primeres decisions financeres. Comencem amb un pilot al teu centre en menys d'una setmana.",
      },
    },
    references: [
      {
        citation:
          "Klapper, L., Lusardi, A., & Van Oudheusden, P. (2015). Financial Literacy Around the World. World Bank Group.",
        url: 'https://gflec.org/initiatives/sp-global-finlit-survey/',
      },
      {
        citation:
          'Banco de España (2022). Encuesta Financiera de las Familias 2020. Boletín Económico 3/2022.',
      },
      { citation: 'CNMV (2023). Plan de Educación Financiera 2022–2025.' },
    ],
  },

  {
    slug: 'aprendizaje-gamificado-retencion-educacion-financiera',
    seo: {
      es: {
        title: 'El aprendizaje gamificado mejora 3x la retención | Finomik',
        description:
          'La investigación muestra que el aprendizaje gamificado produce hasta 3 veces más retención que los formatos tradicionales. Por qué funciona y qué implica para la educación financiera.',
      },
      en: {
        title: 'Gamified Learning Improves Retention 3x | Finomik',
        description:
          'Research shows gamified learning produces up to 3 times more retention than traditional formats. Why it works and what it means for financial education.',
      },
      ca: {
        title: "L'aprenentatge gamificat millora 3x la retenció | Finomik",
        description:
          "La investigació mostra que l'aprenentatge gamificat produeix fins a 3 vegades més retenció que els formats tradicionals.",
      },
      keywords: [
        'aprendizaje gamificado educación',
        'gamificación retención conocimiento',
        'educación financiera gamificada',
        'metodología gamificada colegios',
      ],
    },
    meta: {
      date: '2026-03-05',
      author: 'Equipo Finomik',
      readTime: '7 min',
      category: 'Pedagogía y metodología',
      stat: '3x',
      statLabel: 'más retención con aprendizaje gamificado frente a formatos tradicionales',
      source: 'Journal of Education Technology, 2021',
    },
    content: {
      es: {
        title:
          'El aprendizaje gamificado produce hasta 3 veces más retención que los formatos tradicionales',
        intro:
          'No es solo que los estudiantes prefieran los juegos a los libros de texto. Es que los mecanismos de la gamificación activan procesos cognitivos que los formatos pasivos no logran. Según investigación publicada en el Journal of Educational Technology, los entornos de aprendizaje gamificados producen hasta 3 veces más retención del conocimiento a largo plazo.',
        sections: [
          {
            heading: 'Qué es realmente la gamificación en educación (y qué no es)',
            paragraphs: [
              'Gamificar no es convertir la clase en un videojuego. Es aplicar mecánicas de diseño de juegos —objetivos claros, feedback inmediato, progreso visible, retos escalables, recompensas— a contextos de aprendizaje donde antes no existían.',
              'La gamificación efectiva incluye: objetivos de sesión explícitos y alcanzables, feedback inmediato (no diferido hasta el examen), rutas de dificultad adaptativa y elementos de progreso visual.',
            ],
          },
          {
            heading: 'Por qué el cerebro aprende mejor con gamificación',
            paragraphs: [
              'El feedback inmediato activa el sistema dopaminérgico. Cuando un estudiante responde correctamente y recibe confirmación instantánea, el cerebro libera dopamina, reforzando la conexión neural asociada al conocimiento. En un aula tradicional, ese feedback llega días después del examen, cuando la ventana de refuerzo neural ha cerrado.',
              'Cada vez que un estudiante responde una pregunta está practicando recuperación activa (active recall), el mecanismo de aprendizaje más potente conocido. Roediger & Karpicke (2006) demostraron que los estudiantes que practican active recall retienen el 50% más de contenido que los que solo releen el material.',
            ],
          },
          {
            heading: 'Evidencia específica en educación financiera',
            paragraphs: [
              'El efecto de la gamificación es especialmente marcado en educación financiera: los conceptos abstractos ganan claridad cuando se experimentan en escenarios simulados antes de enfrentarse a ellos en la vida real.',
              'Mandell & Klein (Journal of Financial Counseling and Planning, 2009) siguieron durante seis meses a estudiantes que habían aprendido mediante simulaciones frente a clase magistral. Los primeros mostraron decisiones financieras significativamente mejores: menor uso de crédito de consumo, mayor propensión al ahorro.',
            ],
          },
          {
            heading: 'Qué implica esto para la metodología de los centros',
            paragraphs: [
              'El formato de enseñanza importa tanto como el contenido. Un centro que imparte educación financiera con fichas de ejercicios cumple el requisito formal pero no obtiene los resultados que el contenido podría generar.',
              'La buena noticia: no es necesario desarrollar estos sistemas desde cero. Plataformas diseñadas específicamente para educación financiera gamificada pueden integrarse en el currículo existente sin reemplazarlo.',
            ],
          },
        ],
        ctaText:
          'Finomik está diseñado desde sus cimientos con estos principios: feedback inmediato, progreso visible, escenarios reales. Si quieres ver cómo funciona, empezamos con un piloto en tu centro.',
      },
      en: {
        title: 'Gamified learning produces up to 3 times more retention than traditional formats',
        intro:
          'It is not simply that students prefer games to textbooks. It is that the mechanisms behind gamification activate cognitive processes that passive formats cannot. According to research published in the Journal of Educational Technology, gamified learning environments produce up to 3 times more long-term knowledge retention.',
        sections: [
          {
            heading: 'What gamification in education really is (and what it is not)',
            paragraphs: [
              'Gamifying a class does not mean turning it into a video game. It means applying game design mechanics — clear goals, immediate feedback, visible progress, scalable challenges, rewards — to learning contexts where they did not previously exist.',
              'Effective gamification includes: explicit and achievable session objectives, immediate feedback (not deferred until the exam), adaptive difficulty paths and visual progress elements.',
            ],
          },
          {
            heading: 'Why the brain learns better with gamification',
            paragraphs: [
              'Immediate feedback activates the dopaminergic system. When a student answers correctly and receives instant confirmation, the brain releases dopamine, reinforcing the neural connection associated with that knowledge. In a traditional classroom, that feedback arrives days after the exam, by which point the neural reinforcement window has closed.',
              'Every time a student answers a question they are practising active recall, the most powerful learning mechanism known. Roediger & Karpicke (2006) showed that students who practise active recall retain 50% more content than those who simply re-read the material.',
            ],
          },
          {
            heading: 'Specific evidence in financial education',
            paragraphs: [
              'The effect of gamification is especially pronounced in financial education: abstract concepts become clearer when experienced in simulated scenarios before students encounter them in real life.',
              'Mandell & Klein (Journal of Financial Counseling and Planning, 2009) followed students for six months who had learned through simulations versus traditional lectures. The simulation group showed significantly better financial decisions: lower use of consumer credit and a greater propensity to save.',
            ],
          },
          {
            heading: 'What this means for school teaching methodology',
            paragraphs: [
              'The teaching format matters as much as the content. A school that delivers financial education via worksheets meets the formal requirement but does not achieve the results the content could generate.',
              'The good news: these systems do not need to be built from scratch. Platforms designed specifically for gamified financial education can be integrated into the existing curriculum without replacing it.',
            ],
          },
        ],
        ctaText:
          'Finomik is built from the ground up around these principles: immediate feedback, visible progress, real-world scenarios. If you want to see how it works, we start with a pilot at your school.',
      },
      ca: {
        title:
          "L'aprenentatge gamificat produeix fins a 3 vegades més retenció que els formats tradicionals",
        intro:
          "No és només que els estudiants prefereixin els jocs als llibres de text. És que els mecanismes de la gamificació activen processos cognitius que els formats passius no aconsegueixen. Segons recerca publicada al Journal of Educational Technology, els entorns d'aprenentatge gamificats produeixen fins a 3 vegades més retenció del coneixement a llarg termini.",
        sections: [
          {
            heading: "Què és realment la gamificació en educació (i què no és)",
            paragraphs: [
              "Gamificar no és convertir la classe en un videojoc. És aplicar mecàniques de disseny de jocs: objectius clars, feedback immediat, progrés visible, reptes escalables, recompenses, a contextos d'aprenentatge on abans no existien.",
              "La gamificació efectiva inclou: objectius de sessió explícits i assolibles, feedback immediat (no diferit fins a l'examen), rutes de dificultat adaptativa i elements de progrés visual.",
            ],
          },
          {
            heading: 'Per què el cervell aprèn millor amb gamificació',
            paragraphs: [
              "El feedback immediat activa el sistema dopaminèrgic. Quan un estudiant respon correctament i rep una confirmació instantània, el cervell allibera dopamina, reforçant la connexió neural associada al coneixement. En una aula tradicional, aquest feedback arriba dies després de l'examen, quan la finestra de reforç neural ja s'ha tancat.",
              "Cada vegada que un estudiant respon una pregunta està practicant recuperació activa (active recall), el mecanisme d'aprenentatge més potent conegut. Roediger & Karpicke (2006) van demostrar que els estudiants que practiquen active recall retenen el 50% més de contingut que els que simplement rellegeixen el material.",
            ],
          },
          {
            heading: "Evidència específica en educació financera",
            paragraphs: [
              "L'efecte de la gamificació és especialment marcat en educació financera: els conceptes abstractes guanyen claredat quan s'experimenten en escenaris simulats abans d'enfrontar-los a la vida real.",
              "Mandell & Klein (Journal of Financial Counseling and Planning, 2009) van seguir durant sis mesos estudiants que havien après mitjançant simulacions front a classe magistral. Els primers van mostrar decisions financeres significativament millors: menys ús de crèdit de consum i més propensió a l'estalvi.",
            ],
          },
          {
            heading: "Què implica això per a la metodologia dels centres",
            paragraphs: [
              "El format d'ensenyament importa tant com el contingut. Un centre que imparteix educació financera amb fitxes d'exercicis compleix el requisit formal però no obté els resultats que el contingut podria generar.",
              "La bona notícia: no cal desenvolupar aquests sistemes des de zero. Plataformes dissenyades específicament per a l'educació financera gamificada es poden integrar en el currículum existent sense substituir-lo.",
            ],
          },
        ],
        ctaText:
          "Finomik està dissenyat des dels fonaments amb aquests principis: feedback immediat, progrés visible, escenaris reals. Si vols veure com funciona, comencem amb un pilot al teu centre.",
      },
    },
    references: [
      {
        citation:
          'Dichev, C., & Dicheva, D. (2017). Gamifying education: what is known, what is believed and what remains uncertain. International Journal of Educational Technology in Higher Education, 14(9).',
        url: 'https://doi.org/10.1186/s41239-017-0042-5',
      },
      {
        citation:
          'Roediger, H.L., & Karpicke, J.D. (2006). The Power of Testing Memory. Perspectives on Psychological Science, 1(3), 181–210.',
      },
      {
        citation:
          'Mandell, L., & Klein, L.S. (2009). The Impact of Financial Literacy Education on Subsequent Financial Behavior. Journal of Financial Counseling and Planning, 20(1), 15–24.',
      },
    ],
  },

  {
    slug: 'adultos-sin-conocimientos-financieros-basicos-mundo',
    seo: {
      es: {
        title: '3.500 millones de adultos sin conocimientos financieros | Finomik',
        description:
          'Más de 3.500 millones de personas adultas en el mundo carecen de conocimientos financieros básicos. Qué significa este dato y por qué la educación empieza en la escuela.',
      },
      en: {
        title: '3.5 Billion Adults Lack Basic Financial Knowledge | Finomik',
        description:
          'The World Bank estimates more than 3.5 billion adults worldwide lack the minimum knowledge to make informed financial decisions.',
      },
      ca: {
        title: "3.500 milions d'adults sense coneixements financers | Finomik",
        description:
          "El Banc Mundial estima que més de 3.500 milions de persones adultes al món no tenen els coneixements mínims per prendre decisions financeres informades.",
      },
      keywords: [
        'alfabetización financiera global',
        'adultos sin educación financiera',
        'crisis financiera mundial',
        'educación financiera escuelas',
      ],
    },
    meta: {
      date: '2026-03-18',
      author: 'Equipo Finomik',
      readTime: '5 min',
      category: 'Investigación y datos',
      stat: '3.5B+',
      statLabel: 'personas adultas en el mundo sin conocimientos financieros básicos',
      source: 'S&P Global FinLit / Banco Mundial, 2022',
    },
    content: {
      es: {
        title:
          '3.500 millones de adultos en el mundo no tienen conocimientos financieros básicos',
        intro:
          'El Banco Mundial estima que más de 3.500 millones de personas adultas en el mundo carecen de los conocimientos mínimos para tomar decisiones financieras informadas. No es una cifra abstracta: es la proporción de la humanidad que gestiona sus ingresos, sus deudas y su futuro sin las herramientas conceptuales necesarias para hacerlo bien.',
        sections: [
          {
            heading: 'Cómo se llega a este número: la magnitud del déficit global',
            paragraphs: [
              'El S&P Global Financial Literacy Survey (Klapper, Lusardi & Van Oudheusden, 2015) estableció que solo el 33% de los adultos a nivel mundial puede considerarse financieramente competente. Aplicado a la población adulta global de aproximadamente 5.400 millones de personas en el momento del estudio, eso implica que más de 3.500 millones de adultos no comprenden conceptos financieros básicos.',
              'Los datos del Banco Mundial actualizados al período 2021-2022 confirman que esta proporción no ha mejorado significativamente. Las regiones con menor competencia financiera incluyen el sur y el sureste de Asia, el África subsahariana y partes de América Latina, pero el déficit está presente en todos los continentes, incluida Europa.',
              'En España, el Banco de España y la CNMV publican anualmente indicadores de conocimiento financiero. Los datos de 2022 muestran que solo el 49% de los adultos españoles supera el umbral mínimo de competencia financiera definido por los estándares internacionales.',
            ],
          },
          {
            heading: 'Las consecuencias reales de vivir sin conocimientos financieros',
            paragraphs: [
              'La baja alfabetización financiera no es un déficit académico abstracto. Se traduce en decisiones concretas con consecuencias concretas: contratar créditos sin comprender el coste real, aceptar condiciones hipotecarias sin entender la diferencia entre tipo fijo y variable, invertir en productos que no se comprenden, o no ahorrar para imprevistos porque nadie explicó por qué es necesario.',
              'La OCDE estima que los hogares con baja competencia financiera pagan, en promedio, entre un 15% y un 25% más en comisiones y tipos de interés que los hogares con alta competencia. La ignorancia financiera tiene un precio literal, y ese precio lo pagan quienes menos pueden permitírselo.',
              'A nivel sistémico, la baja alfabetización financiera contribuye a la fragilidad del sistema de pensiones, al crecimiento del endeudamiento improductivo y a la baja penetración del ahorro privado en economías como la española.',
            ],
          },
          {
            heading: 'Por qué esta cifra seguirá creciendo si no se actúa en los colegios',
            paragraphs: [
              'Cada año, millones de jóvenes acceden al mercado laboral, firman su primer contrato de alquiler, abren su primera cuenta bancaria o contratan su primer seguro sin haber recibido formación financiera formal. Se convierten en nuevos integrantes de esos 3.500 millones.',
              'La velocidad a la que los productos financieros se complejizan, la proliferación de criptoactivos, los productos de inversión de alto riesgo presentados como seguros, y la expansión del crédito digital de alto coste hacen que la brecha entre lo que los consumidores entienden y lo que el mercado les ofrece sea mayor cada año.',
              'La única intervención que puede romper este ciclo de forma sistemática y escalable es la educación en la etapa escolar. No hay otro canal con el alcance, la regularidad y la universalidad del sistema educativo.',
            ],
          },
          {
            heading: 'Qué pueden hacer los centros hoy',
            paragraphs: [
              'No es necesario esperar a que la educación financiera sea obligatoria por ley. Varios centros en España ya están incorporando módulos de competencia financiera en materias como Economía, Matemáticas o en actividades de tutoría.',
              'La clave no es añadir más contenido al currículo ya saturado, sino incorporar metodologías que integren la competencia financiera en el aprendizaje existente de forma progresiva, adaptada a la edad y con impacto medible.',
            ],
          },
        ],
        ctaText:
          'Finomik trabaja con centros educativos para que sus estudiantes no se conviertan en parte de esta estadística. Empieza con un piloto y mide el impacto desde el primer trimestre.',
      },
      en: {
        title: '3.5 billion adults worldwide lack basic financial knowledge',
        intro:
          'The World Bank estimates that more than 3.5 billion adults worldwide lack the minimum knowledge needed to make informed financial decisions. This is not an abstract figure: it is the share of humanity managing their income, their debts and their future without the conceptual tools required to do so effectively.',
        sections: [
          {
            heading: 'How we arrive at this number: the scale of the global deficit',
            paragraphs: [
              'The S&P Global Financial Literacy Survey (Klapper, Lusardi & Van Oudheusden, 2015) established that only 33% of adults worldwide can be considered financially competent. Applied to a global adult population of approximately 5.4 billion at the time of the study, this means that more than 3.5 billion adults do not understand basic financial concepts.',
              'World Bank data updated to the 2021-2022 period confirms that this proportion has not improved significantly. The regions with the lowest financial competence include South and Southeast Asia, sub-Saharan Africa and parts of Latin America, but the deficit exists on every continent, including Europe.',
              'In Spain, the Banco de España and the CNMV publish annual financial literacy indicators. The 2022 data shows that only 49% of Spanish adults meet the minimum financial competence threshold defined by international standards.',
            ],
          },
          {
            heading: 'The real consequences of living without financial knowledge',
            paragraphs: [
              'Low financial literacy is not an abstract academic deficit. It translates into concrete decisions with concrete consequences: taking out credit without understanding the true cost, agreeing to mortgage terms without understanding the difference between fixed and variable rates, investing in products that are not understood, or failing to save for emergencies because no one ever explained why it matters.',
              'The OECD estimates that households with low financial competence pay, on average, between 15% and 25% more in fees and interest rates than highly competent households. Financial ignorance has a literal price, and it is paid by those who can least afford it.',
              'At a systemic level, low financial literacy contributes to the fragility of pension systems, the growth of unproductive debt and the low penetration of private savings in economies like Spain.',
            ],
          },
          {
            heading: 'Why this number will keep growing without action in schools',
            paragraphs: [
              'Every year, millions of young people enter the labour market, sign their first rental contract, open their first bank account or take out their first insurance policy without having received any formal financial education. They become new additions to that 3.5 billion.',
              'The speed at which financial products are growing in complexity, the proliferation of crypto assets, high-risk investment products marketed as safe, and the expansion of high-cost digital credit mean that the gap between what consumers understand and what the market offers them widens every year.',
              'The only intervention that can break this cycle in a systematic and scalable way is education during the school years. There is no other channel with the reach, regularity and universality of the education system.',
            ],
          },
          {
            heading: 'What schools can do today',
            paragraphs: [
              'There is no need to wait until financial education becomes mandatory by law. Several schools in Spain are already incorporating financial competence modules into subjects such as Economics, Mathematics or personal development sessions.',
              'The key is not to add more content to an already overloaded curriculum, but to integrate financial competence into existing learning in a progressive, age-appropriate way with measurable impact.',
            ],
          },
        ],
        ctaText:
          'Finomik works with schools so that their students do not become part of this statistic. Start with a pilot and measure the impact from the first term.',
      },
      ca: {
        title: "3.500 milions d'adults al món no tenen coneixements financers bàsics",
        intro:
          "El Banc Mundial estima que més de 3.500 milions de persones adultes al món no tenen els coneixements mínims per prendre decisions financeres informades. No és una xifra abstracta: és la proporció de la humanitat que gestiona els seus ingressos, els seus deutes i el seu futur sense les eines conceptuals necessàries per fer-ho bé.",
        sections: [
          {
            heading: 'Com s\'arriba a aquest número: la magnitud del dèficit global',
            paragraphs: [
              "L'S&P Global Financial Literacy Survey (Klapper, Lusardi & Van Oudheusden, 2015) va establir que només el 33% dels adults a nivell mundial pot considerar-se financerament competent. Aplicat a la població adulta global d'aproximadament 5.400 milions de persones en el moment de l'estudi, això implica que més de 3.500 milions d'adults no comprenen conceptes financers bàsics.",
              "Les dades del Banc Mundial actualitzades al període 2021-2022 confirmen que aquesta proporció no ha millorat significativament. Les regions amb menor competència financera inclouen el sud i el sud-est d'Àsia, l'Àfrica subsahariana i parts d'Amèrica Llatina, però el dèficit és present a tots els continents, inclosa Europa.",
              "A Espanya, el Banco de España i la CNMV publiquen anualment indicadors de coneixement financer. Les dades del 2022 mostren que només el 49% dels adults espanyols supera el llindar mínim de competència financera definit pels estàndards internacionals.",
            ],
          },
          {
            heading: 'Les conseqüències reals de viure sense coneixements financers',
            paragraphs: [
              "La baixa alfabetització financera no és un dèficit acadèmic abstracte. Es tradueix en decisions concretes amb conseqüències concretes: contractar crèdits sense comprendre el cost real, acceptar condicions hipotecàries sense entendre la diferència entre tipus fix i variable, invertir en productes que no es comprenen, o no estalviar per a imprevistos perquè ningú va explicar per què és necessari.",
              "L'OCDE estima que les llars amb baixa competència financera paguen, de mitjana, entre un 15% i un 25% més en comissions i tipus d'interès que les llars amb alta competència. La ignorància financera té un preu literal, i aquest preu el paguen els qui menys se'l poden permetre.",
              "A nivell sistèmic, la baixa alfabetització financera contribueix a la fragilitat del sistema de pensions, al creixement de l'endeutament improductiu i a la baixa penetració de l'estalvi privat en economies com l'espanyola.",
            ],
          },
          {
            heading: 'Per què aquesta xifra continuarà creixent si no s\'actua als col·legis',
            paragraphs: [
              "Cada any, milions de joves accedeixen al mercat laboral, signen el seu primer contracte de lloguer, obren el seu primer compte bancari o contracten la seva primera assegurança sense haver rebut formació financera formal. Es converteixen en nous integrants d'aquells 3.500 milions.",
              "La velocitat a la qual els productes financers es fan més complexos, la proliferació de criptoactius, els productes d'inversió d'alt risc presentats com a segurs, i l'expansió del crèdit digital d'alt cost fan que la bretxa entre el que els consumidors entenen i el que el mercat els ofereix sigui major cada any.",
              "L'única intervenció que pot trencar aquest cicle de manera sistemàtica i escalable és l'educació en l'etapa escolar. No hi ha cap altre canal amb l'abast, la regularitat i la universalitat del sistema educatiu.",
            ],
          },
          {
            heading: 'Què poden fer els centres avui',
            paragraphs: [
              "No cal esperar que l'educació financera sigui obligatòria per llei. Diversos centres a Espanya ja estan incorporant mòduls de competència financera en matèries com Economia, Matemàtiques o en activitats de tutoria.",
              "La clau no és afegir més contingut al currículum ja saturat, sinó incorporar metodologies que integrin la competència financera en l'aprenentatge existent de forma progressiva, adaptada a l'edat i amb impacte mesurable.",
            ],
          },
        ],
        ctaText:
          "Finomik treballa amb centres educatius perquè els seus estudiants no es converteixin en part d'aquesta estadística. Comença amb un pilot i mesura l'impacte des del primer trimestre.",
      },
    },
    references: [
      {
        citation:
          "Klapper, L., Lusardi, A., & Van Oudheusden, P. (2015). Financial Literacy Around the World. World Bank Group.",
        url: 'https://gflec.org/initiatives/sp-global-finlit-survey/',
      },
      {
        citation:
          'Banco de España / CNMV (2022). Plan de Educación Financiera. Encuesta de competencias financieras.',
      },
      {
        citation:
          'OCDE (2021). Financial literacy and inclusion. Results from PISA 2018 and beyond.',
      },
    ],
  },

  {
    slug: 'alumnado-sin-educacion-financiera-basica-espana',
    seo: {
      es: {
        title: '1 de cada 5 estudiantes falla tareas financieras básicas | Finomik',
        description:
          'El 20% del alumnado no es capaz de resolver tareas financieras elementales. Qué evalúa PISA, qué resultados muestra España y cómo pueden actuar los centros.',
      },
      en: {
        title: '1 in 5 Students Fails Basic Financial Tasks | Finomik',
        description:
          '20% of students cannot complete elementary financial tasks. What PISA measures, what the results show for Spain, and what schools can do.',
      },
      ca: {
        title: "1 de cada 5 estudiants suspèn tasques financeres bàsiques | Finomik",
        description:
          "El 20% de l'alumnat no és capaç de resoldre tasques financeres elementals. Què avalua PISA, quins resultats mostra Espanya i com poden actuar els centres.",
      },
      keywords: [
        'alumnado educación financiera',
        'PISA competencia financiera estudiantes',
        'educación financiera España colegios',
        'evaluación financiera alumnado',
      ],
    },
    meta: {
      date: '2026-04-03',
      author: 'Equipo Finomik',
      readTime: '5 min',
      category: 'Pedagogía y metodología',
      stat: '20%',
      statLabel: 'del alumnado no supera tareas financieras elementales',
      source: 'PISA Financial Literacy, 2022',
    },
    content: {
      es: {
        title:
          '1 de cada 5 estudiantes no supera tareas financieras elementales según PISA 2022',
        intro:
          'En la evaluación PISA 2022 de competencia financiera, el 20% de los estudiantes participantes no fue capaz de completar tareas financieras básicas: interpretar una factura sencilla, calcular el cambio correcto o identificar cuándo un contrato es ventajoso. No hablamos de inversión o planificación a largo plazo. Hablamos del nivel mínimo funcional para moverse en la vida económica cotidiana.',
        sections: [
          {
            heading: 'Qué mide PISA en competencia financiera y qué significa "nivel básico"',
            paragraphs: [
              'La evaluación PISA de competencia financiera clasifica a los estudiantes en seis niveles de desempeño. El nivel 1 representa la capacidad mínima para funcionar en situaciones financieras cotidianas: identificar productos financieros comunes, interpretar documentos simples como extractos bancarios o facturas, y tomar decisiones básicas de compra.',
              'Los estudiantes que no alcanzan el nivel 1 no pueden completar estas tareas con fiabilidad. En la edición de 2022, el 20% de los participantes quedó por debajo de este umbral mínimo. Esto no implica que no vayan a ir a la universidad o que no sean capaces intelectualmente. Implica que nadie les ha enseñado sistemáticamente cómo funciona el dinero.',
              'España participó en la evaluación PISA de competencia financiera. Los resultados muestran que el porcentaje de estudiantes españoles por debajo del nivel básico es comparable a la media OCDE, con variaciones significativas según la comunidad autónoma y el tipo de centro.',
            ],
          },
          {
            heading: 'A qué situaciones reales se enfrentarán estos estudiantes sin preparación',
            paragraphs: [
              'Los estudiantes que terminan la educación obligatoria por debajo del nivel básico de competencia financiera se enfrentan, en los siguientes dos o tres años, a situaciones que requieren exactamente las habilidades que no tienen: su primera nómina, su primera declaración de la renta, su primer contrato de alquiler, su primera tarjeta de crédito.',
              'Muchos de estos contratos y productos incluyen cláusulas que un adulto con competencia financiera identificaría como problemáticas. Un adulto sin esa competencia los firma sin entenderlos, y las consecuencias se acumulan durante años.',
              'El endeudamiento de los jóvenes españoles de entre 18 y 30 años ha crecido significativamente en los últimos años, impulsado por el crédito al consumo y los mini-préstamos digitales. La correlación entre baja competencia financiera y uso de productos de crédito de alto coste está bien documentada.',
            ],
          },
          {
            heading: 'Qué diferencia a los centros que mejoran estos resultados',
            paragraphs: [
              'Los centros que obtienen mejores resultados en competencia financiera de su alumnado comparten tres características: incorporan contenidos financieros de forma regular (no como evento puntual), utilizan metodologías activas que van más allá de la clase magistral, y conectan los conceptos con situaciones de la vida real del alumnado.',
              'No se trata de añadir una asignatura nueva. Se trata de integrar la perspectiva financiera en materias existentes: matemáticas aplicadas, economía, ciencias sociales, o proyectos interdisciplinares. Los centros que lo hacen bien lo integran de forma progresiva, con una secuencia pensada por niveles y edades.',
              'Los resultados son medibles: estudios de seguimiento muestran que el alumnado que recibe educación financiera estructurada durante al menos dos cursos académicos mejora significativamente su capacidad para evaluar productos financieros y planificar su presupuesto.',
            ],
          },
        ],
        ctaText:
          'Finomik ofrece itinerarios estructurados por niveles y edades para que tu alumnado llegue a los 18 años con las herramientas financieras que necesita. Empieza con un grupo piloto.',
      },
      en: {
        title: '1 in 5 students fails to meet basic financial competence standards according to PISA 2022',
        intro:
          'In the PISA 2022 financial competence assessment, 20% of participating students were unable to complete basic financial tasks: reading a simple invoice, calculating correct change or identifying when a contract is favourable. We are not talking about investment or long-term planning. We are talking about the minimum functional level needed to navigate everyday economic life.',
        sections: [
          {
            heading: 'What PISA measures in financial competence and what "basic level" means',
            paragraphs: [
              'The PISA financial competence assessment classifies students across six performance levels. Level 1 represents the minimum capacity to function in everyday financial situations: identifying common financial products, reading simple documents such as bank statements or invoices, and making basic purchasing decisions.',
              'Students who do not reach Level 1 cannot reliably complete these tasks. In the 2022 edition, 20% of participants fell below this minimum threshold. This does not mean they will not attend university or that they lack intellectual ability. It means no one has systematically taught them how money works.',
              'Spain took part in the PISA financial competence assessment. The results show that the share of Spanish students below the basic level is comparable to the OECD average, with significant variation by region and type of school.',
            ],
          },
          {
            heading: 'The real situations these students will face without preparation',
            paragraphs: [
              'Students who leave compulsory education below the basic financial competence level will face, within the next two or three years, situations that require exactly the skills they lack: their first payslip, their first tax return, their first rental contract, their first credit card.',
              'Many of these contracts and products contain clauses that a financially competent adult would flag as problematic. An adult without that competence signs them without understanding them, and the consequences accumulate over years.',
              'Debt among young Spaniards aged 18 to 30 has grown significantly in recent years, driven by consumer credit and digital micro-loans. The correlation between low financial competence and the use of high-cost credit products is well documented.',
            ],
          },
          {
            heading: 'What sets apart the schools that improve these results',
            paragraphs: [
              'Schools that achieve better financial competence outcomes share three characteristics: they incorporate financial content regularly rather than as a one-off event, they use active methodologies that go beyond lectures, and they connect concepts to real situations in students\' lives.',
              'It is not about adding a new subject. It is about integrating the financial perspective into existing subjects: applied mathematics, economics, social sciences or interdisciplinary projects. The schools that do this well integrate it progressively, with a sequence designed by level and age group.',
              'The results are measurable: follow-up studies show that students who receive structured financial education for at least two academic years improve significantly in their ability to evaluate financial products and plan a budget.',
            ],
          },
        ],
        ctaText:
          'Finomik offers level- and age-structured itineraries so that your students arrive at 18 with the financial tools they need. Start with a pilot group.',
      },
      ca: {
        title:
          "1 de cada 5 estudiants no supera tasques financeres elementals segons PISA 2022",
        intro:
          "En l'avaluació PISA 2022 de competència financera, el 20% dels estudiants participants no va ser capaç de completar tasques financeres bàsiques: interpretar una factura senzilla, calcular el canvi correcte o identificar quan un contracte és avantatjós. No parlem d'inversió ni de planificació a llarg termini. Parlem del nivell mínim funcional per moure's en la vida econòmica quotidiana.",
        sections: [
          {
            heading: "Què mesura PISA en competència financera i què significa 'nivell bàsic'",
            paragraphs: [
              "L'avaluació PISA de competència financera classifica els estudiants en sis nivells de rendiment. El nivell 1 representa la capacitat mínima per funcionar en situacions financeres quotidianes: identificar productes financers comuns, interpretar documents simples com extractes bancaris o factures, i prendre decisions bàsiques de compra.",
              "Els estudiants que no arriben al nivell 1 no poden completar aquestes tasques amb fiabilitat. En l'edició del 2022, el 20% dels participants va quedar per sota d'aquest llindar mínim. Això no implica que no vagin a la universitat ni que no siguin capaços intel·lectualment. Implica que ningú els ha ensenyat sistemàticament com funcionen els diners.",
              "Espanya va participar en l'avaluació PISA de competència financera. Els resultats mostren que el percentatge d'estudiants espanyols per sota del nivell bàsic és comparable a la mitjana de l'OCDE, amb variacions significatives segons la comunitat autònoma i el tipus de centre.",
            ],
          },
          {
            heading: 'A quines situacions reals s\'enfrontaran aquests estudiants sense preparació',
            paragraphs: [
              "Els estudiants que acaben l'educació obligatòria per sota del nivell bàsic de competència financera s'enfrontaran, en els dos o tres anys següents, a situacions que requereixen exactament les habilitats que no tenen: la seva primera nòmina, la seva primera declaració de la renda, el seu primer contracte de lloguer, la seva primera targeta de crèdit.",
              "Molts d'aquests contractes i productes inclouen clàusules que un adult amb competència financera identificaria com a problemàtiques. Un adult sense aquesta competència els signa sense entendre'ls, i les conseqüències s'acumulen durant anys.",
              "L'endeutament dels joves espanyols d'entre 18 i 30 anys ha crescut significativament en els últims anys, impulsat pel crèdit al consum i els mini-préstecs digitals. La correlació entre baixa competència financera i ús de productes de crèdit d'alt cost està ben documentada.",
            ],
          },
          {
            heading: 'Què diferencia els centres que milloren aquests resultats',
            paragraphs: [
              "Els centres que obtenen millors resultats en competència financera del seu alumnat comparteixen tres característiques: incorporen continguts financers de manera regular (no com a esdeveniment puntual), utilitzen metodologies actives que van més enllà de la classe magistral, i connecten els conceptes amb situacions de la vida real de l'alumnat.",
              "No es tracta d'afegir una nova assignatura. Es tracta d'integrar la perspectiva financera en matèries existents: matemàtiques aplicades, economia, ciències socials, o projectes interdisciplinaris. Els centres que ho fan bé ho integren de forma progressiva, amb una seqüència pensada per nivells i edats.",
              "Els resultats són mesurables: estudis de seguiment mostren que l'alumnat que rep educació financera estructurada durant almenys dos cursos acadèmics millora significativament la seva capacitat per avaluar productes financers i planificar el seu pressupost.",
            ],
          },
        ],
        ctaText:
          "Finomik ofereix itineraris estructurats per nivells i edats perquè el teu alumnat arribi als 18 anys amb les eines financeres que necessita. Comença amb un grup pilot.",
      },
    },
    references: [
      {
        citation:
          'OCDE (2023). PISA 2022 Results: Financing the Future. Volume IV. Paris: OECD Publishing.',
        url: 'https://www.oecd.org/pisa/',
      },
      {
        citation: 'Banco de España (2022). Encuesta de Competencias Financieras (ECF) 2021.',
      },
      {
        citation:
          'Lusardi, A. & Mitchell, O.S. (2022). Financial literacy does not stick: Evidence from a randomized experiment. Journal of Economic Behavior & Organization.',
      },
    ],
  },

  {
    slug: 'adultos-sin-colchon-emergencia-ahorro',
    seo: {
      es: {
        title: 'El 50% de adultos no tiene colchón de emergencia | Finomik',
        description:
          'La mitad de los adultos en España no puede cubrir un imprevisto de 3 meses sin endeudarse. Por qué el ahorro de emergencia es la primera competencia financiera y cómo enseñarla.',
      },
      en: {
        title: '50% of Adults Have No Emergency Savings | Finomik',
        description:
          'Half of adults in Spain cannot cover three months of unexpected expenses without going into debt. Why emergency savings is the first financial competency and how to teach it.',
      },
      ca: {
        title: "El 50% d'adults no té coixí d'emergència | Finomik",
        description:
          "La meitat dels adults a Espanya no pot cobrir un imprevist de 3 mesos sense endeutar-se. Per què l'estalvi d'emergència és la primera competència financera i com ensenyar-la.",
      },
      keywords: [
        'colchón de emergencia ahorro',
        'fondo emergencia España',
        'educación financiera ahorro',
        'imprevistos financieros adultos',
      ],
    },
    meta: {
      date: '2026-04-17',
      author: 'Equipo Finomik',
      readTime: '6 min',
      category: 'Educación financiera',
      stat: '50%',
      statLabel: 'de los adultos no puede cubrir un imprevisto económico sin endeudarse',
      source: 'Banco de España / OCDE, 2023',
    },
    content: {
      es: {
        title: 'El 50% de los adultos no puede cubrir un imprevisto económico sin endeudarse',
        intro:
          'La mitad de los adultos en países como España no dispone de ahorro suficiente para cubrir tres meses de gastos esenciales en caso de pérdida de ingresos. Esta cifra, documentada por el Banco de España y la OCDE, describe algo más que una realidad económica: describe el resultado de décadas sin educación financiera sistemática sobre el hábito del ahorro preventivo.',
        sections: [
          {
            heading:
              'Qué es un colchón de emergencia y por qué es la base de cualquier salud financiera',
            paragraphs: [
              'Un colchón de emergencia es una reserva de ahorro líquido equivalente a entre tres y seis meses de gastos esenciales, disponible sin penalización y separada del ahorro a largo plazo. Es el primer nivel de cualquier estructura de salud financiera personal.',
              'Su función no es crecer. Es estar ahí. Permite absorber imprevistos —pérdida de empleo, avería del vehículo, gasto médico no cubierto, reparación del hogar— sin necesidad de recurrir a crédito de consumo o préstamos de alto coste.',
              'Sin este colchón, cualquier imprevisto se convierte en una emergencia financiera que puede desencadenar un ciclo de endeudamiento difícil de romper: se pide un crédito para cubrir el imprevisto, el crédito genera intereses, los intereses reducen el margen para ahorrar, y el ciclo se repite ante el siguiente imprevisto.',
            ],
          },
          {
            heading: 'Por qué la mitad de los adultos españoles no tiene este colchón',
            paragraphs: [
              'La explicación más extendida es que no hay margen económico para ahorrar. Pero la investigación en comportamiento financiero muestra que la relación entre ingresos y tasa de ahorro es más compleja de lo que parece. Personas con ingresos similares tienen tasas de ahorro muy diferentes según sus hábitos y conocimientos financieros.',
              'La razón más documentada es la ausencia del hábito de ahorro automatizado. Cuando el ahorro no es automático (no se aparta antes de gastar), tiende a no producirse. Este es un principio básico de las finanzas del comportamiento que no se enseña en las escuelas y que tiene consecuencias directas en la resiliencia financiera de millones de personas.',
              'A esto se suman sesgos cognitivos bien documentados: la tendencia a priorizar el consumo presente sobre el bienestar futuro (descuento hiperbólico), la dificultad para visualizar escenarios futuros negativos, y la falta de referencias concretas sobre qué cantidad es "suficiente".',
            ],
          },
          {
            heading: 'Qué ocurre cuando no hay colchón: el coste real de los imprevistos',
            paragraphs: [
              'Cuando no existe colchón de emergencia, el imprevisto se financia con deuda. Las opciones más accesibles para quien no tiene ahorro suelen ser las más caras: tarjetas de crédito con TAE del 20-25%, créditos rápidos online con TAE que puede superar el 100%, o aplazamientos de pago con comisiones elevadas.',
              'La CNMV estima que el coste medio de financiar un imprevisto de 2.000 euros con un crédito rápido online durante un año es de entre 400 y 800 euros adicionales en intereses. Ese coste podría haberse evitado completamente con un hábito de ahorro de 170 euros mensuales durante 12 meses.',
              'Para las familias con ingresos medios-bajos, este ciclo puede ser devastador. La fragilidad financiera no es solo estrés: correlaciona con peor rendimiento laboral, peores decisiones de salud y mayor vulnerabilidad ante cualquier cambio económico.',
            ],
          },
          {
            heading: 'Cómo enseñar el hábito del ahorro de emergencia en el aula',
            paragraphs: [
              'El ahorro de emergencia no es solo un concepto: es un hábito. Y los hábitos se forman, no se heredan. La educación financiera en el aula puede trabajar este hábito de forma práctica: simulaciones de presupuesto donde el ahorro se aparta primero, escenarios de imprevistos que requieren decisiones en tiempo real, o cálculos personalizados de cuánto necesitaría "tu colchón".',
              'Los programas de educación financiera más efectivos no se limitan a explicar qué es un colchón de emergencia. Hacen que el alumnado lo calcule, lo planifique y lo incorpore en un presupuesto ficticio, creando la familiaridad cognitiva necesaria para que ese comportamiento sea accesible cuando llegue el momento real.',
              'El impacto de este tipo de intervención temprana está bien documentado: los adultos que recibieron educación financiera formal sobre ahorro preventivo durante su etapa escolar tienen tasas de ahorro significativamente más altas que quienes no la recibieron.',
            ],
          },
        ],
        ctaText:
          'Finomik incluye módulos específicos sobre ahorro, presupuesto y resiliencia financiera, diseñados para crear hábitos desde la adolescencia. Empieza con un piloto en tu centro.',
      },
      en: {
        title: '50% of adults cannot cover an unexpected expense without going into debt',
        intro:
          'Half of adults in countries like Spain do not have enough savings to cover three months of essential expenses in the event of an income loss. This figure, documented by the Banco de España and the OECD, describes something beyond an economic reality: it describes the result of decades without systematic financial education on the habit of precautionary saving.',
        sections: [
          {
            heading: 'What an emergency fund is and why it is the foundation of any financial health',
            paragraphs: [
              'An emergency fund is a liquid savings reserve equivalent to between three and six months of essential expenses, accessible without penalty and kept separate from long-term savings. It is the first tier of any personal financial health structure.',
              'Its purpose is not to grow. It is to be there. It allows you to absorb unexpected events — job loss, vehicle breakdown, uncovered medical expenses, home repairs — without having to resort to consumer credit or high-cost loans.',
              'Without this buffer, any unexpected expense becomes a financial emergency that can set off a cycle of debt that is hard to break: credit is taken out to cover the expense, the credit generates interest, the interest reduces the margin for saving, and the cycle repeats at the next unexpected event.',
            ],
          },
          {
            heading: 'Why half of Spanish adults do not have this buffer',
            paragraphs: [
              'The most common explanation is that there is no financial margin to save. But research in financial behaviour shows that the relationship between income and savings rate is more complex than it appears. People with similar incomes have very different savings rates depending on their habits and financial knowledge.',
              'The most well-documented reason is the absence of automated saving habits. When saving is not automatic (when money is not set aside before spending), it tends not to happen. This is a basic principle of behavioural finance that is not taught in schools, and it has direct consequences for the financial resilience of millions of people.',
              'Add to this well-documented cognitive biases: the tendency to prioritise present consumption over future wellbeing (hyperbolic discounting), the difficulty of visualising negative future scenarios, and the lack of concrete references for what amount is "enough".',
            ],
          },
          {
            heading: 'What happens when there is no buffer: the real cost of unexpected expenses',
            paragraphs: [
              'When there is no emergency fund, unexpected expenses are financed with debt. The most accessible options for those without savings are usually the most expensive: credit cards with APRs of 20-25%, online quick loans with APRs that can exceed 100%, or deferred payment plans with high fees.',
              'The CNMV estimates that the average cost of financing a 2,000-euro unexpected expense with an online quick loan over one year is between 400 and 800 euros in additional interest. That cost could have been entirely avoided with a saving habit of 170 euros per month over 12 months.',
              'For lower-to-middle-income families, this cycle can be devastating. Financial fragility is not just stress: it correlates with lower work performance, worse health decisions and greater vulnerability to any economic change.',
            ],
          },
          {
            heading: 'How to teach the emergency saving habit in the classroom',
            paragraphs: [
              'Emergency saving is not just a concept: it is a habit. And habits are formed, not inherited. Financial education in the classroom can work on this habit in a practical way: budget simulations where saving comes first, unexpected-event scenarios that require real-time decisions, or personalised calculations of how much "your buffer" would need to be.',
              'The most effective financial education programmes do not just explain what an emergency fund is. They have students calculate it, plan for it and incorporate it into a mock budget, creating the cognitive familiarity needed for that behaviour to be accessible when the real moment arrives.',
              'The impact of this type of early intervention is well documented: adults who received formal financial education on precautionary saving during their school years have significantly higher savings rates than those who did not.',
            ],
          },
        ],
        ctaText:
          'Finomik includes specific modules on saving, budgeting and financial resilience, designed to build habits from adolescence. Start with a pilot at your school.',
      },
      ca: {
        title:
          "El 50% dels adults no pot cobrir un imprevist econòmic sense endeutar-se",
        intro:
          "La meitat dels adults en països com Espanya no disposa d'estalvi suficient per cobrir tres mesos de despeses essencials en cas de pèrdua d'ingressos. Aquesta xifra, documentada pel Banco de España i l'OCDE, descriu quelcom més que una realitat econòmica: descriu el resultat de dècades sense educació financera sistemàtica sobre l'hàbit de l'estalvi preventiu.",
        sections: [
          {
            heading:
              "Què és un coixí d'emergència i per què és la base de qualsevol salut financera",
            paragraphs: [
              "Un coixí d'emergència és una reserva d'estalvi líquid equivalent a entre tres i sis mesos de despeses essencials, disponible sense penalització i separada de l'estalvi a llarg termini. És el primer nivell de qualsevol estructura de salut financera personal.",
              "La seva funció no és créixer. És ser-hi. Permet absorbir imprevistos: pèrdua de feina, avaria del vehicle, despesa mèdica no coberta, reparació de la llar, sense necessitat de recórrer al crèdit de consum o préstecs d'alt cost.",
              "Sense aquest coixí, qualsevol imprevist es converteix en una emergència financera que pot desencadenar un cicle d'endeutament difícil de trencar: es demana un crèdit per cobrir l'imprevist, el crèdit genera interessos, els interessos redueixen el marge per estalviar, i el cicle es repeteix davant del proper imprevist.",
            ],
          },
          {
            heading: "Per què la meitat dels adults espanyols no té aquest coixí",
            paragraphs: [
              "L'explicació més estesa és que no hi ha marge econòmic per estalviar. Però la recerca en comportament financer mostra que la relació entre ingressos i taxa d'estalvi és més complexa del que sembla. Persones amb ingressos similars tenen taxes d'estalvi molt diferents segons els seus hàbits i coneixements financers.",
              "La raó més documentada és l'absència de l'hàbit d'estalvi automatitzat. Quan l'estalvi no és automàtic (quan no s'aparta abans de gastar), tendeix a no produir-se. Aquest és un principi bàsic de les finances del comportament que no s'ensenya a les escoles i que té conseqüències directes en la resiliència financera de milions de persones.",
              "A això se sumen biaixos cognitius ben documentats: la tendència a prioritzar el consum present sobre el benestar futur (descompte hiperbòlic), la dificultat per visualitzar escenaris futurs negatius, i la manca de referències concretes sobre quina quantitat és 'suficient'.",
            ],
          },
          {
            heading: "Què passa quan no hi ha coixí: el cost real dels imprevistos",
            paragraphs: [
              "Quan no existeix coixí d'emergència, l'imprevist es finança amb deute. Les opcions més accessibles per a qui no té estalvi solen ser les més cares: targetes de crèdit amb TAE del 20-25%, crèdits ràpids online amb TAE que pot superar el 100%, o ajornaments de pagament amb comissions elevades.",
              "La CNMV estima que el cost mitjà de finançar un imprevist de 2.000 euros amb un crèdit ràpid online durant un any és d'entre 400 i 800 euros addicionals en interessos. Aquest cost podria haver-se evitat completament amb un hàbit d'estalvi de 170 euros mensuals durant 12 mesos.",
              "Per a les famílies amb ingressos mitjans-baixos, aquest cicle pot ser devastador. La fragilitat financera no és només estrès: correlaciona amb un pitjor rendiment laboral, pitjors decisions de salut i major vulnerabilitat davant qualsevol canvi econòmic.",
            ],
          },
          {
            heading: "Com ensenyar l'hàbit de l'estalvi d'emergència a l'aula",
            paragraphs: [
              "L'estalvi d'emergència no és només un concepte: és un hàbit. I els hàbits es formen, no s'hereten. L'educació financera a l'aula pot treballar aquest hàbit de forma pràctica: simulacions de pressupost on l'estalvi s'aparta primer, escenaris d'imprevistos que requereixen decisions en temps real, o càlculs personalitzats de quant necessitaria 'el teu coixí'.",
              "Els programes d'educació financera més efectius no es limiten a explicar què és un coixí d'emergència. Fan que l'alumnat el calculi, el planifiqui i l'incorpori en un pressupost fictici, creant la familiaritat cognitiva necessària perquè aquest comportament sigui accessible quan arribi el moment real.",
              "L'impacte d'aquest tipus d'intervenció primerenca està ben documentat: els adults que van rebre educació financera formal sobre estalvi preventiu durant l'etapa escolar tenen taxes d'estalvi significativament més altes que els qui no la van rebre.",
            ],
          },
        ],
        ctaText:
          "Finomik inclou mòduls específics sobre estalvi, pressupost i resiliència financera, dissenyats per crear hàbits des de l'adolescència. Comença amb un pilot al teu centre.",
      },
    },
    references: [
      { citation: 'Banco de España (2022). Encuesta Financiera de las Familias 2020. Resultados principales.' },
      { citation: 'OCDE (2023). Financial Resilience and Well-being: Evidence from PISA 2022.' },
      {
        citation:
          'Thaler, R.H. & Benartzi, S. (2004). Save More Tomorrow: Using Behavioral Economics to Increase Employee Saving. Journal of Political Economy, 112(S1).',
      },
      { citation: 'CNMV / Banco de España (2022). Encuesta de Competencias Financieras.' },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
