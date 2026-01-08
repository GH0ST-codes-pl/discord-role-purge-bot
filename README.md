# Discord Role-Based Member Purge Bot

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.x-green.svg)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/discord.js-v14-blue.svg)](https://discord.js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A specialized tool designed to assist Discord server administrators in performing mass account removals (kicks) based on a specific role. This is particularly useful for cleaning up verified bot accounts, temporary guests, or members from inactive legacy roles.

## 🚀 Key Features

- **Role-Targeted Purge**: Precisely identifies and removes members assigned to a specific Role ID.
- **Safety First**: Manual confirmation ("YES") is required before any actions are performed.
- **API Rate-Limit Protection**: Implements a 1-second delay between each removal to adhere to Discord's safety guidelines and prevent API throttling.
- **Real-Time Progress Tracking**: Logs detailed progress and statistics directly to the terminal.

## ⚙️ Prerequisites

- **Node.js**: Version 16.x or higher.
- **Discord Bot Token**: Obtained via the [Discord Developer Portal](https://discord.com/developers/applications).
- **Permissions**: The bot must have the `KICK_MEMBERS` permission and the `SERVER MEMBERS` privileged intent enabled.

## 🛠️ Installation & Setup

### 1. Discord Developer Portal Configuration
Before running the bot, you need to set it up on Discord:
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **"New Application"** and give it a name.
3. Navigate to the **"Bot"** tab on the left sidebar.
4. Under **"Privileged Gateway Intents"**, enable the **"Server Members Intent"** (CRITICAL: the bot cannot see members without this).
5. Click **"Reset Token"** or **"Copy"** to get your bot token. Keep this safe!
6. To invite the bot to your server:
   - Go to **"Installation"** (or **"OAuth2"** -> **"URL Generator"**).
   - Select the `bot` scope.
   - Select the **"Kick Members"** permission.
   - Copy the generated URL and open it in your browser to invite the bot.

### 2. Local Environment Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/GH0ST-codes-pl/BOT-DISCORD-DO-USUWANIA-CZ-ONK-W-PO-RANDZE.git
   cd BOT-DISCORD-DO-USUWANIA-CZ-ONK-W-PO-RANDZE
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   GUILD_ID=your_server_id_here
   ROLE_ID=id_of_the_role_to_purge
   ```

## 📖 Usage

Run the bot using the following command:

```bash
node index.js
```

### Flow of Operation:
1. The bot connects and fetches the member list for the specified server.
2. It identifies all members possessing the targeted role.
3. It displays the total count and waits for you to type `YES` to start.
4. It processes the list one by one with a safe delay.

## ⚠️ Security & Safety

- **Local Execution**: Your bot token and server data remain on your machine.
- **Confirmation Check**: Prevents accidental triggers.
- **Rate Limiting**: Built-in 1000ms delay protects your bot from being flagged for spamming Discord's API.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
*Developed with ❤️ by [GH0ST](https://github.com/GH0ST-codes-pl)*
