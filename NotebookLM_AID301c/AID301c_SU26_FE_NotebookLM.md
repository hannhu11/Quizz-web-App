# 📘 AID301c SU26 FE - Đề Thi Thật Mới Nhất (50 Câu Chuẩn Có Đáp Án & Giải Thích)

> **Mô tả tài liệu**: Đề thi thật kỳ SU26 lần 1 bao quát chuyên sâu Kubernetes (Kubelet, Deployments), Docker, Spark, Design Thinking (Empathize, Define), Watson ML và NLP.
> **Môn học**: AID301c - Trí Tuệ Nhân Tạo (IBM AI Enterprise Workflow Specialization)
> **Tổng số câu hỏi**: 50 câu

---

### ❓ Câu hỏi 1:
Product 2 and then compiled their ages:
p1_ages = [25., 32., 20., 18., 28., 32., 31., 19., 34., 34., 23., 29., 17., 23., 25., 31., 32., 29., 29., 24., 22., 28., 26., 24., 23.]
p2_ages = [20., 25., 27., 19., 22., 26., 24., 27., 24., 20., 25., 28., 18., 19., 23., 28., 19., 19., 19., 25., 29., 26., 23., 23., 22.]
Of the hypothesis test discussed in these contents what one is the most appropriate for testing the following hypothesis?
There is no age difference, on average, between the users of product 1 and the users of product 2

**Các phương án lựa chọn:**
- [ ] A. A 1-sample t-test
- [ ] B. A 2-sample t-test assuming equal variance
- [ ] C. Z-Test with continuity correction
- [x] **D. A 2-sample unequal variances t-test** *(Đáp án chính xác)*
- [ ] E. Binomial Test

👉 **Đáp án đúng:** **D. A 2-sample unequal variances t-test**
💡 **Giải thích chi tiết:** To compare the means of two independent sample groups (Product 1 vs Product 2) without assuming equal population variances, Welch's 2-sample unequal variances t-test is the most appropriate statistical hypothesis test.

---

### ❓ Câu hỏi 2:
Which component is responsible for ensuring that applications are healthy and running in worker nodes?

**Các phương án lựa chọn:**
- [ ] A. Kubernetes Master
- [x] **B. Kubelet** *(Đáp án chính xác)*
- [ ] C. API Server
- [ ] D. Deployment

👉 **Đáp án đúng:** **B. Kubelet**
💡 **Giải thích chi tiết:** Kubelet is the primary node agent that runs on each worker node in a Kubernetes cluster, responsible for ensuring that the containers described in PodSpecs are running and healthy.

---

### ❓ Câu hỏi 3:
Which of the following best describes multiclass classification?

**Các phương án lựa chọn:**
- [ ] A. Each sample can have multiple labels.
- [x] **B. Each sample is assigned to only one label.** *(Đáp án chính xác)*
- [ ] C. It is limited to two classes only.
- [ ] D. It does not require any evaluation metrics.

👉 **Đáp án đúng:** **B. Each sample is assigned to only one label.**
💡 **Giải thích chi tiết:** In multiclass classification, classification tasks have more than two classes, but each input instance is assigned to exactly one mutually exclusive class/label.

---

### ❓ Câu hỏi 4:
Where should you store your API key and sensitive information?

**Các phương án lựa chọn:**
- [ ] A. In a publicly accessible file
- [x] **B. On a machine you trust in a secure file** *(Đáp án chính xác)*
- [ ] C. In a shared document
- [ ] D. In the cloud without encryption

👉 **Đáp án đúng:** **B. On a machine you trust in a secure file**
💡 **Giải thích chi tiết:** API keys and sensitive credentials should always be stored securely on trusted machines in protected environment variables or secure configuration files, never in public repositories or unencrypted cloud storage.

---

### ❓ Câu hỏi 5:
A typical convolutional neural network is constructed using a combination of convolutional, pooling and dense layers.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Standard CNN architectures feature convolutional layers for feature extraction, pooling layers for spatial downsampling, and dense (fully connected) layers for final classification.

---

### ❓ Câu hỏi 6:
Which of the following is not an example of a variant/application of gradient descent that we have covered?

**Các phương án lựa chọn:**
- [ ] A. batch gradient descent
- [ ] B. mini-batch gradient descent
- [x] **C. regularized gradient descent** *(Đáp án chính xác)*
- [ ] D. stochastic gradient descent
- [ ] E. gradient descent applied to regression

