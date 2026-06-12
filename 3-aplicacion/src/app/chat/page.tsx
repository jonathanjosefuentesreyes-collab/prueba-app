import { Suspense } from "react";
import ChatClient from "@/components/ChatClient";

export const metadata = { title: "AbogaBot — tu asistente legal | Ley Chilena" };

export default function Chat() {
  return (
    <Suspense>
      <ChatClient />
    </Suspense>
  );
}
