// centris-scraper/src/main.js

import { PlaywrightCrawler, ProxyConfiguration } from 'crawlee';
import { extractPropertyDetails } from './extractors.js';
import { formatInstagramPost } from './format.js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  startUrls: process.env.START_URLS?.split(',') ?? [
    'https://www.centris.ca/en/properties~for-sale'
  ],
  maxItems: parseInt(process.env.MAX_ITEMS ?? '100', 10),
  proxy: process.env.USE_PROXY === 'true',
  showFinancialDetails: process.env.SHOW_FINANCIAL_DETAILS === 'true',
  showPhotos: process.env.SHOW_PHOTOS === 'true',
  showListingBrokers: process.env.SHOW_LISTING_BROKERS === 'true',
  agentName: process.env.AGENT_NAME?.toLowerCase() ?? null
};

const results = [];

const proxyConfiguration = config.proxy
  ? await ProxyConfiguration.create({ proxyUrls: process.env.PROXY_URLS?.split(',') ?? [] })
  : undefined;

const crawler = new PlaywrightCrawler({
  maxRequestsPerCrawl: config.maxItems,
  maxConcurrency: 5,
  proxyConfiguration,

  launchContext: {
    launchOptions: {
      headless: true,
      args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'],
    },
  },

  async requestHandler({ page, request }) {
    try {
      console.log(`▶️ Scraping: ${request.url}`);

      await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/117 Safari/537.36',
        'Accept-Language': 'fr-CA,fr;q=0.9',
      });

      await page.waitForTimeout(1000 + Math.random() * 2000);
      await page.mouse.move(100 + Math.random() * 500, 100 + Math.random() * 500);
      await page.keyboard.press('PageDown');

      if ((await page.title()).includes('Access Denied')) {
        throw new Error('🚫 Blocage détecté par Centris. Changer de proxy.');
      }

      const property = await extractPropertyDetails(page, config);

      // Filtrage par nom d'agent
      if (config.agentName && !property.listing_brokers?.some(b => b.name?.toLowerCase().includes(config.agentName))) {
        console.log(`⏩ Propriété ignorée (agent différent)`);
        return;
      }

      const formatted = await formatInstagramPost(property);
      results.push(formatted);

    } catch (err) {
      console.error(`❌ Erreur sur ${request.url}:`, err);
    }
  },
});

await crawler.run(config.startUrls);

fs.mkdirSync('data', { recursive: true });
fs.writeFileSync('data/output.json', JSON.stringify(results, null, 2));

console.log(`✅ Scraping terminé. ${results.length} propriétés enregistrées.`);