👉 **Đáp án đúng:** **C. regularized gradient descent**
💡 **Giải thích chi tiết:** The standard variants of gradient descent algorithms are Batch Gradient Descent, Stochastic Gradient Descent (SGD), and Mini-batch Gradient Descent. 'Regularized gradient descent' refers to regularization applied to loss functions rather than a distinct optimization variant.

---

### ❓ Câu hỏi 7:
What is the purpose of Exploratory Data Analysis (EDA)?

**Các phương án lựa chọn:**
- [ ] A. To clean the data
- [x] **B. To create summaries and visualizations of the data** *(Đáp án chính xác)*
- [ ] C. To build predictive models
- [ ] D. To gather raw data

👉 **Đáp án đúng:** **B. To create summaries and visualizations of the data**
💡 **Giải thích chi tiết:** EDA is primarily used to understand data distributions, detect anomalies, discover patterns, and summarize main characteristics through statistical summaries and visual graphs.

---

### ❓ Câu hỏi 8:
Which of the following was not discussed as a tunable parameter of a neural network?

**Các phương án lựa chọn:**
- [x] **A. Hardware availability** *(Đáp án chính xác)*
- [ ] B. Activation functions: sigmoid, tanh, softmax, ReLU, leakyReLU
- [ ] C. Regularization techniques: weight decay, early stopping, dropout
- [ ] D. Training method: Loss function, learning rate, batch size, number of epochs
- [ ] E. Structure: the number of hidden layers, the number of nodes in each layer

👉 **Đáp án đúng:** **A. Hardware availability**
💡 **Giải thích chi tiết:** Hardware availability is an infrastructure/system resource constraint, not an architectural or training hyperparameter of neural networks.

---

### ❓ Câu hỏi 9:
Which of the following best describes the focus of this course?

**Các phương án lựa chọn:**
- [ ] A. Strict adherence to a specific process model
- [x] **B. Incorporating best practices into the workflow** *(Đáp án chính xác)*
- [ ] C. Learning only from data science literature
- [ ] D. Avoiding any structured approach

👉 **Đáp án đúng:** **B. Incorporating best practices into the workflow**
💡 **Giải thích chi tiết:** The IBM AI Enterprise Workflow course focuses on incorporating industry best practices, design thinking, and modular workflows into production data science.

---

### ❓ Câu hỏi 10:
What is a common approach used by classifiers that default to a one-vs-all strategy?

**Các phương án lựa chọn:**
- [ ] A. A single classifier is trained for all classes.
- [x] **B. A different classifier is trained for each label.** *(Đáp án chính xác)*
- [ ] C. All classes are treated as one single class.
- [ ] D. It is not applicable to multiclass classification.

👉 **Đáp án đúng:** **B. A different classifier is trained for each label.**
💡 **Giải thích chi tiết:** In a One-vs-All (One-vs-Rest) strategy, N separate binary classifiers are trained, each distinguishing one specific class against all other remaining classes.

---

### ❓ Câu hỏi 11:
Which of the following best describes Continuous Deployment?

**Các phương án lựa chọn:**
- [ ] A. Manual deployments of software
- [x] **B. Automated deployments of software** *(Đáp án chính xác)*
- [ ] C. Merging changes infrequently
- [ ] D. Extensive testing before deployment

👉 **Đáp án đúng:** **B. Automated deployments of software**
💡 **Giải thích chi tiết:** Continuous Deployment is a software release process where any code commit that passes the automated testing pipeline is automatically deployed to production without manual intervention.

---

### ❓ Câu hỏi 12:
Which of the following techniques is commonly used to address class imbalance?

**Các phương án lựa chọn:**
- [ ] A. Over-sampling
- [ ] B. Under-sampling
- [x] **C. Both A and B** *(Đáp án chính xác)*
- [ ] D. None of the above

👉 **Đáp án đúng:** **C. Both A and B**
💡 **Giải thích chi tiết:** Both over-sampling (e.g., SMOTE) and under-sampling (e.g., RandomUnderSampler) are standard resampling methods used to handle imbalanced datasets.

---

### ❓ Câu hỏi 13:
Which of the following can lead to sampling bias?

**Các phương án lựa chọn:**
- [ ] A. Using a larger dataset
- [x] **B. Under-representing certain subgroups in the data** *(Đáp án chính xác)*
- [ ] C. Increasing the number of features
- [ ] D. Using cross-validation

