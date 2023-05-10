* **data mining**
    > application of AI strategies to enormous data set
* Statistics Refresher
  * **dependant variable** (response variable)
    > are thought to change in response to changes in independent variables and are therefore dependant on the independent variables' value. Y-axis
  * **independent variable** (predictor variable)
    > features of data that are known, like age, height, weight, that don't need to be predicted. X-axis
  * **residual**
    > difference between dependant variable's actual value and predicted 
  * **regression line**
    > best-fit line/curve that reduces the total residual of all data points
  * **no relationship line**
    > null line, baseline, typically horizontal line through mean of dependent variable
  * **error sum of squares (SSE)** (sum of squared residuals SSres)
    > Quantifies how far the independent variables are from regression line
  * **regression sum of squares (SSR)**
    > Quantifies how far the independent variables are from the null line.
  * **Total sum of squares (SSTO)**
    > Quantifies total variability of dependent variable around the mean, i.e. total deviation of each observed y value from the grand mean of y
* **Machine Learning**
    > class analysis over supervised, unsupervised, and reinforcement learning
    * fundamental problem
        * **bias**
          > model predicts wrong thing in same way
        * **variance**
            > model predicts different things when it sees same thing
        * ideal world low bias low variance, but usually tradeoff between two
    * **cross validation**
        > technique used evaluate how well model can generalize new data. Break training data into subsets (in different ways depending on how you cross validate) and repeating the training and evaluation process with different subsets.
* **Supervised** Machine Learning
    * training data, annotated/labeled data
    * testing data, unannotated/unlabeled data
    * types
        * **regression**
            > outputs discrete number
        * **classification**
            > outputs a category i.e. yes/no
    * algorithms
        * **linear regression**
          > regression technique - best-fit line/curve/plane using r&sup2; and p statistical significance
            * predicts dependent variable (response variable) y based on one or more independent variables (predictor variables)
            * finds the best-fit line/curve
            * computes a value, y, for a given set of inputs, x, such that each input is a dimension of the problem such that each hve different weights/importance
            * Number of inputs affect which algorithm to use for best fit line
                * single input
                    * mean, standard deviation, correlations, covariance
                * multiple inputs
                    * **ordinary least squares**
                        * minimizing the summation of the squared residuals
                        * uses matrices and linear algebra
                        * minimizes the sum of the squared differences between the predicted values and the actual values of the target variable
                    * gradient descent
                    * regularization
        * **logistic regression** (actually classification technique)
          > classification technique - s-curve to get probability between 0 and 1 of class
            * has regression in its name bc its similarity to the linear regression technique.
            * creates an logarithmic, s-curve to map a probability of one classification or another.
            * uses probability and therefore outputs a value between 0 and 1 and not discrete output
        * **decisions tree**
          > classification technique
            * tree structure where leaves are the classifications and subtrees are a combination of features of the classes.
            * Path in the tree explains the decision making process.

        * **support vector machine**
          > separate data by a (hyper)plane to create classes. Kernel functions for non-linear data
            * **support vectors**
              > data points
            * find data points (support vectors) that are on the inner edges of the categories
            * create a hyper plane in between the data points so that you can easily evaluate new data against plane
            * **margin**
              > distance between each support vector and the hyperplane
            * **marginal maximum classifiers**
               > (hyperplanes that are equal distance from support vectors) are sensitive to outliers
            * allow misclassification to create hyperplane that is less sensitive (higher bias) performs better against new data (low variance)
            * don't allow misclassification we have lower bias, but performs poorly with new data (higher variance)
            * allowing misclassification re-brands margins as **soft margins** to avoid a regular margin from having bias.
            * how do we pick the best soft margin? **cross validation** minimizes the number of misclassifications maximize properly classified observations in the soft margin

        * Naive bayes classifier (implantation of Bayes optimal classifier)
            * classifies by input data by first determining the probabilities of classes and probabilities of features of input data from training data.
            * Uses bayes theory to justify multiplying probability input data is in any given class and the probabilities of each of the input data's features are in any given class and picks the classification that had the highest probability.
            * Absence of occurrences of a feature from a class in training data could lead to a historic probability of zero which would likely misclassify new input data since zero time anything is zero.

        * Ensemble Machine Learning Algorithms
            > combination of algorithms and techniques
            * types
                * Bayes optimal classifier (theory not algo)
                * Bayesian model combination
                * bucket of models
                * stacking
                * remote sensing
