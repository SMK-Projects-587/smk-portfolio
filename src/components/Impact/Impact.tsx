const stats = [
  {
    value: '01+',
    title: 'Projects Delivered',
    description: 'Real client projects',
  },
  {
    value: '100+',
    title: 'Hours Worked',
    description: 'Planning, design, development and support',
  },
  {
    value: '5+',
    title: 'Years of Experience',
    description: 'Combined experience in web development',
  },
  {
    value: '100%',
    title: 'Client Support',
    description: 'We stay with you even after delivery',
  },
];

export function Impact() {
  return (
    // Mobile: heading above stacked rows, number and text side by side.
    // Desktop: heading beside an intro paragraph, stats in four columns below.
    <section aria-labelledby="impact-heading" className="px-6 md:px-12">
      <div className="border-ink/15 grid gap-10 border-t py-10 md:grid-cols-2 md:gap-x-12 md:gap-y-16 md:py-16">
        <div>
          <p className="text-ink/70 text-xs tracking-widest">OUR IMPACT</p>
          <h2
            id="impact-heading"
            className="mt-3 text-5xl leading-none font-bold tracking-tight md:mt-6 lg:text-6xl"
          >
            Small team<span className="text-olive">.</span>
            <br />
            Real results<span className="text-olive">.</span>
          </h2>
        </div>

        {/* Desktop only: intro beside the heading */}
        <p className="text-ink/60 hidden max-w-md self-center leading-relaxed md:block">
          We may be a team of three, but we bring big commitment, consistent
          delivery and long-term support to every project.
        </p>

        <ul className="divide-ink/15 divide-y md:col-span-2 md:grid md:grid-cols-4 md:gap-8 md:divide-y-0">
          {stats.map((stat) => (
            <li
              key={stat.title}
              className="flex items-start gap-4 py-6 first:pt-0 md:block md:py-0"
            >
              <p className="w-1/2 text-5xl font-semibold tracking-tight md:w-auto">
                {stat.value}
              </p>
              <div className="w-1/2 md:mt-4 md:w-auto">
                <h3 className="text-sm font-semibold">{stat.title}</h3>
                <p className="text-ink/60 mt-1 text-sm">{stat.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
