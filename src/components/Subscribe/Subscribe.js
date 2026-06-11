import "./Subscribe.css";

function Subscribe() {
    return (
        <div className="subscribe">
            <div className="subscribe-container">
                <div className='text'>
                    <h1>! إبقى على إطلاع</h1>
                    <h2>
                        ترقبوا كل جديد! اشتركوا في صحيفتنا ليصلكم كل جديد، دون إرسال
                        رسائل مزعجة، بل فقط عروض خاصة
                    </h2>
                </div>
                <form action="">
                    <input type="text" placeholder="user@masaha.com" />
                    <input type="submit" value="إشتراك" />
                </form>
            </div>
        </div>
    );
}

export default Subscribe;
