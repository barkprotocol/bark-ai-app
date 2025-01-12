import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the cookie store to get the sidebar state
  const cookieStore = await cookies();

  // Determine if the sidebar should be open or closed based on the cookie
  const defaultOpen = cookieStore.get('sidebar:state')?.value !== 'false';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {/* Sidebar component that contains the main menu items */}
      <AppSidebar />
      
      <main className="w-full">
        {/* Sidebar trigger button for mobile screens */}
        <SidebarTrigger className="mt-2 md:hidden" />

        {/* Optionally, you can uncomment the banner to show a promotion or alert */}
        {/* <Banner>$BARK is now live on Raydium 🎉</Banner> */}

        {/* Render the children content passed to this layout */}
        {children}
      </main>
    </SidebarProvider>
  );
}
