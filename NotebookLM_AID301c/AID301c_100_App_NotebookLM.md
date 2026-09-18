# 📘 AID301c 100 Câu Trắc Nghiệm Tổng Hợp

> **Mô tả tài liệu**: Bộ 100 câu hỏi trắc nghiệm AI Applications trọng tâm.
> **Môn học**: AID301c - Trí Tuệ Nhân Tạo (IBM AI Enterprise Workflow Specialization)
> **Tổng số câu hỏi**: 100 câu

---

### ❓ Câu hỏi 1:
Which of the following is NOT a factor that affects the time spent on data cleaning?

**Các phương án lựa chọn:**
- [ ] A. Team experience
- [ ] B. Data quality
- [ ] C. Project requirements
- [x] **D. Company size** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. Company size**
💡 **Giải thích chi tiết:** Thời gian làm sạch dữ liệu chịu ảnh hưởng trực tiếp bởi kinh nghiệm nhóm, data quality và mức chi tiết trong project requirements. Dữ liệu thiếu, không nhất quán hoặc yêu cầu chuẩn hóa phức tạp đều làm tăng số bước kiểm tra và sửa lỗi. Company size không tự nó quyết định khối lượng bản ghi, mức lỗi hay quy tắc biến đổi cần xử lý.

---

### ❓ Câu hỏi 2:
When you use Watson Services like Watson Natural Language Understanding via the Python SDK, what are the three items that need to be saved?

**Các phương án lựa chọn:**
- [ ] A. service version, service API key, service JSON map
- [ ] B. service URL, service JSON map, service API key
- [x] **C. service API key, service version, service URL** *(Đáp án chính xác)*
- [ ] D. service version, service IAMAuthenticator, service URL
- [ ] E. E. service API key, service URL, service IAMAuthenticator

👉 **Đáp án đúng:** **C. service API key, service version, service URL**
💡 **Giải thích chi tiết:** Khi khởi tạo dịch vụ Watson bằng Python SDK, chương trình cần API key để xác thực, service URL để biết điểm truy cập và service version để chọn phiên bản API. Ba thông tin này quyết định việc gửi yêu cầu đến đúng dịch vụ với cấu hình tương thích. IAMAuthenticator là đối tượng được tạo từ API key, không phải một trong ba giá trị cấu hình nền tảng cần lưu riêng.

---

### ❓ Câu hỏi 3:
Sparse matrices can be useful as a target destination for ETL, but what are the main caveats?

**Các phương án lựa chọn:**
- [ ] A. You cannot convert directly from a numpy.array to any of the scipy.sparse matrices.
- [x] **B. NumPy linear algebra functions generally cannot be called directly.** *(Đáp án chính xác)*
- [ ] C. Saving to disk is not possible directly from a scipy.sparse format.
- [ ] D. The train test splits need to be performed by hand with scipy.sparse matrices.
- [x] **E. E. It is difficult to print to screen scipy.sparse matrices directly.** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. NumPy linear algebra functions generally cannot be called directly.**, **E. E. It is difficult to print to screen scipy.sparse matrices directly.**
💡 **Giải thích chi tiết:** Ma trận thưa tiết kiệm bộ nhớ nhờ chỉ lưu các phần tử khác không, nhưng nhiều hàm đại số tuyến tính tiêu chuẩn của NumPy không nhận trực tiếp cấu trúc scipy.sparse. Việc hiển thị đầy đủ ma trận cũng kém trực quan vì biểu diễn của nó tập trung vào tọa độ và giá trị đã lưu. Điều này là đánh đổi kỹ thuật của hiệu quả bộ nhớ, không phải vì ma trận thưa không thể được lưu hay chia tập dữ liệu.

---

### ❓ Câu hỏi 4:
What is the purpose of kubectl in kubernetes?

**Các phương án lựa chọn:**
- [ ] A. Automatic logging of requests and responses
- [ ] B. A tool that makes it easy to run a single-node cluster locally
- [ ] C. The primary node agent on each node, responsible for the processes running on that machine
- [x] **D. The CLI for communicating with the kubernetes cluster** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. The CLI for communicating with the kubernetes cluster**
💡 **Giải thích chi tiết:** kubectl là giao diện dòng lệnh dùng để gửi lệnh đến control plane của Kubernetes thông qua Kubernetes API. Nhờ đó người vận hành có thể tạo, truy vấn, cập nhật hoặc gỡ bỏ các tài nguyên như pod, service và deployment. Nó không phải agent chạy trên từng node, cũng không phải công cụ tạo cụm một node cục bộ.

---

### ❓ Câu hỏi 5:
What is a key principle of design thinking mentioned in the course?

**Các phương án lựa chọn:**
- [ ] A. Data collection
- [x] **B. Observation and Reflection** *(Đáp án chính xác)*
- [ ] C. Rapid prototyping
- [ ] D. User testing

👉 **Đáp án đúng:** **B. Observation and Reflection**
💡 **Giải thích chi tiết:** Observation and Reflection, tức quan sát và phản tư, giúp nhóm thiết kế nhận ra nhu cầu, hành vi và trở ngại thực tế của người dùng thay vì chỉ dựa trên giả định ban đầu. Thông tin quan sát được cần được suy ngẫm để chuyển thành insight có thể dẫn dắt quyết định thiết kế. Vì vậy, đây là nguyên tắc nền tảng cho cách tiếp cận lấy con người làm trung tâm.

---

### ❓ Câu hỏi 6:
Which Python package supports spawning processes for code optimization?

**Các phương án lựa chọn:**
- [ ] A. threading
- [ ] B. subprocess
- [x] **C. multiprocessing** *(Đáp án chính xác)*
- [ ] D. numpy

👉 **Đáp án đúng:** **C. multiprocessing**
💡 **Giải thích chi tiết:** multiprocessing tạo các tiến trình riêng biệt để thực thi công việc song song, đặc biệt hữu ích cho tác vụ tính toán nặng trên nhiều lõi CPU. Mỗi tiến trình có không gian bộ nhớ và Python interpreter riêng, nên có thể tránh giới hạn Global Interpreter Lock trong nhiều tình huống CPU-bound. threading chủ yếu phù hợp với tác vụ chờ I/O, còn NumPy không phải cơ chế sinh tiến trình.

---

### ❓ Câu hỏi 7:
Which country had the most total revenue when you summed across all purchases?

**Các phương án lựa chọn:**
- [ ] A. Singapore
- [x] **B. United Kingdom** *(Đáp án chính xác)*
- [ ] C. USA
- [ ] D. EIRE
- [ ] E. E. Germany

👉 **Đáp án đúng:** **B. United Kingdom**
💡 **Giải thích chi tiết:** Câu hỏi này dựa trên phép tổng hợp doanh thu theo quốc gia trong bộ dữ liệu bán hàng của bài thực hành. Khi cộng toàn bộ giá trị giao dịch của từng quốc gia, United Kingdom có tổng doanh thu cao nhất trong kết quả đã cho. Số đơn hàng hoặc số sản phẩm không thay thế được chỉ tiêu doanh thu vì giá trị tiền của từng giao dịch có thể khác nhau.

---

### ❓ Câu hỏi 8:
Which of the following classifiers is inherently designed for multiclass classification?

**Các phương án lựa chọn:**
- [ ] A. Linear Regression
- [x] **B. Naïve Bayes** *(Đáp án chính xác)*
- [ ] C. K-Means Clustering
- [ ] D. Decision Trees (in binary mode)

👉 **Đáp án đúng:** **B. Naïve Bayes**
💡 **Giải thích chi tiết:** Naïve Bayes mô hình hóa xác suất hậu nghiệm cho từng lớp và có thể so sánh trực tiếp nhiều lớp nhãn trong cùng một lần phân loại. Cơ chế này khiến nó tự nhiên hỗ trợ bài toán multiclass, dù dựa trên giả định độc lập có điều kiện giữa các đặc trưng. Linear Regression giải quyết giá trị liên tục, K-Means là phân cụm, còn cây ở chế độ nhị phân chỉ tạo hai nhãn.

---

### ❓ Câu hỏi 9:
Which library in Python is commonly used for reading and writing CSV files?

**Các phương án lựa chọn:**
- [ ] A. NumPy
- [ ] B. Matplotlib
- [x] **C. Pandas** *(Đáp án chính xác)*
- [ ] D. SciPy

👉 **Đáp án đúng:** **C. Pandas**
💡 **Giải thích chi tiết:** Pandas cung cấp DataFrame cùng các hàm như read_csv và to_csv, nên thường được dùng để nạp, thao tác và ghi lại dữ liệu CSV trong Python. Cấu trúc bảng có nhãn cột giúp kiểm tra kiểu dữ liệu, lọc hàng và biến đổi dữ liệu thuận tiện ở bước chuẩn bị dữ liệu. NumPy, Matplotlib và SciPy phục vụ các mục đích số học, trực quan hóa hoặc khoa học khác.

---

### ❓ Câu hỏi 10:
What is a key principle of design thinking mentioned in the course?

**Các phương án lựa chọn:**
- [ ] A. Data collection
- [ ] B. Observation and Reflection
- [x] **C. Rapid prototyping** *(Đáp án chính xác)*
- [ ] D. User testing

👉 **Đáp án đúng:** **C. Rapid prototyping**
💡 **Giải thích chi tiết:** Rapid prototyping cho phép nhóm nhanh chóng biến ý tưởng thành mô hình thử nghiệm để nhận phản hồi trước khi đầu tư vào một giải pháp hoàn chỉnh. Vòng lặp tạo mẫu, thử nghiệm và điều chỉnh giúp phát hiện giả định sai với chi phí thấp. Đây là nguyên tắc thiết kế quan trọng vì nó ưu tiên học hỏi từ tương tác thực tế thay vì trì hoãn kiểm chứng.

---

### ❓ Câu hỏi 11:
Thinking with the lens of the scientific process, what would your next steps be if you wanted to decide where to open the next store for your sled business?

**Các phương án lựa chọn:**
- [ ] A. Start pulling sales and other data to create a business viability assessment for Vermont.
- [x] **B. Gather more data and repeat the snowfall experiment.** *(Đáp án chính xác)*
- [x] **C. Gather different data say snowfall by county and repeat the experiment.** *(Đáp án chính xác)*
- [x] **D. Start a business viability assessment for all three states.** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. Gather more data and repeat the snowfall experiment.**, **C. Gather different data say snowfall by county and repeat the experiment.**, **D. Start a business viability assessment for all three states.**
💡 **Giải thích chi tiết:** Quyết định mở cửa hàng mới cần gather more data thay vì suy luận từ một thí nghiệm tuyết rơi đơn lẻ. Lặp lại phép thử, thu thập dữ liệu theo county và lập business viability assessment cho cả ba bang giúp kiểm tra giả thuyết theo nhiều góc nhìn. Các bước này kết nối dữ liệu thời tiết với điều kiện kinh doanh thực tế trước khi chọn địa điểm.

---

### ❓ Câu hỏi 12:
The .fit_transform method corresponds to which scikit-learn interface(s)?

**Các phương án lựa chọn:**
- [ ] A. Transformer, Estimator, Predictor
- [ ] B. Transformer, Estimator
- [ ] C. Estimator, Predictor
- [x] **D. Transformer** *(Đáp án chính xác)*
- [ ] E. E. Transformer, Predictor

👉 **Đáp án đúng:** **D. Transformer**
💡 **Giải thích chi tiết:** Trong scikit-learn, Transformer có nhiệm vụ biến đổi dữ liệu và cung cấp fit_transform để vừa học tham số biến đổi vừa áp dụng chúng lên dữ liệu. Estimator được nhận diện chủ yếu bởi fit, còn Predictor cần có predict để sinh dự báo. Vì vậy, sự hiện diện của fit_transform phản ánh giao diện Transformer chứ không tự động chứng minh đối tượng là Predictor.

