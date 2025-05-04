import express from "express";
import bodyParser from "body-parser";
import TelegramBot from "node-telegram-bot-api";
import Web3 from "web3";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();

async function main() {
  const app = express();
  const port = 3000;

  app.use(bodyParser.json());

  const botToken = process.env.BOT_TOKEN;
  const bot = new TelegramBot(botToken, { polling: true });
  const web3 = new Web3(
    `https://rpc.testnet.rootstock.io/${process.env.RSK_API_KEY}`
  );

  const commands = {
    start: "/start - Start the bot",
    balance: "/balance <address> - Check wallet balance",
    transactions: "/transactions <address> - Get transaction count",
    latestblock: "/latestblock - Get latest block number",
    pegIn: "/pegIn <amount> - Convert BTC to RBTC",
    pegOut: "/pegOut <amount> - Convert RBTC to BTC",
    rbtcPrice: "/rbtcPrice - Get current RBTC price",
    gasprice: "/gasprice - Get current gas price",
    convert: "/convert <weiAmount> - Convert WEI to ETH",
    validate: "/validate <address> - Check if an address is valid",
    help: "/help - Show this help message",
  };

  const sendHelpMessage = (chatId) => {
    const helpMessage =
      "You can use the following commands:\n" + Object.values(commands).join("\n");
    bot.sendMessage(chatId, helpMessage);
  };

  bot.onText(/\/help/, (msg) => {
    sendHelpMessage(msg.chat.id);
  });

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Hello! Welcome to the RootstockBot.`);
  });

  // Handle /balance command
  bot.onText(/\/balance (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const walletAddress = match[1];

    try {
      const balance = await web3.eth.getBalance(walletAddress);
      bot.sendMessage(
        chatId,
        `Balance of ${walletAddress} is ${web3.utils.fromWei(balance, "ether")} RBTC.`
      );
    } catch (error) {
      bot.sendMessage(chatId, "Error fetching balance. Try again.");
      console.error(error);
    }
  });

  // Handle /gasprice command
  bot.onText(/\/gasprice/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      const gasPrice = await web3.eth.getGasPrice();
      bot.sendMessage(
        chatId,
        `Current gas price: ${web3.utils.fromWei(gasPrice, "ether")} RBTC.`
      );
    } catch (error) {
      bot.sendMessage(chatId, "Error fetching gas price.");
      console.error(error);
    }
  });

  // Handle /transactions command
  bot.onText(/\/transactions (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const walletAddress = match[1];

    try {
      const transactionCount = await web3.eth.getTransactionCount(walletAddress);
      bot.sendMessage(chatId, `${walletAddress} has ${transactionCount} transactions.`);
    } catch (error) {
      bot.sendMessage(chatId, "Error fetching transaction count.");
      console.error(error);
    }
  });

  // Handle /latestblock command
  bot.onText(/\/latestblock/, async (msg) => {
    try {
      const latestBlock = await web3.eth.getBlockNumber();
      bot.sendMessage(msg.chat.id, `Latest block number: ${latestBlock}.`);
    } catch (error) {
      bot.sendMessage(msg.chat.id, "Error fetching latest block.");
      console.error(error);
    }
  });

  // Handle /pegIn command
  bot.onText(/\/pegIn (\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const amount = match[1];

    // Provide instructions for peg-in
    bot.sendMessage(chatId, `To peg in ${amount} BTC, send it to the designated Rootstock address. Once confirmed, the equivalent RBTC will be credited to your wallet.`);
    // Implement peg-in logic if needed (this usually involves interacting with a specific contract)
  });

  // Handle /pegOut command
  bot.onText(/\/pegOut (\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const amount = match[1];

    // Provide instructions for peg-out
    bot.sendMessage(chatId, `To peg out ${amount} RBTC, send it to the designated address. Once confirmed, the equivalent BTC will be credited to your wallet`);
    // Implement peg-out logic if needed (this usually involves interacting with a specific contract)
  });


  // Handle /convert command
  bot.onText(/\/convert (\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const weiAmount = match[1];

    try {
      const ethAmount = web3.utils.fromWei(weiAmount, "ether");
      bot.sendMessage(chatId, `${weiAmount} WEI = ${ethAmount} ETH.`);
    } catch (error) {
      bot.sendMessage(chatId, "Error converting WEI to ETH.");
      console.error(error);
    }
  });

  // Handle /validate command
  bot.onText(/\/validate (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const address = match[1];

    if (web3.utils.isAddress(address)) {
      bot.sendMessage(chatId, `✅ ${address} is a valid Ethereum/RSK address.`);
    } else {
      bot.sendMessage(chatId, `❌ ${address} is NOT a valid address.`);
    }
  });

  // Handle unknown commands
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    if (!msg.text.startsWith("/")) return;
    if (!Object.keys(commands).some((cmd) => msg.text.startsWith(`/${cmd}`))) {
      bot.sendMessage(chatId, `❌ Unrecognized command.\n${Object.values(commands).join("\n")}`);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main().catch(console.error);
