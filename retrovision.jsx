import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

// --- GSAP Integration ---
const useGsap = () => {
    const [gsap, setGsap] = useState(null);
    useEffect(() => {
        if (window.gsap && window.ScrollTrigger) {
            setGsap(window.gsap);
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
            script.onload = () => {
                const scrollTriggerScript = document.createElement('script');
                scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
                scrollTriggerScript.onload = () => {
                    window.gsap.registerPlugin(window.ScrollTrigger);
                    setGsap(window.gsap);
                };
                document.head.appendChild(scrollTriggerScript);
            };
            document.head.appendChild(script);
        }
    }, []);
    return gsap;
};

// --- Icons & Data ---
const icons = {
    "Ancient Era": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16"/><path d="M4 16h16"/><path d="M4 12h16"/><path d="M4 8h16"/><path d="M10 4v16"/><path d="M14 4v16"/></svg>`,
    "Medieval Era": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l-8 4v7c0 4.4 3.6 8 8 8s8-3.6 8-8V6l-8-4z"/><path d="M12 22v-6.8"/><path d="M4 12.8h16"/></svg>`,
    "Renaissance Era": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l4 4-4 4-4-4 4-4z"/><path d="M2 12l4 4-4 4"/><path d="M22 12l-4 4 4 4"/><path d="M12 14l-4 4 4 4 4-4-4-4z"/></svg>`,
    "Industrial Revolution": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2c.4-.2.8-.5 1.1-.9l1-1.7c.6-1.1.2-2.5-.9-3.1l-2.4-1.3c-1.1-.6-2.5-.2-3.1.9l-1 1.7c-.4.7-.4 1.5 0 2.2l.2.3c.6 1.1 2 1.5 3.1.9z"/><path d="M17.8 3.2c.4.2.8.5 1.1.9l1 1.7c.6 1.1.2 2.5-.9 3.1l-2.4 1.3c-1.1.6-2.5.2-3.1-.9l-1-1.7c-.4-.7-.4-1.5 0-2.2l.2-.3c.6-1.1 2-1.5 3.1-.9z"/><path d="M6.2 3.2c-.4.2-.8-.5-1.1.9l-1 1.7c-.6 1.1-.2 2.5.9 3.1l2.4 1.3c1.1.6 2.5.2 3.1-.9l1-1.7c.4-.7.4-1.5 0-2.2l-.2-.3c-.6-1.1-2-1.5-3.1-.9z"/><path d="M6.2 19.2c-.4-.2-.8-.5-1.1-.9l-1-1.7c-.6-1.1-.2-2.5.9-3.1l2.4-1.3c1.1.6 2.5.2 3.1-.9l1 1.7c.4.7.4 1.5 0 2.2l-.2.3c-.6 1.1-2 1.5-3.1-.9z"/></svg>`,
    "Victorian Era": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4z"/><path d="M12 18v-1.5"/><path d="M12 6v1.5"/></svg>`,
    "Early 20th Century": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v8m-4-4h8"/><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"/></svg>`,
};

const eras = [
  { name: "Ancient Era", range: "3000 BCE – 500 CE", icon: icons["Ancient Era"], description: "Using stone, bronze, and early metallurgy.", inventions: ["Clay tablet computers", "Bronze gear calculators", "Pyramid power networks"]},
  { name: "Medieval Era", range: "500 – 1500 CE", icon: icons["Medieval Era"], description: "Leveraging mechanical precision and craftsmanship.", inventions: ["Monastery data networks", "Illuminated screen scrolls", "Clockwork phones"]},
  { name: "Renaissance Era", range: "1400 – 1700 CE", icon: icons["Renaissance Era"], description: "Combining art, science, and engineering innovation.", inventions: ["Da Vinci flying machines", "Optical communication", "Gear-based computation"]},
  { name: "Industrial Revolution", range: "1760 – 1840", icon: icons["Industrial Revolution"], description: "Harnessing steam power and mass production.", inventions: ["Steam-powered networks", "Telegraph computers", "Factory automation"]},
  { name: "Victorian Era", range: "1837 – 1901", icon: icons["Victorian Era"], description: "Merging precision engineering with electricity.", inventions: ["Pneumatic networks", "Mechanical brains", "Electric carriages"]},
  { name: "Early 20th Century", range: "1900 – 1950", icon: icons["Early 20th Century"], description: "Early electronics and radio technology.", inventions: ["Vacuum tube computers", "Radio smartphones", "Mechanical television"]},
];

const exampleData = {
  invention: "Smartphone",
  era: "Victorian Era",
  deconstruction: {
    materials: ["Polished mahogany", "Brass fittings", "Glass vacuum tubes", "Gutta-percha"],
    concepts: ["Analytical Engine", "Telegraphy", "Clockwork automation", "Magic lantern"],
  },
  simulations: [
    { name: "The Telegraph-Phone Apparatus", description: "A brass and mahogany communication device combining telegraph technology with early telephonic principles. Features a mechanical keyboard, pneumatic message tubes, and a viewing aperture with adjustable lenses." },
  ],
  narrative: "In an age of steam and steel, the 'Telegraph-Phone Apparatus' emerged as a marvel of personal communication...",
  imageUrl: `https://placehold.co/1024x1024/f8f5f0/443B35?text=AI+Generated+Image`,
  imageGenerated: true
};

