const { DataSource } = require("apollo-datasource");
const User = require("./models/userSchema");
const isEmail = require("isemail");

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
  async findOrCreateUser({ email: emailArg } = {}, { name: nameArg } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;

    console.log(this.context.user);
    const name =
      this.context && this.context.user ? this.context.user.name : nameArg;

    if (!email || !isEmail.validate(email)) return null;

    const user = this.store.then(async connection => {
      const user = await User.findOneAndUpdate(
        { name: name, email: email },
        { name: name, email: email },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).exec();
      return user ? user : null;
    });

    return user;
  }

  async addMovie({ movieId }) {
    const result = this.store.then(async connection => {
      const user = await User.findByIdAndUpdate(
        this.context.user._doc._id,
        {
          $push: {
            movies: { movieId }
          }
        },
        { new: true }
      ).exec();
      console.log(user);
    });
  }
}

module.exports = UserAPI;
