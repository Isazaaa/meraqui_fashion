import React from "react";

// Shared shell for legal pages. Body markup stays plain (h2, p, ul, a) and is
// styled from here so the copy can be edited without touching class names.
const bodyClass = [
  "mt-10 text-sm leading-7 text-neutral-700",
  "[&_h2]:mt-12 [&_h2]:border-t [&_h2]:border-neutral-200 [&_h2]:pt-6 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:leading-snug [&_h2]:text-black-meraqui",
  "[&>h2:first-child]:mt-0 [&>h2:first-child]:border-t-0 [&>h2:first-child]:pt-0",
  "[&_p]:mt-4 [&_h2+p]:mt-3",
  "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-neutral-400",
  "[&_strong]:font-medium [&_strong]:text-black-meraqui",
  "[&_a]:text-black-meraqui [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:text-blue-serene",
  "[&_a:focus-visible]:outline-none [&_a:focus-visible]:ring-2 [&_a:focus-visible]:ring-blue-serene [&_a:focus-visible]:ring-offset-2",
].join(" ");

const LegalLayout = ({ title, updated, children }) => {
  return (
    <div className="mx-auto min-h-[calc(100vh-12rem)] max-w-[1440px] px-5 pb-24 pt-10 md:px-10 md:pt-16 lg:px-16">
      <article className="mx-auto max-w-2xl">
        <header>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">Legal</p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-black-meraqui">{title}</h1>
          {updated && <p className="mt-3 text-sm text-neutral-500">Última actualización: {updated}</p>}
        </header>
        <div className={bodyClass}>{children}</div>
      </article>
    </div>
  );
};

export default LegalLayout;
