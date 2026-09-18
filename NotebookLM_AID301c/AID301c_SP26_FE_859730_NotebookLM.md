# 📘 AID301c SP26 FE Ca 2 (Mã 859730) - (50 Câu Có Giải Thích)

> **Mô tả tài liệu**: Bộ đề thi ca 2 học kỳ SP26 kèm giải thích chi tiết.
> **Môn học**: AID301c - Trí Tuệ Nhân Tạo (IBM AI Enterprise Workflow Specialization)
> **Tổng số câu hỏi**: 50 câu

---

### ❓ Câu hỏi 1:
What is a poisoning attack?

**Các phương án lựa chọn:**
- [ ] A. An attack that occurs during model deployment
- [x] **B. An attack that injects malicious data into the training set** *(Đáp án chính xác)*
- [ ] C. An attack that modifies the model's architecture
- [ ] D. An attack that occurs only at test time

👉 **Đáp án đúng:** **B. An attack that injects malicious data into the training set**
💡 **Giải thích chi tiết:** Poisoning attack làm ô nhiễm training data bằng cách chèn mẫu độc hại, sửa feature hoặc gán nhãn sai trước khi mô hình học. Vì model coi những mẫu đó là dữ liệu hợp lệ, hành vi dự báo sau này có thể lệch có chủ đích hoặc xuất hiện backdoor. Đây khác với tấn công lúc deployment hay test, vốn không thay đổi trực tiếp tập huấn luyện.

---

### ❓ Câu hỏi 2:
Which command-line tool is used to interact with the Kubernetes API?

**Các phương án lựa chọn:**
- [ ] A. Kubelet
- [x] **B. kubectl** *(Đáp án chính xác)*
- [ ] C. Docker
- [ ] D. Helm

👉 **Đáp án đúng:** **B. kubectl**
💡 **Giải thích chi tiết:** kubectl là công cụ dòng lệnh gửi yêu cầu đến Kubernetes API để làm việc với control plane của cluster. Người dùng có thể dùng nó để xem, tạo, cập nhật và gỡ các resource như pod, service hoặc deployment. Kubelet thực thi nhiệm vụ trên node, Docker chạy container, còn Helm quản lý chart nên không thay thế vai trò CLI của kubectl.

---

### ❓ Câu hỏi 3:
What does the term "trunk" refer to in the context of Continuous Integration?

**Các phương án lựa chọn:**
- [ ] A. A type of software bug
- [x] **B. The main branch of code where all changes are merged** *(Đáp án chính xác)*
- [ ] C. A deployment strategy
- [ ] D. A testing framework

👉 **Đáp án đúng:** **B. The main branch of code where all changes are merged**
💡 **Giải thích chi tiết:** Trong Continuous Integration, trunk là nhánh chính nơi nhóm tích hợp thay đổi thường xuyên sau khi build và test. Cách làm này hạn chế divergence kéo dài giữa các nhánh và làm xung đột xuất hiện sớm, dễ xử lý hơn. Trunk không phải tên bug, framework kiểm thử hay một chiến lược triển khai độc lập.

---

### ❓ Câu hỏi 4:
The decision tree base models in random forests individually have high bias and low variance.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Cây quyết định đơn lẻ thường có low bias vì có thể khớp các ranh giới phức tạp trong dữ liệu, nhưng high variance do thay đổi mẫu huấn luyện có thể tạo cây khác đáng kể. Random forest lấy trung bình nhiều cây để giảm variance này. Vì vậy phát biểu gán high bias và low variance cho base tree đã đảo ngược đặc tính thông thường.

---

### ❓ Câu hỏi 5:
Which Python package can be used to estimate test coverage?

**Các phương án lựa chọn:**
- [ ] A. unittest
- [x] **B. coverage** *(Đáp án chính xác)*
- [ ] C. pytest
- [ ] D. flask

👉 **Đáp án đúng:** **B. coverage**
💡 **Giải thích chi tiết:** coverage theo dõi phần mã nguồn thực sự được chạy khi test suite thực thi, như số dòng hoặc nhánh đã được chạm tới. Báo cáo coverage giúp phát hiện code path chưa có test để bổ sung kiểm thử đúng trọng tâm. unittest và pytest chủ yếu tổ chức, chạy test; Flask là web framework, không thực hiện phép đo test coverage chuyên biệt này.

---

### ❓ Câu hỏi 6:
In the context of the AI workflow presented in these materials which of the following is not an example of a valid feedback loop?

**Các phương án lựa chọn:**
- [ ] A. Trying different data transformations on a given model
- [x] **B. Returning to the data collection stage from transformations to reduce the number of transforms** *(Đáp án chính xác)*
- [ ] C. Performing EDA on the data after a model has been deployed and data have been logged
- [ ] D. Moving from the business opportunity and data collection to model iteration
- [ ] E. Returning to discuss the business opportunity after a model has been deployed

👉 **Đáp án đúng:** **B. Returning to the data collection stage from transformations to reduce the number of transforms**
💡 **Giải thích chi tiết:** Feedback loop có giá trị khi đầu ra của một pha tạo thông tin để cải thiện dữ liệu, giả thuyết, mô hình hoặc mục tiêu nghiệp vụ ở pha trước. Quay về data collection chỉ nhằm giảm số phép transformation không nêu một cơ chế học hỏi hợp lý, vì thêm dữ liệu không tự quyết định transform nào cần loại bỏ. Các vòng lặp khác có thể tạo insight thực tế sau modeling hoặc deployment.

---

### ❓ Câu hỏi 7:
When you compiled the JSON files into a single DataFrame or NumPy array, about how many days did the entire range of dates span?

