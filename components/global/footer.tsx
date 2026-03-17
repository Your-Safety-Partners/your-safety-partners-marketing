import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-lg text-primary">Your Safety Partners</span>
          <p className="text-sm text-muted-foreground mt-2">
            Professional safety compliance and management solutions.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Platform</h3>
          <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/industry" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Industries</Link>
          <Link href="/compare" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Compare Alternatives</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Company</h3>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Legal</h3>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          &copy; {currentYear} Your Safety Partners. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
