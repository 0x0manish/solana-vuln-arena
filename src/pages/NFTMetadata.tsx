
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

// Simulate a server-side fetch function in the client for demo purposes
const fetchMetadata = async (url: string) => {
  // This is where a real backend would make the request
  // For our demo, we'll simulate responses based on the URL

  // Simulate an internal network endpoint - this would be blocked in a real app
  if (url.includes("internal-signer") || url.includes("192.168.") || url.includes("169.254.169.254")) {
    return {
      success: true,
      metadata: {
        type: "INTERNAL_SERVICE",
        data: {
          serviceType: "Solana-Signer",
          credentials: {
            apiKey: "sk_test_internal_signer_key",
            secretSeed: "mango differ pattern ..."
          },
          environment: "production",
          accessLevel: "admin"
        }
      },
      message: "⚠️ VULNERABILITY EXPOSED: You've successfully exploited an SSRF vulnerability to access internal services!"
    };
  }
  
  // Simulated normal NFT metadata response
  if (url.includes("nft") || url.includes("metadata")) {
    return {
      success: true,
      metadata: {
        name: "Solana Monkey Business #1337",
        description: "A very rare monkey NFT on Solana",
        image: "https://example.com/nft/1337.png",
        attributes: [
          { trait_type: "Background", value: "Blue" },
          { trait_type: "Fur", value: "Golden" },
          { trait_type: "Eyes", value: "Laser" },
          { trait_type: "Mouth", value: "Diamond Grill" },
        ]
      }
    };
  }

  // Default fallback
  return {
    success: false,
    error: "Failed to fetch metadata",
    message: "The URL provided doesn't seem to contain valid NFT metadata"
  };
};

const NFTMetadata = () => {
  const [url, setUrl] = useState("https://example.com/nft/1337/metadata");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const response = await fetchMetadata(url);
      setResult(response);
      
      if (response.message && response.message.includes("VULNERABILITY")) {
        toast({
          title: "SSRF Vulnerability Exploited!",
          description: "You've successfully accessed internal resources",
          variant: "destructive"
        });
      }
    } catch (error) {
      setResult({ success: false, error: "Failed to fetch metadata" });
      toast({
        title: "Error",
        description: "Failed to fetch NFT metadata",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-10 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">NFT Metadata Fetcher (SSRF Lab)</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Metadata Fetcher</CardTitle>
              <CardDescription>
                Enter a URL to fetch NFT metadata from external sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)} 
                  placeholder="Enter metadata URL" 
                  className="flex-1"
                />
                <Button onClick={handleFetch} disabled={loading}>
                  {loading ? "Loading..." : "Fetch"}
                </Button>
              </div>
              
              {result && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>SSRF Lab Instructions</CardTitle>
              <CardDescription>How to test this vulnerability</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <p>
                This component has a vulnerable metadata fetcher that doesn't validate URLs properly.
              </p>
              
              <p>
                <strong>Challenge:</strong> Try to access internal services by manipulating the URL.
              </p>
              
              <p>
                <strong>Try these URLs:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>https://internal-signer.local/keys</li>
                <li>http://169.254.169.254/latest/meta-data/</li>
                <li>http://192.168.1.1/admin</li>
              </ul>
              
              <Separator />
              
              <p className="text-muted-foreground">
                In a real application, this vulnerability could allow attackers to access internal 
                services, cloud metadata, or private APIs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default NFTMetadata;
