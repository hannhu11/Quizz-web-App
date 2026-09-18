# 📘 AID301c 158 Flashcard Full - Ngân Hàng Kiến Thức & Giải Thích Chi Tiết

> **Mô tả tài liệu**: Kho 158 câu hỏi Flashcard toàn diện kèm giải thích học thuật chuẩn giáo trình IBM AI Enterprise Workflow.
> **Môn học**: AID301c - Trí Tuệ Nhân Tạo (IBM AI Enterprise Workflow Specialization)
> **Tổng số câu hỏi**: 158 câu

---

### ❓ Câu hỏi 1:
Which of the following are NOT native or built-in data types in Python?

**Các phương án lựa chọn:**
- [ ] A. boolean
- [ ] B. integer
- [ ] C. float
- [x] **D. heap** *(Đáp án chính xác)*
- [ ] E. string
- [x] **F. varchar** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. heap**, **F. varchar**
💡 **Giải thích chi tiết:** Trong Python, boolean, integer, float và string tương ứng với các kiểu dựng sẵn bool, int, float và str, dù tên trong lựa chọn mang tính mô tả. Heap không phải là một kiểu dữ liệu dựng sẵn mà là cấu trúc hoặc vùng nhớ thường dùng để triển khai các cấu trúc dữ liệu; varchar là kiểu chuỗi phổ biến trong hệ quản trị cơ sở dữ liệu, không thuộc kiểu tích hợp của Python.

---

### ❓ Câu hỏi 2:
Mutable data types/collections in Python can be changed in place. Immutable ones cannot change in place. Which of the following are mutable?

**Các phương án lựa chọn:**
- [ ] A. bool
- [ ] B. int
- [ ] C. float
- [x] **D. set** *(Đáp án chính xác)*
- [x] **E. list** *(Đáp án chính xác)*
- [ ] F. string
- [ ] G. tuple
- [ ] H. complex

👉 **Đáp án đúng:** **D. set**, **E. list**
💡 **Giải thích chi tiết:** Trong Python, set và list là các kiểu dữ liệu mutable: có thể thay đổi trực tiếp nội dung của đối tượng hiện hữu, chẳng hạn thêm phần tử vào set hoặc append vào list. Các lựa chọn còn lại, gồm tuple, string và những kiểu số, là immutable; mọi phép biến đổi tạo ra một đối tượng mới thay vì sửa đối tượng ban đầu. Vì vậy, hai vị trí tương ứng với set và list được chọn.

---

### ❓ Câu hỏi 3:
Which of the following is NOT true about Python?

**Các phương án lựa chọn:**
- [ ] A. Python code can run in IPython and Jupyter notebooks
- [ ] B. Python allows for the inclusion of comments and pseudocode to better organize code
- [ ] C. Users can save .py files with an editor then subsequently execute them from the command line
- [x] **D. Base Python automatically parallelizes processing across cores when multiple cores are available** *(Đáp án chính xác)*
- [ ] E. Python allows users to save multiple functions in a .py file then import those functions in a different file

👉 **Đáp án đúng:** **D. Base Python automatically parallelizes processing across cores when multiple cores are available**
💡 **Giải thích chi tiết:** Python không tự động song song hóa mọi tác vụ trên nhiều lõi khi có sẵn nhiều lõi xử lý. Với CPython, Global Interpreter Lock (GIL) thường giới hạn việc thực thi đồng thời mã Python trong nhiều luồng, còn multiprocessing hoặc các thư viện chuyên dụng mới có thể khai thác nhiều lõi tùy trường hợp. Các lựa chọn còn lại đều mô tả khả năng hợp lệ của Python, gồm chạy trong IPython/Jupyter, dùng chú thích, thực thi tệp .py và tái sử dụng hàm qua import.

---

### ❓ Câu hỏi 4:
Which of the following pairs of events are mutually exclusive? There can be more than one answer.

**Các phương án lựa chọn:**
- [ ] A. Odd numbers and the number 3
- [ ] B. Even numbers and numbers greater than 10
- [x] **C. Negative numbers and positive numbers less than 25** *(Đáp án chính xác)*
- [x] **D. Numbers between 100-200 and numbers between 201-300** *(Đáp án chính xác)*
- [ ] E. None of the above

👉 **Đáp án đúng:** **C. Negative numbers and positive numbers less than 25**, **D. Numbers between 100-200 and numbers between 201-300**
💡 **Giải thích chi tiết:** Trong cặp “Negative numbers and positive numbers less than 25”, một số không thể đồng thời thuộc tập số âm và tập số dương; hai tập có giao rỗng. Tương tự, các số từ 100 đến 200 không chồng lấn với các số từ 201 đến 300, nên cặp này cũng loại trừ nhau. Ngược lại, số 3 thuộc tập số lẻ và 12 vừa chẵn vừa lớn hơn 10, nên hai cặp đầu không loại trừ nhau.

---

### ❓ Câu hỏi 5:
If you were to munge the data into a pandas.DataFrame, which of the following would describe a reasonable goal for the cleaning process?

**Các phương án lựa chọn:**
- [x] **A. customer on the rows and items like total_sales, name, most_bought on the columns** *(Đáp án chính xác)*
- [ ] B. daily revenue on the rows items like customer_name and total on the columns
- [x] **C. transactions on the rows and items like customer_name and item_id on the columns** *(Đáp án chính xác)*
- [ ] D. None of the above

👉 **Đáp án đúng:** **A. customer on the rows and items like total_sales, name, most_bought on the columns**, **C. transactions on the rows and items like customer_name and item_id on the columns**
💡 **Giải thích chi tiết:** Cấu trúc ở lựa chọn 1 hợp lý nếu mục tiêu là tạo bảng tổng hợp theo khách hàng, trong đó mỗi hàng biểu diễn một khách hàng và các cột chứa thuộc tính hoặc chỉ số đã tính. Lựa chọn 3 cũng hợp lý khi giữ mức chi tiết giao dịch, với mỗi hàng là một giao dịch và các cột là biến mô tả như customer_name và item_id. Lựa chọn 2 trộn cấp độ ngày với thuộc tính khách hàng nên không nhất quán về grain.

---

### ❓ Câu hỏi 6:
Which types of programming tasks best describe what you are expected to already have some familiarity with before beginning this course?

**Các phương án lựa chọn:**
- [ ] A. dashboarding, high performance computing, and code profiling
- [x] **B. numeric computing, data munging, data visualization and data modeling** *(Đáp án chính xác)*
- [ ] C. convex optimization, python programming, statistical programming
- [ ] D. continuous integration, linear programming, and data exploration

👉 **Đáp án đúng:** **B. numeric computing, data munging, data visualization and data modeling**
💡 **Giải thích chi tiết:** Các kỹ năng nền tảng được nêu gồm tính toán số, làm sạch và biến đổi dữ liệu, trực quan hóa, cùng mô hình hóa dữ liệu. Chúng hỗ trợ lần lượt việc thao tác với mảng, chuẩn bị dữ liệu, nhận diện mẫu qua biểu đồ và xây dựng phân tích hoặc dự đoán. Các nhóm như dashboarding, profiling hay tích hợp liên tục là kỹ năng chuyên biệt hơn, không phải bộ kiến thức cốt lõi được nhấn mạnh trước khi bắt đầu khóa học.

---

### ❓ Câu hỏi 7:
Though the emphasis may change, which two elements are both essential and common to all three process models we talked about?

**Các phương án lựa chọn:**
- [ ] A. prediction, recommendation
- [ ] B. data mining, data cleaning
- [x] **C. resolve the business question, feedback loops** *(Đáp án chính xác)*
- [ ] D. testing, model deployment

👉 **Đáp án đúng:** **C. resolve the business question, feedback loops**
💡 **Giải thích chi tiết:** Mọi mô hình quy trình đều phải hướng đến việc giải quyết câu hỏi hoặc mục tiêu kinh doanh cụ thể, thay vì chỉ tập trung vào một kỹ thuật phân tích riêng lẻ. Feedback loops cũng thiết yếu vì kết quả triển khai cần được đánh giá, phản hồi và dùng để điều chỉnh dữ liệu, mô hình hoặc quyết định tiếp theo. Prediction, recommendation, data mining và deployment chỉ xuất hiện tùy trọng tâm của từng mô hình.

---

### ❓ Câu hỏi 8:
Is the following statement True/False? To succeed in this course you are expected to be proficient in any one of the following: R, Python or Java.

**Các phương án lựa chọn:**
- [x] **A. TRUE** *(Đáp án chính xác)*
- [ ] B. FALSE

👉 **Đáp án đúng:** **A. TRUE**
💡 **Giải thích chi tiết:** Phát biểu này được hiểu là người học chỉ cần thành thạo ít nhất một trong ba ngôn ngữ R, Python hoặc Java để đáp ứng yêu cầu nền tảng của khóa học. Việc biết một ngôn ngữ giúp thực hiện các bài tập lập trình, xử lý dữ liệu hoặc triển khai thuật toán, trong khi không nhất thiết phải thành thạo cả ba. Tuy nhiên, yêu cầu cụ thể vẫn nên được đối chiếu với đề cương khóa học.

---

### ❓ Câu hỏi 9:
Which of the following is the least accurate statement about the advantages of using process models in data science? Process models generally help by...

**Các phương án lựa chọn:**
- [ ] A. avoiding unnecessary tangents
- [x] **B. speeding up the process of getting through the workflow** *(Đáp án chính xác)*
- [ ] C. minimizing the model selection process
- [ ] D. guiding effective time allocation

👉 **Đáp án đúng:** **B. speeding up the process of getting through the workflow**
💡 **Giải thích chi tiết:** Process models cung cấp cấu trúc và các bước định hướng, nhờ đó nhóm phân tích hạn chế đi lệch mục tiêu, phân bổ thời gian hợp lý và phối hợp quy trình hiệu quả hơn. Tuy nhiên, chúng không nhằm rút gọn hoặc giảm thiểu quá trình lựa chọn mô hình; việc này vẫn cần dựa trên đặc trưng dữ liệu, mục tiêu dự báo, tiêu chí đánh giá và kiểm định phù hợp. Vì vậy, lựa chọn này kém chính xác nhất.

---

### ❓ Câu hỏi 10:
Is the following statement True/False?
Design thinking is applied in other domains, which helps make communicating the AI workflow to those outside data science easier.

**Các phương án lựa chọn:**
- [x] **A. TRUE** *(Đáp án chính xác)*
- [ ] B. FALSE

👉 **Đáp án đúng:** **A. TRUE**
💡 **Giải thích chi tiết:** Nhận định về việc design thinking được áp dụng ở các lĩnh vực khác là đúng, vì phương pháp này không bị giới hạn trong khoa học dữ liệu. Trọng tâm lấy con người làm trung tâm sử dụng việc xác định nhu cầu, trực quan hóa và giao tiếp theo ngôn ngữ của các bên liên quan, giúp người ngoài lĩnh vực data science hiểu mục tiêu, quy trình và kết quả của workflow AI.

---

### ❓ Câu hỏi 11:
It is day one on the job and you need to come up with a plan—how do you begin?

**Các phương án lựa chọn:**
- [ ] A. Gather what data you can quickly and perform some EDA to understand the problem better
- [ ] B. Plan to interview or study reviews of both satisfied and dissatisfied subscribers as soon as possible
- [x] **C. Get the perspective from management and follow the leads they might provide** *(Đáp án chính xác)*
- [ ] D. Something else entirely

👉 **Đáp án đúng:** **C. Get the perspective from management and follow the leads they might provide**
💡 **Giải thích chi tiết:** Một kế hoạch tốt không nên bắt đầu bằng việc lấy dữ liệu ngẫu nhiên, chạy EDA hoặc chỉ nghe một hướng dẫn riêng lẻ. Trước hết cần làm rõ bài toán, mục tiêu kinh doanh, tiêu chí thành công và các bên liên quan; sau đó mới quyết định phỏng vấn người dùng, xem nhật ký hay dùng góc nhìn quản lý để kiểm chứng. Vì vậy, lựa chọn “Something else entirely” phù hợp với tư duy xác định vấn đề trước khi chọn kỹ thuật.

---

### ❓ Câu hỏi 12:
In order to come up with the back-of-the-envelope ROI calculation for this project, how might you approach it?

**Các phương án lựa chọn:**
- [x] **A. Number of active users X Yearly payment** *(Đáp án chính xác)*
- [ ] B. Number of active users X monthly payment X % increase of users (assumption)
- [ ] C. Yearly costs X (number of users at month 2 - number of currently active users)
- [x] **D. Number of active users X Yearly payment - estimate for cost of project time** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **A. Number of active users X Yearly payment**, **D. Number of active users X Yearly payment - estimate for cost of project time**
💡 **Giải thích chi tiết:** Phép tính sơ bộ có thể bắt đầu bằng số người dùng hoạt động nhân với khoản thanh toán hằng năm để ước lượng lợi ích gộp. Nếu trừ thêm chi phí thời gian của dự án, kết quả gần hơn với lợi ích ròng cần dùng khi cân nhắc ROI. Các biểu thức dựa trên thanh toán tháng hoặc tăng trưởng giả định chỉ hợp lệ khi kỳ đo và giả định đã được xác định rõ, nên không phải điểm xuất phát chắc chắn bằng hai cách trên.

---

### ❓ Câu hỏi 13:
Thinking with the lens of the scientific process, what would your next steps be if you wanted to decide where to open the next store for your sled business?

**Các phương án lựa chọn:**
- [ ] A. Start pulling sales and other data to create a business viability assessment for Vermont
- [x] **B. Gather more data and repeat the snowfall experiment** *(Đáp án chính xác)*
- [x] **C. Gather different data say snowfall by county and repeat the experiment** *(Đáp án chính xác)*
- [ ] D. Start a business viability assessment for all three states

👉 **Đáp án đúng:** **B. Gather more data and repeat the snowfall experiment**, **C. Gather different data say snowfall by county and repeat the experiment**
💡 **Giải thích chi tiết:** Với quyết định mở cửa hàng mới, các bước “Gather more data and repeat the snowfall experiment” và “Gather different data say snowfall by county and repeat the experiment” phù hợp với quy trình khoa học. Lặp lại phép đo giúp kiểm tra tính ổn định và khả năng tái lập của kết quả, còn dữ liệu theo từng hạt làm rõ biến thiên địa phương bị che khuất ở cấp bang. Đánh giá khả năng kinh doanh nên thực hiện sau khi bằng chứng đủ tin cậy.

---

### ❓ Câu hỏi 14:
When embarking on a data science project, why do you ultimately want to format your data so that it can be housed in something like a Pandas DataFrame or NumPy Array?

**Các phương án lựa chọn:**
- [ ] A. DataFrames/Arrays most closely resemble tables in relational databases.
- [x] **B. DataFrames/Arrays are the only structures in Python capable of holding significant amounts of data.** *(Đáp án chính xác)*
- [ ] C. Nearly all modeling algorithms take input data in a tabular format analogous to the format of DataFrames/Arrays.
- [ ] D. All of the above

👉 **Đáp án đúng:** **B. DataFrames/Arrays are the only structures in Python capable of holding significant amounts of data.**
💡 **Giải thích chi tiết:** Định dạng dữ liệu dạng bảng giúp biểu diễn nhất quán các mẫu theo hàng và đặc trưng theo cột, phù hợp với giao diện đầu vào của phần lớn thuật toán học máy. DataFrame hoặc NumPy array cũng thuận tiện cho biến đổi, kiểm tra và truyền dữ liệu vào mô hình. Lựa chọn về sự tương đồng với cơ sở dữ liệu chỉ là một lợi ích, còn nhận định rằng Python chỉ có các cấu trúc này để chứa dữ liệu là sai.

---

### ❓ Câu hỏi 15:
Let's imagine there is a start-up that has a speech-to-text service incorporating gestures and body language into its output. Which of the following products represents the most defensible business opportunity?

**Các phương án lựa chọn:**
- [ ] A. Offer a service that hooks into streaming video and predicts the emotional state of people in the videos
- [ ] B. Create an app that allows job interviewers to get additional information about candidates
- [ ] C. Create a new and improved conferencing app
- [x] **D. Create a service that improves on existing audio recognition systems as a richer interface to mobile devices** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. Create a service that improves on existing audio recognition systems as a richer interface to mobile devices**
💡 **Giải thích chi tiết:** Năng lực nhận dạng tiếng nói kết hợp cử chỉ và ngôn ngữ cơ thể tạo lợi thế rõ nhất khi mở rộng thành giao diện giàu ngữ cảnh cho thiết bị di động. Sản phẩm dùng trực tiếp dữ liệu đa phương thức và năng lực kỹ thuật hiện có, nên phòng thủ hơn ứng dụng hội nghị hoặc tuyển dụng dễ bị sao chép. Dự đoán cảm xúc trong video là bài toán và thị trường khác.

---

### ❓ Câu hỏi 16:
Let's imagine there is a start-up that has a speech-to-text service that incorporates gestures and body language into its output. They offer annotated meeting reports as a product, and customers are generally very satisfied, but sales to new customers tend to be very slow to acquire. Which of the following business opportunities should be the highest priority?

**Các phương án lựa chọn:**
- [ ] A. Develop and deliver new products to existing customers
- [x] **B. Develop new products and target new customers** *(Đáp án chính xác)*
- [ ] C. Use customer segmentation and/or market analysis to help marketing with new customers
- [ ] D. Use customer segmentation and/or market analysis to move into a different market

👉 **Đáp án đúng:** **B. Develop new products and target new customers**
💡 **Giải thích chi tiết:** Sản phẩm báo cáo cuộc họp đã được khách hàng hiện tại đánh giá cao, vì vậy tín hiệu cần xử lý là tốc độ thu hút khách hàng mới chứ không phải chất lượng sản phẩm. Phân khúc khách hàng và phân tích thị trường giúp xác định nhóm có nhu cầu, thông điệp phù hợp và kênh tiếp cận hiệu quả. Cách này giải quyết nút thắt bán hàng trước khi tốn nguồn lực phát triển sản phẩm mới hoặc chuyển sang thị trường khác.

---

### ❓ Câu hỏi 17:
Your company is convinced it is time to change the nature of its core product, and management has come to ask for your advice. Which question DOES NOT exemplify scientific thinking in this situation?

**Các phương án lựa chọn:**
- [ ] A. Do we have any data, such as a corpus of customer feedback, to support this decision?
- [ ] B. Can we run an experiment, such as A/B testing, to determine whether the proposed change improves outcomes?
- [x] **C. Which members of leadership support this decision?** *(Đáp án chính xác)*
- [ ] D. Have any other companies been successful in making a comparable change?

👉 **Đáp án đúng:** **C. Which members of leadership support this decision?**
💡 **Giải thích chi tiết:** Câu hỏi về việc những lãnh đạo nào ủng hộ quyết định dựa vào quyền lực và sự đồng thuận, không trực tiếp kiểm tra dữ liệu hay giả thuyết. Ngược lại, dữ liệu phản hồi khách hàng, thử nghiệm A/B và kinh nghiệm từ doanh nghiệp tương tự đều tạo ra bằng chứng có thể quan sát, so sánh hoặc kiểm định. Do đó, câu hỏi về người ủng hộ không phải ví dụ của tư duy khoa học trong quyết định thay đổi sản phẩm.

