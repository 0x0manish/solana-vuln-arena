
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

interface WalletAddressProps {
  address: string;
}

export function WalletAddress({ address }: WalletAddressProps) {
  const formattedAddress = `${address.slice(0, 6)}...${address.slice(-6)}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-md bg-secondary">
      <span className="font-mono">{formattedAddress}</span>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={copyToClipboard}
        className="h-6 w-6"
      >
        <Copy className="h-4 w-4" />
        <span className="sr-only">Copy address</span>
      </Button>
    </div>
  );
}