---

### ❓ Câu hỏi 13:
There are many ways to carry out statistical inference. Which one method of the following is NOT used to compute estimates in the context of statistical inference.

**Các phương án lựa chọn:**
- [x] **A. Null Hypothesis Significance Testing (NHST)** *(Đáp án chính xác)*
- [ ] B. Maximum Likelihood Estimation (MLE)
- [ ] C. Markov Chain Monte Carlo (MCMC)
- [ ] D. Expectation Maximization (EM)
- [ ] E. E. Simulation via Permutations

👉 **Đáp án đúng:** **A. Null Hypothesis Significance Testing (NHST)**
💡 **Giải thích chi tiết:** Null Hypothesis Significance Testing chủ yếu đánh giá mức độ bằng chứng chống lại giả thuyết không, thường thông qua thống kê kiểm định và p-value, thay vì tạo một ước lượng tham số. MLE, MCMC, EM và mô phỏng hoán vị đều có thể được dùng để suy ra hoặc xấp xỉ giá trị chưa biết. Do đó, NHST thuộc nhóm kiểm định giả thuyết hơn là phương pháp tính estimate theo nghĩa câu hỏi.

---

### ❓ Câu hỏi 14:
The decision tree base models in random forests individually have high bias and low variance.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Cây quyết định sâu thường có low bias vì có thể học ranh giới phức tạp, nhưng high variance do nhạy với mẫu huấn luyện cụ thể. Random forest giảm variance bằng cách huấn luyện nhiều cây trên các mẫu và tập đặc trưng khác nhau rồi tổng hợp kết quả. Mệnh đề nêu high bias và low variance đã đảo ngược đặc điểm này nên không đúng.

---

### ❓ Câu hỏi 15:
When you use Watson Services like Watson Natural Language Understanding via the Python SDK, what are the three items that need to be saved? These items are generally saved on a local machine and included in scripts and notebooks as imported variables.

**Các phương án lựa chọn:**
- [ ] A. service version, service API key, service JSON map
- [ ] B. service URL, service JSON map, service API key
- [x] **C. service API key, service version, service URL** *(Đáp án chính xác)*
- [ ] D. service version, service IAMAuthenticator, service URL
- [ ] E. E. service API key, service URL, service IAMAuthenticator

👉 **Đáp án đúng:** **C. service API key, service version, service URL**
💡 **Giải thích chi tiết:** Kết nối Watson Natural Language Understanding qua Python SDK cần bộ ba cấu hình gồm API key, service version và service URL. API key xác thực truy cập, URL xác định dịch vụ đích, còn version giữ hành vi API ổn định khi IBM cập nhật dịch vụ. Lưu riêng ba giá trị này giúp script hoặc notebook tái sử dụng cấu hình mà không phải mã hóa cứng thông tin nhạy cảm.

---

### ❓ Câu hỏi 16:
There are many ways to carry out statistical inference. Which one method of the following is NOT used to compute estimates in the context of statistical inference?

**Các phương án lựa chọn:**
- [x] **A. Null Hypothesis Significance Testing (NHST)** *(Đáp án chính xác)*
- [ ] B. Maximum Likelihood Estimation (MLE)
- [ ] C. Markov Chain Monte Carlo (MCMC)
- [ ] D. Expectation Maximization (EM)
- [ ] E. E. Simulation via Permutations

👉 **Đáp án đúng:** **A. Null Hypothesis Significance Testing (NHST)**
💡 **Giải thích chi tiết:** Kiểm định ý nghĩa giả thuyết không trả lời câu hỏi liệu dữ liệu có đủ bằng chứng để bác bỏ một giả thuyết tham chiếu hay không. Nó không trực tiếp sinh ra estimate cho tham số như maximum likelihood, EM hoặc chuỗi MCMC. Vì vậy, đặt NHST cùng các kỹ thuật tính ước lượng sẽ nhầm lẫn giữa suy luận kiểm định và cơ chế ước lượng.

---

### ❓ Câu hỏi 17:
When embarking on a data science project, why do you ultimately want to format your data so that it can be housed in something like a Pandas DataFrame or NumPy Array?

**Các phương án lựa chọn:**
- [ ] A. DataFrames/Arrays most closely resemble tables in relational databases.
- [ ] B. DataFrames/Arrays are the only structures in Python capable of holding significant amounts of data.
- [x] **C. Nearly all modeling algorithms take input data in a tabular format analogous to format of DataFrame/Arrays.** *(Đáp án chính xác)*
- [ ] D. All of the answers.

👉 **Đáp án đúng:** **C. Nearly all modeling algorithms take input data in a tabular format analogous to format of DataFrame/Arrays.**
💡 **Giải thích chi tiết:** Phần lớn thuật toán học máy nhận ma trận đặc trưng hai chiều, trong đó mỗi hàng là quan sát và mỗi cột là biến đầu vào. Pandas DataFrame và NumPy array biểu diễn tự nhiên cấu trúc tabular này, đồng thời tương thích rộng với thư viện mô hình hóa. Chúng không phải các cấu trúc duy nhất chứa được dữ liệu, nhưng là định dạng đầu vào phổ biến giúp pipeline hoạt động nhất quán.

---

### ❓ Câu hỏi 18:
What is a key reason for using existing NLP APIs instead of building models from scratch?

**Các phương án lựa chọn:**
- [ ] A. They are always more accurate
- [x] **B. They require less time and resources** *(Đáp án chính xác)*
- [ ] C. They are easier to understand
- [ ] D. They eliminate the need for data

👉 **Đáp án đúng:** **B. They require less time and resources**
💡 **Giải thích chi tiết:** Existing NLP API đóng gói mô hình, hạ tầng triển khai và quy trình bảo trì đã được nhà cung cấp xây dựng. Nhờ đó, nhóm có thể tích hợp chức năng như phân tích thực thể hoặc cảm xúc nhanh hơn so với việc xây dựng mô hình từ đầu. API không luôn chính xác hơn và cũng không loại bỏ hoàn toàn nhu cầu hiểu dữ liệu.

---

### ❓ Câu hỏi 19:
Which of the following is NOT a component of the confusion matrix?

**Các phương án lựa chọn:**
- [ ] A. True Negatives (TN)
- [ ] B. False Positives (FP)
- [ ] C. True Positives (TP)
- [x] **D. Average Score (AS)** *(Đáp án chính xác)*
- [ ] E. E. False Negatives (FN)

👉 **Đáp án đúng:** **D. Average Score (AS)**
💡 **Giải thích chi tiết:** Confusion matrix của bài toán phân loại nhị phân được cấu thành từ bốn số đếm: true positive, true negative, false positive và false negative. Những giá trị này cho biết dự báo khớp hay không khớp với nhãn thực tế theo từng loại sai lầm. Average Score là chỉ số tổng hợp có thể được tính sau đó, nhưng không phải một ô thành phần của ma trận nhầm lẫn.

---

### ❓ Câu hỏi 20:
Sparse matrices can be useful as a target destination for ETL, but what are the main caveats (choose one or more)?

**Các phương án lựa chọn:**
- [ ] A. You cannot convert directly from a numpy.array to any of the scipy.sparse matrices
- [x] **B. NumPy linear algebra functions generally cannot be called directly** *(Đáp án chính xác)*
- [ ] C. Saving to disk is not possible directly from a scipy.sparse format
- [ ] D. The train test splits need to be performed by hand with scipy.sparse matrices
- [x] **E. E. It is difficult to print to screen scipy.sparse matrices directly** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. NumPy linear algebra functions generally cannot be called directly**, **E. E. It is difficult to print to screen scipy.sparse matrices directly**
💡 **Giải thích chi tiết:** Dùng scipy.sparse mang lại lợi ích cho dữ liệu nhiều giá trị bằng không, song không phải mọi phép toán tuyến tính của NumPy đều áp dụng trực tiếp lên kiểu dữ liệu này. Biểu diễn thưa cũng khó in toàn bộ lên màn hình theo dạng bảng dễ đọc, vì nó ưu tiên lưu vị trí phần tử khác không. Hai hạn chế này cần được cân nhắc khi chọn sparse matrix làm đích ETL.

---

### ❓ Câu hỏi 21:
What is a key reason for using existing NLP APIs instead of building models from scratch?

**Các phương án lựa chọn:**
- [ ] A. They are always more accurate.
- [x] **B. They require less time and resources.** *(Đáp án chính xác)*
- [ ] C. They are easier to understand.
- [ ] D. They eliminate the need for data.

👉 **Đáp án đúng:** **B. They require less time and resources.**
💡 **Giải thích chi tiết:** Existing NLP API giúp nhóm rút ngắn đáng kể thời gian xây dựng vì không phải tự tạo pipeline thu thập dữ liệu, huấn luyện và triển khai một mô hình ngôn ngữ từ đầu. Nhà cung cấp đã gói sẵn endpoint, cơ chế xác thực và khả năng mở rộng hạ tầng. Lợi ích chính là tiết kiệm nguồn lực, không phải lời hứa rằng API luôn chính xác hoặc không cần dữ liệu đầu vào.

---

### ❓ Câu hỏi 22:
In the context of NLP, what does sentiment analysis refer to?

**Các phương án lựa chọn:**
- [ ] A. Analyzing the structure of sentences
- [x] **B. Determining the emotional tone behind a series of words** *(Đáp án chính xác)*
- [ ] C. Translating text from one language to another
- [ ] D. Summarizing large documents

👉 **Đáp án đúng:** **B. Determining the emotional tone behind a series of words**
💡 **Giải thích chi tiết:** Sentiment analysis xác định sắc thái cảm xúc hoặc quan điểm được biểu đạt trong một đoạn văn bản, chẳng hạn tích cực, tiêu cực hay trung tính. Nó khai thác từ ngữ, ngữ cảnh và đôi khi mức độ cảm xúc để suy ra thái độ của người viết. Phân tích cú pháp, dịch máy và tóm tắt tài liệu là các nhiệm vụ NLP khác với mục tiêu riêng.

---

### ❓ Câu hỏi 23:
Which method is recommended for handling missing values in numerical data?

**Các phương án lựa chọn:**
- [ ] A. Convert missing values to a flag.
- [x] **B. Use imputation techniques.** *(Đáp án chính xác)*
- [ ] C. Delete the entire dataset.
- [ ] D. Replace with a random value.

👉 **Đáp án đúng:** **B. Use imputation techniques.**
💡 **Giải thích chi tiết:** Imputation thay thế giá trị số bị thiếu bằng một ước lượng có cơ sở, như mean, median, giá trị dự báo từ mô hình hoặc phương pháp lân cận. Cách làm này giữ lại các quan sát hữu ích và duy trì kích thước tập dữ liệu cho bước huấn luyện. Thay bằng số ngẫu nhiên có thể tạo nhiễu, còn xóa toàn bộ dataset là phản ứng quá mức và làm mất thông tin.

---

### ❓ Câu hỏi 24:
Which of the following is a key aspect of applying data transformations?

**Các phương án lựa chọn:**
- [ ] A. Data collection
- [x] **B. Iteration** *(Đáp án chính xác)*
- [ ] C. Data visualization
- [ ] D. Data storage

