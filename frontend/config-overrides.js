

const path = require("path-browserify");
const os = require("os-browserify/browser");
const crypto = require("crypto-browserify");

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: false,
    os: false,
    crypto: false,
  };
  return config;
};
