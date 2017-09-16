import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import db from '../models/index';

dotenv.load();
const Recipe = db.Recipe;
const User = db.User;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const upvoteNotification = (req, res, next) => {
  Recipe
    .findOne({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      User
        .findOne({ where: { id: recipe.userId } })
        .then((user) => {
          const mailOptions = {
            from: '"More-Recipes Admin" <emperoarkay@gmail.com@gmail.com>',
            to: user.email,
            subject: 'You have a new notification',
            text: `${req.decoded.user.username} upvoted your recipe post`,
          };

          transporter.sendMail(mailOptions, (error, res) => {
            if (error) {
              console.log(error);
            }
            console.log('Email sent to: %s', res.envelope.to);
            next();
          });
        });
    });
};

const downvoteNotification = (req, res, next) => {
  Recipe
    .findOne({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      User
        .findOne({ where: { id: recipe.userId } })
        .then((user) => {
          const mailOptions = {
            from: '"More-Recipes Admin" <emperoarkay@gmail.com@gmail.com>',
            to: user.email,
            subject: 'You have a new notification',
            text: `${req.decoded.user.username} downvoted your recipe post`,
          };

          transporter.sendMail(mailOptions, (error, res) => {
            if (error) {
              console.log(error);
            }
            console.log('Email sent to: %s', res.envelope.to);
            next();
          });
        });
    });
};

const reviewNotification = (req, res, next) => {
  Recipe
    .findOne({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      User
        .findOne({ where: { id: recipe.userId } })
        .then((user) => {
          const mailOptions = {
            from: '"More-Recipes Admin" <emperoarkay@gmail.com@gmail.com>',
            to: user.email,
            subject: 'You have a new notification',
            text: `${req.decoded.user.username} commented on your recipe post`,
          };

          transporter.sendMail(mailOptions, (error, res) => {
            if (error) {
              console.log(error);
            }
            console.log('Email sent to: %s', res.envelope.to);
            next();
          });
        });
    });
};

export { upvoteNotification, downvoteNotification, reviewNotification };