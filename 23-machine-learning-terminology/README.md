# Machine Learning 101

This repository explores supervised and semisupervised machine learning techniques.

## Techniques

Linear regression, K-nearest neighbor (KNN), support vector machines (SVM), decision trees and multi-layer perceptron (MLP) are all supervised learning algorithms which means they learn from labeled data. This post will review how the application domain, characteristics of an algorithm, and the characteristics of a data set can guide the selection of a suitable algorithm.

## Characteristics of Data set
Before we proceed with comparing algorithms let us establish a ubiquitous understanding of the characteristics of data sets commonly encountered in an application domain. Data sets are represented as a matrix where the rows correspond to instances or observations and the columns correspond to features about each instance. The ideal number of features and instances may differ depending on the algorithm selected due to considerations such as the risk of overfitting caused by a larger feature set, the computational complexity associated with a larger data set, or the storage limitations imposed by a larger data set. Some features may have missing values due to data collection errors, limitations in the data collection system, or lack of participation from the data producer. Some algorithms are resilient to missing data whereas others require preprocessing to either remove instances with missing feature values or produce imputed values to replace the missing values with estimated values. One of the columns represents a unique feature that the algorithm is predicting known as the target feature. When the distribution of target feature values is unevenly distributed the data set is known as imbalanced. This occurs when there is a significant disproportion between the number of instances in different ranges of numeric values or classes. Some algorithms are resilient to imbalanced data sets while others require preprocessing techniques to balance an imbalanced data set. Separability refers to characteristic of the data set where every instance of a particular class can be separated from every other instance of a differing class by a simple geometric shape such as a line, plane, hyperplane, or a more complex shape like a curve. Linear separability refers to a data set that can be separated exclusively by a line or hyperplane. Some algorithms classify using a linear combination of the features and require linear separability in the data set while others are suitable for non-linear relationships between the features. Feature correlation indicates associations between two features and measures how changes in one feature are related to changes in another feature. Highly correlated features that are not the target feature may be redundant. Instance dependencies refer to the relationship between two instances instead of the relationship between two features and examine how the values of one instance may be influenced by values of another instance. Instance dependencies often arise in time series data and hierarchical structures. Outliers are instances that significantly deviate from the distribution of the data set and can deeply impact the prediction of some models, while others are less influenced. Outliers may indicate anomalies or rare events. Similarly, noise in the data set refers to variations in the data that do not follow a specific pattern that may indicate data collection issues or inherit randomness in the application domain. Features may have various scales or ranges of values due to the unit of measurement used or inherit differences in the features being measured. Some algorithms require features' values to be normalized to prevent certain features from dominating the prediction process while others are less influenced by differing feature scales. In addition to the scale of the feature values, features may contain various data types such as numeric or categorical data.

## Characteristics of Model
Before we delve into comparisons, let us review characteristics of the algorithm or model that can inform model selection. Supervised learning algorithms are categorized into regressors and classifiers. Regressors predict a continuous, numeric value based on the relationship between the independent variable and the features. Classifiers predict a discrete class that separates instances into mutually exclusive categories. Some algorithms are regressors while others can perform classification and regression. Interpretability refers to the depth of our ability to explain how a model arrived at a prediction. Some algorithms precisely provide an explanation while others are completely incapable of revealing to a human the justification for the prediction. Sensitivity to noise, outliers, number of features, missing data can inform algorithm selection if the characteristics of the data set are known. Preprocessing requirements such as data imputation and categorical feature value encoding are required by some algorithms and not others. Scalability refers to the ability to handle larger data sets efficiently due to computational requirements. The time complexity of the training phase and the prediction phase can be expressed separately in big O notation to describe the growth rate of an algorithm's time complexity as the size of the data set increases. In addition to time complexity, the space complexity of the training phase and prediction phase can be expressed in big O notation to describe the growth rate of an algorithm's storage requirements as the size of the data set increases.

