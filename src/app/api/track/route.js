export async function POST(request) {
  try {
    const data = await request.json();

    // إرسال البيانات إلى السيرفر الرئيسي
    const response = await fetch(
      "https://binaa-server.vercel.app/api/visitors",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();
    return Response.json(result);
  } catch (error) {
    console.error("❌ خطأ في التتبع:", error);
    return Response.json({ error: "حدث خطأ في التتبع" }, { status: 500 });
  }
}
