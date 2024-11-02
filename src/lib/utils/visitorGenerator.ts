const adjectives = [
  'Happy', 'Curious', 'Clever', 'Bright', 'Swift', 'Gentle', 'Eager', 'Wise',
  'Brave', 'Calm', 'Lively', 'Noble', 'Kind', 'Bold', 'Merry', 'Proud'
];

const animals = [
  'Panda', 'Fox', 'Owl', 'Wolf', 'Bear', 'Lion', 'Tiger', 'Eagle',
  'Deer', 'Hawk', 'Lynx', 'Seal', 'Hare', 'Dove', 'Swan', 'Raven'
];

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', 
  '#D4A5A5', '#9B9B9B', '#A8E6CF', '#FFD3B6', '#FF8B94'
];

export function generateVisitorInfo() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const name = `${adjective} ${animal}`;
  const initials = `${adjective[0]}${animal[0]}`;

  return {
    name,
    initials,
    color,
    status: 'online' as const
  };
} 