**Các phương án lựa chọn:**
- [ ] A. 400
- [ ] B. 450
- [x] **C. 500** *(Đáp án chính xác)*
- [ ] D. 600
- [ ] E. 650

👉 **Đáp án đúng:** **C. 500**
💡 **Giải thích chi tiết:** Sau khi gộp các JSON thành một DataFrame hoặc NumPy array, cần so sánh ngày nhỏ nhất và lớn nhất để xác định toàn bộ time range. Kết quả bài thực hành cho thấy khoảng này vào khoảng 500 ngày. Giá trị đó nói về độ phủ thời gian của dữ liệu, không phải số hàng vì một ngày có thể chứa nhiều record.

---

### ❓ Câu hỏi 8:
What is the purpose of kubectl in kubernetes?

**Các phương án lựa chọn:**
- [ ] A. Automatic logging of requests and responses
- [ ] B. A tool that makes it easy to run a single-node cluster locally
- [ ] C. The primary node agent on each node, responsible for the processes running on that machine
- [x] **D. The CLI for communicating with the kubernetes cluster** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. The CLI for communicating with the kubernetes cluster**
💡 **Giải thích chi tiết:** kubectl tạo giao diện thống nhất giữa người vận hành và Kubernetes cluster từ terminal. Các lệnh của nó được gửi qua Kubernetes API tới control plane để truy vấn trạng thái hoặc thay đổi resource. Nó không phải node agent, công cụ dựng cụm local hay hệ thống log request-response; các chức năng đó thuộc những thành phần khác trong hệ sinh thái.

---

### ❓ Câu hỏi 9:
A Kubernetes pod can contain multiple kubernetes deployments

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Pod là đơn vị triển khai bao quanh một hoặc nhiều container cần chia sẻ network và storage context. Deployment nằm ở tầng controller, có nhiệm vụ duy trì số pod replica mong muốn và quản lý cập nhật phiên bản. Vì quan hệ đúng là Deployment quản lý pod, một pod không thể chứa multiple deployments như phát biểu đưa ra.

---

### ❓ Câu hỏi 10:
Which country had the most total revenue when you summed across all purchases?

**Các phương án lựa chọn:**
- [ ] A. Singapore
- [x] **B. United Kingdom** *(Đáp án chính xác)*
- [ ] C. USA
- [ ] D. EIRE
- [ ] E. Germany

👉 **Đáp án đúng:** **B. United Kingdom**
💡 **Giải thích chi tiết:** Cách xác định quốc gia có doanh thu cao nhất là group các purchase theo country rồi tính tổng monetary value của từng nhóm. Trong kết quả bán hàng của bài tập, United Kingdom có tổng revenue lớn nhất giữa các phương án nêu ra. Kết luận này dựa trên phép aggregate doanh thu, không suy ra từ số lượng khách hàng hoặc cảm nhận về quy mô thị trường.

---

### ❓ Câu hỏi 11:
Which of the following is a key aspect of applying data transformations?

**Các phương án lựa chọn:**
- [ ] A. Data collection
- [x] **B. Iteration** *(Đáp án chính xác)*
- [ ] C. Data visualization
- [ ] D. Data storage

👉 **Đáp án đúng:** **B. Iteration**
💡 **Giải thích chi tiết:** Data transformation cần iteration vì mỗi phép scaling, encoding hay biến đổi phân phối phải được đánh giá lại qua chất lượng dữ liệu và tác động đến model. Một lựa chọn hữu ích cho thuật toán này có thể làm thuật toán khác hoạt động kém hơn. Lặp và điều chỉnh giúp pipeline cải thiện dần thay vì coi preprocessing là thao tác cố định chỉ thực hiện một lần.

---

### ❓ Câu hỏi 12:
What is the primary purpose of dimensionality reduction in data science?

**Các phương án lựa chọn:**
- [ ] A. To increase the number of features
- [x] **B. To simplify models and reduce computation time** *(Đáp án chính xác)*
- [ ] C. To eliminate all data points
- [ ] D. To create more complex models

👉 **Đáp án đúng:** **B. To simplify models and reduce computation time**
💡 **Giải thích chi tiết:** Dimensionality reduction biểu diễn dữ liệu trong số chiều thấp hơn, giữ lại thông tin quan trọng nhưng loại bớt feature dư thừa hoặc nhiễu. Nhờ ít biến hơn, model có thể train nhanh, dễ trực quan hóa và giảm nguy cơ overfitting trong nhiều tình huống. Mục đích không phải tăng độ phức tạp hay xóa toàn bộ observation, mà là đơn giản hóa có kiểm soát.

---

### ❓ Câu hỏi 13:
What is a common issue with using accuracy as a metric for imbalanced classes?

**Các phương án lựa chọn:**
- [ ] A. It is always accurate.
- [x] **B. It can be misleading.** *(Đáp án chính xác)*
- [ ] C. It is the only metric available.
- [ ] D. It does not consider false positives.

👉 **Đáp án đúng:** **B. It can be misleading.**
💡 **Giải thích chi tiết:** Accuracy là tỷ lệ dự báo đúng chung nên dễ bị lớp đa số chi phối trong imbalanced dataset. Một model chỉ chọn nhãn phổ biến vẫn có thể đạt accuracy cao, dù không nhận diện được lớp hiếm có ý nghĩa nghiệp vụ. Vì vậy accuracy có thể misleading và cần được đọc cùng precision, recall, F1-score hoặc đường cong phù hợp.

---

### ❓ Câu hỏi 14:
What type of data structures are used as standardized input to the interfaces in scikit-learn?