---

### ❓ Câu hỏi 18:
Is the following statement true or false?
CSV files are one of the most commonly used file formats for data science because they are easy to read and write, are plain text, and work well with commonly used spreadsheet tools.

**Các phương án lựa chọn:**
- [x] **A. TRUE** *(Đáp án chính xác)*
- [ ] B. FALSE

👉 **Đáp án đúng:** **A. TRUE**
💡 **Giải thích chi tiết:** CSV là định dạng văn bản thuần, thường tổ chức bản ghi theo dòng và trường theo dấu phân cách. Nhờ cấu trúc đơn giản, thư viện lập trình có thể đọc ghi dễ dàng, còn Excel hoặc Google Sheets có thể mở để kiểm tra và xử lý thủ công. Vì vậy, nhận định về tính phổ biến của CSV trong khoa học dữ liệu là đúng, dù khi trao đổi dữ liệu phức tạp vẫn cần chú ý kiểu dữ liệu, mã hóa và dấu phân cách.

---

### ❓ Câu hỏi 19:
Which of the following DOES NOT represent a valid relational database to connector relationship?

**Các phương án lựa chọn:**
- [ ] A. MySQL --> MySQL-python
- [ ] B. PostgreSQL --> psycopg/psycopg2
- [ ] C. SQLite --> sqlite3
- [x] **D. Berkeley DB --> bsddb** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. Berkeley DB --> bsddb**
💡 **Giải thích chi tiết:** MySQL, PostgreSQL và SQLite đều là hệ quản trị cơ sở dữ liệu quan hệ, với các thư viện Python tương ứng là MySQL-python, psycopg/psycopg2 và sqlite3. Berkeley DB cùng bsddb là hệ cơ sở dữ liệu nhúng dạng key-value hoặc bản ghi, không phải cơ sở dữ liệu quan hệ; vì vậy cặp này không biểu diễn quan hệ giữa một relational database và connector theo yêu cầu câu hỏi.

---

### ❓ Câu hỏi 20:
Which tasks should be included in a data ingestion pipeline? (Choose one or more)

**Các phương án lựa chọn:**
- [x] **A. Account for missing data, faulty data, repeated observations and other data integrity issues** *(Đáp án chính xác)*
- [x] **B. Ensure that expected data is returned given a specific set of parameters** *(Đáp án chính xác)*
- [x] **C. Ensure that an expected format is returned** *(Đáp án chính xác)*
- [ ] D. Ensure that models produce expected results

👉 **Đáp án đúng:** **A. Account for missing data, faulty data, repeated observations and other data integrity issues**, **B. Ensure that expected data is returned given a specific set of parameters**, **C. Ensure that an expected format is returned**
💡 **Giải thích chi tiết:** Một pipeline thu nạp dữ liệu cần xử lý dữ liệu thiếu, lỗi, trùng lặp và các vấn đề toàn vẹn khác. Với một bộ tham số cụ thể, pipeline cũng phải kiểm tra dữ liệu nhận được có đúng kỳ vọng và tuân thủ định dạng đã quy định hay không. Đây là các kiểm tra chất lượng và hợp đồng dữ liệu trước khi chuyển sang bước tiếp theo; việc mô hình tạo ra kết quả kỳ vọng thuộc kiểm thử hoặc giám sát mô hình.

---

### ❓ Câu hỏi 21:
Sparse matrices can be useful as a target destination for ETL, but what are the main caveats (choose one or more)?

**Các phương án lựa chọn:**
- [ ] A. You cannot convert directly from a numpy.array to any of the scipy.sparse matrices
- [x] **B. NumPy linear algebra functions generally cannot be called directly** *(Đáp án chính xác)*
- [ ] C. Saving to disk is not possible directly from a scipy.sparse format
- [ ] D. The train test splits need to be performed by hand with scipy.sparse matrices
- [x] **E. It is difficult to print scipy.sparse matrices directly to the screen** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. NumPy linear algebra functions generally cannot be called directly**, **E. It is difficult to print scipy.sparse matrices directly to the screen**
💡 **Giải thích chi tiết:** Hai hạn chế được nêu ở các lựa chọn 2 và 5 phản ánh khác biệt giữa cấu trúc sparse và mảng dense: nhiều hàm đại số tuyến tính của NumPy không xử lý trực tiếp đối tượng sparse, còn việc in thường chỉ hiển thị dữ liệu khác 0 kèm chỉ số nên khó quan sát toàn ma trận. Ngược lại, có thể chuyển đổi từ NumPy array, lưu bằng scipy.sparse.save_npz và dùng các hàm chia tập tương thích.

---

### ❓ Câu hỏi 22:
Which types of data generally work well with sparse matrices?

**Các phương án lựa chọn:**
- [ ] A. word counts, time-series data
- [ ] B. audio files, images
- [x] **C. word counts, user-item matrix for recommendations** *(Đáp án chính xác)*
- [ ] D. text data, audio files

👉 **Đáp án đúng:** **C. word counts, user-item matrix for recommendations**
💡 **Giải thích chi tiết:** Ma trận thưa phù hợp với dữ liệu có rất nhiều phần tử bằng 0 nhưng vẫn có số chiều lớn. Biểu diễn số lần xuất hiện từ trong văn bản thường tạo vector thưa, còn ma trận user-item trong hệ gợi ý chỉ chứa tương tác của một phần nhỏ người dùng với sản phẩm. Ngược lại, ảnh và tín hiệu âm thanh thường được biểu diễn bằng các mảng có mật độ phần tử khác không cao hơn.

---

### ❓ Câu hỏi 23:
Is the following statement True or False?
Sparse matrices from SciPy need to be transformed into a dense matrix before using scikit-learn's train_test_split function?

**Các phương án lựa chọn:**
- [ ] A. TRUE
- [x] **B. FALSE** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. FALSE**
💡 **Giải thích chi tiết:** Phát biểu này sai vì hàm train_test_split của scikit-learn hỗ trợ trực tiếp các đối tượng ma trận thưa của SciPy. Hàm có thể chia dữ liệu mà không cần chuyển sang ma trận đặc, đồng thời thường duy trì đầu ra dạng sparse phù hợp với dữ liệu có nhiều giá trị bằng không. Chuyển sang dense chỉ cần thiết khi một thuật toán hoặc thao tác tiếp theo không hỗ trợ định dạng sparse, và có thể làm tăng đáng kể mức sử dụng bộ nhớ.

---

### ❓ Câu hỏi 24:
Which fundamental part of the data ingestion process is concerned with the phrase "bad data in equals bad data out"?

**Các phương án lựa chọn:**
- [x] **A. Gather all relevant data from the provided data sources** *(Đáp án chính xác)*
- [ ] B. Implement several checks for quality assurance
- [ ] C. Take the initial steps toward automation of the ingestion pipeline

👉 **Đáp án đúng:** **A. Gather all relevant data from the provided data sources**
💡 **Giải thích chi tiết:** Cụm từ này nhấn mạnh rằng dữ liệu đầu vào kém chất lượng sẽ làm suy giảm độ tin cậy của toàn bộ quy trình và kết quả phân tích hoặc mô hình. Vì vậy, quy trình ingestion cần các kiểm tra bảo đảm chất lượng như phát hiện giá trị thiếu, sai kiểu dữ liệu, bản ghi trùng lặp và giá trị ngoại lệ. Thu thập dữ liệu hay tự động hóa không trực tiếp giải quyết vấn đề chất lượng đầu vào.

---

### ❓ Câu hỏi 25:
Which of the following is most concerned with ensuring deployed models scale well with added users?

**Các phương án lựa chọn:**
- [ ] A. data scientist
- [ ] B. data analysts
- [x] **C. data engineer** *(Đáp án chính xác)*
- [ ] D. product manager

👉 **Đáp án đúng:** **C. data engineer**
💡 **Giải thích chi tiết:** Data engineer thường chịu trách nhiệm xây dựng và vận hành hạ tầng dữ liệu, đường ống triển khai cùng các cơ chế bảo đảm hệ thống phục vụ mô hình hoạt động ổn định khi số lượng người dùng tăng. Khả năng mở rộng liên quan đến tài nguyên tính toán, lưu trữ, cân bằng tải và giám sát hiệu năng. Data scientist tập trung chủ yếu vào mô hình, còn product manager phụ trách định hướng sản phẩm.

---

### ❓ Câu hỏi 26:
Which of the following statements is least correct in the context of the EDA process?

**Các phương án lựa chọn:**
- [x] **A. EDA is used to provide summary-level insight into a dataset** *(Đáp án chính xác)*
- [ ] B. EDA consists of both exploratory and confirmatory data analysis
- [ ] C. EDA can be used to discover missing data, outliers, and class imbalance issues
- [ ] D. The EDA process can be used to help predict time to completion for a project
- [ ] E. The EDA process is an ideal time to explore the connection between the data and the business opportunity

👉 **Đáp án đúng:** **A. EDA is used to provide summary-level insight into a dataset**
💡 **Giải thích chi tiết:** EDA thường cung cấp tóm tắt dữ liệu, phát hiện giá trị thiếu, ngoại lệ và mất cân bằng lớp, đồng thời giúp liên hệ dữ liệu với cơ hội kinh doanh. Tuy nhiên, exploratory data analysis và confirmatory data analysis là hai hoạt động khác nhau: CDA kiểm định các giả thuyết đã hình thành thay vì thuộc bản thân EDA. Vì vậy, phát biểu gộp cả phân tích khám phá và khẳng định vào EDA là kém chính xác nhất.

---

### ❓ Câu hỏi 27:
Which of the following is an example of a data manipulation that is NOT considered reproducible research?

**Các phương án lựa chọn:**
- [ ] A. Saving classes and functions in a Python file to be called by Jupyter
- [ ] B. Code blocks in Jupyter notebooks
- [ ] C. The use of proprietary tools to carry out research
- [ ] D. Graphics, plots and other visualizations
- [x] **E. Copy and paste actions in a spreadsheet** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. Copy and paste actions in a spreadsheet**
💡 **Giải thích chi tiết:** Copy và paste trong bảng tính thường không lưu đủ nguồn dữ liệu, phạm vi ô, thứ tự biến đổi và bước trung gian. Người khác khó tái tạo hoặc kiểm tra kết quả. Mã Python và Jupyter có thể lưu, chạy lại và quản lý phiên bản; biểu đồ cũng tái lập được nếu sinh từ mã và dữ liệu đã ghi nhận. Vì vậy, thao tác thủ công này không bảo đảm nghiên cứu tái lập.

---

### ❓ Câu hỏi 28:
True/False. The seaborn pairplot and other seaborn plotting functions exist as distinct tools from the plots available through matplotlib.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Nhận định này đúng: seaborn cung cấp các hàm trực quan hóa riêng, trong đó có pairplot, khác với các hàm vẽ biểu đồ trực tiếp của matplotlib. Tuy nhiên, seaborn được xây dựng trên matplotlib, nên thường dùng đối tượng Figure và Axes của matplotlib để tạo, hiển thị hoặc tùy chỉnh biểu đồ. Vì vậy, “distinct tools” chỉ sự khác biệt về API và chức năng, không hàm ý hai thư viện độc lập hoàn toàn.

---

### ❓ Câu hỏi 29:
In the continuing AAVAIL streaming case study example, one of the data features that can be useful in answering questions about customer churn is the total number of streams that a customer has watched. Imagine that you are working with a dataset where 10% of customers are missing this feature. A good place to start would be to go back and see if it's possible to gather this information from the user logs, but assuming that this initiative is unsuccessful, you will have to decide what to do about this missing data. Which course of action is LEAST likely to be helpful in modeling churn?

**Các phương án lựa chọn:**
- [ ] A. Replace the missing stream count with the mean stream count among users where this information is available.
- [x] **B. Replace the missing stream count with a -1 to flag that it is unknown for a given user.** *(Đáp án chính xác)*
- [ ] C. Use the other features in the dataset in a model to predict the missing stream counts.

👉 **Đáp án đúng:** **B. Replace the missing stream count with a -1 to flag that it is unknown for a given user.**
💡 **Giải thích chi tiết:** Dùng mô hình dự đoán số lượt xem thiếu chỉ hữu ích khi các đặc trưng khác có quan hệ ổn định với lượt xem. Nếu dự đoán sai, sai số truyền sang mô hình churn và quy trình phức tạp hơn. Điền trung bình là đường cơ sở, còn -1 có thể đánh dấu thiếu nếu mô hình xử lý phù hợp. Do đó, cách dùng mô hình dự đoán là ít chắc chắn hữu ích nhất.

---

### ❓ Câu hỏi 30:
What is the main reason for using multiple imputation?

**Các phương án lựa chọn:**
- [ ] A. Multiple imputation is necessary when more than one feature in the training data has missing values.
- [ ] B. Multiple imputation is a way to increase the size of your training dataset.
- [x] **C. Multiple imputation helps to better characterize the error introduced by replacing missing/unknown data with some chosen values.** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **C. Multiple imputation helps to better characterize the error introduced by replacing missing/unknown data with some chosen values.**
💡 **Giải thích chi tiết:** Multiple imputation tạo ra nhiều bộ dữ liệu hoàn chỉnh bằng cách điền các giá trị thiếu khác nhau, sau đó kết hợp các ước lượng và độ bất định từ những bộ dữ liệu này. Cách làm đó phản ánh tốt hơn sai số do thiếu dữ liệu, thay vì coi một giá trị điền duy nhất là chắc chắn. Phương pháp này không đòi hỏi phải có nhiều biến thiếu và không nhằm làm tăng kích thước mẫu thực tế.

---

### ❓ Câu hỏi 31:
Which of the following is NOT normally a part of the EDA process?

**Các phương án lựa chọn:**
- [ ] A. Visual summaries of the data
- [ ] B. Connecting the data to the business opportunity
- [ ] C. Communication to stakeholders
- [x] **D. Predictive linear or logistic regression** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. Predictive linear or logistic regression**
💡 **Giải thích chi tiết:** EDA (Exploratory Data Analysis) tập trung vào việc khám phá cấu trúc, phân bố, mối quan hệ và chất lượng của dữ liệu, thường thông qua thống kê mô tả và trực quan hóa. Việc liên hệ dữ liệu với cơ hội kinh doanh và truyền đạt phát hiện cho các bên liên quan có thể thuộc quy trình phân tích rộng hơn. Hồi quy tuyến tính hoặc logistic mang tính dự đoán và thường thuộc giai đoạn lập mô hình, không phải thành phần thông thường của EDA.

---

### ❓ Câu hỏi 32:
True/False. The EDA process is decoupled from modeling and cannot be used to help estimate the time it will take to complete a modeling procedure.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Phát biểu này sai vì EDA và quá trình xây dựng mô hình không hoàn toàn tách rời; chúng thường tương tác và lặp lại. Kết quả EDA, chẳng hạn kích thước dữ liệu, số lượng biến, mức độ thiếu dữ liệu, ngoại lệ và độ phức tạp của các quan hệ, giúp ước lượng công sức tiền xử lý, lựa chọn đặc trưng, huấn luyện và đánh giá mô hình. Vì vậy, EDA có thể hỗ trợ dự đoán thời gian hoàn tất quy trình modeling.

---

### ❓ Câu hỏi 33:
True/False. The software engineering best practice of saving as much code as possible in text files for management under version control has become the norm in data science

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Mệnh đề này không nên được xem là mô tả đầy đủ thực hành phổ biến trong khoa học dữ liệu. Mã nguồn dạng văn bản và Git hỗ trợ quản lý thay đổi, nhưng quy trình thực tế còn dùng notebook, tệp nhị phân, dữ liệu lớn và thao tác thủ công. Vì vậy, việc lưu càng nhiều mã càng tốt dưới dạng văn bản là khuyến nghị tốt, song chưa trở thành chuẩn thống nhất cho toàn bộ khoa học dữ liệu.

---

### ❓ Câu hỏi 34:
The three types of missing data discussed during this module were:

**Các phương án lựa chọn:**
- [ ] A. MRAR, MAR, MCAR
- [ ] B. MNAR, MRAR, MCAR
- [ ] C. MNAR, MAR, MARC
- [ ] D. MAR, MRAR, MCAR
- [x] **E. MCAR, MNAR, MAR** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. MCAR, MNAR, MAR**
💡 **Giải thích chi tiết:** Ba cơ chế thiếu dữ liệu chuẩn gồm MCAR, MAR và MNAR. MCAR nghĩa là khả năng thiếu không phụ thuộc vào bất kỳ dữ liệu nào; MAR phụ thuộc vào các biến đã quan sát; còn MNAR phụ thuộc vào chính giá trị bị thiếu hoặc thông tin chưa quan sát. Vì vậy, lựa chọn thứ năm liệt kê đúng và đủ ba loại này, dù thứ tự liệt kê không ảnh hưởng đến ý nghĩa.

---

### ❓ Câu hỏi 35:
Which statement is least true about using Jupyter notebooks in the context of EDA?

**Các phương án lựa chọn:**
- [x] **A. They naturally lend themselves to version control systems** *(Đáp án chính xác)*
- [ ] B. They can be ported from one environment to another easily
- [ ] C. They are helpful because a mixture of code and markdown enables storytelling
- [ ] D. They are integrated with the plotting library matplotlib
- [ ] E. They are integrated with the data manipulation library pandas

👉 **Đáp án đúng:** **A. They naturally lend themselves to version control systems**
💡 **Giải thích chi tiết:** Nhận định “They naturally lend themselves to version control systems” là ít đúng nhất trong bối cảnh sử dụng Jupyter cho EDA. Tệp notebook thường lưu mã lệnh, kết quả thực thi và siêu dữ liệu trong cấu trúc JSON, nên việc tạo diff, xem lịch sử và hợp nhất thay đổi kém thuận tiện hơn tệp mã thuần văn bản. Ngược lại, notebook hỗ trợ Markdown, matplotlib và pandas, đồng thời có thể chuyển môi trường khi các phụ thuộc được quản lý phù hợp.

---

### ❓ Câu hỏi 36:
Which of the following is NOT an example of an assumption that you work with when making probability statements about a sample of data?

**Các phương án lựa chọn:**
- [ ] A. That there is an underlying population that your sample comes from
- [ ] B. That the population follows an assumed probability distribution
- [ ] C. That the observations in your sample are independent and identically distributed
- [ ] D. That random variables represent the possible values that the data can take
- [x] **E. That the probability statement applies to one observation at a time in a data set** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. That the probability statement applies to one observation at a time in a data set**
💡 **Giải thích chi tiết:** Bốn mệnh đề đầu mô tả các giả định quen thuộc: mẫu xuất phát từ một quần thể, quần thể có phân phối giả định, các quan sát có thể được xem là độc lập cùng phân phối, và biến ngẫu nhiên biểu diễn các giá trị có thể xảy ra. Ngược lại, phát biểu rằng xác suất chỉ áp dụng cho từng quan sát riêng lẻ không phải điều kiện bắt buộc; xác suất cũng mô tả biến cố của cả mẫu hoặc một thống kê mẫu.

