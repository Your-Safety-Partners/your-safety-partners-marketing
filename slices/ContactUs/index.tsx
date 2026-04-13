import { FC, type ReactNode } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { Mail, Phone } from 'lucide-react';

import { ContactUsSliceForm } from '@/components/forms/contact-us-slice-form';
import { SliceEntrance } from '@/components/slices/slice-entrance';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type ContactUsProps = SliceComponentProps<Content.ContactUsSlice>;

const defaultSectionTitle = 'Our team is ready to assist you';

const defaultFormTitle = 'Send us a message';

const defaultPhone = '1300 033 466';
const defaultEmail = 'johntregambe@yoursafetypartners.com.au';

const defaultDescriptionParagraphs = (
  <>
    <p>
      Get in touch with our team for expert workplace health and safety consultation. We&apos;re
      here to help you create a safer work environment.
    </p>
    <p>
      Every workplace is different, and so are its safety challenges. Our team works closely with
      you to understand your environment and deliver tailored safety solutions that keep your people
      protected, while ensuring compliance with industry standards and regulations.
    </p>
  </>
);

const descriptionComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base font-normal leading-relaxed text-gray-600 [&+p]:mt-4">{children}</p>
  ),
};

function telHref(displayNumber: string): string {
  const compact = displayNumber.replace(/[^\d+]/g, '');
  return compact.length > 0 ? `tel:${compact}` : '#';
}

const ContactUs: FC<ContactUsProps> = ({ slice }) => {
  const { section_title, section_description, contact_number, contact_email, form_title } =
    slice.primary;

  const heading =
    section_title?.trim() && section_title.trim().length > 0
      ? section_title.trim()
      : defaultSectionTitle;

  const phoneDisplay =
    contact_number?.trim() && contact_number.trim().length > 0
      ? contact_number.trim()
      : defaultPhone;

  const emailDisplay =
    contact_email?.trim() && contact_email.trim().length > 0
      ? contact_email.trim()
      : defaultEmail;

  const formHeading =
    form_title?.trim() && form_title.trim().length > 0 ? form_title.trim() : defaultFormTitle;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-[#f9fafb] py-14 md:py-20 lg:py-24')}
      aria-labelledby="contact-us-section-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <SliceEntrance from="left">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <div className="min-w-0">
              <h2
                id="contact-us-section-heading"
                className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-[2rem] lg:leading-snug"
              >
                {heading}
              </h2>

              <div className="mt-5 md:mt-6">
                {isFilled.richText(section_description) ? (
                  <PrismicRichText
                    field={section_description}
                    components={descriptionComponents}
                  />
                ) : (
                  <div className="text-base font-normal leading-relaxed text-gray-600 [&_p+p]:mt-4">
                    {defaultDescriptionParagraphs}
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-4 md:mt-10">
                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm md:px-5">
                  <div
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-100"
                    aria-hidden
                  >
                    <Phone className="size-5 text-violet-600" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-medium text-gray-500">Call Us</p>
                    <p
                      className="mt-0.5 block text-sm font-medium text-violet-600 underline-offset-2 hover:underline"
                    >
                      {phoneDisplay}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm md:px-5">
                  <div
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-100"
                    aria-hidden
                  >
                    <Mail className="size-5 text-violet-600" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-medium text-gray-500">Email Us</p>
                    <p
                      className="mt-0.5 block break-all text-sm font-medium text-violet-600 underline-offset-2 hover:underline"
                    >
                      {emailDisplay}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ContactUsSliceForm formTitle={formHeading} />
          </div>
        </SliceEntrance>
      </div>
    </section>
  );
};

export default ContactUs;
