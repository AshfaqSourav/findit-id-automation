const { faker } = require('@faker-js/faker');
const path = require('path');

// Function to generate random first name and last name
export async function generateRandomName() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return `${firstName} ${lastName}`;
}

// Function to generate a random image file path
export function getRandomImage() {
    const images = [
        'one.jpeg',
        'two.jpg',
        'three.jpeg',
        'four.jpeg',
        'five.jpeg'
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return path.join(__dirname, 'images', images[randomIndex]); 
}
export function getRandomProductName() {
    const adjectives = [
      'Amazing', 'Incredible', 'Fantastic', 'Innovative',
      'Stylish', 'Premium', 'Eco-Friendly', 'Affordable',
      'Sleek', 'Durable', 'Trendy', 'Classic'
    ];
  
    const nouns = [
      'Gadget', 'Device', 'Item', 'Product',
      'Accessory', 'Tool', 'Widget', 'Equipment',
      'Apparel', 'Container', 'Gizmo', 'Thing'
    ];
  
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
    const randomNum = Math.floor(Math.random() * 1000);
  
    return `${randomAdjective} ${randomNoun} ${randomNum}`;
  }

  export function getRandomOption() {
    const options = ['Brand new Unused, possibly with original packaging/tags.',
                    'Like new Barely used, looks almost new.',
                    'Lightly used Minor signs of wear, well-maintained.',
                    'Well used Shows light wear, minor flaws.',
                    'Heavily used Clearly used, visible flaws/defects.'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  export   function generateRandomNumber() {
    // Generate a random number between 11000 and 99999
    const fixedNumbers = [40000, 45500, 50000];
    const randomIndex = Math.floor(Math.random() * fixedNumbers.length);
    const randomNumber = fixedNumbers[randomIndex];
  
    return randomNumber;
  }
  export async function clickRandomRating(page) {
    // Array of title text for star ratings
    const ratings = [
      '1 out of 5', 
      '2 out of 5', 
      '3 out of 5', 
      '4 out of 5', 
      '5 out of 5'
    ];
  
    // Randomly select an index for the rating
    const randomIndex = Math.floor(Math.random() * ratings.length);
  
    // Locate and click the random star rating
    await page.getByTitle(ratings[randomIndex]).locator('path').first();
  }  