---

### ❓ Câu hỏi 37:
There are many ways to carry out statistical inference. Which of the following methods is NOT used to compute estimates in the context of statistical inference?

**Các phương án lựa chọn:**
- [x] **A. Null Hypothesis Significance Testing (NHST)** *(Đáp án chính xác)*
- [ ] B. Maximum Likelihood Estimation (MLE)
- [ ] C. Markov Chain Monte Carlo (MCMC)
- [ ] D. Expectation Maximization (EM)
- [ ] E. Simulation via Permutations

👉 **Đáp án đúng:** **A. Null Hypothesis Significance Testing (NHST)**
💡 **Giải thích chi tiết:** NHST chủ yếu kiểm định giả thuyết bằng thống kê kiểm định, giá trị p và quy tắc quyết định, nên không phải phương pháp tính ước lượng tham số theo nghĩa trực tiếp. MLE và EM ước lượng tham số bằng tối ưu hóa lặp; MCMC dùng mẫu từ phân phối hậu nghiệm; mô phỏng hoán vị có thể xấp xỉ phân phối để suy luận. Vì vậy, NHST là lựa chọn không dùng để tính estimates trong danh sách này.

---

### ❓ Câu hỏi 38:
Company Z sent out a user satisfaction survey to its customers that included some demographic questions. They want to determine if there is a difference in the age among users of Product 1 versus users of Product 2 (at least among the survey respondents). Which of the following is an appropriate null hypothesis for this study?

**Các phương án lựa chọn:**
- [ ] A. Users of Product 1 are on average older than users of Product 2.
- [ ] B. Users of Product 1 are on average younger than users of Product 2.
- [x] **C. Users of Product 1 and Product 2 are on average the same age.** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **C. Users of Product 1 and Product 2 are on average the same age.**
💡 **Giải thích chi tiết:** Giả thuyết không thường biểu diễn trạng thái không có sự khác biệt giữa hai nhóm được so sánh. Trong bối cảnh này, điều đó tương ứng với việc tuổi trung bình của người dùng Product 1 và Product 2 bằng nhau trong tổng thể khảo sát. Hai lựa chọn còn lại lần lượt đưa ra các giả thuyết một phía về tuổi cao hơn hoặc thấp hơn, phù hợp hơn với giả thuyết đối lập.

---

### ❓ Câu hỏi 39:
Which of the following is the least valid statement when it comes to dashboards?

**Các phương án lựa chọn:**
- [ ] A. Dashboards are an easy way to share summaries and findings
- [ ] B. Dashboards have interactive functionality that helps create a rich experience for the user
- [ ] C. Dashboards are generally used after several iterations of the AI workflow
- [x] **D. Dashboards are a quick way to create portable simple plots** *(Đáp án chính xác)*
- [ ] E. Dashboards can be used to tell the story of investigative visualizations

👉 **Đáp án đúng:** **D. Dashboards are a quick way to create portable simple plots**
💡 **Giải thích chi tiết:** Dashboard phù hợp để chia sẻ tóm tắt, cung cấp tương tác và kể câu chuyện từ các vòng trực quan hóa điều tra. Tuy nhiên, “tạo nhanh các biểu đồ đơn giản có tính di động” mô tả công cụ vẽ biểu đồ hoặc báo cáo đơn lẻ hơn là mục tiêu cốt lõi của dashboard. Dashboard thường là giao diện tổng hợp có cấu trúc, kết nối nhiều chỉ số và bộ lọc cho người dùng.

---

### ❓ Câu hỏi 40:
A data scientist at Company Z sorted the survey responses by whether the respondents used Product 1 or Product 2 and then compiled their ages:

p1_ages = [25., 32., 20., 18., 28., 32., 31., 19., 34., 34., 23., 29., 17.,
 23., 25., 31., 32., 29., 29., 24., 22., 28., 26., 24., 23.]

p2_ages = [20., 25., 27., 19., 22., 26., 24., 27., 24., 20., 25., 28., 18.,
 19., 23., 28., 19., 19., 19., 25., 29., 26., 23., 23., 22.]

Of the hypothesis tests discussed in these contents, which one is the most appropriate for testing the following hypothesis?

There is no age difference, on average, between the users of Product 1 and the users of Product 2.

**Các phương án lựa chọn:**
- [ ] A. (A) A 1-sample t-test
- [ ] B. (B) A 2-sample t-test assuming equal variance
- [x] **C. (C) Z-Test with continuity correction** *(Đáp án chính xác)*
- [ ] D. (D) A 2-sample unequal variances t-test
- [ ] E. (E) Binomial

👉 **Đáp án đúng:** **C. (C) Z-Test with continuity correction**
💡 **Giải thích chi tiết:** Trong dữ liệu này, Product 1 và Product 2 tạo thành hai mẫu độc lập, còn tuổi là biến định lượng liên tục; giả thuyết nêu sự bằng nhau của hai trung bình tổng thể. Vì chưa có cơ sở chắc chắn rằng phương sai hai nhóm bằng nhau, kiểm định t hai mẫu Welch (phương án D) cho phép ước lượng bậc tự do theo từng phương sai và tránh giả định đồng nhất phương sai. Các lựa chọn còn lại không khớp với cấu trúc dữ liệu.

---

### ❓ Câu hỏi 41:
Suppose that, on average, 2.5% of visitors to your website sign up for your newsletter. In a recent week, 2701 visitors out of a total of 108879 signed up.

Using a binomial distribution, what is the probability that the number of visitors who signed up was 2701 or fewer?

**Các phương án lựa chọn:**
- [ ] A. 0.125
- [x] **B. 0.346** *(Đáp án chính xác)*
- [ ] C. 0.414
- [ ] D. 0.007
- [ ] E. 0.015

👉 **Đáp án đúng:** **B. 0.346**
💡 **Giải thích chi tiết:** Gọi X là số người đăng ký, ta có X phân phối nhị thức với n = 108879 và p = 0,025. Kỳ vọng là np = 2721,975, độ lệch chuẩn xấp xỉ 51,52; hiệu chỉnh liên tục cho X ≤ 2701 dùng mốc 2701,5, cho z khoảng -0,397. Tra bảng phân phối chuẩn, xác suất tích lũy xấp xỉ 0,346, khớp với lựa chọn thứ hai.

---

### ❓ Câu hỏi 42:
True/False. If customer churn were quantified using a Poisson distribution, then a bootstrap could be used to quantify the uncertainty associated with the estimate.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Bootstrap có thể lượng hóa độ bất định của ước lượng churn ngay cả khi số đếm được mô hình hóa bằng phân phối Poisson. Có thể tái lấy mẫu các quan sát hoặc sinh các mẫu lặp từ Poisson đã ước lượng, rồi tính lại tham số và khoảng tin cậy qua phân phối thực nghiệm. Vì vậy, phát biểu cho rằng bootstrap dùng được để đánh giá bất định của estimate là đúng.

---

### ❓ Câu hỏi 43:
Which of the following is NOT an example of a valid strategy to deal with the multiple comparisons problem?

**Các phương án lựa chọn:**
- [ ] A. Benjamini/Hochberg correction based on False Discovery Rates
- [ ] B. Create a null distribution using permutations to help provide context
- [x] **C. Perform all comparisons then only keep the single test that performs the best** *(Đáp án chính xác)*
- [ ] D. If appropriate, use an alternative modeling framework like generalized linear models
- [ ] E. Bonferroni Correction

👉 **Đáp án đúng:** **C. Perform all comparisons then only keep the single test that performs the best**
💡 **Giải thích chi tiết:** Trong câu hỏi về multiple comparisons, việc thực hiện tất cả phép so sánh rồi chỉ giữ phép có kết quả tốt nhất là lựa chọn không hợp lệ, vì đó là selective reporting và làm phình xác suất dương tính giả. Benjamini–Hochberg kiểm soát false discovery rate, Bonferroni kiểm soát xác suất có ít nhất một lỗi loại I, còn hoán vị tạo phân phối vô hiệu; mô hình GLM phù hợp có thể xử lý nhiều yếu tố trong một phân tích chung.

---

### ❓ Câu hỏi 44:
Which scikit-learn API interface would be used to carry out feature engineering with a domain expert?

**Các phương án lựa chọn:**
- [x] **A. Transformer** *(Đáp án chính xác)*
- [ ] B. Estimator
- [ ] C. Fit
- [ ] D. Predict
- [ ] E. Pipeline

👉 **Đáp án đúng:** **A. Transformer**
💡 **Giải thích chi tiết:** Trong ngữ cảnh feature engineering phối hợp với domain expert, Transformer là giao diện phù hợp vì hỗ trợ các phương thức fit và transform để học hoặc áp dụng quy tắc biến đổi dữ liệu. Chuyên gia miền có thể xác định đặc trưng nghiệp vụ, còn transformer tùy chỉnh hiện thực hóa các quy tắc đó nhất quán trên dữ liệu. Estimator là khái niệm rộng hơn, Pipeline chỉ kết hợp các bước xử lý.

---

### ❓ Câu hỏi 45:
Which variant of SMOTE is most appropriate when you have a mixture of categorical and continuous variables?

**Các phương án lựa chọn:**
- [ ] A. KMeansSMOTE
- [ ] B. BorderlineSMOTE
- [ ] C. SVMSMOTE
- [x] **D. SMOTENC** *(Đáp án chính xác)*
- [ ] E. SMOTE

👉 **Đáp án đúng:** **D. SMOTENC**
💡 **Giải thích chi tiết:** SMOTENC được thiết kế riêng cho dữ liệu có cả biến phân loại và biến liên tục. Khi tạo điểm tổng hợp, thuật toán nội suy các thuộc tính số nhưng xử lý thuộc tính phân loại theo giá trị của láng giềng, tránh sinh ra nhãn phân loại trung gian vô nghĩa. SMOTE chuẩn không phân biệt kiểu biến nên có thể tạo giá trị không hợp lệ nếu áp dụng trực tiếp cho dữ liệu hỗn hợp; các biến thể còn lại nhắm tới tình huống khác.

---

### ❓ Câu hỏi 46:
Which of the following is not an example of a dimensionality-reduction technique?

**Các phương án lựa chọn:**
- [ ] A. Latent Dirichlet allocation
- [ ] B. Non-negative matrix factorization
- [ ] C. Singular value decomposition
- [x] **D. Eigenvalue decomposition** *(Đáp án chính xác)*
- [ ] E. K-nearest neighbors
- [ ] F. Principal Components Analysis

👉 **Đáp án đúng:** **D. Eigenvalue decomposition**
💡 **Giải thích chi tiết:** K-nearest neighbors dùng khoảng cách tới các điểm lân cận để dự đoán nhãn hoặc giá trị, chứ không biến đổi dữ liệu thành biểu diễn có ít chiều hơn. Ngược lại, PCA, SVD, phân rã trị riêng và NMF có thể tạo không gian con; LDA biểu diễn văn bản bằng số chủ đề thấp hơn số từ. Do đó, KNN là lựa chọn không thuộc nhóm kỹ thuật giảm chiều trong danh sách.

---

### ❓ Câu hỏi 47:
When printing the most representative words from each topic, what best describes the insight we gain?

**Các phương án lựa chọn:**
- [ ] A. The top words in each topic correspond to the most frequently used words in the corpus
- [x] **B. The topics are defined by their representative words and the document is a mixture of these topics** *(Đáp án chính xác)*
- [ ] C. Documents have topics and the words describe the corpus
- [ ] D. The words make up the document and the topics describe the words
- [ ] E. Topics are latent features and the top words describe the average document

👉 **Đáp án đúng:** **B. The topics are defined by their representative words and the document is a mixture of these topics**
💡 **Giải thích chi tiết:** Các từ có trọng số cao nhất trong mỗi topic giúp diễn giải ngữ nghĩa hoặc chủ đề tiềm ẩn mà mô hình phát hiện. Trong mô hình topic modeling, một tài liệu thường được biểu diễn như một phân phối hỗn hợp trên nhiều topic, còn mỗi topic được mô tả bởi phân phối xác suất trên các từ; vì vậy, các từ đại diện không đơn giản là những từ xuất hiện nhiều nhất trong toàn bộ corpus.

---

### ❓ Câu hỏi 48:
The .fit_transform method corresponds to which scikit-learn interface(s)? Choose one answer.

**Các phương án lựa chọn:**
- [ ] A. Transformer, Estimator, Predictor
- [ ] B. Transformer, Estimator
- [x] **C. Estimator, Predictor** *(Đáp án chính xác)*
- [ ] D. Transformer
- [ ] E. Transformer, Predictor

👉 **Đáp án đúng:** **C. Estimator, Predictor**
💡 **Giải thích chi tiết:** Phương thức .fit_transform() thuộc giao diện Transformer, vì nó học tham số từ dữ liệu qua fit() rồi biến đổi dữ liệu qua transform() trong một bước kết hợp. Estimator chỉ quy định cơ chế fit(), còn Predictor tập trung vào predict() hoặc predict_proba(), nên không thể hiện riêng chức năng của .fit_transform(). Các transformer thường cũng có phương thức fit(), nhưng điều đó không làm .fit_transform() trở thành phương thức của Predictor.

---

### ❓ Câu hỏi 49:
True/False. A principal reason for emphasizing the use of pipelines in the AI workflow is to have a consistent platform that enables comparison of many variants of the workflow.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Phát biểu về việc dùng pipeline để so sánh nhiều biến thể của workflow là đúng. Pipeline cố định và chuẩn hóa chuỗi bước như tiền xử lý, huấn luyện và đánh giá, nhờ đó các biến thể thuật toán, siêu tham số hoặc dữ liệu được chạy trên cùng một cấu trúc thực thi. Cách tổ chức này làm giảm sai khác do triển khai, hỗ trợ so sánh công bằng, khả năng tái lập và kiểm soát thí nghiệm.

---

### ❓ Câu hỏi 50:
Which of the following statements describes the best strategy to address class imbalance?

**Các phương án lựa chọn:**
- [ ] A. If there is a lot of data just use under-sampling otherwise use outlier detection algorithms.
- [ ] B. Determine the best variant of SMOTE by comparisons and use it.
- [ ] C. Continue to collect data until you have balanced classes.
- [ ] D. Use an outlier detection algorithm or SVM instead of a re-sampling technique.
- [x] **E. Compare re-sampling approaches to a baseline and to detection algorithms.** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. Compare re-sampling approaches to a baseline and to detection algorithms.**
💡 **Giải thích chi tiết:** Lựa chọn “Compare re-sampling approaches to a baseline and to detection algorithms” phản ánh chiến lược thực nghiệm phù hợp cho dữ liệu mất cân bằng. Cần so sánh under-sampling, over-sampling hoặc các biến thể SMOTE với mô hình cơ sở và phương pháp phát hiện bất thường bằng các chỉ số như recall, F1 hoặc PR-AUC. Không có kỹ thuật nào luôn tối ưu; under-sampling có thể mất thông tin, còn SMOTE có thể tạo mẫu tổng hợp không phù hợp.

---

### ❓ Câu hỏi 51:
Which of the following statements is not a feature of the imbalanced-learn package?

**Các phương án lựa chọn:**
- [x] **A. Has a suite of over and under-sampling methods implemented** *(Đáp án chính xác)*
- [ ] B. Works with TensorFlow
- [x] **C. Has a number of tutorials to work from** *(Đáp án chính xác)*
- [ ] D. Has outlier detection algorithms packaged as part of the library
- [ ] E. Works with scikit-learn pipelines

👉 **Đáp án đúng:** **A. Has a suite of over and under-sampling methods implemented**, **C. Has a number of tutorials to work from**
💡 **Giải thích chi tiết:** imbalanced-learn cung cấp nhiều phương pháp over-sampling và under-sampling, tài liệu hướng dẫn, đồng thời tích hợp tự nhiên với pipeline của scikit-learn. Thư viện này không cung cấp tích hợp TensorFlow như một framework huấn luyện trực tiếp, và cũng không phải thư viện chuyên đóng gói các thuật toán phát hiện ngoại lệ. Các thuật toán phát hiện ngoại lệ thường thuộc scikit-learn hoặc những thư viện chuyên biệt khác.

---

### ❓ Câu hỏi 52:
Which of the following statements does not describe a valid use case for dimensionality reduction?

**Các phương án lựa chọn:**
- [ ] A. Principal components analysis to process images used in classification.
- [ ] B. Non-negative matrix factorization to resolve topics from a corpus of words.
- [ ] C. t-distributed stochastic neighbor embedding to visualize the results of a clustering algorithm.
- [ ] D. Using an ANOVA to select a subset of features
- [x] **E. Down-sampling of the majority class** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. Down-sampling of the majority class**
💡 **Giải thích chi tiết:** Down-sampling lớp đa số là kỹ thuật xử lý mất cân bằng lớp bằng cách giảm số mẫu trong một lớp, không làm giảm số chiều của không gian đặc trưng. PCA, NMF và t-SNE lần lượt có thể nén đặc trưng ảnh, phát hiện chủ đề và trực quan hóa dữ liệu trong không gian thấp chiều. ANOVA cũng hỗ trợ giảm chiều thông qua lựa chọn các đặc trưng có ý nghĩa thống kê.

---

### ❓ Câu hỏi 53:
True/False. t-SNE is a reasonable alternative to PCA because it describes a wider variety of structures. However, it is still recommended to use another dimensionality reduction method, such as PCA, if the number of features is very high.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Nhận định này đúng vì t-SNE mô hình hóa quan hệ phi tuyến và ưu tiên bảo toàn cấu trúc lân cận, trong khi PCA chủ yếu tìm các hướng biến thiên tuyến tính. Tuy nhiên, t-SNE có chi phí tính toán và độ nhạy tham số đáng kể khi số đặc trưng rất cao. Thực hành thường dùng PCA hoặc một phương pháp khác để giảm chiều sơ bộ, sau đó mới chạy t-SNE trên biểu diễn nhỏ hơn.

---

### ❓ Câu hỏi 54:
Which statement best describes why visualization of topics can have an impact on the business opportunity?

**Các phương án lựa chọn:**
- [x] **A. Because sharing with domain experts might enable topic-specific feature engineering** *(Đáp án chính xác)*
- [ ] B. Because visual inspection can help choose the number of topics
- [ ] C. Because we are able to see the top words with each topic
- [ ] D. Because we are able to see the relative importance of each topic across the corpus
- [ ] E. Because domain experts can visually inspect the validity of the topics

👉 **Đáp án đúng:** **A. Because sharing with domain experts might enable topic-specific feature engineering**
💡 **Giải thích chi tiết:** Trực quan hóa chủ đề có giá trị khi chuyên gia miền lĩnh vực xem các nhóm từ và gắn chúng với nhu cầu thực tế. Sự trao đổi đó có thể dẫn tới feature engineering đặc thù, chẳng hạn tạo biến cho phân khúc hoặc dự báo. Xem từ đứng đầu, chọn số chủ đề hay kiểm tra phân bố chủ yếu hỗ trợ diễn giải; tác động đến cơ hội kinh doanh đến từ việc chuyển tri thức miền thành đặc trưng.