👉 **Đáp án đúng:** **B. Under-representing certain subgroups in the data**
💡 **Giải thích chi tiết:** Sampling bias occurs when the sample collected is not representative of the target population, such as systematically under-representing certain demographics or subgroups.

---

### ❓ Câu hỏi 14:
What does the --executor-memory option specify in the spark-submit command?

**Các phương án lựa chọn:**
- [ ] A. The amount of memory allocated to the driver
- [x] **B. The amount of memory allocated to each executor** *(Đáp án chính xác)*
- [ ] C. The total memory for the Spark application
- [ ] D. The memory required for the script

👉 **Đáp án đúng:** **B. The amount of memory allocated to each executor**
💡 **Giải thích chi tiết:** In Apache Spark, `--executor-memory` specifies the amount of memory allocated to each executor process running worker tasks.

---

### ❓ Câu hỏi 15:
If we continue to add GPUs or other computational resources, the time it takes to train a model will always continue to decrease.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** According to Amdahl's Law and distributed training communication bottlenecks (inter-GPU synchronization overhead), adding more GPUs eventually yields diminishing returns and will not continuously decrease training time indefinitely.

---

### ❓ Câu hỏi 16:
In the design thinking process, what phase are team members currently working on when seeking to deeply understand user perspectives and customer pain points?

**Các phương án lựa chọn:**
- [ ] A. Ideate
- [ ] B. Prototype
- [x] **C. Empathize** *(Đáp án chính xác)*
- [ ] D. Test

👉 **Đáp án đúng:** **C. Empathize**
💡 **Giải thích chi tiết:** The Empathize stage is the foundational first phase in Design Thinking focused on understanding the user, their needs, and the context of their problems.

---

### ❓ Câu hỏi 17:
What is emphasized as important when carrying out data visualization in an enterprise context?

**Các phương án lựa chọn:**
- [ ] A. Speed of execution
- [x] **B. Reproducibility and communication** *(Đáp án chính xác)*
- [ ] C. Complexity of models
- [ ] D. Use of advanced algorithms

👉 **Đáp án đúng:** **B. Reproducibility and communication**
💡 **Giải thích chi tiết:** In enterprise data science, visualization is essential for clear communication to stakeholders and maintaining reproducible analytical workflows.

---

### ❓ Câu hỏi 18:
What is the primary purpose of Natural Language Processing (NLP)?

**Các phương án lựa chọn:**
- [ ] A. To create visual content
- [x] **B. To analyze and understand human language** *(Đáp án chính xác)*
- [ ] C. To develop hardware components
- [ ] D. To manage databases

👉 **Đáp án đúng:** **B. To analyze and understand human language**
💡 **Giải thích chi tiết:** NLP is a subfield of artificial intelligence dedicated to enabling computers to understand, interpret, analyze, and generate natural human language.

---

### ❓ Câu hỏi 19:
Cross-validation along with train-test splits are critical tools to help ensure our models are well calibrated for unseen data.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Train-test splitting and k-fold cross-validation evaluate model generalization and prevent overfitting to ensure robust performance on unseen real-world data.

---

### ❓ Câu hỏi 20:
Which method can be used to compare distributions of data?

**Các phương án lựa chọn:**
- [ ] A. Linear regression
- [x] **B. Kullback-Leibler divergence** *(Đáp án chính xác)*
- [ ] C. Decision trees
- [ ] D. Neural networks

👉 **Đáp án đúng:** **B. Kullback-Leibler divergence**
💡 **Giải thích chi tiết:** Kullback-Leibler (KL) divergence measures the statistical distance and relative entropy between two probability distributions.

---

### ❓ Câu hỏi 21:
Which of the following is a common task during the 'Define' stage?

**Các phương án lựa chọn:**
- [ ] A. Data collection
- [x] **B. Data cleaning and preliminary exploratory data analysis** *(Đáp án chính xác)*
- [ ] C. Model training
- [ ] D. Business opportunity identification

👉 **Đáp án đúng:** **B. Data cleaning and preliminary exploratory data analysis**
💡 **Giải thích chi tiết:** During the Define phase in the AI Enterprise workflow, data scientists formulate data requirements, clean ingested datasets, and conduct preliminary exploratory analysis.

---

### ❓ Câu hỏi 22:
What does ETL stand for in data processing?