## Linear Regression
Unlike KNN, SVM, decision trees, and MLP, linear regression is a regressor. Regressors predict a continuous, numeric value instead of a discrete classification. For example, predicting the sales, in U.S. dollars, of a product based on features such as advertising budget, price, and competitor's price. When there is one dependent variable it is commonly referred to as simple linear regression and can be expressed using the equation: `h = θx + c`. When there is more than one feature it is commonly referred to as multiple regression and can be expressed using the equation: `h = θ₁x₁ + θ₂X₂ + ... + θₘXₘ`. The equations represent a line and a geometric plane that exist in n-dimensional space, known as a hyperplane, respectively. Linear regression requires a linear relationship between the dependent variable and the features, no dependencies between instances and no feature correlation. The distribution of errors should be the same across all intervals of the independent variables and normally distributed. Linear regression is highly interpretable since we can use the coefficients to precisely understand the impact of each feature on the prediction. Linear regression is sensitive to outliers that distort the hyperplane but can be mitigated with techniques like random sample consensus.

Time complexity of the training phase is O(nd²) where n is the number of instances and d is the number of features since computing the coefficients requires matrix multiplication. If gradient descent is applied, it can marginally increase the complexity to O(knd²) where k is the number of iterations. Once the model is developed, the prediction phase is computationally inexpensive and can be expressed as O(d) since the prediction involves summing the products of the features and coefficients. Linear regression memory usage is proportional to the number of instances in the data set represented by O(n). Therefore, linear regression is highly scalable to large data sets.

While linear regression is not designed to classify, we can use a related linear regression technique called logarithmic regression to perform binary classification and it can be represented with the formula: `h = 1 / (1 + e^-(θ₁x₁ + θ₂X₂ + ... + θₘXₘ))`. When classifying using a line or hyperplane we refer to the plane as a decision boundary since an instance's relative position to it designates its class. Like linear regression, logarithmic regression is highly interpretable for the same reason and requires a linear relationship between the dependent variable and features.

## K-Nearest Neighbor
KNN can be a classifier or a regressor. Unlike linear regression this technique cannot be expressed with a specific formula. The algorithm chooses a value of k that represents the number of nearest instances to a new observation, determines k instances, known as neighbors, with the shortest distance from the new observation using a distance computation such as Euclidean distance, and assigns the new observation with either a class that is most common with its k neighbors when performing classification or the average value among the k neighbors when performing regression. For example, KNN can be used to segment customers into categories like break-even customers and profitable customers based on features like number of employees, location, and earnings before interest, taxes, depreciation, and amortization (EBITDA). Like linear regression, KNN can also be used to regress. For example, predicting the cost of a house based on features like its location, square footage and age would be a good application of KNN regression. Unlike linear regression, KNN does not require a linear relationship between the independent variable and the features. Although KNN and linear regression can both be used to regress, linear regression provides more interpretability since we can use the coefficients to understand the impact of each feature on the prediction more precisely. KNN is more favorable for classification than logarithmic regression when there is a non-linear relationship between the features and the dependent variable since KNN makes no assumptions about the distribution of data. KNN is sensitive to outliers but can be mitigated by increasing the value for k. Like SVM, KNN is favorable when the boundary between classes is not a simple regular geometric shape like a line, but instead something more complex like a curve or irregular shape.

Unlike the other algorithms, KNN is considered a lazy learning algorithm because the training phase does not involve computations or parameter estimation. Instead, KNN is non-parametric and stores the entire data set in memory to be used during the prediction phase. Therefore, the computational complexity is during the prediction phase. Time complexity of the prediction phase is O(n log n + d) where d is the number of features, n is the number of instances, and k is the number of neighbors to compare. To assign an instance to a neighborhood the distance between the instance and every other instance must be calculated for each feature, the distances must be sorted to determine which are shortest, and lastly the mode must be calculated of the k shortest distances to determine the most common neighborhood. Distance computations are relative to number of features, sorting is typically n log n, and mode computations are relative to number of k. KNN stores distances for each feature and the nearest neighbors in addition to storing the entire training data in memory. Storing the data set requires O(n*d) space where n is the number of data points and d is the number of features. Storing the distances requires O(d) where d is the number of features. Storing the nearest neighbors requires O(k) where k is the number of neighbors. In total, KNN requires O(n*d + d + k)