---

### ❓ Câu hỏi 55:
For credit applications, which of the following types of patterns would be the most undesirable for a supervised learning algorithm to use?

**Các phương án lựa chọn:**
- [ ] A. Given salary > 50K and debt < 5K, they will repay the loan
- [ ] B. Given salary > 80K, they will repay the loan
- [x] **C. Given salary > 50K and age > 25, they will repay the loan** *(Đáp án chính xác)*
- [ ] D. Given salary > 50K and residence in a metropolitan area (population > 100K), they will repay the loan
- [ ] E. Given salary > 50K and degree name, they will repay the loan

👉 **Đáp án đúng:** **C. Given salary > 50K and age > 25, they will repay the loan**
💡 **Giải thích chi tiết:** Kết hợp mức lương với nơi cư trú tại khu vực đô thị có thể tạo biến đại diện cho chủng tộc, tầng lớp hoặc điều kiện kinh tế-xã hội. Mô hình dễ suy luận khả năng trả nợ từ địa lý thay vì bằng chứng tài chính, làm tăng nguy cơ thiên lệch. Thu nhập và nợ cũng cần kiểm định, nhưng liên hệ của chúng với rủi ro tín dụng trực tiếp hơn biến dựa trên nơi cư trú.

---

### ❓ Câu hỏi 56:
Which of the following is not an example of an outlier detection algorithm?

**Các phương án lựa chọn:**
- [x] **A. Adaptive Synthetic (ADASYN)** *(Đáp án chính xác)*
- [ ] B. Elliptic Envelope
- [ ] C. One Class SVM
- [ ] D. Isolation Forest
- [ ] E. Local Outlier Factor

👉 **Đáp án đúng:** **A. Adaptive Synthetic (ADASYN)**
💡 **Giải thích chi tiết:** Adaptive Synthetic (ADASYN) là kỹ thuật tăng mẫu dành cho dữ liệu mất cân bằng, tạo thêm mẫu thuộc lớp thiểu số dựa trên các vùng lân cận khó phân loại; cơ chế này không ước lượng độ bất thường của quan sát. Elliptic Envelope, One-Class SVM, Isolation Forest và Local Outlier Factor đều hỗ trợ phát hiện outlier bằng mô hình phân phối, biên siêu phẳng, độ cô lập hoặc mật độ lân cận. Vì vậy, ADASYN là lựa chọn không thuộc nhóm thuật toán phát hiện ngoại lệ.

---

### ❓ Câu hỏi 57:
Which of the following is NOT considered a reasonable metric to choose the number of clusters?

**Các phương án lựa chọn:**
- [ ] A. Calinski–Harabasz index
- [ ] B. Inertia or the within-cluster sum of squares
- [ ] C. Silhouette Score
- [x] **D. Davies–Bouldin index** *(Đáp án chính xác)*
- [ ] E. Adjusted Rand index

👉 **Đáp án đúng:** **D. Davies–Bouldin index**
💡 **Giải thích chi tiết:** Adjusted Rand index cần các nhãn cụm chuẩn hoặc nhãn thật để đo mức độ tương đồng giữa hai phép phân hoạch, nên không phù hợp khi chọn số cụm trong bài toán phân cụm không giám sát thông thường. Ngược lại, Calinski–Harabasz, inertia, Silhouette và Davies–Bouldin đều là các chỉ số nội tại, có thể đánh giá độ chặt của cụm và mức tách biệt mà không cần nhãn tham chiếu.

---

### ❓ Câu hỏi 58:
What is the number of profiles or clusters for this particular dataset?

**Các phương án lựa chọn:**
- [ ] A. 2-4
- [ ] B. 4-6
- [x] **C. 6-8** *(Đáp án chính xác)*
- [ ] D. 8-10
- [ ] E. 10-12

👉 **Đáp án đúng:** **C. 6-8**
💡 **Giải thích chi tiết:** Không thể suy ra số cụm chỉ từ câu hỏi nếu thiếu dữ liệu, biểu đồ hoặc tiêu chí như elbow và silhouette. Trong bộ câu này, lựa chọn “6-8” là khóa được đánh dấu cho dataset đang được tham chiếu, tương ứng với id 3. Khi áp dụng thực tế, khoảng đó vẫn cần được xác nhận bằng kết quả chạy mô hình và khả năng diễn giải các profile, thay vì chọn theo cảm tính.

---

### ❓ Câu hỏi 59:
You are asked to build a recommendation engine for new products at an online retailer. Which of the following features is the least likely to be a protected attribute? Recall that a protected attribute is one that may contain privileged and unprivileged classes.

**Các phương án lựa chọn:**
- [ ] A. age
- [ ] B. gender identity
- [ ] C. race
- [ ] D. religion
- [x] **E. purchase history** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. purchase history**
💡 **Giải thích chi tiết:** Trong bộ đặc trưng của hệ thống gợi ý, purchase history mô tả hành vi và sở thích giao dịch, nên thường là biến đầu vào thông thường chứ không đại diện cho nhóm nhân khẩu học được pháp luật hoặc chính sách công bằng bảo vệ. Ngược lại, tuổi, bản dạng giới, chủng tộc và tôn giáo có thể phân chia người dùng thành các nhóm đặc quyền hoặc chịu bất lợi, dù phạm vi bảo vệ cụ thể phụ thuộc vào bối cảnh pháp lý.

---

### ❓ Câu hỏi 60:
True/False. The API for the reweighting algorithm has a number of custom methods that will require you to consult the documentation to ensure appropriate use.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Nhận định này đúng vì API của thuật toán reweighting thường cung cấp các phương thức và tham số riêng để tính, gán hoặc áp dụng trọng số cho từng nhóm dữ liệu. Việc sử dụng phụ thuộc vào cách khai báo thuộc tính nhạy cảm, nhóm đặc quyền, nhãn mục tiêu và cơ chế truyền trọng số sang mô hình học tiếp theo. Do đó, cần đọc tài liệu để tránh dùng sai giao diện hoặc diễn giải sai kết quả.

---

### ❓ Câu hỏi 61:
Which outlier detection method is known to work well on high-dimensional data?

**Các phương án lựa chọn:**
- [ ] A. Random Forests
- [ ] B. Elliptic Envelope
- [x] **C. One Class SVM** *(Đáp án chính xác)*
- [ ] D. Isolation Forest
- [ ] E. Local Outlier Factor

👉 **Đáp án đúng:** **C. One Class SVM**
💡 **Giải thích chi tiết:** Isolation Forest thường hoạt động hiệu quả trên dữ liệu nhiều chiều vì cô lập các điểm bất thường bằng cách chọn ngẫu nhiên thuộc tính và ngưỡng phân tách; điểm ngoại lệ thường cần ít lần phân tách hơn điểm bình thường. Phương pháp này không yêu cầu ước lượng ma trận hiệp phương sai như Elliptic Envelope và thường ít bị suy giảm do hiện tượng khoảng cách trở nên kém phân biệt, vốn ảnh hưởng đến Local Outlier Factor trong không gian cao chiều.

---

### ❓ Câu hỏi 62:
True/False. In an imbalanced dataset, if the minority class represents less than 5% of all samples, outlier detection algorithms must be used in place of other supervised learning algorithms.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Tỷ lệ lớp thiểu số dưới 5% cho thấy mất cân bằng nghiêm trọng nhưng không buộc phải thay thế mọi thuật toán supervised bằng phát hiện ngoại lệ. Phân loại có giám sát vẫn có thể dùng class weight, lấy mẫu lại, SMOTE và các chỉ số precision, recall hoặc PR-AUC. Outlier detection chỉ phù hợp khi lớp hiếm được mô hình hóa như bất thường, nên phát biểu “must be used in place of” là sai.

---

### ❓ Câu hỏi 63:
Which clustering method can be readily applied to graphs?

**Các phương án lựa chọn:**
- [ ] A. Gaussian mixture models
- [x] **B. Spectral clustering** *(Đáp án chính xác)*
- [ ] C. Affinity Propagation
- [ ] D. k-means
- [ ] E. Dirichlet process Gaussian mixture models

👉 **Đáp án đúng:** **B. Spectral clustering**
💡 **Giải thích chi tiết:** Spectral clustering được áp dụng trực tiếp cho đồ thị thông qua ma trận kề hoặc ma trận Laplacian, sau đó phân tích các vector riêng để biểu diễn cấu trúc liên kết giữa các đỉnh trước khi phân cụm. Cách này đặc biệt phù hợp khi quan hệ giữa các đối tượng được mô tả bằng cạnh thay vì tọa độ trong không gian Euclid. Các phương pháp còn lại thường yêu cầu biểu diễn vector hoặc ma trận độ tương đồng theo dạng phù hợp riêng.

---

### ❓ Câu hỏi 64:
Which of the following clustering methods does not need to set the number of clusters?

**Các phương án lựa chọn:**
- [ ] A. Gaussian mixture models
- [ ] B. Spectral clustering
- [ ] C. MiniBatch k-means
- [ ] D. k-means
- [x] **E. Dirichlet process Gaussian mixture models** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. Dirichlet process Gaussian mixture models**
💡 **Giải thích chi tiết:** Dirichlet process Gaussian mixture models không cần ấn định trước số cụm, vì quá trình Dirichlet cho phép mô hình suy luận số thành phần cần thiết từ dữ liệu và phân bố trước. Ngược lại, Gaussian mixture models thông thường, spectral clustering, MiniBatch k-means và k-means đều yêu cầu xác định số cụm hoặc số thành phần trước khi huấn luyện, dù một số tiêu chí đánh giá có thể hỗ trợ lựa chọn giá trị đó.

---

### ❓ Câu hỏi 65:
True/False. In the clustering case study, the suggested re-sampling methods drove a major improvement in model performance.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Lựa chọn False phù hợp với kết quả của nghiên cứu tình huống: các phương pháp tái lấy mẫu được đề xuất không tạo ra mức cải thiện lớn về hiệu năng mô hình phân cụm. Trong học không giám sát, tái lấy mẫu có thể thay đổi phân bố hoặc độ ổn định của dữ liệu, nhưng không tự động làm các cụm tách biệt hơn. Vì vậy, tác động quan sát được là hạn chế, thay vì một bước tiến đáng kể.

---

### ❓ Câu hỏi 66:
True/False. In the context of customer profiling and the AAVAIL data set, it makes sense to first perform a dimension reduction technique like PCA before running the model through a clustering estimator.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** PCA không phải bước bắt buộc trước khi phân cụm dữ liệu AAVAIL. PCA tối đa hóa phương sai được giữ lại nhưng có thể loại bỏ tín hiệu nhỏ vẫn hữu ích để phân biệt profile, đồng thời làm giảm khả năng diễn giải đặc trưng khách hàng. Có thể phân cụm trực tiếp sau tiền xử lý; chỉ nên thêm PCA khi số chiều, nhiễu hoặc chi phí tính toán biện minh và chất lượng cụm sau đó được kiểm chứng.

---

### ❓ Câu hỏi 67:
In which situation would you most strongly consider MAE over RMSE as a regression metric?

**Các phương án lựa chọn:**
- [ ] A. where we would like to interpret the error metric in terms of the original units
- [x] **B. like predicting daily temperature where we expect a small range of values** *(Đáp án chính xác)*
- [ ] C. like predicting time to failure for a machine where we expect a long tailed distribution of values
- [ ] D. like predicting the category or topic associated with a document
- [ ] E. where we would like to interpret the error metric as a squared version of the original units

👉 **Đáp án đúng:** **B. like predicting daily temperature where we expect a small range of values**
💡 **Giải thích chi tiết:** MAE đặc biệt phù hợp khi thời gian đến hỏng có phân phối đuôi dài, vì một số sai số rất lớn có thể xuất hiện và RMSE sẽ bình phương chúng, khiến các giá trị ngoại lệ chi phối mạnh chỉ số. MAE sử dụng trị tuyệt đối nên ít nhạy với ngoại lệ hơn và phản ánh sai số trung bình theo đơn vị gốc. Việc diễn giải theo đơn vị gốc cũng là ưu điểm của MAE, nhưng không phải tình huống đặc thù nhất ở đây.

---

### ❓ Câu hỏi 68:
If you have data with a large number of features and you are sure that it will take some time to train and tune the model, which approach is LEAST likely to result in a speed improvement during grid-searching?

**Các phương án lựa chọn:**
- [x] **A. In your pipeline use variance thresholding to limit the number of features** *(Đáp án chính xác)*
- [ ] B. Use the ShuffleSplit form of cross-validation
- [ ] C. Use a randomized grid search form of cross-validation
- [ ] D. Randomly subset the data
- [ ] E. Use PCA to reduce the dimensionality of the data before training

👉 **Đáp án đúng:** **A. In your pipeline use variance thresholding to limit the number of features**
💡 **Giải thích chi tiết:** ShuffleSplit chỉ thay đổi cách tạo các tập huấn luyện và kiểm định; nếu giữ nguyên số lần chia, mô hình vẫn được huấn luyện gần như cùng số lượt nên thời gian grid search không tự giảm. Ngược lại, variance thresholding, PCA hoặc lấy mẫu dữ liệu làm giảm chi phí mỗi lần huấn luyện, còn randomized search thường đánh giá ít tổ hợp siêu tham số hơn so với grid search đầy đủ.

---

### ❓ Câu hỏi 69:
Which of the following is not an example of a variant/application of gradient descent that we have covered?

**Các phương án lựa chọn:**
- [ ] A. batch gradient descent
- [x] **B. mini-batch gradient descent** *(Đáp án chính xác)*
- [ ] C. regularized gradient descent
- [ ] D. stochastic gradient descent
- [ ] E. gradient descent applied to regression

👉 **Đáp án đúng:** **B. mini-batch gradient descent**
💡 **Giải thích chi tiết:** Batch, mini-batch và stochastic gradient descent là các biến thể được phân biệt theo số lượng mẫu dùng để tính gradient trong mỗi bước cập nhật. Gradient descent applied to regression mô tả một ứng dụng cụ thể của thuật toán. Regularized gradient descent có thể được xây dựng bằng cách thêm hạng phạt vào hàm mất mát, nhưng trong phạm vi các biến thể và ứng dụng được nêu ở đây, nó không thuộc nhóm đã đề cập.

---

### ❓ Câu hỏi 70:
What important feature of the Watson NLU API do we have to use to ensure that we can repeat an experiment in the future in a reproducible way?

**Các phương án lựa chọn:**
- [ ] A. GitHub integration
- [x] **B. Passing a version argument with each request** *(Đáp án chính xác)*
- [ ] C. Each future version of the API is guaranteed to keep the same arguments
- [ ] D. The NLU can be run locally
- [ ] E. The exchanged JSON is guaranteed to keep the same format

👉 **Đáp án đúng:** **B. Passing a version argument with each request**
💡 **Giải thích chi tiết:** Việc truyền tham số phiên bản trong mỗi yêu cầu giúp cố định phiên bản mô hình và hành vi API được sử dụng tại thời điểm thí nghiệm. Nhờ đó, các lần chạy sau có thể gọi lại đúng phiên bản, hạn chế sai lệch do mô hình, tham số hoặc kết quả thay đổi khi dịch vụ được cập nhật. GitHub chỉ hỗ trợ quản lý mã nguồn, còn việc chạy cục bộ không phải đặc tính bắt buộc của Watson NLU.

---

### ❓ Câu hỏi 71:
Processing the corpus with the provided lemmatize_document reduces the total number of tokens to what percentage of the original?

**Các phương án lựa chọn:**
- [ ] A. 10-15%
- [ ] B. 20-35%
- [x] **C. 45-50%** *(Đáp án chính xác)*
- [ ] D. 70-75%
- [ ] E. 85-95%

👉 **Đáp án đúng:** **C. 45-50%**
💡 **Giải thích chi tiết:** Lemmatization thường chỉ quy các dạng biến thể của từ về cùng một lemma, nên số token giảm vừa phải thay vì giảm mạnh như khi loại bỏ phần lớn từ hoặc câu. Trong bối cảnh corpus và hàm lemmatize_document được cung cấp, kết quả kỳ vọng còn khoảng 70–75% số token ban đầu. Tỷ lệ thực tế phụ thuộc vào thành phần corpus và quy tắc xử lý của hàm.

---

### ❓ Câu hỏi 72:
If we have a situation where a false positive is not as potentially costly as a false negative, say flagging comments for manual review based on suspected unlawful activity, which of the following is the best approach to consider?

**Các phương án lựa chọn:**
- [ ] A. Only look at the F-score of the negative class for evaluation
- [x] **B. Use recall as the evaluation metric** *(Đáp án chính xác)*
- [ ] C. Use precision as the evaluation metric
- [ ] D. Set beta to 0.5 in the F-score
- [x] **E. Set beta to 2.0 in the F-score** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. Use recall as the evaluation metric**, **E. Set beta to 2.0 in the F-score**
💡 **Giải thích chi tiết:** Khi false negative gây thiệt hại lớn hơn false positive, mô hình cần hạn chế bỏ sót các trường hợp thực sự có hoạt động bất hợp pháp, vì vậy recall là chỉ số phù hợp để ưu tiên. Trong F-beta, beta lớn hơn 1 đặt trọng số cao hơn cho recall so với precision; beta bằng 2 thể hiện rõ ưu tiên này. Ngược lại, beta bằng 0,5 sẽ thiên về precision và không phù hợp với mục tiêu đã nêu.

---

### ❓ Câu hỏi 73:
True/False. All classifiers in scikit-learn do multiclass classification out-of-the-box. These classifiers can differ in their approach, though (e.g., one-vs-all or one-vs-one).

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Phát biểu này đúng trong phạm vi các estimator phân loại chuẩn của scikit-learn: giao diện phân loại hỗ trợ trực tiếp nhãn có từ hai lớp trở lên. Với mô hình vốn nhị phân, thư viện tự phân rã bài toán; one-vs-rest huấn luyện một bộ phân loại cho mỗi lớp, còn SVC thường dùng one-vs-one cho từng cặp lớp. Vì vậy, khác biệt về chiến lược triển khai không làm mất khả năng xử lý multiclass ngoài hộp.

---

### ❓ Câu hỏi 74:
Which of the following is not an example of a generalized linear model (GLM)?

**Các phương án lựa chọn:**
- [ ] A. ANOVA
- [ ] B. Multinomial regression
- [ ] C. Poisson regression
- [x] **D. KNN regression** *(Đáp án chính xác)*
- [ ] E. Logistic regression

