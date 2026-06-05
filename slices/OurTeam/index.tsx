import { FC, type ReactNode } from 'react';
import Image from 'next/image';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import { SliceEntrance } from '@/components/slices/slice-entrance';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type MeetTeamProps = SliceComponentProps<Content.MeetTeamSlice>;

const defaultSectionTitle = 'Meet Our Team';
const defaultSectionSubtitle = 'Experienced Workplace Safety Experts';

const subtitleComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base leading-relaxed text-gray-500 md:text-lg">{children}</p>
  ),
};

const descriptionComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-sm leading-relaxed text-gray-600 md:text-base">{children}</p>
  ),
};

const MeetTeam: FC<MeetTeamProps> = ({ slice }) => {
  const { section_title, section_subtitle, description, teams } = slice.primary;
  const members = Array.isArray(teams) ? teams : [];

  const heading =
    section_title?.trim() && section_title.trim().length > 0
      ? section_title.trim()
      : defaultSectionTitle;

  const headingId = `meet-team-heading-${slice.id ?? 'meet-team'}`;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-white py-16 md:py-20 lg:py-24')}
      aria-labelledby={headingId}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <SliceEntrance>
          <header className="mx-auto max-w-7xl text-center">
            <h2
              id={headingId}
              className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl"
            >
              {heading}
            </h2>
            <div className="mt-3 md:mt-4">
              {isFilled.richText(section_subtitle) ? (
                <PrismicRichText field={section_subtitle} components={subtitleComponents} />
              ) : (
                <p className="text-base leading-relaxed text-gray-500 md:text-lg">
                  {defaultSectionSubtitle}
                </p>
              )}
            </div>
            {isFilled.richText(description) ? (
              <div className="mx-auto mt-5 max-w-5xl text-center md:mt-6 [&_p+p]:mt-3">
                <PrismicRichText field={description} components={descriptionComponents} />
              </div>
            ) : null}
          </header>

          {members.length === 0 ? (
            <p className="mt-12 text-center text-sm text-gray-500">
              Add team members in the Our Team slice in Prismic.
            </p>
          ) : (
            <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:mt-16 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
              {members.map((member, index) => {
                const name = member.member_name?.trim() ?? '';
                const role = member.member_role?.trim() ?? '';
                const hasImage = isFilled.image(member.member_profile);
                const imageUrl = hasImage
                  ? (member.member_profile.url?.split('?')[0] ?? member.member_profile.url ?? '')
                  : '';
                const imageAlt = hasImage
                  ? (member.member_profile.alt ?? (name ? `${name} portrait` : 'Team member'))
                  : '';
                const imageWidth = hasImage
                  ? (member.member_profile.dimensions?.width ?? 400)
                  : 400;
                const imageHeight = hasImage
                  ? (member.member_profile.dimensions?.height ?? 500)
                  : 500;

                return (
                  <li key={`${name}-${role}-${index}`}>
                    <article className="group flex h-full flex-col items-center text-center">
                      <div
                        className={cn(
                          'relative mb-5 size-32 shrink-0 overflow-hidden rounded-full md:size-36 lg:size-40',
                          !hasImage && 'flex items-center justify-center border border-dashed border-gray-200 bg-gray-50'
                        )}
                      >
                        {hasImage ? (
                          <>
                            <Image
                              src={imageUrl}
                              alt={imageAlt}
                              width={imageWidth}
                              height={imageHeight}
                              unoptimized
                              sizes="(min-width: 1024px) 160px, (min-width: 768px) 144px, 128px"
                              className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                            />
                            <div
                              aria-hidden
                              className="pointer-events-none absolute inset-0 rounded-full bg-violet-700/0 transition-colors duration-300 group-hover:bg-violet-700/6"
                            />
                          </>
                        ) : (
                          <span className="px-4 text-xs text-gray-400">Add profile image</span>
                        )}
                      </div>

                      {name ? (
                        <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-gray-900 md:text-sm">
                          {name}
                        </h3>
                      ) : null}

                      {role ? (
                        <p className="mt-1.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-gray-500 md:text-xs">
                          {role}
                        </p>
                      ) : null}
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </SliceEntrance>
      </div>
    </section>
  );
};

export default MeetTeam;
