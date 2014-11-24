
/**
 * Messages collection. Generally contains all chat and private messages.
 *
 * {String}  from      Denormalized author information: _id, username, avatar
 * {String}  to        Recipient's _id - can also be an array of _ids.
 * {String}  content
 * {String}  scope     {public, story, component, private}
 * {Number}  createdAt
 * {Number}  updatedAt
 */
Messages = new Mongo.Collection('messages');
