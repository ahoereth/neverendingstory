// Mock data documents insertion.

// Inserting mock documents into the database for testing purposes so
// we do not have to do so manually after every database reset.
//
// This only runs when in debug mode. It uses direct database queries instead
// of methods in order to not get stuck on their security checks and to be able
// to directly set 'elected' paragraphs for example.

Meteor.startup(function () {
  if (! isDebug())
    return;

  if (Stories.find().count() === 0) {

    // Mock stories from http://taleswithmorals.com
    var stories = [
      {
        title: 'The Ant and the Grasshopper',
        preface: "In a field one summer's day a Grasshopper was hopping about, chirping and singing to its heart's content. An Ant passed by, bearing along with great toil an ear of corn he was taking to the nest.",
        paragraphs: [
          '"Why not come and chat with me," said the Grasshopper, "instead of toiling and moiling in that way?"',
          '"I am helping to lay up food for the winter," said the Ant, "and recommend you to do the same."',
          '"Why bother about winter?" said the Grasshopper; we have got plenty of food at present." But the Ant went on its way and continued its toil. When the winter came the Grasshopper had no food and found itself dying of hunger, while it saw the ants distributing every day corn and grain from the stores they had collected in the summer. Then the Grasshopper knew:',
          'And the moral of this story: **It is best to prepare for the days of necessity.**'
        ]
      },
      {
        title: 'The Lion in Love',
        preface: 'A Lion once fell in love with a beautiful maiden and proposed marriage to her parents.',
        paragraphs: [
          'The old people did not know what to say. They did not like to give their daughter to the Lion, yet they did not wish to enrage the King of Beasts. At last the father said:',
          '"We feel highly honoured by your Majesty\'s proposal, but you see our daughter is a tender young thing, and we fear that in the vehemence of your affection you might possibly do her some injury. Might I venture to suggest that your Majesty should have your claws removed, and your teeth extracted, then we would gladly consider your proposal again."',
          'The Lion was so much in love that he had his claws trimmed and his big teeth taken out. But when he came again to the parents of the young girl they simply laughed in his face, and bade him do his worst.',
          'And the moral of this story: **Love can tame the wildest**'
        ]
      },
      {
        title: 'Markdown Test',
        preface: '',
        paragraphs: [
          '__bold__ and _italic_',
          '##Currently this supports headers..',
          '..And pretty miuch everything else like lists or tables. What do we want to support in the product?'
        ]
      }
    ];

    // Iterate through all stories and insert them one by one.
    for (var i = 0, story; i < stories.length; i++) {
      story = stories[i];
      var _id = Stories.insert({
        creator  : 'mock',
        title    : story.title,
        preface  : story.preface,
        createdAt: currentDate()
      });

      // Every story has a preface which wants its own component.
      Components.insert({
        author   : 'mock',
        content  : story.preface,
        story    : _id,
        type     : 'preface',
        createdAt: currentDate()
      });

      // Iterating through all the paragraphs of a story, inserting all of them
      // as 'elected' but the last one.
      //
      // TODO: Insert more than one not elected last paragraph. And add
      //       electedAt and countdown fields.
      var paragraphs = story.paragraphs;
      for (var j = 0, prev; j < paragraphs.length; j++) {
        prev = Components.insert({
          author   : 'mock',
          content  : paragraphs[j],
          story    : _id,
          priority : getNewPriority( Components.findOne(prev) ),
          type     : 'paragraph',
          elected  : (j < (paragraphs.length - 1)),
          voteCount: 0,
          votes    : [],
          created  : currentDate()
        });
      }
    }
  }
});