**Các phương án lựa chọn:**
- [ ] A. Lists and dictionaries
- [ ] B. DataFrames and Series
- [x] **C. NumPy arrays and SciPy sparse matrices** *(Đáp án chính xác)*
- [ ] D. Strings and tuples

👉 **Đáp án đúng:** **C. NumPy arrays and SciPy sparse matrices**
💡 **Giải thích chi tiết:** Nhiều estimator trong scikit-learn nhận NumPy arrays hoặc SciPy sparse matrices như định dạng đầu vào chuẩn cho feature matrix. Hai cấu trúc này biểu diễn hiệu quả dữ liệu dense lẫn dữ liệu có nhiều giá trị bằng không, đồng thời giúp các bước pipeline tương thích nhau. List, dictionary, string và tuple không cung cấp quy ước ma trận đặc trưng thống nhất như vậy.

---

### ❓ Câu hỏi 15:
The .fit_transform method corresponds to which scikit-learn interface(s)?

**Các phương án lựa chọn:**
- [ ] A. Transformer, Estimator, Predictor
- [ ] B. Transformer, Estimator
- [ ] C. Estimator, Predictor
- [x] **D. Transformer** *(Đáp án chính xác)*
- [ ] E. Transformer, Predictor

👉 **Đáp án đúng:** **D. Transformer**
💡 **Giải thích chi tiết:** Transformer học cách biến đổi dữ liệu và cung cấp fit_transform để kết hợp việc fit tham số với transform dữ liệu trong một thao tác. Chẳng hạn StandardScaler ước lượng statistic cần thiết rồi chuẩn hóa feature. Predictor phải có predict để tạo dự báo, còn Estimator chung không bắt buộc có transform, nên fit_transform chỉ đặc trưng cho interface Transformer.

---

### ❓ Câu hỏi 16:
Which process model is known for its open standard and has been around since 1996?

**Các phương án lựa chọn:**
- [ ] A. OSEMN
- [x] **B. CRISP-DM** *(Đáp án chính xác)*
- [ ] C. Design Thinking
- [ ] D. Agile

👉 **Đáp án đúng:** **B. CRISP-DM**
💡 **Giải thích chi tiết:** CRISP-DM là framework chuẩn mở cho data mining, xuất hiện từ năm 1996 và mô tả chu trình từ business understanding đến deployment. Các pha của nó liên kết mục tiêu nghiệp vụ với hiểu dữ liệu, chuẩn bị dữ liệu, modeling và evaluation theo cách có thể quay lại cải tiến. OSEMN, Agile và Design Thinking có công dụng riêng nhưng không khớp nguồn gốc chuẩn mở này.

---

### ❓ Câu hỏi 17:
Which library in Python is commonly used for reading and writing CSV files?

**Các phương án lựa chọn:**
- [ ] A. NumPy
- [ ] B. Matplotlib
- [x] **C. Pandas** *(Đáp án chính xác)*
- [ ] D. SciPy

👉 **Đáp án đúng:** **C. Pandas**
💡 **Giải thích chi tiết:** Pandas là thư viện được dùng phổ biến để đọc và ghi CSV nhờ read_csv, to_csv và DataFrame có nhãn cột rõ ràng. Nó hỗ trợ xử lý missing value, kiểu dữ liệu hỗn hợp, lọc và tổng hợp theo bảng trong cùng workflow. NumPy, Matplotlib và SciPy phục vụ số học, trực quan hóa hoặc khoa học tính toán nhưng không chuyên về thao tác CSV dạng bảng.

---

### ❓ Câu hỏi 18:
When embarking on a data science project, why do you ultimately want to format your data so that it can be housed in something like a Pandas DataFrame or NumPy Array?

**Các phương án lựa chọn:**
- [ ] A. DataFrames/Arrays most closely resemble tables in relational databases.
- [ ] B. DataFrames/Arrays are the only structures in Python capable of holding significant amounts of data.
- [x] **C. Nearly all modeling algorithms take input data in a tabular format analogous to format of DataFrame/Arrays.** *(Đáp án chính xác)*
- [ ] D. All of the answers.

👉 **Đáp án đúng:** **C. Nearly all modeling algorithms take input data in a tabular format analogous to format of DataFrame/Arrays.**
💡 **Giải thích chi tiết:** Thuật toán modeling thường cần input dạng tabular, trong đó mỗi row là một observation và mỗi column là một feature. Pandas DataFrame cùng NumPy Array tổ chức dữ liệu đúng cấu trúc này, giúp tách biến đầu vào, nhãn và đưa dữ liệu qua transformer dễ dàng. Chúng không phải những cấu trúc duy nhất chứa dữ liệu, nhưng phù hợp nhất với interface của đa số model.

---

### ❓ Câu hỏi 19:
What is the primary purpose of documenting your data before starting a project?

**Các phương án lựa chọn:**
- [ ] A. To impress stakeholders
- [x] **B. To streamline the modeling process and ensure data quality** *(Đáp án chính xác)*
- [ ] C. To increase project costs
- [ ] D. To avoid using Python

👉 **Đáp án đúng:** **B. To streamline the modeling process and ensure data quality**
💡 **Giải thích chi tiết:** Documenting data ghi lại nguồn gốc, schema, nghĩa của field, quy tắc làm sạch và các cảnh báo về data quality trước modeling. Nhờ hiểu đúng dữ liệu, nhóm chọn preprocessing thích hợp, giảm lỗi diễn giải và tái lập pipeline khi cần audit. Đây là cách streamline modeling process và bảo đảm chất lượng, không nhằm gây ấn tượng hay tránh dùng Python.

---

### ❓ Câu hỏi 20:
For given input lists: a,b,c and 1,2,3 Create a dictionary from two input lists

