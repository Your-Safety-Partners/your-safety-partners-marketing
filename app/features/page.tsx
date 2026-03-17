import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import CustomButton from "@/components/custom-ui/custom-button";
import { CheckCircle2, ShieldCheck, Zap, Activity, Users, FileText } from "lucide-react";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("page", "features").catch(() => null);

  if (!page) {
    return {
      title: "Features | Your Safety Partners",
      description: "Explore the powerful features of our safety compliance software.",
    };
  }

  return {
    title: page.data.meta_title || "Features | Your Safety Partners",
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || "Features | Your Safety Partners",
      description: page.data.meta_description || undefined,
      images: page.data.meta_image?.url ? [page.data.meta_image.url] : [],
    },
  };
}

export default async function FeaturesPage() {
  const client = createClient();
  const page = await client.getByUID("page", "features").catch(() => null);

  if (page) {
    return <SliceZone slices={page.data.slices} components={components} />;
  }

  // Fallback Hardcoded UI
  const features = [
    {
      title: "Real-time Incident Reporting",
      description: "Empower your team to report hazards and incidents instantly from any device.",
      icon: <Activity className="h-6 w-6 text-primary" />,
    },
    {
      title: "Automated Compliance Audits",
      description: "Stay ahead of OSHA requirements with automated audit scheduling and tracking.",
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    },
    {
      title: "Digital Training Matrix",
      description: "Track employee certifications, schedule training, and manage expiries automatically.",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: "Offline Mobile Mode",
      description: "Conduct inspections and access procedures even without an internet connection.",
      icon: <Zap className="h-6 w-6 text-primary" />,
    },
    {
      title: "Custom Form Builder",
      description: "Replicate your existing paper forms with our intuitive drag-and-drop builder.",
      icon: <FileText className="h-6 w-6 text-primary" />,
    },
    {
      title: "Corrective Action Tracking",
      description: "Assign, track, and verify corrective actions to close the loop on safety issues.",
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-muted/50 py-24 md:py-32 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Powerful Features for Modern Safety Teams
          </h1>
          <p className="text-xl text-muted-foreground mb-10">
            Everything you need to manage compliance, protect your workforce, and build a world-class safety culture.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <CustomButton title="Book a Demo" url="/contact" size="lg" />
            <CustomButton title="Get Started" url="/contact" variant="outline" size="lg" />
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to upgrade your safety program?</h2>
          <p className="text-lg mb-10 text-white/90">
            Join thousands of safety professionals who trust Your Safety Partners to keep their teams compliant and secure.
          </p>
          <CustomButton
            title="Get Started Today"
            url="/contact"
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold"
          />
        </div>
      </section>
    </div>
  );
}