👉 **Đáp án đúng:** **B. Iteration**
💡 **Giải thích chi tiết:** Biến đổi dữ liệu cần được thực hiện theo vòng lặp vì tác động của scaling, encoding hay biến đổi phân phối chỉ có thể được đánh giá qua kiểm tra chất lượng dữ liệu và kết quả mô hình. Một phép biến đổi phù hợp với thuật toán này có thể không phù hợp với thuật toán khác. Iteration cho phép quay lại điều chỉnh giả định thay vì coi tiền xử lý là một bước làm một lần duy nhất.

---

### ❓ Câu hỏi 25:
When you worked on model deployment case study, which modification to the ALS algorithm had the largest effect on model performance?

**Các phương án lựa chọn:**
- [x] **A. The explicit training vs implicit training comparison** *(Đáp án chính xác)*
- [ ] B. The lambda or regularization parameter
- [ ] C. The epsilon or scale parameter
- [ ] D. The I1 vs I2 comparison

👉 **Đáp án đúng:** **A. The explicit training vs implicit training comparison**
💡 **Giải thích chi tiết:** Trong case study triển khai ALS, lựa chọn huấn luyện explicit hay implicit thay đổi trực tiếp ý nghĩa của tín hiệu phản hồi và hàm mục tiêu tối ưu. Explicit feedback dùng đánh giá quan sát rõ ràng, còn implicit feedback suy luận sở thích từ hành vi như xem hoặc mua. Vì thay đổi bản chất dữ liệu học, so sánh này tạo ảnh hưởng lớn nhất đến hiệu năng hơn các điều chỉnh tham số nhỏ trong bài thực hành.

---

### ❓ Câu hỏi 26:
When you worked on model deployment case study, which modification to the ALS algorithm had the largest effect on model performance?

**Các phương án lựa chọn:**
- [x] **A. The explicit training vs implicit training comparison.** *(Đáp án chính xác)*
- [ ] B. The lambda or regularization parameter.
- [ ] C. The epsilon or scale parameter.
- [ ] D. The I1 vs I2 comparison.

👉 **Đáp án đúng:** **A. The explicit training vs implicit training comparison.**
💡 **Giải thích chi tiết:** ALS phản ứng rất khác khi học từ explicit ratings so với implicit interactions, bởi hai chế độ gán ý nghĩa khác nhau cho dữ liệu người dùng. Chuyển giữa chúng có thể thay đổi cách tính confidence, mục tiêu tối ưu và tiêu chí đánh giá mô hình gợi ý. Do đó, tác động của so sánh này lớn hơn việc tinh chỉnh lambda, epsilon hoặc một phép so sánh ký hiệu phụ trong case study.

---

### ❓ Câu hỏi 27:
Which command is used to install the Watson Developer Cloud Python SDK?

**Các phương án lựa chọn:**
- [x] **A. pip install ibm-watson** *(Đáp án chính xác)*
- [ ] B. pip install --upgrade ibm-watson
- [ ] C. install ibm-watson
- [ ] D. upgrade ibm-watson

👉 **Đáp án đúng:** **A. pip install ibm-watson**
💡 **Giải thích chi tiết:** Lệnh pip install ibm-watson yêu cầu pip tải và cài đúng package Python SDK cho Watson. Cú pháp này là bước cài đặt chuẩn trước khi import các lớp dịch vụ trong script hoặc notebook. Tùy chọn --upgrade chỉ cần khi chủ đích nâng cấp package đã có, còn các phương án thiếu pip hoặc thiếu lệnh cài hợp lệ không thực thi được.

---

### ❓ Câu hỏi 28:
Which process model is known for its open standard and has been around since 1996?

**Các phương án lựa chọn:**
- [ ] A. OSEMN
- [x] **B. CRISP-DM** *(Đáp án chính xác)*
- [ ] C. Design Thinking
- [ ] D. Agile

👉 **Đáp án đúng:** **B. CRISP-DM**
💡 **Giải thích chi tiết:** CRISP-DM là quy trình chuẩn mở cho khai phá dữ liệu, được công bố từ năm 1996 và tổ chức công việc thành các pha từ hiểu nghiệp vụ đến triển khai. Mô hình này giúp nhóm liên kết mục tiêu kinh doanh với hiểu dữ liệu, chuẩn bị dữ liệu, mô hình hóa và đánh giá. OSEMN, Design Thinking và Agile có giá trị riêng nhưng không khớp mô tả về chuẩn mở lịch sử này.

---

### ❓ Câu hỏi 29:
Why is granular data preferred over summary level data?

**Các phương án lựa chọn:**
- [ ] A. It is easier to collect
- [x] **B. It allows for more detailed analysis** *(Đáp án chính xác)*
- [ ] C. It takes less time to process
- [ ] D. It is more visually appealing

👉 **Đáp án đúng:** **B. It allows for more detailed analysis**
💡 **Giải thích chi tiết:** Dữ liệu granular lưu thông tin ở cấp chi tiết hơn, nên nhà phân tích có thể tự tổng hợp theo thời gian, địa điểm, khách hàng hoặc nhóm sản phẩm theo nhu cầu. Dữ liệu summary đã gộp sẵn thường làm mất biến thiên, ngoại lệ và khả năng thay đổi câu hỏi phân tích về sau. Vì vậy, mức chi tiết cao tạo không gian phân tích linh hoạt hơn chứ không đơn thuần làm thu thập dễ hơn.

---

### ❓ Câu hỏi 30:
What is the primary purpose of documenting your data before starting a project?

**Các phương án lựa chọn:**
- [ ] A. To impress stakeholders
- [x] **B. To streamline the modeling process and ensure data quality** *(Đáp án chính xác)*
- [ ] C. To increase project costs
- [ ] D. To avoid using Python

👉 **Đáp án đúng:** **B. To streamline the modeling process and ensure data quality**
💡 **Giải thích chi tiết:** Tài liệu hóa dữ liệu làm rõ nguồn gốc, ý nghĩa cột, kiểu dữ liệu, quy tắc biến đổi và data quality trước modeling process. Nhờ đó, nhóm phát hiện sớm sai lệch, chọn cách tiền xử lý phù hợp và tái lập được quy trình khi cần kiểm tra. Mục đích này hỗ trợ hiệu quả, độ tin cậy kỹ thuật, không nhằm tăng chi phí hoặc tránh sử dụng công cụ lập trình.

---

### ❓ Câu hỏi 31:
A Kubernetes pod can contain multiple kubernetes deployments

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Pod là đơn vị triển khai nhỏ nhất trong Kubernetes, thường bao gồm một hoặc nhiều container chia sẻ mạng và storage context. Deployment là tài nguyên cấp cao hơn dùng để quản lý replica và vòng đời của các pod, không phải thành phần được đặt bên trong một pod. Vì quan hệ quản lý đi từ deployment tới pod, phát biểu đảo chiều này là sai.

---

### ❓ Câu hỏi 32:
What is the first stage of the design thinking process?

**Các phương án lựa chọn:**
- [ ] A. Ideate
- [x] **B. Empathize** *(Đáp án chính xác)*
- [ ] C. Prototype
- [ ] D. Test

👉 **Đáp án đúng:** **B. Empathize**
💡 **Giải thích chi tiết:** Empathize là giai đoạn mở đầu của design thinking vì nhóm cần hiểu người dùng, bối cảnh, động cơ và khó khăn của họ trước khi xác định vấn đề. Các bước ideate, prototype và test chỉ có ý nghĩa khi dựa trên insight về nhu cầu thực. Bắt đầu bằng sự đồng cảm giúp hạn chế việc xây giải pháp hấp dẫn về kỹ thuật nhưng không giải quyết đúng trải nghiệm người dùng.

---

### ❓ Câu hỏi 33:
In the script example-spark-submit.sh, what does the #!/bin/bash line indicate?

**Các phương án lựa chọn:**
- [ ] A. It specifies the script's name.
- [ ] B. It indicates the script is written in Python.
- [x] **C. It tells the system to use the Bash shell to execute the script.** *(Đáp án chính xác)*
- [ ] D. It is a comment and has no effect.

👉 **Đáp án đúng:** **C. It tells the system to use the Bash shell to execute the script.**
💡 **Giải thích chi tiết:** Dòng #!/bin/bash là shebang, chỉ dẫn hệ điều hành dùng Bash làm interpreter khi thực thi file script. Nhờ đó, các lệnh shell và cú pháp đặc trưng của Bash được hiểu đúng mà không cần gọi interpreter thủ công. Dù bắt đầu bằng dấu #, shebang ở dòng đầu có vai trò vận hành đặc biệt chứ không phải một comment thông thường.

---

### ❓ Câu hỏi 34:
Which country had the most total revenue when you summed across all purchases?

**Các phương án lựa chọn:**
- [ ] A. Singapore
- [x] **B. United Kingdom** *(Đáp án chính xác)*
- [ ] C. USA
- [ ] D. EIRE
- [ ] E. E. Germany

👉 **Đáp án đúng:** **B. United Kingdom**
💡 **Giải thích chi tiết:** Kết quả tổng hợp doanh thu của bài tập cho thấy United Kingdom đứng đầu khi cộng giá trị của toàn bộ giao dịch theo quốc gia. Phép nhóm theo country rồi tính tổng revenue khác với việc đếm hóa đơn hay khách hàng, nên cần dựa vào cột doanh thu thay vì chỉ nhìn số lần mua. Các quốc gia khác trong lựa chọn không có tổng giá trị cao bằng trong bảng kết quả.

---

### ❓ Câu hỏi 35:
What is the purpose of kubectl in Kubernetes?

**Các phương án lựa chọn:**
- [ ] A. Automatic logging of requests and responses.
- [ ] B. A tool that makes it easy to run a single-node cluster locally.
- [ ] C. The primary node agent on each node, responsible for the processes running on that machine.
- [x] **D. The CLI for communicating with the Kubernetes cluster.** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. The CLI for communicating with the Kubernetes cluster.**
💡 **Giải thích chi tiết:** kubectl cung cấp cách chuẩn để người dùng quản trị và truy vấn Kubernetes cluster từ terminal. Các lệnh như get, apply hoặc describe được kubectl chuyển thành yêu cầu tới Kubernetes API để tác động lên resource trong cluster. Công cụ tạo cụm local, node agent và hệ thống log có tên, trách nhiệm khác nên không mô tả đúng mục đích của kubectl.

---

### ❓ Câu hỏi 36:
Which of the following is NOT a component of the confusion matrix?

**Các phương án lựa chọn:**
- [ ] A. True Negatives (TN)
- [ ] B. False Positives (FP)
- [ ] C. True Positives (TP)
- [x] **D. Average Score (AS)** *(Đáp án chính xác)*
- [ ] E. E. False Negatives (FN)

👉 **Đáp án đúng:** **D. Average Score (AS)**
💡 **Giải thích chi tiết:** Bốn thành phần cơ bản của confusion matrix là TN, FP, TP và FN, mỗi thành phần biểu thị một tổ hợp giữa nhãn dự báo và nhãn thực tế. Từ các số đếm này mới có thể suy ra accuracy, precision, recall hoặc F1-score. Average Score vì thế là một chỉ số tính toán từ kết quả, không phải phần tử gốc của ma trận.

---

### ❓ Câu hỏi 37:
When you compiled the JSON files into a single DataFrame or NumPy array, about how many days did the entire range of dates span?

**Các phương án lựa chọn:**
- [ ] A. 400
- [ ] B. 450
- [x] **C. 500** *(Đáp án chính xác)*
- [ ] D. 600
- [ ] E. E. 650

