// Clientside helper functions.

/**
 * Used for handling form submits naturally in a single-page application. Idea
 * here is to avoid redirects and to overwrite the normal behaviour using
 * JavaScript.
 *
 * @param {Event} e
 */
handleNaturally = function(e) {
  e.preventDefault();
  e.stopPropagation();
};


/**
 * Parses all form data of a given form in an object for further use.
 *
 * TODO: Maybe move form[0].reset() here with a {Boolean} 'reset' parameter?
 *
 * @param {DOM Element} form HTML form element
 */
parseForm = function(form) {
  var fieldArray = form.serializeArray(), fields = {};

  _.each(fieldArray, function(field) {
    fields[field.name] = field.value;
  });

  return fields;
};


/**
 * Prepend a given number with zeros so it has a overall length of n.
 *
 * @param  {Number} n Desired length.
 * @return {String}
 */
Number.prototype.zeropad = function(n) {
    return (new Array(n+1).join('0') + this).slice(-n);
};