**Các phương án lựa chọn:**
- [x] **A. def make_dict(lst1, lst2):
    res = {}
    for key, value in zip(lst1, lst2):
        res[key] = value
    return res** *(Đáp án chính xác)*
- [ ] B. def make_dict(lst1, lst2):
    res = {}
    res[lst1] = lst2
    return res
- [ ] C. def make_dict(lst1, lst2):
    res = []
    for key, value in (lst1, lst2):
        res[key] = value
    return res
- [ ] D. def make_dict(lst1, lst2):
    res = []
    for key, value in zip(lst1, lst2):
        res[key] = value
    return res

👉 **Đáp án đúng:** **A. def make_dict(lst1, lst2):
    res = {}
    for key, value in zip(lst1, lst2):
        res[key] = value
    return res**
💡 **Giải thích chi tiết:** Dictionary đúng cần ghép từng phần tử của hai list theo cùng chỉ số bằng zip, rồi lưu cặp key-value vào một mapping rỗng. Khi đó a, b, c lần lượt liên kết với 1, 2, 3 và hàm return lại dictionary hoàn chỉnh. Lỗi xuống dòng trong nguồn đã làm block code mất cấu trúc, vì vậy cần phục hồi cú pháp Python đa dòng để lựa chọn có thể thực thi và được học đúng.

---

### ❓ Câu hỏi 21:
Which of the following is NOT a factor that affects the time spent on data cleaning?

**Các phương án lựa chọn:**
- [ ] A. Team experience
- [ ] B. Data quality
- [ ] C. Project requirements
- [x] **D. Company size** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. Company size**
💡 **Giải thích chi tiết:** Thời gian data cleaning thay đổi theo team experience, data quality và project requirements vì chúng quyết định số lỗi, mức độ chuẩn hóa và số quy tắc cần áp dụng. Company size không tự nói lên dataset bẩn đến đâu hoặc bao nhiêu phép biến đổi cần làm. Vì thế quy mô công ty không phải nhân tố kỹ thuật trực tiếp chi phối thời lượng làm sạch.

---

### ❓ Câu hỏi 22:
What is the first stage of the design thinking process?

**Các phương án lựa chọn:**
- [ ] A. Ideate
- [x] **B. Empathize** *(Đáp án chính xác)*
- [ ] C. Prototype
- [ ] D. Test

👉 **Đáp án đúng:** **B. Empathize**
💡 **Giải thích chi tiết:** Empathize là điểm khởi đầu của design thinking vì nhóm cần hiểu trải nghiệm, động cơ và pain point thực tế của người dùng. Insight thu được ở đây giúp định nghĩa đúng vấn đề trước khi bước sang ideate, prototype và test. Nếu không có đồng cảm, giải pháp có thể hợp lý về kỹ thuật nhưng giải sai nhu cầu cần giải quyết.

---

### ❓ Câu hỏi 23:
Thinking with the lens of the scientific process, what would your next steps be if you wanted to decide where to open the next store for your sled business?

**Các phương án lựa chọn:**
- [ ] A. Start pulling sales and other data to create a business viability assessment for Vermont
- [x] **B. Gather more data and repeat the snowfall experiment** *(Đáp án chính xác)*
- [x] **C. Gather different data say snowfall by county and repeat the experiment** *(Đáp án chính xác)*
- [x] **D. Start a business viability assessment for all three states** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. Gather more data and repeat the snowfall experiment**, **C. Gather different data say snowfall by county and repeat the experiment**, **D. Start a business viability assessment for all three states**
💡 **Giải thích chi tiết:** Ba bước được chọn đều mở rộng hoặc kiểm tra bằng chứng trước khi chốt vị trí cửa hàng sled: lặp snowfall experiment, thu thập dữ liệu theo county và đánh giá khả thi cho cả ba bang. Chúng giúp kiểm nghiệm giả thuyết ở độ chi tiết cao hơn và kết nối điều kiện thời tiết với quyết định kinh doanh. Chỉ kéo dữ liệu để đánh giá riêng Vermont sẽ thu hẹp phạm vi quá sớm so với mục tiêu so sánh các lựa chọn.

---

### ❓ Câu hỏi 24:
Sparse matrices can be useful as a target destination for ETL, but what are the main caveats (choose one or more)?

**Các phương án lựa chọn:**
- [ ] A. You cannot convert directly from a numpy.array to any of the scipy.sparse matrices
- [x] **B. NumPy linear algebra functions generally cannot be called directly** *(Đáp án chính xác)*
- [ ] C. Saving to disk is not possible directly from a scipy.sparse format
- [ ] D. The train test splits need to be performed by hand with scipy.sparse matrices
- [x] **E. It is difficult to print to screen scipy.sparse matrices directly** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. NumPy linear algebra functions generally cannot be called directly**, **E. It is difficult to print to screen scipy.sparse matrices directly**
💡 **Giải thích chi tiết:** scipy.sparse giúp tiết kiệm bộ nhớ khi dữ liệu có nhiều số không, nhưng không phải mọi hàm NumPy linear algebra đều hoạt động trực tiếp với sparse representation. Việc print một sparse matrix đầy đủ cũng khó trực quan vì cấu trúc ưu tiên lưu vị trí phần tử khác không. Hai caveat này liên quan đến khả năng tương thích phép toán và hiển thị, chứ không cấm lưu hay chia dữ liệu.

---

### ❓ Câu hỏi 25:
Why is granular data preferred over summary level data?

**Các phương án lựa chọn:**
- [ ] A. It is easier to collect
- [x] **B. It allows for more detailed analysis** *(Đáp án chính xác)*
- [ ] C. It takes less time to process
- [ ] D. It is more visually appealing

