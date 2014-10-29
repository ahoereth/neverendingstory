# The Neverending Story
* [Wiki: Introduction](https://github.com/ahoereth/neverendingstory/wiki)
* [Wiki: The Stories](https://github.com/ahoereth/neverendingstory/wiki/The-Stories)

# Running the app

## Unix/Linux
Install Meteor. Clone the app repo. Change into repo folder. Run the app.

    ~$ curl https://install.meteor.com/ | sh
    ~$ git clone https://github.com/ahoereth/neverendingstory.git
    ~$ cd neverendingstory
    ~/neverendingstory$ meteor

Don't run the app in your Dropbox folder or similar. The local Mongo database can get huge.

## Windows
Windows is [not yet](https://trello.com/c/ZMvnfMfI/11-official-windows-support) supported officially..
Best way to use Windows for development seems to be Vagrant following [this](https://gist.github.com/ahoereth/2607d2ee99103a0a9bc9) tutorial.

## Running the app during development
During development run the app using the `--debug` option. This, at the moment, enables force votes and elects of paragraphs. More to follow.

    NODE_OPTIONS='--debug' meteor

# Meteor
[Wiki: Technology-Stack](https://github.com/ahoereth/neverendingstory/wiki/Technology-Stack)

## Getting started
Best start into [Meteor](https://meteor.com) is provided by the official [Meteor Screencast](https://www.meteor.com/screencast) and [it's sequel](https://www.meteor.com/authcast). Afterwards reading some of the [Discover Meteor book](https://www.dropbox.com/s/gzjbow4w5g87iu1/Discover%2BMeteor%2BStarter%2BEdition.pdf) is really helpful. For even more information take a look at the official [Learn Meteor](https://www.meteor.com/learn-meteor) page.

## References
* [Meteor Manual](http://manual.meteor.com)
* [Meteor Documentation](http://docs.meteor.com)
* [Unofficial Meteor FAQ](https://github.com/oortcloud/unofficial-meteor-faq)
* [MongoDB Operators](http://docs.mongodb.org/manual/reference/operator)
* Add more here..
