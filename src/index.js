import jordanImage from './images/jordan.jpg';
import jamesImage from './images/james.jpg';
import bryantImage from './images/bryant.jpg';

const numbers = [2, 3, 5];

const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers);

const whoIsTheGoat = [
    { name: 'Michael Jordan', image: jordanImage },
    { name: 'Lebron James', link: jamesImage },
    { name: 'Kobe Bryant', link: bryantImage },
  ]; 