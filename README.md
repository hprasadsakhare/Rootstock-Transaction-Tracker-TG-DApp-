# Rootstock DApp Telegram Bot

A Telegram bot that provides various Rootstock (RSK) blockchain functionalities, allowing users to interact with the Rootstock network through simple commands.

## 🚀 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Web3.js** - Ethereum/RSK blockchain interaction
- **node-telegram-bot-api** - Telegram Bot API integration
- **dotenv** - Environment variable management
- **body-parser** - Request body parsing middleware

## 📋 Features

The bot provides the following commands:

- `/start` - Start the bot
- `/balance <address>` - Check wallet balance
- `/transactions <address>` - Get transaction count
- `/latestblock` - Get latest block number
- `/pegIn <amount>` - Convert BTC to RBTC
- `/pegOut <amount>` - Convert RBTC to BTC
- `/rbtcPrice` - Get current RBTC price
- `/gasprice` - Get current gas price
- `/convert <weiAmount>` - Convert WEI to ETH
- `/validate <address>` - Check if an address is valid
- `/help` - Show all available commands

![Image](https://github.com/user-attachments/assets/cc079080-9346-40ea-8c75-dadaf8cb69fe)

## 🔧 Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Git
- Telegram Bot Token (from BotFather)
- Rootstock API Key

### Step 1: Clone the Repository
1. Open your terminal or command prompt
2. Navigate to the directory where you want to store the project
3. Run the following command:
```bash
git clone https://github.com/yourusername/rootstockdappbot.git
cd rootstockdappbot
```

### Step 2: Install Dependencies
1. Make sure you're in the project directory
2. Install all required dependencies:
```bash
npm install
```

### Step 3: Environment Setup
1. Create a new file named `.env` in the root directory
2. Add the following environment variables:
```
BOT_TOKEN=your_telegram_bot_token
RSK_API_KEY=your_rsk_api_key
```
3. Replace `your_telegram_bot_token` with your actual Telegram bot token
4. Replace `your_rsk_api_key` with your Rootstock API key

### Step 4: Running the Bot Locally
1. Start the bot in development mode:
```bash
npm start
```
2. The bot will start and connect to the Rootstock testnet
3. You should see a message in the console: "Server is running on port 3000"

### Step 5: Testing the Bot
1. Open Telegram and search for your bot using the username you created with BotFather
2. Start a chat with the bot
3. Send the `/start` command to initialize the bot
4. Try other commands like `/help` to see available options

### Troubleshooting
- If you encounter any errors, check that:
  - All environment variables are correctly set
  - Node.js and npm are properly installed
  - You have an active internet connection
  - The Rootstock API key is valid
  - The Telegram bot token is correct

## 🔄 How the DApp Works

1. **Bot Initialization**:
   - The bot connects to the Rootstock testnet using Web3.js
   - Sets up an Express server for handling webhook requests
   - Initializes the Telegram bot with polling enabled

2. **Command Processing**:
   - Users interact with the bot through Telegram commands
   - Each command triggers specific blockchain operations
   - Results are sent back to the user through Telegram messages

3. **Blockchain Interactions**:
   - Balance checking using `web3.eth.getBalance()`
   - Transaction count retrieval using `web3.eth.getTransactionCount()`
   - Block information using `web3.eth.getBlockNumber()`
   - Gas price checking using `web3.eth.getGasPrice()`

4. **Peg-in/Peg-out Operations**:
   - Provides instructions for converting between BTC and RBTC
   - Guides users through the pegging process

## 🔒 Security Considerations

- API keys and sensitive information are stored in environment variables
- Input validation is performed for all commands
- Error handling is implemented for all blockchain operations

## 📝 License

ISC License

## 🤝 Contributing

Feel free to submit issues and enhancement requests! 
