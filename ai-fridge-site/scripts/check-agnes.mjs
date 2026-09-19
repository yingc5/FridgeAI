const baseUrl = (process.env.AGNES_BASE_URL || "https://apihub.agnes-ai.com/v1").replace(/\/$/, "");
const model = process.env.AGNES_MODEL || "agnes-2.5-flash";
const apiKey = process.env.AGNES_API_KEY;

if (!apiKey) {
  console.error("未检测到 AGNES_API_KEY。请检查 .env 的填写。");
  process.exit(1);
}

try {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: "Reply only: OK" }],
      temperature: 0,
      max_tokens: 16,
    }),
  });

  if (!response.ok) {
    console.error(`Agnes API 验证失败（HTTP ${response.status}）。`);
    process.exit(1);
  }

  console.log(`Agnes API 配置成功：${model}`);
} catch {
  console.error("无法连接 Agnes API。请检查网络和 AGNES_BASE_URL。");
  process.exit(1);
}