👉 **Đáp án đúng:** **D. KNN regression**
💡 **Giải thích chi tiết:** KNN regression không thuộc nhóm generalized linear model vì đây là phương pháp phi tham số, dự đoán giá trị dựa trên các quan sát lân cận thay vì giả định một hàm liên kết và cấu trúc tuyến tính giữa biến đáp ứng với các biến giải thích. Ngược lại, logistic, Poisson và multinomial regression sử dụng khung hồi quy tổng quát; ANOVA cũng là một trường hợp của mô hình tuyến tính với sai số Gaussian.

---

### ❓ Câu hỏi 75:
True/False. Models in the generalized linear mixed model (GLMM) family, such as multilevel models, are generally optimized using sophisticated techniques like MCMC sampling.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Phát biểu này sai vì MCMC là phương pháp lấy mẫu để suy luận Bayesian, không phải một thuật toán tối ưu hóa theo nghĩa trực tiếp. GLMM thường được ước lượng bằng maximum likelihood kết hợp với xấp xỉ Laplace hoặc adaptive Gaussian quadrature; MCMC là một lựa chọn nâng cao khi xây dựng mô hình Bayesian. Do đó, không thể nói MCMC là kỹ thuật được sử dụng một cách generally để tối ưu mọi GLMM.

---

### ❓ Câu hỏi 76:
When you use Watson Services like Watson Natural Language Understanding via the Python SDK, what are the three items that need to be saved? These items are generally saved on a local machine and included in scripts and notebooks as imported variables.

**Các phương án lựa chọn:**
- [ ] A. service version, service API key, service JSON map
- [x] **B. service URL, service JSON map, service API key** *(Đáp án chính xác)*
- [ ] C. service API key, service version, service URL
- [ ] D. service version, service IAMAuthenticator, service URL
- [ ] E. service API key, service URL, service IAMAuthenticator

👉 **Đáp án đúng:** **B. service URL, service JSON map, service API key**
💡 **Giải thích chi tiết:** Ba thông tin cấu hình cần lưu là API key, phiên bản dịch vụ và URL của dịch vụ Watson. API key dùng để xác thực, version xác định phiên bản API được gọi, còn URL chỉ ra điểm cuối phục vụ yêu cầu. IAMAuthenticator là đối tượng được khởi tạo trong mã từ API key, không phải một thông tin cấu hình độc lập cần lưu thay cho API key; service JSON map cũng không phải thành phần bắt buộc.

---

### ❓ Câu hỏi 77:
Which of the following does not describe a feature of the Watson Natural Language Understanding service?

**Các phương án lựa chọn:**
- [x] **A. Perform document classification tasks using a custom model built from text** *(Đáp án chính xác)*
- [ ] B. Identify high-level concepts that aren't necessarily directly referenced in the text
- [ ] C. Find people, places, events, and other types of entities mentioned in your content
- [ ] D. Recognize when two entities are related, and identify the type of relation
- [ ] E. Analyze the sentiment toward specific target phrases and the sentiment of the document as a whole

👉 **Đáp án đúng:** **A. Perform document classification tasks using a custom model built from text**
💡 **Giải thích chi tiết:** Cụm “Perform document classification tasks using a custom model built from text” mô tả việc huấn luyện và sử dụng mô hình phân loại tùy biến, gắn với Watson Natural Language Classifier hơn là năng lực phân tích dựng sẵn của Watson NLU. Ngược lại, NLU hỗ trợ trích xuất concept và entity, phát hiện relation, cùng sentiment ở cấp tài liệu hoặc target phrase. Vì vậy, lựa chọn đầu tiên không thuộc nhóm tính năng của NLU.

---

### ❓ Câu hỏi 78:
Which of the following is not an example of a relevant question when tuning a NLP classification pipeline?

**Các phương án lựa chọn:**
- [ ] A. Should I use bag-of-words or a vector embedding representation?
- [ ] B. Which stop words do I include?
- [ ] C. Which n-grams do I include?
- [ ] D. Should I use a TF or a tf-idf transformation?
- [x] **E. Should I use RMSE or MAE as an evaluation metric?** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. Should I use RMSE or MAE as an evaluation metric?**
💡 **Giải thích chi tiết:** Các lựa chọn về bag-of-words, vector embedding, stop words, n-grams và TF/tf-idf đều liên quan trực tiếp đến việc biểu diễn và tiền xử lý văn bản trong một pipeline phân loại NLP. Ngược lại, RMSE và MAE đo sai số theo giá trị liên tục, phù hợp hơn với bài toán hồi quy; bài toán phân loại thường dùng accuracy, precision, recall hoặc F1-score. Vì vậy, lựa chọn thứ năm không phù hợp trong bối cảnh này.

---

### ❓ Câu hỏi 79:
Which of the following models is not an example of an ensemble approach to learning?

**Các phương án lựa chọn:**
- [x] **A. Decision tree** *(Đáp án chính xác)*
- [ ] B. Random forest
- [ ] C. Boosting
- [ ] D. Model stacking
- [ ] E. Gradient boosting

👉 **Đáp án đúng:** **A. Decision tree**
💡 **Giải thích chi tiết:** Trong danh sách này, Decision tree chỉ tạo một cây quyết định duy nhất từ dữ liệu huấn luyện, nên là mô hình đơn lẻ thay vì ensemble. Random forest dùng bagging để tổng hợp nhiều cây; boosting và gradient boosting xây dựng tuần tự các bộ học yếu, còn model stacking kết hợp dự đoán của nhiều mô hình qua một mô hình meta. Vì vậy, lựa chọn này không đáp ứng cơ chế kết hợp nhiều mô hình.

---

### ❓ Câu hỏi 80:
Which of the following neural network architectures are most commonly used for time-series analysis?

**Các phương án lựa chọn:**
- [ ] A. Multi-layer perceptron
- [x] **B. Recurrent neural networks** *(Đáp án chính xác)*
- [ ] C. Transfer learning
- [x] **D. Convolutional neural network** *(Đáp án chính xác)*
- [ ] E. Autoencoders

👉 **Đáp án đúng:** **B. Recurrent neural networks**, **D. Convolutional neural network**
💡 **Giải thích chi tiết:** Với bài toán chuỗi thời gian, Recurrent neural networks (RNN) là lựa chọn phổ biến vì trạng thái ẩn được truyền qua các bước, giúp mã hóa phụ thuộc tuần tự. Convolutional neural network (CNN) cũng thường dùng nhờ các bộ lọc tích chập khai thác mẫu cục bộ, xu hướng và chu kỳ trên cửa sổ thời gian; vì vậy hai lựa chọn này phù hợp. Transfer learning là chiến lược huấn luyện, còn MLP và autoencoder không mặc nhiên mô hình hóa thứ tự thời gian.

---

### ❓ Câu hỏi 81:
True/False. All images must be downloaded and saved locally before you can call classify from the connected IBM Watson Visual Recognition service.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Nhận định này sai vì IBM Watson Visual Recognition có thể nhận ảnh thông qua nhiều cách, chẳng hạn dữ liệu nhị phân, tệp cục bộ hoặc URL tùy theo giao diện và phiên bản dịch vụ được sử dụng. Do đó, ứng dụng không bắt buộc phải tải toàn bộ ảnh về và lưu cục bộ trước khi gọi thao tác classify; việc cung cấp ảnh qua URL hợp lệ cũng có thể đủ.

---

### ❓ Câu hỏi 82:
A simple CNN that runs on all ten classes and uses all of the data obtains approximately what level of accuracy?

**Các phương án lựa chọn:**
- [ ] A. 62-77%
- [ ] B. 78-83%
- [ ] C. 84-89%
- [x] **D. 90-94%** *(Đáp án chính xác)*
- [ ] E. 95-99%

👉 **Đáp án đúng:** **D. 90-94%**
💡 **Giải thích chi tiết:** CNN đơn giản chạy trên cả mười lớp và dùng toàn bộ dữ liệu đạt khoảng 90–94% accuracy, tương ứng lựa chọn thứ tư. Các lớp tích chập học cạnh, nét và cấu trúc cục bộ, còn chia sẻ trọng số giúp nhận dạng biến thiên vị trí. Mức này cao hơn dự đoán ngẫu nhiên nhưng chưa đạt 95–99% vì kiến trúc đơn giản vẫn nhầm các mẫu nhiễu hoặc các lớp có đặc điểm gần nhau.

---

### ❓ Câu hỏi 83:
True/False: Bagging and boosting ensemble methods both use only decision trees as base classifiers. The difference is in the bias and variance of the individual trees.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Phát biểu này sai vì bagging và boosting không bị giới hạn chỉ ở cây quyết định; cả hai có thể kết hợp nhiều loại bộ học cơ sở. Bagging huấn luyện các mô hình độc lập trên các mẫu bootstrap, chủ yếu làm giảm phương sai, còn boosting huấn luyện tuần tự để tập trung vào lỗi trước đó và thường làm giảm độ chệch. Vì vậy, khác biệt cốt lõi không chỉ nằm ở độ chệch và phương sai của từng cây.

---

### ❓ Câu hỏi 84:
True/False. A decision tree classifier is useful as a model for the AAVAIL subscriber churn data.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Mệnh đề về việc dùng decision tree classifier cho dữ liệu churn của thuê bao AAVAIL là đúng. Bài toán này thường dự đoán biến mục tiêu nhị phân, chẳng hạn rời bỏ hoặc tiếp tục sử dụng, từ nhiều thuộc tính thuê bao; cây quyết định tạo các nút phân tách theo điều kiện trên những thuộc tính đó. Các nhánh và luật if–then giúp mô hình dễ diễn giải, dù vẫn cần kiểm định để hạn chế quá khớp.

---

### ❓ Câu hỏi 85:
Which of the following was not discussed as a tunable parameter of a neural network?

**Các phương án lựa chọn:**
- [x] **A. Hardware availability** *(Đáp án chính xác)*
- [ ] B. Activation functions: sigmoid, tanh, softmax, ReLU, leaky ReLU
- [ ] C. Regularization techniques: weight decay, early stopping, dropout
- [ ] D. Training method: Loss function, learning rate, batch size, number of epochs
- [ ] E. Structure: the number of hidden layers, the number of nodes in each layer

👉 **Đáp án đúng:** **A. Hardware availability**
💡 **Giải thích chi tiết:** “Hardware availability” không phải là tham số có thể điều chỉnh trực tiếp trong thiết kế hoặc huấn luyện mạng nơ-ron; đó là ràng buộc về tài nguyên tính toán. Ngược lại, các lựa chọn về hàm kích hoạt, regularization, phương pháp huấn luyện và cấu trúc mạng là những siêu tham số hoặc cấu hình có thể thay đổi để kiểm soát khả năng học, mức độ khái quát và chi phí tính toán.

---

### ❓ Câu hỏi 86:
True/False. Transfer learning is a recent advancement to come out of the field of reinforcement learning.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Phát biểu này sai vì transfer learning không xuất phát riêng từ lĩnh vực reinforcement learning. Đây là kỹ thuật học máy trong đó mô hình tận dụng biểu diễn hoặc kiến thức đã học từ một nhiệm vụ hay miền dữ liệu để cải thiện hiệu quả trên nhiệm vụ mới, và đã được phát triển rộng rãi trong supervised learning, deep learning cũng như computer vision. Reinforcement learning có thể sử dụng transfer learning, nhưng không phải là nguồn gốc duy nhất của kỹ thuật này.

---

### ❓ Câu hỏi 87:
When training a custom classifier in Watson Visual Recognition, the negative images should be:

**Các phương án lựa chọn:**
- [x] **A. As visually similar as possible to the positive images** *(Đáp án chính xác)*
- [ ] B. Background images without the positive images
- [ ] C. As random as possible to establish a background
- [ ] D. Randomly generated from the positive images
- [ ] E. Visually distinct from the positive images

👉 **Đáp án đúng:** **A. As visually similar as possible to the positive images**
💡 **Giải thích chi tiết:** Trong Watson Visual Recognition, lựa chọn “Background images without the positive images” mô tả ảnh âm: chúng cung cấp nền và bối cảnh nhưng không chứa đối tượng thuộc lớp dương. Nếu các ảnh âm có điều kiện chụp tương tự ảnh dương, mô hình sẽ học ranh giới dựa trên đặc trưng của đối tượng thay vì nhận diện sai nền, ánh sáng hoặc bố cục. Các lựa chọn tạo ảnh ngẫu nhiên hoặc hoàn toàn khác biệt không bảo đảm mục tiêu này.

---

### ❓ Câu hỏi 88:
True/False. The Watson Visual Recognition service can only be accessed using an API key via Python or curl.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Phát biểu này sai vì Watson Visual Recognition không bị giới hạn ở Python hoặc curl. Đây là một dịch vụ REST, nên có thể được gọi từ bất kỳ ngôn ngữ hay công cụ nào hỗ trợ HTTP; Python và curl chỉ là hai cách minh họa phổ biến. Ngoài ra, cơ chế xác thực có thể sử dụng API key trực tiếp hoặc mã thông báo IAM được tạo từ API key, tùy cấu hình dịch vụ.

---

### ❓ Câu hỏi 89:
Which of the following use cases is the least appropriate use case for a convolutional neural network?

**Các phương án lựa chọn:**
- [ ] A. Image classification
- [x] **B. Image retrieval** *(Đáp án chính xác)*
- [ ] C. Image composition
- [ ] D. Object detection
- [ ] E. Image segmentation

👉 **Đáp án đúng:** **B. Image retrieval**
💡 **Giải thích chi tiết:** Trong các lựa chọn nêu trên, image composition là trường hợp kém phù hợp nhất với CNN vì mục tiêu cốt lõi là tạo hoặc tổng hợp nội dung ảnh, không chỉ trích xuất cấu trúc không gian. CNN rất tự nhiên cho image classification, object detection và image segmentation; với image retrieval, đặc trưng tích chập có thể làm vector biểu diễn để tìm ảnh tương tự, còn composition thường cần kiến trúc sinh như GAN, VAE hoặc diffusion, dù CNN có thể là một thành phần.

---

### ❓ Câu hỏi 90:
True/False. A typical convolutional neural network is constructed using a combination of convolutional, pooling and dense layers.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Cụm từ “combination of convolutional, pooling and dense layers” mô tả cấu trúc CNN kinh điển: convolution học các đặc trưng cục bộ qua các bộ lọc, pooling giảm kích thước biểu diễn và dense ánh xạ đặc trưng sang đầu ra dự đoán. Vì thế, lựa chọn True phù hợp với kiến trúc điển hình được nêu trong câu, dù các CNN hiện đại đôi khi thay pooling hoặc dùng global average pooling thay cho dense.

---

### ❓ Câu hỏi 91:
True/False. If we continue to add GPUs or other computational resources, the time it takes to train a model will always continue to decrease.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Mệnh đề chứa từ “always” nên sai: việc bổ sung GPU hoặc tài nguyên tính toán không bảo đảm thời gian huấn luyện luôn tiếp tục giảm. Mức tăng tốc phụ thuộc vào khả năng song song hóa của thuật toán, băng thông truyền dữ liệu, chi phí đồng bộ giữa các thiết bị và các nút thắt I/O. Khi các giới hạn này chi phối, thêm phần cứng có thể đem lại lợi ích biên rất nhỏ hoặc thậm chí làm tăng chi phí quản lý.

---

### ❓ Câu hỏi 92:
True/False. It is reasonable to think of the commands in a Dockerfile as a step-by-step recipe on how to build up a Docker image.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Cụm “step-by-step recipe” phù hợp vì Dockerfile quy định chuỗi chỉ thị theo thứ tự để tạo image, từ chọn image nền, cài phần mềm đến sao chép mã nguồn. Trong quá trình build, mỗi chỉ thị có thể tạo một filesystem layer và kết quả của bước trước trở thành đầu vào cho bước sau; cơ chế cache cũng dựa trên trình tự này. Các chỉ thị như RUN được thực thi lúc build, không phải mặc định khi container khởi động.

---

### ❓ Câu hỏi 93:
What are the two steps that must be carried out if you want to iterate locally on a model then deploy it to the Watson Machine Learning (WML) service?

**Các phương án lựa chọn:**
- [ ] A. Provision a WML service & Dockerize your model
- [ ] B. Create a Python virtual environment & Dockerize your model
- [ ] C. Provision cloud storage & Provision a WML service
- [x] **D. Provision a WML service & create a Python virtual environment** *(Đáp án chính xác)*
- [ ] E. Dockerize your model & Provision cloud storage

👉 **Đáp án đúng:** **D. Provision a WML service & create a Python virtual environment**
💡 **Giải thích chi tiết:** Quy trình này cần một dịch vụ WML đã được cấp phát để tiếp nhận và triển khai mô hình, đồng thời cần môi trường Python ảo nhằm phát triển, kiểm thử và lặp lại mô hình cục bộ với các thư viện phù hợp. Docker không bắt buộc trong quy trình cơ bản này, còn cloud storage chỉ cần khi có yêu cầu lưu trữ dữ liệu hoặc tài sản mô hình bên ngoài.

---

### ❓ Câu hỏi 94:
Which of the following lists contains one or more references to technologies that are not specific Python packages used to speed up and improve the performance of Python code?

**Các phương án lựa chọn:**
- [ ] A. PyCUDA, Cython
- [ ] B. multiprocessing, mpi4py
- [x] **C. subprocess, symmetric multiprocessing** *(Đáp án chính xác)*
- [ ] D. threading, ipyparallel

👉 **Đáp án đúng:** **C. subprocess, symmetric multiprocessing**
💡 **Giải thích chi tiết:** Danh sách thứ ba chứa các công nghệ không phải đều là package Python chuyên biệt để tăng tốc mã nguồn. subprocess là mô-đun chuẩn dùng để tạo và quản lý tiến trình con, còn symmetric multiprocessing (SMP) là kiến trúc phần cứng hoặc mô hình xử lý song song, không phải một package Python cụ thể. Ngược lại, PyCUDA, Cython, mpi4py và ipyparallel đều là thư viện hoặc mô-đun Python phục vụ tính toán hay thực thi song song.

---

### ❓ Câu hỏi 95:
A Spark cluster is generally managed using a Docker container and a YAML file.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Phát biểu này sai vì một Spark cluster thường được quản lý bởi cluster manager như Spark Standalone, YARN, Kubernetes hoặc Mesos. Docker container và tệp YAML có thể được sử dụng trong một số mô hình triển khai, đặc biệt khi chạy Spark trên Kubernetes, nhưng chúng không phải cơ chế quản lý mặc định hay khái quát cho mọi Spark cluster. Do đó, không thể xem Docker và YAML là cách quản lý chung của Spark.

---

### ❓ Câu hỏi 96:
Which of the following is least likely to be a use case for Docker containers?

**Các phương án lựa chọn:**
- [ ] A. Microservices: many loosely coupled and independently deployable services
- [ ] B. DevOps/Data Engineers use containers as a common platform for many teams
- [ ] C. Avoid install overhead with a Spark environment
- [ ] D. Hybrid, multi-cloud portability for a machine learning model
- [x] **E. Replacement for a standard virtual machine** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. Replacement for a standard virtual machine**
💡 **Giải thích chi tiết:** Docker containers phù hợp để đóng gói microservices, chuẩn hóa môi trường dùng chung cho nhóm DevOps hoặc Data Engineering, giảm công sức cài đặt Spark và hỗ trợ khả năng di chuyển mô hình giữa các đám mây. Tuy nhiên, container chia sẻ kernel của hệ điều hành máy chủ và cung cấp mức cô lập nhẹ hơn, nên không phải sự thay thế tương đương cho máy ảo tiêu chuẩn vốn mô phỏng một hệ điều hành đầy đủ.

