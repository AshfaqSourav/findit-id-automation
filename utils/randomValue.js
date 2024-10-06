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
    const options = ['#BRAND_NEW', '#LIKE_NEW', '#WELL_USED', '#HEAVILY_USED'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  export   function generateRandomNumber() {
    // Generate a random number between 11000 and 99999
    const min = 10000;
    const max = 999999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return randomNumber;

   
  }