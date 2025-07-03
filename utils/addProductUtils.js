import fs from 'fs';
import path from 'path';

/**
 * Extracts price from text like "Products under Rp 50000..." and saves it to utils/uploadPrice.txt
 */
export async function extractAndSaveDynamicPrice(priceNoteLocator) {
  const noteText = await priceNoteLocator.textContent(); // Await locator content

  const match = noteText.match(/Rp\s?(\d+)/); // Extract price like 50000
  if (match && match[1]) {
    const price = match[1];

    const dirPath = path.resolve(__dirname, '../storedValue');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    const filePath = path.join(dirPath, 'thresholdPrice.txt');
    fs.writeFileSync(filePath, price, 'utf8');

    console.log(`✅ Extracted price: ${price} and saved to ${filePath}`);
  } else {
    console.error('❌ Failed to extract price from note text.');
  }
}

/**
 * Reads the price from utils/uploadPrice.txt and returns valid & negotiable prices
 */
export function getValidPriceFromStored() {
  const filePath = path.resolve('storedValue', 'thresholdPrice.txt');
  const storedPriceText = fs.readFileSync(filePath, 'utf8');
  const storedPrice = parseInt(storedPriceText, 10);

  if (isNaN(storedPrice)) {
    throw new Error(`❌ Invalid price in ${filePath}: "${storedPriceText}"`);
  }

  const validPrice = storedPrice - 1000;
  const negoPrice = storedPrice + 5000;

  console.log(`✅ Generated valid price: ${validPrice} | Negotiable: ${negoPrice} (Stored: ${storedPrice})`);
  return { validPrice, negoPrice };
}
