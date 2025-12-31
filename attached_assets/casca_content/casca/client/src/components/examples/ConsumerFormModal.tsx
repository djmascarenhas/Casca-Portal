import { useState } from "react";
import { Button } from "@/components/ui/button";
import ConsumerFormModal from "../landing/ConsumerFormModal";

export default function ConsumerFormModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Abrir Formulário</Button>
      <ConsumerFormModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