---

### ❓ Câu hỏi 97:
Docker images are the basis of containers. It is possible to pull an image from the registry and ask the Docker client to run a container based on that image. Some images are official while many others are user defined.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Mệnh đề này đúng: Docker image là khuôn mẫu bất biến chứa filesystem, mã ứng dụng, thư viện và siêu dữ liệu cần thiết để tạo container. Docker client có thể kéo image từ registry như Docker Hub, sau đó dùng image làm nguồn cho container mới. Image chính thức thường do Docker hoặc nhà cung cấp duy trì, còn image do người dùng xây dựng có thể được phân phối qua registry.

---

### ❓ Câu hỏi 98:
What is the principal reason to create a virtual environment before creating your model locally?

**Các phương án lựa chọn:**
- [ ] A. Because all models should have their own virtual environment
- [ ] B. Because it will ensure that the most recent packages are used
- [ ] C. Because virtual environments can be containerized easily
- [ ] D. Because the Python client for Watson Machine Learning has specific dependencies
- [x] **E. Because it ensures that locally created/trained models are compatible with Watson Machine Learning** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. Because it ensures that locally created/trained models are compatible with Watson Machine Learning**
💡 **Giải thích chi tiết:** Môi trường ảo giúp cô lập và cố định các phiên bản Python cùng thư viện mà mô hình sử dụng trong quá trình phát triển hoặc huấn luyện cục bộ. Nhờ đó, các dependency có thể được kiểm soát để giảm khác biệt giữa môi trường cục bộ và Watson Machine Learning, từ đó tăng khả năng mô hình được đóng gói, tải lên và chạy tương thích. Mục tiêu chính không phải luôn dùng gói mới nhất hay chỉ phục vụ việc container hóa.

---

### ❓ Câu hỏi 99:
True/False. You may only pass a pickle file to save your model with the Watson Machine Learning library.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Mệnh đề này sai vì Watson Machine Learning không giới hạn việc lưu mô hình ở tệp pickle. Tùy framework và API sử dụng, thư viện có thể nhận đối tượng mô hình, đường dẫn đến tệp hoặc các định dạng tương ứng như mô hình scikit-learn, TensorFlow, Keras hay PyTorch. Vì vậy, pickle chỉ là một lựa chọn trong một số trường hợp, không phải yêu cầu duy nhất.

---

### ❓ Câu hỏi 100:
True/False. The Spark ML API uses DataFrames from Spark SQL. They can hold a variety of data types with different columns for storing data, including feature vectors, truth labels, and predictions.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Mệnh đề này đúng: Spark ML sử dụng DataFrame của Spark SQL làm cấu trúc dữ liệu trung tâm cho các pipeline. Một DataFrame có thể chứa nhiều cột với kiểu dữ liệu khác nhau, chẳng hạn cột văn bản đầu vào, vector đặc trưng, nhãn thực tế và giá trị dự đoán. Transformer và estimator đọc hoặc bổ sung các cột này trong các giai đoạn biến đổi, huấn luyện và suy luận.

---

### ❓ Câu hỏi 101:
Which type of recommender system is readily available in Spark machine learning?

**Các phương án lựa chọn:**
- [x] **A. Utility-based recommender systems** *(Đáp án chính xác)*
- [ ] B. Collaborative-based recommender systems
- [ ] C. Content-based recommender systems
- [ ] D. Hybrid recommender systems
- [ ] E. Demographics-based recommender systems

👉 **Đáp án đúng:** **A. Utility-based recommender systems**
💡 **Giải thích chi tiết:** Spark MLlib cung cấp trực tiếp mô hình lọc cộng tác thông qua thuật toán ALS (Alternating Least Squares). ALS học các nhân tố tiềm ẩn từ ma trận tương tác giữa người dùng và sản phẩm, chẳng hạn điểm đánh giá hoặc lịch sử lựa chọn, rồi dự đoán các mục chưa được đánh giá. Các hệ thống dựa trên nội dung, nhân khẩu học, tiện ích hoặc mô hình lai không được cung cấp như một bộ recommender chuẩn tương đương trong Spark MLlib.

---

### ❓ Câu hỏi 102:
Docker containers run a private file system that is isolated from the host and other containers. What is the suggested way to access notebooks and scripts from within the container?

**Các phương án lựa chọn:**
- [ ] A. tmpfs mount
- [ ] B. use a named pipe
- [x] **C. bind mounts** *(Đáp án chính xác)*
- [ ] D. GitHub
- [ ] E. volumes

👉 **Đáp án đúng:** **C. bind mounts**
💡 **Giải thích chi tiết:** Bind mount cho phép ánh xạ trực tiếp một thư mục trên máy chủ vào đường dẫn bên trong container, nhờ đó notebook và script có thể được chỉnh sửa trên host nhưng vẫn truy cập tức thời từ container. Cách này phù hợp với dữ liệu mã nguồn cần phát triển hoặc thử nghiệm thường xuyên. Named pipe chỉ phục vụ giao tiếp giữa tiến trình, còn tmpfs là vùng nhớ tạm; volume phù hợp hơn cho dữ liệu bền vững do Docker quản lý.

---

### ❓ Câu hỏi 103:
Which of the following is not a valid way to pass parameters to a Spark MLlib model?

**Các phương án lựa chọn:**
- [x] **A. Pass a pickle file when the model is declared** *(Đáp án chính xác)*
- [ ] B. Set the named parameters directly when the model is declared
- [ ] C. Pass a ParamMap to the .fit() method of the model
- [ ] D. Create a ParamMap, update it, then pass it to a .fit() method of the model
- [ ] E. Pass a ParamMap to the .fit() method of a pipeline

👉 **Đáp án đúng:** **A. Pass a pickle file when the model is declared**
💡 **Giải thích chi tiết:** Spark ML sử dụng các đối tượng Param và ParamMap để thiết lập siêu tham số, có thể truyền trực tiếp khi khởi tạo estimator hoặc truyền vào phương thức .fit(). Pipeline cũng hỗ trợ ParamMap để phân bổ tham số cho các stage trong quá trình huấn luyện. Tệp pickle không phải là giao diện chuẩn để truyền tham số khi khai báo mô hình, mà thường dùng cho tuần tự hóa đối tượng.

---

### ❓ Câu hỏi 104:
True/False. Spark MLlib has several estimators and transformers, but it lacks basic tooling for natural language processing (NLP) like the ability to make term frequency-inverse document frequency (TF-IDF) transformations.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Nhận định này sai vì Spark MLlib cung cấp các thành phần cơ bản cho xử lý văn bản, trong đó có Tokenizer để tách từ, HashingTF hoặc CountVectorizer để biểu diễn tần suất thuật ngữ, và IDF để tính nghịch đảo tần suất tài liệu. Việc kết hợp các transformer này tạo ra biểu diễn TF-IDF, thường được dùng làm đầu vào cho các mô hình phân loại hoặc hồi quy văn bản.

---

### ❓ Câu hỏi 105:
Which phrase most accurately reflects what is meant by the cold start problem in recommendation systems?

**Các phương án lựa chọn:**
- [ ] A. When a new user is introduced and the recommendations are made on similarities
- [ ] B. When a new item is introduced and the recommendations are made on similarities
- [ ] C. When a new user is introduced and the recommendations are made on item popularity
- [ ] D. When a new user or new item is introduced and the recommendations depend on popularity
- [x] **E. When a new user or new item is introduced and the recommendations depend on similarities** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. When a new user or new item is introduced and the recommendations depend on similarities**
💡 **Giải thích chi tiết:** Cold start xảy ra khi một người dùng mới hoặc một mặt hàng mới chưa có đủ lịch sử tương tác, khiến hệ thống khó ước lượng mức độ tương đồng và tạo gợi ý cá nhân hóa. Trong các phương án, lựa chọn này bao quát cả hai trường hợp và phản ánh đúng sự phụ thuộc của các phương pháp lọc cộng tác vào dữ liệu hành vi. Gợi ý dựa trên độ phổ biến có thể giảm tác động, nhưng không mô tả bản chất vấn đề.

---

### ❓ Câu hỏi 106:
True/False. Matrix factorization is commonly associated with collaborative filtering recommender systems.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Matrix factorization thường được dùng trong collaborative filtering bằng cách phân rã ma trận người dùng–mục thành các vectơ nhân tố ẩn. Tích vô hướng giữa vectơ của người dùng và mục giúp ước lượng điểm hoặc xác suất tương tác cho những cặp chưa quan sát. Cách này học từ mẫu hành vi của cộng đồng, khác với recommender dựa chủ yếu vào thuộc tính nội dung; vì vậy mệnh đề là đúng.

---

### ❓ Câu hỏi 107:
When you worked on the model deployment case study, which modification to the ALS algorithm had the largest effect on model performance?

**Các phương án lựa chọn:**
- [ ] A. The explicit training vs implicit training comparison
- [x] **B. The lambda or regularization parameter** *(Đáp án chính xác)*
- [ ] C. The epsilon or scale parameter
- [ ] D. The l1 vs l2 comparison

👉 **Đáp án đúng:** **B. The lambda or regularization parameter**
💡 **Giải thích chi tiết:** Trong case study, epsilon hoặc scale điều chỉnh mức độ tin cậy hay trọng số của các tương tác quan sát được trong mục tiêu ALS, đặc biệt quan trọng với dữ liệu phản hồi ngầm. Thay đổi này làm biến đổi trực tiếp đóng góp của tín hiệu huấn luyện và vì vậy gây ảnh hưởng lớn đến chất lượng dự đoán. Lambda chủ yếu kiểm soát mức phạt độ phức tạp, còn so sánh L1 và L2 không phải yếu tố chi phối chính trong cấu hình này.

---

### ❓ Câu hỏi 108:
True/False. The Spark collaborative filtering implementation is built by default for explicit feedback, but it can be used with implicit feedback just as easily.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Trong Spark, triển khai collaborative filtering bằng ALS mặc định dùng explicit feedback, trong đó giá trị quan sát thường biểu thị mức đánh giá hoặc mức độ ưa thích. Có thể sử dụng implicit feedback bằng cách đặt tham số `implicitPrefs` thành `true`; khi đó ALS diễn giải các tương tác như lượt xem, nhấp hoặc mua hàng dưới dạng tín hiệu mức độ tin cậy thay vì điểm đánh giá trực tiếp. Vì vậy, mệnh đề này được xem là đúng.

---

### ❓ Câu hỏi 109:
Your Flask application needs to perform error checking on the input when making a prediction. Which features need to be provided, at a minimum, as input given the context of this business opportunity?

**Các phương án lựa chọn:**
- [ ] A. The previous three months of data and the target month from the year before
- [x] **B. The target date and country** *(Đáp án chính xác)*
- [ ] C. At least one year of revenue data
- [ ] D. The recent number of transactions and the number of views
- [ ] E. Metadata associated with the streams

👉 **Đáp án đúng:** **B. The target date and country**
💡 **Giải thích chi tiết:** Ở mức tối thiểu, ứng dụng cần nhận ngày mục tiêu và quốc gia để xác định đúng phạm vi dự đoán trong bối cảnh dữ liệu theo thời gian và địa lý. Flask có thể kiểm tra hai trường này về sự tồn tại, kiểu dữ liệu và giá trị hợp lệ trước khi gọi mô hình. Các lựa chọn còn lại đòi hỏi dữ liệu lịch sử hoặc biến bổ sung, không phải đầu vào tối thiểu được nêu trong ngữ cảnh.

---

### ❓ Câu hỏi 110:
True/False. Unit testing and novelty detection provide an automated mechanism to monitor model performance.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False.

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Phát biểu này không chính xác vì unit testing chủ yếu kiểm tra tính đúng đắn của mã nguồn, quy trình xử lý và các hành vi kỳ vọng, thường trước hoặc ngoài lúc triển khai. Novelty detection phát hiện dữ liệu đầu vào lệch khỏi phân phối đã biết, nhưng không trực tiếp đo độ chính xác, độ trễ hay các chỉ số hiệu năng của mô hình trên dữ liệu thực tế; cần cơ chế giám sát riêng để đánh giá các chỉ số đó.

---

### ❓ Câu hỏi 111:
To move through the AI enterprise workflow quickly, we used the concept of workflow templates. Which of the following aspects of the template contributes the least to the reusability of these templates?

**Các phương án lựa chọn:**
- [ ] A. When they are used with a version control system
- [x] **B. Ensuring that the model exists as a separate Python module to be called by Flask** *(Đáp án chính xác)*
- [ ] C. Having an HTML endpoint for the Flask app to create dashboards
- [ ] D. Using a template for a unit test suite
- [ ] E. Ensuring that data ingestion and data visualization code exists as modules or scripts

👉 **Đáp án đúng:** **B. Ensuring that the model exists as a separate Python module to be called by Flask**
💡 **Giải thích chi tiết:** Một endpoint HTML phục vụ dashboard chủ yếu đáp ứng nhu cầu giao diện và trình bày của một ứng dụng Flask cụ thể, nên ít làm tăng khả năng tái sử dụng cốt lõi của workflow template. Ngược lại, quản lý phiên bản, tách mô hình thành module, chuẩn hóa kiểm thử và phân tách ingestion với visualization giúp các thành phần được gọi lại, kiểm tra và thay thế trong nhiều dự án. Vì vậy, yếu tố giao diện dashboard có tính đặc thù cao hơn.

---

### ❓ Câu hỏi 112:
Which of the following was not mentioned as a reason to bundle unit tests with a deployed model?

**Các phương án lựa chọn:**
- [ ] A. promotes code quality
- [x] **B. regression tests** *(Đáp án chính xác)*
- [ ] C. they perform the workflow feedback loops
- [ ] D. automate performance monitoring tasks
- [ ] E. can be readily integrated into CI/CD pipelines

👉 **Đáp án đúng:** **B. regression tests**
💡 **Giải thích chi tiết:** Unit tests đi kèm mô hình triển khai nhằm hỗ trợ chất lượng mã nguồn, kiểm thử hồi quy, tự động hóa một số tác vụ giám sát và tích hợp thuận tiện vào quy trình CI/CD. Cụm mô tả việc “perform the workflow feedback loops” không phải lý do chuẩn thường được nêu cho việc đóng gói unit test với mô hình. Vòng phản hồi quy trình thuộc cơ chế vận hành hoặc giám sát rộng hơn, không phải chức năng cốt lõi của unit test.

---

### ❓ Câu hỏi 113:
True/False. When logging for the predict endpoint, runtime is considered an optional feature to be monitored.

**Các phương án lựa chọn:**
- [x] **A. True** *(Đáp án chính xác)*
- [ ] B. False

👉 **Đáp án đúng:** **A. True**
💡 **Giải thích chi tiết:** Runtime, thường được biểu diễn qua thời gian thực thi hoặc độ trễ của yêu cầu, có thể được ghi nhận để theo dõi hiệu năng của predict endpoint nhưng không bắt buộc trong mọi cấu hình giám sát. Hệ thống vẫn có thể tập trung vào dữ liệu đầu vào, đầu ra và kết quả dự đoán mà không ghi runtime. Vì vậy, runtime được xem là một đặc tính tùy chọn.

---

### ❓ Câu hỏi 114:
To pass a query to an API endpoint that has been set up to run inside a Docker container, which of the following best describes the formats that have been used in the presented deployment workflows?

**Các phương án lựa chọn:**
- [ ] A. numpy ndarray, pandas DataFrame
- [x] **B. JSON** *(Đáp án chính xác)*
- [ ] C. JSON, flatfiles
- [ ] D. YAML
- [ ] E. All of the above

👉 **Đáp án đúng:** **B. JSON**
💡 **Giải thích chi tiết:** Trong các quy trình triển khai được mô tả, dữ liệu truy vấn tới endpoint thường được truyền dưới dạng JSON hoặc thông qua các tệp phẳng (flat files), tùy cách đóng gói và đọc dữ liệu của ứng dụng trong container. NumPy ndarray và pandas DataFrame là cấu trúc dữ liệu nội bộ, không phải định dạng truyền qua API; YAML thường phục vụ cấu hình triển khai hơn là payload truy vấn.

---

### ❓ Câu hỏi 115:
In the context of the AI workflow presented in these materials, which of the following is not an example of a valid feedback loop?

**Các phương án lựa chọn:**
- [ ] A. Trying different data transformations on a given model
- [ ] B. Returning to the data collection stage from transformations to reduce the number of transforms
- [x] **C. Performing EDA on the data after a model has been deployed and data have been logged** *(Đáp án chính xác)*
- [ ] D. Moving from the business opportunity and data collection to model iteration
- [ ] E. Returning to discuss the business opportunity after a model has been deployed

👉 **Đáp án đúng:** **C. Performing EDA on the data after a model has been deployed and data have been logged**
💡 **Giải thích chi tiết:** Lựa chọn thứ tư, “Moving from the business opportunity and data collection to model iteration”, mô tả một hướng tiến triển thông thường của quy trình, không phải quay lại giai đoạn trước để điều chỉnh dựa trên kết quả mới. Ngược lại, các lựa chọn khác đều tạo vòng phản hồi: thử lại biến đổi, bổ sung hoặc rà soát dữ liệu, phân tích dữ liệu sau triển khai, hoặc cập nhật cơ hội kinh doanh từ kết quả vận hành.

---

### ❓ Câu hỏi 116:
True/False. It is critical in machine learning model deployment workflows to ensure close to 100% test coverage before production.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Mức độ bao phủ kiểm thử gần 100% không phải điều kiện bắt buộc cho mọi quy trình triển khai mô hình học máy. Coverage chỉ phản ánh phần mã hoặc nhánh đã được thực thi, không bảo đảm dữ liệu kiểm thử đại diện, mô hình tổng quát tốt hay hệ thống vận hành an toàn; vì vậy cần ưu tiên các kiểm thử rủi ro cao, kiểm tra dữ liệu, hiệu năng và giám sát sau triển khai.

---

### ❓ Câu hỏi 117:
Common sources of performance drift include:

**Các phương án lựa chọn:**
- [ ] A. Changes in customer demographics or user behavior after a model is trained
- [ ] B. Incomplete, incorrect, or unbalanced training data
- [ ] C. Changes in versions of libraries or modules used in models
- [x] **D. All of the above** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. All of the above**
💡 **Giải thích chi tiết:** Hiện tượng performance drift có thể phát sinh từ nhiều nguyên nhân đồng thời. Phân phối dữ liệu đầu vào thay đổi khi nhân khẩu học hoặc hành vi người dùng biến động; dữ liệu huấn luyện thiếu, sai hoặc mất cân bằng làm suy giảm khả năng tổng quát; còn thay đổi phiên bản thư viện có thể ảnh hưởng đến phép tính, tiền xử lý hoặc hành vi mô hình. Vì vậy, lựa chọn tổng hợp bao quát cả ba nguồn này.

