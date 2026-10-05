import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS Studio | Ash Ali Content Management System",
  description: "Secure Content Management System for editing, adding and removing content on ashali.com",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CMSAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-800">
      {children}
    </div>
  );
}
