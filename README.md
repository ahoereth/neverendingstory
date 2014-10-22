# Running the app
Install Meteor. Clone the app repo. Change into repo folder. Run the app.

    ~$ curl https://install.meteor.com/ | sh
    ~$ git clone https://github.com/ahoereth/neverendingstory.git
    ~$ cd neverendingstory
    ~/neverendingstory$ meteor

Don't run the app in your Dropbox folder or similar. The local Mongo database can get huge.

## Development
During development run the app using the --debug option. This, at the moment, enables force votes and elects of paragraphs. More to follow.

    NODE_OPTIONS='--debug' meteor

# Meteor
Get started watching the [Meteor Screencast](https://www.meteor.com/screencast) and [it's sequel](https://www.meteor.com/authcast) and maybe read some of the [Discover Meteor book preview](http://book.discovermeteor.com). For more stuff take a look at the official [Learn Meteor](https://www.meteor.com/learn-meteor).

## References
* [Meteor Manual](http://manual.meteor.com)
* [Meteor Documentation](http://docs.meteor.com)
* [Unofficial Meteor FAQ](https://github.com/oortcloud/unofficial-meteor-faq)
* [MongoDB Operators](http://docs.mongodb.org/manual/reference/operator)
* Add more here..