**Các phương án lựa chọn:**
- [x] **A. Extract, Transform, Load** *(Đáp án chính xác)*
- [ ] B. Evaluate, Test, Load
- [ ] C. Extract, Transfer, Load
- [ ] D. Evaluate, Transform, Load

👉 **Đáp án đúng:** **A. Extract, Transform, Load**
💡 **Giải thích chi tiết:** ETL stands for Extract (gathering raw data), Transform (cleaning and transforming structure), and Load (storing into data warehouse/target system).

---

### ❓ Câu hỏi 23:
What is the primary goal of the 'Empathize' stage in the data science process?

**Các phương án lựa chọn:**
- [ ] A. To gather data
- [x] **B. To understand business opportunities** *(Đáp án chính xác)*
- [ ] C. To clean the data
- [ ] D. To build a model

👉 **Đáp án đúng:** **B. To understand business opportunities**
💡 **Giải thích chi tiết:** The Empathize stage aims to understand stakeholder objectives, identify customer pain points, and clarify the core business opportunity.

---

### ❓ Câu hỏi 24:
Which of the following is a method used for topic modeling?

**Các phương án lựa chọn:**
- [ ] A. Principal Component Analysis (PCA)
- [x] **B. Latent Dirichlet Allocation (LDA)** *(Đáp án chính xác)*
- [ ] C. Support Vector Machines (SVM)
- [ ] D. K-Means Clustering

👉 **Đáp án đúng:** **B. Latent Dirichlet Allocation (LDA)**
💡 **Giải thích chi tiết:** Latent Dirichlet Allocation (LDA) is a generative statistical model widely used for topic modeling across text corpora.

---

### ❓ Câu hỏi 25:
During which phase of the design thinking process does AAVAIL move to define challenges?

**Các phương án lựa chọn:**
- [ ] A. Empathize
- [x] **B. Define** *(Đáp án chính xác)*
- [ ] C. Ideate
- [ ] D. Prototype

👉 **Đáp án đúng:** **B. Define**
💡 **Giải thích chi tiết:** In Design Thinking, formulating problem statements, articulating hypotheses, and scoping core challenges occur in the 'Define' phase.

---

### ❓ Câu hỏi 26:
Which file format is commonly used for storing structured data in a tabular format?

**Các phương án lựa chọn:**
- [ ] A. JSON
- [ ] B. XML
- [x] **C. CSV** *(Đáp án chính xác)*
- [ ] D. TXT

👉 **Đáp án đúng:** **C. CSV**
💡 **Giải thích chi tiết:** Comma-Separated Values (CSV) is the most standard, lightweight format for storing tabular structured data.

---

### ❓ Câu hỏi 27:
Which tool is mentioned as an industry standard in the Python ecosystem for data science?

**Các phương án lựa chọn:**
- [ ] A. RStudio
- [x] **B. Jupyter notebooks** *(Đáp án chính xác)*
- [ ] C. Spyder
- [ ] D. Tableau

👉 **Đáp án đúng:** **B. Jupyter notebooks**
💡 **Giải thích chi tiết:** Jupyter Notebooks provide an interactive, reproducible environment that serves as an industry standard for data science exploration.

---

### ❓ Câu hỏi 28:
What is Port Forwarding in Docker?

**Các phương án lựa chọn:**
- [ ] A. The process of creating a data file on the local computer that persists after the container is closed
- [ ] B. Sending one container to multiple nodes on a multi-cloud environment
- [x] **C. Allowing data to be passed in and out of a docker container and controlling which applications can do this** *(Đáp án chính xác)*
- [ ] D. Building one Docker image using another docker image as a template

👉 **Đáp án đúng:** **C. Allowing data to be passed in and out of a docker container and controlling which applications can do this**
💡 **Giải thích chi tiết:** Port forwarding (port mapping) in Docker binds a port on the host machine to a port inside the container, directing network traffic into containerized applications.

---

### ❓ Câu hỏi 29:
What does a Docker container include?

**Các phương án lựa chọn:**
- [ ] A. Only the application code
- [x] **B. Code, runtime libraries, and a private filesystem** *(Đáp án chính xác)*
- [ ] C. Only the operating system
- [ ] D. Only the database

👉 **Đáp án đúng:** **B. Code, runtime libraries, and a private filesystem**
💡 **Giải thích chi tiết:** A Docker container packages application code, runtime environment, system libraries, configuration, and an isolated filesystem layer.

---

### ❓ Câu hỏi 30:
Which of the following is a common use case for NLP in large enterprises?

