// Journal posts and growth experiments, newest first.
// Each entry gets its own page at #/journal/<slug> or #/experiments/<slug>.
//
// body is a list of blocks:
//   'plain string'      -> paragraph
//   '## Heading'        -> section heading
//   '> Quote'           -> pull quote
//
// source: { title, url } credits the piece a post responds to.
// Experiments also take hypothesis, metric, result and status ('Running' | 'Won' | 'Lost' | 'Inconclusive').
//
// draft: true shows the entry on the dev server only; it never ships in `npm run build`.

const journal = [
  {
    slug: 'has-taste',
    title: 'has taste™: what a tinkerer takes from Paul Graham',
    date: '2026-10-28',
    tag: 'Product',
    source: { title: 'Taste for Makers, Paul Graham (2002)', url: 'https://paulgraham.com/taste.html' },
    excerpt: 'There is a sticker on my home page that says "has taste™". It is a joke, mostly. This is the part that isn\'t.',
    body: [
      'There is a small red sticker on the home page of this site that says "has taste™". It is a joke, mostly. This post is the part that isn\'t.',
      'In 2002 Paul Graham wrote an essay called Taste for Makers. The argument is simple and a little uncomfortable: taste is not just personal preference. If it were, nobody could get better at design. But people do get better, and when they do, they can see that their old work was worse, not just different.',
      'I grew up tinkering. Mostly sketching, but really any creative thing I could get my hands on. Nobody called it taste back then. It was just the feeling that something in a sketch was off, and not being able to leave it alone until it wasn\'t. These days I write specs and read dashboards, and it turns out it is the same feeling.',
      '## Taste is a skill, not a vibe',
      'The idea that taste can be wrong is the one I needed most. "I just like it" is a dead end in a product review. "This is worse, and here is why" is where the work starts. Once you accept that some designs are better than others, you can study why, and you can get better.',
      '## The principles I keep coming back to',
      'The essay lists fourteen. Four of them do most of the work for me.',
      'Good design is simple. On paper, shading can\'t save a bad sketch. In a product, a new feature can\'t hide a confusing flow. When a screen needs explaining, the screen is the problem.',
      'Good design solves the right problem. Graham\'s example is stove dials: put them in a square that matches the burners, not in a neat row. When I designed Bookwie in Figma, the question was never what looks clean. It was what makes someone come back and book again. That is why the Hooked model shaped the onboarding, not a moodboard.',
      'Good design is redesign. When you sketch, you redraw a line until it is right, and only then do you ink it. Software is the same. Plan for the second version before the first one ships.',
      'Good design is often slightly funny. Graham says humour is a sign of strength: you can make something serious without taking yourself too seriously. That is the whole reason this site has stickers on it.',
      '## Where data comes in',
      'This is where I would add to the essay, at least for product work. Taste tells you which direction is better. It does not tell you whether your users agree. Someone sketching for themselves can trust their eye. A product builder has to check.',
      'So I pair them. Taste picks the bet, and data settles it. That is why every Made of Curiosity product gets an analytics layer from day one, and why 0metrics exists at all: it watches the numbers, so a hunch gets tested instead of defended.',
      '> "The recipe for great work is: very exacting taste, plus the ability to gratify it." Paul Graham',
      'Exacting taste is the tinkerer\'s half. For me, the ability to gratify it is code plus numbers: building the thing, then measuring whether it actually landed.',
      '## So, has taste™?',
      'The trademark symbol is the joke. Taste is not something you own. You keep training it by making things, noticing what is ugly, and fixing it. Graham says that is how most beautiful things get made: someone found something ugly and could not leave it alone.',
      'That is the tinkerer I still am. I just do it with products now.',
    ],
  },
  {
    slug: 'sample-post',
    draft: true,
    title: 'Sample post: how this journal works',
    date: '2026-10-28',
    tag: 'Meta',
    excerpt: 'A placeholder that only shows up locally. Copy it, change the words, flip draft off.',
    body: [
      'This is a sample post so you can see how the journal looks. It only appears on the dev server, because it is marked as a draft.',
      '## Writing a new post',
      'Open src/posts.js, copy this object to the top of the journal list, give it a new slug, title, date and tag, and write the body as a list of paragraphs.',
      '> Start a block with "## " for a heading, or "> " for a pull quote like this one.',
      'Delete this sample once your first real post is in.',
    ],
  },
]

const experiments = [
  {
    slug: 'sample-experiment',
    draft: true,
    title: 'Sample experiment: how this page works',
    date: '2026-10-28',
    tag: 'Onboarding',
    status: 'Running',
    hypothesis: 'If X, then Y will move, because Z.',
    metric: 'The one number you watched',
    result: 'What happened, with the number',
    excerpt: 'A placeholder that only shows up locally. Copy it, fill in the fields, flip draft off.',
    body: [
      'This is a sample experiment so you can see how the page looks. It only appears on the dev server, because it is marked as a draft.',
      '## Setup',
      'Who saw it, for how long, and what the control was.',
      '## What I learned',
      'The takeaway, and what you would test next.',
    ],
  },
]

const live = (list) => list.filter((p) => import.meta.env.DEV || !p.draft)

export const posts = live(journal)
export const tests = live(experiments)

// Rough reading time at ~220 words a minute.
export const readMins = (p) => Math.max(1, Math.round(p.body.join(' ').split(/\s+/).length / 220))

export const fmtDate = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
