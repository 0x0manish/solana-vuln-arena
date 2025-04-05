
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import Layout from "@/components/Layout";
import { WalletAddress } from "@/components/WalletAddress";

const Index = () => {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnected(true);
    toast({
      title: "Wallet Connected",
      description: "Demo wallet has been connected successfully",
    });
  };

  return (
    <Layout>
      <div className="px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Solana Security Arena
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A web security lab for learning about SSRF and IDOR vulnerabilities in Web3 context
            </p>
          </div>

          {!connected ? (
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>Welcome to the Security Lab</CardTitle>
                <CardDescription>
                  Connect your demo wallet to get started with the security exercises
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button onClick={handleConnect} className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                  Connect Demo Wallet
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>SSRF Vulnerability</CardTitle>
                  <CardDescription>Test Server-Side Request Forgery in NFT metadata fetcher</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Exploit a vulnerable metadata service to access internal resources.
                  </p>
                  <Button asChild className="w-full">
                    <a href="/nft-metadata">Try SSRF Challenge</a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>IDOR Vulnerability</CardTitle>
                  <CardDescription>Test Insecure Direct Object References in user profiles</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Access other users' transaction histories by manipulating IDs.
                  </p>
                  <Button asChild className="w-full">
                    <a href="/transactions">Try IDOR Challenge</a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Wallet</CardTitle>
                  <CardDescription>Current connected wallet</CardDescription>
                </CardHeader>
                <CardContent>
                  <WalletAddress address="DemoWa11et6bxYQdd2s1ycHwMbpMsvir5S3JDJqrWcKB" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    This is a simulated wallet for demonstration purposes.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
