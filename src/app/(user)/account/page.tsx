/**
 * Account page component
 * @file User account page with profile information and social account connections
 */
import { Metadata } from 'next';

import { AccountContent } from './account-content';

export const metadata: Metadata = {
  title: 'Account',
  description: 'A place to manage your account and settings',
};

export default function AccountPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Page header */}
      <header className="border-b border-sidebar-accent bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-8 md:px-12">
          <h1 className="text-xl font-medium text-primary">Account</h1>
          <nav className="flex space-x-6 text-sm text-muted">
            <a href="/settings" className="hover:text-primary">
              Settings
            </a>
            <a href="/notifications" className="hover:text-primary">
              Notifications
            </a>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 px-8 py-6 bg-background/60 sm:px-12 lg:px-16">
        <AccountContent />
      </main>

      {/* Optional Footer */}
      <footer className="bg-background py-4 text-center text-sm text-muted">
        <p>© 2025 BARK Protocol. All rights reserved.</p>
      </footer>
    </div>
  );
}
