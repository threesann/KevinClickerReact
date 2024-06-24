import './App.css'


export default function App() {

  return (
    <main className='flex flex-col lg:h-screen min-h-screen h-full'>
      {/* <HeaderSection />

      <div className='grid lg:grid-cols-3 lg:grid-rows-[1fr_2rem] p-6 min-h-0 gap-6'>
        <div className='flex flex-col lg:col-span-2 min-h-[48rem] gap-6'>
          <ClickerSection />
          <LevelSection />
        </div>
        <UpgradeSection />
        <FooterSection />
      </div>

      <Analytics />
      <SupportPopup />


      <div className='invisible'>
        {Backgrounds.map(background => <img src={`/assets/backgrounds/${background}`} />)}
      </div> */}

      <div className='max-w-sm fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 p-6 text-center'>
        <h1 className='font-bold text-3xl leading-tight'>Welcome to Kevster Clicker Resources</h1>
        <p className='text-white/75 leading-tight'>Here you can learn about different resources and skills that can help you exceed your education in programming and software development.</p>
        <img src="/code.jpg" className='mt-3' />
      </div>
    </main>
  )
}
