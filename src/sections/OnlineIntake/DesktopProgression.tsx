function DesktopProgression({ className }: any) {
  return (
    <section className={`${className}`}>
      <h1 className="w-full text-center">Your Progress</h1>
      <p className="w-full text-center">
        Completing your intake paperwork requires a lot of moving parts.
        Complete each step carefully to ensure a smooth intake process. If you
        have any questions please call us at (310)676-8352
      </p>
      <div className="progression_nav_button_container">
        <button>Back</button>
        <button>next</button>
      </div>
    </section>
  );
}

export default DesktopProgression;