👉 **Đáp án đúng:** **C. 500**
💡 **Giải thích chi tiết:** Sau khi ghép các JSON thành DataFrame hoặc NumPy array, cần lấy chênh lệch giữa mốc ngày sớm nhất và muộn nhất để xác định độ dài chuỗi thời gian. Kết quả trong bài thực hành cho thấy toàn bộ khoảng ngày trải dài xấp xỉ 500 ngày. Con số này phản ánh phạm vi dữ liệu quan sát, không phải số hàng hay số bản ghi sau khi ghép.

---

### ❓ Câu hỏi 38:
If you have data with a large number of features and you are sure that it will take some time to train and tune the model, which approach is LEAST likely to result in a speed improvement during grid-searching?

**Các phương án lựa chọn:**
- [ ] A. In your pipeline use variance thresholding to limit the number of features
- [x] **B. Use the Shuffle and split form of cross-validation** *(Đáp án chính xác)*
- [ ] C. Use a randomized grid search form of cross validation
- [ ] D. Randomly subset the data
- [ ] E. E. Use PCA to reduce the dimensionality of the data before training

👉 **Đáp án đúng:** **B. Use the Shuffle and split form of cross-validation**
💡 **Giải thích chi tiết:** Muốn tăng tốc grid search cần giảm số tổ hợp siêu tham số, số đặc trưng, số mẫu hoặc chi phí mỗi lần fit. Variance thresholding, randomized search, lấy mẫu ngẫu nhiên và PCA đều có thể giảm khối lượng tính toán theo các cách đó. ShuffleSplit chỉ thay đổi cách sinh các lần chia validation, thường không tự làm giảm đáng kể số mô hình phải huấn luyện nên ít có khả năng tạo tăng tốc nhất.

---

### ❓ Câu hỏi 39:
What will the management team want to know after the sales data is released?

**Các phương án lựa chọn:**
- [ ] A. The number of products sold.
- [x] **B. If the teams are well-optimized based on historical sales data.** *(Đáp án chính xác)*
- [ ] C. The marketing budget for each team.
- [ ] D. The demographics of the customers.

👉 **Đáp án đúng:** **B. If the teams are well-optimized based on historical sales data.**
💡 **Giải thích chi tiết:** Sau khi dữ liệu bán hàng được công bố, ban quản lý cần biết các team có được tối ưu dựa trên historical sales data hay không. Thông tin này liên hệ trực tiếp với quyết định vận hành, hiệu quả nhân sự và dự báo doanh thu tiếp theo. Chỉ nêu số sản phẩm, ngân sách marketing hoặc nhân khẩu học không tự trả lời được câu hỏi đánh giá tối ưu hóa của quản trị.

---

### ❓ Câu hỏi 40:
A decision tree classifier is useful as a model for the AAVAIl subscriber churn data.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Decision tree classifier có thể học các ngưỡng và tương tác phi tuyến giữa biến của thuê bao, chẳng hạn hành vi sử dụng, hợp đồng và lịch sử thanh toán, để dự báo churn. Mô hình còn dễ diễn giải qua các nhánh quyết định nên hữu ích cho case study AAVAIl. Nó không phải lựa chọn duy nhất, nhưng hoàn toàn phù hợp làm mô hình phân loại cho dữ liệu rời bỏ thuê bao.

---

### ❓ Câu hỏi 41:
What type of data structures are used as standardized input to the interfaces in scikit-learn?

**Các phương án lựa chọn:**
- [ ] A. Lists and dictionaries
- [ ] B. DataFrames and Series
- [x] **C. NumPy arrays and SciPy sparse matrices** *(Đáp án chính xác)*
- [ ] D. Strings and tuples

👉 **Đáp án đúng:** **C. NumPy arrays and SciPy sparse matrices**
💡 **Giải thích chi tiết:** Các interface của scikit-learn chuẩn hóa đầu vào chủ yếu thành NumPy arrays hoặc SciPy sparse matrices để thuật toán nhận ma trận đặc trưng có cấu trúc thống nhất. DataFrame có thể được chấp nhận ở nhiều tình huống, nhưng thường được chuyển hoặc xử lý theo mảng số bên trong pipeline. Lists, dictionaries hay strings không cung cấp giao diện chuẩn cần thiết cho hầu hết estimator.

---

### ❓ Câu hỏi 42:
Which command-line tool is used to interact with the Kubernetes API?

**Các phương án lựa chọn:**
- [ ] A. Kubelet
- [x] **B. Kubectl** *(Đáp án chính xác)*
- [ ] C. Docker
- [ ] D. Helm

👉 **Đáp án đúng:** **B. Kubectl**
💡 **Giải thích chi tiết:** Kubectl là command-line tool chính thức để tương tác với Kubernetes API và control plane của cluster. Nó cho phép người dùng xem trạng thái, triển khai manifest, mở rộng workload hoặc gỡ tài nguyên bằng các câu lệnh nhất quán. Kubelet là agent trên node, Docker là runtime, còn Helm là công cụ quản lý package chứ không giữ vai trò CLI cơ bản này.

---

### ❓ Câu hỏi 43:
What is the first step in setting up the Watson Developer Cloud Python SDK?

**Các phương án lựa chọn:**
- [ ] A. Install the SDK
- [x] **B. Create an IBM Cloud account** *(Đáp án chính xác)*
- [ ] C. Create a resource for Natural Language Understanding
- [ ] D. Download the tutorial files

👉 **Đáp án đúng:** **B. Create an IBM Cloud account**
💡 **Giải thích chi tiết:** Tạo IBM Cloud account là bước đầu vì tài khoản cung cấp danh tính, quyền truy cập và khả năng tạo resource dịch vụ Watson. Chỉ sau đó người dùng mới có thể khởi tạo Natural Language Understanding, lấy credentials và cấu hình SDK trong môi trường Python. Cài package hay tải tutorial trước không thay thế điều kiện có tài khoản và resource trên nền tảng cloud.

---

### ❓ Câu hỏi 44:
For given input lists: a,b,c and 1,2,3. Create a dictionary from two input lists

**Các phương án lựa chọn:**
- [x] **A. def make_dict(lst1,lst2): res = {}; for key,value in zip(lst1,lst2): res[key] = value; return res** *(Đáp án chính xác)*
- [ ] B. def make_dict(lst1,lst2): res = {}; res[lst1] = lst2; return res
- [ ] C. def make_dict(lst1,lst2): res = []; for key,value in (lst1,lst2): res[key] = value; return res
- [ ] D. def make_dict(lst1,lst2): res = []; for key,value in zip(lst1,lst2): res[key] = value; return res

👉 **Đáp án đúng:** **A. def make_dict(lst1,lst2): res = {}; for key,value in zip(lst1,lst2): res[key] = value; return res**
💡 **Giải thích chi tiết:** Hàm đúng khởi tạo dictionary rỗng rồi dùng zip để ghép từng phần tử cùng vị trí của hai list thành cặp key-value. Vòng lặp gán res[key] = value tạo lần lượt a:1, b:2 và c:3, sau đó return res trả về cấu trúc hoàn chỉnh. Các phương án dùng list thay dictionary, dùng cả list làm key hoặc lặp sai cú pháp không tạo được mapping hợp lệ.

---

### ❓ Câu hỏi 45:
The .fit_transform method corresponds to which scikit-learn interface(s)?

**Các phương án lựa chọn:**
- [ ] A. Transformer, Estimator, Predictor
- [ ] B. Transformer, Estimator
- [ ] C. Estimator, Predictor
- [x] **D. Transformer** *(Đáp án chính xác)*
- [ ] E. E. Transformer, Predictor

👉 **Đáp án đúng:** **D. Transformer**
💡 **Giải thích chi tiết:** fit_transform là thao tác đặc trưng của Transformer trong scikit-learn: fit học các tham số từ dữ liệu, còn transform áp dụng phép biến đổi đã học. Ví dụ scaler có thể ước lượng mean và standard deviation rồi chuẩn hóa đặc trưng trong cùng lời gọi. Estimator nói chung không bắt buộc có transform, còn Predictor phải cung cấp dự báo nên không được suy ra từ tên phương thức này.

---

### ❓ Câu hỏi 46:
In the script example-spark-submit.sh, what does the #!/bin/bash line indicate?

**Các phương án lựa chọn:**
- [ ] A. It specifies the script's name
- [ ] B. It indicates the script is written in Python
- [x] **C. It tells the system to use the Bash shell to execute the script** *(Đáp án chính xác)*
- [ ] D. It is a comment and has no effect

👉 **Đáp án đúng:** **C. It tells the system to use the Bash shell to execute the script**
💡 **Giải thích chi tiết:** Shebang #!/bin/bash bảo đảm script example-spark-submit.sh được thực thi bằng Bash thay vì bị hệ điều hành chọn interpreter mặc định không phù hợp. Điều này quan trọng khi file chứa biến môi trường, pipe, điều kiện hoặc cú pháp shell của Bash. Nó không đặt tên cho script và không cho biết chương trình được viết bằng Python.

---

### ❓ Câu hỏi 47:
Which of the following classifiers is inherently designed for multiclass classification?

**Các phương án lựa chọn:**
- [ ] A. Linear Regression
- [x] **B. Naïve Bayes** *(Đáp án chính xác)*
- [ ] C. K-Means Clustering
- [ ] D. Decision Trees (in binary mode)

👉 **Đáp án đúng:** **B. Naïve Bayes**
💡 **Giải thích chi tiết:** Naïve Bayes ước tính posterior probability cho mọi class có mặt trong dữ liệu huấn luyện và chọn class có xác suất lớn nhất. Vì tính toán này mở rộng trực tiếp từ hai lớp sang nhiều lớp, thuật toán vốn phù hợp với multiclass classification. K-Means không dùng nhãn để phân loại, Linear Regression dự báo số liên tục, còn mô hình cây nhị phân bị giới hạn ở hai kết quả.

---

### ❓ Câu hỏi 48:
What is a common issue with using accuracy as a metric for imbalanced classes?

**Các phương án lựa chọn:**
- [ ] A. It is always accurate.
- [x] **B. It can be misleading.** *(Đáp án chính xác)*
- [ ] C. It is the only metric available.
- [ ] D. It does not consider false positives.

👉 **Đáp án đúng:** **B. It can be misleading.**
💡 **Giải thích chi tiết:** Với dữ liệu mất cân bằng, một mô hình chỉ dự báo lớp đa số vẫn có thể đạt accuracy cao dù gần như không phát hiện được lớp thiểu số quan trọng. Ví dụ, tỷ lệ 95% không churn có thể che giấu việc mô hình bỏ sót hầu hết khách hàng sắp rời đi. Vì vậy cần xem thêm precision, recall, F1-score hoặc PR-AUC thay vì diễn giải accuracy một mình.

---

### ❓ Câu hỏi 49:
Which method is recommended for handling missing values in numerical data?

**Các phương án lựa chọn:**
- [ ] A. Convert missing values to a flag
- [x] **B. Use imputation techniques** *(Đáp án chính xác)*
- [ ] C. Delete the entire dataset
- [ ] D. Replace with a random value

👉 **Đáp án đúng:** **B. Use imputation techniques**
💡 **Giải thích chi tiết:** Imputation xử lý missing numerical values bằng cách thay chúng bằng ước lượng thống kê hoặc dự báo hợp lý dựa trên phần dữ liệu quan sát được. Cách này giúp các thuật toán không bị lỗi vì NaN và giảm mất mát dữ liệu so với xóa cả tập. Việc điền số ngẫu nhiên làm méo phân phối, còn biến thiếu thành cờ chỉ phù hợp như thông tin bổ sung chứ không thay giá trị số.

---

### ❓ Câu hỏi 50:
Processing the corpus with the provided lemmatize_document reduces the total number of tokens to what percentage of the original?