👉 **Đáp án đúng:** **B. It allows for more detailed analysis**
💡 **Giải thích chi tiết:** Granular data giữ thông tin ở cấp chi tiết, cho phép analyst tự tổng hợp theo thời gian, khách hàng hoặc khu vực tùy câu hỏi mới. Summary level data đã gộp sẵn nên có thể che mất ngoại lệ và làm không thể quay lại phân tích nguyên nhân ở nhóm nhỏ. Vì vậy dữ liệu granular hỗ trợ detailed analysis linh hoạt hơn, không chỉ làm dữ liệu dễ thu thập hoặc đẹp hơn.

---

### ❓ Câu hỏi 26:
A decision tree classifier is useful as a model for the AAVAIl subscriber churn data.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Decision tree classifier phù hợp với subscriber churn vì nó tạo các quy tắc phân chia dễ hiểu từ feature như usage, hợp đồng hoặc hành vi thanh toán. Mỗi nhánh cho thấy tổ hợp điều kiện có thể đẩy xác suất rời bỏ lên cao, hữu ích cho hành động giữ chân khách hàng. Với AAVAIl data, đây là một model classification có giá trị dù vẫn nên so sánh với lựa chọn khác.

---

### ❓ Câu hỏi 27:
When you use Watson Services like Watson Natural Language Understanding via the Python SDK, what are the three items that need to be saved? These items are generally saved on a local machine and included in scripts and notebooks as imported variables.

**Các phương án lựa chọn:**
- [ ] A. service version, service API key, service JSON map
- [ ] B. service URL, service JSON map, service API key
- [x] **C. service API key, service version, service URL** *(Đáp án chính xác)*
- [ ] D. service version, service IAMAuthenticator, service URL
- [ ] E. service API key, service URL, service IAMAuthenticator

👉 **Đáp án đúng:** **C. service API key, service version, service URL**
💡 **Giải thích chi tiết:** Watson Natural Language Understanding qua Python SDK cần service API key để xác thực, service version để xác định phiên bản hành vi API và service URL để gọi đúng endpoint. Lưu các giá trị này bên ngoài script giúp cấu hình rõ ràng và tránh ghi credential trực tiếp trong mã nguồn. IAMAuthenticator được tạo từ API key, không thay thế một trong ba thông tin cốt lõi.

---

### ❓ Câu hỏi 28:
Which of the following neural network architectures are most-commonly used for time-series analysis?

**Các phương án lựa chọn:**
- [ ] A. Multi-layer perceptron
- [x] **B. Recurrent neural networks** *(Đáp án chính xác)*
- [ ] C. Transfer learning
- [ ] D. Convolutional neural network
- [ ] E. Autoencoders

👉 **Đáp án đúng:** **B. Recurrent neural networks**
💡 **Giải thích chi tiết:** Recurrent neural networks xử lý time-series bằng cách mang hidden state từ timestep trước sang timestep sau. Cơ chế này cho phép prediction hiện tại sử dụng lịch sử chuỗi, phù hợp với doanh số, tín hiệu cảm biến hoặc dữ liệu tuần tự khác. Multi-layer perceptron không duy trì trạng thái theo thời gian; transfer learning là chiến lược, còn autoencoder chủ yếu học representation.

---

### ❓ Câu hỏi 29:
In the context of NLP, what does sentiment analysis refer to?

**Các phương án lựa chọn:**
- [ ] A. Analyzing the structure of sentences
- [x] **B. Determining the emotional tone behind a series of words** *(Đáp án chính xác)*
- [ ] C. Translating text from one language to another
- [ ] D. Summarizing large documents

👉 **Đáp án đúng:** **B. Determining the emotional tone behind a series of words**
💡 **Giải thích chi tiết:** Sentiment analysis xác định emotional tone hay thái độ trong một series of words, ví dụ positive, negative hoặc neutral. Nhiệm vụ này cần suy ra quan điểm của người viết từ từ vựng và context, không chỉ phân tích syntax. Translation, document summarization và sentence structure analysis đều là tác vụ NLP khác với mục tiêu nhận diện cảm xúc.

---

### ❓ Câu hỏi 30:
What is the purpose of the classification_report in sklearn?

**Các phương án lựa chọn:**
- [ ] A. To visualize data
- [x] **B. To summarize model performance** *(Đáp án chính xác)*
- [ ] C. To preprocess data
- [ ] D. To train a model

👉 **Đáp án đúng:** **B. To summarize model performance**
💡 **Giải thích chi tiết:** classification_report trong sklearn tóm tắt model performance theo từng class bằng precision, recall, F1-score và support. Nhờ báo cáo này, người dùng thấy rõ model xử lý từng nhãn ra sao thay vì chỉ nhìn một chỉ số tổng quát. Nó được dùng sau prediction để đánh giá, không phải công cụ visualize, preprocess hoặc train mô hình.

---

### ❓ Câu hỏi 31:
If you have data with a large number of features and you are sure that it will take some time to train and tune the model, which approach is LEAST likely to result in a speed improvement during grid-searching?

**Các phương án lựa chọn:**
- [ ] A. In your pipeline use variance thresholding to limit the number of features
- [x] **B. Use the Shuffle and split form of cross-validation** *(Đáp án chính xác)*
- [ ] C. Use a randomized grid search form of cross validation
- [ ] D. Randomly subset the data
- [ ] E. Use PCA to reduce the dimensionality of the data before training

👉 **Đáp án đúng:** **B. Use the Shuffle and split form of cross-validation**
💡 **Giải thích chi tiết:** Grid-search tốn thời gian vì cần fit nhiều tổ hợp parameter trên nhiều validation split. PCA, variance thresholding, randomized search và random subsetting đều có thể giảm kích thước bài toán hoặc số lần fit. ShuffleSplit chủ yếu thay cách sinh split; nếu số lần chia không giảm, nó không tự làm ít training hơn nên là lựa chọn ít có khả năng tăng tốc nhất.