## Support Vector Machine

SVM can be a classifier or a regressor where instances are separated by hyperplanes. The algorithms attempt to select hyperplanes that maximally separate the instances while minimizing distance between the hyperplane and the nearest data point. Like KNN, SVM uses the concept of nearest distance, however SVM minimizes the distance between hyperplane and instances whereas KNN minimizes the distance between instances. SVM uses a decision boundary, however the hyperplane used as a decision boundary can be non-linear. Separating instances using non-linear boundaries is due to applying a kernel function to all instances, creating a new vector that warps them into a higher-dimensional space. In addition to providing non-linear separability, the application of the kernel function contributes to the SVM being able to handle larger number of features when coupled with minimizing the distance of instances from the hyperplanes, focusing on the instances closest to the hyperplane, and the incorporation of a regularization term to control the complexity of the model that reduces overfitting. Focusing on the optimal hyperplane makes SVM the least sensitive to outliers except in cases where an outlier is positioned close to the hyperplane. SVM is suitable for problems with many features like image classification and sentiment analysis due to its capability to handle many features without overfitting. SVM is more interpretable than KNN, but less interpretable than linear regression. The coefficients of the hyperplane provide some indicate the importance of each feature in separating classes, however the kernel function obfuscates the interpretation whereas the coefficients in linear regression indicate the impact of a feature more precisely. SVM is more resilient to outliers than linear regression when performing regression on linearly separable data set. SVM can be represented by h = sign(Σ αᵢ yᵢ K(x, xᵢ) + b) where K(x, xᵢ) denotes the kernel function that computes the similarity between two instances. SVM optimizes αᵢ and b in the training phase and applies the sign function to the decision value that is determined by the weighted sum of the kernel function.

SVM has a higher time complexity than alternative supervised learning techniques due to the application of the kernel function for every combination of two data points in addition to the number of possible pairwise feature interactions. As the number of features increases the number of feature interactions grows exponentially. Therefore, the time complexity is O(n * d^2) where n is the number of data points and d is the number of features. The time complexity has a direct impact on the ideal data set size since training the model may become computationally expensive and time consuming for large data sets. 

SVM must store the support vectors which is a subset of the training instances. The space complexity of storing the support vectors is O(md) where m is the number of support vectors and d is the number of features.

## Decision Trees

Decision trees use the values of an instance's features to partition the data into classes. The name is derived from the mathematical tree structure used to represent the model. The terminal nodes in the tree, also known as the leaves, contain a set of instances whose majority class or mean value can be used to make a prediction. Each node represents a condition based on a specific feature and a threshold value. Data points are split into different branches based on the evaluation of the condition until arriving at the leaf node. Decision trees are suited for problems that can be represented by a hierarchical set of conditions. For example, classifying fraudulent charges using features like cardholder location at time of transaction, transaction amount, merchant category, and usage patterns. Conditions are arranged hierarchically because the evaluation of a condition in isolation is not as predictive as the combination of conditions. For example, a large transaction amount that deviates from typical transaction amounts may not be significant if the merchant category is for airfare coupled with spending patterns that justify historical airfare transactions near the holiday season. Alternatively, several small transaction amounts that do not deviate from the typical transaction amount may be significant if the merchant category is known to have a higher likelihood of fraudulent activity such as adult entertainment. Like SVM and linear regression and unlike KNN, decision trees are highly interpretable since the path to a leaf node in the tree structure can be used to explain how features are used to make predictions. Unlike SVM, decision trees are more prone to overfitting data sets with many features. In addition, decision trees that grow too deep and over fit can be avoided by limiting the depth of the tree. Unbalanced trees can be created by outliers that produce poor branching criteria which makes decision trees sensitive to outliers. Unlike the other algorithms that require encoding categorical features and into numeric values, decision trees can natively handle categorical features because the appropriate comparison operation can be used for a specific data type when evaluating a condition in the tree. Similarly, data sets are not preprocessed to address data points with missing feature values, as the comparison operation can handle null values without the need to drop data points or replace missing values with imputed values. KNN and SVM are inherently less capable at handling imbalanced data sets than decision trees. KNN can be biased to the majority class if the majority class dominates a neighborhood. SVM indiscriminately maximizes the margin between classes which may or may not favor a majority class. Decision trees on the other hand can prioritize conditions that create branching that separates minority class instances. In addition to fine tuning the branching conditions, the calculations in the leaf nodes that determine the class, known as the decision thresholds, can be tuned to favor the minority class.

