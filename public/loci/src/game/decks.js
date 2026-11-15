// Practice decks for Play: concrete, easy-to-picture nouns, so a beginner can
// practise the method before using it on their own material. The game only
// gives the words; the images are always the player's own.

export const DECKS = [
  {
    id: 'things',
    name: 'Everyday things',
    blurb: 'Objects from around the house',
    items: ['umbrella', 'scissors', 'candle', 'kettle', 'ladder', 'key', 'mirror', 'pillow', 'broom', 'clock',
      'bucket', 'hammer', 'teapot', 'lamp', 'suitcase', 'toothbrush', 'telephone', 'basket', 'rope', 'paintbrush',
      'wallet', 'balloon', 'spoon', 'blanket', 'bicycle', 'envelope', 'padlock', 'watering can', 'glove', 'radio'],
  },
  {
    id: 'animals',
    name: 'Animals',
    blurb: 'From the farm to the deep sea',
    items: ['elephant', 'owl', 'crocodile', 'penguin', 'goat', 'octopus', 'giraffe', 'bee', 'horse', 'snail',
      'parrot', 'bear', 'frog', 'flamingo', 'rabbit', 'shark', 'camel', 'peacock', 'fox', 'tortoise',
      'swan', 'kangaroo', 'bat', 'lobster', 'zebra', 'hedgehog', 'whale', 'rooster', 'squirrel', 'lion'],
  },
  {
    id: 'food',
    name: 'Shopping list',
    blurb: 'A market basket to carry home',
    items: ['bread', 'eggs', 'lemons', 'cheese', 'honey', 'tomatoes', 'butter', 'coffee', 'bananas', 'rice',
      'olive oil', 'garlic', 'milk', 'strawberries', 'salt', 'chocolate', 'onions', 'yoghurt', 'pasta', 'apples',
      'carrots', 'tea', 'flour', 'oranges', 'potatoes', 'salmon', 'mushrooms', 'cucumber', 'jam', 'walnuts'],
  },
  {
    id: 'music',
    name: 'The orchestra',
    blurb: 'Instruments and the things around them',
    items: ['violin', 'timpani', 'harp', 'trumpet', 'cello', 'flute', 'triangle', 'tuba', 'piano', 'baton',
      'oboe', 'cymbals', 'double bass', 'clarinet', 'metronome', 'horn', 'xylophone', 'bassoon', 'tambourine', 'organ',
      'music stand', 'trombone', 'castanets', 'viola', 'gong', 'saxophone', 'accordion', 'bagpipes', 'mandolin', 'bell'],
  },
];

export const deckById = (id) => DECKS.find((d) => d.id === id) ?? DECKS[0];