---

### ❓ Câu hỏi 118:
Which list contains one or more elements that were presented as non-essential when creating a logging system for monitoring the performance of a deployed machine learning model?

**Các phương án lựa chọn:**
- [x] **A. request_type, input data** *(Đáp án chính xác)*
- [ ] B. model_version_number, timestamp
- [ ] C. predictions/recommendations, timestamp
- [ ] D. input_data_summary, runtime

👉 **Đáp án đúng:** **A. request_type, input data**
💡 **Giải thích chi tiết:** Trong thiết kế logging tối giản được nêu, model version number và timestamp được xem là siêu dữ liệu bổ sung, không phải thành phần cốt lõi để ghi nhận đầu vào hoặc đầu ra của mô hình. Ngược lại, request type, input data và predictions/recommendations trực tiếp mô tả hoạt động dự đoán, còn input data summary hoặc runtime có thể phục vụ các mục tiêu giám sát mở rộng như hiệu năng và phân tích vận hành.

---

### ❓ Câu hỏi 119:
Model accuracy metrics such as precision, recall and F1 scores provide objective evidence of fairness.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Precision, recall và F1 chủ yếu đo hiệu năng dự đoán, không trực tiếp xác định mô hình có công bằng hay không. Một mô hình có thể đạt các giá trị tổng thể cao nhưng vẫn tạo ra chênh lệch lớn giữa các nhóm về tỷ lệ sai, cơ hội được dự đoán đúng hoặc tỷ lệ dương tính giả. Đánh giá công bằng cần phân tích theo nhóm và sử dụng các tiêu chí phù hợp như equalized odds hoặc demographic parity.

---

### ❓ Câu hỏi 120:
What is the purpose of Minikube in the context of Kubernetes?

**Các phương án lựa chọn:**
- [ ] A. It deploys a Kubernetes cluster to a remote service based on a specified YAML file
- [x] **B. It launches a Kubernetes cluster locally within a virtual machine or directly on the host** *(Đáp án chính xác)*
- [ ] C. It is used through a command line interface to interact with a Kubernetes cluster
- [ ] D. It allows you to work with multiple Docker containers as if they were a single application
- [ ] E. It is the management layer for a Kubernetes cluster

👉 **Đáp án đúng:** **B. It launches a Kubernetes cluster locally within a virtual machine or directly on the host**
💡 **Giải thích chi tiết:** Minikube tạo và chạy một cụm Kubernetes đơn nút trên máy cục bộ, thường bên trong máy ảo hoặc trực tiếp trên hệ điều hành máy chủ, tùy trình điều khiển được cấu hình. Công cụ này phù hợp cho học tập, phát triển và kiểm thử mà không cần triển khai cụm trên dịch vụ từ xa. Giao diện dòng lệnh, Docker Compose và lớp quản trị cụm là các khái niệm hoặc công cụ khác, không phải mục đích chính của Minikube.

---

### ❓ Câu hỏi 121:
Which of the following are three services provided by IBM Watson OpenScale?

**Các phương án lựa chọn:**
- [ ] A. Automatic CSS-HTML Generation, Hyperparameter Tuning, Performance Metrics
- [ ] B. Compliance, Cross-Regional Availability, Automatic Backup
- [x] **C. Drift Monitoring, Fairness, Explainability** *(Đáp án chính xác)*
- [ ] D. General Artificial Intelligence, Time Travel, World Domination

👉 **Đáp án đúng:** **C. Drift Monitoring, Fairness, Explainability**
💡 **Giải thích chi tiết:** IBM Watson OpenScale cung cấp các khả năng giám sát và quản trị mô hình trong môi trường vận hành. Drift Monitoring phát hiện sự thay đổi của dữ liệu hoặc hiệu năng theo thời gian; Fairness đánh giá và theo dõi thiên lệch giữa các nhóm; Explainability hỗ trợ làm rõ các yếu tố ảnh hưởng đến dự đoán của mô hình. Các lựa chọn khác nêu những chức năng không thuộc bộ dịch vụ cốt lõi này.

---

### ❓ Câu hỏi 122:
True/False. IBM Watson OpenScale only works with models that have been built on, and deployed by, IBM Watson Studio.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** IBM Watson OpenScale không bị giới hạn ở các mô hình được xây dựng hoặc triển khai bằng IBM Watson Studio. Dịch vụ này có thể giám sát và đánh giá mô hình từ nhiều framework, nền tảng và môi trường triển khai khác nhau, bao gồm cả mô hình bên ngoài hệ sinh thái IBM. Vì vậy, mệnh đề khẳng định phạm vi sử dụng chỉ giới hạn trong Watson Studio là sai.

---

### ❓ Câu hỏi 123:
What is Port Forwarding in Docker?

**Các phương án lựa chọn:**
- [ ] A. The process of creating a data file on the local computer that persists after the container is closed
- [ ] B. Sending one container to multiple nodes on a multicloud environment
- [x] **C. Allowing data to be passed in and out of a Docker container and controlling which applications can do this** *(Đáp án chính xác)*
- [ ] D. Building one Docker image using another Docker image as a template

👉 **Đáp án đúng:** **C. Allowing data to be passed in and out of a Docker container and controlling which applications can do this**
💡 **Giải thích chi tiết:** Port forwarding trong Docker ánh xạ một cổng trên máy chủ với một cổng bên trong container, nhờ đó lưu lượng mạng từ bên ngoài có thể đi vào hoặc đi ra qua cổng được công bố. Cơ chế này cũng giới hạn dịch vụ nào có thể truy cập dựa trên các cổng được cấu hình. Các lựa chọn khác lần lượt mô tả volume, triển khai đa nút và kế thừa image.

---

### ❓ Câu hỏi 124:
True/False. The date and time of a transaction should never be logged because this will only reflect past transactions and is not relevant to the performance of predictions on an ongoing basis.

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Ngày và giờ giao dịch có thể tạo ra các đặc trưng như mùa vụ, ngày trong tuần, giờ cao điểm và xu hướng thay đổi hành vi. Những tín hiệu này thường hữu ích khi dự đoán giao dịch tương lai, miễn là mô hình chỉ dùng thông tin đã có tại thời điểm dự đoán. Do đó, khẳng định “never be logged” là sai; điều cần kiểm soát là rò rỉ dữ liệu và cách mã hóa thời gian.

---

### ❓ Câu hỏi 125:
What is the purpose of kubectl in Kubernetes?

**Các phương án lựa chọn:**
- [ ] A. Automatic logging of requests and responses
- [ ] B. A tool that makes it easy to run a single-node cluster locally
- [ ] C. The primary node agent on each node, responsible for the processes running on that machine
- [x] **D. The CLI for communicating with the Kubernetes cluster** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. The CLI for communicating with the Kubernetes cluster**
💡 **Giải thích chi tiết:** kubectl là giao diện dòng lệnh dùng để gửi yêu cầu tới Kubernetes API server, qua đó người dùng có thể triển khai tài nguyên, xem trạng thái và quản lý workload trong cluster. Công cụ này không tự tạo cluster cục bộ; chức năng đó thuộc các công cụ như Minikube. Nó cũng không phải kubelet, thành phần chạy trên từng node để quản lý các Pod.

---

### ❓ Câu hỏi 126:
True/False. A Kubernetes Pod can contain multiple Kubernetes Deployments

**Các phương án lựa chọn:**
- [ ] A. True
- [x] **B. False** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **B. False**
💡 **Giải thích chi tiết:** Một Pod Kubernetes chứa một hoặc nhiều container cùng chia sẻ network namespace và storage, không chứa các đối tượng Deployment. Deployment là tài nguyên cấp cao dùng để quản lý ReplicaSet và duy trì số lượng Pod theo trạng thái mong muốn. Vì vậy, nhiều Deployment có thể cùng tạo hoặc quản lý các Pod khác nhau, nhưng bản thân một Pod không thể chứa nhiều Deployment.

---

### ❓ Câu hỏi 127:
AAVAIL Management has described its needs to you in the language of business. How would you describe this project in the language of data science?

**Các phương án lựa chọn:**
- [ ] A. Recommender system
- [ ] B. B Testing
- [ ] C. Dimensionality Reduction
- [ ] D. Regression Analysis
- [x] **E. Unsupervised Learning** *(Đáp án chính xác)*
- [ ] F. Classification Analysis

👉 **Đáp án đúng:** **E. Unsupervised Learning**
💡 **Giải thích chi tiết:** Bài toán của AAVAIL được mô hình hóa phù hợp như một bài toán phân loại, trong đó hệ thống dự đoán khách hàng thuộc vào một nhóm hoặc nhãn đã xác định, chẳng hạn tiếp tục sử dụng hay rời bỏ dịch vụ. Classification Analysis khác với hồi quy, vốn dự đoán giá trị số liên tục, và học không giám sát, vốn tìm cấu trúc khi dữ liệu không có nhãn mục tiêu.

---

### ❓ Câu hỏi 128:
When you compiled the JSON files into a single DataFrame or NumPy array, about how many days did the entire range of dates span?

**Các phương án lựa chọn:**
- [ ] A. 400
- [ ] B. 450
- [x] **C. 500** *(Đáp án chính xác)*
- [ ] D. 600
- [ ] E. 650

👉 **Đáp án đúng:** **C. 500**
💡 **Giải thích chi tiết:** Sau khi gộp các tệp JSON thành một DataFrame hoặc mảng NumPy, khoảng thời gian từ ngày sớm nhất đến ngày muộn nhất trong dữ liệu kéo dài xấp xỉ 600 ngày. Con số này mô tả toàn bộ phạm vi lịch, không phải số lượng bản ghi hay số ngày có dữ liệu thực tế; vì vậy các lựa chọn 400, 450, 500 và 650 không phù hợp với khoảng quan sát đã cho.

---

### ❓ Câu hỏi 129:
Which country had the most total revenue when you summed across all purchases?

**Các phương án lựa chọn:**
- [x] **A. Singapore** *(Đáp án chính xác)*
- [ ] B. United Kingdom
- [ ] C. USA
- [ ] D. EIRE
- [ ] E. Germany

👉 **Đáp án đúng:** **A. Singapore**
💡 **Giải thích chi tiết:** Khi cộng doanh thu của tất cả giao dịch theo từng quốc gia, United Kingdom có tổng lớn nhất trong tập dữ liệu này. Kết quả được tính bằng cách cộng doanh thu từng giao dịch, thường là Quantity nhân với UnitPrice, rồi nhóm theo Country. USA có thể xuất hiện trong dữ liệu nhưng tổng doanh thu của quốc gia này thấp hơn United Kingdom.

---

### ❓ Câu hỏi 130:
There are many established methods from the literature that may be used to analyze time-series data. Classical machine learning techniques can also be used, but which of the following is the most important caveat to keep in mind when employing this approach?

**Các phương án lựa chọn:**
- [ ] A. You cannot use scikit-learn to combine multiple predictions
- [ ] B. The data cannot be feature engineered to help identify features that are needed by the model to detect trends
- [ ] C. There is no simple way to do a train/test split of the data
- [ ] D. Significant computational resources are generally required
- [x] **E. A specialized strategy that uses recursion (for example) or multiple models must be employed for multi-point forecasting** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. A specialized strategy that uses recursion (for example) or multiple models must be employed for multi-point forecasting**
💡 **Giải thích chi tiết:** Mô hình học máy cổ điển thường dự đoán một bước thời gian dựa trên các đặc trưng trễ, nên không tự nhiên tạo ra toàn bộ chuỗi dự báo nhiều bước. Để dự báo multi-point, cần dùng chiến lược đệ quy, dự báo trực tiếp từng bước hoặc nhiều mô hình tương ứng; các lựa chọn khác không phải rào cản cốt lõi vì vẫn có thể kỹ nghệ đặc trưng, chia dữ liệu theo thứ tự thời gian và sử dụng scikit-learn.

---

### ❓ Câu hỏi 131:
When the data are pivoted and summarized across days, which of the following features was the most difficult to include as a summarized or engineered feature?

**Các phương án lựa chọn:**
- [ ] A. revenue
- [ ] B. stream_views
- [ ] C. stream_ids
- [ ] D. purchases
- [x] **E. customer_id** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **E. customer_id**
💡 **Giải thích chi tiết:** customer_id là khóa định danh dùng để nhóm các bản ghi, không mang ý nghĩa số học để cộng, lấy trung bình hoặc tổng hợp theo ngày. Nếu đưa trực tiếp vào đặc trưng, mô hình có thể học thuộc danh tính thay vì quy luật hành vi và khó khái quát cho khách hàng mới. Ngược lại, revenue, stream_views và purchases có thể tổng hợp bằng tổng hoặc các thống kê tương ứng; stream_ids cũng có thể chuyển thành số lượng hoặc số giá trị duy nhất.

---

### ❓ Câu hỏi 132:
The time-series plots using a day time interval for revenue, purchases and total_views revealed many similarities. Which part of the year indicated a trend for the highest level of activity?

**Các phương án lựa chọn:**
- [ ] A. January-February
- [x] **B. April-May** *(Đáp án chính xác)*
- [ ] C. November-December
- [ ] D. June-July
- [ ] E. September-October

👉 **Đáp án đúng:** **B. April-May**
💡 **Giải thích chi tiết:** Giai đoạn November-December thường tạo ra mức hoạt động cao nhất vì nhu cầu mua sắm tăng mạnh vào mùa lễ hội, các chương trình khuyến mãi cuối năm và dịp nghỉ lễ. Sự gia tăng đồng thời của revenue, purchases và total_views cho thấy đây là một xu hướng theo mùa nhất quán, thay vì biến động riêng lẻ của chỉ một chỉ số. Các giai đoạn còn lại thường không hội tụ mạnh bằng về cuối năm.

---

### ❓ Câu hỏi 133:
What is a key risk associated with the increased pace of change in CI/CD?

**Các phương án lựa chọn:**
- [ ] A. Increased collaboration among teams
- [x] **B. Introduction of bugs** *(Đáp án chính xác)*
- [ ] C. Faster deployment times
- [ ] D. Improved testing processes

👉 **Đáp án đúng:** **B. Introduction of bugs**
💡 **Giải thích chi tiết:** Trong CI/CD, nhịp thay đổi và triển khai cao có thể rút ngắn thời gian dành cho kiểm thử, review mã và xác minh cấu hình, làm tăng nguy cơ đưa lỗi vào bản phát hành hoặc production. “Introduction of bugs” mô tả rủi ro trực tiếp này; cộng tác tốt hơn, triển khai nhanh hơn và kiểm thử được cải thiện thường là lợi ích hoặc mục tiêu của CI/CD, không phải hệ quả rủi ro tất yếu.

---

### ❓ Câu hỏi 134:
Which metric is used to evaluate the balance between precision and recall?

**Các phương án lựa chọn:**
- [ ] A. Accuracy
- [x] **B. F1 Score** *(Đáp án chính xác)*
- [ ] C. Recall
- [ ] D. Precision

👉 **Đáp án đúng:** **B. F1 Score**
💡 **Giải thích chi tiết:** F1 Score đánh giá sự cân bằng giữa precision và recall bằng trung bình điều hòa của hai chỉ số này: F1 = 2PR/(P+R). Cách tính này làm cho giá trị F1 giảm đáng kể nếu một trong hai thành phần thấp, vì vậy phù hợp hơn accuracy khi dữ liệu mất cân bằng hoặc khi cần đồng thời hạn chế false positive và false negative. Recall và precision riêng lẻ chỉ phản ánh một khía cạnh.

---

### ❓ Câu hỏi 135:
Which learning technique involves discovering appropriate actions through trial and error?

**Các phương án lựa chọn:**
- [ ] A. Supervised Learning
- [ ] B. Unsupervised Learning
- [x] **C. Reinforcement Learning** *(Đáp án chính xác)*
- [ ] D. Semi-supervised Learning

👉 **Đáp án đúng:** **C. Reinforcement Learning**
💡 **Giải thích chi tiết:** Reinforcement Learning học cách lựa chọn hành động bằng cách tương tác với môi trường và thử nghiệm nhiều khả năng khác nhau. Sau mỗi hành động, tác nhân nhận phần thưởng hoặc hình phạt, rồi cập nhật chính sách để tối đa hóa tổng phần thưởng trong dài hạn. Khác với học có giám sát dựa trên nhãn và học không giám sát tìm cấu trúc ẩn, phương pháp này trực tiếp sử dụng tín hiệu phản hồi từ kết quả hành động.

---

### ❓ Câu hỏi 136:
Who are "Sponsor Users" in the design thinking framework?

**Các phương án lựa chọn:**
- [ ] A. Project managers overseeing the design process
- [x] **B. Real-world users who provide domain expertise** *(Đáp án chính xác)*
- [ ] C. Data scientists working on the project
- [ ] D. Stakeholders funding the project

👉 **Đáp án đúng:** **B. Real-world users who provide domain expertise**
💡 **Giải thích chi tiết:** Sponsor Users là những người dùng thực tế được mời tham gia vì có kinh nghiệm trực tiếp và hiểu biết chuyên môn về lĩnh vực mà sản phẩm hướng tới. Họ cung cấp bối cảnh, nhu cầu và phản hồi xác thực, giúp nhóm thiết kế kiểm chứng vấn đề cũng như giải pháp; họ không đồng nhất với quản lý dự án, nhà khoa học dữ liệu hay bên tài trợ kinh phí.

---

### ❓ Câu hỏi 137:
Which of the following best describes feature engineering?

**Các phương án lựa chọn:**
- [ ] A. The process of gathering data
- [x] **B. The selection and creation of data features to improve model performance** *(Đáp án chính xác)*
- [ ] C. The visualization of data
- [ ] D. The storage of data

👉 **Đáp án đúng:** **B. The selection and creation of data features to improve model performance**
💡 **Giải thích chi tiết:** Feature engineering là quá trình lựa chọn, biến đổi hoặc tạo ra các đặc trưng từ dữ liệu thô để mô hình học được những tín hiệu hữu ích hơn, từ đó cải thiện độ chính xác hoặc khả năng tổng quát hóa. Hoạt động này khác với thu thập, trực quan hóa hay lưu trữ dữ liệu, vốn không trực tiếp thiết kế đầu vào cho thuật toán.

---

### ❓ Câu hỏi 138:
What is the best practice for data collection in performance monitoring?

**Các phương án lựa chọn:**
- [ ] A. Collect data at a summary level
- [x] **B. Collect data at the most granular level possible** *(Đáp án chính xác)*
- [ ] C. Collect data only once a week
- [ ] D. Collect data from social media

