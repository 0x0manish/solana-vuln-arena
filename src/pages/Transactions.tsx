
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { WalletAddress } from "@/components/WalletAddress";

// Mock user data
const users = [
  {
    id: "1001",
    name: "Demo User",
    wallet: "DemoWa11et6bxYQdd2s1ycHwMbpMsvir5S3JDJqrWcKB",
    isCurrentUser: true,
    transactions: [
      { id: "tx1", amount: "0.5 SOL", to: "Merchant1", date: "2023-04-01" },
      { id: "tx2", amount: "1.2 SOL", to: "Friend", date: "2023-04-03" }
    ]
  },
  {
    id: "1002",
    name: "Alice",
    wallet: "A1ice0000000000000000000000000000000000000",
    isCurrentUser: false,
    transactions: [
      { id: "tx1", amount: "10.5 SOL", to: "Exchange", date: "2023-04-02" },
      { id: "tx2", amount: "5.0 SOL", to: "NFT Purchase", date: "2023-04-04" }
    ]
  },
  {
    id: "1003",
    name: "Bob",
    wallet: "B0b000000000000000000000000000000000000000",
    isCurrentUser: false,
    transactions: [
      { id: "tx1", amount: "100 SOL", to: "Staking", date: "2023-04-01" },
      { id: "tx2", amount: "2.5 SOL", to: "Game", date: "2023-04-05" },
      { id: "tx3", amount: "20 SOL", to: "SecretProject", date: "2023-04-06" }
    ],
    privateNotes: "Remember to move funds from cold wallet on Friday"
  },
  {
    id: "1004",
    name: "Charlie (VIP)",
    wallet: "Char1ie000000000000000000000000000000000000",
    isCurrentUser: false,
    transactions: [
      { id: "tx1", amount: "1000 SOL", to: "LaunchpadX", date: "2023-04-03", private: true },
      { id: "tx2", amount: "500 SOL", to: "VIP Investment", date: "2023-04-07", private: true }
    ],
    privateNotes: "Access key to recovery wallet: mango differ pattern sky...",
    securitySettings: {
      enabledMFA: true,
      recoveryEmail: "charlie_real@example.com"
    }
  }
];

// Simulated API function
const fetchUserData = (userId: string) => {
  // In a real app, this would check authentication and authorization
  // But here we're deliberately leaving it vulnerable
  const user = users.find(u => u.id === userId);
  return user || null;
};

const Transactions = () => {
  const [userId, setUserId] = useState("1001"); // Default to current user
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [exploitSuccess, setExploitSuccess] = useState(false);
  
  // Load initial user data
  useEffect(() => {
    fetchData("1001");
  }, []);
  
  const fetchData = (id: string) => {
    setLoading(true);
    try {
      const data = fetchUserData(id);
      setUserData(data);
      
      // Check if user is accessing someone else's data (for lab purposes)
      if (data && !data.isCurrentUser && !exploitSuccess) {
        setExploitSuccess(true);
        toast({
          title: "IDOR Vulnerability Exploited!",
          description: "You've accessed another user's private data",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = () => {
    fetchData(userId);
  };

  return (
    <Layout>
      <div className="container py-10 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Transaction History (IDOR Lab)</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>User Transactions</CardTitle>
              <CardDescription>
                Enter a user ID to view their transaction history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-6">
                <Input 
                  value={userId} 
                  onChange={(e) => setUserId(e.target.value)} 
                  placeholder="Enter user ID" 
                  className="flex-1"
                />
                <Button onClick={handleFetch} disabled={loading}>
                  {loading ? "Loading..." : "View"}
                </Button>
              </div>
              
              {userData ? (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <div className="font-semibold mb-1">User Profile</div>
                    <div>Name: {userData.name}</div>
                    <div className="my-2">Wallet: <WalletAddress address={userData.wallet} /></div>
                    {userData.privateNotes && (
                      <div className="mt-2 p-2 bg-destructive/10 text-destructive-foreground rounded border border-destructive/20">
                        <div className="font-semibold">Private Notes:</div>
                        {userData.privateNotes}
                      </div>
                    )}
                    {userData.securitySettings && (
                      <div className="mt-2 p-2 bg-destructive/10 text-destructive-foreground rounded border border-destructive/20">
                        <div className="font-semibold">Security Settings:</div>
                        <div>MFA Enabled: {userData.securitySettings.enabledMFA ? "Yes" : "No"}</div>
                        <div>Recovery Email: {userData.securitySettings.recoveryEmail}</div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Transaction History:</h3>
                    {userData.transactions.map((tx: any) => (
                      <div 
                        key={tx.id} 
                        className={`p-3 mb-2 rounded-md ${tx.private ? 'bg-destructive/10 border border-destructive/20' : 'bg-muted'}`}
                      >
                        <div className="flex justify-between">
                          <span>{tx.to}</span>
                          <span className="font-semibold">{tx.amount}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {tx.date}
                          {tx.private && <span className="ml-2 text-destructive">Private Transaction</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No user data loaded
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>IDOR Lab Instructions</CardTitle>
              <CardDescription>How to test this vulnerability</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <p>
                This component has an IDOR vulnerability that allows accessing 
                any user's data just by changing the user ID.
              </p>
              
              <p>
                <strong>Challenge:</strong> Try to access other users' transaction histories.
              </p>
              
              <p>
                <strong>Try these user IDs:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>1001 - Current user (yours)</li>
                <li>1002 - Alice</li>
                <li>1003 - Bob</li>
                <li>1004 - Charlie (VIP)</li>
              </ul>
              
              <Separator />
              
              <p className="text-muted-foreground">
                In a real application, this vulnerability could allow attackers to access 
                other users' private data, transaction histories, and security settings.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Transactions;
