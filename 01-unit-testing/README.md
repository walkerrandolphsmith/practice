# Unit Testing

Unit testings is a way to evaluate if source code functions properly by making assertions about its behavior under various conditions

## Setup

I will gloss over some details of setting up a code base with a unit test framework so we can get into the meat of the concepts.

```
npm init --yes
npm i --save-dev mocha chai
touch math.spec.js
```

```
find ./ -name '*.spec.js' | xargs mocha
```

## Exercise

Now let's imagine we're asked to develop a system that can add two numbers.  
Let's acknowledge how trivial this is, but appreciate we are learning something new and don't need to juggle too many things at once.  
Traditionally we'd start coding and implement an add method.  
Instead, let's start by describing a scenario that can occur when adding two numbers.

```
describe('Given two positive integers are added', () => {
    const sum = add(1, 2)
    it('it should equal their sum', () => {

    })
})
```

The scenario is adding two integers and we expect the result to be 3. Let's make that assertion in code.

```
expect(sum).to.equal(3);
```

We'll need to include our assertion library

```
const expect = requrie('chai').expect;
```

If we run our unit tests now they will fail because we haven't implemented our add function. So let's do what we know best -- implementation.

```
npm test
```

:failure:

```
touch math.js
```

```
module.exports = function add(x, y) { return x + y }
```

Let's run our test suite now and see if the tests pass

```
npm test
```

:success:

## Organization

Let's refactor our code by moving it to a `src` directory away from the project files so as the project grows there is better organization

```
mkdir src
mv math.js src/
mv math.spec.js src/
```

## Committing Code

Awesome. Now let's add these changes to our staging area, commit them to history. Wait, do you notice all the generated files in `node_modules`? They came when we set up the project and installed mocha and chai. We really only want to keep track of the source code. We can tell git that certain files are not important to keep track of with `.gitignore`

```
touch .gitignore
echo "node_modules/" >> .gitignore
```

Finally, let's commit our changes

```
git add .
git commit -m "our first unit tests"
```