The training phase has a runtime complexity of O(n * d * log(n)) to construct the tree, n represents the number of instances, d represents the number of features and where log(n) represents the depth of the tree. Additional runtime complexity may be needed to optimize the generalization capabilities of the tree by pruning branches that may lead to overfitting. During the prediction phase, the runtime complexity is O(log(n)) to account for traversing the tree to arrive at a prediction. Decision trees need to store the branching condition, the feature being evaluated, and the class distribution for each node in the tree. Therefore, it requires O(n) storage where n is the number of nodes in the tree.

## Multi-layer perceptron

A single layer perceptron (SLP) is the simplest form of a neural network. Establishing an understanding of a SLP can be beneficial to understanding an MLP. Both can be represented as a directed acyclic graph (DAG.) A DAG is a mathematical structure consisting of nodes connected by directed edges. DAGs contain no cycles meaning you cannot start at a node and follow the directed edges to the same node. The directed edges constrain which direction connected nodes can be traversed. An SLP consists of an input layer of nodes, called neurons, that each accept a set of input values, applies weights to the values. Every node in the input layer is connected to every node in the output layer with an associated weight to determine the importance of each value provided to nodes of the output layer. Data flows from the input layer to the output layer, but never from the output layer to the input layer because the directed edges only allow traversal in one direction and the absence of cycles ensures nodes in the output layer are never connected to nodes in the input layer via a directed edge in the opposite direction. Like linear regression, SLPs compute a linear combination of inputs and weights. However, an activation function transforms the weighted sum of the inputs of the output layer to apply a threshold to separate classes or learn non-linear relationships in the data. MLPs consist of multiple layers such that each layer is connected to a subsequent layer. The input and output layers are transitively connected through zero or more layers called hidden layers. The term is used because these layers cannot be observed from the input or output of the model. Providing additional layers allows the model to learn "higher-level" features formed through a process called hierarchical representation learning. The initial hidden layers, known as the lower-level layers, identify local patterns in an instance. As the data flows to the subsequent layers, called the higher-level layers, combinations of local patterns learned in the previous layers allow new, more complex features to emerge. The ability to learn non-linear relationships in data sets and learn higher-level features makes MLP well suited for image classification. For example, classifying images of handwritten letters into the classes A-Z by providing the binary data of the image as inputs. Images consist of a specific arrangement of pixels to form patterns we recognize; however, these structures are not easily represented by linear relationships. Learning the complex patterns formed from a specific arrangement of pixel can be accomplished by using lower-level features like edges to develop higher-level features like shapes and structures. Unlike linear regression and decision trees, MLPs have low interpretability and are hard to explain how a prediction is arrived at because it requires considering the data flow through every path in the graph. The number of combinations and the processing applied at each layer makes it a difficult task. While all algorithms are susceptible to overfitting, MLPs are prone to overfitting when the data set is small, or the number of parameters grows large. MLPs are sensitive to outliers. Regularization techniques can be used to mitigate overfitting and outliers. Reducing the weights of outliers can make them less influential in mitigating their impact. Reducing the weights to zero effectively eliminates a feature reducing the complexity of the model that leads to overfitting. 

