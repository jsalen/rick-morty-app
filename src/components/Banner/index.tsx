export const Banner = ({
  heading,
  body,
}: {
  heading: string;
  body?: string;
}) => {
  return (
    <section className="pt-16 pb-10 grid place-items-center">
      <h1 className="max-w-[626px] text-3xl leading-[72px] text-neutral-900 font-bold text-center tracking-[-1px] lg:text-7xl">
        {heading}
      </h1>
      {body !== undefined && (
        <p className="max-w-[1140px] mt-6 text-xl leading-9 text-center tracking-[-0.6px] text-neutral-500 font-normal lg:text-2xl">
          {body}
        </p>
      )}
    </section>
  );
};