**Các phương án lựa chọn:**
- [ ] A. 10-15%
- [ ] B. 20-35%
- [ ] C. 45-50%
- [x] **D. 70-75%** *(Đáp án chính xác)*
- [ ] E. E. 85-95%

👉 **Đáp án đúng:** **D. 70-75%**
💡 **Giải thích chi tiết:** Lemmatization gộp các biến thể hình thái của từ về lemma chung, nên làm giảm số token khác biệt nhưng không xóa phần lớn nội dung của corpus. Trong kết quả của hàm lemmatize_document ở bài tập, số token còn lại nằm trong khoảng 70–75% so với ban đầu. Tỷ lệ này phản ánh mức giảm vừa phải do chuẩn hóa từ vựng, không phải sự nén cực mạnh xuống 10–35%.

---

### ❓ Câu hỏi 51:
Docker images are the basis of containers. It is possible to pull an image from the registry and ask the Docker client to run a container based on that image. Some images are official while many others are user defined.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Docker image là khuôn mẫu bất biến chứa filesystem, dependencies và cấu hình cần thiết để tạo container. Docker client có thể pull image từ registry rồi chạy một instance container dựa trên image đó; image có thể do Docker hoặc cộng đồng phát hành. Quan hệ image là blueprint và container là thực thể chạy khiến phát biểu mô tả đúng cơ chế cơ bản của Docker.

---

### ❓ Câu hỏi 52:
In the context of NLP, what does sentiment analysis refer to?

**Các phương án lựa chọn:**
- [ ] A. Analyzing the structure of sentences
- [x] **B. Determining the emotional tone behind a series of words** *(Đáp án chính xác)*
- [ ] C. Translating text from one language to another
- [ ] D. Summarizing large documents

👉 **Đáp án đúng:** **B. Determining the emotional tone behind a series of words**
💡 **Giải thích chi tiết:** Sentiment analysis trong NLP nhằm nhận diện thái độ hoặc sắc thái tình cảm ẩn sau một chuỗi từ, như tích cực, tiêu cực hoặc trung tính. Mô hình có thể sử dụng từ khóa, ngữ cảnh và đặc trưng ngôn ngữ để suy ra quan điểm của người viết. Đây không phải nhiệm vụ dịch ngôn ngữ, phân tích cấu trúc ngữ pháp hay tóm tắt nội dung dài.

---

### ❓ Câu hỏi 53:
In the context of the AI workflow presented in these materials which of the following is not an example of a valid feedback loop?

**Các phương án lựa chọn:**
- [ ] A. Trying different data transformations on a given model.
- [x] **B. Returning to the data collection stage from transformations to reduce the number of transforms.** *(Đáp án chính xác)*
- [ ] C. Performing EDA on the data after a model has been deployed and data have been logged.
- [ ] D. Moving from the business opportunity and data collection to model iteration.
- [ ] E. E. Returning to discuss the business opportunity after a model has been deployed.

👉 **Đáp án đúng:** **B. Returning to the data collection stage from transformations to reduce the number of transforms.**
💡 **Giải thích chi tiết:** Feedback loop hợp lệ trong AI workflow phải quay lại một giai đoạn trước đó để cải thiện giả thuyết, dữ liệu, mô hình hoặc mục tiêu kinh doanh dựa trên thông tin mới. Trở về data collection chỉ với mục tiêu giảm số phép biến đổi không tạo quan hệ học hỏi hợp lý, vì dữ liệu mới không phải công cụ trực tiếp để cắt bớt transform. Các vòng lặp còn lại đều có thể bổ sung insight sau modeling hoặc deployment.

---

### ❓ Câu hỏi 54:
Which process model is known for its open standard and has been around since 1996?

**Các phương án lựa chọn:**
- [ ] A. OSEMN
- [x] **B. CRISP-DM** *(Đáp án chính xác)*
- [ ] C. Design Thinking
- [ ] D. Agile

👉 **Đáp án đúng:** **B. CRISP-DM**
💡 **Giải thích chi tiết:** CRISP-DM được biết đến như một quy trình chuẩn mở, xuất hiện từ năm 1996, dành cho các dự án data mining và data science. Sáu giai đoạn của nó tạo khuôn khổ có thể lặp lại từ hiểu nghiệp vụ, hiểu dữ liệu đến triển khai. Các mô hình OSEMN, Design Thinking và Agile không đồng thời có đặc điểm lịch sử và chuẩn mở được nêu.

---

### ❓ Câu hỏi 55:
Which Python package can be used to estimate test coverage?

**Các phương án lựa chọn:**
- [ ] A. unittest
- [x] **B. coverage** *(Đáp án chính xác)*
- [ ] C. pytest
- [ ] D. flask

👉 **Đáp án đúng:** **B. coverage**
💡 **Giải thích chi tiết:** Package coverage theo dõi những dòng, nhánh hoặc hàm nào đã được thực thi trong quá trình chạy test, từ đó ước lượng mức độ bao phủ kiểm thử. Báo cáo coverage giúp phát hiện vùng code chưa được test để đội phát triển bổ sung test case có trọng tâm. unittest và pytest là framework viết hoặc chạy test, nhưng không phải công cụ chuyên đo test coverage.

---

### ❓ Câu hỏi 56:
A Kubernetes pod can contain multiple kubernetes deployments.

**Các phương án lựa chọn:**
- [ ] A. True.
- [x] **B. False.** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False.**
💡 **Giải thích chi tiết:** Pod là đối tượng chứa container chạy cùng nhau trong Kubernetes, còn Deployment là controller tạo và quản lý số lượng pod mong muốn. Deployment không thể nằm trong pod vì chính nó hoạt động ở tầng quản lý cao hơn để điều khiển pod replica. Do đó, phát biểu về một pod chứa nhiều deployment đảo ngược quan hệ kiến trúc giữa hai resource này.

---

### ❓ Câu hỏi 57:
The decision tree base models in random forests individually have high bias and low variance.

**Các phương án lựa chọn:**
- [ ] A. True.
- [x] **B. False.** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False.**
💡 **Giải thích chi tiết:** Một decision tree đơn lẻ thường có low bias vì có thể phân tách dữ liệu rất chi tiết theo các feature, nhưng lại high variance do thay đổi mẫu huấn luyện có thể tạo cây khác đáng kể. Random forest dùng bagging và chọn ngẫu nhiên đặc trưng để trung bình hóa nhiều cây, mục tiêu chính là giảm variance. Mô tả high bias và low variance vì thế trái với đặc tính thông thường của base tree.

---

### ❓ Câu hỏi 58:
What is a poisoning attack?

**Các phương án lựa chọn:**
- [ ] A. An attack that occurs during model deployment.
- [x] **B. An attack that injects malicious data into the training set.** *(Đáp án chính xác)*
- [ ] C. An attack that modifies the model's architecture.
- [ ] D. An attack that occurs only at test time.

👉 **Đáp án đúng:** **B. An attack that injects malicious data into the training set.**
💡 **Giải thích chi tiết:** Poisoning attack xảy ra ở giai đoạn dữ liệu huấn luyện, khi kẻ tấn công chèn, sửa hoặc gán nhãn sai những mẫu nhằm làm lệch hành vi mô hình sau khi học. Mục tiêu có thể là giảm hiệu năng chung hoặc tạo backdoor kích hoạt trong điều kiện đặc biệt. Nó khác với tấn công inference-time, thay đổi kiến trúc mô hình hay sự cố chỉ xảy ra khi deployment.

---

### ❓ Câu hỏi 59:
What does the term "trunk" refer to in the context of Continuous Integration?

**Các phương án lựa chọn:**
- [ ] A. A type of software bug
- [x] **B. The main branch of code where all changes are merged** *(Đáp án chính xác)*
- [ ] C. A deployment strategy
- [ ] D. A testing framework

👉 **Đáp án đúng:** **B. The main branch of code where all changes are merged**
💡 **Giải thích chi tiết:** Trong Continuous Integration, trunk là nhánh chính của codebase nơi các thay đổi đã kiểm tra được tích hợp thường xuyên. Làm việc hướng về trunk giúp giảm phân kỳ lâu dài giữa các nhánh và phát hiện xung đột sớm qua build, test tự động. Khái niệm này không chỉ một bug, framework test hay chiến lược deploy độc lập.

---

### ❓ Câu hỏi 60:
What is the primary purpose of documenting your data before starting a project?

**Các phương án lựa chọn:**
- [ ] A. To impress stakeholders
- [x] **B. To streamline the modeling process and ensure data quality** *(Đáp án chính xác)*
- [ ] C. To increase project costs
- [ ] D. To avoid using Python

👉 **Đáp án đúng:** **B. To streamline the modeling process and ensure data quality**
💡 **Giải thích chi tiết:** Documenting data trước dự án tạo một tham chiếu chung về schema, nguồn dữ liệu, ý nghĩa biến, quy tắc làm sạch và các hạn chế đã biết. Thông tin này giúp modeling process ít sai sót hơn vì nhóm hiểu chính xác những gì feature đại diện và cách dữ liệu được sinh ra. Nhờ đó data quality được kiểm soát chủ động thay vì chỉ phát hiện vấn đề sau khi mô hình thất bại.

---

### ❓ Câu hỏi 61:
What is the primary purpose of dimensionality reduction in data science?

**Các phương án lựa chọn:**
- [ ] A. To increase the number of features
- [x] **B. To simplify models and reduce computation time** *(Đáp án chính xác)*
- [ ] C. To eliminate all data points
- [ ] D. To create more complex models

👉 **Đáp án đúng:** **B. To simplify models and reduce computation time**
💡 **Giải thích chi tiết:** Dimensionality reduction rút bớt số feature hoặc biểu diễn dữ liệu trong không gian thấp chiều hơn nhưng vẫn giữ phần lớn cấu trúc hữu ích. Việc này giảm chi phí lưu trữ, thời gian train và nguy cơ overfitting khi dữ liệu có nhiều biến tương quan hoặc nhiễu. Mục tiêu không phải tăng feature hay xóa toàn bộ điểm dữ liệu, mà là làm bài toán đơn giản và hiệu quả hơn.

---

### ❓ Câu hỏi 62:
Thinking with the lens of the scientific process, what would your next steps be if you wanted to decide where to open the next store for your sled business?

**Các phương án lựa chọn:**
- [ ] A. Start pulling sales and other data to create a business viability assessment for Vermont
- [ ] B. Gather more data and repeat the snowfall experiment
- [x] **C. Gather different data say snowfall by county and repeat the experiment** *(Đáp án chính xác)*
- [ ] D. Start a business viability assessment for all three states

👉 **Đáp án đúng:** **C. Gather different data say snowfall by county and repeat the experiment**
💡 **Giải thích chi tiết:** Để chọn nơi mở cửa hàng sled tiếp theo, dữ liệu snowfall cần được đo ở độ phân giải phù hợp với khu vực kinh doanh thay vì chỉ ở cấp bang quá thô. Thu thập snowfall theo county rồi lặp lại thí nghiệm giúp kiểm tra xem kết luận có ổn định ở các đơn vị địa lý nhỏ hơn không. Bước này làm giả thuyết địa điểm đáng tin cậy hơn trước khi chuyển sang đánh giá khả thi kinh doanh.

---

### ❓ Câu hỏi 63:
What is the first step in setting up the Watson Developer Cloud Python SDK?

**Các phương án lựa chọn:**
- [ ] A. Install the SDK.
- [x] **B. Create an IBM Cloud account.** *(Đáp án chính xác)*
- [ ] C. Create a resource for Natural Language Understanding.
- [ ] D. Download the tutorial files.

