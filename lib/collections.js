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


/**
 * Messages collection. Generally contains all chat and private messages.
 *
 * {String}  from     Author's _id.
 * {String}  to       Recipient's _id - can also be an array of _ids.
 * {String}  content
 * {String}  scope    {public, story, component, private}
 * {Number}  created
 */
Messages = new Mongo.Collection('messages');
