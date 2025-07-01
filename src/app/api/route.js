export async function GET() {
  return new Response(JSON.stringify({ message: "api is listening" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
