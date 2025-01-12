'use client';

import { useRouter } from 'next/navigation';

import {
  Discord,
  OAuthTokens,
  Twitter,
  User,
  useOAuthTokens,
} from '@privy-io/react-auth';

import { WalletCard } from '@/components/dashboard/wallet-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CopyableText } from '@/components/ui/copyable-text';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/lib/utils';
import {
  formatPrivyId,
  formatUserCreationDate,
  formatWalletAddress,
} from '@/lib/utils/format';
import { getUserID, grantDiscordRole } from '@/lib/utils/grant-discord-role';
import { EmbeddedWallet } from '@/types/db';

import { LoadingStateSkeleton } from './loading-skeleton';

export function AccountContent() {
  const router = useRouter();
  const {
    isLoading,
    user,
    linkTwitter,
    unlinkTwitter,
    linkEmail,
    unlinkEmail,
    linkDiscord,
    unlinkDiscord,
  } = useUser();

  const { reauthorize } = useOAuthTokens({
    onOAuthTokenGrant: (tokens: OAuthTokens, { user }: { user: User }) => {
      // Grant Discord role
      return
        // Grant Discord role
        // Grant Discord role
        // Grant Discord role
        handleGrantDiscordRole(tokens.accessToken);
    },
  });

  if (isLoading || !user) {
    return <LoadingStateSkeleton />;
  }

  const privyUser = user?.privyUser;

  const userData = {
    privyId: privyUser?.id,
    twitter: privyUser?.twitter as Twitter | undefined,
    email: privyUser?.email?.address,
    phone: privyUser?.phone?.number,
    walletAddress: privyUser?.wallet?.address || 'No wallet connected',
    createdAt: formatUserCreationDate(user?.createdAt?.toString()),
    discord: privyUser?.discord as Discord | undefined,
  };

  const wallets = user?.wallets || [];
  const avatarLabel = userData.walletAddress
    ? userData.walletAddress.substring(0, 2).toUpperCase()
    : '?';

  const handleGrantDiscordRole = async (accessToken: string) => {
    try {
      const discordUserId = await getUserID(accessToken);
      await grantDiscordRole(discordUserId);
    } catch (error) {
      throw new Error(`Failed to grant Discord role: ${error}`);
    }
  };

  return (
    <div className="flex flex-1 flex-col py-8">
      <div className="w-full px-8">
        <div className="max-w-3xl space-y-6">
          {/* Profile Information Section */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              Profile Information
            </h2>

            <Card className="bg-sidebar">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* User basic information */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10 rounded-lg">
                      <AvatarImage
                        src={userData.twitter?.profilePictureUrl || undefined}
                        className="rounded-lg object-cover"
                      />
                      <AvatarFallback className="rounded-lg bg-sidebar-accent">
                        {avatarLabel}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {userData.twitter
                          ? `@${userData.twitter.username}`
                          : formatWalletAddress(userData.walletAddress)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Member since {userData.createdAt}
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-sidebar-accent/50" />

                  {/* Contact information */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Account ID
                      </Label>
                      <div className="mt-1">
                        <CopyableText text={formatPrivyId(userData.privyId)} />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Connected Wallet
                      </Label>
                      <div className="mt-1">
                        <CopyableText
                          text={userData.walletAddress || ''}
                          showSolscan={true}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Early Access Program
                      </Label>
                      <div className="mt-1 flex h-8 items-center">
                        <span className={cn('text-sm font-medium')}>
                          {user?.earlyAccess ? 'Active' : 'Not Active'}
                        </span>

                        {!user?.earlyAccess && (
                          <div className="ml-auto">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => router.push('/home')}
                            >
                              Get Early Access
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Connected Accounts Section */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              Connected Accounts
            </h2>

            <Card className="bg-sidebar">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Twitter Connection */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-accent/50">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="currentColor"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">X (Twitter)</p>
                        <p className="text-xs text-muted-foreground">
                          {userData.twitter
                            ? `@${userData.twitter.username}`
                            : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={
                        userData.twitter
                          ? () => unlinkTwitter(userData.twitter!.subject)
                          : linkTwitter
                      }
                      className={cn(
                        'min-w-[100px] text-xs',
                        userData.twitter &&
                          'hover:bg-destructive hover:text-destructive-foreground',
                      )}
                    >
                      {userData.twitter ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>

                  {/* Email Connection */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-accent/50">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-xs text-muted-foreground">
                          {userData.email || 'Not connected'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={
                        userData.email
                          ? () => unlinkEmail(userData.email!)
                          : linkEmail
                      }
                      className={cn(
                        'min-w-[100px] text-xs',
                        userData.email &&
                          'hover:bg-destructive hover:text-destructive-foreground',
                      )}
                    >
                      {userData.email ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>

                  {/* Discord Connection */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-accent/50">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 8.585l-7.062-7.062A9.958 9.958 0 0012 0a9.961 9.961 0 00-6.938 2.522L4 4l4.522 4.521c-.023.23-.037.463-.037.708 0 1.032.244 2.008.686 2.876l-2.333 2.332c-.801-1.392-1.26-3.016-1.26-4.632a9.931 9.931 0 012.624-6.615l5.468 5.467c.76-.255 1.565-.45 2.392-.57l3.129 3.129a9.99 9.99 0 01-2.888 2.43L8 15.999c-.142-.238-.333-.524-.537-.69l5.535-5.535a9.869 9.869 0 01-.492-2.728c0-.095.043-.193.043-.288 0-2.757-2.244-5-5-5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Discord</p>
                        <p className="text-xs text-muted-foreground">
                          {userData.discord
                            ? `@${userData.discord.username}`
                            : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={
                        userData.discord
                          ? () => unlinkDiscord(userData.discord!.subject)
                          : linkDiscord
                      }
                      className={cn(
                        'min-w-[100px] text-xs',
                        userData.discord &&
                          'hover:bg-destructive hover:text-destructive-foreground',
                      )}
                    >
                      {userData.discord ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Wallet Information Section */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              Wallet Information
            </h2>

            <Card className="bg-sidebar">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {wallets.length > 0 ? (
                    wallets.map((wallet: EmbeddedWallet, index) => (
                      <WalletCard key={index} wallet={wallet} />
                    ))
                  ) : (
                    <div className="text-xs text-muted-foreground">
                      No wallets connected.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Additional Actions Section */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              Actions
            </h2>

            <Card className="bg-sidebar">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Add any additional actions you want to show here */}
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => router.push('/some-action')}
                  >
                    Example Action
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
