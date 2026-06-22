import { Suspense } from "react";
import ChatClient from "@/components/ChatClient";

export const metadata = { title: "AbogaBot — tu asistente legal | Leyes de Chile" };

export default function Chat() {
  return (
    <Suspense>
      <ChatClient />
    </Suspense>
  );
}
