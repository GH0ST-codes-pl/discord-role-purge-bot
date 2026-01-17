require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const readline = require('readline');
const chalk = require('chalk');

const displayBanner = () => {
    console.clear();
    console.log(chalk.bold.magenta('==================================================='));
    console.log(chalk.bold.magenta('            DISCORD ROLE PURGE BOT                '));
    console.log(chalk.bold.magenta('==================================================='));
    console.log(chalk.cyan('           Created by: ') + chalk.bold.yellow('GH0ST'));
    console.log(chalk.bold.magenta('==================================================='));
    console.log('');
};

displayBanner();

// Configuration
const TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const ROLE_ID = process.env.ROLE_ID;

if (!TOKEN || !GUILD_ID || !ROLE_ID) {
    console.error(chalk.red('ERROR: Missing environment variables. Please check your .env file (DISCORD_TOKEN, GUILD_ID, ROLE_ID)'));
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.once('ready', async () => {
    console.log(chalk.green(`Logged in as ${client.user.tag}`));

    try {
        const guild = await client.guilds.fetch(GUILD_ID);
        console.log(chalk.blue(`Connected to server: ${chalk.bold(guild.name)}`));
        console.log(chalk.yellow('Fetching member list... (this may take a moment)'));

        // Fetch all members
        await guild.members.fetch();
        console.log(chalk.green(`Successfully fetched ${guild.members.cache.size} members.`));

        // Filter members with the specific role
        const membersToKick = guild.members.cache.filter(member => member.roles.cache.has(ROLE_ID));
        const count = membersToKick.size;

        if (count === 0) {
            console.log(chalk.red(`No members found with Role ID: ${ROLE_ID}`));
            client.destroy();
            process.exit(0);
        }

        console.log(chalk.bold.white(`\nFOUND ${chalk.red(count)} MEMBERS TO KICK.`));
        console.log(chalk.yellow('Are you sure you want to proceed? Type "YES" to start the process.'));

        rl.question(chalk.cyan('> '), async (answer) => {
            if (answer.trim() !== 'YES') {
                console.log(chalk.red('Process cancelled.'));
                client.destroy();
                process.exit(0);
            }

            console.log(chalk.green('Starting the purge process...'));
            let kickedCount = 0;
            let errorCount = 0;

            for (const [id, member] of membersToKick) {
                try {
                    // DRY RUN - uncomment the line below and comment out member.kick() to test
                    // console.log(chalk.gray(`[DRY RUN] Would kick: ${member.user.tag} (${member.id})`));

                    await member.kick('Mass cleanup (Auto-kick based on role)');
                    kickedCount++;
                    console.log(chalk.green(`[${kickedCount}/${count}] Kicked: ${member.user.tag}`));

                    // Delay to avoid API rate limits (1 second)
                    await new Promise(resolve => setTimeout(resolve, 1000));

                } catch (error) {
                    errorCount++;
                    console.error(chalk.red(`ERROR while kicking ${member.user.tag}:`), error.message);
                }
            }

            console.log(chalk.bold.magenta('\n--- PROCESS COMPLETED ---'));
            console.log(chalk.green(`Successfully kicked: ${kickedCount}`));
            console.log(chalk.red(`Errors encountered: ${errorCount}`));

            client.destroy();
            rl.close();
            process.exit(0);
        });

    } catch (error) {
        console.error(chalk.red('An unexpected error occurred:'), error);
        client.destroy();
        process.exit(1);
    }
});

client.login(TOKEN);
