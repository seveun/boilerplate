/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require("./next-i18next.config.js");

module.exports = {
  i18n,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "avatars.steamstatic.com",
      "graph.facebook.com",
      "lh3.googleusercontent.com",
    ],
  },
};
