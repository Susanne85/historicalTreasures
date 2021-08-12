const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const itemSchema = require('../models/Item');

// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, { email }, context) => {
            const user = await User.findOne({ email });

            if (user) {
                const userData = User.findOne({ _id: user._id })
                return userData;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            let user;
            user = await User.findOne({ email, password });

            if (!user) {
                const user = await User.create({ username, email, password });
                if (user) {
                    const token = signToken(user);
                    return { token, user };
                }
                throw new AuthenticationError('User could not be created, try again later!');
            }
        },
        login: async (parent, { email, password },) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveItem: async (_, { email, itemData }, context) => {
            const user = await User.findOne({ email });

            if (user) {
                const updatedUser =
                    await User.findOneAndUpdate(
                        { _id: user._id },
                        {
                            $push: { savedItems: itemData },
                        },
                        {
                            new: true,
                            runValidators: true,
                        }
                    );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }

}
module.exports = resolvers;