The training phase of MLPs has a high time complexity of O(ndhw) where n is the number of instances, d is the number of features, h is the number of hidden layers, and w is the number of weights. The weights must be adjusted which requires forward and backward propagation of data through the layers. The prediction phase has a smaller runtime complexity of O(ndh) where n is the number of instances, d is the number of features, h is the number of hidden layers. Data flows through the network and back propagation is not needed to adjust the weights since they are fixed.

The training phase of MLPs has a space complexity of O(nhw) where n is the number of instances, h is the number of hidden layers, and w is the number of weights. Weights and intermediate values to adjust weights for every neuron must be stored. Optimizations to share weights or represent sparse graphs can be applied. The prediction phase of MLPs has a space complexity of O(hw) where h is the number of hidden layers, and w is the number of weights.

## Matrix Terminology

Vector
> table of data with one row

Scalar Multiplication
> multiply a single value to every member of the table

Matrix
> table of data

Matrix Equality
> every cell is equal in each matrix

Dimensions
> k-by-1 column vector
>
> 1-by-k row vector

Addition
> requires same dimensions
>
> add corresponding elements

Multiplication
> dimension constraint: **column count A === row count B**
>
> A\*B != B\*A (not communicative)
>
> m-by-p * p-by-n = m-by-n

Identity Matrix I<sub>m</sub>
> All 0s with southeast diagonal of 1s
>
> (multiplication is communicative for this matrix)
>
> any matrix A * I<sub>m</sub> = A

Transpose Operation
> A<sup>t</sup>
> 
> swap columns with rows

Elementary Matrix
> identity matrix with exception one column deviates from rule

Dot Product aka scalar product
> tbd

Inverse Matrix
> May not exit
>
> A * A<sup>-</sup> = I<sub>m</sub>
>
> Always unique
>
> If inverse of A and B exist then (AB)<sup>-</sup> exists
>
> (B<sup>-</sup>)<sup>-</sup> = B
>
> If inverse of B exists then B<sup>t</sup> exists

## Confusion Matrix
our system is trying to identify cats. A cat is a positive and a dog is a negative

|     | cat     | dog     |
| --- | ------- | ------- |
| cat | 42 (TP) | 8 (FN)  |
| dog | 18 (FP) | 32 (TN) |

## How to evaluate model:

### accuracy
> (TP + TN) / (TP + TN + FN + FP)
>
> how many accurate identifications versus count of all data points

### recall
  > TP / (TP+FN)
  >
  > How many correctly identified positives relative to all guesses at positive identification
  >
  > How many times did it say it would be a cat and it was actually a cat versus how many times it said it would be a cat and it was a actually a cat or a dog

### precision
  > TP/(TP+FP)
  >
  > How many correctly identified positives across all the times the model identified as positive
  >
  > How many times did it say it would be a cat and it was a cat versus how many times it said it would be a cat and it was actually a cat and how many times it said it would be a dog and it as actually a cat

## Accuracy paradox

|         | spam   | not spam |
| ------- | ------ | -------- |
| spam    | 4 (TP) | 1 (FN)   |
| no spam | 4 (FP) | 91 (TN)  |

  accuracy: (91 + 4) / (4 + 4 + 1 + 91) = 95/100 = .95  
  precision: 4 / (4 + 4) = 4 / 8 = .5  
  recall: 4 / (4 + 1) = 4 / 5 = .8  

|         | spam   | not spam |
| ------- | ------ | -------- |
| spam    | 0 (TP) | 5 (FN)   |
| no spam | 0 (FP) | 95 (TN)  |

accuracy (0 + 95) / (0 + 5 + 0 + 95) = 95/100 = .95  
precision: 0 / (0 + 0) = 0 = 0  
recall: 0 / (0 + 5) = 0 = 0  


both examples have the same accuracy but the second model NEVER identifies spam and is essentially useless.
This demonstrates why accuracy can not be used as the sole metric for performance

accuracy !== performance