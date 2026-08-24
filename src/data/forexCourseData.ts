export interface ForexQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ForexModule {
  id: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  readTime: string;
  iconName: string;
  overview: string;
  keyTakeaways: string[];
  contentSections: {
    heading: string;
    subheading?: string;
    paragraphs: string[];
    bulletPoints?: string[];
    diagramType?: 'pinbar' | 'engulfing' | 'structure' | 'breakretest' | 'doji';
    proTip?: string;
  }[];
  quiz: ForexQuiz[];
}

export const FOREX_MODULES: ForexModule[] = [
  {
    id: 'module-1',
    moduleNumber: 1,
    title: 'Misingi ya Soko la Forex & Mfumo wa Fedha Duniani',
    subtitle: 'Kuelewa jinsi soko la trillioni $7.5 linavyofanya kazi na misingi ya kuanza',
    readTime: 'Dakika 12',
    iconName: 'Globe',
    overview: 'Forex (Foreign Exchange) ni soko kubwa zaidi la kifedha duniani ambapo zaidi ya dola trillioni 7.5 hubadilishwa kila siku. Katika somo hili utajifunza msingi halisi wa ubadilishanaji fedha, pairs, pips, leverage, na vipindi vya biashara vya kimataifa.',
    keyTakeaways: [
      'Forex ni biashara ya kubadilisha sarafu moja kwa nyingine kwa faida.',
      'Kila sarafu huuzwa kwa jozi (Currency Pairs kama EUR/USD, GBP/USD).',
      'Pip (Percentage in Point) ndicho kipimo cha msingi cha mabadiliko ya bei.',
      'Leverage ni mkopo wa mtaji kutoka kwa broker unaokuwezesha kufanya biashara kubwa kwa mtaji mdogo, lakini inabeba hatari kubwa ikiwa haitasimamiwa.',
      'Vipindi 4 vikuu: London, New York, Tokyo, na Sydney. London na New York ndivyo vyenye mwendo (volatility) mkubwa zaidi.'
    ],
    contentSections: [
      {
        heading: '1. Forex ni Nini na Inafanyaje Kazi?',
        paragraphs: [
          'Forex (Foreign Exchange) ni soko la kimataifa lisilo na kituo kimoja (Over-The-Counter au OTC) ambapo mabenki makuu, taasisi za kifedha, mashirika makubwa ya biashara, na wafanyabiashara binafsi hubadilisha sarafu za mataifa mbalimbali.',
          'Tofauti na soko la hisa, Forex hufanya kazi saa 24 kwa siku, siku 5 kwa wiki kuanzia Jumapili usiku (Saa za Afrika Mashariki) hadi Ijumaa usiku.',
          'Sarafu zote kwenye Forex huandikwa kwa jozi (Currency Pairs). Mfano: EUR/USD. Sarafu ya kwanza (EUR) inaitwa "Base Currency" na sarafu ya pili (USD) inaitwa "Quote Currency". Bei inayoonekana (mfano 1.0850) inamaanisha unahitaji dola $1.0850 kununua Euro 1.'
        ],
        bulletPoints: [
          'Major Pairs: Jozi zote zenye Dola ya Marekani (USD) kama EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, USD/CAD.',
          'Minor / Cross Pairs: Jozi za sarafu kuu zisizo na USD kama EUR/GBP, GBP/JPY, EUR/AUD.',
          'Exotic Pairs: Jozi zinazochanganya sarafu kuu na sarafu ya taifa linaloinukia kiuchumi (kama USD/ZAR, USD/TRY).'
        ],
        proTip: 'Wafanyabiashara wanaoanza wanashauriwa sana kuanza na EUR/USD na GBP/USD kwa sababu zina viwango vidogo vya ada (tight spread) na kufuata mienendo safi ya kiufundi.'
      },
      {
        heading: '2. Pips, Points, Spread na Lot Sizes',
        paragraphs: [
          'Ili kujua faida au hasara yako, lazima uelewe jinsi bei inavyopimwa sokoni.',
          'PIP (Percentage in Point): Kwa sarafu nyingi, pip ni namba ya 4 baada ya nukta (0.0001). Mfano, EUR/USD ikisogea kutoka 1.0820 hadi 1.0825, imepanda kwa Pips 5. Kwa jozi zenye Yen ya Kijapani (JPY), pip ni namba ya 2 baada ya nukta (0.01).',
          'SPREAD: Ni tofauti kati ya bei ya kununua (Ask) na bei ya kuuza (Bid). Huu ndio mshahara au ada ya Broker wako.',
          'LOT SIZE: Ni kiasi cha sarafu unachonunua au kuuza sokoni.'
        ],
        bulletPoints: [
          'Standard Lot (1.00): Thamani ya $100,000. Pip 1 = Takriban $10.00 faida au hasara.',
          'Mini Lot (0.10): Thamani ya $10,000. Pip 1 = Takriban $1.00 faida au hasara.',
          'Micro Lot (0.01): Thamani ya $1,000. Pip 1 = Takriban $0.10 (Senti 10) faida au hasara.'
        ],
        proTip: 'Ikiwa una mtaji mdogo (chini ya $500), tumia lot size za 0.01 au 0.02 pekee ili kulinda akaunti yako isiteketezwe na mihemko ya soko.'
      },
      {
        heading: '3. Vipindi vya Biashara Duniani (Trading Sessions)',
        paragraphs: [
          'Soko la Forex limegawanywa katika vipindi 4 vikuu vya kijiografia duniani:',
          '1. London Session (Saa 10:00 Asubuhi - 06:00 Jioni EAT): Huu ndio moyo wa soko la Forex duniani, unachangia zaidi ya 35% ya miamala yote.',
          '2. New York Session (Saa 03:00 Usiku - 11:00 Usiku EAT): Hiki ni kipindi cha pili kwa ukubwa. Saa 03:00 hadi 06:00 Jioni (London & NY Overlap) ndio muda wenye fursa na spidi kubwa zaidi ya biashara.',
          '3. Tokyo (Asian) Session (Saa 02:00 Usiku - 10:00 Asubuhi EAT): Kipindi tulivu, kizuri kwa jozi za JPY na AUD.',
          '4. Sydney Session (Saa 12:00 Asubuhi - 08:00 Mchana EAT).'
        ]
      }
    ],
    quiz: [
      {
        question: 'Kwenye jozi ya EUR/USD, bei ikitoka 1.1000 hadi 1.1030, soko limesogea kwa kiasi gani?',
        options: ['Pips 3', 'Pips 30', 'Pips 300', 'Cent 30'],
        correctAnswer: 1,
        explanation: 'Kwenye sarafu nyingi, tarakimu ya nne baada ya nukta ni pip. 1.1030 kutoa 1.1000 ni mabadiliko ya pips 30.'
      },
      {
        question: 'Ukitumia Lot Size ya Micro (0.01) kwenye EUR/USD, thamani ya Pip 1 ni takriban kiasi gani?',
        options: ['$10.00', '$1.00', '$0.10 (Senti 10)', '$100.00'],
        correctAnswer: 2,
        explanation: 'Lot size ya 0.01 (Micro lot) inatoa thamani ya takriban $0.10 kwa kila pip moja ya mabadiliko ya bei.'
      },
      {
        question: 'Muda gani unachukuliwa kuwa na fursa kubwa zaidi na mzunguko mkubwa wa fedha sokoni?',
        options: ['Sydney Pekee', 'Tokyo Pekee', 'London & New York Overlap (Saa 03:00 - 06:00 Jioni EAT)', 'Ijumaa Usiku wa manane'],
        correctAnswer: 2,
        explanation: 'Wakati soko la London na New York yote mawili yakiwa wazi (Overlap), mzunguko wa fedha na spidi ya soko huwa katika kilele cha juu zaidi.'
      }
    ]
  },
  {
    id: 'module-2',
    moduleNumber: 2,
    title: 'Candlestick Trading Bible: Lugha ya Mishumaa ya Kijapani',
    subtitle: 'Siri ya kusoma saikolojia ya wanunuzi (Bulls) na wauzaji (Bears) kupitia mishumaa',
    readTime: 'Dakika 16',
    iconName: 'Flame',
    overview: 'Kitabu cha Candlestick Trading Bible kilichoandikwa na Munehisa Homma (mfanyabiashara wa mchele wa Japani katika karne ya 17) na kuendelezwa na Steve Nison ndio msingi mkuu wa Price Action. Mshumaa si picha tu bali ni hadithi kamili ya vita kati ya wanunuzi na wauzaji.',
    keyTakeaways: [
      'Kila mshumaa una maeneo 4 makuu: Open, High, Low, na Close (OHLC).',
      'Urefu wa mwili (Real Body) unaonyesha nguvu na kasi ya upande unaotawala.',
      'Mikia/Wicks (Shadows) inaonyesha kukataliwa kwa bei (Price Rejection) na maeneo ya ukwasi.',
      'Pin Bar na Engulfing Bar ndio mifumo miwili yenye asilimia kubwa zaidi ya ushindi ikitokea kwenye maeneo muhimu.'
    ],
    contentSections: [
      {
        heading: '1. Anatomia ya Mshumaa wa Kijapani (Candlestick Anatomy)',
        paragraphs: [
          'Mshumaa wa Kijapani una sehemu kuu mbili: Mwili (Body) na Mikia (Upper & Lower Shadows/Wicks).',
          'Mshumaa wa Kijani (Bullish Candle): Unaonyesha wanunuzi walishinda. Bei ilifunguka chini (Open) na kufungia juu (Close).',
          'Mshumaa Mwekundu (Bearish Candle): Unaonyesha wauzaji walishinda. Bei ilifunguka juu (Open) na kufungia chini (Close).',
          'Wick ya Juu (Upper Shadow) inaonyesha bei ya juu kabisa (High) iliyofikiwa kabla ya wauzaji kuisukuma chini. Wick ya Chini (Lower Shadow) inaonyesha bei ya chini kabisa (Low) kabla wanunuzi hawajarudisha bei juu.'
        ]
      },
      {
        heading: '2. Bullish & Bearish Pin Bar (Mshumaa wa Kukataa Bei)',
        paragraphs: [
          'Pin Bar (Hammer au Shooting Star) ni mojawapo ya silaha zenye nguvu zaidi katika Candlestick Bible.',
          'Sifa za Pin Bar Halisi:',
          '1. Ina mkia mrefu sana upande mmoja (angalau mara 2 au 3 ya ukubwa wa mwili).',
          '2. Ina mwili mdogo sana uliopo upande wa mwisho wa mshumaa.',
          '3. Ina mkia mdogo sana au haina mkia kabisa upande wa pili.',
          'BULLISH PIN BAR (Hammer): Hutokea chini ya downtrend kwenye eneo la Support. Mkia mrefu wa chini unathibitisha kuwa wauzaji walijaribu kushusha soko lakini wanunuzi wenye nguvu (Big Banks) walikataa bei hiyo na kuisukuma juu kwa nguvu.',
          'BEARISH PIN BAR (Shooting Star): Hutokea juu ya uptrend kwenye eneo la Resistance. Mkia mrefu wa juu unaonyesha wanunuzi walishindwa kudhibiti soko na wauzaji wameingia kwa kasi.'
        ],
        diagramType: 'pinbar',
        proTip: 'Usiwahi kuingia sokoni kwa kuona Pin Bar popote pale katikati ya chati! Ingia pale tu Pin Bar inapogusa eneo kuu la Support, Resistance, au Trendline.'
      },
      {
        heading: '3. Engulfing Bar Pattern (Mshumaa wa Kumeza)',
        paragraphs: [
          'Engulfing Bar ni muundo wa mishumaa miwili unaoonyesha mabadiliko ya ghafla ya utawala wa soko.',
          'BULLISH ENGULFING: Mshumaa mdogo mwekundu unafuatiwa na mshumaa mkubwa wa kijani unaoufunika (kumeza) mwili mzima wa mshumaa uliopita. Hii ni ishara thabiti ya kununua (Buy).',
          'BEARISH ENGULFING: Mshumaa mdogo wa kijani unafuatiwa na mshumaa mkubwa mwekundu unaofunika mwili mzima wa mshumaa uliopita. Hii ni ishara thabiti ya kuuza (Sell).'
        ],
        diagramType: 'engulfing'
      },
      {
        heading: '4. Doji, Morning Star na Evening Star',
        paragraphs: [
          'DOJI: Ni mshumaa ambao bei ya kufungua (Open) na kufunga (Close) zinalingana au ziko karibu mno. Inaonyesha kutokuwa na uamuzi (Indecision) kati ya wanunuzi na wauzaji.',
          'Dragonfly Doji (Mkia mrefu chini): Ishara ya wanunuzi kujiandaa kupandisha bei.',
          'Gravestone Doji (Mkia mrefu juu): Ishara ya wauzaji kujiandaa kushusha bei.',
          'MORNING STAR: Muundo wa mishumaa 3 (Mwekundu mkubwa ➔ Doji ndogo chini ➔ Kijani mkubwa). Huashiria mwisho wa soko kushuka na mwanzo wa kupanda.',
          'EVENING STAR: Muundo wa mishumaa 3 (Kijani mkubwa ➔ Doji ndogo juu ➔ Mwekundu mkubwa). Huashiria mwisho wa kupanda na mwanzo wa kushuka.'
        ],
        diagramType: 'doji'
      }
    ],
    quiz: [
      {
        question: 'Sifa kuu ya mshumaa wa Pin Bar halisi ni ipi?',
        options: [
          'Mwili mkubwa na mikia mifupi sana',
          'Mkia mrefu upande mmoja (angalau mara 2-3 ya mwili) unaoonyesha kukataliwa kwa bei',
          'Rangi yake lazima iwe ya bluu pekee',
          'Hauwezi kutokea kwenye timeframe ya masaa 4'
        ],
        correctAnswer: 1,
        explanation: 'Pin bar inatambulika kwa mkia mrefu unaoonyesha soko lilijaribu kwenda upande huo lakini likakataliwa kwa nguvu na upande wa pili.'
      },
      {
        question: 'Mshumaa wa Bullish Engulfing unamaanisha nini?',
        options: [
          'Wauzaji wameongezeka nguvu',
          'Soko halina muelekeo wowote',
          'Wanunuzi wameingia kwa nguvu na mshumaa wa kijani umeufunika kabisa mwili wa mshumaa uliopita mwekundu',
          'Soko linafungwa kwa siku hiyo'
        ],
        correctAnswer: 2,
        explanation: 'Bullish Engulfing hutokea pale mshumaa wa kijani unapoonyesha nguvu kubwa na kumeza mwili mzima wa mshumaa uliotangulia wa wauzaji.'
      }
    ]
  },
  {
    id: 'module-3',
    moduleNumber: 3,
    title: 'Muundo wa Soko (Market Structure) & Smart Money Concepts (SMC)',
    subtitle: 'Jinsi ya kusoma mapigo ya soko, Support & Resistance, na mtego wa ukwasi wa taasisi',
    readTime: 'Dakika 15',
    iconName: 'TrendingUp',
    overview: 'Kabla ya kufanya biashara yoyote, lazima ujue kama soko lipo kwenye Mwelekeo wa Kupanda (Uptrend), Kushuka (Downtrend), au Linasitasita (Ranging/Consolidation). Hapa utajifunza Break of Structure (BOS), Change of Character (CHoCH), na Order Blocks.',
    keyTakeaways: [
      'Uptrend inatengenezwa na Higher Highs (HH) na Higher Lows (HL).',
      'Downtrend inatengenezwa na Lower Highs (LH) na Lower Lows (LL).',
      'Support ni eneo la sakafu ambapo wanunuzi huingia; Resistance ni eneo la dari ambapo wauzaji huingia.',
      'Smart Money Concepts (SMC) inakufundisha jinsi benki kubwa zinavyosafisha Stop Loss za wafanyabiashara wadogo (Liquidity Sweep) kabla ya soko kwenda uelekeo halisi.'
    ],
    contentSections: [
      {
        heading: '1. Kanuni za Mwelekeo wa Soko (Trend Analysis)',
        paragraphs: [
          'Soko halisogei kwenye mstari ulionyooka; linasogea kwa mtindo wa mawimbi (Impulse Wave na Retracement Wave).',
          'UPTREND: Soko linatengeneza vilele vya juu zaidi (Higher Highs - HH) na mabonde ya juu zaidi (Higher Lows - HL). Kwenye uptrend, sheria kuu ni KUNUNUA PEKEE (Buy the Dips).',
          'DOWNTREND: Soko linatengeneza vilele vya chini zaidi (Lower Highs - LH) na mabonde ya chini zaidi (Lower Lows - LL). Kwenye downtrend, sheria kuu ni KUUZA PEKEE (Sell the Rallies).',
          'RANGING MARKET: Soko linapiga danadana kati ya Support na Resistance bila kutengeneza muelekeo mpya.'
        ],
        diagramType: 'structure'
      },
      {
        heading: '2. Support, Resistance & Kanuni ya Role Reversal',
        paragraphs: [
          'SUPPORT: Eneo la kisaikolojia ambapo bei inapofika, shinikizo la wanunuzi huzidi wauzaji, hivyo soko linageuka na kupanda juu.',
          'RESISTANCE: Eneo la kisaikolojia ambapo bei inapofika, shinikizo la wauzaji huzidi wanunuzi, hivyo soko linageuka na kushuka chini.',
          'KANUNI YA ROLE REVERSAL: Resistance ikivunjwa kwa mshumaa wenye nguvu, inapogeuka na kurudi chini (Retest), eneo hilo hubadilika na kuwa SUPPORT mpya. Vivyo hivyo, Support ikivunjwa hugeuka kuwa RESISTANCE mpya.'
        ],
        diagramType: 'breakretest'
      },
      {
        heading: '3. Smart Money Concepts: Liquidity Sweeps & Order Blocks',
        paragraphs: [
          'Benki Kuu na taasisi za kifedha (Smart Money) zinahitaji mamilioni ya dola ili kuingia sokoni. Hawezi kubofya "Buy" bila kuwepo na watu wanaouza (Liquidity).',
          'LIQUIDITY HUNT (Stop Hunt): Mara nyingi soko huvunja Support au Resistance kwa mshumaa wa haraka (wenye wick ndefu) ili kuchochea Stop Loss za wafanyabiashara wadogo kabla ya kugeuza uelekeo ghafla.',
          'ORDER BLOCK (OB): Ni mshumaa wa mwisho wa kushuka kabla ya mwendo mkubwa wa kupanda unaovunja muundo wa soko (BOS). Taasisi huacha maagizo yao hapa, na soko linaporudi eneo hili hutoa nafasi nzuri sana ya kuingia sokoni.'
        ],
        proTip: 'Kamwe usiweke Stop Loss yako sawasawa kabisa kwenye mstari wa Support au Resistance. Weka nafasi ya ziada ya pips 10-15 ili kuepuka kusafishwa na Liquidity Hunt ya mabenki.'
      }
    ],
    quiz: [
      {
        question: 'Kwenye Downtrend halisi, chati hutengeneza nini?',
        options: [
          'Higher Highs na Higher Lows',
          'Lower Highs (LH) na Lower Lows (LL)',
          'Mistari iliyonyooka bila mawimbi',
          'Mishumaa ya kijani pekee'
        ],
        correctAnswer: 1,
        explanation: 'Downtrend inafafanuliwa kikanuni kwa mfululizo wa vilele vya chini (Lower Highs) na mabonde ya chini (Lower Lows).'
      },
      {
        question: 'Eneo la Resistance likivunjwa kwa nguvu kuelekea juu, soko likirudi hapo eneo hilo hubadilika kuwa nini?',
        options: ['Support mpya', 'Downtrend mpya', 'Eneo la kutupilia mbali', 'Soko kufungwa'],
        correctAnswer: 0,
        explanation: 'Hii ndio kanuni kuu ya Role Reversal: Eneo la Dari (Resistance) lililovunjwa hubadilika kuwa Sakafu (Support) mpya.'
      }
    ]
  },
  {
    id: 'module-4',
    moduleNumber: 4,
    title: 'Mikakati ya Kibiashara ya Hali ya Juu (Price Action Strategies)',
    subtitle: 'Mkakati wa Break & Retest, Pin Bar kwenye Dynamic Support, na Multi-Timeframe Analysis',
    readTime: 'Dakika 14',
    iconName: 'Crosshair',
    overview: 'Katika somo hili utaweka vipande vyote pamoja ili kuwa na mfumo kamili wa kuingia na kutoka sokoni (High-Probability Trading Setup) wenye maelekezo yasiyo na utata.',
    keyTakeaways: [
      'Mkakati wa Break & Retest ndio mkakati thabiti zaidi wa kufuata mwelekeo wa soko.',
      'Uchambuzi wa Timeframe 3: Daily (Muelekeo Mkuu) ➔ H4/H1 (Muundo wa Eneo) ➔ M15 (Mshumaa wa Kuingia).',
      'Fibonacci Retracement hutumika kupima mwisho wa wimbi la mapumziko kwenye 50% na 61.8% (Golden Zone).',
      'Kuunganisha viashiria vya Dynamic kama 50 EMA na 200 EMA huongeza nguvu ya ishara za mishumaa.'
    ],
    contentSections: [
      {
        heading: '1. Mkakati Kamili wa Break and Retest',
        paragraphs: [
          'Hatua ya 1: Tambua eneo kuu la Support au Resistance kwenye chati ya Masaa 4 (H4) au Daily.',
          'Hatua ya 2: Subiri mshumaa ufunge waziwazi NJE ya eneo hilo (Clean Breakout). Kamwe usinunue au kuuza mshumaa ukiwa bado unajijenga katikati.',
          'Hatua ya 3: Subiri bei irudi kwa utulivu (Retest) kwenye eneo hilo hilo lililovunjwa.',
          'Hatua ya 4: Angalia mshumaa wa uthibitisho kama Pin Bar au Engulfing kwenye eneo hilo kwenye H1 au M15.',
          'Hatua ya 5: Ingia sokoni, weka Stop Loss pips 5-10 nyuma ya Pin Bar, na weka Take Profit kwenye kilele kilichopita.'
        ],
        diagramType: 'breakretest',
        proTip: 'Subira ndio mtaji mkubwa wa mkakati huu. Asilimia 70 ya wanaoanza hufanya kosa la kuingia wakati wa Breakout ya kwanza (FOMO) na kujikuta wameingia kwenye Fakeout.'
      },
      {
        heading: '2. Multi-Timeframe Analysis (Mchanganuo wa Timeframe Nyingi)',
        paragraphs: [
          'Huwezi kufanya uamuzi sahihi kwa kutazama chati ya dakika 5 (M5) pekee.',
          '1. DAILY / WEEKLY TIMEFRAME: Inakupa mtazamo wa ndege (The Big Picture). Inakuambia nani anatawala mwaka au mwezi huu (Bulls au Bears).',
          '2. 4-HOUR / 1-HOUR TIMEFRAME: Inakupa maeneo ya mikakati (Key Zones) ya Support, Resistance, na Order Blocks.',
          '3. 15-MINUTE TIMEFRAME: Inatumika kama darubini (Sniping Trigger) ya kupata sehemu nzuri zaidi ya kuingilia yenye Stop Loss ndogo sana.'
        ]
      },
      {
        heading: '3. Fibonacci Retracement & Eneo la Dhahabu (61.8%)',
        paragraphs: [
          'Chora Fibonacci kuanzia mwanzo wa wimbi (Swing Low) hadi mwisho wa kilele (Swing High) kwenye Uptrend.',
          'Viwango muhimu zaidi ni 50.0% na 61.8% (Golden Pocket). Bei inapofika kwenye 61.8% sambamba na eneo la Support iliyopita, hiyo ni mojawapo ya nafasi zenye ubora wa juu kabisa (A+ Setup).'
        ]
      }
    ],
    quiz: [
      {
        question: 'Kwenye mkakati wa Break & Retest, ni wakati gani sahihi wa kufungua biashara (Entry)?',
        options: [
          'Mshumaa wa kwanza ukianza tu kuvunja bila kusubiri ufunge',
          'Wakati soko linaporudi kufanya Retest kwenye eneo lililovunjwa na kutoa mshumaa wa uthibitisho (Confirmation Candle)',
          'Saa 6 usiku soko likiwa limefungwa',
          'Kila dakika 1 bila mpangilio'
        ],
        correctAnswer: 1,
        explanation: 'Kuingia kwenye Retest baada ya uthibitisho wa mshumaa kunakukinga na mitego ya Fakeouts na kukupa Stop Loss ndogo sana.'
      }
    ]
  },
  {
    id: 'module-5',
    moduleNumber: 5,
    title: 'Usimamizi wa Mtaji & Hatari (Risk & Money Management)',
    subtitle: 'Fomula ya siri inayotenganisha 95% wanaopoteza pesa na 5% wanaotengeneza utajiri',
    readTime: 'Dakika 13',
    iconName: 'ShieldCheck',
    overview: 'Unaweza kuwa na mkakati unaoshinda kwa 80%, lakini bila usimamizi wa mtaji (Risk Management), biashara 2 tu mbaya zinaweza kufuta akaunti yako yote. Katika somo hili utajifunza kanuni ya 1-2% Risk, Risk-to-Reward Ratio (RRR), na jinsi ya kukokotoa Lot Size halisi.',
    keyTakeaways: [
      'Kamwe usihatarishe zaidi ya 1% hadi 2% ya akaunti yako kwenye biashara moja.',
      'Tumia uwiano wa faida na hasara usiopungua 1:2 au 1:3 (Risk-to-Reward Ratio).',
      'Kama unahatarisha $20, lengo lako la faida lazima liwe angalau $40 hadi $60.',
      'Stop Loss si hiari; ni mkanda wa usalama wa gari unaookoa maisha yako ya kibiashara.'
    ],
    contentSections: [
      {
        heading: '1. Kanuni ya Dhahabu ya 1% hadi 2% Risk',
        paragraphs: [
          'Ikiwa una akaunti ya $1,000, 1% ya mtaji wako ni $10. Hii inamaanisha ikiwa biashara yako itagusa Stop Loss, utapoteza $10 pekee.',
          'Hata kama ungepata hasara mara 10 mfululizo (hali ambayo ni nadra sana ukiwa na nidhamu), bado utabakiwa na zaidi ya $900 ya kupambana nayo.',
          'Tofauti na mfanyabiashara anayehatarisha 20% au 50% kwenye biashara moja, hasara 2 tu zinamtoa kabisa kwenye mchezo (Account Blowout).'
        ]
      },
      {
        heading: '2. Hesabu ya Kukokotoa Lot Size Kulingana na Stop Loss',
        paragraphs: [
          'Fomula Rasmi:',
          'Kiasi cha Pesa Unachorisk ($) = Stop Loss (katika Pips) × Thamani ya Pip × Lot Size',
          'Mfano Halisi:',
          'Mtaji wako: $500',
          'Risk unayotaka (2%): $10',
          'Stop Loss ya mkakati wako kwenye chati: Pips 25',
          'Hesabu: $10 ÷ (Pips 25 × $10) = 0.04 Lot Size.',
          'Kwa hiyo, utaweka Lot size ya 0.04 kwenye MT4/MT5 yako. Ikiwa soko litaenda kinyume, utapoteza $10 yako uliyopanga bila hofu.'
        ],
        proTip: 'Tumia Kikokotoo chetu cha Forex kilichopo chini kwenye moduli hii ili kupata majibu haya papo hapo bila kuumiza kichwa na hesabu za mkono.'
      },
      {
        heading: '3. Nguvu ya Risk-to-Reward Ratio (RRR 1:2 & 1:3)',
        paragraphs: [
          'Fikiria unafanya biashara 10 ukiwa na RRR ya 1:3 (Unarisk $10 ili kupata $30):',
          'Hata ukishinda biashara 4 tu kati ya 10 (Win rate ya 40% pekee!):',
          'Faida: Biashara 4 × $30 = +$120',
          'Hasara: Biashara 6 × $10 = -$60',
          'Matokeo ya Jumla: +$60 FAIDA SAFI!',
          'Hii ndio sababu wafanyabiashara wa kitaalamu hawajali kupoteza biashara moja moja, kwa sababu mfumo wao wa hesabu unawalinda daima.'
        ]
      }
    ],
    quiz: [
      {
        question: 'Ikiwa una akaunti ya $1,000 na unafuata kanuni ya 2% risk, kiasi cha juu kabisa unachopaswa kupoteza kwenye biashara moja ni kiasi gani?',
        options: ['$200', '$20', '$50', '$2.00'],
        correctAnswer: 1,
        explanation: '2% ya $1,000 ni $20. Hicho ndicho kiasi cha juu kabisa kinachoruhusiwa kupotea kwenye Stop Loss ya biashara hiyo.'
      },
      {
        question: 'Ukiwa na Risk-to-Reward Ratio ya 1:3 na unarisk $15 kwenye Stop Loss, Take Profit yako inapaswa kuwa na thamani gani ya faida?',
        options: ['$15', '$30', '$45', '$60'],
        correctAnswer: 2,
        explanation: 'Kwenye RRR ya 1:3, faida inayolengwa ni mara 3 ya kiasi kilichoriskika ($15 × 3 = $45).'
      }
    ]
  },
  {
    id: 'module-6',
    moduleNumber: 6,
    title: 'Saikolojia ya Mfanyabiashara & Nidhamu (Trading in the Zone)',
    subtitle: 'Kushinda maadui wakuu wanne: Hofu, Tamaa, Kulipiza Kisasi (Revenge Trading), na Matumaini Yasiyo na Msingi',
    readTime: 'Dakika 11',
    iconName: 'Brain',
    overview: 'Kama alivyoeleza Mark Douglas katika kitabu maarufu cha "Trading in the Zone", mafanikio katika soko la Forex yanategemea 80% saikolojia na nidhamu ya hisia, na 20% tu ufundi wa chati. Jifunze jinsi ya kutunza utulivu na kuondoa maamuzi yanayoongozwa na mihemko.',
    keyTakeaways: [
      'Soko halina chuki na wewe; linafuata mtiririko wake wa ukwasi na maagizo.',
      'Revenge Trading (Kujaribu kurudisha hasara mara moja) ndio njia ya haraka zaidi ya kufuta akaunti.',
      'Weka sheria za kila siku (mfano: Hasara 2 zikigongwa kwa siku, funga kompyuta/simu hadi kesho).',
      'Trading Journal (Shajara ya Kurekodi Kila Biashara) ni zana muhimu zaidi ya kujitathmini.'
    ],
    contentSections: [
      {
        heading: '1. Maadui 4 Wakuu wa Saikolojia ya Mfanyabiashara',
        paragraphs: [
          '1. HOFU (FEAR): Hofu ya kukosa fursa (FOMO) au hofu ya kupoteza pesa inayokufanya uingie mapema sana au utoke kabla soko halijafika kwenye lengo.',
          '2. TAMAA (GREED): Kutumia lot size kubwa sana ili utajirike kwa usiku mmoja, jambo linaloleta maangamizi.',
          '3. KULIPIZA KISASI (REVENGE TRADING): Kupata hasara kisha kufungua biashara nyingine mara moja kwa hasira bila mpangilio ili urudishe pesa yako.',
          '4. MATUMAINI YASIYO NA MSINGI (FALSE HOPE): Kuondoa Stop Loss au kuirudisha nyuma soko likiwa linakuelekea kwa matumaini yasiyo na msingi kwamba "litarudi tu".'
        ]
      },
      {
        heading: '2. Ukweli Mkuu 5 wa Mark Douglas (Trading in the Zone)',
        paragraphs: [
          '1. Chochote kinaweza kutokea sokoni wakati wowote.',
          '2. Huhitaji kujua nini kitakachotokea baadaye ili utengeneze pesa.',
          '3. Kuna mgawanyo wa nasibu kati ya ushindi na hasara kwa mfumo wowote wa biashara.',
          '4. Mfumo wa biashara (Edge) ni kiashiria tu kwamba uwezekano wa jambo moja kutokea ni mkubwa kuliko lingine.',
          '5. Kila wakati sokoni ni wa kipekee kabisa.'
        ]
      }
    ],
    quiz: [
      {
        question: 'Revenge Trading inamaanisha nini katika saikolojia ya Forex?',
        options: [
          'Kufanya biashara kwa kufuata mpango madhubuti wa miezi sita',
          'Kufungua biashara mpya kwa hasira na mihemko mara tu baada ya kupata hasara ili kurudisha pesa kwa nguvu',
          'Kufunga biashara kwa faida kubwa',
          'Kutumia chati ya masaa 4 pekee'
        ],
        correctAnswer: 1,
        explanation: 'Revenge trading ni kitendo hatari cha kisaikolojia ambapo mfanyabiashara anafanya maamuzi ya hasira baada ya hasara, jambo linalosababisha hasara kubwa zaidi.'
      }
    ]
  },
  {
    id: 'module-7',
    moduleNumber: 7,
    title: 'Zana, Mawakala (Brokers) & Kutoka Demo hadi Live Account',
    subtitle: 'Vigezo vya kuchagua broker salama mwenye leseni na mchakato salama wa kuanza na pesa halisi',
    readTime: 'Dakika 10',
    iconName: 'Layers',
    overview: 'Katika hatua hii ya mwisho, utajifunza jinsi ya kuchagua broker anayeaminika, anayekubali kutoa na kuweka pesa kwa njia za uhakika za ndani ya nchi (M-Pesa, Tigo Pesa, Airtel Money, Benki na USDT), na jinsi ya kufanya majaribio kwenye Demo Account kabla ya kuweka akiba yako.',
    keyTakeaways: [
      'Chagua broker mwenye leseni za mamlaka za kimataifa (kama FCA, ASIC, FSCA, CMA au CySEC).',
      'Hakikisha broker ana huduma nzuri ya wateja na njia rahisi za kutoa pesa bila ucheleweshaji.',
      'Fanya mazoezi kwenye Demo Account kwa angalau miezi 2-3 hadi uone matokeo chanya yenye msimamo.',
      'Unapoanza Live Account, anza na mtaji mdogo unaoweza kumudu kuupoteza (Risk Capital).'
    ],
    contentSections: [
      {
        heading: '1. Vigezo 6 vya Kuchagua Broker Bora nchini Tanzania',
        paragraphs: [
          '1. LESENI & USALAMA WA FEDHA: Broker lazima awe na usajili wa mamlaka zinazotambulika kama FCA (Uingereza), ASIC (Australia), FSCA (Afrika Kusini), au CMA (Kenya).',
          '2. NJIA ZA MALIPO YA NDANI: Uwezo wa kuweka na kutoa fedha kupitia Mitandao ya Simu (M-Pesa, Tigo Pesa, Airtel Money), Kadi za Visa/Mastercard, na Crypto (USDT).',
          '3. ADA & SPREAD NDOGO: Angalia brokers wenye spread kuanzia pips 0.0 hadi 1.0 kwenye EUR/USD na wasio na ada zilizojificha za kutoa pesa.',
          '4. JUKWAA LA KISASA: Upatikanaji wa MetaTrader 4 (MT4), MetaTrader 5 (MT5), na cTrader kwenye simu na kompyuta.',
          '5. AKAUNTI YA KIISLAMU (SWAP-FREE): Chaguo la kutotozwa au kulipwa riba ya kulala kwa nafasi zilizobaki wazi usiku.',
          '6. KASI YA UTEKELEZAJI (FAST EXECUTION): Maagizo yako yatekelezwe bila kuteleza (slippage) wakati wa taarifa za habari za kiuchumi.'
        ]
      },
      {
        heading: '2. Hatua kwa Hatua: Kuanzia Demo hadi Live',
        paragraphs: [
          'Mwezi wa 1 - Mwezi wa 2: Fanya mazoezi kwenye Demo Account ukitumia mtaji unaofanana na kile utakachoweka kwenye Live (Mfano: Demo ya $500, siyo Demo ya $100,000!).',
          'Mwezi wa 3: Fungua Cent Account au Micro Live Account ukitumia $50 hadi $100 ili kuzoea hisia za pesa halisi (Real Psychology).',
          'Mwezi wa 4 na Kuendelea: Ukishathibitisha nidhamu yako kwa miezi 3, unaweza kuongeza mtaji wako hatua kwa hatua au kuomba mitihani ya makampuni ya ufadhili (Prop Firms kama FTMO, FundedNext).'
        ]
      }
    ],
    quiz: [
      {
        question: 'Kabla ya kuweka pesa halisi kwenye soko la Forex, inashauriwa kufanya nini kwanza?',
        options: [
          'Kukopa pesa benki mara moja',
          'Kufanya mazoezi kwenye Demo Account kwa miezi kadhaa na kuanza na Live ndogo yenye mtaji unaoweza kumudu kupoteza',
          'Kununua roboti ghali ya biashara bila kuelewa soko',
          'Kuweka akiba ya ada ya shule ya watoto'
        ],
        correctAnswer: 1,
        explanation: 'Mchakato salama wa kujiendeleza ni kufanya mazoezi kwenye Demo na kuanza kidogo kidogo na pesa unayoweza kumudu kupoteza bila kuathiri maisha yako.'
      }
    ]
  }
];
