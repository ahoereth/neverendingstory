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
