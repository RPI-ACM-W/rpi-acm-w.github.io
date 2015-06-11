# rpi-acm-w.github.io

# Deployment

This site is currently hosted by the RPI Computer Science Department at [www.cs.rpi.edu/~acm-w](http://www.cs.rpi.edu/~acm-w).
To update the site you must have Jekyll installed and you must re-build the `_site` directory using `jekyll build`.

# Development

To work on the site, you will need to set up a local development environment.
Be sure to follow the [GitHub Pages Jekyll Instructions](https://help.github.com/articles/using-jekyll-with-pages/#installing-jekyll) to get everything set up.

When working on site development, follow these steps:

0. Be sure your environment is up-to-date using `bundle update`
1. Pull the latest version of the site from GitHub: `git pull origin master`
2. Edit the `_config.yml` file, to change the baseurl from the deployment one to the development one.
3. Start the local webserver: `bundle exec jekyll serve -w -baseurl=`.
   - Note 1: Be sure to redirect the outputs if your are going to place this process in the background.
   - Note 2: If you make any changes to the `_config.yml` file, the server will need to be restarted.
4. Visit your local site at http://localhost:4000
5. Make changes to source code, located in the `_source` folder.
   Any changes should be immediately available locally (simply refresh the page).
6. When you are satisfied with a change and you want commit, remember:
   - **Only commit the files changed within the `_source` directory**
   - The `_config.yml` file should not be included with the commit.
     The change of the baseurl variable to the development version should never be commited.
   - Every file in the `_site` directory will have changed (thus the power of static site generation).
     Do not commit them!
7. When you are done making changes, kill your local webserver.
8. Revert the baseurl change in the `_config.yml` file.
9. Rebuild the site for deployment: `bundle exec jekyll build`
10. Commit the changes you have made to the site: `git commit -a -m "_site/"`
11. Push your changes to GitHub: `git push origin master`
12. Wait until tomorrow, then check our your changes on [the live site](http://www.cs.rpi.edu/~acm-w/).
