const Section = ({ children = '', className = 'bg-white' }) => {
  return (
    <section className={className}>
      <div className="w-full lg:max-w-[1160px] mx-auto items-center">
        {children}
      </div>
    </section>
  );
};

export default Section;