👉 **Đáp án đúng:** **B. Create an IBM Cloud account.**
💡 **Giải thích chi tiết:** IBM Cloud account là tiền đề để người học đăng nhập nền tảng, tạo instance dịch vụ Watson và quản lý thông tin xác thực cần cho SDK. Sau khi có tài khoản, họ mới có thể provision Natural Language Understanding, lấy API key và cấu hình service URL. Cài SDK chỉ chuẩn bị môi trường cục bộ, không thể thay thế quyền truy cập tới tài nguyên cloud.

---

### ❓ Câu hỏi 64:
Which Python package can be used to estimate test coverage?

**Các phương án lựa chọn:**
- [ ] A. unittest
- [x] **B. coverage** *(Đáp án chính xác)*
- [ ] C. pytest
- [ ] D. flask

👉 **Đáp án đúng:** **B. coverage**
💡 **Giải thích chi tiết:** coverage đo mức độ phần mã nguồn đã được thực thi bởi test suite, thường báo cáo theo dòng hoặc nhánh. Chỉ số này không bảo đảm test hoàn toàn đúng, nhưng giúp phát hiện những vùng logic chưa từng được kiểm tra. unittest và pytest có thể chạy test, còn Flask là web framework; chúng không chuyên cung cấp phép đo coverage như package này.

---

### ❓ Câu hỏi 65:
Docker images are the basis of containers. It is possible to pull an image from the registry and ask the Docker client to run a container based on that image. Some images are official while many others are user defined.

**Các phương án lựa chọn:**
- [x] **A. True.** *(Đáp án chính xác)*
- [ ] B. False.

👉 **Đáp án đúng:** **A. True.**
💡 **Giải thích chi tiết:** Docker image chứa các layer cần thiết để khởi tạo môi trường chạy, còn container là instance thực thi được tạo từ image đó. Người dùng có thể pull image từ registry, kể cả official image hoặc image do cộng đồng tạo, rồi yêu cầu Docker client chạy container. Mô tả này phản ánh đúng quy trình image-to-container và tính mở của registry Docker.

---

### ❓ Câu hỏi 66:
What is the purpose of profiling in code optimization?

**Các phương án lựa chọn:**
- [ ] A. To write new algorithms from scratch
- [x] **B. To identify which parts of the code are bottlenecks** *(Đáp án chính xác)*
- [ ] C. To increase the number of processor cores
- [ ] D. To reduce the amount of data used

👉 **Đáp án đúng:** **B. To identify which parts of the code are bottlenecks**
💡 **Giải thích chi tiết:** Profiling thu thập số liệu về thời gian chạy, số lần gọi hàm hoặc mức sử dụng tài nguyên của từng phần code. Nhờ profile, kỹ sư xác định chính xác bottleneck thay vì tối ưu hóa dựa trên cảm giác hoặc viết lại toàn bộ thuật toán. Biết điểm nghẽn giúp tập trung công sức vào phần tạo ảnh hưởng lớn nhất đến hiệu năng chương trình.

---

### ❓ Câu hỏi 67:
Which of the following is the least valid statement when it comes to dashboards?

**Các phương án lựa chọn:**
- [ ] A. Dashboards are an easy way to share summaries and findings.
- [ ] B. Dashboards have interactive functionality that helps create a rich experience for the user.
- [ ] C. Dashboards are generally used after several iterations of the AI workflow.
- [x] **D. Dashboards are quick way to create portable simple plots.** *(Đáp án chính xác)*
- [ ] E. E. Dashboards can be used to tell the story of investigative visualizations.

👉 **Đáp án đúng:** **D. Dashboards are quick way to create portable simple plots.**
💡 **Giải thích chi tiết:** Dashboard thường kết hợp nhiều chỉ số, biểu đồ và tương tác để chia sẻ summary, hỗ trợ khám phá hoặc kể câu chuyện từ investigative visualization. Việc xây dashboard cần lựa chọn metric, thiết kế layout, kết nối dữ liệu và kiểm thử trải nghiệm, nên không chỉ là cách nhanh để tạo portable simple plots. Các phát biểu khác mô tả đúng hơn vai trò của dashboard trong giai đoạn đã qua nhiều vòng lặp phân tích.

---

### ❓ Câu hỏi 68:
What is the community package of the Docker Engine called?

**Các phương án lựa chọn:**
- [ ] A. docker-io
- [x] **B. docker-ce** *(Đáp án chính xác)*
- [ ] C. docker-compose
- [ ] D. docker-toolbox

👉 **Đáp án đúng:** **B. docker-ce**
💡 **Giải thích chi tiết:** docker-ce là viết tắt của Docker Community Edition, gói Docker Engine hướng tới cộng đồng và thường được cài từ kho chính thức của Docker. docker-compose là công cụ định nghĩa ứng dụng nhiều container, còn docker-toolbox là bộ công cụ cũ cho môi trường nhất định. docker-io là tên package do một số hệ điều hành phân phối, không phải tên community edition được hỏi.

---

### ❓ Câu hỏi 69:
Docker containers run a private file system that is isolated from the host and other containers. What is the suggested way to access notebooks and scripts from within the container?

**Các phương án lựa chọn:**
- [ ] A. tmpfs mount
- [ ] B. use a named pipe
- [x] **C. bind mounts** *(Đáp án chính xác)*
- [ ] D. GitHub
- [ ] E. E. volumes

👉 **Đáp án đúng:** **C. bind mounts**
💡 **Giải thích chi tiết:** Bind mount ánh xạ một thư mục hoặc file cụ thể từ host vào đường dẫn trong container, nên notebook và script được chỉnh sửa ngoài máy chủ có thể xuất hiện ngay bên trong môi trường container. Cách này đặc biệt thuận tiện cho phát triển tương tác vì không cần rebuild image sau mỗi thay đổi mã. Named pipe và tmpfs phục vụ mục đích khác, còn GitHub không phải cơ chế mount filesystem.

---

### ❓ Câu hỏi 70:
Which command is used to install the Watson Developer Cloud Python SDK?

**Các phương án lựa chọn:**
- [x] **A. pip install ibm-watson** *(Đáp án chính xác)*
- [ ] B. pip install --upgrade ibm-watson
- [ ] C. install ibm-watson
- [ ] D. upgrade ibm-watson

👉 **Đáp án đúng:** **A. pip install ibm-watson**
💡 **Giải thích chi tiết:** pip install ibm-watson dùng package manager của Python để cài IBM Watson SDK vào environment đang hoạt động. Sau khi cài, các class như NaturalLanguageUnderstandingV1 có thể được import và khởi tạo bằng credential thích hợp. Cú pháp --upgrade thiên về nâng phiên bản có sẵn, còn chỉ viết install hoặc upgrade không chỉ rõ công cụ thực thi nên không phải lệnh shell đầy đủ.

---

### ❓ Câu hỏi 71:
What is the primary purpose of dimensionality reduction in data science?

**Các phương án lựa chọn:**
- [ ] A. To increase the number of features
- [x] **B. To simplify models and reduce computation time** *(Đáp án chính xác)*
- [ ] C. To eliminate all data points
- [ ] D. To create more complex models

👉 **Đáp án đúng:** **B. To simplify models and reduce computation time**
💡 **Giải thích chi tiết:** Dimensionality reduction, tức giảm chiều, biểu diễn dataset bằng ít trục thông tin hơn, từ đó làm thuật toán huấn luyện nhanh và mô hình dễ quản lý hơn. Các kỹ thuật như PCA còn có thể loại bớt feature tương quan hoặc nhiễu, giảm nguy cơ mô hình học thuộc dữ liệu. Đây là sự đơn giản hóa có kiểm soát, không phải tăng độ phức tạp hay loại bỏ tất cả quan sát.

---

### ❓ Câu hỏi 72:
Which of the following is the least valid statement when it comes to dashboards?

**Các phương án lựa chọn:**
- [ ] A. Dashboards are an easy way to share summaries and findings
- [ ] B. Dashboards have interactive functionality that helps create a rich experience for the user
- [ ] C. Dashboards are generally used after serveral iterations of the AI workflow
- [x] **D. Dashboards are quick way to create portable simple plots** *(Đáp án chính xác)*
- [ ] E. E. Dashboards can be used to tell the story of investigative visualizations

👉 **Đáp án đúng:** **D. Dashboards are quick way to create portable simple plots**
💡 **Giải thích chi tiết:** Dashboard không đơn thuần là tập các simple plot có thể tạo nhanh và mang đi bất kỳ đâu. Một dashboard hữu ích đòi hỏi chọn KPI, tổ chức ngữ cảnh, thiết kế tương tác và bảo đảm dữ liệu cập nhật đáng tin cậy. Các chức năng chia sẻ kết quả, trải nghiệm tương tác và hỗ trợ storytelling phản ánh đúng giá trị của nó sau nhiều iteration trong AI workflow.

---

### ❓ Câu hỏi 73:
Processing the corpus with the provided lemmatize_document reduces the total number of tokens to what percentage of the original?

**Các phương án lựa chọn:**
- [ ] A. 10-15%
- [ ] B. 20-35%
- [ ] C. 45-50%
- [x] **D. 70-75%** *(Đáp án chính xác)*
- [ ] E. E. 85-95%

👉 **Đáp án đúng:** **D. 70-75%**
💡 **Giải thích chi tiết:** Hàm lemmatize_document làm giảm số token bằng cách quy các dạng chia thì, số nhiều hoặc biến thể hình thái về một lemma chuẩn. Vì nhiều từ khác nhau vẫn giữ nội dung cần thiết sau chuẩn hóa, corpus không bị rút xuống mức quá thấp. Kết quả thực hành cho thấy token còn lại khoảng 70–75% số ban đầu, phù hợp với tác động gộp dạng từ vừa phải.

---

### ❓ Câu hỏi 74:
If you have data with a large number of features and you are sure that it will take some time to train and tune the model, which approach is LEAST likely to result in a speed improvement during grid-searching?

**Các phương án lựa chọn:**
- [ ] A. In your pipeline use variance thresholding to limit the number of features.
- [x] **B. Use the Shuffle and split form of cross-validation.** *(Đáp án chính xác)*
- [ ] C. Use a randomized grid search form of cross validation.
- [ ] D. Randomly subset the data.
- [ ] E. E. Use PCA to reduce the dimensionality of the data before training.

👉 **Đáp án đúng:** **B. Use the Shuffle and split form of cross-validation.**
💡 **Giải thích chi tiết:** Grid search chậm chủ yếu vì phải fit nhiều tổ hợp tham số trên nhiều lần validation. Giảm feature bằng variance threshold hoặc PCA, giảm mẫu, và randomized search đều làm giảm khối lượng fit hoặc kích thước bài toán. ShuffleSplit chỉ tạo các phép chia ngẫu nhiên cho cross-validation; nếu số split không đổi, nó không giảm bản chất số lần train nên ít có khả năng cải thiện tốc độ nhất.

---

### ❓ Câu hỏi 75:
A decision tree classifier is useful as a model for the AAVAIl subscriber churn data.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Decision tree classifier phân chia thuê bao theo những quy tắc dễ diễn giải dựa trên các feature liên quan tới khả năng churn. Với dữ liệu AAVAIl, cây có thể phát hiện tổ hợp điều kiện mà một khách hàng có nguy cơ rời bỏ cao, đồng thời trình bày rõ đường đi tới dự báo. Vì vậy nó là lựa chọn hữu ích cho bài toán churn dù vẫn cần đánh giá cùng các mô hình cạnh tranh khác.

---

### ❓ Câu hỏi 76:
What is the purpose of profiling in code optimization?

