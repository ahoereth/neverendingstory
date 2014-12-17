// Global collection definitions.

/**
 * Stories collection.
 *
 * {String}  title
 * {String}  creator      Creator's _id.
 * {String}  preface      A component's content. Denormalized relation.
 * {Array}   authors      _ids of users who wrote parts of the text.
 * {Array}   contributors _ids of users who voted for parts of the story.
 * {Array}   votes        _ids of users who liked the story.
 * {Number}  voteCount    Amount of users who liked the story. This is
 *                        basically the length of the votes array.
 *                        Used for easy access.
 * {Number}  created
 */
Stories = new Mongo.Collection('stories');

_.extend(Stories, {
  COUNTDOWN: {
    min: 3600000, // 1 hour
    max: 259200000, // 3 days
    init: 259200000, // 3 days
    distortion: 3600000 // 1 hour
  },
  GENRES: [
    'Crime/Detective',
    'Fable',
    'Fairy tale',
    'Fanfiction',
    'Fantasy',
    'Fiction in verse',
    'Folklore',
    'Historical fiction',
    'Horror',
    'Humour',
    'Legend',
    'Mystery',
    'Mythology',
    'Poetry',
    'Realistic fiction',
    'Science fiction',
    'Suspense/Thriller',
    'Tall tale'
  ]
});

/*
 * {String} user_id               userid that this action is related
 * {String} target_id             id of  what user created, submited or liked
 * {Number} action_type           1- creating story,
 *                                2- creating paragraph,
 *                                3- submiting a story,
 *                                4- voting a component
 * {Booleand} deleted             if the action deleted
 * {Number} createdAt             when action created
 * {Number} deletedAt             when action deleted
 */


Activities = new Mongo.Collection('activities');



/**
 * Components collection. Used for story components like paragraphs or prefaces.
 *
 * {String}  author    Author's _id.
 * {String}  content
 * {String}  story     The story's _id this component is associated with.
 * {String}  type      {paragraph, preface}
 * {Number}  priority  Priority of this component among all components of
 *                     this type for this story. See 'elected' field.
 * {Boolean} elected   More than one component can have the same priority,
 *                     but only one of them can be elected.
 * {Array}   votes     _ids of users who liked this component.
 * {Number}  voteCount Amount of users who liked this component. See Stories.
 * {Number}  created
 */
Components = new Mongo.Collection('components');
