import React from 'react';
import { Article } from '../types';
import { Bot, Cpu, Zap, ArrowRight, BookOpen, Layers, Radio, Compass, Share2, CheckCircle2, CheckCircle, Smartphone, BatteryCharging, RadioReceiver } from 'lucide-react';

interface RoboticsHubSectionProps {
  onSelectArticle: (article: Article) => void;
  articles: Article[];
}

export const RoboticsHubSection: React.FC<RoboticsHubSectionProps> = ({
  onSelectArticle,
  articles,
}) => {
  const [copiedUrl, setCopiedUrl] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'drones' | 'iot' | 'humanoid'>('overview');

  const gadgetArticles = articles.filter(
    (a) => a.category === 'gadgets' || a.tags.some((t) => t.toLowerCase().includes('robot') || t.toLowerCase().includes('hardware') || t.toLowerCase().includes('gadget') || t.toLowerCase().includes('drone'))
  );

  return (
    <div className="space-y-12 pb-16">
      {/* Direct URL Route Indicator & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">URL Rasmi ya Subpage:</span>
          <code className="text-purple-400 bg-black/50 px-2 py-0.5 rounded font-mono font-bold">
            https://santech.tz/#gadgets
          </code>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.origin + '/#gadgets');
            setCopiedUrl(true);
            setTimeout(() => setCopiedUrl(false), 2000);
          }}
          className="flex items-center gap-1 text-[11px] font-bold text-zinc-300 hover:text-white bg-zinc-800 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
        >
          {copiedUrl ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          {copiedUrl ? 'Kiungo Kimekopiliwa!' : 'Nakili Kiungo cha Moja kwa Moja'}
        </button>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-purple-950/40 to-zinc-950 border border-purple-500/30 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 text-xs font-black uppercase tracking-wider">
            <Bot className="w-4 h-4" />
            Robotics, IoT & Vifaa vya Kisasa 2026
          </div>

          <h1 className="editorial-font text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Roboti za Viwandani, <span className="text-purple-400">Droni za Kilimo</span> & Mifumo ya IoT Tanzania
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Ugunduzi wa teknolojia za roboti za bionic, mifumo ya IoT inayounganishwa na simu za mkononi kupima unyevu wa mashamba, na miongozo ya kuunda vifaa vya kielektroniki kwa kutumia Raspberry Pi na Arduino ESP32.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveTab('drones')}
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-black font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-purple-500/20 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              Droni za Kilimo cha Kisasa
            </button>
            <button
              onClick={() => setActiveTab('iot')}
              className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-purple-400" />
              Arduino & ESP32 Microcontrollers
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </div>

      {/* Subpage Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { id: 'overview', label: '1. Muhtasari & Vifaa 2026', icon: Bot },
          { id: 'drones', label: '2. Droni za Kilimo & Upimaji', icon: Compass },
          { id: 'iot', label: '3. IoT, Sensorer & C++', icon: Cpu },
          { id: 'humanoid', label: '4. Roboti za Kiwandani', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-purple-500 text-black shadow-lg shadow-purple-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-zinc-900/80 border border-white/10 rounded-3xl p-6 sm:p-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-wider">Mageuzi ya Vifaa vya Kidijitali</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Kuunganisha Ulimwengu Halisi (Hardware) na Akili Bandia
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Mwaka 2026, teknolojia ya <strong>Edge AI</strong> imewezesha vifaa vidogo vya elektroniki (kama kamera na sensorer) kuchakata data na kufanya maamuzi papo hapo bila kuhitaji intaneti ya wingu. Nchini Tanzania, mifumo hii inasaidia kulinda wanyamapori dhidi ya ujangili, kufuatilia joto la chanjo kwenye zahanati za vijijini, na kuendesha viwanda vya korosho na sukari.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Microcontrollers za Bei Nafuu:</strong> Bodi za ESP32 zenye Wi-Fi na Bluetooth kwa chini ya TZS 15,000 zinazowezesha uvumbuzi wa vijana.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Teknolojia ya LoRaWAN:</strong> Kutuma data za mashamba kwa umbali wa kilomita 15 bila kutumia salio la simu.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Nishati Jadidifu:</strong> Vifaa vinavyotumia paneli ndogo za jua na betri za LiFePO4 zinazodumu miaka 10.</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80"
                alt="Humanoid Robotics and Bionics"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-wider">Uhandisi wa Roboti</span>
                <p className="text-sm font-bold text-white">Mifumo Inayosaidia Binadamu Kazi Zenye Hatari Viwandani na Migodini</p>
              </div>
            </div>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-purple-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Humanoid Robots</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Roboti zenye uwezo wa kusimama na kubeba mizigo mikubwa viwandani na maghalani zikisaidiwa na mifano ya akili bandia.
              </p>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#10b981] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Droni za Kilimo & Ulinzi</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Droni zinazonyunyizia viuatilifu kwa usahihi wa sentimita na kuchora ramani za kijiografia za mashamba makubwa nchini Tanzania.
              </p>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Embedded Systems & C++</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Mafunzo ya kuandika misimbo ya microcontrollers, sensorer za joto na mifumo ya kiotomatiki ya majumbani (Smart Home).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AGRICULTURAL DRONES */}
      {activeTab === 'drones' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-wider">Kilimo cha Usahihi (Precision Agriculture)</span>
              <h2 className="text-2xl font-black text-white">Droni za Kilimo: Kunyunyizia Dawa & Ramani za NDVI Tanzania</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Kutumia droni zenye uwezo wa kubeba lita 40 za dawa (DJI Agras T40) kupunguza muda wa unyunyiziaji kutoka siku 3 hadi dakika 15 kwa hekta.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl overflow-hidden border border-white/10 relative">
                <img
                  src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80"
                  alt="Agriculture Drone in Field"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-zinc-950 space-y-2">
                  <h4 className="text-sm font-bold text-white">Faida za Droni Mashambani (Arusha, Morogoro, Mbeya):</h4>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    <li>• <strong>Okoa 90% ya Maji:</strong> Matone madogo sana (Ultra-low volume spraying) yanayofunika majani vizuri.</li>
                    <li>• <strong>Kuzuia Sumu kwa Binadamu:</strong> Mkulima hahitaji kubeba pampu mgongoni na kuvuta mvuke wa kemikali.</li>
                    <li>• <strong>Upimaji wa Afya ya Mazao:</strong> Kamera ya Multispectral inatambua mazao yaliyokosa mbolea kabla hayajanyauka.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-zinc-950 p-6 rounded-2xl border border-white/10 space-y-4">
                <h4 className="text-base font-bold text-white">Sheria na Kanuni za TCAA za Kurusha Droni Nchini:</h4>
                <div className="space-y-2.5 text-xs text-zinc-300 leading-relaxed">
                  <div className="p-3 bg-zinc-900 rounded-xl border border-white/5">
                    <strong>1. Usajili wa Droni:</strong> Droni yoyote yenye uzito wa zaidi ya gramu 250 lazima isajiliwe na Mamlaka ya Usafiri wa Anga Tanzania (TCAA).
                  </div>
                  <div className="p-3 bg-zinc-900 rounded-xl border border-white/5">
                    <strong>2. Umbali wa Kurusha:</strong> Usirushe droni juu ya futi 400 (mita 120) au karibu na viwanja vya ndege (umbali wa km 5).
                  </div>
                  <div className="p-3 bg-zinc-900 rounded-xl border border-white/5">
                    <strong>3. Leseni ya Rubani (Remote Pilot License):</strong> Kwa shughuli za kibiashara na upimaji wa ardhi, mafunzo ya urubani wa droni yanahitajika.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: IOT & EMBEDDED C++ */}
      {activeTab === 'iot' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-wider">Mradi wa Vitendo (Maker Project)</span>
              <h2 className="text-2xl font-black text-white">Kujenga Kifaa cha Kupima Unyevu wa Udongo kwa ESP32 na C++</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Kifaa kinachopima kiwango cha maji ardhini na kutuma tahadhari kwenye simu ya mkulima kupitia SMS au Telegram Bot.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white">Msimbo wa Arduino C++ (ESP32 Soil Monitor)</h4>
                <pre className="text-[11px] font-mono bg-black/90 p-4 rounded-xl text-purple-400 overflow-x-auto leading-relaxed border border-white/5">
{`#include <WiFi.h>
#include <HTTPClient.h>

const int soilPin = 34; // Pin ya Analog ya ESP32
const char* ssid = "SANTECH_FARM_WIFI";
const char* password = "SecurePassword2026";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}

void loop() {
  int sensorValue = analogRead(soilPin);
  int moisturePercent = map(sensorValue, 4095, 0, 0, 100);

  Serial.printf("Unyevu wa Udongo: %d%%\\n", moisturePercent);

  if (moisturePercent < 20) {
    // Tuma tahadhari ya kumwagilia maji
    Serial.println("TAHADHARI: Shamba limekauka, washa pampu!");
  }
  delay(60000); // Pima kila dakika 1
}`}
                </pre>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                  alt="Electronics Circuit and Microchip"
                  className="w-full h-full object-cover min-h-[240px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-5">
                  <h4 className="text-sm font-bold text-white">Uvumbuzi wa Vifaa vya Ndani (Hardware Startups)</h4>
                  <p className="text-xs text-zinc-300 mt-1">Uundaji wa bodi za PCB na mifumo ya kiotomatiki ya kudhibiti nishati ya jua na maji mijini na vijijini.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HUMANOID */}
      {activeTab === 'humanoid' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-wider">Mustakabali wa Kazi</span>
              <h2 className="text-2xl font-black text-white">Roboti za Maumbo ya Kibinadamu (Humanoids) & Viwanda 2026</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Kuanzia Tesla Optimus, Boston Dynamics Atlas hadi Figure 02: jinsi akili bandia ya maono inavyowezesha roboti kutembea, kupanga maghala na kuunganisha vipuri vya magari.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-2">
                <h4 className="text-sm font-bold text-white">Uwezo wa Kushika (Dexterous Hands)</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Vidole vyenye sensorer za kugusa (tactile feedback) vinavyoweza kushika yai bichi bila kulivunja au kubeba chuma kizito cha kg 25.
                </p>
              </div>

              <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-2">
                <h4 className="text-sm font-bold text-white">Mizani & Kutembea (Locomotion)</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Kupanda ngazi, kuruka vizuizi na kutembea kwenye ardhi ya mchanga au mawe bila kuanguka kwa kutumia mahesabu ya Real-time Physics.
                </p>
              </div>

              <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-2">
                <h4 className="text-sm font-bold text-white">Uelewa wa Maagizo ya Sauti</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Kupokea maagizo ya mwanadamu kwa lugha ya kawaida na kuyatekeleza mara moja bila kuandikiwa msimbo mpya.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <section className="space-y-6">
        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
          <h2 className="editorial-font text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            Makala za Robotics & Hardware
          </h2>
          <span className="text-xs font-bold text-zinc-400">{gadgetArticles.length} Makala za Kina</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gadgetArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-purple-400 border border-white/10">
                    {article.categoryName || 'Robotics'}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>{article.readTime}</span>
                <span className="text-purple-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Soma Makala <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