---

### ❓ Câu hỏi 32:
What is a key reason for using existing NLP APIs instead of building models from scratch?

**Các phương án lựa chọn:**
- [ ] A. They are always more accurate
- [x] **B. They require less time and resources** *(Đáp án chính xác)*
- [ ] C. They are easier to understand
- [ ] D. They eliminate the need for data

👉 **Đáp án đúng:** **B. They require less time and resources**
💡 **Giải thích chi tiết:** Existing NLP APIs giảm thời gian và resources vì nhà cung cấp đã chuẩn bị mô hình, endpoint, authentication, scaling và vận hành nền tảng. Nhóm có thể tích hợp chức năng NLP mà không phải xây toàn bộ corpus, pipeline train và deployment từ đầu. Điều này không bảo đảm API luôn chính xác hoặc làm mất nhu cầu kiểm soát dữ liệu đầu vào.

---

### ❓ Câu hỏi 33:
Which of the following is NOT a component of the confusion matrix?

**Các phương án lựa chọn:**
- [ ] A. True Negatives (TN)
- [ ] B. False Positives (FP)
- [ ] C. True Positives (TP)
- [x] **D. Average Score (AS)** *(Đáp án chính xác)*
- [ ] E. False Negatives (FN)

👉 **Đáp án đúng:** **D. Average Score (AS)**
💡 **Giải thích chi tiết:** Confusion matrix bao gồm bốn số đếm cơ bản là true positive, true negative, false positive và false negative. Các số đếm ấy mô tả quan hệ giữa prediction và nhãn thực, sau đó mới dùng để tính accuracy, recall hoặc precision. Average Score là metric tổng hợp bên ngoài ma trận, không phải một component nguyên gốc của confusion matrix.

---

### ❓ Câu hỏi 34:
Which of the following classifiers is inherently designed for multiclass classification?

**Các phương án lựa chọn:**
- [ ] A. Linear Regression
- [x] **B. Naïve Bayes** *(Đáp án chính xác)*
- [ ] C. K-Means Clustering
- [ ] D. Decision Trees (in binary mode)

👉 **Đáp án đúng:** **B. Naïve Bayes**
💡 **Giải thích chi tiết:** Naïve Bayes tính posterior probability cho mọi class, sau đó chọn class có xác suất lớn nhất dựa trên prior và likelihood của feature. Cơ chế này mở rộng trực tiếp cho multiclass classification mà không cần huấn luyện riêng từng cặp nhãn bắt buộc. Linear Regression dự báo số liên tục, K-Means không giám sát, còn decision tree binary mode chỉ có hai outcome.

---

### ❓ Câu hỏi 35:
Processing the corpus with the provided lemmatize_document reduces the total number of tokens to what percentage of the original?

**Các phương án lựa chọn:**
- [ ] A. 10-15%
- [ ] B. 20-35%
- [ ] C. 45-50%
- [x] **D. 70-75%** *(Đáp án chính xác)*
- [ ] E. 85-95%

👉 **Đáp án đúng:** **D. 70-75%**
💡 **Giải thích chi tiết:** Lemmatization giảm số token bằng cách quy những dạng chia thì, số nhiều và dẫn xuất về lemma đại diện. Trong corpus của bài tập, phép chuẩn hóa này còn giữ lại khoảng 70–75% token ban đầu, cho thấy nội dung không bị loại bỏ quá mạnh. Kết quả đó hợp lý vì nhiều từ được gộp dạng chứ không bị xóa hoàn toàn khỏi văn bản.

---

### ❓ Câu hỏi 36:
Which of the following is the least valid statement when it comes to dashboards?

**Các phương án lựa chọn:**
- [ ] A. Dashboards are an easy way to share summaries and findings
- [ ] B. Dashboards have interactive functionality that helps create a rich experience for the user
- [ ] C. Dashboards are generally used after serveral iterations of the AI workflow
- [x] **D. Dashboards are quick way to create portable simple plots** *(Đáp án chính xác)*
- [ ] E. Dashboards can be used to tell the story of investigative visualizations

👉 **Đáp án đúng:** **D. Dashboards are quick way to create portable simple plots**
💡 **Giải thích chi tiết:** Dashboards hữu ích khi kết hợp summary, interactive control và narrative để người xem khám phá kết quả phân tích theo ngữ cảnh. Chúng không chỉ là cách nhanh tạo portable simple plots, vì một dashboard tốt cần chọn KPI, thiết kế layout và bảo đảm dữ liệu tin cậy. Các phát biểu còn lại phản ánh đúng hơn vai trò của dashboards sau nhiều vòng lặp AI workflow.

---

### ❓ Câu hỏi 37:
What will the management team want to know after the sales data is released?

**Các phương án lựa chọn:**
- [ ] A. The number of products sold
- [x] **B. If the teams are well-optimized based on historical sales data** *(Đáp án chính xác)*
- [ ] C. The marketing budget for each team
- [ ] D. The demographics of the customers

👉 **Đáp án đúng:** **B. If the teams are well-optimized based on historical sales data**
💡 **Giải thích chi tiết:** Sau khi sales data được phát hành, management team cần biết cách tổ chức team có được tối ưu theo historical sales data hay chưa. Thông tin này hỗ trợ phân bổ nguồn lực và điều chỉnh vận hành dựa trên bằng chứng thay vì trực giác. Product count, marketing budget hay customer demographics có thể hữu ích, nhưng không trả lời trực tiếp hiệu quả tối ưu của đội ngũ.

