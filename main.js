async function SaveData() {
  try {
    let id = document.getElementById("id").value.trim();
    let title = document.getElementById("title").value.trim();
    let view = document.getElementById("view").value.trim();

    if (!title || !view) {
      alert("Vui lòng nhập đầy đủ tiêu đề và lượt xem!");
      return;
    }

    if (id) {
      // Kiểm tra xem id có tồn tại không
      let check = await fetch(`http://localhost:3000/posts/${id}`);
      if (!check.ok) {
        alert(`Không tìm thấy bài viết có id = ${id}, không thể cập nhật!`);
        return;
      }

      // PATCH (update)
      let res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ title: title, views: view }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        console.log("Update thành công:", await res.json());
      } else {
        console.error("Lỗi khi update:", res.status);
      }
    } else {
      // POST (tạo mới)
      let res = await fetch("http://localhost:3000/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          views: view,
          isDelete: false,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        console.log("Thêm mới thành công:", await res.json());
      } else {
        console.error("Lỗi khi thêm mới:", res.status);
      }
    }

    await LoadData(); // reload lại dữ liệu
  } catch (err) {
    console.error("Lỗi khi lưu dữ liệu:", err);
  }
}
