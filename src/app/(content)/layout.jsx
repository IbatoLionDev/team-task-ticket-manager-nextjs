import { ContentNav } from "@/components/content/content-nav";
import { ContentFooter } from "@/components/content/content-footer";

export const metadata = {
  title: "LionProyectsFlow Content",
  description: "Content pages layout",
};

export default function ContentLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ContentNav />
      {children}
      <ContentFooter />
    </div>
  );
}
