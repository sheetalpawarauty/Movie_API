const express = require('express'),
      morgan = require('morgan');
                //fs = require('fs'), // import built in node modules fs and path
                //path = require('path');

const app = express();

const bodyParser = require('body-parser'),
      methodOverride = require('method-override');

let topMovies = [
  {
      title: 'The Shawshank Redemption',
      description: 'It tells the story of banker, who is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover, despite his claims of innocence.',
      genre: {
          name: 'Drama',
          description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.',
      },
      director: {
          name: 'Frank Darabont',
          bio: 'Frank Darabont is a Hungarian-American director, producer, and screenwriter. He is best known for his film adaptations of Stephen King stories, including The Shawshank Redemption, The Green Mile, and The Mist. He also works as a producer, producing such television shows as The Walking Dead and Mob City.',
          birthyear: 'January 28, 1959',
          deathyear: ''
      },
      actors: ['Tim Robbins', 'Morgan Freeman'],
      year: 1994,
      score: 9.3,
      rating: 'R',
      imageURL: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i',
      featured: true
  },
  {
      title: 'Lord of the Rings',
      description: 'A fellowship of hobbits, elves, dwarfs, and men is formed to destroy the ring by casting it into the volcanic fires of the Crack of Doom, where it was forged. They are opposed on their harrowing mission by the evil Sauron and his Black Riders.',
      genre: {
          name: 'High fantasy',
          description: 'High fantasy is set in an alternative, fictional ("secondary") world, rather than the "real" or "primary" world. This secondary world is usually internally consistent, but its rules differ from those of the primary world.',
      },
      director: {
          name: 'Peter Jackson',
          bio: ' is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy (2001–2003) and the Hobbit trilogy (2012–2014), both of which are adapted from the novels of the same name by J. R. R. Tolkien. ',
          birthyear: 'October 31,  1961',
          deathyear: '',
      },
      actors: ['Elijah Wood', 'Ian Mckellen', 'Orlando Bloom', 'Viggo Mortensen'],
      year: 2001,
      score: 8.8,
      rating: 'PG-13',
      imageURL: 'https://www.imdb.com/title/tt0120737/mediaviewer/rm3592958976/?ref_=tt_ov_i',
      featured: true
  },
  {
      title: 'Coco',
      description: `The story follows a 12-year-old boy named Miguel who is accidentally transported to the Land of the Dead, where he seeks the help of his deceased musician great-great-grandfather to return him to his family among the living and to reverse his family's ban on music.`,
      genre: {
          name: 'Animated',
          description: 'Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.',
      },
      director: {
          name: 'Lee Unkrich',
          bio: 'Lee Edward Unkrich is an American retired film director, film editor, screenwriter, and animator. He was a longtime member of the creative team at Pixar, where he started in 1994 as a film editor. He later began directing, first as co-director of Toy Story 2. Cleveland, Ohio, U.S.',
          birthyear: 'August 8, 1967',
          deathyear: '',
      },
      actors: ['Anthony Gonzalez', 'Gael Garcia Bernal', 'Benjamin Bratt',],
      year: 2017,
      score: 8.4,
      rating: 'PG',
      imageURL: 'https://www.imdb.com/title/tt2380307/mediaviewer/rm585455872/?ref_=tt_ov_i',
      featured: true,
  },
  {
      title: 'Braveheart',
      description: `Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward I of England. William Wallace is a Scottish rebel who leads an uprising against the cruel English ruler Edward the Longshanks, who wishes to inherit the crown of Scotland for himself.`,
      genre: {
          name: 'Drama',
          description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.',
      },
      director: {
          name: ' Mel Gibson',
          bio: `Mel Colmcille Gerard Gibson was the sixth of 11 children of Hutton and Ann Gibson, Roman Catholics of Irish descent. Shortly after the onset of the Vietnam War, Hutton Gibson relocated his family to Australia for fear that his sons would be drafted into battle.`,
          birthyear: 'January 3, 1956',
          deathyear: '',
      },
      actors: ['Mel Gibson', 'Sophie Marceau'],
      year: 1995,
      score: 8.4,
      rating: 'R',
      imageURL: 'https://www.imdb.com/title/tt0112573/mediaviewer/rm3170786816/?ref_=tt_ov_i',
      featured: true,
  },
  {
      title: 'Midway',
      description: 'The film, based on the real-life events of this heroic feat, tells the story of the leaders and soldiers who used their instincts, fortitude and bravery to overcome the odds. In May 1942 the Imperial Japanese Navy launches an attack on the island of Midway in the Pacific Ocean.',
      genre: {
          name: 'Action',
          description: 'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.',
      },
      director: {
          name: 'Roland Emmerich',
          bio: `Roland Emmerich is a German film director and producer of blockbuster films like The Day After Tomorrow (2004), Godzilla (1998), Independence Day (1996) and The Patriot (2000). Before fame, he originally wanted to be a production designer, but decided to be a director, after watching the original Star Wars (1977).`,
          birthyear: 'November 10, 1955',
          deathyear: '',
      },
      actors: ['Ed Skrein', 'Patrick Wilson', 'Woody Harrelson', 'Luke Evans'],
      year: 2019,
      score: 6.7,
      rating: 'PG-13',
      imageURL: 'https://www.imdb.com/title/tt6924650/mediaviewer/rm3946167041/?ref_=tt_ov_i',
      featured: true,
  },
  {
      title: 'Hangover',
      description: 'The story was about three friends who lose the groom at his Las Vegas bachelor party and then must retrace their steps to figure out what happened. It was then rewritten by Jeremy Garelick and director Todd Phillips, who added additional elements such as Mike Tyson and his tiger, the baby, and the police cruiser.',
      genre: {
          name: 'Comedy',
          description: 'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.',
      },
      director: {
          name: 'Todd Phillips',
          bio: 'Todd Phillips is an American filmmaker and actor who got his start by directing the comedy films Road Trip and Old School, the earlier inspired EuroTrip. He also directed Starsky & Hutch, The Hangover trilogy, Due Date, War Dogs and School for Scoundrels.',
          birthyear: 'December 20, 1970',
          deathyear: '',
      },
      actors: ['Zach Galifianakis', 'Bradley Cooper', 'Justin Bartha', 'Ed Helms'],
      year: 2009,
      score: 7.7,
      rating: 'R',
      imageURL: 'https://www.imdb.com/title/tt1119646/mediaviewer/rm401570304/?ref_=tt_ov_i',
      featured: true,
  },
  {
      title: 'Batman The Dark knight',
      description: 'Set within a year after the events of Batman Begins (2005), Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as "The Joker" appears in Gotham, creating a new wave of chaos.',
      genre: {
          name: 'Action',
          description: 'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.',
      },
      director: {
          name: 'Christopher Nolan',
          bio: 'Christopher Nolan, (born July 30, 1970, London, England), British film director and writer acclaimed for his noirish visual aesthetic and unconventional, often highly conceptual narratives. Nolan was raised by an American mother and a British father, and his family spent time in both Chicago and London.',
          birthyear: 'July 30, 1970',
          deathyear: '',
      },
      actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Maggie Gyllenhaal', 'Morgan Freeman'],
      year: 2008,
      score: 9.0,
      rating: 'PG-13',
      imageURL: 'https://www.imdb.com/title/tt1345836/mediaviewer/rm834516224/?ref_=tt_ov_i',
      featured: true,
  },
  {
      title: 'The Silence of the Lambs',
      description: 'Young F.B.I. trainee Clarice Starling (Jodie Foster) is assigned to help find a missing woman to save her from a psychopathic serial killer (Ted Levine) who skins his victims. Clarice attempts to gain a better insight into the twisted mind of the killer by talking to another psychopath: Dr.',
      genre: {
          name: 'Thriller',
          description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.',
      },
      director: {
          name: 'Jonathan Demme',
          bio: 'Demme was the son of Dorothy Louise (née Rogers) and Robert Eugene Demme, a public relations executive. He was raised in Rockville Centre, New York and Miami, where he graduated from Southwest Miami High School before attending the University of Florida.',
          birthyear: 'February 22, 1944',
          deathyear: 'April 26, 2017',
      },
      actors: ['Jodie Foster', 'Anthony Hopkins'],
      year: 1991,
      score: 8.6,
      rating: 'R',
      imageURL: 'https://www.imdb.com/title/tt0102926/mediaviewer/rm3242988544/?ref_=tt_ov_i',
      featured: true,
  },
  {
      title: 'The Hobbit',
      description: `The Hobbit is set within Tolkien's fictional universe and follows the quest of home-loving Bilbo Baggins, the titular hobbit, to win a share of the treasure guarded by a dragon named Smaug. Bilbo's journey takes him from his light-hearted, rural surroundings into more sinister territory.`,
      genre: {
          name: 'High fantasy',
          description: 'High fantasy is set in an alternative, fictional ("secondary") world, rather than the "real" or "primary" world. This secondary world is usually internally consistent, but its rules differ from those of the primary world.',
      },
      director: {
          name: 'Peter Jackson',
          bio: ' is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy (2001–2003) and the Hobbit trilogy (2012–2014), both of which are adapted from the novels of the same name by J. R. R. Tolkien. ',
          birthyear: 'October 31,  1961',
          deathyear: '',
      },
      actors: ['Martin Freeman', 'Ian Mckellen', 'Richard Armitage'],
      year: 2012,
      score: 7.8,
      rating: 'PG-13',
      imageURL: 'https://www.imdb.com/title/tt0903624/mediaviewer/rm3577719808/?ref_=tt_ov_i',
      featured: true,
  },
  {
      title: 'Forrest Gump',
      description: `Forrest Gump, an innocent and kind-hearted Alabama boy, has been dealing with other people's unkindness nearly all his life. Having grown up with beautiful Jenny, his only friend, Forrest yearns to learn all about the ways of the world and embarks on a mission to find his true purpose in life.`,
      genre: {
          name: 'Drama',
          description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.',
      },
      director: {
          name: 'Robert Zemeckis',
          bio: 'Robert Zemeckis, in full Robert Lee Zemeckis is an American director and screenwriter known for crowd-pleasing films that often made innovative use of special effects.',
          birthyear: 'May 14, 1952',
          deathyear: '',
      },
      actors: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
      year: 1994,
      score: 8.8,
      rating: 'PG-13',
      imageURL: 'https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=tt_ov_i',
      featured: true,
  },
];

//GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my Movie club!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(methodOverride());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//listen for requests
app.listen(8080, ()=> {
    console.log('Your app is listening on port 8080!');
});