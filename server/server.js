// Server initialization.

/**
 * Code to run on server startup like initializing data etc.
 */
Meteor.startup(function () {

  // Inserting mock documents into the database for testing purposes so
  // we do not have to do so manually after every database reset.
  //
  // This only runs when in debug mode. It uses direct database queries instead
  // of methods in order to not get stuck on their security checks and be able
  // to directly set 'elected' paragraphs for example.
  if (isDebug() && Stories.find().count() === 0) {

    // Mock stories from http://taleswithmorals.com
    var stories = [
      {
        title: 'The Ant and the Grasshopper',
        preface: "In a field one summer's day a Grasshopper was hopping about, chirping and singing to its heart's content. An Ant passed by, bearing along with great toil an ear of corn he was taking to the nest.",
        paragraphs: [
          '"Why not come and chat with me," said the Grasshopper, "instead of toiling and moiling in that way?"',
          '"I am helping to lay up food for the winter," said the Ant, "and recommend you to do the same."',
          '"Why bother about winter?" said the Grasshopper; we have got plenty of food at present." But the Ant went on its way and continued its toil. When the winter came the Grasshopper had no food and found itself dying of hunger, while it saw the ants distributing every day corn and grain from the stores they had collected in the summer. Then the Grasshopper knew:',
          'It is best to prepare for the days of necessity.'
        ]
      }
    ];

    // Iterate through all stories and insert them one by one.
    for (var i = 0, story; i < stories.length; i++) {
      story = stories[i];
      var _id = Stories.insert({
        creator: 'mock',
        title  : story.title,
        preface: story.preface,
        created: Date.now()
      });

      // Every story has a preface which wants its own component.
      Components.insert({
        author : 'mock',
        content: story.preface,
        story  : _id,
        type   : 'preface',
        created: Date.now()
      });

      // Iterating through all the paragraphs of a story, inserting all of them
      // as 'elected' but the last one.
      //
      // TODO: Insert more then one not elected last paragraph.
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
          created  : Date.now()
        });
      }
    }
  }
});
