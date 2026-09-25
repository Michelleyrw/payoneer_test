const payBtn = document.querySelector('#payBtn');
const widgetContainer = document.querySelector('#widgetContainer');

payBtn.addEventListener('click', async () => {
  try {
    payBtn.disabled = true;
    payBtn.textContent = "Creating session...";

    // 请求后端创建payment session
    const response = await fetch('http://localhost:3001/api/create-session', {
      method: "POST"
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to create session");
    }

    // 初始化支付组件，挂载到页面
    const widget = new PaymentWidget(result.listUrl);
    widget.mount(widgetContainer);

    payBtn.textContent = "Payment form loaded";
  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
    payBtn.disabled = false;
    payBtn.textContent = "Create Payment Session & Load Payment Widget";
  }
})
