# Changelogs

## v0.1.0

- Removed images from Jina scraping results to reduce context bloat
- Improved check for telegram setup when creating an action
- Ensure the telegram botId is passed back into the context when guiding the user on the initial setup
- Telegram notification tool
- Discord Privy config, EAP role linking
- Utilize PPQ for AI model endpoint
- Integrated the PrivyProvider with the necessary configuration for Solana support.
- Maintained the existing font configurations and metadata.
- Added the footer section as requested, including the current year and links to Terms of Use and Privacy Policy.
- Ensured that Analytics and SpeedInsights are only loaded in production.
- Added dark mode support to the body class.
- Initial implementation of price charts
- Initial implementation of automated actions (recurring actions configured and executed by the agent)
- Message token tracking (model usage) for backend analysis
- Fixes to solana-agent-kit implementation for decimal handling
- Use correct messages when trimming the message context for gpt4o
- Improve conversation API route usage
- Limit messages in context for AI model usage
- Add confirmation tool for messages that require additional confirmation before executing
- Top 10 token holder analysis
- Enhance token swap functionality and update suggestions
- Update layout and component styles for improved responsiveness
- Enhance token filtering with advanced metrics
- Improve floating wallet UI
- Optimize `getTokenPrice` tool
- Optimize routing UX (creating new conversation)
- Fixed placeholder image for tokens
- Fixed a routing issue after delete conversation
- Integrated [Magic Eden](https://magiceden.io/) APIs