* Model Evaluation
  * we want metrics to express how effective our model is. Accuracy alone is not sufficient because it can be biased toward one class if the training data is imbalanced and contains significantly more samples from one class than another.
  * Regression Metrics
    * **Mean absolute error (Mae)**
      > Quantifies accuracy of predications by calculating on average how far off your prediction was 
    * **Mean square error (Mse)**
      > Tells you Mae, but also takes into account how far apart your guesses were from each other
    * **Root mean square error (Rmse)**
      > Tells same thing as Mse, but in the same units as the original measurement to make it easier to understand (by dropping the squared portion of mse)
    * **Root mean square logarithm error (Rmsle)**
      > Same as rmse but used on very large and small numbers since computing their differences result in small values in comparison to the overall size of the operands. Applying the logarithm before calculating error makes differences more meaningful.
    * **R&sup2;** (coefficient of determination)
      > fitness function of the best-fit curve. Measures how well the model fits the training data, but it doesn't tell us how well the model will generalize to new data

      * r&sup2; approaches 1 means data close to curve

      * r&sup2; approaches 0 means data far from curve

      * r&sup2; = 1 - (SSR - SSTO)

      * As the number of predictors increases, the value of sum of squared residuals tends to decrease because the model has more parameters to fit the data closely. This makes the model more flexible and able to capture more of the variability in the data. However, the value of total sum of squares remains the same regardless of the number of predictors, because it measures the total variability in the data, which is not affected by the number of predictors.
        > As a result, as the number of predictors increases, the value of r&sup2; tends to increase as well, even if the additional predictors don't actually improve the model's ability to predict the outcome variable

    * **Adjusted R&sup2;**
      > addresses over-fitting issue introduced by R&sup2; metric by adjusting the r&sup2; value based on the number of predictors in the model.
    * **Variance**
      > Quantifies how accurate the prediction is, but unlink Mae it measure how scattered the data points are relative to the best-fit line
    * Mae vs variance
      > both measure accuracy. magnitude variability respectively
    * **Akaike’s Information Criteria (AIC)**
      > compares models to pick best one by balancing how well it fits data with how many variables it uses.

      > trade-off between model fit and model complexity
    * **Bayesian Information Criterion (BIC)**
      > same intention as AIC, but may perform better with larger data sets and doesn't assume one of the known models being compared is the actual best. 

      > trade-off between model fit and model complexity
    * **Amemiya’s Prediction Criterion (ACP)** (/Press/R&sup2;-Predicted)
      > focused on predictive accuracy

      > trade-off between model fit and predictive ability

  * Classification Metrics (Confusion Metrics)
    
    |  | Predicted Positive | Predicted Negative |
    | -------- | -------- | -------- |
    | Actual Positive | **True Positive** | False Negative |
    | Actual Negative | False Positive | **True Negative** |

    * **accuracy**
      > true positives + true negatives / (all samples)

      > actual positive labels = true positives + false negatives
      
      > actual negative labels = false positives + true negatives
    * **true positive rate**
      > ratio of correctly predicted positive labels with actual positive labels. TP: (TP + FN)
    * **false negative rate**
      > ratio of incorrectly predicted positive labels with total actual positive labels FN: (TP + FN)
    * **true negative rate**
      > ratio of correctly predicted negative labels with actual negative labels. TN : (TN + FP)
    * **false positive rate**
      > ratio of incorrectly predicated negative labels with actual negative labels. FP : (FP + TN)
    * **Precision**
      > Ratio of positive samples predicted correctly with all predicted positive samples. Used when you can't afford false positives. TP : (TP + FP)
    * **recall**
      > Ratio of positive samples predicted correctly with all actual positive samples. TP : (TP + FN)

    * precision-recall tradeoff