👉 **Đáp án đúng:** **B. Collect data at the most granular level possible**
💡 **Giải thích chi tiết:** Thu thập ở mức granular nhất có thể bảo toàn dấu thời gian, thành phần, nhóm đối tượng và chi tiết cần thiết để truy nguyên một thay đổi hiệu suất. Từ dữ liệu hạt mịn, người phân tích vẫn có thể tổng hợp theo ngày hoặc nhóm; chiều ngược lại không khôi phục được thông tin đã bị gộp. Mức chi tiết cuối cùng phải cân đối với chi phí, quyền riêng tư và lưu trữ, nhưng dữ liệu tổng hợp ngay từ đầu kém linh hoạt hơn.

---

### ❓ Câu hỏi 139:
What is the role of Kube DNS in Kubernetes?

**Các phương án lựa chọn:**
- [ ] A. To manage the API server
- [x] **B. To provide service discovery for pods** *(Đáp án chính xác)*
- [ ] C. To monitor application health
- [ ] D. To create YAML manifests

👉 **Đáp án đúng:** **B. To provide service discovery for pods**
💡 **Giải thích chi tiết:** Kube-DNS cung cấp cơ chế phân giải tên và khám phá dịch vụ trong cụm Kubernetes. Nhờ DNS nội bộ, các pod có thể truy cập Service bằng tên DNS thay vì phải biết trực tiếp địa chỉ IP, trong khi Service chịu trách nhiệm ánh xạ đến các pod phù hợp. Thành phần này không quản lý API server, giám sát sức khỏe ứng dụng hay tạo tệp YAML.

---

### ❓ Câu hỏi 140:
Which of the following is NOT a manager for a Spark cluster?

**Các phương án lựa chọn:**
- [ ] A. Apache Mesos
- [x] **B. Hadoop YARN** *(Đáp án chính xác)*
- [ ] C. Docker
- [ ] D. Spark on Kubernetes

👉 **Đáp án đúng:** **B. Hadoop YARN**
💡 **Giải thích chi tiết:** Apache Mesos, Hadoop YARN và Kubernetes đều có thể cung cấp cơ chế lập lịch và quản lý tài nguyên cho các ứng dụng Spark trên cụm. Docker chủ yếu là nền tảng đóng gói và chạy container, không phải một cluster manager độc lập của Spark. Vì vậy, Docker không đảm nhiệm việc phân phối tài nguyên hoặc điều phối các Spark application như ba lựa chọn còn lại.

---

### ❓ Câu hỏi 141:
What is the main function of the Kubernetes API server?

**Các phương án lựa chọn:**
- [x] **A. To manage worker nodes** *(Đáp án chính xác)*
- [ ] B. To expose capabilities for defining workloads
- [ ] C. To deploy applications
- [ ] D. To monitor application health

👉 **Đáp án đúng:** **A. To manage worker nodes**
💡 **Giải thích chi tiết:** Kubernetes API server cung cấp giao diện trung tâm để người dùng, công cụ dòng lệnh và các thành phần trong control plane khai báo, truy vấn và cập nhật trạng thái tài nguyên, bao gồm workload. Nó không trực tiếp quản lý worker node, triển khai ứng dụng hay giám sát sức khỏe ứng dụng; các nhiệm vụ đó do kubelet, scheduler, controller và hệ thống monitoring phối hợp thực hiện.

---

### ❓ Câu hỏi 142:
Where should you store your API key and sensitive information?

**Các phương án lựa chọn:**
- [ ] A. In a publicly accessible file
- [x] **B. On a machine you trust in a secure file** *(Đáp án chính xác)*
- [ ] C. In a shared document
- [ ] D. In the cloud without encryption

👉 **Đáp án đúng:** **B. On a machine you trust in a secure file**
💡 **Giải thích chi tiết:** API key nên được lưu trong tệp bảo mật trên máy đáng tin cậy, với quyền truy cập hạn chế. Tệp công khai, tài liệu chia sẻ hoặc cloud không mã hóa có thể làm lộ bí mật, dẫn tới truy cập trái phép và lạm dụng tài nguyên. Trong triển khai, biến môi trường hoặc secret manager thường an toàn hơn tệp cấu hình thông thường. Nguyên tắc cốt lõi là không đưa khóa vào nơi công khai.

---

### ❓ Câu hỏi 143:
What is one of the key aspects to consider when preparing for data analysis?

**Các phương án lựa chọn:**
- [ ] A. The color scheme of the dashboard
- [x] **B. The features available for each individual from the teams** *(Đáp án chính xác)*
- [ ] C. The number of team members
- [ ] D. The location of the markets

👉 **Đáp án đúng:** **B. The features available for each individual from the teams**
💡 **Giải thích chi tiết:** “The features available for each individual from the teams” đề cập đến các đặc trưng hoặc thuộc tính quan sát được của từng cá nhân, là nền tảng để chuẩn bị dữ liệu phân tích. Việc xác định trước các đặc trưng giúp đánh giá khả năng đo lường, làm sạch, mã hóa và sử dụng chúng trong so sánh hoặc xây dựng mô hình. Màu sắc dashboard, số thành viên và vị trí thị trường không trực tiếp mô tả cấu trúc biến cần phân tích.

---

### ❓ Câu hỏi 144:
What is the primary focus of data ingestion pipelines?

**Các phương án lựa chọn:**
- [ ] A. Data visualization
- [ ] B. Data storage
- [ ] C. Data quality maintenance
- [x] **D. Data collection and processing** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. Data collection and processing**
💡 **Giải thích chi tiết:** Data ingestion pipelines tập trung vào việc thu thập dữ liệu từ nhiều nguồn, sau đó truyền hoặc xử lý dữ liệu để đưa vào hệ thống đích như kho dữ liệu, hồ dữ liệu hoặc nền tảng phân tích. Quy trình này có thể bao gồm kết nối nguồn, chuyển đổi định dạng, kiểm tra cơ bản và điều phối luồng dữ liệu. Trực quan hóa, lưu trữ và duy trì chất lượng là các hoạt động liên quan nhưng không phải trọng tâm chính.

---

### ❓ Câu hỏi 145:
What is a key reason for maintaining data quality in enterprises?

**Các phương án lựa chọn:**
- [ ] A. To reduce the number of employees
- [x] **B. To avoid project delays and budget shortfalls** *(Đáp án chính xác)*
- [ ] C. To increase data storage capacity
- [ ] D. To enhance social media presence

👉 **Đáp án đúng:** **B. To avoid project delays and budget shortfalls**
💡 **Giải thích chi tiết:** Chất lượng dữ liệu bảo đảm thông tin dùng trong lập kế hoạch và phân bổ nguồn lực là chính xác, đầy đủ và nhất quán. Nhờ đó doanh nghiệp giảm sai sót, việc làm lại và quyết định dựa trên dữ liệu lỗi, qua đó hạn chế chậm tiến độ cùng thiếu hụt ngân sách. Chất lượng dữ liệu không trực tiếp làm giảm nhân sự, tăng lưu trữ hay mở rộng mạng xã hội; giá trị chính nằm ở vận hành và quyết định đáng tin cậy.

---

### ❓ Câu hỏi 146:
For the vector v = [2.0, -3.5, 5.1]:
Find the L1 norm of v
Return the result as a float
import numpy as np
def calculate_l1_norm(v):
    # Code here?
    return L1

**Các phương án lựa chọn:**
- [x] **A. L1 = np.linalg.norm(v, ord=1)** *(Đáp án chính xác)*
- [ ] B. L1 = np.linalg(ord=1,v)
- [ ] C. L1 = np.norm(v, ord=1)
- [ ] D. L1 = norm(v, ord=1)

👉 **Đáp án đúng:** **A. L1 = np.linalg.norm(v, ord=1)**
💡 **Giải thích chi tiết:** Hàm `np.linalg.norm` với tham số `ord=1` tính chuẩn L1 bằng tổng các giá trị tuyệt đối của các phần tử. Với vector này, kết quả là |2.0| + |-3.5| + |5.1| = 10.6, được biểu diễn dưới dạng số thực. Các lựa chọn còn lại gọi sai không gian hàm hoặc dùng `norm` chưa được định nghĩa, nên không thực thi đúng trong NumPy.

---

### ❓ Câu hỏi 147:
In the design thinking process, what do "Playbacks" refer to?

**Các phương án lựa chọn:**
- [ ] A. Presentations of data findings
- [x] **B. Sessions where stakeholders share stories and feedback** *(Đáp án chính xác)*
- [ ] C. Replaying recorded meetings
- [ ] D. Reviewing past projects

👉 **Đáp án đúng:** **B. Sessions where stakeholders share stories and feedback**
💡 **Giải thích chi tiết:** “Playbacks” là các buổi làm việc trong đó nhóm dự án trình bày hoặc tái hiện những câu chuyện, quan sát và phát hiện thu thập được để các bên liên quan cùng phản hồi. Hoạt động này giúp kiểm tra mức độ thấu hiểu vấn đề, phát hiện diễn giải sai và bổ sung thông tin trước khi chuyển sang các bước xác định cơ hội hoặc phát triển giải pháp. Khái niệm này không chỉ là phát lại bản ghi cuộc họp.

---

### ❓ Câu hỏi 148:
What is an important tool for comparing variants of the workflow in software engineering?

**Các phương án lựa chọn:**
- [ ] A. Data pipelines
- [ ] B. Data lakes
- [ ] C. Data warehouses
- [x] **D. Data dashboards** *(Đáp án chính xác)*

👉 **Đáp án đúng:** **D. Data dashboards**
💡 **Giải thích chi tiết:** Data dashboards là công cụ phù hợp để so sánh các biến thể workflow vì chúng đặt chỉ số, bảng và biểu đồ lên cùng một giao diện. Nhóm có thể theo dõi thời gian xử lý, tỷ lệ lỗi hoặc năng suất, rồi dùng bộ lọc để đối chiếu các phiên bản. Data pipelines, lakes và warehouses lần lượt phục vụ luân chuyển, lưu trữ quy mô lớn và tổ chức dữ liệu; chúng không trực tiếp cung cấp lớp so sánh trực quan như dashboard.

---

### ❓ Câu hỏi 149:
What is the primary goal of the teams deployed by AAVAIL?

**Các phương án lựa chọn:**
- [ ] A. To increase product prices
- [x] **B. To focus on product traction in new markets** *(Đáp án chính xác)*
- [ ] C. To reduce the number of team members
- [ ] D. To develop new marketing strategies

👉 **Đáp án đúng:** **B. To focus on product traction in new markets**
💡 **Giải thích chi tiết:** Các đội ngũ được AAVAIL triển khai nhằm thúc đẩy mức độ tiếp nhận và khả năng tăng trưởng của sản phẩm tại những thị trường mới. Trọng tâm này bao gồm kiểm chứng nhu cầu, hỗ trợ quá trình thâm nhập thị trường và tạo lực kéo cho sản phẩm, thay vì tăng giá, cắt giảm nhân sự hoặc chỉ xây dựng chiến lược marketing. Vì vậy, lựa chọn thứ hai phù hợp với mục tiêu vận hành được nêu.

---

### ❓ Câu hỏi 150:
What happens if a pod fails in a Kubernetes deployment?

**Các phương án lựa chọn:**
- [ ] A. The deployment is deleted
- [x] **B. A new pod is created to replace it** *(Đáp án chính xác)*
- [ ] C. The application stops running
- [ ] D. The kubelet is notified

👉 **Đáp án đúng:** **B. A new pod is created to replace it**
💡 **Giải thích chi tiết:** Deployment quản lý ReplicaSet, còn ReplicaSet duy trì số lượng Pod mong muốn bằng cách tạo Pod thay thế khi một Pod bị lỗi hoặc kết thúc bất thường. Vì vậy, ứng dụng thường tiếp tục phục vụ nếu còn đủ bản sao khác; kubelet chỉ chịu trách nhiệm chạy và giám sát container trên node, không trực tiếp quyết định việc tạo bản sao thay thế ở cấp Deployment.

---

### ❓ Câu hỏi 151:
Why is it important to ensure that minimally required data is available?

**Các phương án lựa chọn:**
- [ ] A. To reduce the size of the data set
- [x] **B. To monitor model performance and debug issues** *(Đáp án chính xác)*
- [ ] C. To make data collection easier
- [ ] D. To avoid using log files

👉 **Đáp án đúng:** **B. To monitor model performance and debug issues**
💡 **Giải thích chi tiết:** Dữ liệu tối thiểu cần thiết cho phép theo dõi hiệu năng mô hình sau triển khai và gỡ lỗi khi có sự cố. Các trường thường hữu ích gồm đầu vào, đầu ra dự đoán, nhãn thực tế, dấu thời gian và log liên quan; đối chiếu chúng giúp phát hiện drift, sai lệch chất lượng và nguyên nhân lỗi. Mục tiêu không phải giảm kích thước bộ dữ liệu hay loại bỏ log, mà là bảo đảm đủ bằng chứng để vận hành mô hình đáng tin cậy.

---

### ❓ Câu hỏi 152:
What is the primary format used for collecting data in performance monitoring?

**Các phương án lựa chọn:**
- [x] **A. Spreadsheets** *(Đáp án chính xác)*
- [ ] B. Log files
- [ ] C. Text documents
- [ ] D. Presentations

👉 **Đáp án đúng:** **A. Spreadsheets**
💡 **Giải thích chi tiết:** Log files là định dạng chủ yếu để thu thập dữ liệu vận hành trong performance monitoring. Hệ thống có thể tự động ghi sự kiện, dấu thời gian, mã lỗi, thời gian phản hồi và mức dùng tài nguyên, tạo dòng dữ liệu liên tục để phân tích và truy vết. Spreadsheets có thể hữu ích khi tổng hợp thủ công, nhưng không thay thế được log tự động; text documents và presentations càng không phù hợp cho việc ghi nhận sự kiện có cấu trúc.

---

### ❓ Câu hỏi 153:
Which of the following is a key benefit of using Docker?

**Các phương án lựa chọn:**
- [ ] A. It requires more resources than virtual machines
- [x] **B. It allows for easier deployment of applications** *(Đáp án chính xác)*
- [ ] C. It is only suitable for small applications
- [ ] D. It does not support multiple applications

👉 **Đáp án đúng:** **B. It allows for easier deployment of applications**
💡 **Giải thích chi tiết:** Docker đóng gói ứng dụng cùng các thư viện và cấu hình cần thiết trong container, giúp triển khai nhất quán giữa môi trường phát triển, kiểm thử và sản xuất. Container thường khởi động nhanh, dễ di chuyển và hỗ trợ chạy nhiều ứng dụng độc lập trên cùng một máy. Vì vậy, khả năng đơn giản hóa quá trình triển khai là lợi ích cốt lõi, còn các lựa chọn khác mô tả sai hoặc phủ định đặc tính của Docker.

---

### ❓ Câu hỏi 154:
In multilabel classification, how are labels assigned to samples?

**Các phương án lựa chọn:**
- [ ] A. Labels are mutually exclusive.
- [x] **B. Each sample can have multiple labels assigned.** *(Đáp án chính xác)*
- [ ] C. Only one label can be assigned to each sample.
- [ ] D. It is the same as binary classification.

👉 **Đáp án đúng:** **B. Each sample can have multiple labels assigned.**
💡 **Giải thích chi tiết:** Trong bài toán multilabel classification, một mẫu có thể đồng thời thuộc nhiều nhãn, chẳng hạn một hình ảnh vừa chứa chó vừa chứa xe. Các nhãn không loại trừ lẫn nhau, khác với multiclass classification, nơi mỗi mẫu chỉ nhận một lớp duy nhất. Bài toán này cũng không đồng nhất với binary classification, dù mỗi nhãn riêng lẻ thường có thể được biểu diễn bằng biến nhị phân có hoặc không.

---

### ❓ Câu hỏi 155:
In a confusion matrix, what does True Positive (TP) represent?

**Các phương án lựa chọn:**
- [ ] A. Correctly predicted negative cases
- [x] **B. Incorrectly predicted positive cases** *(Đáp án chính xác)*
- [ ] C. Correctly predicted positive cases
- [ ] D. Incorrectly predicted negative cases

👉 **Đáp án đúng:** **B. Incorrectly predicted positive cases**
💡 **Giải thích chi tiết:** True Positive (TP) là trường hợp mô hình dự đoán lớp dương tính và nhãn thực tế cũng là dương tính, nên dự đoán được xem là đúng. Chỉ số này khác False Positive, trong đó mô hình dự đoán dương tính nhưng thực tế là âm tính; tương tự, True Negative biểu thị dự đoán âm tính đúng.

---

### ❓ Câu hỏi 156:
What does the "average" parameter in the F1 score calculation affect?

**Các phương án lựa chọn:**
- [x] **A. The number of classes considered** *(Đáp án chính xác)*
- [ ] B. The weighting of precision and recall
- [ ] C. The overall accuracy of the model
- [ ] D. The size of the dataset

👉 **Đáp án đúng:** **A. The number of classes considered**
💡 **Giải thích chi tiết:** Tham số average quyết định cách kết hợp kết quả precision và recall theo từng lớp thành một F1 chung, chẳng hạn macro lấy trung bình đều còn weighted dùng số mẫu của lớp làm trọng số. Vì vậy nó ảnh hưởng đến cách các lớp được xét và tổng hợp, chứ không thay đổi trực tiếp kích thước dữ liệu hay accuracy. Trọng số giữa precision và recall thuộc về tham số beta trong F-beta, không phải average.

---

### ❓ Câu hỏi 157:
Which of the following is NOT a benefit of using NLP in enterprises?

**Các phương án lựa chọn:**
- [ ] A. Extracting insights from unstructured text data
- [ ] B. Automating customer service responses
- [x] **C. Creating complex hardware systems** *(Đáp án chính xác)*
- [ ] D. Enhancing data-driven decision-making

👉 **Đáp án đúng:** **C. Creating complex hardware systems**
💡 **Giải thích chi tiết:** Trong doanh nghiệp, NLP hỗ trợ trích xuất thông tin từ dữ liệu văn bản phi cấu trúc, tự động hóa phản hồi khách hàng và cung cấp tín hiệu cho các quyết định dựa trên dữ liệu. Các cơ chế như phân loại, nhận dạng thực thể và phân tích cảm xúc đều thuộc xử lý ngôn ngữ. Ngược lại, “Creating complex hardware systems” là hoạt động thiết kế phần cứng, không phải lợi ích hay chức năng trực tiếp của NLP.

---

### ❓ Câu hỏi 158:
Which of the following is NOT a recommended tool for optimizing code?

**Các phương án lựa chọn:**
- [ ] A. Cython
- [ ] B. mpi4py
- [x] **C. TensorBoard** *(Đáp án chính xác)*
- [ ] D. ipyparallel

👉 **Đáp án đúng:** **C. TensorBoard**
💡 **Giải thích chi tiết:** TensorBoard chủ yếu dùng để trực quan hóa và theo dõi loss, metric và quá trình huấn luyện, nên không phải công cụ tối ưu mã Python nói chung. Cython có thể biên dịch phần mã phù hợp thành C, còn mpi4py và ipyparallel hỗ trợ tính toán song song để cải thiện hiệu năng trong những tình huống thích hợp. Vì vậy, TensorBoard ở lựa chọn thứ ba là ngoại lệ cần chọn.

---