**Các phương án lựa chọn:**
- [ ] A. Managing financial transactions
- [x] **B. Processing and analyzing customer feedback** *(Đáp án chính xác)*
- [ ] C. Designing physical products
- [ ] D. Conducting scientific experiments

👉 **Đáp án đúng:** **B. Processing and analyzing customer feedback**
💡 **Giải thích chi tiết:** Enterprises heavily utilize NLP for sentiment analysis, customer review mining, survey processing, and automated ticket classification.

---

### ❓ Câu hỏi 31:
You may only pass a pickle file to save your model in the Watson Machine Learning library.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Watson Machine Learning supports saving and deploying models in multiple formats including PMML, ONNX, joblib, TensorFlow SavedModel, tar.gz archives, and Scikit-learn pipelines.

---

### ❓ Câu hỏi 32:
What is the purpose of the spark-submit command?

**Các phương án lựa chọn:**
- [ ] A. To create a Spark cluster
- [x] **B. To submit applications to a Spark cluster** *(Đáp án chính xác)*
- [ ] C. To monitor Spark jobs
- [ ] D. To install Spark

👉 **Đáp án đúng:** **B. To submit applications to a Spark cluster**
💡 **Giải thích chi tiết:** `spark-submit` is the command-line utility used to launch and submit applications/scripts to an Apache Spark cluster.

---

### ❓ Câu hỏi 33:
Which tasks should be included in a data ingestion pipeline? (Choose one or more)

**Các phương án lựa chọn:**
- [x] **A. Account for missing data, faulty data, repeated observations and other data integrity issues** *(Đáp án chính xác)*
- [x] **B. Ensure that expected data is returned given a specific set of parameters** *(Đáp án chính xác)*
- [x] **C. Ensure that an expected format is returned** *(Đáp án chính xác)*
- [ ] D. Ensure that models produce expected results

👉 **Đáp án đúng:** **A. Account for missing data, faulty data, repeated observations and other data integrity issues**, **B. Ensure that expected data is returned given a specific set of parameters**, **C. Ensure that an expected format is returned**
💡 **Giải thích chi tiết:** Data ingestion pipelines focus on data acquisition, schema validation, deduplication, and anomaly handling. Evaluating model output results belongs to model testing/evaluation.

---

### ❓ Câu hỏi 34:
Which of the following best describes the quality of data?

**Các phương án lựa chọn:**
- [ ] A. It only refers to the data collection methods.
- [x] **B. It includes both the observations and the maturity of the data** *(Đáp án chính xác)*
- [ ] C. It is irrelevant to project success.
- [ ] D. It is solely determined by the data storage system.

👉 **Đáp án đúng:** **B. It includes both the observations and the maturity of the data**
💡 **Giải thích chi tiết:** Data quality encompasses observational accuracy, completeness, consistency, and data maturity across lifecycle management.

---

### ❓ Câu hỏi 35:
Which list contains one or more elements that were presented as non-essential when creating a logging system to monitor the performance of a machine learning model that has been deployed.

**Các phương án lựa chọn:**
- [ ] A. request_type, input data
- [ ] B. model_version_number, timestamp
- [ ] C. predictions/recommendations, timestamp
- [x] **D. input_data_summary, runtime** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. input_data_summary, runtime**
💡 **Giải thích chi tiết:** In standard production model logging, essential fields are timestamp, unique request ID, model version, raw inputs, and predictions. Aggregated data summaries and exact runtime are optional/secondary.

---

### ❓ Câu hỏi 36:
Which of the following lists contains one or more references to a technology that is not a specific python package used to speed up and improve the performance of python code?

**Các phương án lựa chọn:**
- [ ] A. py-cuda, Cython
- [ ] B. multiprocessing, mpi4py
- [x] **C. subprocessing, symmetric-multiprocessing** *(Đáp án chính xác)*
- [ ] D. threading, ipyparallel

👉 **Đáp án đúng:** **C. subprocessing, symmetric-multiprocessing**
💡 **Giải thích chi tiết:** Symmetric Multiprocessing (SMP) is a computer hardware system architecture, not a specific Python software library.

---

### ❓ Câu hỏi 37:
Let's imagine there is a start-up that has a speech-to-text service that incorporates gestures and body language into its output. They offer annotated meeting reports as a product and customers are generally very satisfied, but sales to new customers tend to be very slow to acquire. Which of the following business opportunities should be the highest priority?

