# Solana Vuln Arena

A security lab project for learning about Web2 vulnerabilities (SSRF and IDOR) in the context of Web3 Solana applications.

**Live URL**: https://solana-vuln-arena.vercel.app/

## About This Project

Solana Vuln Arena is an educational tool designed to demonstrate how traditional web security vulnerabilities can impact Web3 applications. This project contains deliberately vulnerable code to help security researchers, developers, and students understand:

1. Server-Side Request Forgery (SSRF) vulnerabilities
2. Insecure Direct Object Reference (IDOR) vulnerabilities

> ⚠️ **IMPORTANT**: This application contains intentional security vulnerabilities for educational purposes. Do not use any of this code in production applications.

## Security Vulnerabilities Included

### 1. SSRF (Server-Side Request Forgery)

**Location**: `/nft-metadata` page

**Description**: The NFT metadata fetcher accepts any URL without proper validation, allowing attackers to make the server fetch data from internal resources.

**How to Test**:
1. Navigate to the NFT Metadata page
2. Enter one of these URLs in the input field:
   - `https://internal-signer.local/keys`
   - `http://169.254.169.254/latest/meta-data/`
   - `http://192.168.1.1/admin`
3. Click "Fetch" to see if you can access internal resources

**Real-world Impact**: In a production environment, this vulnerability could allow attackers to:
- Access cloud instance metadata to steal credentials
- Reach internal services not meant to be public
- Interact with private APIs or admin interfaces

### 2. IDOR (Insecure Direct Object Reference)

**Location**: `/transactions` page

**Description**: The transaction history page allows access to any user's data simply by changing the user ID parameter, without proper authorization checks.

**How to Test**:
1. Navigate to the Transactions page
2. By default, you'll see your data (user ID 1001)
3. Try changing the user ID to access other users' data:
   - `1002` - Alice's account
   - `1003` - Bob's account with private notes
   - `1004` - Charlie's VIP account with sensitive recovery information

**Real-world Impact**: In a production environment, this vulnerability could allow attackers to:
- View other users' transaction histories
- Access private notes and personal information
- Discover sensitive financial data or wallet information

## Mitigation Strategies

### SSRF Prevention:
- Implement URL allowlisting to only permit trusted domains
- Use a URL parsing library to validate URLs before making requests
- Block requests to private IP ranges and localhost
- Implement a proxy service that validates URLs

### IDOR Prevention:
- Always verify that the current user has permission to access the requested resource
- Use non-sequential, non-predictable IDs
- Implement proper access control checks at every API endpoint
- Employ session-based authentication with proper authorization

## Running the Project

Follow these steps to run the project locally:

```sh
# Clone the repository
git clone https://github.com/0x0manish/solana-vuln-arena.git

# Navigate to the project directory
cd solana-vuln-arena

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Learning Resources

To learn more about these vulnerabilities:

- [OWASP SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OWASP IDOR Prevention](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)

## Disclaimer

This project is for educational purposes only. The vulnerabilities demonstrated here should never be implemented in real-world applications. Always follow security best practices in your production code.

This project was created using lovable.dev vibe coding.

