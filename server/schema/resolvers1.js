const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        //New query for get Person  or Place has the context, contains the driver
        getPeople: async (parent, args, context) => {
            const session = context.driver.session();

            const people = await session
                .run('MATCH (n:Person)  RETURN n ')
                console.log('people',people)
            people.map(person => {
                return {
                    id: person._fields[0].low,
                    name: person._fields[0].properties.name,
                    surname: person._fields[0].properties.surname,
                }
            })
        }

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
    }

}
module.exports = resolvers;