**Các phương án lựa chọn:**
- [ ] A. Develop and delivery new products to existing customers
- [ ] B. Develop new products and target new customers
- [x] **C. Use customer segmentation and/or market analysis to help marketing with new customers** *(Đáp án chính xác)*
- [ ] D. Use customer segmentation and/or market analysis to move into a different market

👉 **Đáp án đúng:** **C. Use customer segmentation and/or market analysis to help marketing with new customers**
💡 **Giải thích chi tiết:** Because customer satisfaction with the existing product is already high, customer segmentation and market analysis should be prioritized to identify buyer profiles and accelerate acquisition of new customers.

---

### ❓ Câu hỏi 38:
Which of the following is NOT normally a part of the EDA process?

**Các phương án lựa chọn:**
- [ ] A. Visual summaries of the data
- [ ] B. Connecting the data to the business opportunity
- [ ] C. Communication to stakeholders
- [x] **D. Predictive linear or logistic regression** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. Predictive linear or logistic regression**
💡 **Giải thích chi tiết:** Fitting predictive models (linear/logistic regression) belongs to the Modeling/Ideation phase, not exploratory data analysis.

---

### ❓ Câu hỏi 39:
Which of the following is NOT a recommended tool for optimizing code?

**Các phương án lựa chọn:**
- [ ] A. Cython
- [ ] B. mpi4py
- [x] **C. TensorBoard** *(Đáp án chính xác)*
- [ ] D. ipyparallel

👉 **Đáp án đúng:** **C. TensorBoard**
💡 **Giải thích chi tiết:** TensorBoard is a visualization dashboard for machine learning experimentation and metrics, not a code performance/acceleration compiler.

---

### ❓ Câu hỏi 40:
In which situation would you most strongly consider MAE over RMSE as a regression metric?

**Các phương án lựa chọn:**
- [ ] A. where we would like to interpret the error metric in terms of the original units
- [ ] B. like predicting daily temperature where we expect a small range of values
- [x] **C. like predicting time to failure for a machine where we expect a long tailed distribution of values** *(Đáp án chính xác)*
- [ ] D. like predicting the category or topic associated with a document
- [ ] E. where we would like to interpret the error metric as a squared version of the original units

👉 **Đáp án đúng:** **C. like predicting time to failure for a machine where we expect a long tailed distribution of values**
💡 **Giải thích chi tiết:** MAE is much more robust to extreme outliers than RMSE (which squares errors). In heavy-tailed/long-tailed distributions like machine time-to-failure, MAE prevents rare outliers from dominating the error score.

---

### ❓ Câu hỏi 41:
What is a potential consequence of software changes on model performance?

**Các phương án lựa chọn:**
- [ ] A. Improved accuracy
- [x] **B. Performance drift** *(Đáp án chính xác)*
- [ ] C. Increased training time
- [ ] D. No impact at all

👉 **Đáp án đúng:** **B. Performance drift**
💡 **Giải thích chi tiết:** Upstream software library updates, API changes, or system environment shifts can introduce silent data pipeline bugs or performance drift in deployed models.

---

### ❓ Câu hỏi 42:
Which of the following statements does not describe a valid use case for dimensionality reduction?

**Các phương án lựa chọn:**
- [ ] A. Principal components analysis to process images used in classification.
- [ ] B. Non-negative matrix factorization to resolve topics from a corpus of words.
- [ ] C. t-distributed stochastic neighbor embedding to visualize the results of a clustering algorithm.
- [ ] D. Using an ANOVA to select a subset of features
- [x] **E. Down-sampling of the majority class** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. Down-sampling of the majority class**
💡 **Giải thích chi tiết:** Down-sampling reduces the number of samples (rows) to handle class imbalance; it does not reduce feature dimensionality (columns).

---

### ❓ Câu hỏi 43:
In a confusion matrix, what does True Positive (TP) represent?

**Các phương án lựa chọn:**
- [ ] A. Correctly predicted negative cases
- [ ] B. Incorrectly predicted positive cases
- [x] **C. Correctly predicted positive cases** *(Đáp án chính xác)*
- [ ] D. Incorrectly predicted negative cases

👉 **Đáp án đúng:** **C. Correctly predicted positive cases**
💡 **Giải thích chi tiết:** A True Positive (TP) occurs when the model correctly predicts the positive class for an instance that is actually positive.

---

