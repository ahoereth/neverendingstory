(function() {
  // Global collection definitions.

  /**
   * Stories collection.
   *
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
   */
  Stories = new Meteor.Collection('stories');



  /**
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
   */
  Components = new Meteor.Collection('components');

})();
