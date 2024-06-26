interface SectionProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

function Section({ header, children }: SectionProps) {
  return (
    <section>
      <div className='py-4 lg:py-0'>
        {header}
        {/* <div>
          <h2 className='text-lg font-medium leading-6 text-gray-100'>{title}</h2>
          <p className='mt-1 text-sm text-gray-200'>{description}</p>
        </div> */}
        <div className='mt-4'>{children}</div>
      </div>
    </section>
  );
}

export default Section;