---

### ❓ Câu hỏi 38:
There are many ways to carry out statistical inference. Which one method of the following is NOT used to compute estimates in the context of statistical inference.

**Các phương án lựa chọn:**
- [x] **A. Null Hypothesis Significance Testing (NHST)** *(Đáp án chính xác)*
- [ ] B. Maximum Likelihood Estimation (MLE)
- [ ] C. Markov Chain Monte Carlo (MCMC)
- [ ] D. Expectation Maximization (EM)
- [ ] E. Simulation via Permutations

👉 **Đáp án đúng:** **A. Null Hypothesis Significance Testing (NHST)**
💡 **Giải thích chi tiết:** NHST đánh giá giả thuyết không bằng thống kê kiểm định và p-value; nó không trực tiếp tạo estimate tham số như những kỹ thuật inference khác. MLE, MCMC và EM đều xây dựng hoặc xấp xỉ giá trị ước lượng từ dữ liệu, còn permutation simulation có thể đánh giá phân phối ước lượng. Vì vậy NHST là phương pháp không dùng để compute estimates theo cách phân loại của câu hỏi.

---

### ❓ Câu hỏi 39:
What is a key principle of design thinking mentioned in the course?

**Các phương án lựa chọn:**
- [ ] A. Data collection
- [ ] B. Observation and Reflection
- [x] **C. Rapid prototyping** *(Đáp án chính xác)*
- [ ] D. User testing

👉 **Đáp án đúng:** **C. Rapid prototyping**
💡 **Giải thích chi tiết:** Rapid prototyping cho phép đội thiết kế tạo thử một phiên bản nhỏ để kiểm chứng ý tưởng với người dùng ngay khi chưa đầu tư nhiều chi phí. Những phản hồi sớm giúp sửa sai về nhu cầu, interaction hoặc chức năng trước khi solution được xây hoàn chỉnh. Đây là key principle của design thinking vì quá trình học tập diễn ra qua thử nghiệm nhanh và lặp.

---

### ❓ Câu hỏi 40:
Which method is recommended for handling missing values in numerical data?

**Các phương án lựa chọn:**
- [ ] A. Convert missing values to a flag
- [x] **B. Use imputation techniques** *(Đáp án chính xác)*
- [ ] C. Delete the entire dataset
- [ ] D. Replace with a random value

👉 **Đáp án đúng:** **B. Use imputation techniques**
💡 **Giải thích chi tiết:** Imputation xử lý numerical missing values bằng ước lượng có cơ sở như mean, median hoặc dự báo từ các biến khác, giúp dữ liệu vẫn dùng được cho model. Cách này thường bảo toàn nhiều thông tin hơn xóa toàn bộ dữ liệu hay thay giá trị bằng số ngẫu nhiên. Missing flag có thể bổ sung tín hiệu, nhưng không thay thế việc xử lý giá trị số bị khuyết.

---

### ❓ Câu hỏi 41:
In the script example-spark-submit.sh, what does the #!/bin/bash line indicate?

**Các phương án lựa chọn:**
- [ ] A. It specifies the script's name
- [ ] B. It indicates the script is written in Python
- [x] **C. It tells the system to use the Bash shell to execute the script** *(Đáp án chính xác)*
- [ ] D. It is a comment and has no effect

👉 **Đáp án đúng:** **C. It tells the system to use the Bash shell to execute the script**
💡 **Giải thích chi tiết:** Shebang #!/bin/bash đặt ở đầu example-spark-submit.sh để hệ điều hành gọi Bash khi thực thi script. Điều này bảo đảm syntax shell, biến môi trường và lệnh trong file được hiểu theo interpreter phù hợp. Dòng này không chỉ định tên script, không xác định ngôn ngữ Python và không phải comment không có hiệu lực.

---

### ❓ Câu hỏi 42:
Which Python package supports spawning processes for code optimization?

**Các phương án lựa chọn:**
- [ ] A. threading
- [ ] B. subprocess
- [x] **C. multiprocessing** *(Đáp án chính xác)*
- [ ] D. numpy

👉 **Đáp án đúng:** **C. multiprocessing**
💡 **Giải thích chi tiết:** multiprocessing cung cấp process và pool để chia computation sang nhiều lõi CPU, đặc biệt thích hợp cho code optimization của tác vụ CPU-bound. Các process có interpreter riêng nên tránh hạn chế của Global Interpreter Lock với Python bytecode. threading thường hợp I/O-bound hơn, subprocess điều khiển chương trình bên ngoài, còn NumPy không cung cấp cơ chế spawn process tổng quát.

---

### ❓ Câu hỏi 43:
What is the first step in setting up the Watson Developer Cloud Python SDK?

**Các phương án lựa chọn:**
- [ ] A. Install the SDK
- [x] **B. Create an IBM Cloud account** *(Đáp án chính xác)*
- [ ] C. Create a resource for Natural Language Understanding
- [ ] D. Download the tutorial files

👉 **Đáp án đúng:** **B. Create an IBM Cloud account**
💡 **Giải thích chi tiết:** IBM Cloud account là bước đầu để tạo và quản lý instance Watson, nhận credential và cấp quyền gọi dịch vụ từ SDK. Sau khi có tài khoản, người dùng mới có thể tạo resource Natural Language Understanding rồi cấu hình API key và URL. Install package hoặc download tutorial có thể thực hiện sớm, nhưng không thay thế nền tảng tài khoản cloud cần thiết.

---

### ❓ Câu hỏi 44:
Which command is used to install the Watson Developer Cloud Python SDK?

