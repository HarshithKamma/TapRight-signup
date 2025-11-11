## TapRight Waitlist

TapRight is a smart credit card companion that analyses spending signals to recommend the optimal card mix. This repository contains a Next.js waitlist landing page with a fully wired backend that emails and texts prospects after they sign up.

### Requirements

- Node.js 18+
- npm 9+ (included with Node)

### Environment Variables

Create a `.env.local` file in the project root with the following values. The backend gracefully skips integrations if credentials are absent, but confirmations require these secrets.

```bash
# Email confirmations (Resend)
RESEND_API_KEY=your_resend_api_key

# SMS confirmations (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_PHONE=+15551234567 # must be a verified sender
```

### Develop Locally

```bash
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000). Form submissions call `/api/waitlist`, trigger email + SMS confirmations when credentials are present, and log masked payloads to the server console.

### Lint & Format

```bash
npm run lint
```

### Deployment Notes

- The project uses the Next.js App Router and Tailwind-enabled global styles.
- Remote images from `badges.gumlet.io` are configured in `next.config.ts`.
- Ensure the waitlist origin is served over HTTPS so phone numbers remain encrypted in transit.
