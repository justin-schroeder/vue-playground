module.exports = api => ({
  presets: ["@vue/cli-plugin-babel/preset"],
  ...(api.env("test") && { plugins: ["require-context-hook"] })
});
