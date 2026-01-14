import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SellForm } from "./SellForm";

export default async function SellPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login?next=/sell");
    }

    return <SellForm />;
}
