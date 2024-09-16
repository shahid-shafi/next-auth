import { getSessionToken, getUserSession } from "@/lib/session";

export default async function Home() {
  const token = getSessionToken()
  const session = await getUserSession()
  console.log({ session })
  return (
    <>
      <div className="bg-black/40 text-white">
        {token && <pre>{JSON.stringify(token, null, 2)}</pre>}
      </div>
    </>
  );
}