**Các phương án lựa chọn:**
- [ ] A. To write new algorithms from scratch.
- [x] **B. To identify which parts of the code are bottlenecks.** *(Đáp án chính xác)*
- [ ] C. To increase the number of processor cores.
- [ ] D. To reduce the amount of data used.

👉 **Đáp án đúng:** **B. To identify which parts of the code are bottlenecks.**
💡 **Giải thích chi tiết:** Profiling không trực tiếp làm code nhanh hơn, nhưng cho biết hàm, vòng lặp hoặc thao tác I/O nào đang tiêu tốn thời gian nhiều nhất. Dựa vào bằng chứng này, kỹ sư có thể vectorize, cache, song song hóa hoặc thay thuật toán đúng tại vị trí cần thiết. Mục tiêu là nhận diện bottleneck, không phải tăng lõi CPU một cách mù quáng hay giảm dữ liệu không có căn cứ.

---

### ❓ Câu hỏi 77:
When you compiled the JSON files into a single DataFrame or NumPy array, about how many days did the entire range of dates span?

**Các phương án lựa chọn:**
- [ ] A. 400
- [ ] B. 450
- [x] **C. 500** *(Đáp án chính xác)*
- [ ] D. 600
- [ ] E. E. 650

👉 **Đáp án đúng:** **C. 500**
💡 **Giải thích chi tiết:** Khi các JSON được hợp nhất, độ dài khoảng thời gian được tính từ range của các giá trị ngày có mặt trong tập dữ liệu. Kết quả của bài thực hành chỉ ra phạm vi này vào khoảng 500 ngày, cho thấy dữ liệu bao phủ hơn một năm. Giá trị đó khác với số record vì nhiều giao dịch có thể xảy ra cùng một ngày.

---

### ❓ Câu hỏi 78:
Which of the following is a common challenge when optimizing code for machine learning models?

**Các phương án lựa chọn:**
- [ ] A. Lack of available data.
- [x] **B. Difficulty in improving training time for large models.** *(Đáp án chính xác)*
- [ ] C. Inability to use multiple GPUs.
- [ ] D. Limited programming languages available.

👉 **Đáp án đúng:** **B. Difficulty in improving training time for large models.**
💡 **Giải thích chi tiết:** Tối ưu hóa code cho mô hình machine learning thường khó khi model lớn khiến số phép tính, bộ nhớ và thời gian truyền dữ liệu tăng nhanh. Rút ngắn training time đòi hỏi lựa chọn thuật toán, batching, phần cứng hoặc song song hóa phù hợp, không chỉ thay đổi cú pháp. Việc thiếu data, không dùng được GPU hoặc ít ngôn ngữ lập trình không phải khó khăn phổ biến nhất trong bối cảnh này.

---

### ❓ Câu hỏi 79:
What is a common issue with using accuracy as a metric for imbalanced classes?

**Các phương án lựa chọn:**
- [ ] A. It is always accurate.
- [x] **B. It can be misleading.** *(Đáp án chính xác)*
- [ ] C. It is the only metric available.
- [ ] D. It does not consider false positives.

👉 **Đáp án đúng:** **B. It can be misleading.**
💡 **Giải thích chi tiết:** Accuracy tính tỷ lệ dự báo đúng trên toàn bộ mẫu, nên có thể bị lớp đa số chi phối mạnh trong dữ liệu imbalanced. Một mô hình đoán toàn bộ là lớp phổ biến vẫn đạt tỷ lệ cao nhưng không có giá trị cho việc nhận diện lớp hiếm. Vì thế accuracy dễ gây hiểu lầm và cần được bổ sung bằng recall, precision hoặc F1 theo từng lớp.

---

### ❓ Câu hỏi 80:
What is a poisoning attack?

**Các phương án lựa chọn:**
- [ ] A. An attack that occurs during model deployment
- [x] **B. An attack that injects malicious data into the training set** *(Đáp án chính xác)*
- [ ] C. An attack that modifies the model's architecture
- [ ] D. An attack that occurs only at test time

👉 **Đáp án đúng:** **B. An attack that injects malicious data into the training set**
💡 **Giải thích chi tiết:** Poisoning attack thao túng training set bằng các mẫu độc hại, nhãn sai hoặc phân phối dữ liệu bị cài cắm để mô hình học hành vi không mong muốn. Khác với evasion attack xảy ra khi suy luận, poisoning làm hỏng quá trình học ngay từ nguồn. Điều này có thể tạo suy giảm hiệu năng tổng quát hoặc lỗ hổng backdoor tồn tại sau khi model được triển khai.

---

### ❓ Câu hỏi 81:
In the context of the AI workflow presented in these materials which of the following is not an example of a valid feedback loop?

**Các phương án lựa chọn:**
- [ ] A. Trying different data transformations on a given model
- [x] **B. Returning to the data collection stage from transformations to reduce the number of transforms** *(Đáp án chính xác)*
- [ ] C. Performing EDA on the data after a model has been deployed and data have been logged
- [ ] D. Moving from the business opportunity and data collection to model iteration
- [ ] E. E. Returning to discuss the business opportunity after a model has been deployed

👉 **Đáp án đúng:** **B. Returning to the data collection stage from transformations to reduce the number of transforms**
💡 **Giải thích chi tiết:** Một feedback loop tốt phải dùng kết quả ở giai đoạn sau để quay lại cải thiện câu hỏi kinh doanh, thu thập dữ liệu, feature hay mô hình. Việc quay từ transformation về data collection chỉ để giảm số transformation không thể hiện nguyên nhân học hỏi rõ ràng giữa hai bước. Ngược lại, EDA sau deployment, model iteration sau hiểu dữ liệu, hoặc xem lại business opportunity đều có thể tạo vòng phản hồi hợp lệ.

---

### ❓ Câu hỏi 82:
What will the management team want to know after the sales data is released?

**Các phương án lựa chọn:**
- [ ] A. The number of products sold
- [x] **B. If the teams are well-optimized based on historical sales data** *(Đáp án chính xác)*
- [ ] C. The marketing budget for each team
- [ ] D. The demographics of the customers

👉 **Đáp án đúng:** **B. If the teams are well-optimized based on historical sales data**
💡 **Giải thích chi tiết:** Khi sales data được phát hành, quản lý cần đánh giá liệu cách tổ chức đội ngũ có được tối ưu hóa dựa trên historical sales data hay không. Câu trả lời hỗ trợ quyết định phân bổ nguồn lực, điều chỉnh vùng bán hàng và đặt mục tiêu vận hành. Số sản phẩm bán, ngân sách hay nhân khẩu học là dữ liệu bổ trợ nhưng không trực tiếp kiểm tra hiệu quả tối ưu đội nhóm.

---

### ❓ Câu hỏi 83:
What type of data structures are used as standardized input to the interfaces in scikit-learn?

**Các phương án lựa chọn:**
- [ ] A. Lists and dictionaries
- [ ] B. DataFrames and Series
- [x] **C. NumPy arrays and SciPy sparse matrices** *(Đáp án chính xác)*
- [ ] D. Strings and tuples

👉 **Đáp án đúng:** **C. NumPy arrays and SciPy sparse matrices**
💡 **Giải thích chi tiết:** scikit-learn chuẩn hóa nhiều thuật toán quanh NumPy arrays và SciPy sparse matrices vì chúng biểu diễn hiệu quả feature matrix dạng dense hoặc sparse. Chuẩn chung này cho phép estimator, transformer và pipeline trao đổi dữ liệu với ít chuyển đổi đặc thù. DataFrame hữu ích ở lớp thao tác dữ liệu, nhưng interface cốt lõi không dựa chủ yếu vào list, dictionary, string hoặc tuple.

---

### ❓ Câu hỏi 84:
Which library in Python is commonly used for reading and writing CSV files?

**Các phương án lựa chọn:**
- [ ] A. NumPy
- [ ] B. Matplotlib
- [x] **C. Pandas** *(Đáp án chính xác)*
- [ ] D. SciPy

👉 **Đáp án đúng:** **C. Pandas**
💡 **Giải thích chi tiết:** Pandas có read_csv để nạp file CSV thành DataFrame và to_csv để xuất dữ liệu sau khi đã làm sạch hoặc phân tích. DataFrame còn cung cấp index, column label và thao tác vectorized phù hợp với dữ liệu bảng. NumPy có thể đọc số liệu trong một số trường hợp, nhưng không là thư viện phổ biến nhất cho quy trình CSV có schema, missing values và cột hỗn hợp.

---

### ❓ Câu hỏi 85:
Which of the following neural network architectures are most-commonly used for time-series analysis?

**Các phương án lựa chọn:**
- [ ] A. Multi-layer perceptron
- [x] **B. Recurrent neural networks** *(Đáp án chính xác)*
- [ ] C. Transfer learning
- [ ] D. Convolutional neural network
- [ ] E. E. Autoencoders

👉 **Đáp án đúng:** **B. Recurrent neural networks**
💡 **Giải thích chi tiết:** Recurrent neural network duy trì hidden state qua các bước tuần tự, cho phép thông tin từ thời điểm trước ảnh hưởng đến dự báo tại thời điểm sau. Đặc tính này phù hợp với time-series như doanh số, cảm biến hoặc chuỗi văn bản, nơi thứ tự và phụ thuộc thời gian quan trọng. MLP không có trạng thái tuần tự, còn transfer learning là chiến lược và autoencoder chủ yếu phục vụ biểu diễn hoặc tái tạo dữ liệu.

---

### ❓ Câu hỏi 86:
When embarking on a data science project, why do you ultimately want to format your data so that it can be housed in something like a Pandas DataFrame or NumPy Array?

**Các phương án lựa chọn:**
- [ ] A. DataFrames/Arrays most closely resemble tables in relational databases.
- [ ] B. DataFrames/Arrays are the only structures in Python capable of holding significant amounts of data.
- [x] **C. Nearly all modeling algorithms take input data in a tabular format analogous to format of DataFrame/Arrays.** *(Đáp án chính xác)*
- [ ] D. All of the answers

👉 **Đáp án đúng:** **C. Nearly all modeling algorithms take input data in a tabular format analogous to format of DataFrame/Arrays.**
💡 **Giải thích chi tiết:** Đưa dữ liệu về DataFrame hoặc NumPy array giúp sắp xếp các quan sát và feature theo dạng tabular mà đa số thuật toán modeling kỳ vọng. Định dạng thống nhất còn giúp tách X và y, áp dụng transformer và đưa dữ liệu qua pipeline ít lỗi hơn. Chúng không phải kiểu cấu trúc duy nhất lưu được dữ liệu, nhưng tương thích rộng nhất với hệ sinh thái phân tích và học máy Python.

---

### ❓ Câu hỏi 87:
Docker containers run a private file system that is isolated from the host and other containers. What is the suggested way to access notebooks and scripts from within the container?

**Các phương án lựa chọn:**
- [ ] A. tmpfs mount
- [ ] B. use a named pipe
- [x] **C. bind mounts** *(Đáp án chính xác)*
- [ ] D. GitHub
- [ ] E. E. volumes

👉 **Đáp án đúng:** **C. bind mounts**
💡 **Giải thích chi tiết:** Bind mount gắn trực tiếp đường dẫn từ host vào container, cho phép notebook và script được dùng trong container nhưng vẫn chỉnh sửa bằng công cụ trên host. Sự liên kết này hỗ trợ thử nghiệm lặp nhanh mà không phải copy file hoặc rebuild image mỗi lần thay đổi. Volume phù hợp lưu dữ liệu do Docker quản lý, còn GitHub chỉ là nền tảng mã nguồn chứ không tạo mount runtime.

---

