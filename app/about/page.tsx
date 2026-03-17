import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import CustomButton from "@/components/custom-ui/custom-button";
import Image from 'next/image';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("page", "about").catch(() => null);

  if (!page) {
    return {
      title: "About Us | Your Safety Partners",
      description: "Learn about our mission to make workplace safety simple, effective, and accessible.",
    };
  }

  return {
    title: page.data.meta_title || "About Us | Your Safety Partners",
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || "About Us | Your Safety Partners",
      description: page.data.meta_description || undefined,
      images: page.data.meta_image?.url ? [page.data.meta_image.url] : [],
    },
  };
}

export default async function AboutPage() {
  const client = createClient();
  const page = await client.getByUID("page", "about").catch(() => null);

  if (page) {
    return <SliceZone slices={page.data.slices} components={components} />;
  }

  // Fallback Hardcoded UI
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            We're on a mission to make every workplace safer.
          </h1>
          <p className="text-xl text-slate-300">
            Your Safety Partners was founded by industry veterans who saw a need for intuitive, powerful, and accessible safety management software.
          </p>
        </div>
      </section>

      {/* Mission/Vision Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To empower organizations of all sizes to build proactive safety cultures through innovative technology and expert support. We believe that a safe workplace is not just a regulatory requirement, but a fundamental human right. Our software is designed to be the central hub for your safety program, making compliance effortless and freeing you to focus on what matters most: your people.
            </p>
            <CustomButton title="See Our Features" url="/features" />
          </div>
          <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg">
            <Image 
              src="https://images.unsplash.com/photo-1581092921440-41c1b8a5a563?q=80&w=2070&auto=format&fit=crop"
              alt="Safety professionals collaborating"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">Meet the Experts</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our team is comprised of certified safety professionals, software engineers, and customer success advocates dedicated to your success.
          </p>
          <div className="text-center p-8 border-2 border-dashed border-border rounded-xl">
             <p className="text-muted-foreground">[Team member profiles will be displayed here]</p>
             <p className="text-sm text-muted-foreground mt-2">Create Slices in Prismic to populate this section.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
