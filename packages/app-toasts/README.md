# Toast Notifications

Currently only part of the local app.

## Usage
Add the `toasts` template to your application's DOM.

    {{> toasts}}


## API

The package exposes the `Toasts` JavaScript object which has two methods:

* `Toasts.add(args)`: Used for added/showing a new toast notification. `args` is
an `Object` containing the following keys:

  * *String* `message`: The message to display in the toast notification.
  * *String* `link`: Action link for the toast. Clicking the link also dismisses the toast. (**Optional**.)
  * *String* `level`: The importance level of the notification: `notice`/`warning`/`error`. Used for styling. (**Optional**, default `notice`.)
  * *Integer* `timeout`: The time in milliseconds after which the toast should disappear. (**Optional**, default is persistent.)
  * *String*/*Number* `identifier`: A unique identifier which is used to ensure the notification is only shown once and which can be used to remove the notification later using `Toasts.remove()`. (**Optional**)
  * *Boolean* `dismissible`: Enable/disable dismiss button. (**Optional**, default `true`.)

* `Toasts.remove(indentifier)`: Removes the toast defined by the `identifier` (see above) if it is still active.

## Customization

To modify the location one can pass a string to the template which contains a combination of the following class names:

* `top`/`bottom`
* `left`/`center`/`right`

They should be self explanatory. Default is `bottom center`. Alternatively one can pass `unstyled` to discard the built-in styles. To manually style the toasts all toasts are wrapped in a div with the `.toasts` class and each toast can be styled using `.toast`.

    {{> toasts 'top right'}}
    {{> toasts 'unstyled'}}

For applying CSS transitions utilize the `.hide` class. Every toast has it before made visible and before being removed from the screen.