### ❓ Câu hỏi 44:
A Spark cluster is generally managed using a Docker container and a YAML file.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** In containerized environments, Spark master and worker clusters are typically managed and orchestrated via Docker containers using Docker Compose or Kubernetes YAML manifests.

---

### ❓ Câu hỏi 45:
Which statement best describes why visualization of topics can have an impact on the business opportunity?

**Các phương án lựa chọn:**
- [x] **A. Because sharing with domain experts might enable topic-specific feature engineering** *(Đáp án chính xác)*
- [ ] B. Because visual inspection can help choose the number of topics
- [ ] C. Because we are able to see the top words with each topic
- [ ] D. Because we are able to see the relative importance of each topic across the corpus
- [ ] E. Because domain experts can visually inspect the validity of the topics

👉 **Đáp án đúng:** **A. Because sharing with domain experts might enable topic-specific feature engineering**
💡 **Giải thích chi tiết:** Visualizing topics allows domain experts to interpret discovered themes and construct custom, topic-specific feature engineering strategies that directly solve the business problem.

---

### ❓ Câu hỏi 46:
When training a custom classifier in Watson Visual Recognition the negative images should be:

**Các phương án lựa chọn:**
- [x] **A. As visually similar as possible to the positive images** *(Đáp án chính xác)*
- [ ] B. Background images without the positive images
- [ ] C. As random as possible to establish a background
- [ ] D. Randomly generated from the positive images
- [ ] E. Visually distinct from the positive images

👉 **Đáp án đúng:** **A. As visually similar as possible to the positive images**
💡 **Giải thích chi tiết:** According to IBM Watson Visual Recognition guidelines, negative training examples should be visually similar to positive classes (acting as hard negatives) to teach the model fine-grained discriminative boundaries.

---

### ❓ Câu hỏi 47:
Why is it important to ensure that minimally required data is available?

**Các phương án lựa chọn:**
- [ ] A. To reduce the size of the dataset
- [x] **B. To monitor model performance and debug issues** *(Đáp án chính xác)*
- [ ] C. To make data collection easier
- [ ] D. To avoid using log files

👉 **Đáp án đúng:** **B. To monitor model performance and debug issues**
💡 **Giải thích chi tiết:** Maintaining minimally required telemetry and schema data ensures that engineers can accurately monitor model performance in production and rapidly debug operational issues.

---

### ❓ Câu hỏi 48:
What is the principal reason to create a virtual environment before creating your model locally?

**Các phương án lựa chọn:**
- [ ] A. Because all models should have their own virtual environment
- [ ] B. Because it will ensure that the most recent packages are used
- [ ] C. Because virtual environments can be containerized easily
- [ ] D. Because the Python client for Watson Machine Learning has specific dependencies
- [x] **E. Because it ensures that locally created/trained models are compatible with Watson Machine Learning** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. Because it ensures that locally created/trained models are compatible with Watson Machine Learning**
💡 **Giải thích chi tiết:** Creating a dedicated virtual environment ensures strict package version compatibility between locally trained models and the runtime environments supported by cloud platforms like Watson Machine Learning.

---

### ❓ Câu hỏi 49:
What does a deployment in Kubernetes manage?

**Các phương án lựa chọn:**
- [ ] A. The API server
- [x] **B. The desired state of applications** *(Đáp án chính xác)*
- [ ] C. The health of worker nodes
- [ ] D. The network configuration

👉 **Đáp án đúng:** **B. The desired state of applications**
💡 **Giải thích chi tiết:** A Kubernetes Deployment provides declarative updates for Pods and ReplicaSets, continuously ensuring that the current state matches the specified desired state.

---

### ❓ Câu hỏi 50:
Which types of programming tasks best describes what you are expected to already have some familiarity with before beginning this course?

**Các phương án lựa chọn:**
- [ ] A. dashboarding, high performance computing, and code profiling
- [x] **B. numeric computing, data munging, data visualization and data modeling** *(Đáp án chính xác)*
- [ ] C. convex optimization, python programming, statistical programming
- [ ] D. continuous integration, linear programming, and data exploration

👉 **Đáp án đúng:** **B. numeric computing, data munging, data visualization and data modeling**
💡 **Giải thích chi tiết:** Prerequisites for the IBM AI Enterprise Workflow course assume familiarity with core data science programming tasks: numerical computing (NumPy), data munging (Pandas), data visualization (Matplotlib/Seaborn), and baseline modeling (Scikit-Learn).

---