**Các phương án lựa chọn:**
- [x] **A. pip install ibm-watson** *(Đáp án chính xác)*
- [ ] B. pip install --upgrade ibm-watson
- [ ] C. install ibm-watson
- [ ] D. upgrade ibm-watson

👉 **Đáp án đúng:** **A. pip install ibm-watson**
💡 **Giải thích chi tiết:** pip install ibm-watson là câu lệnh dùng pip để cài Watson SDK vào Python environment. Khi package đã có, script mới import được client và các lớp service để khởi tạo kết nối. Tùy chọn --upgrade chỉ phù hợp với nâng cấp version, còn các lệnh thiếu từ pip không chỉ rõ package manager nên không phải cú pháp cài chuẩn.

---

### ❓ Câu hỏi 45:
Which of the following is a common challenge when optimizing code for machine learning models?

**Các phương án lựa chọn:**
- [ ] A. Lack of available data
- [x] **B. Difficulty in improving training time for large models** *(Đáp án chính xác)*
- [ ] C. Inability to use multiple GPUs
- [ ] D. Limited programming languages available

👉 **Đáp án đúng:** **B. Difficulty in improving training time for large models**
💡 **Giải thích chi tiết:** Tối ưu training time cho large model là thách thức thường gặp vì mỗi epoch có thể bao gồm lượng lớn phép tính, memory access và truyền dữ liệu. Các biện pháp như profiling, batching, GPU hoặc parallel processing đều đòi hỏi đánh đổi kỹ thuật phù hợp. Những hạn chế về programming language hay sự thiếu data không trực tiếp mô tả vấn đề runtime nổi bật này.

---

### ❓ Câu hỏi 46:
What is the purpose of profiling in code optimization?

**Các phương án lựa chọn:**
- [ ] A. To write new algorithms from scratch
- [x] **B. To identify which parts of the code are bottlenecks** *(Đáp án chính xác)*
- [ ] C. To increase the number of processor cores
- [ ] D. To reduce the amount of data used

👉 **Đáp án đúng:** **B. To identify which parts of the code are bottlenecks**
💡 **Giải thích chi tiết:** Profiling cung cấp bằng chứng về nơi code đang tiêu tốn thời gian hoặc tài nguyên, chẳng hạn function gọi nhiều lần hay vòng lặp chậm. Nhờ đó, kỹ sư nhận diện bottleneck trước khi chọn vectorization, caching, parallelism hoặc thuật toán thay thế. Nó không tự tăng processor core và cũng không yêu cầu viết lại toàn bộ code từ đầu.

---

### ❓ Câu hỏi 47:
Docker containers run a private file system that is isolated from the host and other containers. What is the suggested way to access notebooks and scripts from within the container?

**Các phương án lựa chọn:**
- [ ] A. tmpfs mount
- [ ] B. use a named pipe
- [x] **C. bind mounts** *(Đáp án chính xác)*
- [ ] D. GitHub
- [ ] E. volumes

👉 **Đáp án đúng:** **C. bind mounts**
💡 **Giải thích chi tiết:** Bind mounts đưa đường dẫn của host vào Docker container, nhờ vậy notebook và script có thể được truy cập, sửa đổi trong workflow phát triển mà không cần rebuild image. Cơ chế này tạo liên kết trực tiếp giữa filesystem host và container tại mount point. Named pipe và tmpfs có mục đích khác, GitHub là dịch vụ mã nguồn, còn volume không nhất thiết trỏ tới thư mục host cụ thể.

---

### ❓ Câu hỏi 48:
When you worked on model deployment case study, which modification to the ALS algorithm had the largest effect on model performance?

**Các phương án lựa chọn:**
- [x] **A. The explicit training vs implicit training comparison** *(Đáp án chính xác)*
- [ ] B. The lambda or regularization parameter
- [ ] C. The epsilon or scale parameter
- [ ] D. The I1 vs I2 comparison

👉 **Đáp án đúng:** **A. The explicit training vs implicit training comparison**
💡 **Giải thích chi tiết:** Explicit và implicit training làm ALS học từ hai loại tín hiệu khác nhau: rating được thể hiện rõ hoặc hành vi ngầm như xem, click, mua. Chuyển chế độ này thay đổi confidence, objective và cách đánh giá recommendation, nên ảnh hưởng sâu tới model performance. Lambda hay epsilon chỉ điều chỉnh một phần cơ chế, còn I1/I2 không phải thay đổi bản chất dữ liệu học.

---

### ❓ Câu hỏi 49:
Docker images are the basis of containers. It is possible to pull an image from the registry and ask the Docker client to run a container based on that image. Some images are official while many others are user defined.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Docker image là artifact chứa layer filesystem, dependency và configuration, dùng làm nền để Docker client tạo container đang chạy. Image có thể được pull từ registry và phát hành bởi Docker hoặc user community, sau đó tạo nhiều container instance nếu cần. Mô tả này phản ánh đúng mối quan hệ image là mẫu và container là thực thể thực thi từ mẫu đó.

---

### ❓ Câu hỏi 50:
What is the community package of the Docker Engine called?

**Các phương án lựa chọn:**
- [ ] A. docker-io
- [x] **B. docker-ce** *(Đáp án chính xác)*
- [ ] C. docker-compose
- [ ] D. docker-toolbox

👉 **Đáp án đúng:** **B. docker-ce**
💡 **Giải thích chi tiết:** docker-ce là viết tắt của Docker Community Edition, tên community package của Docker Engine. Nó khác docker-compose, công cụ điều phối ứng dụng nhiều container, và docker-toolbox, bộ tiện ích cho môi trường cụ thể. docker-io có thể là tên package của một repository hệ điều hành, nhưng không phải tên Docker Community Edition được hỏi.

---
