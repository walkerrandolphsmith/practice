# Getting Started

Let's create a new directory for our code

```
mkdir my-project
```

## Documentation

Let's create a new file called README.md to keep track of information about this project

```
touch README.md
```

Let's add a header to indicate the name of the project.  
`.md` indicates this is Markdown format.  
You'll soon see that it is lightweight formatting for documents

```
# My Project
```

In order to keep track of the changes to the code and collaborate with other developers, we'll make this directory a git repository. More to come on the benefits of git

```
git init
```

Now that we have a git repository we can commit these changes to the README file to history and push the changes to allow others to collaborate

First, we'll add the files we want to commit to a staging area.

```
git add README.md
```

Second, we will commit the files in our staging area to history with a useful message to indicate what changed. (or why!)

```
git commit -m "add a readme"
```