// --- React Components ---
const App = () => {
    const [view, setView] = useState('landing');
    const [invention, setInvention] = useState('');
    const [era, setEra] = useState(eras[4].name);
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => { window.scrollTo(0, 0); }, [view]);

    const handleGenerate = async (e) => {
      e.preventDefault();
      if (!invention) { setError('Please provide an invention to reimagine.'); return; }
      setIsLoading(true); setError(''); setResults(null); setView('results');
      try {
          const systemPrompt = `You are an AI historian specializing in speculative technology. Your task is to reimagine a modern invention in a specific historical era. Deconstruct the invention into its core components and concepts, then simulate how it could have been built using the technology, materials, and scientific understanding of the chosen era. Provide a historical narrative for the reimagined invention. Respond ONLY with a valid JSON object.
          
          The JSON object must have the following structure:
          {
            "deconstruction": {
              "materials": ["list of 4 key materials from the era"],
              "concepts": ["list of 4 key scientific/technological concepts from the era"]
            },
            "simulations": [
              { "name": "Reimagined Invention Name 1", "description": "A brief, compelling description of this version." }
            ],
            "narrative": "A 1-paragraph historical account entry describing the simulated invention as if it truly existed.",
            "imagePrompt": "A detailed, descriptive prompt for an image generation model. The prompt should include the style (e.g., 'blueprint', 'steampunk schematic', 'medieval scroll illustration'), the subject (the reimagined invention), and the background (e.g., 'parchment background', 'workshop table', 'sepia tones')."
          }`;
          const userQuery = `Invention: "${invention}", Era: "${era}".`;
          const apiKey = "";
          const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
          const payload = { contents: [{ parts: [{ text: userQuery }] }], systemInstruction: { parts: [{ text: systemPrompt }] }, generationConfig: { responseMimeType: "application/json" } };
          const textResponse = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
          if (!textResponse.ok) throw new Error(`Text generation failed: ${textResponse.status}`);
          const textResult = await textResponse.json();
          const parsedResult = JSON.parse(textResult.candidates[0].content.parts[0].text);
          const imageApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
          const imagePayload = { instances: [{ prompt: parsedResult.imagePrompt }], parameters: { "sampleCount": 1 } };
          const imageResponse = await fetch(imageApiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(imagePayload) });
          if (!imageResponse.ok) throw new Error(`Image generation failed: ${imageResponse.status}`);
          const imageResult = await imageResponse.json();
          const imageUrl = `data:image/png;base64,${imageResult.predictions[0].bytesBase64Encoded}`;
          setResults({ ...parsedResult, invention, era, imageUrl, imageGenerated: true });
      } catch (err) {
          console.error(err);
          setError('An error occurred while consulting the archives. Please try again.');
          setView('input');
      } finally {
          setIsLoading(false);
      }
    };

    const showExample = () => { setResults(exampleData); setView('results'); };
    const startExploring = () => { setInvention(''); setEra(eras[4].name); setError(''); setResults(null); setView('input'); };
    const viewTimeline = () => setView('timeline');

    const renderContent = () => {
        switch (view) {
            case 'landing': return <LandingPage onStart={startExploring} onViewExamples={showExample} onViewTimeline={viewTimeline} />;
            case 'input': return <InputForm invention={invention} setInvention={setInvention} selectedEra={era} setSelectedEra={setEra} onSubmit={handleGenerate} error={error} />;
            case 'results': return <ResultsView results={results} isLoading={isLoading} onReset={startExploring} />;
            case 'timeline': return <TimelineView />;
            default: return <LandingPage onStart={startExploring} onViewExamples={showExample} onViewTimeline={viewTimeline}/>;
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@400;700&display=swap');
                body { background-color: #F8F5F0; }
                .font-display { font-family: 'Playfair Display', serif; }
                .font-body { font-family: 'Lato', sans-serif; }
            `}</style>
            <div className="bg-[#F8F5F0] min-h-screen font-body text-[#443B35] antialiased">
                <Header onTitleClick={() => setView('landing')} />
                <main className="container mx-auto px-4 py-8 md:py-12 overflow-x-hidden">
                    {renderContent()}
                </main>
                <Footer onStart={startExploring} onViewExamples={showExample} onViewTimeline={viewTimeline} />
            </div>
        </>
    );
};

const Header = ({ onTitleClick }) => (
    <header onClick={onTitleClick} className="container mx-auto px-4 pt-8 cursor-pointer">
        <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v- экология"/><path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5v-10A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span className="font-bold tracking-widest">RETRO-VISION AI</span>
        </div>
    </header>
);

const LandingPage = ({ onStart, onViewExamples, onViewTimeline }) => {
    const landingRef = useRef(null);
    const gsap = useGsap();
    useLayoutEffect(() => {
        if(gsap && landingRef.current) {
            gsap.from(landingRef.current.children, {
                duration: 1, opacity: 0, y: 30, stagger: 0.15, ease: 'power3.out'
            });
        }
    }, [gsap]);

    return (
        <div ref={landingRef}>
            <div className="grid lg:grid-cols-2 gap-12 items-center mt-16 mb-24">
                <div className="max-w-lg">
                    <h1 className="font-display text-5xl md:text-7xl text-[#2C2623] leading-tight">Reimagine History’s Inventions</h1>
                    <p className="mt-4 text-lg text-[#655850]">Explore alternate timelines where groundbreaking inventions emerged centuries earlier. What if the smartphone existed in the 1820s? Let AI show you the possibilities.</p>
                    <div className="flex items-center gap-4 mt-8">
                        <button onClick={onStart} className="bg-[#443B35] text-white py-3 px-6 rounded-lg hover:bg-[#2C2623] transition-colors">Start Exploring</button>
                        <button onClick={onViewExamples} className="bg-transparent border border-[#D9D2C7] py-3 px-6 rounded-lg hover:bg-[#EBE5DB] transition-colors">View Examples</button>
                    </div>
                </div>
                <div>
                    <div className="bg-white p-4 rounded-xl shadow-lg border border-[#EBE5DB] relative">
                         <img src="https://placehold.co/600x400/f8f5f0/443B35?text=Steampunk+Apparatus" alt="Steampunk Telegraph Machine" className="rounded-lg"/>
                         <div className="absolute top-8 -left-8 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md shadow-md text-sm">Patent &lt;1820&gt;-TEL</div>
                         <div className="absolute bottom-8 -right-8 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md shadow-md text-sm">Era: 1820s Victorian Innovation</div>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full mx-auto">
                <button onClick={onViewTimeline} className="bg-[#EBE5DB]/60 p-6 rounded-lg border border-[#D9D2C7] text-left hover:border-[#443B35] transition-colors">
                    <h3 className="font-bold text-lg">Time Travel</h3>
                    <p className="text-[#655850]">Explore any era</p>
                </button>
                 <div className="bg-[#EBE5DB]/60 p-6 rounded-lg border border-[#D9D2C7]">
                    <h3 className="font-bold text-lg">AI Generated</h3>
                    <p className="text-[#655850]">Detailed prototypes</p>
                </div>
                <div className="bg-[#EBE5DB]/60 p-6 rounded-lg border border-[#D9D2C7]">
                    <h3 className="font-bold text-lg">Rich Stories</h3>
                    <p className="text-[#655850]">Historical narratives</p>
                </div>
            </div>
            <AboutSection />
            <CallToActionSection onStart={onStart} />
        </div>
    );
};

const AboutSection = () => (
    <div className="text-center max-w-3xl mx-auto my-24">
        <h2 className="font-display text-4xl mb-4">How It Works</h2>
        <p className="text-lg text-[#655850] leading-relaxed">
            Retro-Vision AI uses a powerful combination of generative models to perform a kind of "technological archaeology." It deconstructs any modern invention into its core principles—materials, physics, and energy needs—then reimagines how those principles could have been achieved in a chosen historical era. The result is a plausible, fascinating glimpse into an alternate history of innovation.
        </p>
    </div>
);

const CallToActionSection = ({ onStart }) => (
    <div className="bg-white/70 border border-[#EBE5DB] rounded-xl shadow-lg p-12 my-24 text-center max-w-4xl mx-auto">
        <h2 className="font-display text-4xl mb-2">Create Your Own Discovery</h2>
        <p className="text-[#655850] mb-6">Ready to explore alternate invention histories? Choose any invention and watch AI reimagine its creation across different historical periods.</p>
        <button onClick={onStart} className="bg-[#443B35] text-white py-3 px-8 rounded-lg hover:bg-[#2C2623] transition-colors text-lg">
            Start Your Exploration
        </button>
    </div>
);

const InputForm = ({ invention, setInvention, selectedEra, setSelectedEra, onSubmit, error }) => {
    const popularInventions = ["Smartphone", "Airplane", "Computer", "Telescope", "Steam Engine"];
    const formRef = useRef(null);
    const gsap = useGsap();

    useLayoutEffect(() => {
        if(gsap && formRef.current) {
            gsap.from(formRef.current.children, {
                duration: 0.8, opacity: 0, y: 30, stagger: 0.1, ease: 'power3.out'
            });
        }
    }, [gsap]);

    return (
        <div ref={formRef} className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="font-display text-5xl text-center">Choose Your Invention</h2>
            <p className="text-[#655850] mt-2 text-center">Select a modern invention and discover how it might have been created in a different historical period.</p>
            <form onSubmit={onSubmit} className="w-full bg-white/70 border border-[#EBE5DB] rounded-xl shadow-lg p-8 mt-10">
                <div className="mb-6">
                    <label className="font-bold mb-2 block">What invention would you like to reimagine?</label>
                    <div className="relative">
                        <input type="text" value={invention} onChange={(e) => setInvention(e.target.value)} placeholder="Enter an invention (e.g., Smartphone, Airplane, Computer...)"
                               className="w-full pl-10 pr-4 py-3 border-2 border-[#D9D2C7] rounded-lg bg-[#F8F5F0] focus:border-[#443B35] outline-none transition-colors" />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#655850]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-sm text-[#655850] mr-2">Popular examples:</span>
                        {popularInventions.map(item => (
                            <button key={item} type="button" onClick={() => setInvention(item)} className="px-3 py-1 text-sm bg-[#EBE5DB] rounded-md hover:bg-[#D9D2C7] transition-colors">{item}</button>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <label className="font-bold mb-3 block">Choose a historical era:</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {eras.map(era => (
                            <button key={era.name} type="button" onClick={() => setSelectedEra(era.name)}
                                    className={`p-4 rounded-lg border-2 text-center transition-all ${selectedEra === era.name ? 'border-[#443B35] bg-white' : 'border-[#D9D2C7] hover:border-[#b3a99d]'}`}>
                                <div className="w-8 h-8 mx-auto mb-2 text-[#655850]" dangerouslySetInnerHTML={{ __html: era.icon }} />
                                <span className="font-bold block">{era.name}</span>
                                <span className="text-xs text-[#655850]">{era.range}</span>
                            </button>
                        ))}
                    </div>
                </div>
                 {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                <button type="submit" className="w-full bg-[#443B35] text-white py-4 rounded-lg hover:bg-[#2C2623] transition-colors text-lg font-bold">Generate Alternate History</button>
            </form>
        </div>
    );
};

const ResultsView = React.forwardRef(({ results, isLoading, onReset }, ref) => {
    if (isLoading) return <LoadingSpinner />;
    if (!results) return null;

    return (
        <div className="max-w-4xl mx-auto">
            <div ref={ref} className="bg-white/80 p-8 rounded-xl shadow-lg border border-[#EBE5DB]">
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center">
                        <div className="bg-[#EBE5DB]/60 p-4 rounded-lg border border-[#D9D2C7] w-full">
                           <img src={results.imageUrl} alt={`AI concept for ${results.invention}`} className="rounded-md w-full" />
                        </div>
                        {results.imageGenerated && <p className="text-xs text-[#655850] mt-2 text-center italic">AI Generated Image</p>}
                    </div>
                     <div>
                        <span className="text-sm bg-[#EBE5DB] px-2 py-1 rounded">{results.era}</span>
                        <h2 className="font-display text-3xl mt-2">{results.simulations[0].name}</h2>
                        <p className="text-sm text-[#655850]">Reimagined: {results.invention}</p>
                        <p className="mt-4">{results.simulations[0].description}</p>
                        
                        <div className="mt-6">
                            <h3 className="font-bold">Key Components</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {results.deconstruction.concepts.map(c => <span key={c} className="bg-[#EBE5DB] px-2 py-1 rounded text-sm">{c}</span>)}
                            </div>
                        </div>
                         <div className="mt-4">
                            <h3 className="font-bold">Available Materials</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                               {results.deconstruction.materials.map(m => <span key={m} className="bg-[#EBE5DB] px-2 py-1 rounded text-sm">{m}</span>)}
                            </div>
                        </div>
                    </div>
                 </div>
                 <div className="mt-8 border-t border-[#D9D2C7] pt-6">
                    <h3 className="font-bold mb-2">Historical Account</h3>
                    <p className="text-[#655850] leading-relaxed">{results.narrative}</p>
                 </div>
            </div>
             <div className="text-center mt-8">
                <button onClick={onReset} className="bg-[#443B35] text-white py-3 px-6 rounded-lg hover:bg-[#2C2623] transition-colors">Start a New Exploration</button>
            </div>
        </div>
    )
});

const TimelineView = () => {
    const timelineRef = useRef(null);
    const gsap = useGsap();

    useLayoutEffect(() => {
        if (gsap && timelineRef.current) {
            const cards = timelineRef.current.querySelectorAll('.timeline-card');
            gsap.from(timelineRef.current.querySelector('h2'), { opacity: 0, y: -30, duration: 1, ease: 'power3.out' });
            gsap.from(timelineRef.current.querySelector('p'), { opacity: 0, y: -20, duration: 1, ease: 'power3.out', delay: 0.2 });
            gsap.from('.timeline-line', { scaleY: 0, duration: 1.5, ease: 'power3.inOut', delay: 0.5 });
            
            cards.forEach(card => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                });
            });
        }
    }, [gsap]);

    return (
        <div ref={timelineRef} className="max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="font-display text-5xl text-center">Historical Timeline</h2>
            <p className="text-[#655850] mt-2 text-center max-w-2xl">Explore how different historical periods could have approached modern inventions using the knowledge, materials, and techniques available during their time.</p>
            
            <div className="relative mt-16 w-full">
                <div className="timeline-line absolute top-0 left-6 md:left-1/2 w-0.5 h-full bg-[#D9D2C7] origin-top -translate-x-1/2"></div>
                
                {eras.map((era, index) => (
                    <div key={era.name} className="relative w-full my-8">
                        <div className="absolute top-4 left-6 md:left-1/2 w-4 h-4 bg-[#443B35] rounded-full border-4 border-[#F8F5F0] -translate-x-1/2"></div>
                        <div className={`timeline-card p-6 bg-white/70 border border-[#EBE5DB] rounded-xl shadow-lg ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:ml-[58.333%]' : 'md:mr-[58.333%]'}`}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-lg">{era.name}</h3>
                                <span className="text-xs bg-[#EBE5DB] px-2 py-0.5 rounded-full flex-shrink-0 ml-2">{era.range}</span>
                            </div>
                            <p className="text-sm text-[#655850] mb-3">{era.description}</p>
                            <h4 className="font-bold text-sm">Possible Inventions:</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {era.inventions.map(inv => (
                                    <span key={inv} className="px-2 py-1 text-xs bg-[#EBE5DB] rounded-md">{inv}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const LoadingSpinner = () => (
    <div className="text-center py-10 flex flex-col items-center justify-center">
        <div className="w-16 h-16 relative">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-[#D9D2C7] rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-t-4 border-[#443B35] rounded-full animate-spin"></div>
        </div>
        <p className="text-xl text-[#655850] mt-6 font-display tracking-wider">Consulting the Archives...</p>
    </div>
);

const Footer = ({ onStart, onViewExamples, onViewTimeline }) => (
    <footer className="bg-white/50 border-t border-[#D9D2C7] mt-16">
        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-bold text-lg mb-2">Retro-Vision AI</h3>
                    <p className="text-sm text-[#655850]">Exploring alternate invention histories through AI-powered reverse engineering.</p>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Explore</h3>
                    <ul className="text-sm text-[#655850] space-y-2">
                        <li><button onClick={onStart} className="hover:text-[#443B35]">New Discovery</button></li>
                        <li><button onClick={onViewExamples} className="hover:text-[#443B35]">Example Discoveries</button></li>
                        <li><button onClick={onViewTimeline} className="hover:text-[#443B35]">Timeline Explorer</button></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Features</h3>
                    <ul className="text-sm text-[#655850] space-y-2">
                        <li>AI Generation</li>
                        <li>Visual Prototypes</li>
                        <li>Historical Narratives</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-bold mb-2">Connect</h3>
                     <div className="flex space-x-4">
                        <a href="#" className="text-[#655850] hover:text-[#443B35]">GitHub</a>
                        <a href="#" className="text-[#655850] hover:text-[#443B35]">Twitter</a>
                     </div>
                </div>
            </div>
            <div className="text-center text-xs text-[#655850]/70 mt-12 border-t border-[#D9D2C7] pt-8">
                 <p>© 2024 Retro-Vision AI. Created for educational exploration of alternate histories.</p>
            </div>
        </div>
    </footer>
);

export default App;