### ❓ Câu hỏi 88:
Which Python package supports spawning processes for code optimization?

**Các phương án lựa chọn:**
- [ ] A. threading
- [ ] B. subprocess
- [x] **C. multiprocessing** *(Đáp án chính xác)*
- [ ] D. numpy

👉 **Đáp án đúng:** **C. multiprocessing**
💡 **Giải thích chi tiết:** multiprocessing cung cấp Process và Pool để phân phối công việc sang nhiều process, tận dụng các CPU core cho bài toán tính toán nặng. Do mỗi process có interpreter riêng, nó tránh được giới hạn của Global Interpreter Lock đối với Python bytecode CPU-bound. threading phù hợp hơn với I/O concurrency, subprocess quản lý chương trình ngoài, còn NumPy không điều phối process ở cấp API này.

---

### ❓ Câu hỏi 89:
Which of the following is a common challenge when optimizing code for machine learning models?

**Các phương án lựa chọn:**
- [ ] A. Lack of available data
- [x] **B. Difficulty in improving training time for large models** *(Đáp án chính xác)*
- [ ] C. Inability to use multiple GPUs
- [ ] D. Limited programming languages available

👉 **Đáp án đúng:** **B. Difficulty in improving training time for large models**
💡 **Giải thích chi tiết:** Với mô hình lớn, mỗi epoch có thể tốn nhiều phép nhân ma trận, truyền dữ liệu và bộ nhớ, làm việc giảm training time trở thành khó khăn thực tế. Các cách cải thiện như profiling, mini-batch, GPU, distributed training hoặc giảm chiều thường cần đánh đổi độ chính xác và chi phí. Những lựa chọn về ngôn ngữ hay số GPU sẵn có không phải thách thức bản chất được mô tả rõ nhất.

---

### ❓ Câu hỏi 90:
Which of the following is NOT a factor that affects the time spent on data cleaning?

**Các phương án lựa chọn:**
- [ ] A. Team experience
- [ ] B. Data quality
- [ ] C. Project requirements
- [x] **D. Company size** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. Company size**
💡 **Giải thích chi tiết:** Data cleaning thay đổi thời gian đáng kể theo chất lượng dữ liệu, độ phức tạp yêu cầu và năng lực nhận diện, sửa lỗi của nhóm thực hiện. Các file nhiều missing values, duplicate hoặc schema không nhất quán cần nhiều kiểm tra và biến đổi hơn. Company size không tự xác định mức bẩn, volume hay quy tắc nghiệp vụ của dataset nên không là yếu tố trực tiếp trong câu hỏi.

---

### ❓ Câu hỏi 91:
Which country had the most total revenue when you summed across all purchases?

**Các phương án lựa chọn:**
- [ ] A. Singapore
- [x] **B. United Kingdom** *(Đáp án chính xác)*
- [ ] C. USA
- [ ] D. EIRE
- [ ] E. E. Germany

👉 **Đáp án đúng:** **B. United Kingdom**
💡 **Giải thích chi tiết:** Bài thực hành yêu cầu group purchase theo country rồi sum tổng revenue để so sánh quy mô doanh thu quốc gia. Kết quả cho thấy United Kingdom có tổng giá trị cao nhất trong nhóm lựa chọn, vượt Singapore, USA, EIRE và Germany. Cách trả lời dựa trên aggregate monetary value, không phải cảm nhận về quy mô thị trường hoặc số giao dịch riêng lẻ.

---

### ❓ Câu hỏi 92:
Why is granular data preferred over summary level data?

**Các phương án lựa chọn:**
- [ ] A. It is easier to collect.
- [x] **B. It allows for more detailed analysis.** *(Đáp án chính xác)*
- [ ] C. It takes less time to process.
- [ ] D. It is more visually appealing.

👉 **Đáp án đúng:** **B. It allows for more detailed analysis.**
💡 **Giải thích chi tiết:** Granular data giữ nguyên chi tiết ở cấp giao dịch hoặc quan sát, nhờ đó analyst có thể phân khúc, phát hiện ngoại lệ và thử những câu hỏi mới sau này. Summary level data đã tổng hợp thông tin nên khó đảo ngược để tìm nguyên nhân hay nhóm nhỏ khác biệt. Vì vậy, tính chi tiết mở rộng khả năng phân tích thay vì chỉ làm dữ liệu đẹp hơn hoặc xử lý nhanh hơn.

---

### ❓ Câu hỏi 93:
What is the first stage of the design thinking process?

**Các phương án lựa chọn:**
- [ ] A. Ideate
- [x] **B. Empathize** *(Đáp án chính xác)*
- [ ] C. Prototype
- [ ] D. Test

👉 **Đáp án đúng:** **B. Empathize**
💡 **Giải thích chi tiết:** Empathize đặt người dùng làm điểm khởi đầu bằng cách quan sát, phỏng vấn và tìm hiểu trải nghiệm thực tế của họ. Insight thu được giúp đội ngũ định nghĩa đúng vấn đề trước khi chuyển sang ideate, prototype và test giải pháp. Nếu bỏ qua bước đồng cảm, các giai đoạn sau dễ tối ưu một ý tưởng không thật sự đáp ứng nhu cầu của người dùng.

---

### ❓ Câu hỏi 94:
Which command-line tool is used to interact with the Kubernetes API?

**Các phương án lựa chọn:**
- [ ] A. Kubelet
- [x] **B. kubectl** *(Đáp án chính xác)*
- [ ] C. Docker
- [ ] D. Helm

👉 **Đáp án đúng:** **B. kubectl**
💡 **Giải thích chi tiết:** kubectl là CLI chuẩn để gửi lệnh tới Kubernetes API, bao gồm truy vấn resource, áp dụng cấu hình và theo dõi trạng thái workload. Viết liền tên công cụ là `kubectl`; lỗi tách chữ trong dữ liệu nguồn chỉ là lỗi trình bày, không thay đổi khái niệm kỹ thuật được kiểm tra. Kubelet là node agent, Docker là container runtime, còn Helm tập trung quản lý chart package.

---

### ❓ Câu hỏi 95:
Which of the following neural network architectures are most-commonly used for time-series analysis?

**Các phương án lựa chọn:**
- [ ] A. Multi-layer perceptron
- [x] **B. Recurrent neural networks** *(Đáp án chính xác)*
- [ ] C. Transfer learning
- [ ] D. Convolutional neural network
- [ ] E. E. Autoencoders

👉 **Đáp án đúng:** **B. Recurrent neural networks**
💡 **Giải thích chi tiết:** RNN xử lý time-series bằng cách truyền hidden state từ timestep trước sang timestep sau, nhờ đó mô hình hóa được quan hệ phụ thuộc theo trình tự. Cơ chế này cho phép dự báo dựa trên lịch sử gần hoặc dài của chuỗi thay vì xem mỗi thời điểm độc lập. CNN có thể áp dụng cho chuỗi trong một số thiết kế, nhưng RNN là kiến trúc được sử dụng phổ biến và trực tiếp nhất theo lựa chọn.

---

### ❓ Câu hỏi 96:
What is the purpose of the classification_report in sklearn?

**Các phương án lựa chọn:**
- [ ] A. To visualize data
- [x] **B. To summarize model performance** *(Đáp án chính xác)*
- [ ] C. To preprocess data
- [ ] D. To train a model

👉 **Đáp án đúng:** **B. To summarize model performance**
💡 **Giải thích chi tiết:** classification_report của sklearn tổng hợp các metric đánh giá mô hình phân loại theo từng class, thường gồm precision, recall, F1-score và support. Báo cáo này giúp nhìn rõ model hoạt động không đồng đều ra sao giữa các nhãn thay vì chỉ xem một accuracy chung. Nó không dùng để visualize, preprocess hay train mô hình; các bước đó thuộc chức năng khác trong workflow.

---

### ❓ Câu hỏi 97:
What is the purpose of the classification_report in sklearn?

**Các phương án lựa chọn:**
- [ ] A. To visualize data
- [x] **B. To summarize model performance** *(Đáp án chính xác)*
- [ ] C. To preprocess data
- [ ] D. To train a model

👉 **Đáp án đúng:** **B. To summarize model performance**
💡 **Giải thích chi tiết:** Hàm classification_report trình bày precision, recall, F1-score và số lượng mẫu support để đánh giá chất lượng dự báo phân loại theo từng lớp. Các metric này đặc biệt hữu ích khi lớp mất cân bằng hoặc chi phí của false positive và false negative khác nhau. Vì thế, công cụ có nhiệm vụ summarize performance sau dự báo chứ không thay thế quá trình huấn luyện hay chuẩn bị dữ liệu.

---

### ❓ Câu hỏi 98:
What is the community package of the Docker Engine called?

**Các phương án lựa chọn:**
- [ ] A. docker-io
- [x] **B. docker-ce** *(Đáp án chính xác)*
- [ ] C. docker-compose
- [ ] D. docker-toolbox

👉 **Đáp án đúng:** **B. docker-ce**
💡 **Giải thích chi tiết:** Docker Community Edition được gọi là docker-ce, chỉ phiên bản Docker Engine phân phối cho cộng đồng phát triển và sử dụng. Tên package này phân biệt với các sản phẩm hoặc công cụ phụ trợ như docker-compose, vốn điều phối ứng dụng nhiều container. docker-io có thể xuất hiện trong repository của hệ điều hành, nhưng không phải tên community package mà Docker đặt cho engine này.

---

### ❓ Câu hỏi 99:
For given input lists: a,b,c and 1,2,3 Create a dictionary from two input lists

**Các phương án lựa chọn:**
- [x] **A. def make_dict(lst1,lst2): res = {}; for key,value in zip(lst1,lst2): res[key] = value; return res** *(Đáp án chính xác)*
- [ ] B. def make_dict(lst1,lst2): res = {}; res[lst1] = lst2; return res
- [ ] C. def make_dict(lst1,lst2): res = []; for key,value in (lst1,lst2): res[key] = value; return res
- [ ] D. def make_dict(lst1,lst2): res = []; for key,value in zip(lst1,lst2): res[key] = value; return res

👉 **Đáp án đúng:** **A. def make_dict(lst1,lst2): res = {}; for key,value in zip(lst1,lst2): res[key] = value; return res**
💡 **Giải thích chi tiết:** Để tạo dictionary từ hai list song song, cần ghép từng key với value cùng vị trí bằng zip và lưu chúng trong dictionary rỗng. Sau vòng lặp, a, b, c lần lượt được ánh xạ tới 1, 2, 3; đây là cấu trúc mapping hợp lệ trong Python. Dữ liệu nguồn đã tách nhầm các dòng code thành nhiều lựa chọn, nên phần chuẩn hóa khôi phục đầy đủ block code đúng để lời giải có đối tượng kỹ thuật chính xác.

---

### ❓ Câu hỏi 100:
What does the term "trunk" refer to in the context of Continuous Integration?

**Các phương án lựa chọn:**
- [ ] A. A type of software bug.
- [x] **B. The main branch of code where all changes are merged.** *(Đáp án chính xác)*
- [ ] C. A deployment strategy.
- [ ] D. A testing framework.

👉 **Đáp án đúng:** **B. The main branch of code where all changes are merged.**
💡 **Giải thích chi tiết:** Trunk là nhánh trung tâm trong repository mà nhóm thường xuyên merge các thay đổi nhỏ đã được build và test. Cách làm này là nền tảng của Continuous Integration vì giảm thời gian các nhánh tách rời và phát hiện xung đột sớm. Trunk không nói về bug, testing framework hay deployment strategy, mà nói về nơi hội tụ chính của mã nguồn.

---
